import React from 'react';
import {Header} from './Header';
import styled from 'styled-components/native';

type LayoutProps = {
  headerRightComponent?: () => JSX.Element;
  customHeaderComponent?: () => JSX.Element;
  hideHeaderBorder?: boolean;
  children?: JSX.Element | JSX.Element[];
};

export const Layout = ({
  children,
  headerRightComponent,
  customHeaderComponent,
  hideHeaderBorder,
}: LayoutProps) => (
  <>
    <Header
      {...{headerRightComponent, customHeaderComponent, hideHeaderBorder}}
    />
    <PageContainer>{children}</PageContainer>
  </>
);

const PageContainer = styled.View`
  background-color: ${(props) => props.theme.colors.screenBackground};
  flex: 1;
`;
