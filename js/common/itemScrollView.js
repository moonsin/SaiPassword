import React, {
    Component
} from 'react';

import {
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
            allData[idx].forEach(function(item) {
                allDataFormat[item.headBarName] = {};
                //深度赋值
                for (var index in item) {
                    allDataFormat[item.headBarName][index] = item[index];
                }
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
        data.forEach(function(item) {
            formatData[item.headBarName] = {};
            //深度赋值
            for (var idx in item) {
                formatData[item.headBarName][idx] = item[idx];
            }
        });
        return formatData;
    }
    return getData();
}

export class ItemScrollView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewModule: null
        }
    };
    makeModule(data, page, type) {
        var addview = [];
        var index = 0;
        if (page == 'CategoryPage') {
            addview.push(<IconItem key={index++} navigator={this.props.navigator}  type={'All Items'} source={AllItems} fromPage={page} />);
        }
        if (page == 'KindListPage') {
            for (var idx in data) {
                var name = idx.split('$AddItemTime$');
                type = data[idx].pageKind;
                addview.push(<IconItem key={index++} navigator={this.props.navigator} type={name[0]} source={IconSource[type]} fromPage={page} />);
            }
        } else {
            for (var idx in data) {
                addview.push(<IconItem key={index++} navigator={this.props.navigator} type={idx} source={IconSource[idx]} fromPage={page} />);
            }
        }
        for (; index < 12; index++) {
            addview.push(<NormalItem key={index} />);
        }
        return addview;
    }
    componentWillMount() {
        if (this.props.page == 'AddItem') {
            this.setState({
                viewModule: this.makeModule(IconSource, 'AddItem'),
            })
        } else if (this.props.page == 'CategoryPage') {
            getLocalDataKind(IconSource).then((result) => {
                this.setState({
                    viewModule: this.makeModule(result, this.props.page)
                })
            });
        } else if (this.props.page == 'KindListPage') {
            if (this.props.type == 'All Items') {
                getLocalAllKindData(IconSource).then((result) => {
                    console.log(result);
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
        if (this.props.fromPage == 'AddItem') {
            routes[4].passProps = {
                type: this.props.type
            };
            this.props.navigator.push(routes[4])
        } else if (this.props.fromPage == 'CategoryPage') {
            routes[6].passProps = {
                type: this.props.type,
            };
            this.props.navigator.push(routes[6]);
        }
    }
    render() {
        return (
            <TouchableHighlight  onPress={()=>{this.onpress()}} underlayColor='#D2D2D2' >
                <View style={{flexDirection:'row',height:46}}>
                    <Image source={this.props.source} style={{marginLeft:10,marginRight:10,marginTop:7,width:36,height:36}}></Image>
                    <View  style={{borderColor:'#D2D2D2',borderBottomWidth:1,flex:1}}>
                        <Text style={{marginTop:16,fontSize:14,color:'#515151',fontFamily:'arial'}}>{this.props.type}</Text>
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
