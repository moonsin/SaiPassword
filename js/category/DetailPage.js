import React, {
    Component
} from 'react';
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
var submitValue = {};

function PageBuilder(pageType, typeCN, navigator) {
    var content = [];
    var index = 0;
    content.push(<HeadBar key={'HeadBar'} typeCN={typeCN} type={pageType}/>);

    if (pageType == 'Password') {
        content.push(<InformationBar key={'PasswordInformationBar'+index} type={pageType} />);
        index++;
    }

    content.push(<TextArea key={'NoteTextArea'+index} navigator={navigator}/>);

    return content;
}

export class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: typeCN[this.props.type]
        };
    };
    render() {
        var content = PageBuilder(this.props.type, this.state.type, this.props.navigator);
        return (
            <View style={styles.container}>
                {content}
            </View>
        );
    }
}

class HeadBar extends React.Component {
    render() {
        return (
            <View style={styles.headBar}>
                <View style={{flex:2}}>
                    <Image source={IconSource[this.props.type]} style={styles.headBar_image}></Image>
                </View>
                <View style={styles.headBar_name}>
                    <TextInput style={styles.headBar_input} autoCapitalize='none' placeholder={this.props.typeCN+' 名称'} onChangeText={(value)=>{submitValue.headBarNmae=value;}}/>
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
    };
    componentWillUnmount() {
        this.subscription.remove();
    };
    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener('noteSave', (value) => {
            this.setState({
                note: value.value,
            });
        });
    }
    render() {
        return (
            <TouchableHighlight style={styles.noteBar} onPress={()=>{console.log(submitValue);this.props.navigator.push(routes[5])}} underlayColor='#D2D2D2'>
                <View>
                    <Text style={styles.noteBar_title} >备注</Text>
                    <Text style={styles.noteBar_content}>{this.state.note}</Text>
                    {
                        this.state.note == '' ?  (<View></View>) : (<Text style={styles.noteBar_edit}>点击以编辑</Text>)
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
                <TextInput onChangeText={(value)=>{noteContent.value=value;submitValue.noteContent = value;}} style={{flex:1,fontSize:16}} multiline={true}  placeholder={'名称'} autoCapitalize='none' />
            </View>
        )
    }
}

export function noteSave() {
    DeviceEventEmitter.emit('noteSave', noteContent);
    noteContent.navigator.pop();
}
export function DetailPageSave() {
    console.log(submitValue.Password);
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
            if(!submitValue.Password){
                submitValue.Password = {};
            }
            content.push(<PasswordComponent top={true} bottom={true} backgroundcolor={'#fff'} key={'PasswordComponent'+index} />);
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
    saveValue(value) {
        if (this.props.title == '密码') {
            this.props.changeText(value);
        }
        submitValue[this.props.groupName][this.props.type] = value;
        console.log(submitValue);
    }
    render() {
        return (
            <View>
                <Text style={styles.singleLayerInput_title}>{this.props.title}</Text>
                <TextInput style={styles.singleLayerInput_content} onChangeText={(value)=>{this.saveValue(value)}} autoCapitalize='none' placeholder={this.props.title} secureTextEntry={true}/>
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
        return (
            <View style={{backgroundColor:this.props.backgroundcolor,marginTop:10,marginBottom:10}}>
                <SingleLayerInput title='密码' changeText={(value)=>this.setState({passwordInput:value})} groupName='Password' type='Password'/>
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
