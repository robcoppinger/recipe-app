import React from 'react';
import {View} from 'react-native';
import {navigate} from '../services/NavigationService';
import styled from 'styled-components/native';

export const Recipes = () => (
  <View>
    <Button onPress={() => navigate('Recipe')}>
      <Text>Recipes</Text>
    </Button>
  </View>
);

const Button = styled.TouchableOpacity`
  border-color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.fill};
  border-radius: ${(props) => props.theme.borderRadius};
  border-width: 1px;
  padding: 8px;
  margin: 4px;
  margin-top: 12px;
`;

const Text = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.defaultFontFamily['regular']};
`;
