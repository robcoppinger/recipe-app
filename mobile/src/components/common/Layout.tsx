import React from 'react';
import { Header } from './Header';
import styled from 'styled-components/native';

type LayoutProps = {
  showDrawer?: boolean;
  showGoBack?: boolean;
  headerLabel?: string;
  headerRightComponent?: () => JSX.Element;
  customHeaderComponent?: () => JSX.Element;
  hideHeaderBorder?: boolean;
  children?: JSX.Element | JSX.Element[];
};

export const Layout = ({
  children,
  headerRightComponent,
  showDrawer,
  showGoBack,
  headerLabel,
  customHeaderComponent,
  hideHeaderBorder,
}: LayoutProps) => (
  <>
    <Header
      {...{
        showGoBack,
        headerLabel,
        headerRightComponent,
        showDrawer,
        customHeaderComponent,
        hideHeaderBorder,
      }}
    />
    <PageContainer>{children}</PageContainer>
  </>
);

export const PageContainer = styled.View`
  background-color: ${(props) => props.theme.colors.screenBackground};
  flex: 1;
`;
