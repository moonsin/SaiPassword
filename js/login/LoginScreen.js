import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    red: {
        color: 'red',
    },
});

export class LoginScreen extends React.Component {
    render() {
        return (
            <View style={{backgroundColor: '#ececec', flex: 1,}}>
                       <Text>Hi! My name is props.title.</Text>
                </View>
        )
    }
}
