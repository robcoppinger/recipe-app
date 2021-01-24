import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {Dimensions, Keyboard} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

type ModalViewContextType = {
  showModal: (renderFunction: FunctionComponent) => void;
  hideModal: () => void;
};
type ModalViewContextProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const ModalViewContext = React.createContext<ModalViewContextType>({
  showModal: () => {},
  hideModal: () => {},
});

const HEIGHT = Dimensions.get('window').height;
const SNAP_HEIGHT = HEIGHT * 0.5;
const SNAP_HEIGHT_TALL = HEIGHT * 0.9;
const ACTION_DISMISS_HEIGHT = HEIGHT * 0.4;
const ACTION_EXTEND_HEIGHT = HEIGHT * 0.7;

export function ModalViewContextProvider({
  children,
}: ModalViewContextProviderProps) {
  const insets = useSafeAreaInsets();

  const viewContainerHeight = useSharedValue(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const RenderComponent = useRef<FunctionComponent | undefined>();

  const setModalHidden = () => setIsModalVisible(false);

  const snapToExtendedHeight = () => {
    if (viewContainerHeight.value !== SNAP_HEIGHT_TALL) {
      viewContainerHeight.value = withTiming(SNAP_HEIGHT_TALL, animationConfig);
    }
  };
  const snapToDefaultHeight = () => {
    if (viewContainerHeight.value !== SNAP_HEIGHT) {
      viewContainerHeight.value = withTiming(SNAP_HEIGHT, animationConfig);
    }
  };

  const showModal = (renderFunction: FunctionComponent) => {
    RenderComponent.current = renderFunction;
    setIsModalVisible(true);
    snapToDefaultHeight();
  };

  const hideModal = () => {
    viewContainerHeight.value = withTiming(0, animationConfig, () =>
      runOnJS(setModalHidden)(),
    );
  };

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', snapToExtendedHeight);
    Keyboard.addListener('keyboardWillHide', snapToDefaultHeight);
    return () => {
      Keyboard.removeListener('keyboardWillShow', snapToExtendedHeight);
      Keyboard.removeListener('keyboardWillHide', snapToDefaultHeight);
    };
  }, []);

  const viewContainerStyle = useAnimatedStyle(() => ({
    height: viewContainerHeight.value,
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      viewContainerHeight.value,
      [0, SNAP_HEIGHT],
      [0, 1],
      Extrapolate.CLAMP,
    ),
  }));

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number; y: number}
  >({
    onStart: (_, ctx) => {
      ctx.x = viewContainerHeight.value;
    },
    onActive: ({translationY}, ctx) => {
      viewContainerHeight.value = ctx.x - translationY;
    },
    onEnd: () => {
      if (viewContainerHeight.value < ACTION_DISMISS_HEIGHT) {
        return runOnJS(hideModal)();
      }
      const desination =
        viewContainerHeight.value > ACTION_EXTEND_HEIGHT
          ? SNAP_HEIGHT_TALL
          : SNAP_HEIGHT;
      viewContainerHeight.value = withTiming(desination, animationConfig);
    },
  });

  // -------------------- Provider --------------------
  return (
    <ModalViewContext.Provider value={{showModal, hideModal}}>
      {isModalVisible && (
        <>
          <Overlay style={overlayStyle} />
          <Dismissable onPress={hideModal} />
          <ViewContainer
            style={[viewContainerStyle, {paddingBottom: insets.bottom}]}>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
              <HandleContainer>
                <Handle />
              </HandleContainer>
            </PanGestureHandler>
            {RenderComponent.current && <RenderComponent.current />}
          </ViewContainer>
        </>
      )}
      {children}
    </ModalViewContext.Provider>
  );
}

export function useModalView() {
  const modalViewContext = React.useContext(ModalViewContext);
  if (modalViewContext === undefined) {
    throw new Error(
      `ModalViewContext must be used within a ModalViewContextProvider`,
    );
  }
  return modalViewContext;
}

const Overlay = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 400;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Dismissable = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 401;
  background-color: transparent;
`;

const ViewContainer = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  align-self: center;
  height: ${HEIGHT * 0.6}px;
  background-color: ${(props) => props.theme.colors.paper};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 410;
`;

const HandleContainer = styled(Animated.View)`
  padding: 12px;
  width: 100%;
  align-items: center;
  height: 40px;
`;

const Handle = styled.View`
  width: 60px;
  height: 4px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.iconSubtleColor};
`;

const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
};
