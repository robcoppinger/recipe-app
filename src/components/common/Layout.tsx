import React from 'react';
import {Header} from './Header';
import styled from 'styled-components/native';

type LayoutProps = {
  headerRightComponent?: () => JSX.Element;
  customHeaderComponent?: () => JSX.Element;
  children?: JSX.Element | JSX.Element[];
};

export const Layout = ({
  children,
  headerRightComponent,
  customHeaderComponent,
}: LayoutProps) => (
  <>
    <Header
      headerRightComponent={headerRightComponent}
      customHeaderComponent={customHeaderComponent}
    />
    <PageContainer>{children}</PageContainer>
  </>
);

const PageContainer = styled.View`
  padding: 8px;
  background-color: ${(props) => props.theme.colors.screenBackground};
  flex: 1;
`;
