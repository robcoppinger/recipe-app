import React, {useRef, useState} from 'react';
import {Animated, Dimensions, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {Text} from './Text';

const WIDTH = Dimensions.get('window').width;

export const TabView = ({children}: {children: JSX.Element[]}) => {
  const TAB_WIDTH = WIDTH / children.length;
  const scrollViewRef = useRef<ScrollView>();
  const [scrollXOffset] = useState(new Animated.Value(0));

  const scrollToInterval = (interval: number) => {
    if (!scrollViewRef) return;
    scrollViewRef.current?.scrollTo({x: interval * WIDTH, animated: true});
  };

  const activeIndicatorOffset = scrollXOffset.interpolate({
    inputRange: [0, WIDTH],
    outputRange: [0, WIDTH / children.length],
  });

  return (
    <>
      <TabBarContainer>
        {children.map((child, index) => {
          if (!child.props.title)
            console.warn(
              'Each child rendered in TabView requires a title prop',
            );
          return (
            <TabBarOption
              key={child.props.title}
              onPress={() => scrollToInterval(index)}>
              <Text variant="h3">{child.props.title}</Text>
            </TabBarOption>
          );
        })}
        <ActiveIndicatorContainer
          style={{
            width: TAB_WIDTH,
            transform: [{translateX: activeIndicatorOffset}],
          }}>
          <ActiveIndicator />
        </ActiveIndicatorContainer>
      </TabBarContainer>
      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{width: WIDTH * children.length}}
        horizontal
        snapToInterval={WIDTH}
        decelerationRate="fast"
        bounces={false}
        disableScrollViewPanResponder
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollXOffset,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        {children.map((child) => (
          <ScrollViewPageContainer key={`view-${child.props.title}`}>
            {child}
          </ScrollViewPageContainer>
        ))}
      </Animated.ScrollView>
    </>
  );
};

const TabBarContainer = styled.View`
  position: relative;
  background-color: #e5e5e5;
  flex-direction: row;
`;

const TabBarOption = styled.TouchableOpacity`
  padding: 16px 0px 16px 0px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ActiveIndicatorContainer = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  padding-horizontal: 8px;
`;

const ActiveIndicator = styled.View`
  background-color: ${(props) => props.theme.colors.primary}
  height: 100%;
  width 100%
`;

const ScrollViewPageContainer = styled.View`
  width: ${WIDTH}px;
`;
