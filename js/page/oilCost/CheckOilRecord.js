import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
    ListView,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import DataRepository from '../../data/DataRepository'

export default class CheckOilRecord extends Component{
    constructor(props){
        super(props);
        Handle = new DataRepository();
        ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            'Handle':Handle,
            'dataShow':false,
        }
        this._loadData();
    }

    _loadData()
    {
        Handle.getData('oilRecord',(result)=>{
            if(result){
                //alert(result);
                this.setState({dataSource: ds.cloneWithRows(JSON.parse(result)),'dataShow':true});
            }
        })
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
                }>goback</Text>
                {
                   this.state.dataShow ?
                       <ListView
                           dataSource={this.state.dataSource}
                           renderRow={(rowData) => <Text>{JSON.stringify(rowData)}</Text>}
                        />
                        : <Text>loading</Text>
                }

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