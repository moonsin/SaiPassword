import {
    DeviceEventEmitter,
    AlertIOS,
} from 'react-native';
import routes from '../router/Router';
var CryptoJS = require("crypto-js");
import {
    loadSaiPassword,
    savePassword,
    getLocalPassword,
} from './storageApi.js';

export function PasswordPrompt(title) {
    AlertIOS.prompt(
        title,
        'password is expired,please enter it again', [{
            text: 'OK',
            onPress: text => {
                console.log("You entered " + text)
                getLocalPassword().then((result) => {
                    if (result.from == 'firstSet') {} else {
                        if (CryptoJS.SHA256(text).toString() == result.passwordSHA256) {
                            console.log('true');
                            savePassword(text);
                            DeviceEventEmitter.emit('setSaiPassword');
                          } else {
                            PasswordPrompt('wrong password');
                            console.log('false');
                        }
                    }
                });
            }
        }],
        'secure-text'
    );
}
