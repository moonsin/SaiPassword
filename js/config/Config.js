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
    logout,
} from '../common/storageApi.js';
import NormalButton from '../common/Button';
import IconSource from '../common/IconRequire';
export class ConfigPage extends React.Component {
    render() {
        return (
            <View style={{backgroundColor: '#FFF', flex: 1,marginTop:70,}}>
                <View style={{marginTop:20}} >
                   <NormalButton text='sign up' backgroundColor='#2EBB4E' onpress={()=>{updateAllLocalData()}}  />
                </View>
            <Text>ConfigPage</Text>
		</View>)
    }
}

function updateAllLocalData() {
    readUserId().then(result => {
        getLocalAllKindData(IconSource).then(result => {
            var updata = {
                userId: result.userid,
                data: JSON.stringify(result)
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
}
