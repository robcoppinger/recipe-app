import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {selectors} from '../../redux/modules/recipes/Recipes';
import {RootState} from '../../redux';
import {IngredientItem} from './IngredientItem';
import {EditIngredientItem} from './EditIngredientItem';
import {NewIngredient} from './NewIngredient';
import {RecipeMode} from '../../screens/Recipe';

type IngredientsPageProps = {
  title?: string; // For TabView Title only
  recipeId: string;
  mode: RecipeMode;
  setMode: (mode: RecipeMode) => void;
};

export type IngredientMode = 'default' | 'edit' | 'select';

export const IngredientsPage = ({
  recipeId,
  mode = 'default',
  setMode,
}: IngredientsPageProps) => {
  const recipe = useSelector((st: RootState) => selectors.recipe(st, recipeId));

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  useEffect(() => {
    if (mode !== 'select' && selectedIngredients.length > 0)
      setSelectedIngredients([]);
  }, [mode]);

  const addSelectedItem = (ingredientId: string) => {
    setSelectedIngredients([...selectedIngredients, ingredientId]);
  };
  const removeSelectedItem = (ingredientId: string) => {
    const newArr = selectedIngredients.filter((i) => i !== ingredientId);
    setSelectedIngredients(newArr);
    if (newArr.length <= 0) setMode('default');
  };

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
    </KeyboardAvoidingView>
  );
};
