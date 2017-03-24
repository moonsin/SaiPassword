import React, {
    Component
} from 'react';

import {
    NavigatorIOS,
    ScrollView,
    StyleSheet,
    View,
    Text,
} from 'react-native';
var {
    SearchBar
} = require('../common/searchBar');
var {
    ItemScrollView
} = require('../common/itemScrollView');

const styles = StyleSheet.create({
});

export class AddItem extends React.Component {
    render() {
        return (
            <NavigatorIOS                     
				 style={{flex: 1}}                     
				 initialRoute={{                            
	    		 component:AddItemPage ,                           
			 	 title:'选择类别',
                 rightButtonTitle:'取消',
                 onRightButtonPress:()=>{this.props.navigator.pop()}
                       }}                   
                 tintColor="red"
                 barTintColor="#f9f9f9"
              />
        );
    }
}

class AddItemPage extends React.Component{
    render(){
        return(
            <View style={{backgroundColor: '#FFF', flex: 1,marginTop:64,}}>
                < SearchBar title='主要保险库'/>      
                <ScrollView style={{marginTop:-65,zIndex:0}}>
                <ItemScrollView page='AddItem' navigator={this.props.navigator} />
                </ScrollView>
		    </View>
        )
    }
}
