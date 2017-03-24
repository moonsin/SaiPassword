import React, {
    Component
} from 'react';

import {
    TouchableHighlight,
    Image,
    ScrollView,
    StyleSheet,
    View,
    Text,
} from 'react-native';
import routes from '../router/Router';

import IconSource from './IconRequire';

var AllItems = require('../common/img/category/Full Moon-30.png');

const styles = StyleSheet.create({
    searchBar: {
        height: 40,
        backgroundColor: '#F4F4F4',
    },
});

export class ItemScrollView extends Component {
    constructor(props) {
        super(props);
    };

    makeModule(data, page) {
        var addview = [];
        var index = 0;
        if (page != 'AddItem') {
            addview.push(<IconItem key={index++} navigator={this.props.navigator}  type={'All Items'} source={AllItems} />);
        }
        for (var idx in data) {
            addview.push(<IconItem key={index} navigator={this.props.navigator} type={idx} source={IconSource[idx]} />);
            index++;
        }
        for (; index < 12; index++) {
            addview.push(<NormalItem key={index} />);
        }
        return addview;
    }

    render() {
        var viewModule;
        if (this.props.page == 'AddItem') {
            viewModule = this.makeModule(IconSource, 'AddItem');
        } else {
            viewModule = this.makeModule({}, 'category');
        }
        return (
            <View>
                {viewModule}
            </View>
        )
    }
}

class IconItem extends Component {
    render() {
        return (
            <TouchableHighlight  onPress={()=>{routes[4].passProps={type:this.props.type};this.props.navigator.push(routes[4])}} underlayColor='#D2D2D2' >
                <View style={{flexDirection:'row',height:46}}>
                    <Image source={this.props.source} style={{marginLeft:10,marginRight:10,marginTop:7,width:36,height:36}}></Image>
                    <View  style={{borderColor:'#D2D2D2',borderBottomWidth:1,flex:1}}>
                        <Text style={{marginTop:16,fontSize:14,color:'#515151',fontFamily:'arial'}}>{this.props.type}</Text>
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
