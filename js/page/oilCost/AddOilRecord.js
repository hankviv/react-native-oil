import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
    Picker,
    TouchableHighlight,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    Platform,
    Alert,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import DataRepository from '../../data/DataRepository'
import NavigationBar from '../../common/NavigationBar'

export default class AddOilRecord extends Component{
    constructor(props) {
        super(props);
        this.state = {
            lastOil:10,
            fullOil:true,
            mileage:'',
            oilMoney:'',
            oilPrice:'',
            oilNum:'',
            date:moment().format('YYYY-MM-DD HH:mm'),
            showLastOil:'油灯已亮'
        }
    }

    renderLeftButton(image){
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={()=>{
                this.props.navigation.pop();
            }}>
            <Image
                style={{width: 50, height: 50}}
                source={image}/>
        </TouchableOpacity>;
    }

    renderRightButton(image){
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={()=>{
                this._saveItem();
            }}>
            <Image
                style={{width: 50, height: 50}}
                source={image}/>
        </TouchableOpacity>;
    }

    _PickerShow(){
        if(Platform.OS === 'ios'){
            return  <Text onPress={()=>{
                Alert.alert(
                    '剩余油量',
                    '',
                    [
                        {text: '油灯已亮', onPress: () =>{this.setState({'lastOil':'10','showLastOil':'油灯已亮'})}},
                        {text: '一半', onPress: () =>{this.setState({'lastOil':'50','showLastOil':'一半'})}},
                        {text: '1/4', onPress: () =>{this.setState({'lastOil':'25','showLastOil':'1/4'})}},
                        {text: '1/8', onPress: () =>{this.setState({'lastOil':'12','showLastOil':'1/8'})}},
                    ],
                );
            }}>
                {this.state.showLastOil}
            </Text>;
        }else{
            return  <Picker
                mode = 'dialog'
                selectedValue={this.state.lastOil}
                onValueChange={(lastOil) => this.setState({lastOil: lastOil})}
                style={{ height: 30, width: 150}}
                itemStyle ={{borderColor:'#E5E5E5',borderWidth:1}}
                prompt={'剩余油量'}
            >
                <Picker.Item label="油灯已亮" value="10" />
                <Picker.Item label="一半" value="50" />
                <Picker.Item label="1/4" value="25" />
                <Picker.Item label="1/8" value="12" />
            </Picker>;
        }
    }

    render(){

        let dataPick =
            <View style={styles.item}>
                <Text style={styles.text}>加油日期</Text>
                <DatePicker
                    style={{width: 210}}
                    date={this.state.date}
                    mode="datetime"
                    placeholder="select date"
                    format="YYYY-MM-DD HH:mm"
                    confirmBtnText="确定"
                    cancelBtnText="取消"
                    minDate="2001-01-01"
                    maxDate="2050-01-01"
                    androidMode="spinner"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 50
                        }
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
            </View>

        return(
            <View style={{backgroundColor:'#FFFFFF'}}>
                <NavigationBar
                    title = '加油'
                    style={styles.NavigationBar}
                    leftButton={this.renderLeftButton(require('../../../res/images/ic_back.png'))}
                    rightButton={this.renderRightButton(require('../../../res/images/ic_save.png'))}
                />
                <ScrollView>
                    <View style={styles.container}>

                        {dataPick}

                        <View style={styles.item}>
                            <Text style={styles.text}>最新里程(公里)</Text>
                            <TextInput
                                keyboardType = 'numeric'
                                maxLength={7}
                                underlineColorAndroid = 'transparent'
                                style={styles.textInput}
                                onChangeText = {(value) => this.setState({mileage:value})}
                                value={String(this.state.mileage)}
                            />
                        </View>

                        <View style={styles.changeMoney}>

                            <View style={styles.changeMoneyItem}>
                                <View>
                                    <Text style={styles.text}>加油金额(元)</Text>
                                    <TextInput
                                        keyboardType = 'numeric'
                                        maxLength={7}
                                        style={styles.textInput}
                                        onChangeText = {(value)=>this._changeOilMoney(value)}
                                        value={String(this.state.oilMoney)}
                                    />
                                </View>
                            </View>

                            <View style={styles.changeMoneyItem}>
                                <Text style={{fontSize:15}}>=</Text>
                                <View>
                                    <Text style={styles.text}>单价(元/升)</Text>
                                    <TextInput
                                        keyboardType = 'numeric'
                                        maxLength={7}
                                        style={styles.textInput}
                                        onChangeText = {(value) =>this._changeOilPrice(value)}
                                        value={String(this.state.oilPrice)}
                                    />
                                </View>
                            </View>

                            <View style={styles.changeMoneyItem}>
                                <Text style={{fontSize:15}}>X</Text>
                                <View>
                                    <Text style={styles.text}>加油量(升)</Text>
                                    <TextInput
                                        keyboardType = 'numeric'
                                        maxLength={7}
                                        style={styles.textInput}
                                        onChangeText = {(value) =>this._changeOilNum(value)}
                                        value={String(this.state.oilNum)}
                                    />
                                </View>
                            </View>

                        </View>

                        <View style={styles.item}>
                            <TouchableHighlight
                                underlayColor = '#E5E5E5'
                                onPress={()=>{
                                    let fullOil = !this.state.fullOil
                                    this.setState({fullOil: fullOil})
                                }}
                            >
                                <View>
                                    <Text style={styles.text}>是否加满</Text>
                                    <Text style={{fontSize:19,color:'#000000'}}>{this.state.fullOil ? '已加满' : '未加满'}</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.item}>
                            <Text style={styles.text}>剩余油量</Text>
                            {this._PickerShow()}
                        </View>

                        <View style={styles.item}>
                            <Text style={styles.text}>油箱剩余百分比(%)</Text>
                            <Text style={{fontSize:21,color:'#000000'}}>{this.state.lastOil}</Text>
                        </View>

                    </View>
                </ScrollView>
            </View>

        );
    }


    _saveItem(){
        let key = 'oilRecord';
        let handle = new DataRepository();
        handle.getData(key,(value)=>{
            if(!value || typeof(value) == 'undefined' ){
                this.setState({localData : [] });
            }else {
                this.setState({localData : JSON.parse(value)});
            }
            let item = {
                lastOil:this.state.lastOil,
                fullOil:true,
                mileage:this.state.mileage,
                oilMoney:this.state.oilMoney,
                oilPrice:this.state.oilPrice,
                oilNum:this.state.oilNum,
                date:this.state.date,
            };
            localData = this.state.localData;
            localData.push(item);
            handle.saveData(key,JSON.stringify(localData));
            this.props.navigation.goBack();
        });
    }

    _changeOilMoney(value){
            this.setState({'oilMoney':value});

            let oilMoney = value,
                oilPrice = this.state.oilPrice,
                oilNum =this.state.oilNum;

            if( oilMoney && oilPrice ){
                this.setState({'oilNum':(oilMoney/oilPrice).toFixed(2)})
            }
            if(oilMoney && !oilPrice && oilNum){

                this.setState({'oilPrice':(oilMoney/oilNum).toFixed(2)})
            }
    }

    _changeOilPrice(value){
        this.setState({'oilPrice':value});

        let oilMoney = this.state.oilMoney,
            oilPrice = value,
            oilNum =this.state.oilPrice;

        if(oilMoney && oilPrice){
            this.setState({'oilNum':(oilMoney/oilPrice).toFixed(2)});
        }

        if(!oilMoney && oilNum){
            this.setState({'oilMoney':oilMoney*oilPrice});
        }
    }

    _changeOilNum(value){
        this.setState({'oilNum':value});
        let oilMoney = this.state.oilPrice,
            oilPrice = this.state.oilPrice,
            oilNum =value;
        this.setState({'oilMoney':oilPrice*oilNum});
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
});