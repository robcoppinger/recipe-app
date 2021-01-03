import React from 'react';
import styled from 'styled-components/native';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {
  useNavigation,
  useRoute,
  useNavigationState,
} from '@react-navigation/native';
import {SvgImage} from './SvgImage';
import {Images} from '../../../assets/images';

type HeaderProps = {
  headerRightComponent?: () => JSX.Element;
};

export const Header = ({headerRightComponent}: HeaderProps) => {
  const {goBack} = useNavigation();
  const route = useRoute();
  const index = useNavigationState((state) => state.index);
  return (
    <HeaderContainer>
      <SafeAreaView />
      <HeaderContent>
        {index > 0 && (
          <TouchableOpacity style={{position: 'absolute'}} onPress={goBack}>
            <SvgImage style={{width: 35, height: 35}} source={Images.back} />
          </TouchableOpacity>
        )}
        <Text>{route.name}</Text>
        {headerRightComponent && headerRightComponent()}
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  background-color: ${(props) => props.theme.colors.headerBackground};
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.headerBorder};
`;

const Text = styled.Text`
  flex: 1;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.defaultFontFamily['semiBold']};
  font-size: ${(props) => props.theme.fontSize.h3};
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
