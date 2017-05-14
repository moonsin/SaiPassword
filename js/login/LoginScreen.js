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
            firstSignIn: false,
        };
    }
    componentWillUnmount() {
        this.subscription.remove();
        AppState.removeEventListener('change');
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
        console.log(this.state.passwordInput);
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
                
                <View style={{flexDirection: 'row',justifyContent: 'center',marginTop:-100}} >
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
