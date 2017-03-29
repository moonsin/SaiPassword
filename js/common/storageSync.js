import {
    rendeState
} from '../common/storageApi';

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
    SaipasswordAccessPassword(params){
        let {
            resolve
        } = params;
        resolve(false);
    }
};
