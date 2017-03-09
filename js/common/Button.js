import React, {
	Component
} from 'react';
import {
    TouchableOpacity,
	Text,
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    Button: {
        width:228,
        height:40,
        borderRadius: 6,
		justifyContent: 'center',
    },
    ButtonText: {
        textAlign:'center',
        color:'#FFFFFF',
        fontSize:15,
    },
});

export default class NormalButton extends React.Component {
	render() {
        const{text,backgroundColor}=this.props;
		return (
                <TouchableOpacity style={[styles.Button,{backgroundColor:backgroundColor}]}>
                    <Text style={styles.ButtonText}>{text}</Text>
                </TouchableOpacity>
    	)
	}
}
