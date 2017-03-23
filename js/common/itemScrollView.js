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

var IconSource = {
    Login: require('../common/img/category/login-48.png'),
    Indentity: require('../common/img/category/identity-48.png'),
    BankCard: require('../common/img/category/BankCard-50.png'),
    BankAccount: require('../common/img/category/BankAccount-50.png'),
    DataBase: require('../common/img/category/Database-48.png'),
    DriverLicense: require('../common/img/category/DriverLicense-48.png'),
    Password: require('../common/img/category/password-48.png'),
    Email: require('../common/img/category/email-48.png'),
    Note: require('../common/img/category/Note-48.png'),
    Passport: require('../common/img/category/Passport-48.png'),
    SoftwareLicense: require('../common/img/category/softwareLicense-48.png'),
    WiFi: require('../common/img/category/Wi-Fi-48.png'),

}

const styles = StyleSheet.create({
    searchBar: {
        height: 40,
        backgroundColor: '#F4F4F4',
    },
});

export class ItemScrollView extends Component {
    constructor(props) {
        super(props);
    };

    makeModule(data) {
        var addview = [];
        var index = 0;
            for(var idx in data){
                addview.push(<IconItem key={index} type={idx} source={IconSource[idx]} />);
                index++;
            }
      return addview;
    }

    render() {
        var viewModule;
        if(this.props.page =='AddItem'){ 
            viewModule = this.makeModule(IconSource);
        }
        return (
            <View>
                {viewModule}
            </View>
        )
    }
}

class IconItem extends Component {
    render() {
        return (
            <TouchableHighlight  onPress={()=>{alert(123)}} underlayColor='#D2D2D2' >
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
