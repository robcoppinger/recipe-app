import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import {
  useNavigation,
  useRoute,
  DrawerActions,
} from '@react-navigation/native';
import { SvgImage } from './SvgImage';
import { Text } from './Text';
import { useTheme } from '../../context/ThemeContext';

type HeaderProps = {
  headerLabel?: string;
  headerRightComponent?: () => JSX.Element;
  showDrawer?: boolean;
  showGoBack?: boolean;
  customHeaderComponent?: () => JSX.Element;
  hideHeaderBorder?: boolean;
};

export const Header = ({
  headerLabel,
  headerRightComponent,
  showDrawer = false,
  showGoBack = false,
  customHeaderComponent,
  hideHeaderBorder,
}: HeaderProps) => {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();
  return (
    <HeaderContainer style={hideHeaderBorder && { borderBottomWidth: 0 }}>
      <SafeAreaView />
      {customHeaderComponent ? (
        customHeaderComponent()
      ) : (
        <HeaderContent>
          {showDrawer && (
            <TouchableOpacity
              style={{ position: 'absolute', left: 16 }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <SvgImage size={30} icon="menu" fill={theme.colors.primary} />
            </TouchableOpacity>
          )}
          {showGoBack && !showDrawer && (
            <TouchableOpacity
              style={{ position: 'absolute', left: 16 }}
              onPress={navigation.goBack}>
              <SvgImage size={30} icon="back" fill={theme.colors.primary} />
            </TouchableOpacity>
          )}
          <HeaderText variant="h3">{headerLabel || route.name}</HeaderText>
          {headerRightComponent && headerRightComponent()}
        </HeaderContent>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  background-color: ${(props) => props.theme.colors.headerBackground};
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.headerBorder};
`;

const HeaderText = styled(Text)`
  flex: 1;
  text-align: center;
`;

const HeaderContent = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  padding-left: 40px;
  padding-right: 40px;
`;
