/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator'

import OilCostPage from './OilCostPage'
import OtherCostPage from './OtherCostPage'
import FindPage from './FindPage'
import MyPage from './MyPage'

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'oilCost',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'oilCost'}
                        title="油耗"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/oilTab.png')}/>}
                        onPress={() => this.setState({selectedTab: 'oilCost'})}>
                        <OilCostPage navigation = {this.props.navigation}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'otherCost'}
                        title="花费"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/oilTab.png')}/>}
                        onPress={() => this.setState({selectedTab: 'otherCost'})}>
                        <OtherCostPage/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'find'}
                        title="发现"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/oilTab.png')}/>}
                        onPress={() => this.setState({selectedTab: 'find'})}>
                        <FindPage/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'my'}
                        title="我的"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/oilTab.png')}/>}
                        onPress={() => this.setState({selectedTab: 'my'})}>
                        <MyPage/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image:{
        height: 20,
        width:20,
    },
});
