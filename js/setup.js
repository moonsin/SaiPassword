import React, {
    Component
} from 'react';
import {
    View,
    Text
} from 'react-native';

var {LoginScreen} = require('./login/LoginScreen');

class setup extends Component {
    render() {
        return ( < LoginScreen / > )
    }
}

module.exports = setup;
