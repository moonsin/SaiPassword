import React, {
    Component
} from 'react';

import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

const styles = StyleSheet.create({
    searchBar: {
        height: 40,
        backgroundColor: '#F4F4F4',
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        color: '#878787',
    }
});

export class SearchBar extends Component {
    render() {
        return (
            <View style={styles.searchBar} >
            {
                !!this.props.title==true?(
                <Text style={styles.text}>{this.props.title}</Text> 
                ):(
                    <Text></Text>
                )
            }
            </View>
        )
    }
}
