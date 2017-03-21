import React, {
	Component
} from 'react';
import {
	AsyncStorage,
	View,
	Text
} from 'react-native';
import Storage from 'react-native-storage';

var {sync} =require('./common/storageSync'); 
var storage = new Storage({
	// 最大容量，默认值1000条数据循环存储
	size: 1000,

	// 如果不指定则数据只会保存在内存中，重启后即丢失
	storageBackend: AsyncStorage,

	// 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
	defaultExpires: 1000 * 3600 * 24 * 7,

	// 读写时在内存中缓存数据。默认启用。
	enableCache: true,

	// 如果storage中没有相应数据，或数据已过期，
	// 则会调用相应的sync方法，无缝返回最新数据。
	sync:sync 
})
global.ipAdress ='http://210.41.96.122:8888'; 
global.storage = storage;

var {
	NavigatorSai
} = require('./router/Navigator');

class setup extends Component {
	render() {
		return ( < NavigatorSai / > )
	}
}

module.exports = setup;
