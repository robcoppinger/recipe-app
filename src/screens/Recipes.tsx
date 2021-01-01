import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {navigate} from '../services/NavigationService';

export const Recipes = () => (
  <View>
    <TouchableOpacity
      onPress={() => navigate('Recipe')}
      style={{
        borderColor: 'black',
        borderWidth: 1,
        padding: 8,
        margin: 4,
        marginTop: 12,
      }}>
      <Text>Recipes</Text>
    </TouchableOpacity>
  </View>
);
