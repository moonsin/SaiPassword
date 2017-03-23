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

export class CategoryPage extends React.Component {
    render() {
        return (
            <View style={{backgroundColor: '#FFF', flex: 1,marginTop:64,}}>
                < SearchBar />      
                <ScrollView style={{marginTop:-65,zIndex:0}}>
                <ItemScrollView />
                </ScrollView>
		    </View>
        )
    }
}
