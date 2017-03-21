import React, {
	Component
} from 'react';
import {
	StyleSheet,
	View,
	TabBarIOS,
	Text,
} from 'react-native';
import {
	TabBarComponent,
} from '../common/TabBar';

export class CategoryPage extends React.Component {
	render() {
		return(
		<View style={{backgroundColor: '#FFF', flex: 1,}}>
			<TabBarComponent />
		</View>)
	}
}
