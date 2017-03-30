import React, {
	Component
} from 'react';

import {
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

const styles = StyleSheet.create({});

export class KindListPage extends React.Component {
	componentWillMount() {
		this.marginTop = 0;
		if (this.props.fromPage == 'CategoryPage' || this.props.fromPgae == 'changeDetailPage') {
			this.marginTop = -65;
		}
	}
	render() {

		return (
			<View style={{backgroundColor: '#FFF', flex: 1,marginTop:64,}}>
                <SearchBar />      
                <ScrollView style={{marginTop:this.marginTop,zIndex:0}}>
                <ItemScrollView navigator={this.props.navigator} page='KindListPage' type={this.props.type} />
                </ScrollView>
		    </View>
		)
	}
}
