import React from 'react';
import styled from 'styled-components/native';
import {Layout} from '../components/common/Layout';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {SvgImage} from '../components/common/SvgImage';
import {Images} from '../../assets/images';
import {Text} from '../components/common/Text';

export const Recipes = () => {
  const {navigate} = useNavigation();

  const HeaderRightComponent = () => (
    <TouchableOpacity
      style={{position: 'absolute', right: 12}}
      onPress={() => navigate('Recipe')}>
      <SvgImage style={{width: 30, height: 30}} source={Images.add} />
    </TouchableOpacity>
  );

  return (
    <Layout headerRightComponent={HeaderRightComponent}>
      <Button onPress={() => navigate('Recipe')}>
        <Text variant="regular">Recipes</Text>
      </Button>
    </Layout>
  );
};

const Button = styled.TouchableOpacity`
  border-color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.fill};
  border-radius: ${(props) => props.theme.borderRadius};
  border-width: 1px;
  padding: 8px;
`;
