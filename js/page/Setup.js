import React,{Component} from 'react';

import { createStackNavigator } from 'react-navigation';

import WelcomePage from './WelcomePage';
import HomePage from './HomePage';
import AddOilRecord from './oilCost/AddOilRecord';
import CheckOilRecord from './oilCost/CheckOilRecord';


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
        AddOilRecord: {
            screen: AddOilRecord,
            navigationOptions: {

            }
        },
        CheckOilRecord: {
            screen: CheckOilRecord,
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