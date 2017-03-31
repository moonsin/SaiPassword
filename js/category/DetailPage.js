import React, {
    Component
} from 'react';
import {
    AddItemDetailPagetoDetail,
    setDetailPgaeRoute,
    getIntoDetailPage,
    changePreViewAndPopToDetaiPage,
} from './naVapi';
import {
    TouchableHighlight,
    DeviceEventEmitter,
    TextInput,
    Image,
    ScrollView,
    StyleSheet,
    View,
    Text,
} from 'react-native';
var CryptoJS = require("crypto-js");
import routes from '../router/Router';
import IconSource from '../common/IconRequire';
import typeCN from '../common/typeCN';
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F7',
        flex: 1,
        marginTop: 66,
    },
    headBar: {
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#D2D2D2',
        height: 80,
        flexDirection: 'row',
    },
    headBar_image: {
        marginLeft: 40,
        marginRight: 20,
        marginTop: 15,
        width: 60,
        height: 60,
    },
    headBar_name: {
        borderBottomWidth: 1,
        borderColor: '#D2D2D2',
        height: 55,
        flex: 4.5,
    },
    headBar_input: {
        height: 30,
        width: 200,
        marginTop: 22,
        marginLeft: 2,
    },
    noteBar: {
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#D2D2D2',
        marginTop: 20,
        minHeight: 70,
    },
    noteBar_title: {
        fontFamily: 'courier',
        fontSize: 14,
        color: 'red',
        marginLeft: 40,
        marginTop: 5,
    },
    noteBar_content: {
        fontFamily: 'courier',
        fontSize: 14,
        marginLeft: 40,
        marginTop: 4,
        marginBottom: 2,
    },
    noteBar_edit: {
        fontFamily: 'courier',
        fontSize: 14,
        color: 'red',
        marginLeft: 40,
        marginBottom: 5,
    },
    informationBar: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#D2D2D2',
        backgroundColor: '#FFF',
        marginTop: 20,
    },
    singleLayerInput_title: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 4,
        fontSize: 12,
        color: '#C2C2C8',
    },
    singleLayerInput_content: {
        marginLeft: 30,
        marginRight: 30,
        fontSize: 15,
        marginTop: 6,
        height: 16,
        width: 240
    },
});

var noteContent = {
    value: '',
    navigator: '',
};
var pageKind;
var submitValue = {};

export function clearNoteContent() {
    noteContent = {
        value: '',
        navigator: '',
    };
}
export function clearSubmitValues() {
    submitValue = {};
}
var DetailPageNav;

function PageBuilder(pageType, typeCN, editable, navigator, data) {
    var content = [];
    var index = 0;
    if (data != null) {
        content.push(<HeadBar key={'HeadBar'} typeCN={typeCN} type={pageType} editable={editable} headBarName={data.headBarName}/>);
        for (var idx in data) {
            if (idx != 'headBarName' && idx != 'noteContent' && idx != 'pageKind') {
                content.push(<InformationBar key={'PasswordInformationBar'+index++} type={pageType} editable={editable} data={data[idx]}/>);
            }
        }
        content.push(<TextArea key={'NoteTextArea'+index} navigator={navigator} editable={editable} notecontent={data.noteContent} />);
    } else {
        content.push(<HeadBar key={'HeadBar'} typeCN={typeCN} type={pageType} editable={editable} />);
        if (pageType == 'Password') {
            content.push(<InformationBar key={'PasswordInformationBar'+index++} type={pageType} editable={editable} />);
        }
        content.push(<TextArea key={'NoteTextArea'+index} navigator={navigator} editable={editable}  />);
    }

    return content;
}

export class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //中文
            type: typeCN[this.props.type],
            content: []
        };
    };
    getLocalData(type, id) {
        if (!!id) {
            //有id
            var getLocalData = function() {
                return storage.load({
                    key: type,
                    id: id,
                })
            }
            var localDataForId = async function() {
                var data = await getLocalData();
                return data;
            }
            return localDataForId();
        } else {
            return new Promise((resolve, reject) => {
                resolve(null);
            });
        }
    };
    componentWillUnmount() {
        this.subCript.remove();
    };
    componentDidMount() {
        this.subCript = DeviceEventEmitter.addListener('EditItemDone', () => {
            setContent(this.props.type, this.props.id, false);
        })

        function setStateContent(type, id, editable) {
            if (editable == undefined) {
                var editable = this.props.editable;
            }
            this.getLocalData(type, id).then((result) => {
                this.setState({
                    content: PageBuilder(this.props.type, this.state.type, editable, this.props.navigator, result),
                })
            });
        }
        var setContent = setStateContent.bind(this);
        //set submitValue
        if (this.props.id) {
            storage.load({
                key: this.props.type,
                id: this.props.id
            }).then((result) => {
                for (var idx in result) {
                    submitValue[idx] = result[idx];
                }
            })
        }
        pageKind = this.props.type;
        DetailPageNav = this.props.navigator;
        setContent(this.props.type, this.props.id);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.content}
            </View>
        );
    }
}

class HeadBar extends React.Component {
    render() {
        var headBarName = '';
        if (this.props.headBarName) {
            var headBarNameArray = this.props.headBarName.split('$AddItemTime$');
            headBarName = headBarNameArray[0]
        }
        return (
            <View style={styles.headBar}>
                <View style={{flex:2}}>
                    <Image source={IconSource[this.props.type]} style={styles.headBar_image}></Image>
                </View>
                <View style={styles.headBar_name}>
                    <TextInput style={styles.headBar_input} autoCapitalize='none' placeholder={this.props.typeCN+' 名称'} onChangeText={(value)=>{submitValue.headBarName=value;}} editable={this.props.editable} defaultValue={headBarName} />
                </View>
            </View>
        )
    }
}

class TextArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: ''
        };
        this.firstNote = this.props.notecontent;
    };
    componentWillUnmount() {
        this.noteReset.remove();
        this.subscription.remove();
    };
    componentDidMount() {
        this.setState({
            note: this.props.notecontent,
        });
        this.subScript = DeviceEventEmitter.addListener('EditItemDone',()=>{
            this.firstNote = noteContent.value;
            clearNoteContent();
        })
        this.subscription = DeviceEventEmitter.addListener('noteSave', (value) => {
            this.setState({
                note: value.value,
            });
        });
        this.noteReset = DeviceEventEmitter.addListener('noteReset', () => {
            if (this.firstNote != this.state.note) {
                this.setState({
                    note: this.firstNote,
                });
            }
        });
    }
    render() {
        return (
            <TouchableHighlight style={styles.noteBar} onPress={()=>{
                if(this.props.editable){
                    routes[5].passProps={
                        notecontent:this.props.notecontent,
                    }
                    this.props.navigator.push(routes[5])
                }
            }} underlayColor='#D2D2D2'>
                <View>
                    <Text style={styles.noteBar_title} >备注</Text>
                    <Text style={styles.noteBar_content}>{this.state.note}</Text>
                    {
                        this.state.note == ''||!this.props.editable ?  (<View></View>) : (<Text style={styles.noteBar_edit}>点击以编辑</Text>)
                    }
                </View> 
            </TouchableHighlight>
        )
    }
}

export class AddNodePage extends React.Component {
    render() {
        noteContent.navigator = this.props.navigator;
        return (
            <View style={{flex:1,marginTop:70,marginLeft:15,backgroundColor:'#FFFF',marginRight:15}}>
                <TextInput onChangeText={(value)=>{noteContent.value=value;submitValue.noteContent = value;}} style={{flex:1,fontSize:16}} multiline={true} defaultValue={this.props.notecontent}  placeholder={'名称'} autoCapitalize='none' />
            </View>
        )
    }
}

export function noteSave() {
    DeviceEventEmitter.emit('noteSave', noteContent);
    noteContent.navigator.pop();
}
export function noteReset() {
    DeviceEventEmitter.emit('noteReset');
    noteContent.value = '';
}

export function DetailPageSave(exist, oldtype, oldid) {
    if (!submitValue.headBarName) {
        alert('名称不能为空')
    } else {
        var timestamp = Date.parse(new Date());
        submitValue.headBarName += '$AddItemTime$' + timestamp;
        var id;
        if (!exist) {
            storage.getIdsForKey(pageKind).then(ret => {
                id = ret.length + 1;
                submitValue.pageKind = pageKind;
                storage.save({
                    key: pageKind, // 注意:请不要在key中使用_下划线符号!
                    id: id,
                    rawData: submitValue,
                    expires: null
                }).then(() => {
                    _backToDetailPage(id, pageKind, exist);
                });
            })
        } else {
            id = oldid;
            return storage.save({
                key: pageKind,
                id: oldid,
                rawData: submitValue,
                expires: null,
            })
        }

        function _backToDetailPage(id, type, exist) {

            if (!exist) {
                DeviceEventEmitter.emit('EditItemDone', {
                    id: id,
                    type: type,
                    fromPage: 'addItemDetail',
                })
                AddItemDetailPagetoDetail(type, id, DetailPageNav);
            }
        }
    }
}
//InformationBar就是一个组
class InformationBar extends React.Component {
    constructor(props) {
        super(props);
    };
    informationBarBuilder() {
        var content = [];
        var index = 0;
        if (this.props.type == 'Password') {
            if (!submitValue.Password) {
                submitValue.Password = {};
            }
            content.push(<PasswordComponent top={true} bottom={true} backgroundcolor={'#fff'} key={'PasswordComponent'+index} data={this.props.data||''} editable={this.props.editable} />);
        }
        return content;
    };
    render() {
        var content = this.informationBarBuilder();
        return (
            <View style={styles.informationBar}>
                {content}
            </View>
        )
    }
}

class SingleLayerInput extends React.Component {
    constructor(props) {
        super(props);
        this.secure = false;
        this.state = {
            value: this.props.data,
        }
    };
    getSaiPassword() {
        var getLocalRealPassword = function() {
            return storage.load({
                key: 'SaipasswordAccessPassword',
            });
        }
        var accessPassword = async function() {
            var password = await getLocalRealPassword()
            return password;
        }
        return accessPassword();
    }
    saveValue(value) {
        if (this.props.title == '密码') {
            var saveValue = value;
            this.props.changeText(value);
            this.getSaiPassword().then((result) => {
                saveValue = CryptoJS.AES.encrypt(saveValue, result.password).toString();
                submitValue[this.props.groupName][this.props.type] = saveValue;
            })
        } else {
            submitValue[this.props.groupName][this.props.type] = value;
        }
    }
    getRealPassword() {

    }
    componentWillMount() {
        if (this.props.type == 'Password') {
            this.secure = true;
            this.getSaiPassword().then((result) => {
                var value;
                if (this.state.value) {
                    value = CryptoJS.AES.decrypt(this.state.value, result.password).toString(CryptoJS.enc.Utf8);
                }
                this.setState({
                    value: value,
                })
                this.props.changeText(value);
            })
        }
    }
    render() {
        return (
            <View>
                <Text style={styles.singleLayerInput_title}>{this.props.title}</Text>
                <TextInput style={styles.singleLayerInput_content} onChangeText={(value)=>{this.saveValue(value)}} autoCapitalize='none' placeholder={this.props.title} secureTextEntry={this.secure} defaultValue={this.state.value} />
            </View>
        )
    }
}

class PasswordComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            passwordInput: '',
        };
    };
    render() {
        var password = this.props.data.Password;
        return (
            <View style={{backgroundColor:this.props.backgroundcolor,marginTop:10,marginBottom:10}}>
                <SingleLayerInput title='密码' changeText={(value)=>this.setState({passwordInput:value})} groupName='Password' type='Password' editable={this.props.editable} data={password}  />
                <TouchableHighlight  onPress={()=>this.setState({showPassword:!this.state.showPassword})} underlayColor={this.props.backgroundcolor} >
                    <View style={{marginLeft:30,marginRight:30,marginTop:4,borderTopWidth:0.5,borderColor:'#D2D2D2',paddingTop:10,paddingBottom:10,height:35}}>
                    {this.state.showPassword == true?(
                        <Text style={{fontSize:14}}>{this.state.passwordInput}</Text>
                    ):(
                        <Text style={{color:'red',fontSize:14}}>显示密码</Text>
                    )}                    
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}
