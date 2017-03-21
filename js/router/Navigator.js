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

export class NavigatorSai extends React.Component {
    render() {	
        return (<Navigator
      initialRoute={routes[0]}
      configureScene={(route, routeStack) => Navigator.SceneConfigs.HorizontalSwipeJump}
      renderScene={(route, navigator) =>{
		  let Component = route.component;
		return <Component  navigator={navigator}  />
        }
    }
    />
)}
}

import routes from './Router';
