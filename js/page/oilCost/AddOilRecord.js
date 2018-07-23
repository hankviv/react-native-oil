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
    Keyboard,
    DeviceEventEmitter,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import DataRepository from '../../data/DataRepository'
import NavigationBar from '../../common/NavigationBar'
import Toast, {DURATION} from 'react-native-easy-toast'


export default class AddOilRecord extends Component{
    constructor(props) {
        super(props);
        navigations = this.props.navigation;
        this.state = {
            id:navigations.getParam('id',0),
            lastOil:navigations.getParam('lastOil',10),
            fullOil:navigations.getParam('fullOil',true),
            mileage:navigations.getParam('mileage',''),
            oilMoney:navigations.getParam('oilMoney',''),
            oilPrice:navigations.getParam('oilPrice',''),
            oilNum:navigations.getParam('oilNum',''),
            date:navigations.getParam('date',moment().format('YYYY-MM-DD')),
            showLastOil:navigations.getParam('showLastOil','油灯已亮'),
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
                    style={{width: 250,borderColor:'#FFF'}}
                    date={this.state.date}
                    mode="date"
                    showIcon={false}
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    confirmBtnText="确定"
                    cancelBtnText="取消"
                    minDate="2001-01-01"
                    maxDate="2050-01-01"
                    androidMode="spinner"
                    customStyles={{
                        dateIcon: {
                            position: 'relative',
                            width:30,

                        },
                        dateInput: {
                            borderColor:'#fff',
                            marginRight:150,
                        },
                       dateText:{
                            fontSize:18,
                            color:'#000',
                            fontWeight:'500'
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
                                    <Text style={{fontSize:16,color:'#242424',marginTop:7}}>{this.state.fullOil ? '已加满' : '未加满'}</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.item}>
                            <Text style={[styles.text,{marginBottom:7}]}>剩余油量</Text>
                            {this._PickerShow()}
                        </View>

                        <View style={styles.item}>
                            <Text style={styles.text}>油箱剩余百分比(%)</Text>
                            <Text style={{fontSize:21,color:'#242424',marginTop:7}}>{this.state.lastOil}</Text>
                        </View>

                    </View>
                </ScrollView>
                <Toast ref="toast"/>
            </View>

        );
    }


    _saveItem(){
        Keyboard.dismiss();

        if(!this.state.mileage){
            return this.refs.toast.show('请填写最新里程');
        }

        if(!this.state.oilMoney){
            return this.refs.toast.show('费用不能为空');
        }

        if(!this.state.oilPrice){
            return this.refs.toast.show('单价不能为空');
        }

        if(!this.state.oilNum){
            return this.refs.toast.show('油量不能为空');
        }



        let key = 'oilRecord';
        let handle = new DataRepository();
        //handle.deleteData('oilRecord');
        if(this.state.id == 0){
            handle.getData(key,(value)=>{
                if(!value || typeof(value) == 'undefined' ){
                    this.setState({localData : {'data':[],'updateTime':new Date().getTime()} });
                }else {
                    this.setState({localData : JSON.parse(value)});
                }

                let item = {
                    id : new Date().getTime(),
                    oilMoney:this.state.oilMoney,
                    oilPrice:this.state.oilPrice,
                    oilNum:this.state.oilNum,
                    date:this.state.date,
                    fullOil:this.state.fullOil,
                    lastOil:this.state.lastOil,
                    mileage:this.state.mileage,
                };

                localData = this.state.localData;
                localData.updateTime = new Date().getTime();
                localData.data.push(item);
                handle.saveData(key,JSON.stringify(localData));
                DeviceEventEmitter.emit('changeOilData');
                this.props.navigation.goBack();
            });
        }else{
            handle.getData(key,(value)=>{
                if(!value || typeof(value) == 'undefined' ){
                    this.setState({localData : {'data':[],'updateTime':new Date().getTime()} });
                }else {
                    this.setState({localData : JSON.parse(value)});
                }

                let item = {
                    id : this.state.id,
                    oilMoney:this.state.oilMoney,
                    oilPrice:this.state.oilPrice,
                    oilNum:this.state.oilNum,
                    date:this.state.date,
                    fullOil:this.state.fullOil,
                    lastOil:this.state.lastOil,
                    mileage:this.state.mileage,
                };

                localData = this.state.localData;
                let arr = [];
                if(localData.data){
                    localData.data.forEach((value,index)=>{
                        if(value.id == this.state.id){
                            value.oilMoney = this.state.oilMoney;
                            value.oilPrice = this.state.oilPrice;
                            value.oilNum = this.state.oilNum;
                            value.date = this.state.date;
                            value.fullOil = this.state.fullOil;
                            value.lastOil = this.state.lastOil;
                            value.mileage = this.state.mileage;
                        }
                    })
                }

                localData.updateTime = new Date().getTime();
                //alert(JSON.stringify(localData));
                handle.saveData(key,JSON.stringify(localData));
                DeviceEventEmitter.emit('changeOilData');
                this.props.navigation.navigate('CheckOilRecord');
            });
        }
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