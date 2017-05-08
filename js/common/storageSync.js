var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    AlertIOS,
} = ReactNative;
import {
    clearAllkindData,
    savePassword,
    rendeState,
    getLocalPassword,
    clearLoginState,
    clearSaiPassword,
} from '../common/storageApi';
var CryptoJS = require("crypto-js");

function prompt1(title, resolve) {
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
                            return text;
                        } else {
                            prompt1('wrong password');
                            console.log('false');
                        }
                    }
                });
            }
        }],
        'secure-text'
    );
}

export var sync = {
    loginState(params) {
        let {
            resolve
        } = params;
        storage.save({
            key: 'loginState', // 注意:请不要在key中使用_下划线符号!
            rawData: {
                from: 'firstSet',
                userid: null,
                passwordSHA256: null
            },

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        });
        resolve({
            userid: null
        });
    },
    Login(params) {
        let {
            resolve
        } = params;
        resolve(false);
    },
    Indentity(params) {
        let {
            resolve
        } = params;
        resolve(false);
    },
    BankCard(params) {
        let {
            resolve
        } = params;
        resolve(false);
    },
    BankAccount(params) {
        let {
            resolve
        } = params;
        resolve(false);
    },
    DataBase(params) {
        let {
            resolve
        } = params;
        resolve(false);
    },
    DriverLicense(params) {
        let {
            resolve
        } = params;
        resolve(false);
    },
    Password(params) {
        let {
            resolve
        } = params;
        resolve(false);
    },
    Email(params) {
        let {
            resolve
        } = params;
        resolve(false);
    },
    Note(params) {
        let {
            resolve
        } = params;
        resolve(false);
    },
    Passport(params) {
        let {
            resolve
        } = params;
        resolve(false);
    },
    SoftwareLicense(params) {
        let {
            resolve
        } = params;
        resolve(false);
    },
    WiFi(params) {
        let {
            resolve
        } = params;
        resolve(false);
    },
    SaipasswordAccessPassword(params) {
        let {
            resolve
        } = params;
        resolve(false);
    }
};
