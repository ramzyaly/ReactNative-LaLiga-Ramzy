import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page3 from './components/Page3';



var AppNavigator = createStackNavigator(
  {
    Page1: Page1,
    Page2: Page2,
    Page3: Page3
  },
  {
    initialRouteName: "Page1"
  }
)

export default createAppContainer(AppNavigator);