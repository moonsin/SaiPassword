import React, {
    Component
} from 'react';
import {
    View,
    Text
} from 'react-native';

var {LoginNav} = require('./login/LoginScreen');

class setup extends Component {
    render() {
        return ( < LoginNav / > )
    }
}

module.exports = setup;
