import React from 'react';
import {Dimensions} from 'react-native';
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
import styled from 'styled-components/native';
import {useTheme} from '../../context/ThemeContext';
import {SvgImage} from './SvgImage';
import * as Haptic from 'expo-haptics';

type DeleteableProps = {
  enabled?: boolean;
  children: (props: {interceptPress: (cb?: () => void) => void}) => JSX.Element;
  containerHeight: number;
  onDeleteAnimationStarted?: () => void;
  onDeleteAnimationComplete?: () => void;
};

const SNAP_INTERVAL = -80;
const SNAP_THRESHOLD = -70;
const WIDTH = Dimensions.get('window').width;

export const Deleteable = ({
  enabled = true,
  children,
  containerHeight,
  onDeleteAnimationStarted,
  onDeleteAnimationComplete,
}: DeleteableProps) => {
  // ==================== State and variables ====================
  const theme = useTheme();
  const translateX = useSharedValue(0); // changed on swipe to delete
  const height = useSharedValue(containerHeight);
  const hasPassedThreshold = useSharedValue(false);

  const triggerHaptic = () =>
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light);

  // ====================== Gesture Handler ======================
  // swipe to delete gesture handler
  const onSwipeGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number; y: number}
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({translationX}, ctx) => {
      let dest = ctx.x + translationX;
      translateX.value = dest <= 0 ? dest : 0;
      if (
        Math.abs(dest) > Math.abs(SNAP_THRESHOLD) &&
        !hasPassedThreshold.value
      ) {
        hasPassedThreshold.value = true;
        runOnJS(triggerHaptic)();
      }
    },
    onEnd: () => {
      const destination = translateX.value < SNAP_THRESHOLD ? SNAP_INTERVAL : 0;
      translateX.value = withTiming(destination, animationConfig);
      hasPassedThreshold.value = false;
    },
  });

  // ===================== General Functions =====================

  const deleteItemAnimation = () => {
    onDeleteAnimationStarted && onDeleteAnimationStarted();
    translateX.value = withTiming(-WIDTH, animationConfig);
    height.value = withTiming(0, animationConfig, () => {
      onDeleteAnimationComplete && runOnJS(onDeleteAnimationComplete)();
    });
  };

  const resetSwipeAnim = () => {
    translateX.value = withTiming(0, animationConfig);
  };

  const interceptPress = (cb?: () => void) => {
    if (Math.abs(translateX.value) > 20) return resetSwipeAnim();
    cb && cb();
  };

  // ====================== Animation styles ======================

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      overflow: 'hidden',
    };
  });

  const swipeableContainerStyle = useAnimatedStyle(() => ({
    flex: 1,
    transform: [{translateX: translateX.value}],
  }));

  const imageStyle = useAnimatedStyle(() => ({
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
  }));

  const deleteContainerStyle = useAnimatedStyle(() => ({
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: theme.colors.danger,
    right: 0,
    width: Math.abs(translateX.value),
    height: '100%',
    overflow: 'hidden',
  }));

  // ====================== Rendered Content ======================

  const DeleteElement = () => (
    <Animated.View style={deleteContainerStyle}>
      <DeleteButton onPress={deleteItemAnimation}>
        <Animated.View style={imageStyle}>
          <SvgImage icon="deleteFilled" fill="#FFF" size="100%" />
        </Animated.View>
      </DeleteButton>
    </Animated.View>
  );

  return (
    <Animated.View style={containerStyle}>
      <DeleteElement />
      <Animated.View style={swipeableContainerStyle}>
        <PanGestureHandler
          enabled={enabled}
          activeOffsetX={[-10]}
          onGestureEvent={onSwipeGestureEvent}>
          <Animated.View style={{flex: 1, height: '100%'}}>
            {children({interceptPress})}
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </Animated.View>
  );
};

const DeleteButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
};
