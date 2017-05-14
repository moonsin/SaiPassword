import React, {
    Component
} from 'react';
import {
    View,
    Text,
    DeviceEventEmitter,
} from 'react-native';
import {
    readUserId,
    loadSaiPassword,
    getLocalDataKind,
    getLocalAllKindData,
    getLocalKindAllData,
    getAllDataByKind,
    logout,
} from '../common/storageApi.js';
var CryptoJS = require("crypto-js");
import NormalButton from '../common/Button';
import IconSource from '../common/IconRequire';
export class ConfigPage extends React.Component {
    render() {
        return (
            <View style={{backgroundColor: '#FFF', flex: 1,marginTop:70,}}>
                <View style={{marginTop:20}} >
                   <NormalButton text='logout' backgroundColor='#2EBB4E' onpress={()=>{updateAllLocalData()}}  />
                </View>
            <Text>ConfigPage</Text>
		</View>)
    }
}


function updateAllLocalData() {
    readUserId().then(result => {
        storage.load({
            key: 'loginState',
        }).then(ret => {
            getAllDataByKind(IconSource).then(result => {
                storage.load({
                    key: 'SaipasswordAccessPassword',
                }).then(saiPass => {
                    console.log(result);
                    _encryptData(result, saiPass.password);
                    encryptResult = encryptedData;
                    console.log(encryptResult);
                    var updata = {
                        userId: ret.userid,
                        data: JSON.stringify(encryptResult)
                    };
                    fetch(ipAdress + '/logout', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updata)
                    }).then(res => {
                        return res.json()
                    }).then(data => {
                        if (data) {
                            logout();
                            setTimeout(() => {
                                DeviceEventEmitter.emit('logout');
                            }, 50);
                        }
                    });
                });
            });
        })
    });
    var encryptedData = {};

    function _encryptData(data, saiPass) {
        for (var idx in data) {
            encryptedData[idx] = [];
            data[idx].forEach(function(item, index) {
                encryptedData[idx][index] = {};
                encryptObject(item, saiPass, encryptedData[idx][index])
            })
        }
    }

    function encryptObject(item, saiPass, encryptDATA) {
        for (var idx in item) {
            if (typeof(item[idx]) == 'string') {
                encryptDATA[idx] = CryptoJS.AES.encrypt(item[idx], saiPass).toString();
            } else {
                encryptDATA[idx] = {};
                encryptObject(item[idx], saiPass, encryptDATA[idx]);
            }
        }
    }
}
