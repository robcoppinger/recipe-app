import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Roadmap } from '../screens/Roadmap';
import { RoadMapAction } from '../components/roadmap/RoadmapData';
import { ActionInfo } from '../components/roadmap/ActionInfo';

export type RoadmapStackParamList = {
  Roadmap: undefined;
  ActionInfo: { action: RoadMapAction };
};

export type ActioninfoScreenRouteProp = RouteProp<
  RoadmapStackParamList,
  'ActionInfo'
>;

const RoadmapStack = createStackNavigator<RoadmapStackParamList>();

export const RoadmapNavigator = () => (
  <RoadmapStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Roadmap">
    <RoadmapStack.Screen name="Roadmap" component={Roadmap} />
    <RoadmapStack.Screen name="ActionInfo" component={ActionInfo} />
  </RoadmapStack.Navigator>
);
