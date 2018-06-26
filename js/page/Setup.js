import React,{Component} from 'react';

import { createStackNavigator } from 'react-navigation';

import WelcomePage from './WelcomePage';
import HomePage from './HomePage';

const RootStack = createStackNavigator(
    {
        WelcomePage: {
            screen: WelcomePage,
            navigationOptions: {

            }
        },
        HomePage: {
            screen: HomePage,
            navigationOptions: {

            }
        },
    },
    {
        headerMode: 'none',
        mode: 'modal',
    }
);

export default class Setup extends Component {
    render() {
        return <RootStack />;
    }
}