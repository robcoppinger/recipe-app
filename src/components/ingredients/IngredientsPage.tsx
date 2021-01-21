import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {actions as shoppingListActions} from '../../redux/modules/shoppingLists/ShoppingLists';
import {actions as ingredientsActions} from '../../redux/modules/ingredients/Ingredients';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {selectors} from '../../redux/modules/recipes/Recipes';
import {RootState} from '../../redux';
import {IngredientItem} from './IngredientItem';
import {EditIngredientItem} from './EditIngredientItem';
import {NewIngredient} from './NewIngredient';
import {RecipeMode} from '../../screens/Recipe';
import {SvgImage} from '../common/SvgImage';
import {useTheme} from '../../context/ThemeContext';
import {useSnack} from '../../context/SnackContext';

type IngredientsPageProps = {
  title?: string; // For TabView Title only
  recipeId: string;
  mode: RecipeMode;
  setMode: (mode: RecipeMode) => void;
};
export type IngredientMode = 'default' | 'edit' | 'select';

const OPTIONS_ROW_HEIGHT = 50;

export const IngredientsPage = ({
  recipeId,
  mode = 'default',
  setMode,
}: IngredientsPageProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const snack = useSnack();
  const insets = useSafeAreaInsets();
  const recipe = useSelector((st: RootState) => selectors.recipe(st, recipeId));

  const OPTIONS_CONTAINER_HEIGHT = OPTIONS_ROW_HEIGHT + insets.bottom;
  const optionsContainerHeight = useSharedValue(0);

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isOptionsVisible, setOptionsVisble] = useState(false);
  const setOptionsHidden = () => setOptionsVisble(false); // for animation callback

  useEffect(() => {
    if (mode !== 'select' && selectedIngredients.length > 0)
      setSelectedIngredients([]); // clear selections

    if (mode === 'select' && !isOptionsVisible) {
      // animate bottom options visible
      setOptionsVisble(true);
      optionsContainerHeight.value = withTiming(
        OPTIONS_CONTAINER_HEIGHT,
        animationConfig,
      );
    }
    // animate bottom options hidden
    if (mode !== 'select' && isOptionsVisible) {
      optionsContainerHeight.value = withTiming(0, animationConfig, () => {
        runOnJS(setOptionsHidden)();
      });
    }
  }, [mode]);

  const addSelectedItem = (ingredientId: string) => {
    setSelectedIngredients([...selectedIngredients, ingredientId]);
  };
  const removeSelectedItem = (ingredientId: string) => {
    const newArr = selectedIngredients.filter((i) => i !== ingredientId);
    setSelectedIngredients(newArr);
    if (newArr.length <= 0) setMode('default');
  };

  const optionsContainerStyle = useAnimatedStyle(() => ({
    height: optionsContainerHeight.value,
    paddingBottom: insets.bottom,
    opacity: interpolate(
      optionsContainerHeight.value,
      [0, OPTIONS_ROW_HEIGHT / 2],
      [0, 1],
      Extrapolate.CLAMP,
    ),
  }));

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={170}>
      <ScrollView>
        {recipe.ingredients.map((id) => {
          switch (mode) {
            case 'edit':
              return (
                <EditIngredientItem
                  key={id}
                  ingredientId={id}
                  recipeId={recipeId}
                />
              );
            // 'default' | 'select'
            default:
              return (
                <IngredientItem
                  key={id}
                  ingredientId={id}
                  recipeId={recipeId}
                  mode={mode}
                  isSelected={selectedIngredients.includes(id)}
                  setMode={setMode}
                  addSelectedItem={addSelectedItem}
                  removeSelectedItem={removeSelectedItem}
                />
              );
          }
        })}
        {mode === 'edit' && (
          <NewIngredient key="newIngredient" recipeId={recipeId} />
        )}
      </ScrollView>
      {isOptionsVisible && (
        <OptionsContainer style={optionsContainerStyle}>
          <OptionsRow>
            <IconButton
              onPress={() => setSelectedIngredients(recipe.ingredients)}>
              <SvgImage icon="checked" size={30} fill={theme.colors.primary} />
            </IconButton>
            <IconButton
              onPress={() => {
                setSelectedIngredients([]);
                setMode('default');
              }}>
              <SvgImage
                icon="unchecked"
                size={30}
                fill={theme.colors.primary}
              />
            </IconButton>
            <IconButton
              onPress={() => {
                dispatch(
                  ingredientsActions.deleteBulkIngredients(
                    recipeId,
                    selectedIngredients,
                  ),
                );
                setMode('default');
              }}>
              <SvgImage icon="delete" size={30} fill={theme.colors.primary} />
            </IconButton>
            <IconButton
              onPress={() => {
                dispatch(
                  shoppingListActions.prepareIngredientsImport(
                    'fruha-reahrb',
                    selectedIngredients,
                  ),
                );
                snack.showSnack('Added to shopping list', 'cart');
                setMode('default');
              }}>
              <SvgImage icon="cart" size={30} fill={theme.colors.primary} />
            </IconButton>
          </OptionsRow>
        </OptionsContainer>
      )}
    </KeyboardAvoidingView>
  );
};

const OptionsContainer = styled(Animated.View)`
  background-color: ${(props) => props.theme.colors.headerBackground};
  border-top-width: 1px;
  border-color: ${(props) => props.theme.colors.headerBorder};
`;

const OptionsRow = styled.View`
  width: 100%;
  height: ${OPTIONS_ROW_HEIGHT}px;
  overflow: hidden;
  padding-bottom: 0px;
  flex-direction: row;
  justify-content: space-around;
`;

const IconButton = styled.TouchableOpacity`
  padding-horizontal: 12px;
  padding-bottom: 0px;
  justify-content: center;
`;

const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 200,
};
