import React, {forwardRef} from 'react';
import {TextInputProps, TextInput as RNTextInput} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {useTheme} from '../../context/ThemeContext';
import {selectors} from '../../redux/modules/application/Application';

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (props, ref) => {
    const selectedTheme = useSelector(selectors.theme);
    const theme = useTheme();
    return (
      <StyledTextInput
        ref={ref}
        placeholderTextColor={theme.colors.textSecondary}
        keyboardAppearance={selectedTheme}
        {...props}
      />
    );
  },
);

const StyledTextInput = styled.TextInput`
  font-family: ${(props) => props.theme.defaultFontFamily['regular']};
  font-size: ${(props) => props.theme.fontSize.regular};
  border-color: ${(props) => props.theme.colors.textInputBorder};
  color: ${(props) => props.theme.colors.text};
`;
