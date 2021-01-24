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
import {IngredientItem, INGREDIENT_ITEM_HEIGHT} from './IngredientItem';
import {EditIngredientItem} from './EditIngredientItem';
import {NewIngredient, NEW_INGREDIENT_HEIGHT} from './NewIngredient';
import {RecipeMode} from '../../screens/Recipe';
import {SvgImage} from '../common/SvgImage';
import {useTheme} from '../../context/ThemeContext';
import {useSnack} from '../../context/SnackContext';
import {SelectShoppingList} from '../shoppingLists/SelectShoppingList';
import {useModalView} from '../../context/ModalViewContext';

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
  const modalView = useModalView();
  const recipe = useSelector((st: RootState) => selectors.recipe(st, recipeId));

  const OPTIONS_CONTAINER_HEIGHT = OPTIONS_ROW_HEIGHT + insets.bottom;
  const optionsContainerHeight = useSharedValue(0);

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isOptionsVisible, setOptionsVisble] = useState(false);
  const setOptionsHidden = () => setOptionsVisble(false); // for animation callback
  const deletingId = useSharedValue<undefined | string>(undefined);

  const positions = useSharedValue<Positions>(
    Object.assign(
      {},
      ...recipe.ingredients.map((id, index) => ({[id]: index})),
    ),
  );

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

  const addItemsToShoppingList = (shoppingListId: string) => {
    dispatch(
      shoppingListActions.prepareIngredientsImport(
        shoppingListId,
        selectedIngredients,
      ),
    );
    snack.showSnack('Added to shopping list', 'cart');
    setMode('default');
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
      <ScrollView
        scrollIndicatorInsets={{right: 1}}
        contentContainerStyle={{
          height:
            recipe.ingredients.length * INGREDIENT_ITEM_HEIGHT +
            NEW_INGREDIENT_HEIGHT,
        }}>
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
                  positions={positions}
                  deletingId={deletingId}
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
                modalView.showModal(() =>
                  SelectShoppingList({
                    onSelection: (shoppingListId) =>
                      addItemsToShoppingList(shoppingListId),
                  }),
                );
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

export interface Positions {
  [id: string]: number;
}
