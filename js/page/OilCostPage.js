import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import NavigationBar from '../common/NavigationBar';

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
                style={{width: 50, height: 50}}
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
                style={{width: 50, height: 50}}
                source={image}/>
        </TouchableOpacity>;
    }

    render(){
        return(
            <View style={{backgroundColor:'#FFFFFF'}}>


                <View>
                    <ScrollView>
                        <Text style={styles.showBanner}>OilCost</Text>
                        <Text style={styles.showBanner}>OilCost</Text>
                        <Text style={styles.showBanner}>OilCost</Text>
                        <Text style={styles.showBanner}>OilCost</Text>
                        <Text style={styles.showBanner}>OilCost</Text>
                        <Text style={styles.showBanner}>OilCost</Text>
                        <Text style={styles.showBanner}>OilCost</Text>
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
    showBanner:{
      backgroundColor:'#2A0D31',
      height:100,
        width:200,
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