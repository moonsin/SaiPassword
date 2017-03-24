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
      configureScene={(route, routeStack) =>{
          var conf;
          console.log(route);
          if(route.name == 'AddItem' ||route.name == 'ItemAddPage'){
              conf = Navigator.SceneConfigs.FloatFromBottom ; 
          }
          else{
               conf = Navigator.SceneConfigs.HorizontalSwipeJump;
          }
          conf.gestures = null;
          return conf;
      }}
      renderScene={(route, navigator) =>{
		  let Component = route.component;
		return <Component  navigator={navigator}  />
        }
    }
    />
)
}
}

import routes from './Router';
