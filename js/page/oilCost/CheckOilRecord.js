import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';

export default class CheckOilRecord extends Component{

    render(){
        return(
            <View style={styles.container}>
                <Text>AddRecord</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})