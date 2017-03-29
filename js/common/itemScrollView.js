import React, {
    Component
} from 'react';
import {
    DetailPageSave,
} from '../category/DetailPage';
import {
    DeviceEventEmitter,
    TouchableHighlight,
    Image,
    ScrollView,
    StyleSheet,
    View,
    Text,
} from 'react-native';
import routes from '../router/Router';

import IconSource from './IconRequire';

var AllItems = require('../common/img/category/Full Moon-30.png');

const styles = StyleSheet.create({
    searchBar: {
        height: 40,
        backgroundColor: '#F4F4F4',
    },
});

function getLocalDataKind(AllKindData) {
    var existData = [];
    var localKindData = {};
    for (var idx in AllKindData) {
        existData.push({
            key: idx,
            id: '1',
        });
    }
    var getLocalKind = function() {
        return storage.getBatchData(existData)
    }
    var getIfKind = async function() {
        var existArray = await getLocalKind();
        existArray.forEach(function(item) {
            if (item != false) {
                localKindData[item.pageKind] = true;
            }
        })
        return localKindData;
    }
    return getIfKind();
}

function getLocalAllKindData(AllKindData) {
    var allData = {};
    var allDataFormat = {};
    var getKindDataByType = function(type) {
        return storage.getAllDataForKey(type);
    }
    var getData = async function(type) {
        for (var idx in AllKindData) {
            var data = await getKindDataByType(idx);
            if (data != '') {
                allData[idx] = data;
            }
        }
        for (var idx in allData) {
            allData[idx].forEach(function(item, indexNum) {
                allDataFormat[item.headBarName] = {};
                //深度赋值
                for (var index in item) {
                    allDataFormat[item.headBarName][index] = item[index];
                }
                allDataFormat[item.headBarName].id = indexNum + 1;
            })
        }
        return allDataFormat;
    }
    return getData();
}

function getLocalKindAllData(type) {
    var getKindDataByType = function(type) {
        return storage.getAllDataForKey(type);
    }
    var getData = async function() {
        var data = await getKindDataByType(type);
        var formatData = {};
        data.forEach(function(item, index) {
            formatData[item.headBarName] = {};
            //深度赋值
            for (var idx in item) {
                formatData[item.headBarName][idx] = item[idx];
            }
            formatData[item.headBarName].id = index + 1;
        });
        return formatData;
    }
    return getData();
}

export class ItemScrollView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewModule: null,
            addPage: false,
        }
    };
    makeModule(data, page, type) {
        var addview = [];
        var index = 0;
        if (page == 'CategoryPage') {
            addview.push(<IconItem key={index++} navigator={this.props.navigator} title={'All Items'}  type={'All Items'} source={AllItems} fromPage={page} />);
        }
        if (page == 'KindListPage') {
            for (var idx in data) {
                var name = idx.split('$AddItemTime$');
                type = data[idx].pageKind;
                id = data[idx].id
                addview.push(<IconItem key={index++} id={id} navigator={this.props.navigator} title={name[0]} type={type} source={IconSource[type]} fromPage={page} />);
            }
        } else {
            for (var idx in data) {
                addview.push(<IconItem key={index++} navigator={this.props.navigator} title={idx} type={idx} source={IconSource[idx]} fromPage={page} />);
            }
        }
        for (; index < 12; index++) {
            addview.push(<NormalItem key={index} />);
        }
        return addview;
    }
    componentWillUnmount() {
        this.subscription.remove();
        this.getAddItemType.remove();
    };
    componentDidMount() {
        function makeAllMoudule() {
            if (this.props.page == 'CategoryPage') {
                getLocalDataKind(IconSource).then((result) => {
                    this.setState({
                        viewModule: this.makeModule(result, this.props.page)
                    })
                });
            } else if (this.props.page == 'KindListPage') {
                if (this.props.type == 'All Items') {
                    getLocalAllKindData(IconSource).then((result) => {
                        this.setState({
                            viewModule: this.makeModule(result, this.props.page, this.props.type),
                        })
                    });
                } else {
                    getLocalKindAllData(this.props.type).then((result) => {
                        this.setState({
                            viewModule: this.makeModule(result, this.props.page, this.props.type),
                        })
                    });
                }
            }
        }
        var makeAll = makeAllMoudule.bind(this);
        this.subscription = DeviceEventEmitter.addListener('itemEditDone', (value) => {
            makeAll();
        });
        this.getAddItemType = DeviceEventEmitter.addListener('AddItemPageChooseItem', (value) => {
            routes[4].passProps = {
                type: value.type,
                editable: true,
            };
            routes[4].rightButtonTitle = '完成';
            routes[4].onRightButtonPress = () => {
                DetailPageSave(false, this.props.type, this.props.id);
            }
            this.props.navigator.push(routes[4]);
        });
        makeAll();
    }

    render() {
        return (
            <View>
                {this.state.viewModule}
            </View>
        )
    }
}

class IconItem extends Component {
    onpress() {
        if (this.props.fromPage == 'CategoryPage') {
            routes[6].passProps = {
                type: this.props.type,
            };
            this.props.navigator.push(routes[6]);
        } else if (this.props.fromPage == 'KindListPage') {
            routes[4].passProps = {
                type: this.props.type,
                id: this.props.id,
                editable: false,
            };
            routes[4].rightButtonTitle = '编辑';
            routes[4].onRightButtonPress = () => {
                routes[4].passProps = {
                    type: this.props.type,
                    id: this.props.id,
                    editable: true,
                }
                routes[4].rightButtonTitle = '完成';
                routes[4].onRightButtonPress = () => {
                    DetailPageSave(true, this.props.type, this.props.id);
                }
                this.props.navigator.push(routes[4]);
            }
            this.props.navigator.push(routes[4]);
        }
    }
    render() {
        return (
            <TouchableHighlight  onPress={()=>{this.onpress()}} underlayColor='#D2D2D2' >
                <View style={{flexDirection:'row',height:46}}>
                    <Image source={this.props.source} style={{marginLeft:10,marginRight:10,marginTop:7,width:36,height:36}}></Image>
                    <View  style={{borderColor:'#D2D2D2',borderBottomWidth:1,flex:1}}>
                        <Text style={{marginTop:16,fontSize:14,color:'#515151',fontFamily:'arial'}}>{this.props.title}</Text>
                    </View>
                </View>
           </TouchableHighlight>
        )
    }
}

class NormalItem extends Component {
    render() {
        return (
            <View style={{flexDirection:'row',height:46}}>
                <View  style={{borderColor:'#b8b8b8',borderBottomWidth:1,flex:1,marginLeft:10}}>
                </View>
           </View>
        )
    }

}
