import React from 'react';
import {Header} from './Header';
import styled from 'styled-components/native';

export const Layout = ({children}: {children: JSX.Element | JSX.Element[]}) => (
  <>
    <Header />
    <PageContainer>{children}</PageContainer>
  </>
);

const PageContainer = styled.View`
  padding: 8px;
  background-color: ${(props) => props.theme.colors.screenBackground};
  flex: 1;
`;
