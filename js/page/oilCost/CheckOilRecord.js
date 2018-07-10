import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
    ListView,
    TouchableOpacity,
    Image,
    ScrollView,
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


    _showLastOil(lastOil){
        switch (lastOil){
            case 10:
                last = '油灯已亮';
                break;
            case 12:
                last = '1/8';
                break;
            case 25:
                last = '1/4';
                break;
            case 50:
                last =  '一半';
                break;
            default:
                last = '未知';
        }
        return <Text style={styles.lastOil}>{last}</Text>
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
                <View style={styles.item}>

                    <Text style={styles.text}>加油日期</Text>
                    <Text style={[styles.showText,{fontSize:15}]}>{rowData.date}</Text>


                    <View style={styles.MoneyAndMile}>

                        <View style={{marginRight:50}}>
                            <Text style={styles.text}>加油金额(元)</Text>
                            <Text style={[styles.showText,{marginLeft:10,marginTop:3}]}>{rowData.oilMoney}</Text>
                        </View>

                        <View>
                            <Text style={styles.text}>行驶里程(公里)</Text>
                            <Text style={[styles.showText,{marginLeft:10,marginTop:3}]}>{rowData.mileage}</Text>
                        </View>

                    </View>

                    <View style={styles.PriceAndNum}>
                        <Text>单价:{rowData.oilPrice}/升</Text>
                        <Text style={{marginLeft:15}}>加油量:{rowData.oilNum}升</Text>
                    </View>

                    <View style={styles.LastAndFull}>
                        <Text style={{height:20,width:60,color:'#FD8B59', backgroundColor:'#FFF5F1',borderRadius:10,textAlign:'center'}}>{rowData.fullOil ? '加满':'未加满'}</Text>
                        {this._showLastOil(rowData.lastOil)}
                    </View>
                </View>
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
                       <ScrollView>
                           <ListView
                               dataSource={this.state.dataSource}
                               renderRow={(rowData) => this._showData(rowData)}
                           />
                       </ScrollView>
                        : <Text style={{color:'#E9C6A9',alignSelf:'center',marginTop:80}}>加载中...</Text>
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
        marginTop:15,
        paddingTop:8,
        paddingBottom:10,
        borderColor:'#E5E5E5',
        borderRadius:10,
        borderBottomWidth:8,
    },
    MoneyAndMile:{
        flex: 1,
        flexDirection:'row',
        borderColor:'#E5E5E5',
        borderBottomWidth:1,
        marginTop:8,
        marginRight:70,
        justifyContent:'flex-start',
        alignItems:'center',
        paddingBottom:5,
    },
    PriceAndNum:{
        flex: 1,
        flexDirection:'row',
        marginTop:8,
    },

    LastAndFull:{
        flex: 1,
        flexDirection:'row',
        marginTop:8,
        paddingLeft:10,
    },
    lastOil:{
        marginLeft:5,
        height:20,
        width:80,
        color:'#FD8B59',
        backgroundColor:'#FFF5F1',
        borderRadius:8,
        textAlign:'center',
    },
    text:{
        fontSize:12
    },
    showText:{
        fontSize:20,
        fontWeight:'bold',
    },
});