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
    Platform,
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
        Handle.getData('otherRecord',(result)=>{
            res = JSON.parse(result)
            if(res){
                if(res.data)
                this.setState({dataSource: ds.cloneWithRows(res.data),'dataShow':true});
            }
        })
    }


    _showData(rowData){
        return (
            <View style={styles.container}>

                <View style={styles.item}>

                    <Text style={styles.text}>加油日期</Text>
                    <Text style={[styles.showText,{fontSize:15}]}>{rowData.date}</Text>


                    <View style={styles.typeAndMoney}>

                        <View style={{marginRight:50}}>
                            <Text style={styles.text}>花费类型</Text>
                            <Text style={[styles.showText,{marginTop:3}]}>{rowData.costType}</Text>
                        </View>

                        <View>
                            <Text style={styles.text}>花费金额(元)</Text>
                            <Text style={[styles.showText,{marginTop:3}]}>{rowData.money}</Text>
                        </View>

                    </View>

                </View>

            </View>
        )
    }


    render() {
        return (
            <View style={{backgroundColor:'#FFF',flex:1}}>
                <NavigationBar
                    title = '花费记录'
                    style={styles.NavigationBar}
                    leftButton={this.renderLeftButton(require('../../../res/images/ic_back_shape.png'))}
                />
                {
                   this.state.dataShow ?
                       <ScrollView>
                           <View>
                               <ListView
                                   dataSource={this.state.dataSource}
                                   renderRow={(rowData) => this._showData(rowData)}
                               />
                               <View style={{height:100}}></View>
                           </View>

                       </ScrollView>
                        : <Text style={{color:'#E9C6A9',alignSelf:'center',marginTop:40}}>加载中...</Text>
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
        paddingTop:8,
        paddingBottom:10,
        borderColor:'#E5E5E5',
        borderRadius:10,
        borderBottomWidth:8,
    },
    typeAndMoney:{
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
    text:{
        fontSize:12
    },
    showText:{
        fontSize:20,
        fontWeight:'bold',
    },
});