import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import {useTheme} from '../context/ThemeContext';

export const DrawerContent = (props: any) => {
  const theme = useTheme();

  const translateX = Animated.interpolateNode(props.progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <DrawerContentScrollView
      style={{backgroundColor: theme.colors.paper}}
      {...props}>
      <Animated.View style={{transform: [{translateX}]}}>
        <Content>
          <DrawerItemList {...props} />
        </Content>
      </Animated.View>
    </DrawerContentScrollView>
  );
};
const Content = styled.TouchableOpacity`
  margin-top: 40px;
  padding-top: 8px;
  border-top-width: 1px;
  border-color: ${(props) => props.theme.colors.itemSeparator};
`;
