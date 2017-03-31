import routes from '../router/Router';
import {
    clearNoteContent,
    noteReset,
    DetailPageSave,
    clearSubmitValues,
} from '../category/DetailPage';
import {
    DeviceEventEmitter,
} from 'react-native';
export function AddItemDetailPagetoDetail(type, id, navigator) {
    clearSubmitValues();
    routes[4].passProps = {
        type: type,
        id: id,
        editable: false,
    };
    routes[4].rightButtonTitle = '编辑';
    routes[4].onRightButtonPress = () => {
        clearNoteContent();
        routes[4].onLeftButtonPress = () => {
            clearSubmitValues();
            routes[4].onLeftButtonPress = () => {
                routes[6].passProps = {
                    type: type,
                    fromPage: 'changeDetailPage',
                };
                navigator.replacePreviousAndPop(routes[6]);
            };
            routes[4].rightButtonTitle = '';
            navigator.pop();
        }
        routes[4].passProps = {
            type: type,
            id: id,
            editable: true,
        }
        routes[4].rightButtonTitle = '完成';
        routes[4].onRightButtonPress = () => {
            DetailPageSave(true, type, id).then(() => {
                clearSubmitValues();
                routes[4].onLeftButtonPress = () => {
                    routes[6].passProps = {
                        type: type,
                        fromPage: 'changeDetailPage',
                    };
                    navigator.replacePreviousAndPop(routes[6]);
                };
                routes[4].passProps = {
                    type: type,
                    id: id,
                    editable: false,
                };
                routes[4].rightButtonTitle = '';
                routes[4].leftButtonTitle = '返回';
                DeviceEventEmitter.emit('EditItemDone');
                navigator.pop();
            });
        }
        navigator.push(routes[4]);
    }

    routes[4].leftButtonTitle = '返回';
    routes[4].onLeftButtonPress = () => {
        routes[6].passProps = {
            type: type,
            fromPage: 'changeDetailPage',
        };
        navigator.replacePreviousAndPop(routes[6]);
    };
    navigator.push(routes[4])
}
export function setDetailPgaeRoute(type, id, navigator) {
    routes[4].passProps = {
        type: type,
        id: id,
        editable: false,
    };
    routes[4].leftButtonTitle = '返回';
    routes[4].onLeftButtonPress = () => {
        navigator.pop();
    }
    routes[4].rightButtonTitle = '编辑';
    routes[4].onRightButtonPress = () => {
        clearNoteContent();
        getIntoEditDetailPage(type, id, navigator);
    }
}
export function getIntoDetailPage(type, id, navigator) {
    setDetailPgaeRoute(type, id, navigator);
    navigator.push(routes[4]);
}
export function changePreViewAndPopToDetaiPage(type, id, navigator) {
    setDetailPgaeRoute(type, id, navigator);
    navigator.replacePreviousAndPop(routes[4]);
}
export function getIntoEditDetailPage(type, id, navigator) {
    routes[4].passProps = {
        type: type,
        id: id,
        editable: true,
    }
    routes[4].leftButtonTitle = '返回';
    routes[4].onLeftButtonPress = () => {
        noteReset();
        clearSubmitValues();
        changePreViewAndPopToDetaiPage(type, id, navigator);
    }
    routes[4].rightButtonTitle = '完成';
    routes[4].onRightButtonPress = () => {
        DetailPageSave(true, type, id).then(() => {
            clearSubmitValues();
            console.log('clearSubmitValues');
            DeviceEventEmitter.emit('EditItemDone');
            changePreViewAndPopToDetaiPage(type, id, navigator);
        });
    }
    navigator.push(routes[4]);
}

export function AddItemToDetailPage(type, id, navigator) {
    clearNoteContent();
    routes[4].passProps = {
        type: type,
        editable: true,
    };
    routes[4].leftButtonTitle = '返回';
    routes[4].onLeftButtonPress = () => {
        clearSubmitValues();
        navigator.pop()
    }
    routes[4].rightButtonTitle = '完成';
    routes[4].onRightButtonPress = () => {
        DetailPageSave(false, type, id);
    }
    navigator.push(routes[4]);
}
