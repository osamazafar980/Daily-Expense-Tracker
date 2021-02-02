import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation'
import HomeScreen from './screens/HomeScreen.js'


const stackNavigator = createStackNavigator(
  {
    Home:HomeScreen,
  },{
    initialRouteName: "Home",

    defaultNavigationOptions: {
      headerTitleStyle: { alignSelf: 'center' },
      title: "Expense App"
    }
  }
);



export default createAppContainer(stackNavigator);