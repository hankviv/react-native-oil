import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';

export default class AddOilRecord extends Component{

    render(){
        return(
            <View style={styles.container}>
                <Text>AddRecord</Text>
                <Text style={styles.text} onPress={()=>
                    this.props.navigation.goBack()
                }>AddOilRecord----goBack</Text>
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
    text:{
        fontSize:20
    }
})