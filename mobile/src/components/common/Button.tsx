import React, { FunctionComponent } from 'react';
import { TouchableOpacityProps, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { Text } from './Text';

interface CutsomButtonProps extends TouchableOpacityProps {
  text: string;
  variant?: 'filled' | 'outline';
}

export const Button: FunctionComponent<CutsomButtonProps> = ({
  variant = 'filled',
  text,
  ...rest
}) => {
  const theme = useTheme();

  const RootButton = ({ ...props }) => {
    switch (variant) {
      case 'filled':
        return <FilledButton {...props} />;
      case 'outline':
        return <OutlinedButton {...props} />;
      default:
        return <BaseButton {...props} />;
    }
  };

  const textColor = () => {
    switch (variant) {
      case 'filled':
        return theme.colors.primaryFilledContent;
      case 'outline':
        return theme.colors.primary;
    }
  };
  return (
    <RootButton {...rest}>
      <Text style={{ fontWeight: '600', color: textColor() }}>{text}</Text>
    </RootButton>
  );
};

const BaseButton = styled(TouchableOpacity)`
  padding: 12px;
  border-radius: ${(props) => props.theme.borderRadius};
  justify-content: center;
  align-items: center;
`;

const FilledButton = styled(BaseButton)`
  background-color: ${(props) => props.theme.colors.primary};
`;

const OutlinedButton = styled(BaseButton)`
  border-width: 2px;
  border-color: ${(p) => p.theme.colors.primary};
  background-color: transparent;
`;
