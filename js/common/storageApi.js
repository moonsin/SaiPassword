var CryptoJS = require("crypto-js");
import IconSource from './IconRequire';

export function rendeState() {
	storage.load({
		key: 'loginState',
	}).then(ret => {
		//storage.remove({
		//  key: 'loginState'  
		//})

		this.setState({
			ifLogin: !!ret.userid
		})
	}).catch(err => {
		// 如果没有找到数据且没有sync方法，
		// 或者有其他异常，则在catch中返回
		console.warn(err.message);
		switch (err.name) {
			case 'NotFoundError':
				// TODO;
				break;
			case 'ExpiredError':
				// TODO
				break;
		}
	})
}
export function savePassword(pw) {
	storage.save({
		key: 'SaipasswordAccessPassword',
		rawData: {
			password: pw,
		},
		//有效期半小时
		expires: 500 * 3600
	})
}
export function getLocalPassword(localPassword) {
	var readStorageByLoginState = function() {
		return storage.load({
			key: 'loginState',
		}).catch(err => {
			// 如果没有找到数据且没有sync方法，
			// 或者有其他异常，则在catch中返回
			console.warn(err.message);
			switch (err.name) {
				case 'NotFoundError':
					// TODO;
					break;
				case 'ExpiredError':
					// TODO
					break;
			}
		})
	}

	var getStorageByPassword = async function() {
		var ret = await readStorageByLoginState();
		return ret;
	}
	return getStorageByPassword();

}

export function clearLoginState(localPassword) {
	/*storage.remove({
	    key:'Login',
	})
	*/
	storage.clearMapForKey('Password');
}
export function clearAllkindData() {
		for (var idx in IconSource) {
			function clearOne(type) {
				return storage.clearMapForKey(type);
			}
			clearOne(idx);
		}
	/*storage.getAllDataForKey('Login').then((ret) => {
		console.log(ret);
	})
	*/
}

export function clearSaiPassword() {
	storage.clearMapForKey('SaipasswordAccessPassword');
}
