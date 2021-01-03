import React from 'react';
import {Header} from './Header';
import styled from 'styled-components/native';

type LayoutProps = {
  headerRightComponent?: () => JSX.Element;
  children: JSX.Element | JSX.Element[];
};

export const Layout = ({children, headerRightComponent}: LayoutProps) => (
  <>
    <Header headerRightComponent={headerRightComponent} />
    <PageContainer>{children}</PageContainer>
  </>
);

const PageContainer = styled.View`
  padding: 8px;
  background-color: ${(props) => props.theme.colors.screenBackground};
  flex: 1;
`;
