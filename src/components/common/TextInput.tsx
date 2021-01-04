import styled from 'styled-components/native';

export const TextInput = styled.TextInput`
  padding: 8px;
  background-color: #ffffff;
  border-radius: ${(props) => props.theme.borderRadius};
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.defaultFontFamily['regular']};
  font-size: ${(props) => props.theme.fontSize.regular};
`;
