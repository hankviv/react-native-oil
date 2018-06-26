import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default class OilCostPage extends Component{
    constructor(props) {
        super(props);
        alert(JSON.stringify(this.props));
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text} onPress={()=>
                    this.props.navigation.navigate('AddOilRecord')
                }>check</Text>
                <Text style={styles.text}>add</Text>
                <Text style={styles.text}>OilCost</Text>
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
        marginTop:10,
        fontSize:20,
    }
})