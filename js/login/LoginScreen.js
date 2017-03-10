import React, {
	Component
} from 'react';
import {
	Navigator,
	TouchableOpacity,
	Button,
	Image,
	View,
	Text,
	StyleSheet
} from 'react-native';

import NormalButton from '../common/Button';
import {SignUpPage} from'../signup/SignUp'; 

const styles = StyleSheet.create({
	LoginCenter: {
		marginTop: 50,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	LoginCenterTop: {
		marginTop: 32,
	},
});



class PasswordInput extends React.Component {
	render() {
		return (
			<Image source={require('../common/img/txt-input-copy.png')}>
            <Image source={require('../common/img/lock-icon.png')} style={{marginLeft:10,marginTop:8}}></Image>
            {/*<Text style={{textAlign:'center',backgroundColor:'#515151'}}>Inside</Text>*/}
            </Image>
		)
	}
}

class LoginScreen extends React.Component {
	render() {
		return (
			<View style={{backgroundColor: '#ececec', flex: 1,}}>
                <View style={styles.LoginCenter}>
                       <Text style={{color:'#515151', fontSize: 20}}>Welcome to SaiPassword</Text>
                </View>
                <View style={styles.LoginCenter}>
                    <Image source={require('../common/img/logo-mark.png')} />
                </View>
                {/*
                <View style={[styles.LoginCenter,styles.LoginCenterTop]}>
                    <PasswordInput />
                </View>
               */}
                <View style={[styles.LoginCenter,{marginTop:20}]}>
                   <NormalButton text='sign in' backgroundColor='#525252' />
                </View>
                <View style={[styles.LoginCenter,{marginTop:20}]} onPress={()=>this._navigate('signUp')}>
                   <NormalButton text='sign up' backgroundColor='#2EBB4E' onpress={()=>{this.props.navigator.push(routes[1]);}}  />
                </View>
                {/*
                <View style={[styles.LoginCenter,{marginTop:20}]}>
                   <NormalButton text='sign up' backgroundColor='green' />
                </View>
                */}
				<View style={{justifyContent:'flex-end',flex:1,marginBottom:24}}>
              <Button
				  onPress={()=>alert("那也是没有办法的事")}
				  title="Forgot password?"
				  color="#515151"
				  accessibilityLabel="Learn more about this purple button"/> 
				</View>
            </View>
		)
	}
}

export class LoginNav extends React.Component {
	render() {
		return (<Navigator
      initialRoute={routes[0]}
      renderScene={(route, navigator) =>{
		  let Component = route.component;
		return <Component  navigator={navigator} />
		}
	}
	/>
)
}}


const routes = [{
		name: 'LoginScreen',
		index: 0,
		component: LoginScreen
	},
	{
		name: 'SignUp',
		index: 1,
		component: SignUpPage
	}];
