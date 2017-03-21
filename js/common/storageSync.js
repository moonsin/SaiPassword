import {
    rendeState
} from '../common/storageApi';

export var sync = {
    loginState(params) {
        console.log(params);
        let{resolve} = params;
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
        resolve({userid:null});
    },
};
