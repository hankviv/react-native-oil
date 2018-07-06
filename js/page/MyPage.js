import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    Image
} from 'react-native';
import NavigationBar from '../common/NavigationBar'

export default class MyPage extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>MyPage</Text>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})