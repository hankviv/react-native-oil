import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableHighlight,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
    Picker,
    Platform,
    Keyboard,
    DeviceEventEmitter,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import DataRepository from '../../data/DataRepository'
import NavigationBar from '../../common/NavigationBar'
import Toast, {DURATION} from 'react-native-easy-toast'

export default class AddOtherRecord extends Component{
    constructor(props) {
        super(props);
        navigations = this.props.navigation;
        this.state = {
            id:navigations.getParam('id',0),
            costType:navigations.getParam('costType', '保养'),
            mileage:navigations.getParam('mileage', ''),
            money:navigations.getParam('money', ''),
            date:navigations.getParam('date', moment().format('YYYY-MM-DD')),
            remark:navigations.getParam('remark', ''),
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
            return  <Text style={{fontSize:17, fontWeight:'bold'}} onPress={()=>this._IOSPickerShow()}>{this.state.costType}</Text>;
        }else{
            return  <Picker
                mode = 'dialog'
                selectedValue={this.state.costType}
                onValueChange={(costType) => this.setState({costType: costType})}
                style={{ height: 30, width: 150,}}
                itemStyle ={{borderColor:'#E5E5E5',borderWidth:1}}
                prompt={'花费类型'}
            >
                <Picker.Item label="保养" value="保养" />
                <Picker.Item label="保险" value="保险" />
                <Picker.Item label="违章" value="违章" />
                <Picker.Item label="维修" value="维修" />
                <Picker.Item label="停车" value="停车" />
                <Picker.Item label="洗车" value="洗车" />
                <Picker.Item label="路桥费" value="路桥费" />
                <Picker.Item label="其他" value="其他" />
            </Picker>;
        }
    }

    _IOSPickerShow(){
        Alert.alert(
            '花费类型',
            '',
            [
                {text: '保养', onPress: () =>{this.setState({'costType':'保养'})}},
                {text: '保险', onPress: () =>{this.setState({'costType':'保险'})}},
                {text: '违章', onPress: () =>{this.setState({'costType':'违章'})}},
                {text: '维修', onPress: () =>{this.setState({'costType':'维修'})}},
                {text: '停车', onPress: () =>{this.setState({'costType':'停车'})}},
                {text: '洗车', onPress: () =>{this.setState({'costType':'洗车'})}},
                {text: '路桥费', onPress: () =>{this.setState({'costType':'路桥费'})}},
                {text: '其他', onPress: () =>{this.setState({'costType':'其他'})}},
            ],
        );
    }

    render(){

        let dataPick =
            <View style={styles.item}>
                <Text style={[styles.text,{marginBottom:10}]}>花费时间</Text>
                <DatePicker
                    style={{width: 250}}
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
                            fontWeight:'500',
                        }
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
            </View>;


        return(
            <View style={{backgroundColor:'#FFFFFF',flex:1}}>
                <NavigationBar
                    title = '加油'
                    style={styles.NavigationBar}
                    leftButton={this.renderLeftButton(require('../../../res/images/ic_back.png'))}
                    rightButton={this.renderRightButton(require('../../../res/images/ic_save.png'))}
                />
                <ScrollView>
                    <View style={styles.container}>

                        <View style={styles.item}>
                            <Text style={[styles.text,{marginBottom:7}]}>花费类型</Text>
                            {this._PickerShow()}
                        </View>

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

                        <View style={styles.item}>
                            <Text style={styles.text}>花费金额(元)</Text>
                            <TextInput
                                keyboardType = 'numeric'
                                maxLength={7}
                                underlineColorAndroid = 'transparent'
                                style={styles.textInput}
                                onChangeText = {(value) => this.setState({money:value})}
                                value={String(this.state.money)}
                            />
                        </View>

                        <View style={styles.item}>
                            <Text style={styles.text}>备注(选填)</Text>
                            <TextInput
                                maxLength={50}
                                underlineColorAndroid = 'transparent'
                                style={styles.textInput}
                                onChangeText = {(value) => this.setState({remark:value})}
                                value={String(this.state.remark)}
                            />
                        </View>

                    </View>
                </ScrollView>
                <Toast ref="toast"/>
            </View>

        );
    }


    _saveItem(){
        Keyboard.dismiss();
        //new DataRepository().deleteData('otherRecord');

        if(!this.state.mileage){
            return this.refs.toast.show('请填写最新里程');
        }

        if(!this.state.money){
            return this.refs.toast.show('费用不能为空');
        }

        let key = 'otherRecord';
        let handle = new DataRepository();

        if(this.state.id == 0){
            handle.getData(key,(value)=>{
                if(!value || typeof(value) == 'undefined' ){
                    this.setState({localData : {'data':[],'updateTime':new Date().getTime()} });
                }else {
                    this.setState({localData : JSON.parse(value)});
                }

                let item = {
                    id : new Date().getTime(),
                    costType:this.state.costType,
                    date:this.state.date,
                    mileage:this.state.mileage,
                    money:this.state.money,
                    remark:this.state.remark,
                };
                localData = this.state.localData;
                localData.updateTime = new Date().getTime();
                localData.data.push(item);
                handle.saveData(key,JSON.stringify(localData));
                DeviceEventEmitter.emit('changeOtherData');
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
                    costType:this.state.costType,
                    date:this.state.date,
                    mileage:this.state.mileage,
                    money:this.state.money,
                    remark:this.state.remark,
                };

                localData = this.state.localData;
                let arr = [];
                if(localData.data){
                  localData.data.forEach((value,index)=>{
                      if(value.id == this.state.id){
                          value.costType = this.state.costType;
                          value.date = this.state.date;
                          value.mileage = this.state.mileage;
                          value.money = this.state.money;
                          value.remark = this.state.remark;
                      }
                  })
                }


                localData.updateTime = new Date().getTime();
                //alert(JSON.stringify(localData));
                handle.saveData(key,JSON.stringify(localData));
                DeviceEventEmitter.emit('changeOtherData');
                this.props.navigation.navigate('CheckOtherRecord');
            });
        }

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
        fontSize:12,
    },
    textInput:{
        marginTop:2,
        height: 50,
        fontSize:20,
        fontWeight:'400',
    },
});