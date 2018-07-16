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
import NavigationBar from '../../common/NavigationBar';

export default class BackDataPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={{backgroundColor: '#FFFFFF'}}>
                <NavigationBar
                    title='恢复数据'
                    style={styles.NavigationBar}/>
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
})
