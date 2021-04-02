import React, { useState } from 'react';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { SvgIcons } from '../../assets/images';
import { SvgImage } from '../components/common/SvgImage';
import { Text } from '../components/common/Text';
import { useTheme } from './ThemeContext';
import * as Haptic from 'expo-haptics';

type SnackContextType = {
  showSnack: (text: string, icon?: SvgIcons) => void;
};
type SnackContextProviderProps = {
  children: JSX.Element | JSX.Element[];
};
type SnackType = {
  text: string;
  icon?: SvgIcons;
};

const SnackContext = React.createContext<SnackContextType>({
  showSnack: () => {},
});

const SNACK_HEIGHT = 60;

export function SnackContextProvider({ children }: SnackContextProviderProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const SNACK_END_POSITION = insets.top;
  const SNACK_START_POSITION = -SNACK_HEIGHT;

  const [snack, setSnack] = useState<undefined | SnackType>();

  const translateY = useSharedValue(SNACK_START_POSITION);
  const snackOpacity = useSharedValue(1);

  const resetSnack = () => {
    setSnack(undefined);
    translateY.value = SNACK_START_POSITION;
    snackOpacity.value = 1;
  };

  const hideSnack = () => {
    snackOpacity.value = withTiming(0, opacityAnimationConfig, () =>
      runOnJS(resetSnack)(),
    );
  };

  const showSnack = (text: string, icon?: SvgIcons) => {
    if (!text || !!snack) return;
    Haptic.notificationAsync(Haptic.NotificationFeedbackType.Success);
    setSnack({ text, icon });

    const triggerHide = async () => {
      await new Promise((res) => setTimeout(res, 2000));
      hideSnack();
    };

    translateY.value = withTiming(SNACK_END_POSITION, animationConfig, () => {
      runOnJS(triggerHide)();
    });
  };

  const snackContainerStyle = useAnimatedStyle(() => ({
    opacity: snackOpacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  // -------------------- Provider --------------------
  return (
    <SnackContext.Provider value={{ showSnack }}>
      {snack && (
        <SnackContainer style={snackContainerStyle}>
          <Snack>
            {snack?.icon && (
              <SvgImage
                icon={snack.icon}
                size={25}
                fill={theme.colors.primary}
              />
            )}
            <SnackText variant="h3">{snack?.text}</SnackText>
          </Snack>
        </SnackContainer>
      )}
      {children}
    </SnackContext.Provider>
  );
}

export function useSnack() {
  const snackContext = React.useContext(SnackContext);
  if (snackContext === undefined) {
    throw new Error(`SnackContext must be used within a SnackContextProvider`);
  }
  return snackContext;
}

const SnackContainer = styled(Animated.View)`
  position: absolute;
  top: 0px;
  width: 100%;
  padding-horizontal: 8px;
  z-index: 500;
  box-shadow: ${(props) => props.theme.shadow};
`;

const Snack = styled.View`
  flex-direction: row;
  height: ${SNACK_HEIGHT}px;
  background-color: ${(props) => props.theme.colors.primaryFaded}
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.primary}
  border-radius: 6px;
  justify-content: center
  align-items: center
`;

const SnackText = styled(Text)`
  padding: 8px;
  color: ${(props) => props.theme.colors.primary};
`;

const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 250,
};

const opacityAnimationConfig = {
  easing: Easing.inOut(Easing.linear),
  duration: 400,
};
