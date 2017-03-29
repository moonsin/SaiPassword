import React, {
    Component
} from 'react';

import {
    ScrollView,
    StyleSheet,
    View,
    Text,
} from 'react-native';
var {
    SearchBar
} = require('../common/searchBar');
var {
    ItemScrollView
} = require('../common/itemScrollView');

const styles = StyleSheet.create({
});

export class KindListPage extends React.Component {
    render() {
        var marginTop = -65;
        console.log(this.props.fromPage);
        if(this.props.fromPage == 'addItemDetail'){
            marginTop = 0;
        }
        return (
            <View style={{backgroundColor: '#FFF', flex: 1,marginTop:64,}}>
                < SearchBar />      
                <ScrollView style={{marginTop:marginTop,zIndex:0}}>
                <ItemScrollView navigator={this.props.navigator} page='KindListPage' type={this.props.type} />
                </ScrollView>
		    </View>
        )
    }
}
