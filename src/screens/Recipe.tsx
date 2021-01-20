import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Layout} from '../components/common/Layout';
import {useDispatch, useSelector} from 'react-redux';
import {selectors, actions} from '../redux/modules/recipes/Recipes';
import {useRoute, useNavigation} from '@react-navigation/native';
import {RootState} from '../redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from '../components/common/Text';
import {SvgImage} from '../components/common/SvgImage';
import {Images} from '../../assets/images';
import {useTheme} from '../context/ThemeContext';
import {IngredientsPage} from '../components/ingredients/IngredientsPage';
import {MethodPage} from '../components/method/MethodPage';
import {TabView} from '../components/common/TabView';
import {TextInput} from '../components/common/TextInput';
import {RecipeScreenRouteProp} from '../navigators/RecipeNavigator';

export type RecipeMode = 'edit' | 'default' | 'select';

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
  const [mode, setMode] = useState<RecipeMode>(
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
      <HeaderActionButton onPress={toggleMode}>
        <HeaderActionText>
          {mode === 'default' ? 'Edit' : 'Done'}
        </HeaderActionText>
      </HeaderActionButton>
    </HeaderContent>
  );

  return (
    <Layout customHeaderComponent={customHeader} hideHeaderBorder>
      <TabView>
        <MethodPage title="Method" recipeId={recipeId} mode={mode} />
        <IngredientsPage
          title="Ingredients"
          recipeId={recipeId}
          mode={mode}
          setMode={setMode}
        />
      </TabView>
    </Layout>
  );
};

const HeaderTitle = styled(TextInput)`
  flex: 1;
  text-align: left;
  font-family: ${(props) => props.theme.defaultFontFamily.semiBold};
  font-size: ${(props) => props.theme.fontSize.h3};
  margin-left: 8px;
  margin-right: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
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

const HeaderActionButton = styled.TouchableOpacity`
  height: 30px;
  padding: 8px;
  justify-content: center;
`;

const HeaderActionText = styled(Text)`
  color: ${(props) => props.theme.colors.primary};
`;
