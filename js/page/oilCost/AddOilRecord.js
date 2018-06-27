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
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';

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

        }
        //alert(JSON.(this.props));
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Text style={{fontSize:20,color:'red'}}>AddRecord</Text>
                    <Text style={styles.text}
                          onPress={()=> this.props.navigation.goBack()
                          }>goBack
                    </Text>


                    <Text style={styles.text}
                          onPress={()=>{
                              if(!this.state.mileage){

                              }

                              this.props.navigation.goBack();
                          }
                          }>save
                    </Text>



                    <View>
                        <Text style={styles.text}>date</Text>
                        <DatePicker
                            style={{width: 200}}
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


                    <Text style={styles.text}>mile</Text>
                    <TextInput
                        keyboardType = {'numeric'}
                        maxLength={7}
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText = {(value) => this.setState({mileage:value})}
                        value={String(this.state.mileage)}
                    />



                    <View>
                        <Text style={styles.text}>money</Text>
                        <TextInput
                            keyboardType = {'numeric'}
                            maxLength={7}
                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                            onChangeText = {(value) =>{
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
                            }}
                            value={String(this.state.oilMoney)}
                        />
                        <TextInput
                            keyboardType = {'numeric'}
                            maxLength={7}
                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                            onChangeText = {(value) =>{
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
                            }}
                            value={String(this.state.oilPrice)}
                        />
                        <TextInput
                            keyboardType = {'numeric'}
                            maxLength={7}
                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                            onChangeText = {(value) =>{
                                this.setState({'oilNum':value});

                                let oilMoney = this.state.oilPrice,
                                    oilPrice = this.state.oilPrice,
                                    oilNum =value;

                                this.setState({'oilMoney':oilPrice*oilNum});
                                //alert(JSON.stringify(this.state));
                            }}
                            value={String(this.state.oilNum)}
                        />
                    </View>

                    <TouchableHighlight onPress={()=>{
                        let fullOil = !this.state.fullOil
                        this.setState({fullOil: fullOil})
                    }}>
                        <View>
                            <Text style={styles.text}>where</Text>
                            <Text style={styles.text}>{this.state.fullOil ? 'full' : 'notFull'}</Text>
                        </View>
                    </TouchableHighlight>
                    <Text style={styles.text}>last</Text>
                    <Picker
                        selectedValue={this.state.lastOil}
                        onValueChange={(lastOil) => this.setState({lastOil: lastOil})}
                        style={{ height: 30, width: 200 }}
                        prompt={'set'}
                    >
                        <Picker.Item label="light" value="10" />
                        <Picker.Item label="half" value="50" />
                        <Picker.Item label="1/4" value="25" />
                        <Picker.Item label="1/8" value="12" />
                    </Picker>
                    <Text style={styles.text}>{this.state.lastOil}</Text>
                </View>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    text:{
        fontSize:20
    }
});