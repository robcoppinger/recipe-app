import React from 'react';
import styled from 'styled-components/native';
import {Text} from '../common/Text';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {selectors} from '../../redux/modules/method/Method';

type StepItemProps = {
  stepId: string;
  mode: 'default' | 'edit';
};

export const StepItem = ({stepId, mode}: StepItemProps) => {
  const step = useSelector((st: RootState) => selectors.step(st, stepId));
  return (
    <StepItemContainer>
      <StepText>{step.text}</StepText>
    </StepItemContainer>
  );
};

const StepItemContainer = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.paper};
  border-radius: ${(props) => props.theme.borderRadius};
  margin-bottom: 8px;
  padding: 16px;
  box-shadow: ${(props) => props.theme.shadow};
`;

const StepText = styled(Text)`
  flex: 1;
  font-weight: 500;
`;
