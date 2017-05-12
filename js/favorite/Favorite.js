import React, {
    Component
} from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';

var {
    SearchBar
} = require('../common/searchBar');
var {
    ItemScrollView
} = require('../common/itemScrollView');

export class FavoritePage extends React.Component {
    render() {
        return (
            <View style={{backgroundColor: '#FFF', flex: 1,marginTop:64,}}>
                < SearchBar />      
                <ScrollView style={{marginTop:-65,zIndex:0}}>
                <ItemScrollView navigator={this.props.navigator} page='FavoritePage' />
                </ScrollView>
            </View>

        )
    }
}
