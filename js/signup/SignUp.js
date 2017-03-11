import React, {
	Component
} from 'react';
import {
	TouchableHighlight,
	TouchableOpacity,
	Button,
	View,
	Text,
	StyleSheet
} from 'react-native';

import NormalButton from '../common/Button';
var t = require('tcomb-form-native');
var Form = t.form.Form;
var User = t.struct({
	userId: t.String,
	password: t.String, // an optional string
	email: t.String,
});
var options = {
	fields: {
		password: {
			secureTextEntry: true
		},
		email: {
			// you can use strings or JSX
			error: 'Insert a valid email'
		}
	}
}; // optional rendering options (see documentation)

export class SignUpPage extends React.Component {
	render() {
		function as() {
			var value = this.refs.form.getValue();
			if (value) { // if validation fails, value will be null
				console.log(value); // value here is an instance of Person
				fetch('http://210.41.100.18:8080/signup', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(value)
				})
			}
		}
		return (
			<View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={User}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={as.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
		);
	}
}
var styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		marginTop: 50,
		padding: 20,
		backgroundColor: '#ffffff',
	},
	title: {
		fontSize: 30,
		alignSelf: 'center',
		marginBottom: 30
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	button: {
		height: 36,
		backgroundColor: '#48BBEC',
		borderColor: '#48BBEC',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	}
});
