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
    DatePickerIOS,
    TouchableHighlight,
    DeviceEventEmitter,
    TextInput,
    Image,
    ScrollView,
    StyleSheet,
    View,
    Text,
} from 'react-native';
import NormalButton from '../common/Button';
var CryptoJS = require("crypto-js");
import routes from '../router/Router';
import IconSource from '../common/IconRequire';
import typeCN from '../common/typeCN';
import {
    loadSaiPassword,
    savePassword,
    getLocalPassword,
    deleteItem,
} from '../common/storageApi.js';
import {
    PasswordPrompt,
} from '../common/passwordPrompt';
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F7',
        flex: 1,
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
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
    },
    singleLayerInput_title: {
        marginTop: 4,
        fontSize: 12,
        color: '#C2C2C8',
    },
    singleLayerInput_content: {
        fontSize: 15,
        marginTop: 6,
        height: 16,
        width: 240,
        borderBottomWidth: 0.5,
        borderColor: '#D2D2D2',
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

function PageBuilder(pageType, typeCN, editable, navigator, data, id, hideDelete) {
    if (data) {
        var starState = !!data.star ? 'unstar' : 'star';
    }
    var content = [];
    var index = 0;
    if (data != null) {
        content.push(<HeadBar key={'HeadBar'} typeCN={typeCN} type={pageType} editable={editable} headBarName={data.headBarName}/>);
        for (var idx in data) {
            if (idx != 'headBarName' && idx != 'noteContent' && idx != 'pageKind' && idx != 'star') {
                content.push(<InformationBar key={idx+'InformationBar'+index++} groupName={idx} editable={editable} data={data[idx]}/>);
            }
        }
        content.push(<TextArea key={'NoteTextArea'+index++} navigator={navigator} editable={editable} notecontent={data.noteContent} />);
        if (!editable && !hideDelete) {
            content.push(<DetailPageButton key={'StarButton'+index++} text={'★ '+starState} backgroundColor='#007aff' id={id} button='star'  type={pageType} navigator={navigator} data={data}/>);
            content.push(<DetailPageButton key={'DeleteButton'+index++} text='delete' backgroundColor='red' id={id} button='delete'  type={pageType} navigator={navigator}/>);
        }
    } else {
        content.push(<HeadBar key={'HeadBar'} typeCN={typeCN} type={pageType} editable={editable} />);
        if (pageType == 'Password') {
            content.push(<InformationBar key={'PasswordInformationBar'+index++} groupName="Password" editable={editable} />);
        }
        if (pageType == 'Login') {
            content.push(<InformationBar key={'LoginPlaceInformationBar'+index++} groupName="loginPlace" editable={editable} />);
            content.push(<InformationBar key={'PasswordInformationBar'+index++} groupName="Password" editable={editable} />);
        }
        if (pageType == 'Indentity') {
            content.push(<InformationBar key={'IdentificationInformationBar'+index++} groupName="Identification" editable={editable} />);
            content.push(<InformationBar key={'AddressInformationBar'+index++} groupName="Address" editable={editable} />);
            content.push(<InformationBar key={'InternetDetailInformationBar'+index++} groupName="InternetDetail" editable={editable} />);
        }
        content.push(<TextArea key={'NoteTextArea'+index} navigator={navigator} editable={editable}  />);
    }
    return content;
}
class DetailPageButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //中文
            disabled: false,
            text: this.props.text,
            backgroundColor: this.props.backgroundColor,
        };
    };
    press(text) {
        if (text == 'delete') {
            deleteItem(this.props.type, this.props.id);
            DeviceEventEmitter.emit('ItemDelete');
            this.props.navigator.pop();
        }
        if (text == 'star') {
            var data = this.props.data;
            data.star = !data.star;
            this.setState({
                disabled: true,
            })
            storage.save({
                key: this.props.type, // 注意:请不要在key中使用_下划线符号!
                id: this.props.id,
                rawData: data,
                expires: null
            }).then(() => {
                DeviceEventEmitter.emit('starChange');
            });
            setTimeout(() => {
                this.setState({
                    disabled: false,
                    text: data.star ? 'unstar' : 'star',
                })
            }, 300)
        }
    }
    render() {
        return (
            <View style={{marginTop:20,flexDirection: 'row',justifyContent: 'center',}} >
                   <NormalButton text={this.state.text} backgroundColor={this.state.backgroundColor} onpress={()=>{this.press(this.props.button);}} disabled={this.state.disabled}  />
             </View>
        )
    }
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
        this.getNewPassword.remove();
        this.TabBarChanged.remove();
    };
    componentDidMount() {}
    componentWillMount() {
        this.subCript = DeviceEventEmitter.addListener('EditItemDone', () => {
            setContent(this.props.type, this.props.id, false);
        })
        this.getNewPassword = DeviceEventEmitter.addListener('setSaiPassword', () => {
            this.props.navigator.pop();
        })
        this.TabBarChanged = DeviceEventEmitter.addListener('TabBarChanged', () => {
            if (this.props.editable) {
                noteReset();
                clearSubmitValues();
                changePreViewAndPopToDetaiPage(this.props.type, this.props.id, this.props.navigator);
            } else {
                this.props.navigator.pop();
            }
        })

        function setStateContent(type, id, editable) {
            if (editable == undefined) {
                var editable = this.props.editable;
            }
            this.getLocalData(type, id).then((result) => {
                this.setState({
                    content: PageBuilder(this.props.type, this.state.type, editable, this.props.navigator, result, this.props.id, this.props.hideDelete),
                })
                return result;
            })
        }
        var setContent = setStateContent.bind(this);
        //set submitValue
        if (this.props.id && !!this.props.editable) {
            storage.load({
                key: this.props.type,
                id: this.props.id
            }).then((result) => {
                for (var idx in result) {
                    submitValue[idx] = result[idx];
                }
            })
        } else {
            submitValue = {};
        }
        pageKind = this.props.type;
        DetailPageNav = this.props.navigator;
        setContent(this.props.type, this.props.id);

    }
    render() {
        return (
            <ScrollView style={styles.container}>
                {this.state.content}
            </ScrollView>
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
        this.subScript.remove()
    };
    componentDidMount() {
        this.setState({
            note: this.props.notecontent,
        });
        this.subScript = DeviceEventEmitter.addListener('EditItemDone', () => {
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
        var headBarName = submitValue.headBarName.split('$AddItemTime$');
        submitValue.headBarName = headBarName[0];
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
                    clearSubmitValues();
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
        this.state = {
            data: this.props.data || {},
        }
    };
    informationBarBuilder() {
        function initGroup(groupName) {
            if (!submitValue[groupName]) {
                submitValue[groupName] = {};
            }
        }
        var content = [];
        var index = 0;
        var data = {};
        if (this.props.data) {
            data = this.props.data;
        };
        initGroup(this.props.groupName);
        if (this.props.groupName == 'Password') {
            content.push(<PasswordComponent top={true} bottom={true} backgroundcolor={'#fff'} key={'PasswordComponent'+index++} data={this.props.data||''} editable={this.props.editable} />);
        }
        if (this.props.groupName == 'loginPlace') {
            content.push(<SingleLayerInput title='网站'  key={'loginPlaceComponent'+index++} groupName='loginPlace' type='loginSite' editable={this.props.editable} data={data.loginSite} />)
            content.push(<SingleLayerInput title='APP'   key={'loginPlaceComponent'+index++} groupName='loginPlace' type='loginAPP'  editable={this.props.editable} data={data.loginAPP} />)
            content.push(<SingleLayerInput title='用户名'  bottom={true} key={'loginPlaceComponent'+index++} groupName='loginPlace' type='loginName'  editable={this.props.editable} data={data.loginName} />)
        }
        if (this.props.groupName == 'Identification') {
            content.push(<SingleLayerInput title='first name' default="姓氏"  key={'IdentificationComponent'+index++} groupName='Identification' type='firstName' editable={this.props.editable} data={data.firstName} />)
            content.push(<SingleLayerInput title='last name' default="名字" key={'IdentificationComponent'+index++} groupName='Identification' type='lastName' editable={this.props.editable} data={data.lastName} />)
            content.push(<SingleLayerInput title='sex' default="性别" key={'IdentificationComponent'+index++} groupName='Identification' type='sex' editable={this.props.editable} data={data.sex} />)
            content.push(<SingleTimelayer  title='birth date' key={'IdentificationComponent'+index++} groupName='Identification' type='birthDate' editable={this.props.editable} data={data.birthDate}/>);
            content.push(<SingleLayerInput title='occupation' default="职业" key={'IdentificationComponent'+index++} groupName='Identification' type='occupation' editable={this.props.editable} data={data.occupation} />)
            content.push(<SingleLayerInput title='company' default="公司" key={'IdentificationComponent'+index++} groupName='Identification' type='company' editable={this.props.editable} data={data.company} />)
            content.push(<SingleLayerInput title='department' default="部门" key={'IdentificationComponent'+index++} groupName='Identification' type='department' editable={this.props.editable} data={data.department} />)
        }
        if (this.props.groupName == 'Address') {
            content.push(<SingleLayerInput title='国家'  key={'AddressComponent'+index++} groupName='Address' type='country' editable={this.props.editable} data={data.country} />)
            content.push(<SingleLayerInput title='省'  key={'AddressComponent'+index++} groupName='Address' type='province' editable={this.props.editable} data={data.province} />)
            content.push(<SingleLayerInput title='市'  key={'AddressComponent'+index++} groupName='Address' type='city' editable={this.props.editable} data={data.city} />)
            content.push(<SingleLayerInput title='区/县'  key={'AddressComponent'+index++} groupName='Address' type='district' editable={this.props.editable} data={data.district} />)
            content.push(<SingleLayerInput title='街道'  key={'AddressComponent'+index++} groupName='Address' type='street' editable={this.props.editable} data={data.street} />)
            content.push(<SingleLayerInput title='default phone' default="电话号码"  key={'AddressComponent'+index++} groupName='Address' type='defaultPhone' editable={this.props.editable} data={data.defaultPhone} />)
            content.push(<SingleLayerInput title='home' default="电话号码"  key={'AddressComponent'+index++} groupName='Address' type='home' editable={this.props.editable} data={data.home} />)
            content.push(<SingleLayerInput title='cell' default="电话号码"  key={'AddressComponent'+index++} groupName='Address' type='cell' editable={this.props.editable} data={data.cell} />)
            content.push(<SingleLayerInput title='business' default="电话号码"  key={'AddressComponent'+index++} groupName='Address' type='business' editable={this.props.editable} data={data.business} />)
        }
        if (this.props.groupName == 'InternetDetail') {
            content.push(<SingleLayerInput title='username' default="用户名" key={'InternetDetailComponent'+index++} groupName='InternetDetail' type='username' editable={this.props.editable} data={data.username} />)
            content.push(<SingleLayerInput title='email'  key={'InternetDetailComponent'+index++} groupName='InternetDetail' type='email' editable={this.props.editable} data={data.email} />)
            content.push(<SingleLayerInput title='qq'  key={'InternetDetailComponent'+index++} groupName='InternetDetail' type='qq' editable={this.props.editable} data={data.qq} />)
            content.push(<SingleLayerInput title='wechat' default="微信"  key={'InternetDetailComponent'+index++} groupName='InternetDetail' type='wechat' editable={this.props.editable} data={data.wechat} />)
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
class SingleTimelayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.data || new Date(),
        }
    };

    componentWillMount() {
        if (this.props.data) {
            var data = this.props.data;
            data = new Date(data);
            submitValue[this.props.groupName][this.props.type] = this.props.data;
            this.setState({
                date: data,
            })
        } else {
            submitValue[this.props.groupName][this.props.type] = this.state.date;
        }
    }
    setNewTime(date) {
        if (this.props.editable) {
            submitValue[this.props.groupName][this.props.type] = date;
            this.setState({
                date: date,
            })
        }
    }
    render() {
        var date = this.props.data || new Date();
        date = new Date(date);
        date = date.toLocaleDateString();
        return (
            <View>
			<Text style={styles.singleLayerInput_title}>{this.props.title}</Text>
			{this.props.editable==false?(
		<TextInput style={styles.singleLayerInput_content}  editable={this.props.editable} placeholder={this.props.default?(this.props.default):(this.props.title)}  defaultValue={date} />
			):(
			<DatePickerIOS
            	mode="date"
				date={this.state.date}
				onDateChange={(date)=>this.setNewTime(date)}
            />
			)}
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
            var password = await getLocalRealPassword();
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
    componentWillUnmount() {
        this.subScript.remove()
    };

    componentDidMount() {
        this.subScript = DeviceEventEmitter.addListener('EditItemDone', () => {
            if (this.props.type == 'Password') {
                this.getSaiPassword().then((result) => {
                    var pass = '';
                    if (this.props.data) {
                        pass = CryptoJS.AES.decrypt(this.props.data, result.password).toString(CryptoJS.enc.Utf8);
                    }
                    this.setState({
                        value: pass
                    })
                    if (this.props.changeText) {
                        this.props.changeText(pass);
                    }
                })
            }
        })
    }
    componentWillMount() {
        this.border = {};
        if (this.props.type == 'Password') {
            this.secure = true;
            this.getSaiPassword().then((result) => {
                if (!result) {
                    return;
                }
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
        if (!this.props.bottom) {
            this.border = {
                borderColor: '#929292',
                borderBottomWidth: 0.5,
                paddingBottom: 6,
            }
        }
    }
    render() {
        return (
            <View style={this.border}>
                <Text style={styles.singleLayerInput_title}>{this.props.title}</Text>
                <TextInput style={styles.singleLayerInput_content} onChangeText={(value)=>{this.saveValue(value)}} autoCapitalize='none' editable={this.props.editable} placeholder={this.props.default?(this.props.default):(this.props.title)} secureTextEntry={this.secure} defaultValue={this.props.type=='Password'?(this.state.value):(this.props.data)} />
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
            <View style={{backgroundColor:this.props.backgroundcolor}}>
                <SingleLayerInput title='密码' changeText={(value)=>this.setState({passwordInput:value})} groupName='Password' type='Password' editable={this.props.editable} data={password}  />
                <TouchableHighlight  onPress={()=>this.setState({showPassword:!this.state.showPassword})} underlayColor={this.props.backgroundcolor} >
                    <View style={{paddingTop:10,paddingBottom:10,height:35}}>
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
