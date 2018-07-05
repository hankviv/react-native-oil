import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
    ListView,
    TouchableOpacity,
    Image,
} from 'react-native';

import DataRepository from '../../data/DataRepository'
import NavigationBar from '../../common/NavigationBar'

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

    renderLeftButton(image){
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={()=>{
                this.props.navigation.pop();
            }}>
            <Image
                style={{width: 28, height: 28}}
                source={image}/>
        </TouchableOpacity>;
    }

    _loadData()
    {
        Handle.getData('oilRecord',(result)=>{
            if(result){
                this.setState({dataSource: ds.cloneWithRows(JSON.parse(result)),'dataShow':true});
            }
        })
    }


    _showData(rowData){
        return (
            <View style={styles.container}>

                <Text>{rowData.lastOil}</Text>
                <Text>{rowData.fullOil}</Text>
                <Text>{rowData.mileage}</Text>
                <Text>{rowData.oilMoney}</Text>
                <Text>{rowData.oilPrice}</Text>
                <Text>{rowData.oilNum}</Text>
                <Text>{rowData.date}</Text>
            </View>
        )
    }


    render() {
        return (
            <View>
                <NavigationBar
                    title = '油耗记录'
                    style={styles.NavigationBar}
                    leftButton={this.renderLeftButton(require('../../../res/images/ic_back_shape.png'))}
                />
                {
                   this.state.dataShow ?
                       <ListView
                           dataSource={this.state.dataSource}
                           renderRow={(rowData) => this._showData(rowData)}
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
        paddingLeft:7,
        backgroundColor:"#FFFFFF"
    },
    NavigationBar:{
        backgroundColor:'#FFFFFF',
        borderColor:'#E5E5E5',
        borderBottomWidth:1
    },
    item:{
        marginTop:12,
        paddingBottom:6,
        borderColor:'#E5E5E5',
        borderBottomWidth:1,
    },
    text:{
        fontSize:12
    }
});