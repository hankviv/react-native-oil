import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
    Picker,
    TouchableHighlight,
    TextInput,
} from 'react-native';

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

        }
        //alert(JSON.(this.props));
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>AddRecord</Text>
                <Text style={styles.text}
                      onPress={()=> this.props.navigation.goBack()
                      }>AddOilRecord----goBack
                </Text>


                <Text style={styles.text}>date</Text>



                <Text style={styles.text}>mile</Text>
                <TextInput
                    keyboardType = {'numeric'}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText = {(value) => this.setState({mileage:value})}
                    value={String(this.state.mileage)}
                />



                <View>
                    <Text style={styles.text}>money</Text>
                    <TextInput
                        keyboardType = {'numeric'}
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText = {(value) =>{
                            this.setState({'oilMoney':value});

                            let oilMoney = value,
                                oilPrice = this.state.oilPrice,
                                oilNum =this.state.oilNum;

                            if( oilMoney && oilPrice ){
                                this.setState({'oilNum':oilMoney/oilPrice})
                            }
                            if(oilMoney && !oilPrice && oilNum){

                                this.setState({'oilPrice':oilMoney/oilNum})
                            }
                        }}
                        value={String(this.state.oilMoney)}
                    />
                    <TextInput
                        keyboardType = {'numeric'}
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText = {(value) =>{
                            this.setState({'oilPrice':value});

                            let oilMoney = this.state.oilMoney,
                                oilPrice = value,
                                oilNum =this.state.oilPrice;

                            if(oilMoney && oilPrice){
                                this.setState({'oilNum':oilMoney/oilPrice});
                            }

                            if(!oilMoney && oilNum){
                                this.setState({'oilMoney':oilMoney*oilPrice});
                            }
                        }}
                        value={String(this.state.oilPrice)}
                    />
                    <TextInput
                        keyboardType = {'numeric'}
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