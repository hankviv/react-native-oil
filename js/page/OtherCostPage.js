import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ImageBackground,
    Platform,
    DeviceEventEmitter,
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import Echarts from 'native-echarts';
import DataRepository from '../data/DataRepository';
import moment from 'moment';

export default class OtherCostPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            echartXData:[],
            echartYData:[],
            Handle:new DataRepository(),
            text1Color:'#FFD700',
            text2Color:'#000000',
            text3Color:'#000000',
            countCost:0,
            countOilCost:0,
            countOtherCost:0,

            averageOilCost:0,
            MileAverageAllMoney:0,
            everyAverageCostMoney:0,
        }
        this._loadData();
    }

    componentDidMount() {
        this.sub = DeviceEventEmitter.addListener('changeOtherData',(events)=>{
            this._loadData();
        });
    }

    _loadData()
    {
        this.state.Handle.getData('otherRecord',(otherRecord)=>{
            this.state.Handle.getData('oilRecord',(oilRecord)=>{
                otherRecordRes = JSON.parse(otherRecord)
                oilRecordRes = JSON.parse(oilRecord)
                if(otherRecordRes && oilRecordRes){

                    countOtherCost = 0;
                    countOilCost = 0;
                    oilDateArray=[];
                    otherDateArray=[];

                    if(otherRecordRes.data.length !== 0){
                        for(value of otherRecordRes.data)
                        {
                            countOtherCost += parseInt(value.money);

                            d = new Date(value.date);
                            date = d.getFullYear()+'-'+(d.getMonth()+1);
                            otherDateArray.push(date);
                            otherDateArray.sort();
                        }
                    }

                    if(oilRecordRes.data.length !== 0){
                        for(value of oilRecordRes.data)
                        {
                            countOilCost += parseInt(value.money);

                            d = new Date(value.date);
                            date = d.getFullYear()+'-'+(d.getMonth()+1);
                            oilDateArray.push(date);
                            oilDateArray.sort();
                        }
                    }


                    this.setState({
                        countCost:countOtherCost+countOilCost,
                        countOtherCost :countOtherCost,
                        countOilCost:countOilCost,
                        oilDateArray:oilDateArray,
                        otherDateArray:otherDateArray,

                    });










                }
            })
        })
    }


    renderLeftButton(image){
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={()=>{
                this.props.navigation.navigate('CheckOtherRecord');
            }}>
            <Image
                style={{width: 28, height: 28}}
                source={image}/>
        </TouchableOpacity>;
    }

    renderRightButton(image){
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={()=>{
                this.props.navigation.navigate('AddOtherRecord');
            }}>
            <Image
                style={{width:25, height: 25}}
                source={image}/>
        </TouchableOpacity>;
    }

    renderSingleItem(text1,text2,text3){
        return  <View style={styles.showItemSingle}>
            <Text style={{fontSize:12}}>{text1}</Text>
            <Text style={{fontSize:10,marginRight:10}}>
                <Text style={{fontSize:15,color:'#000000'}}>
                    {text2}
                </Text>
                &nbsp;&nbsp;{text3}
            </Text>
        </View>;
    }

    _clickData(type){

        switch (type){
            case 1:
                this.setState({
                    text1Color:'#FFD700',
                    text2Color:'#000000',
                    text3Color:'#000000',
                });

                d1 = moment().add(-1,'months').format("YYYY-MM-DD");
                d2 = moment().format("YYYY-MM-DD");
                d3 = moment().add(1,'months').format("YYYY-MM-DD");
                echartXData = [d1,d2,d3];
                break;
            case 2:
                this.setState({
                    text1Color:'#000000',
                    text2Color:'#FFD700',
                    text3Color:'#000000',
                });
                d1 = moment().add(-3,'months').format("YYYY-MM-DD");
                d2 = moment().add(-2,'months').format("YYYY-MM-DD");
                d3 = moment().add(-1,'months').format("YYYY-MM-DD");
                d4 = moment().format("YYYY-MM-DD");
                d5 = moment().add(1,'months').format("YYYY-MM-DD");
                d6 = moment().add(2,'months').format("YYYY-MM-DD");
                echartXData = [d1,d2,d3,d4,d5,d6];
                break;
            case 3:
                this.setState({
                    text1Color:'#000000',
                    text2Color:'#000000',
                    text3Color:'#FFD700',
                });
                echartXData = this.state.dataArray;
                break;
        }


        this.setState({
            echartXData:echartXData,
            echartYData:[820, 932, 901]
        })
    }

    render(){
        const option = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.state.echartXData
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: this.state.echartYData,
                type: 'line',
                areaStyle: {}
            }]
        };


        return(
            <View style={{backgroundColor:'#FFFFFF'}}>
                <NavigationBar
                    title = '花费记录'
                    style={styles.NavigationBar}
                    leftButton={this.renderLeftButton(require('../../res/images/ic_check_record.png'))}
                    rightButton={this.renderRightButton(require('../../res/images/ico_add_item.png'))}
                />
                <View>
                    <ScrollView>
                        <View>

                            <ImageBackground style={styles.bannerImage} imageStyle={{borderRadius: 15}}
                                             source={require('../../res/images/cost_back.png')}>
                                <Text style={{fontSize:20,color:'#FFFFFF'}}>平均花费</Text>
                                <Text style={{fontSize:10,color:'#FFFFFF',marginTop:5}}>元/月</Text>
                                <Text style={{fontSize:50,color:'#FFFFFF'}}>{this.state.averageCost}</Text>
                            </ImageBackground>

                            <View style={{marginBottom:20}}>
                                <View style={styles.showItem}>
                                    {this.renderSingleItem('累计支出',this.state.countCost,'元')}
                                    {this.renderSingleItem('累计油费',this.state.countOilCost,'元')}
                                    {this.renderSingleItem('其他费用',this.state.countOtherCost,'元')}
                                </View>

                                <View style={styles.showItem}>
                                    {this.renderSingleItem('每公里油费',this.state.averageOilCost,'元')}
                                    {this.renderSingleItem('每公里综合',this.state.MileAverageAllMoney,'元')}
                                    {this.renderSingleItem('平均每天',this.state.everyAverageCostMoney,'元')}
                                </View>
                            </View>

                        </View>


                        <View style={{flexDirection:'row', justifyContent:'space-around',marginTop:15,marginLeft:30,marginRight:30,paddingBottom:3,borderBottomWidth:1,borderColor:'#B0B0B0'}}>
                            <Text style={{color:this.state.text1Color}} onPress={()=>this._clickData(1)}>半年</Text>
                            <Text style={{color:this.state.text2Color}} onPress={()=>this._clickData(2)}>一年</Text>
                            <Text style={{color:this.state.text3Color}} onPress={()=>this._clickData(3)}>全部</Text>
                        </View>
                        <View style={{paddingLeft:15,paddingRight:15}}>
                            <Echarts option={option} height={300} width={360}  />
                        </View>

                        <View style={{height:100}}></View>

                    </ScrollView>


                </View>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    NavigationBar:{
        backgroundColor:'#FFFFFF',
        borderColor:'#E5E5E5',
        borderBottomWidth:1
    },
    bannerImage:{
        alignSelf:'center',
        marginTop:30,
        height:160,
        width:340,
        alignItems:'center',
        paddingTop:10,
    },
    showBanner:{
        //backgroundColor:'#2A0D31',

    },
    showItem:{
        marginTop:15,
        marginLeft:17,
        marginRight:17,
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
    },
    showItemSingle:{
        height:60,
        width:110,
        backgroundColor:'#F3F4F9',
        borderRadius:8,
        justifyContent:'center',
        paddingLeft:15,
    },
    scrollView:{
        flex: 1,
    },
    item:{
        marginTop:12,
        paddingBottom:6,
        borderColor:'#E5E5E5',
        borderBottomWidth:1,
    },
    text:{
        fontSize:12
    },
    textInput:{
        marginTop:2,
        height: 50,
        fontSize:20
    },
    changeMoney:{
        flex: 1,
        flexDirection:'row',
        justifyContent:'center',
        marginTop:12,
        paddingBottom:6,
        borderColor:'#E5E5E5',
        borderBottomWidth:1,
    },
    changeMoneyItem:{
        flex: 1,
        flexDirection:'row',
        alignItems:'center'
    },
})