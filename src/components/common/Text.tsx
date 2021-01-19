import React, {FunctionComponent} from 'react';
import styled from 'styled-components/native';
import {TextProps} from 'react-native';

interface CustomTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'regular' | 'small' | 'xsmall';
}

export const Text: FunctionComponent<CustomTextProps> = ({
  variant = 'regular',
  ...rest
}) => {
  switch (variant) {
    case 'h1':
      return <H1 {...rest} />;
    case 'h2':
      return <H2 {...rest} />;
    case 'h3':
      return <H3 {...rest} />;
    case 'small':
      return <SmallText {...rest} />;
    case 'xsmall':
      return <ExtraSmallText {...rest} />;
    default:
      return <RegularText {...rest} />;
  }
};

export const BaseText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.defaultFontFamily['regular']};
  font-size: ${(props) => props.theme.fontSize.regular};
`;

export const H1 = styled(BaseText)`
  font-family: ${(props) => props.theme.defaultFontFamily.semiBold};
  font-size: ${(props) => props.theme.fontSize.h1};
`;

export const H2 = styled(BaseText)`
  font-family: ${(props) => props.theme.defaultFontFamily.semiBold};
  font-size: ${(props) => props.theme.fontSize.h2};
`;

export const H3 = styled(BaseText)`
  font-family: ${(props) => props.theme.defaultFontFamily.semiBold};
  font-size: ${(props) => props.theme.fontSize.h3};
`;

export const RegularText = styled(BaseText)`
  font-size: ${(props) => props.theme.fontSize.regular};
`;

export const SmallText = styled(BaseText)`
  font-size: ${(props) => props.theme.fontSize.small};
`;

export const ExtraSmallText = styled(BaseText)`
  font-size: ${(props) => props.theme.fontSize.xsmall};
`;
