import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import DataRepository from '../../data/DataRepository'

export default class CheckOilRecord extends Component{
    constructor(props){
        super(props);
        let Handle = new DataRepository();

        let date = moment().format('YYYY-MM-DD HH:mm');
        let localData = Handle.getData('oilRecord',(value)=>{
            alert(value);
        })

        this.state = {date:date}
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize:20,color:'red'}}>AddRecord</Text>

                <Text style={styles.text} onPress={() =>
                    this.props.navigation.goBack()
                }>save</Text>
                <Text style={styles.text} onPress={() =>
                    this.props.navigation.goBack()
                }></Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    text:{
        fontSize:20
    }
})