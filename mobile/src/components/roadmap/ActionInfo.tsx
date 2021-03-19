import {useRoute} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import {ActioninfoScreenRouteProp} from '../../navigators/RoadmapNavigator';
import {Layout} from '../common/Layout';
import {Text} from '../common/Text';

export const ActionInfo = () => {
  const route = useRoute<ActioninfoScreenRouteProp>();
  const params = route.params || {};
  const {action} = params;
  return (
    <Layout headerLabel="More Info" showGoBack>
      <Container>
        <TitleContainer>
          <Text variant="h3">{action.title}</Text>
        </TitleContainer>
        {action.moreInfo?.map((info, index) => (
          <TextContainer key={info} style={index === 0 && {borderTopWidth: 1}}>
            <Text key={info}>{info}</Text>
          </TextContainer>
        ))}
      </Container>
    </Layout>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  padding: ${(props) => props.theme.itemPadding};
`;

const TitleContainer = styled.View`
  padding-bottom: 12px;
`;

const TextContainer = styled.View`
  padding-vertical: 16px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.itemSeparatorSecondary};
`;
