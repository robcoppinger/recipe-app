import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {Images} from '../../../assets/images';
import {useTheme} from '../../context/ThemeContext';
import {RootState} from '../../redux';
import {actions, selectors} from '../../redux/modules/recipes/Recipes';
import {SvgImage} from '../common/SvgImage';
import {Text} from '../common/Text';

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
};
const HEIGHT = 70;
const SNAP_INTERVAL = -80;
const SNAP_THRESHOLD = -70;

type RecipeItemProps = {
  recipeId: string;
};

export const RecipeItem = ({recipeId}: RecipeItemProps) => {
  const translateX = useSharedValue(0);
  const height = useSharedValue(HEIGHT);
  const dispatch = useDispatch();
  const recipe = useSelector((st: RootState) => selectors.recipe(st, recipeId));
  const {navigate} = useNavigation();
  const theme = useTheme();

  const deleteItem = () => {
    dispatch(actions.deleteRecipe(recipeId));
  };

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number; y: number}
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({translationX}, ctx) => {
      let dest = ctx.x + translationX;
      translateX.value = dest <= 0 ? dest : 0;
    },
    onEnd: () => {
      const destination = translateX.value < SNAP_THRESHOLD ? SNAP_INTERVAL : 0;
      translateX.value = withTiming(destination, animationConfig);
    },
  });

  const resetAnim = () => {
    translateX.value = withTiming(0, animationConfig);
  };

  const deleteContainerStyle = useAnimatedStyle(() => {
    return {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: '#de2626',
      right: 0,
      width: Math.abs(translateX.value),
      height: height.value,
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: 25,
      height: 25,
      opacity: interpolate(translateX.value, [0, SNAP_INTERVAL], [0, 1]),
      transform: [
        {
          scale: interpolate(
            translateX.value,
            [0, SNAP_INTERVAL],
            [0.001, 1],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      position: 'relative',
      height: height.value,
      borderBottomWidth: 1,
      borderColor: theme.colors.itemSeparator,
      overflow: 'hidden',
    };
  });

  const gestureContainerStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transform: [{translateX: translateX.value}],
    };
  });

  const DeleteButton = () => (
    <Animated.View style={deleteContainerStyle}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          height.value = withTiming(0, animationConfig, () =>
            runOnJS(deleteItem)(),
          );
        }}>
        <Animated.View style={imageStyle}>
          <SvgImage
            source={Images.deleteFilled}
            style={{fill: '#FFF', width: '100%', height: '100%'}}
          />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <Animated.View style={containerStyle}>
      <DeleteButton />
      <Animated.View style={gestureContainerStyle}>
        <PanGestureHandler
          activeOffsetX={[-10, 10]}
          onGestureEvent={onGestureEvent}>
          <Animated.View>
            <RecipeItemContainer
              activeOpacity={0.5}
              onPress={() => {
                Math.abs(translateX.value) > 20
                  ? resetAnim()
                  : navigate('Recipe', {recipeId});
              }}>
              <RecipeText variant="h3">{recipe.title}</RecipeText>
            </RecipeItemContainer>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </Animated.View>
  );
};

const RecipeItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.paper};
  height: 100%;
  padding: 20px;
  padding-left: 32px
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.shadow};
`;

const RecipeText = styled(Text)`
  flex: 1;
  font-weight: 600;
`;
