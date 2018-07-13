import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ImageBackground,
    Platform
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import Echarts from 'native-echarts';

export default class OtherCostPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            echartXData:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            echartYData:[820, 932, 901, 934, 1290, 1330, 1320],
            text1Color:'#FFD700',
            text2Color:'#000000',
            text3Color:'#000000',
        }
    }


    renderLeftButton(image){
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={()=>{
                this.props.navigation.navigate('CheckOilRecord');
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
                this.props.navigation.navigate('AddOilRecord');
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
                break;
            case 2:
                this.setState({
                    text1Color:'#000000',
                    text2Color:'#FFD700',
                    text3Color:'#000000',
                });
                break;
            case 3:
                this.setState({
                    text1Color:'#000000',
                    text2Color:'#000000',
                    text3Color:'#FFD700',
                });
                break;
        }


        this.setState({
            echartXData:['Mon', 'Tue', 'Wed'],
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
                    title = '油耗记录'
                    style={styles.NavigationBar}
                    leftButton={this.renderLeftButton(require('../../res/images/ic_check_record.png'))}
                    rightButton={this.renderRightButton(require('../../res/images/ico_add_item.png'))}
                />
                <View>
                    <ScrollView>
                        <View>

                            <ImageBackground style={styles.bannerImage}
                                             source={require('../../res/images/cost_back.png')}>
                                <Text style={{fontSize:20,color:'#FFFFFF'}}>最新油耗</Text>
                                <Text style={{fontSize:10,color:'#FFFFFF',marginTop:5}}>升/百公里</Text>
                                <Text style={{fontSize:50,color:'#FFFFFF'}}>5.6</Text>
                            </ImageBackground>

                            <View style={{marginBottom:20}}>
                                <View style={styles.showItem}>
                                    {this.renderSingleItem('累计油耗','5.66','升/百公里')}
                                    {this.renderSingleItem('平均形式','1200','公里/天')}
                                    {this.renderSingleItem('加油周期','31','天')}
                                </View>

                                <View style={styles.showItem}>
                                    {this.renderSingleItem('累计里程','13333','公里')}
                                    {this.renderSingleItem('累计加油','5.66','升')}
                                    {this.renderSingleItem('平均油费','10000','元/月')}
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

                        <View style={{height:Platform.OS == 'ios' ? 0:80}}></View>

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
        borderRadius:10,
        borderWidth:8,
        borderColor:'#8C6DEC',
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