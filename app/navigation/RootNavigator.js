import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CountriesWithWeather, CountryScreen} from 'screens';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search country" component={CountryScreen} />
      <Tab.Screen name="Weather" component={CountriesWithWeather} />
    </Tab.Navigator>
  );
};

export default RootNavigator;
