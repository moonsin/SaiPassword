import React, {
    Component
} from 'react';

import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
var {
    SearchBar
} = require('../common/searchBar');

const styles = StyleSheet.create({
    searchBar: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    LoginCenterTop: {
        marginTop: 32,
    },
});

export class CategoryPage extends React.Component {
    render() {
        return (
            <View style={{backgroundColor: '#FFF', flex: 1,marginTop:70}}>
                <View>
                    < SearchBar />      
                </View>
		    </View>
            )
    }
}
