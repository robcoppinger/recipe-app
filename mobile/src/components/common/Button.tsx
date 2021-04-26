import React, { FunctionComponent } from 'react';
import {
  TouchableOpacityProps,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { Text } from './Text';

interface CutsomButtonProps extends TouchableOpacityProps {
  text: string;
  variant?: 'filled' | 'outline';
  isLoading?: boolean;
}

export const Button: FunctionComponent<CutsomButtonProps> = ({
  variant = 'filled',
  text,
  isLoading,
  ...rest
}) => {
  const theme = useTheme();
  const { disabled } = rest;

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
        return disabled
          ? theme.colors.disabledForeground
          : theme.colors.primaryFilledContent;
      case 'outline':
        return disabled
          ? theme.colors.disabledForeground
          : theme.colors.primary;
    }
  };

  return (
    <RootButton {...rest}>
      {isLoading ? (
        <ActivityIndicator size="small" color={textColor()} />
      ) : (
        <Text style={{ fontWeight: '600', color: textColor() }}>{text}</Text>
      )}
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
  background-color: ${(props) =>
    props.disabled
      ? props.theme.colors.disabledBackground
      : props.theme.colors.primary};
`;

const OutlinedButton = styled(BaseButton)`
  border-width: 2px;
  border-color: ${(props) =>
    props.disabled
      ? props.theme.colors.disabledForeground
      : props.theme.colors.primary};
  background-color: transparent;
`;
