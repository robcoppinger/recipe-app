import React from 'react';
import styled from 'styled-components/native';
import {Text} from '../common/Text';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {selectors} from '../../redux/modules/method/Method';

type StepItemProps = {
  stepId: string;
};

export const StepItem = ({stepId}: StepItemProps) => {
  const step = useSelector((st: RootState) => selectors.step(st, stepId));
  return (
    <StepItemContainer>
      <StepText>{step.text}</StepText>
    </StepItemContainer>
  );
};

const StepItemContainer = styled.View`
  padding: ${(props) => props.theme.itemPadding};
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.paper};
  border-color: ${(props) => props.theme.colors.itemSeparator};
  border-bottom-width: 1px;
`;

const StepText = styled(Text)`
  flex: 1;
  font-weight: 500;
`;
