import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default class OilCostPage extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>OilCost</Text>
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