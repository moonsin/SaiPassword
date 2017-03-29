import React, {
    Component
} from 'react';
import IconSource from '../common/IconRequire';
import {
    TouchableHighlight,
    Image,
    DeviceEventEmitter,
    NavigatorIOS,
    ScrollView,
    StyleSheet,
    View,
    Text,
} from 'react-native';
var {
    SearchBar
} = require('../common/searchBar');

var {
    NavigatorBarMine
} = require('../common/myNavigatorBar');
const styles = StyleSheet.create({});

export class AddItem extends React.Component {
    render() {
        return (
            <View style={{backgroundColor: '#FFF', flex: 1,}}>
                <NavigatorBarMine rightButtonTitle="取消" title="添加" rightButtonOnpress={this.props.navigator.pop}/>
                <SearchBar title='主要保险库'/>      
                <ScrollView style={{zIndex:0}}>
                <AddItemList page='AddItem' navigator={this.props.navigator} />
                </ScrollView>
		    </View>
        );
    }
}

class AddItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewModule: null,
            addPage: false,
        }
    };
    makeModule(data, page, type) {
        var addview = [];
        var index = 0;
        for (var idx in data) {
            addview.push(<IconItem key={index++} navigator={this.props.navigator} title={idx} type={idx} source={IconSource[idx]} fromPage={page} />);
        }
        for (; index < 12; index++) {
            addview.push(<NormalItem key={index} />);
        }
        return addview;
    }
    componentDidMount() {
        function makeAllMoudule() {
            this.setState({
                viewModule: this.makeModule(IconSource, 'AddItem'),
            })
        }
        var makeAll = makeAllMoudule.bind(this);
        makeAll();
    }

    render() {
        return (
            <View>
                {this.state.viewModule}
            </View>
        )
    }
}


class IconItem extends Component {
    onpress() {
        DeviceEventEmitter.emit('AddItemPageChooseItem', {
            type: this.props.type
        });
        this.props.navigator.pop();
    }
    render() {
        return (
            <TouchableHighlight  onPress={()=>{this.onpress()}} underlayColor='#D2D2D2' >
                <View style={{flexDirection:'row',height:46}}>
                    <Image source={this.props.source} style={{marginLeft:10,marginRight:10,marginTop:7,width:36,height:36}}></Image>
                    <View  style={{borderColor:'#D2D2D2',borderBottomWidth:1,flex:1}}>
                        <Text style={{marginTop:16,fontSize:14,color:'#515151',fontFamily:'arial'}}>{this.props.title}</Text>
                    </View>
                </View>
           </TouchableHighlight>
        )
    }
}

class NormalItem extends Component {
    render() {
        return (
            <View style={{flexDirection:'row',height:46}}>
                <View  style={{borderColor:'#b8b8b8',borderBottomWidth:1,flex:1,marginLeft:10}}>
                </View>
           </View>
        )
    }

}
