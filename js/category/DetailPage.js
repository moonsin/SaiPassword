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
    noteBar_content:{
        fontFamily:'courier',
        fontSize:14,
        marginLeft:40,
        marginTop:4,
        marginBottom:2,
    },
    noteBar_edit:{
        fontFamily:'courier',
        fontSize:14,
        color:'red',
        marginLeft:40,
        marginBottom:5,
    }
});

var noteContent = {
    value:'',
    navigator:'',
};

function PageBuilder(pageType, typeCN, navigator) {
    var content = [];
    content.push(<HeadBar key={pageType} typeCN={typeCN} type={pageType}/>);
    if (pageType == 'Note') {
        content.push(<TextArea key='NoteTextArea' navigator={navigator}/>);
    }
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
        var content = PageBuilder(this.props.type,this.state.type,this.props.navigator);
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
                    <TextInput style={styles.headBar_input} autoCapitalize='none' placeholder={this.props.typeCN+' 名称'}/>
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
        this.subscription = DeviceEventEmitter.addListener('noteSave', (value) =>{
            this.setState({
                note:value.value,
            });
        });
    }
    render() {
        return (
            <TouchableHighlight style={styles.noteBar} onPress={()=>{this.props.navigator.push(routes[5])}} underlayColor='#D2D2D2'>
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
        noteContent.navigator=this.props.navigator;
        return (
            <View style={{flex:1,marginTop:70,marginLeft:15,backgroundColor:'#FFFF',marginRight:15}}>
                <TextInput onChangeText={(value)=>{noteContent.value=value}} style={{flex:1,fontSize:16}} multiline={true}  placeholder={'名称'} autoCapitalize='none' />
            </View>
        )
    }
}

export function noteSave() {
    DeviceEventEmitter.emit('noteSave', noteContent);
    noteContent.navigator.pop();
}
