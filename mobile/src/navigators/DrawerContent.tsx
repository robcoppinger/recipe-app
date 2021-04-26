import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { Switch } from 'react-native';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { env } from '../../env';
import { Button } from '../components/common/Button';
import { Text } from '../components/common/Text';
import { useTheme } from '../context/ThemeContext';
import { actions, selectors } from '../redux/modules/application/Application';
import { actions as authActions } from '../redux/modules/auth/Auth';

export const DrawerContent = (props: any) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const selectedTheme = useSelector(selectors.theme);

  const translateX = Animated.interpolateNode(props.progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <DrawerContentScrollView
      style={{ backgroundColor: theme.colors.paper }}
      {...props}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Content>
          <DrawerItemList {...props} />
        </Content>
        <ThemeToggleContainer>
          <ThemeToggleText>Toggle Theme</ThemeToggleText>
          <Switch
            trackColor={{
              false: '#2F3D43',
              true: '#F8EEEE',
            }}
            ios_backgroundColor={theme.colors.primaryFaded}
            thumbColor={theme.colors.primary}
            onValueChange={() => dispatch(actions.toggleTheme())}
            value={selectedTheme === 'light'}
          />
        </ThemeToggleContainer>
        {env.featureFlags.isAuthEnabled && (
          <Button
            onPress={() => dispatch(authActions.logoutSuccess())}
            style={{ margin: 20 }}
            variant="outline"
            text="Log Out"
          />
        )}
      </Animated.View>
    </DrawerContentScrollView>
  );
};
const Content = styled.TouchableOpacity`
  margin-top: 40px;
  padding-top: 8px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.itemSeparator};
`;

const ThemeToggleContainer = styled.View`
  flex-direction: row;
  padding: 20px;
  align-items: center;
`;

const ThemeToggleText = styled(Text)`
flex: 1
  font-weight: 700;
  color: ${(props) => props.theme.colors.text}
`;
