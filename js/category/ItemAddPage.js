import React, {
    Component
} from 'react';

import {
    TextInput,
    Image,
    ScrollView,
    StyleSheet,
    View,
    Text,
} from 'react-native';
import IconSource from '../common/IconRequire';
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
    }
});

export class ItemAddPage extends React.Component {
    render() {
        console.log(this.route);
        return (
            <View style={styles.container}>
                <HeadBar type={this.props.type}/> 
            
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
                    <TextInput style={styles.headBar_input} autoCapitalize='none' placeholder={this.props.type+' name'}/>
                </View>
            </View>
        )

    }
}

