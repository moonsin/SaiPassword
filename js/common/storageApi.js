var CryptoJS = require("crypto-js");

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
    storage.remove({
        key:'loginState',
    })
}
