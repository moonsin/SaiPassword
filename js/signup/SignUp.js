import React, {
    Component
} from 'react';
import {
    Keyboard,
    ScrollView,
    DeviceEventEmitter,
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
var CryptoJS = require("crypto-js");
var Form = t.form.Form;
var User = t.struct({
    userId: t.String,
    password: t.String, // an optional string
    passwordConfirm: t.String,
    key: t.String,
    email: t.String,
});

var options = {
    fields: {
        password: {
            secureTextEntry: true,
            label: 'password',
            error: 'Insert a valid password',
        },
        passwordConfirm: {
            secureTextEntry: true,
            label: 'confirm your password',
            error: 'Insert your password again',
        },
        key: {
            secureTextEntry: true,
            label: 'keyword to Encrypt(please remember!!!write it down!)',
            error: 'Insert a keyword',
        },
        email: {
            error: 'Insert a valid email',
            keyboardType: 'email-address',
            onFocus: () => DeviceEventEmitter.emit('openBoard'),
        },
        userId: {
            autoCapitalize:'none',
            label: 'user name',
            error: 'Insert a valid user name',
            keyboardType: 'default',
        },
    }
}; // optional rendering options (see documentation)

export class SignUpPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: options,
            value: null,
            defaultOpt: options,
        };
    }
    componentWillUnmount() {
        this.keyboardOpen.remove();
        this.keyboardClose.remove();
    };
    componentDidMount() {
        this.keyboardOpen = DeviceEventEmitter.addListener('openBoard', () => {
            this.refs.scrollview.scrollToEnd({
                animated: true
            });
        })
        this.keyboardClose = Keyboard.addListener('keyboardWillHide', () => {
            this.refs.scrollview.scrollTo({
                x: 0,
                y: 0,
                animated: true
            });
        })
    }
    submit() {
        var value = this.refs.form.getValue();
        var getBack = this.props.navigator.pop;
        this.state.options = this.state.defaultOpt;

        function testPasswordStrength(password) {
            if (password.length <= 7) {
                return 'password length must be over 8 numbers or letters';
            }
            return false;
        }

        function testPasswordConfirm(password, passConfirm) {
            if (passConfirm != password) {
                return 'The passwords you entered must be the same';
            }
            return false;
        }

        function testEmailFormat(email) {
            var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!emailReg.test(email)) {
                return 'input correct email';
            }
            return false;
        }
        if (value) {
            let passwordErr = testPasswordStrength(value.password);
            let emailErr = testEmailFormat(value.email);
            let passConfirmErr = testPasswordConfirm(value.password, value.passwordConfirm);
            if (passwordErr || emailErr || passConfirmErr) {
                var options = t.update(this.state.options, {
                    fields: {
                        password: {
                            error: {
                                '$set': passwordErr
                            },
                            hasError: {
                                '$set': passwordErr
                            }
                        },
                        email: {
                            error: {
                                '$set': emailErr
                            },
                            hasError: {
                                '$set': emailErr
                            }
                        },
                        passwordConfirm: {
                            error: {
                                '$set': passConfirmErr
                            },
                            hasError: {
                                '$set': passConfirmErr
                            }
                        },
                    }
                });
                this.setState({
                    options: options,
                    value: value
                });
                return;
            }
            var updata = {
                password: CryptoJS.AES.encrypt(value.password, value.key).toString(),
                userId: value.userId,
                email: value.email
            };
            fetch(ipAdress + '/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updata)
            }).then((res) => {
                return res.json();
            }).then((data) => {
                var userExist = data.userExist
                if (!userExist) {
                    alert('用户创建成功');
                    storage.save({
                        key: 'loginState', // 注意:请不要在key中使用_下划线符号!
                        rawData: {
                            from: 'some other site',
                            userid: value.userId,
                            passwordSHA256: CryptoJS.SHA256(value.password).toString(),
                        },
                        expires: null
                    });
                    DeviceEventEmitter.emit('setLoginStateTrue');
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
			<ScrollView ref='scrollview' keyboardDismissMode={'interactive'} keyboardShouldPersistTaps={'never'}  >
				  <Form
				  ref="form"
				  type={User}
				  options={this.state.options}
				  value={this.state.value}
				/>
				<TouchableHighlight style={styles.button} onPress={this.submit.bind(this)} underlayColor='#99d9f4'>
				  <Text style={styles.buttonText}>Save</Text>
				</TouchableHighlight>
			</ScrollView>
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
        justifyContent: 'center',
        marginBottom: 240,
    }
});
