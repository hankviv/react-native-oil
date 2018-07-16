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
            selectedTab: '花费',
        }
    }


    _renderTabBarItems(selectedTab,icon,selectedIcon,Component){
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={selectedTab}
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.selectedTabText}
                renderIcon={() => <Image style={styles.icon} source={icon} />}
                renderSelectedIcon={() => <Image style={styles.icon} source={selectedIcon} />}
                onPress={() => this.setState({ selectedTab: selectedTab })}
            >
                <Component navigation = {this.props.navigation} />
            </TabNavigator.Item>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    {this._renderTabBarItems('油耗',require('../../res/images/ic_oil.png'),require('../../res/images/ic_oil_select.png'),OilCostPage)}
                    {this._renderTabBarItems('花费',require('../../res/images/ic_cost.png'),require('../../res/images/ic_cost_select.png'),OtherCostPage)}
                    {this._renderTabBarItems('发现',require('../../res/images/ic_find.png'),require('../../res/images/ic_find_select.png'),FindPage)}
                    {this._renderTabBarItems('我的',require('../../res/images/ic_my.png'),require('../../res/images/ic_my_select.png'),MyPage)}
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon:{
        height: 20,
        width:20,
    },
    tabText:{
        fontSize:10
    },
    selectedTabText:{
        color:'#DF9C89'
    },
});
