import React, {
    Component
} from 'react';
import {
    NavigatorIOS,
    StyleSheet,
    View,
    TabBarIOS,
    Text,
} from 'react-native';

var {
    CategoryPage
} = require('../category/Category');
var {
    FavoritePage
} = require('../favorite/Favorite');
var {
    ArrangePage
} = require('../arrange/Arrange');
var {
    ConfigPage
} = require('../config/Config');
import routes from '../router/Router';
import {
    TabBarIcon
} from './img/base64Icon';

var styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
});

export class TarBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'category',
        };
    }
    _renderContent(pageComponent,title) {
        return (
            <NavigatorIOS                     
				 style={{flex: 1}}                     
				 initialRoute={{                            
	    		 component: pageComponent,                           
			 	 title:title ,
                 rightButtonIcon:require('./img/add-30.png'),
                 onRightButtonPress:()=>{this.props.navigator.push(routes[3])}
                       }}                   
                 tintColor="red"
                 barTintColor="#f9f9f9"
              />
        );
    }
    render() {
        return (
            <View style={{backgroundColor: '#FFF', flex: 1,}}>
			<TabBarIOS
                tintColor="red"
                translucent={true}    
                barTintColor="#f9f9f9"
            >
	            <TabBarIOS.Item
				  	icon={{uri:TabBarIcon.favorite,scale:2}}
                    title="收藏夹"
                    selected={this.state.selectedTab === 'favorite'}
                    selectedIcon={{uri:TabBarIcon.favorite_filled,scale:2}}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'favorite',
                        });
                    }}>
	              {this._renderContent(FavoritePage,'收藏夹')}
 			  </TabBarIOS.Item>			
              <TabBarIOS.Item
				  icon={{uri:TabBarIcon.category,scale:2}}
                  title="类别"
				  onPress={() => {this.setState({selectedTab:'category'})}}
                  selected={this.state.selectedTab === 'category'}
                  selectedIcon={{uri:TabBarIcon.category_filled,scale:2}}
			  >
	              {this._renderContent(CategoryPage,'类别')}
                  </TabBarIOS.Item>
              <TabBarIOS.Item
				  icon={{uri:TabBarIcon.arrange,scale:2}}
                  title="整理"
				  onPress={() => {this.setState({selectedTab:'arrange'})}}
                  selected={this.state.selectedTab === 'arrange'}
                  selectedIcon={{uri:TabBarIcon.arrange_filled,scale:2}}
              >
	              {this._renderContent(ArrangePage,'整理')}
              </TabBarIOS.Item>
              <TabBarIOS.Item
				  icon={{uri:TabBarIcon.config,scale:2}}
                  title="设置"
			      onPress={() => {this.setState({selectedTab:'config'})}}
                  selected={this.state.selectedTab === 'config'}
                  selectedIcon={{uri:TabBarIcon.config_filled,scale:2}}
              >
	              {this._renderContent(ConfigPage,'设置')}
              </TabBarIOS.Item>
		</TabBarIOS>
        </View>
        )
    }
}
