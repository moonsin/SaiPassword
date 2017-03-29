import React, {
    Component
} from 'react';
import {
    Image,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
} from 'react-native';
const styles = StyleSheet.create({
    component_title: {
        marginTop: 32,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    component_leftButton: {
        marginLeft: 12,
        marginTop: 32,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    component_rightButton: {
        marginRight: 12,
        marginTop: 32,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    component_image: {
        height:30,
        width:30,
    }
});

//rightButtonTitle={} leftButtonTitle={} leftButtonImg={} rightButtonImg={} leftButtonOnpress={} rightButtonOnpress={}
export class NavigatorBarMine extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {}
    render() {
        return (
            <View style={{backgroundColor: '#f9f9f9', height:66,flexDirection:'row',borderBottomWidth:1,borderColor:'#D2D2D2'}}>
                <TouchableOpacity style={styles.component_leftButton}  >
                    {this.props.leftButtonImg ? (
                        <Image source={this.props.leftButtonImg} />
                    ):(
                    <Text style={{fontSize:17,color:'red',}}>{this.props.leftButtonTitle}</Text>             
                    )
                    }
                </TouchableOpacity>
                <View style={styles.component_title}>
                    <Text style={{fontSize:17}}>{this.props.title}</Text>
                </View>
                <TouchableOpacity style={styles.component_rightButton} onPress={()=>{this.props.rightButtonOnpress()}}>
                    {this.props.rightButtonImg ? (
                        <Image style={styles.component_image} source={this.props.rightButtonImg} />
                    ):(
                    <Text style={{fontSize:17,color:'red',}}>{this.props.rightButtonTitle}</Text>             
                    )
                    }
                </TouchableOpacity>
           </View>
        )
    }
}
