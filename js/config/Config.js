import React, {
    Component
} from 'react';
import {
    View,
    Text,
    DeviceEventEmitter,
    StyleSheet,
    TouchableOpacity,
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
import IconSource from '../common/IconRequire';
export class ConfigPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{marginTop:20}} >
                   <ConfigHelp />
                   <ConfigButton text='Log Out'  onpress={()=>{updateAllLocalData()}}  />
                </View>
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
const styles = StyleSheet.create({
    Button: {
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#D2D2D2',
    },
    ButtonText: {
        textAlign: 'center',
        color: '#000',
        fontSize: 15,
    },
    container: {
        backgroundColor: '#F4F4F7',
        flex: 1,
        marginTop: 60,
    },
});
class ConfigButton extends React.Component {
    render() {
        const {
            text,
            backgroundColor,
            onpress,
            disabled,
        } = this.props;
        return (
            <TouchableOpacity style={styles.Button} onPress={onpress} disabled={disabled} >
                    <Text style={styles.ButtonText}>{text}</Text>
                </TouchableOpacity>
        )
    }
}

class ConfigHelp extends React.Component {
    render() {
        return (
            <View style={{
                paddingLeft:16,backgroundColor:'#FFF',marginBottom:20,borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#D2D2D2',
            }}>
            <TouchableOpacity style={{
                height: 40,
                justifyContent: 'center',
                backgroundColor: '#FFF',
                borderBottomWidth: 1,
                borderColor: '#D2D2D2',
            }}>
            <Text style={{
                color: '#000',
                fontSize: 15,
            }}>Help & Feedback</Text>
                </TouchableOpacity>
            <TouchableOpacity style={{
                height: 40,
                justifyContent: 'center',
                backgroundColor: '#FFF',
            }}>
            <Text style={{
                color: '#000',
                fontSize: 15,
            }}>About</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
