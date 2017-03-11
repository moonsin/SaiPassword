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

import routes from '../router/Router';
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
			secureTextEntry: true,
			label: 'password',
			error: 'Insert a valid password',
		},
		email: {
			// you can use strings or JSX
			error: 'Insert a valid email',
		},
		userId: {
			label: 'user name',
			error: 'Insert a valid user name',
		},
	}
}; // optional rendering options (see documentation)

export class SignUpPage extends React.Component {

	constructor(props) {
		super(props);
		this.name = '123';
		this.state = {
			options: options,
			value: null
		};
	}

	submit() {
		var value = this.refs.form.getValue();
		var getBack = this.props.navigator.pop;

		if (value) { // if validation fails, value will be null
			fetch('http://210.41.100.18:8080/signup', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(value)
			}).then((res) => {
				return res.json();
			}).then((data) => {
				var userExist = data.userExist
				if (!userExist) {
					alert('用户创建成功');
					getBack();
				} else {
					var options = t.update(this.state.options, {
						fields: {
							userId: {
								error: {
									'$set': 'Login has already existed'
								},
								hasError: {
									'$set': true
								}
							}
						}
					});
					this.setState({
						options: options,
						value: value
					});
				}
			});
		}
	}

	render() {
		return (
			<View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={User}
          options={this.state.options}
 		  value={this.state.value}
        />
        <TouchableHighlight style={styles.button} onPress={this.submit.bind(this)} underlayColor='#99d9f4'>
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
