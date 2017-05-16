import React, {
    Component
} from 'react';
import {
    AppState,
    DeviceEventEmitter,
    TextInput,
    Navigator,
    TouchableOpacity,
    Button,
    Image,
    View,
    Text,
    StyleSheet
} from 'react-native';

import NormalButton from '../common/Button';
import routes from '../router/Router';
import {
    clearAllkindData,
    savePassword,
    rendeState,
    getLocalPassword,
    clearLoginState,
    clearSaiPassword,
    saveServerData,
} from '../common/storageApi';
var CryptoJS = require("crypto-js");
const styles = StyleSheet.create({
    LoginCenter: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    LoginCenterTop: {
        marginTop: 32,
    },
    LoginCenterTopLittle: {
        marginTop: 20,
    },

});
export class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ifLogin: null,
            passwordInput: null,
            userIdInput: null,
            keyInput: null,
            firstSignIn: false,
        };
    }
    componentWillUnmount() {
        this.subscription.remove();
        this.logOut.remove();
        //AppState.removeEventListener('change');
    };
    componentWillMount() {
        var rendeByState = rendeState.bind(this);
        rendeByState();
    }
    _clearPasswordAndTest() {
        clearSaiPassword();
        routes[0].passProps = {
            test: true,
        }
        this.props.navigator.push(routes[0]);
    }
    componentDidMount() {
        // AppState.addEventListener('change', this._clearPasswordAndTest);
        this.subscription = DeviceEventEmitter.addListener('setLoginStateTrue', () => this.setState({
            ifLogin: true
        }));
        this.logOut = DeviceEventEmitter.addListener('logout', () => this.setState({
            ifLogin: false
        }));

    }
    signIn() {
        getLocalPassword().then((result) => {
            console.log(result);
            if (result.from == 'firstSet') {
                this.setState({
                    firstSignIn: true,
                })
            } else {
                if (CryptoJS.SHA256(this.state.passwordInput).toString() == result.passwordSHA256) {
                    savePassword(this.state.passwordInput);
                    this.setState({
                        userIdInput: null,
                        keyInput: null,
                        passwordInput: null,
                    })
                    if (this.props.test) {
                        this.props.navigator.pop();
                    } else {
                        this.props.navigator.push(routes[2]);
                    }
                } else {
                    if (this.state.passwordInput == '') {
                        alert('请输入密码');
                    } else {
                        alert('密码错误');
                    }
                }
            }
        });
        //测试用
        //this.props.navigator.push(routes[2]);
    }
    firstSignIn() {
        console.log(this.state.userIdInput);
        console.log(this.state.keyInput);
        console.log(this.state.passwordInput);
        if (this.state.userIdInput == null || this.state.keyInput == null || this.state.passwordInput == null) {
            alert('不能为空');
        } else {
            //password: CryptoJS.AES.encrypt(this.state.passwordInput, this.state.keyInput).toString(),
            var updata = {
                userId: this.state.userIdInput,
            }
            fetch(ipAdress + '/firstLogin', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updata),
            }).then((res) => {
                return res.json();
            }).then((data) => {
                if (data.password) {
                    if (this.state.passwordInput == CryptoJS.AES.decrypt(data.password, this.state.keyInput).toString(CryptoJS.enc.Utf8)) {
                        var updata = {
                            userId: this.state.userIdInput,
                            password: data.password,
                        }
                        fetch(ipAdress + '/getData', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updata),
                        }).then((res) => {
                            return res.json();
                        }).then((data) => {
                            console.log(data);
                            storage.save({
                                key: 'loginState', // 注意:请不要在key中使用_下划线符号!
                                rawData: {
                                    from: 'login',
                                    userid: this.state.userIdInput,
                                    passwordSHA256: CryptoJS.SHA256(this.state.passwordInput).toString(),
                                },
                                expires: null
                            });
                            savePassword(this.state.passwordInput);
                            saveServerData(data.data,this.state.passwordInput);
                            this.setState({
                                userIdInput: null,
                                keyInput: null,
                                passwordInput: null,
                            })
                            if (this.props.test) {
                                this.props.navigator.pop();
                            } else {
                                this.props.navigator.push(routes[2]);
                            }
                        })
                    } else {
                        alert('key/password错误');
                    }
                } else {
                    alert('用户不存在');
                }
            });
        }
    }
    render() {
        if (this.state.firstSignIn == true) {
            return (
                <View style={{backgroundColor: '#ececec', flex: 1,}}>
                <View style={styles.LoginCenter}>
                       <Text style={{color:'#515151', fontSize: 20}}>Welcome to SaiPassword</Text>
                </View>
                <View style={styles.LoginCenter}>
                    <Image source={require('../common/img/logo-mark.png')} />
                </View>
               
                <View style={[styles.LoginCenterTopLittle,{flexDirection:'column',flex:1,marginLeft:76}]}>
                     	<Image source={require('../common/img/txt-input-copy.png')} style={{flexDirection:'row'}}>
							 <TextInput
								style={{height: 26, width:160,marginLeft:10,marginTop:7}}
								secureTextEntry={false}
                                autoCorrect={false}
                                autoCapitalize="none"
								onChangeText={(text) => this.setState({
									userIdInput:text
								})}
								value={this.state.userIdInput}
      						/> 
            			</Image>
                    <Image source={require('../common/img/txt-input-copy.png')} style={{flexDirection:'row',marginTop:10}}>
            			<Image source={require('../common/img/key-icon.png')} style={{width:20,height:20,marginLeft:10,marginTop:8}}></Image>
							 <TextInput
								style={{height: 26, width:160,marginLeft:10,marginTop:7}}
								secureTextEntry={true}
								onChangeText={(text) => this.setState({
									keyInput:text
								})}
								value={this.state.keyInput}
      						/> 
            		</Image>
                	<Image source={require('../common/img/txt-input-copy.png')} style={{flexDirection:'row',marginTop:10}}>
            			<Image source={require('../common/img/lock-icon.png')} style={{marginLeft:10,marginTop:8}}></Image>
							 <TextInput
								style={{height: 26, width:160,marginLeft:10,marginTop:7}}
								secureTextEntry={true}
								onChangeText={(text) => this.setState({
									passwordInput:text
								})}
								value={this.state.passwordInput}
      						/> 
            		</Image>
                </View> 
                
                <View style={{flexDirection: 'row',justifyContent: 'center',marginTop:0}} >
                    <NormalButton text='sign in' backgroundColor='#525252' onpress={this.firstSignIn.bind(this)} />
                </View>
                <View style={{justifyContent:'flex-end',flex:1,marginBottom:24}}>
              <Button
				  onPress={clearAllkindData}
				  title="Forgot password?"
				  color="#515151"
				  accessibilityLabel="Learn more about this purple button"/> 
				</View>
            </View>
            )
        }
        if (this.state.ifLogin == null) {
            return (<View style={{backgroundColor: '#ececec', flex: 1,}}>
					</View>)
        }
        return (
            <View style={{backgroundColor: '#ececec', flex: 1,}}>
                <View style={styles.LoginCenter}>
                       <Text style={{color:'#515151', fontSize: 20}}>Welcome to SaiPassword</Text>
                </View>
                <View style={styles.LoginCenter}>
                    <Image source={require('../common/img/logo-mark.png')} />
                </View>
                {
					this.state.ifLogin == true?(
                <View style={[styles.LoginCenter,styles.LoginCenterTop]}>
                	<Image source={require('../common/img/txt-input-copy.png')} style={{flexDirection:'row'}}>
            			<Image source={require('../common/img/lock-icon.png')} style={{marginLeft:10,marginTop:8}}></Image>
							 <TextInput
								style={{height: 26, width:160,marginLeft:10,marginTop:7}}
								secureTextEntry={true}
								onChangeText={(text) => this.setState({
									passwordInput:text
								})}
								value={this.state.passwordInput}
      						/> 
            			</Image>
                </View>) 
                :(
				<View style={[styles.LoginCenter,{marginTop:20}]} onPress={()=>this._navigate('signUp')}>
                   <NormalButton text='sign up' backgroundColor='#2EBB4E' onpress={()=>{this.props.navigator.push(routes[1]);}}  />
                </View>
						)
               }
                <View style={[styles.LoginCenter,{marginTop:20}]} >
                	<NormalButton text='sign in' backgroundColor='#525252' onpress={this.signIn.bind(this)} />
                </View>
                <View style={{justifyContent:'flex-end',flex:1,marginBottom:24}}>
              <Button
				  onPress={clearAllkindData}
				  title="Forgot password?"
				  color="#515151"
				  accessibilityLabel="Learn more about this purple button"/> 
				</View>
            </View>
        )
    }
}
