import React, {
    Component
} from 'react';
import {
    View,
    Text,
} from 'react-native';
import {
    loadSaiPassword,
    getLocalDataKind,
    getLocalAllKindData,
    getLocalKindAllData,
} from '../common/storageApi.js';
import IconSource from '../common/IconRequire';
export class ConfigPage extends React.Component {
    render() {
        getLocalAllKindData(IconSource).then(result=>{
        console.log(result);
        });
        return (
            <View style={{backgroundColor: '#FFF', flex: 1,marginTop:70,}}>
            <Text>ConfigPage</Text>
		</View>)
    }
}
