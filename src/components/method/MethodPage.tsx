import React from 'react';
import {Text} from '../common/Text';
import styled from 'styled-components/native';

type MethodPageProps = {
  title?: string; // For TabView Title only
  recipeId: string;
  mode: 'default' | 'edit';
};

export const MethodPage = ({recipeId, mode}: MethodPageProps) => {
  return (
    <PageContainer>
      <Text>Method Page</Text>
    </PageContainer>
  );
};

const PageContainer = styled.View`
  padding: ${(props) => props.theme.pagePadding};
`;
