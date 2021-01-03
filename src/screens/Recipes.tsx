import React from 'react';
import styled from 'styled-components/native';
import {Layout} from '../components/common/Layout';
import {useNavigation} from '@react-navigation/native';

export const Recipes = () => {
  const {navigate} = useNavigation();
  return (
    <Layout>
      <Button onPress={() => navigate('Recipe')}>
        <Text>Recipes</Text>
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

const Text = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.defaultFontFamily['regular']};
`;
