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
    Platform
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import DataRepository from '../../data/DataRepository'
import NavigationBar from '../../common/NavigationBar'

export default class AddOtherRecord extends Component{
    constructor(props) {
        super(props);
        this.state = {
            costType:'保养',
            mileage:'',
            money:'',
            date:moment().format('YYYY-MM-DD'),
            remark:'',
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
            return  <Text style={{fontSize:17}} onPress={()=>this._IOSPickerShow()}>{this.state.costType}</Text>;
        }else{
            return  <Picker
                mode = 'dialog'
                selectedValue={this.state.costType}
                onValueChange={(costType) => this.setState({costType: costType})}
                style={{ height: 30, width: 150}}
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
                    style={{width: 150}}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
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
            </View>;


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
            </View>

        );
    }


    _saveItem(){
        let key = 'otherRecord';
        let handle = new DataRepository();
        handle.getData(key,(value)=>{
            if(!value || typeof(value) == 'undefined' ){
                this.setState({localData : [] });
            }else {
                this.setState({localData : JSON.parse(value)});
            }
            let item = {
                costType:this.state.costType,
                date:this.state.date,
                mileage:this.state.mileage,
                money:this.state.money,
                remark:this.state.remark,
            };
            localData = this.state.localData;
            localData.push(item);
            handle.saveData(key,JSON.stringify(localData));
            this.props.navigation.goBack();
        });
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
        fontSize:20
    },
});