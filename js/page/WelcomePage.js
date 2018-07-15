import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native'


import SplashScreen from 'react-native-splash-screen'
import { StackActions, NavigationActions } from 'react-navigation';

import HomePage from './HomePage';

const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'HomePage' })
    ],
});

export default class WelcomePage extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.timer = setTimeout(()=>{
            //SplashScreen.hide();
            this.props.navigation.dispatch(resetAction);
        },1000);
    }


    componentWillUnMount(){
        this.timer&&clearTimeout(this.timer);
    }

    render(){
        return <Text style={styles.text}>启动页</Text>;
    }
}

const styles = StyleSheet.create({
    text:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:40,
        color:'red',
    }
});