import {useNavigation} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import {roadmap} from '../components/roadmap/RoadmapData';
import {Layout} from '../components/common/Layout';
import {SvgImage} from '../components/common/SvgImage';
import {Text} from '../components/common/Text';
import {useTheme} from '../context/ThemeContext';

export const Roadmap = () => {
  const theme = useTheme();
  const {navigate} = useNavigation();
  return (
    <Layout showDrawer>
      <Container contentContainerStyle={{paddingBottom: 40}}>
        <TitleContainer>
          <Text>
            Below is the roadmap of how I see this product developing, the
            different phases and functionality that would be worth adding.
          </Text>
        </TitleContainer>
        {roadmap.map((item) => (
          <Section key={item.title}>
            <HeaderSection>
              <Text variant="h3">{item.title}</Text>
              {item.descriptor && <Descriptor>{item.descriptor}</Descriptor>}
            </HeaderSection>
            {item.actions.map((action, index) => (
              <ActionContainer
                style={index === 0 && {borderTopWidth: 1}}
                key={action.title}
                onPress={
                  action.moreInfo
                    ? () => navigate('ActionInfo', {action})
                    : () => {}
                }
                activeOpacity={action.moreInfo ? 0.5 : 1}>
                <ActionText>{action.title}</ActionText>
                {action.moreInfo && (
                  <ChevronContainer>
                    <SvgImage
                      icon="chevronRight"
                      size={25}
                      fill={theme.colors.iconSubtleColor}
                    />
                  </ChevronContainer>
                )}
              </ActionContainer>
            ))}
          </Section>
        ))}
      </Container>
    </Layout>
  );
};
const Container = styled.ScrollView`
  flex: 1;
`;

const TitleContainer = styled.View`
  padding: ${(props) => props.theme.itemPadding};
  padding-bottom: 0;
`;
const Title = styled(Text).attrs({variant: 'h1'})`
  margin-bottom: 12px;
`;

const Section = styled.View`
  padding-top: 20px;
`;

const HeaderSection = styled.View`
  padding-horizontal: ${(props) => props.theme.itemPadding}
  padding-bottom: 8px;
`;

const Descriptor = styled(Text)`
  padding-top: 4px;
  color: ${(props) => props.theme.colors.textSecondary};
`;

const ActionContainer = styled.TouchableOpacity`
  width: 100%
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colors.paper}
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.itemSeparator}
`;
const ChevronContainer = styled.View`
  padding-right: 12px;
`;
const ActionText = styled(Text)`
  padding-horizontal: ${(props) => props.theme.itemPadding}
  padding-vertical: 16px;
  flex: 1;
  font-weight: 500;
`;
