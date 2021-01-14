import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Layout} from '../components/common/Layout';
import {ScrollView, KeyboardAvoidingView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectors, actions} from '../redux/modules/recipes/Recipes';
import {useRoute, useNavigation} from '@react-navigation/native';
import {RecipeScreenRouteProp} from '../navigators/AppNavigator';
import {RootState} from '../redux';
import {IngredientItem} from '../components/ingredients/IngredientItem';
import {EditIngredientItem} from '../components/ingredients/EditIngredientItem';
import {NewIngredient} from '../components/ingredients/NewIngredient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from '../components/common/Text';
import {SvgImage} from '../components/common/SvgImage';
import {Images} from '../../assets/images';
import {useTheme} from '../context/ThemeContext';

export const Recipe = () => {
  const route = useRoute<RecipeScreenRouteProp>();
  const dispatch = useDispatch();
  const {goBack} = useNavigation();
  const theme = useTheme();
  const params = route.params || {};
  const {recipeId} = params;

  const recipe = useSelector((st: RootState) => selectors.recipe(st, recipeId));
  if (!recipe) return <Layout />;

  const [title, setTitle] = useState(recipe.title);
  const [mode, setMode] = useState<'edit' | 'default'>(
    recipe.ingredients.length > 0 ? 'default' : 'edit',
  );

  const toggleMode = () => {
    setMode(mode === 'default' ? 'edit' : 'default');
  };

  const customHeader = () => (
    <HeaderContent>
      <TouchableOpacity onPress={goBack}>
        <SvgImage
          source={Images.back}
          style={{width: 30, height: 30, fill: theme.colors.primary}}
        />
      </TouchableOpacity>
      <HeaderTitle
        editable={mode === 'edit'}
        style={mode === 'edit' && {borderBottomWidth: 1, paddingBottom: 3}}
        value={title}
        selectTextOnFocus
        onChangeText={(value) => setTitle(value)}
        onBlur={() => dispatch(actions.editTitle(recipeId, title))}
        autoFocus={title === 'New Recipe'}
        placeholder="New Recipe"
      />
      <TouchableOpacity onPress={toggleMode}>
        <HeaderActionText>
          {mode === 'default' ? 'Edit' : 'Done'}
        </HeaderActionText>
      </TouchableOpacity>
    </HeaderContent>
  );
  return (
    <Layout customHeaderComponent={customHeader}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="padding"
        keyboardVerticalOffset={100}>
        <ScrollView>
          {recipe.ingredients.map((id) =>
            mode === 'default' ? (
              <IngredientItem key={id} ingredientId={id} recipeId={recipeId} />
            ) : (
              <EditIngredientItem
                key={id}
                ingredientId={id}
                recipeId={recipeId}
              />
            ),
          )}
          {mode === 'edit' && (
            <NewIngredient key="newIngredient" recipeId={recipeId} />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const HeaderTitle = styled.TextInput`
  flex: 1;
  text-align: left;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.defaultFontFamily.semiBold};
  font-size: ${(props) => props.theme.fontSize.h3};
  margin-left: 8px;
  margin-right: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  border-color: ${(props) => props.theme.colors.iconSubtleColor};
`;

const HeaderContent = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  padding-left: 8px;
  padding-right: 24px;
`;

const HeaderActionText = styled(Text)`
  color: ${(props) => props.theme.colors.primary};
`;
