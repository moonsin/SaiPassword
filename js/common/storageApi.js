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
export function readUserId() {
    return storage.load({
        key: 'loginState',
    })
}
export function savePassword(pw) {
    storage.save({
        key: 'SaipasswordAccessPassword',
        rawData: {
            password: pw,
        },
        expires: 100 * 100 * 3600
    })
}

export function loadSaiPassword() {
    return storage.load({
        key: 'SaipasswordAccessPassword',
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
export function logout(){
    clearLoginState();
    clearAllkindData();
    clearSaiPassword();
}
export function clearLoginState(localPassword) {
    storage.remove({
	    key:'loginState',
	})
    //storage.clearMapForKey('Password');
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
    //    storage.load({key:'SaipasswordAccessPassword',}).then(ret=>{console.log(ret);})
    storage.remove({
        key: 'SaipasswordAccessPassword',
    });
}
export function deleteItem(type, id) {
    storage.remove({
        key: type,
        id: id
    });
}

export function getLocalDataKind(AllKindData) {
    var existData = [];
    var localKindData = {};
    for (var idx in AllKindData) {
        existData.push({
            key: idx,
            id: '1',
        });
    }
    var getLocalKind = function() {
        return storage.getBatchData(existData)
    }
    var getIfKind = async function() {
        var existArray = await getLocalKind();
        existArray.forEach(function(item) {
            if (item != false) {
                localKindData[item.pageKind] = true;
            }
        })
        return localKindData;
    }
    return getIfKind();
}

export function getLocalAllKindData(AllKindData) {
    var allData = {};
    var allDataFormat = {};
    var getKindDataByType = function(type) {
        return storage.getAllDataForKey(type);
    }
    var getData = async function(type) {
        for (var idx in AllKindData) {
            var data = await getKindDataByType(idx);
            if (data != '') {
                allData[idx] = data;
            }
        }
        for (var idx in allData) {
            allData[idx].forEach(function(item, indexNum) {
                allDataFormat[item.headBarName] = {};
                //深度赋值
                for (var index in item) {
                    allDataFormat[item.headBarName][index] = item[index];
                }
                allDataFormat[item.headBarName].id = indexNum + 1;
            })
        }
        return allDataFormat;
    }
    return getData();
}

export function getLocalKindAllData(type) {
    var getKindDataByType = function(type) {
        return storage.getAllDataForKey(type);
    }
    var getData = async function() {
        var data = await getKindDataByType(type);
        var formatData = {};
        data.forEach(function(item, index) {
            formatData[item.headBarName] = {};
            //深度赋值
            for (var idx in item) {
                formatData[item.headBarName][idx] = item[idx];
            }
            formatData[item.headBarName].id = index + 1;
        });
        return formatData;
    }
    return getData();
}
