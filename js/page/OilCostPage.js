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

export default class OilCostPage extends Component{
    constructor(props) {
        super(props);
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

    render(){
        const option = {
            title: {
            },
            tooltip: {},
            legend: {
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子","高跟鞋4","袜3子","高跟2鞋","袜1子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20, 10, 20, 10, 20]
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

                        <View style={{paddingLeft:10,paddingRight:15}}>
                            <Echarts option={option} height={350} width={380}  />
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
    }
})