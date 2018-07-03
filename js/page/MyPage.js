import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    Image
} from 'react-native';
import NavigationBar from '../common/NavigationBar'

export default class MyPage extends Component{
    constructor(props) {
        super(props);
    }

    renderButton(image){
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={()=>{
                this.props.navigator.goBack();
            }}>
            <Image
                style={{width: 26, height: 26,tintColor:'yellow'}}
                source={image}/>
        </TouchableOpacity>;
    }

    render(){
        return(
            <View style={styles.container}>
                <NavigationBar
                    style={{backgroundColor:'#F08080'}}
                    leftButton={this.renderButton(require('../../res/images/ic_arrow_back_white_36pt.png'))}
                    rightButton={this.renderButton(require('../../res/images/ic_star.png'))}
                />
                <Text>MyPage</Text>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
})