import styled from 'styled-components/native';

export const TextInput = styled.TextInput`
  font-family: ${(props) => props.theme.defaultFontFamily['regular']};
  font-size: ${(props) => props.theme.fontSize.regular};
  border-color: ${(props) => props.theme.colors.textInputBorder};
  color: ${(props) => props.theme.colors.text};
`;
