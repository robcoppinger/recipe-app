import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {actions} from '../../redux/modules/method/Method';
import {v4 as uuidV4} from 'uuid';

type NewStepProps = {
  recipeId: string;
};

export const NewStep = ({recipeId}: NewStepProps) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState('');

  useEffect(() => {
    Keyboard.addListener('keyboardWillHide', addStep);
    return () => {
      Keyboard.removeListener('keyboardWillHide', addStep);
    };
  }, [step]);

  const addStep = () => {
    dispatch(actions.addStep(uuidV4(), recipeId, {text: step}));
    setStep('');
  };
  return (
    <ItemContainer>
      <StepText
        value={step}
        onChangeText={setStep}
        multiline
        blurOnSubmit
        placeholder="New step"
      />
    </ItemContainer>
  );
};

const ItemContainer = styled.View`
  flex-direction: row;
  background-color: transparent;
  margin-bottom: 8px;
  padding: 16px 8px;
`;
const TextInput = styled.TextInput`
  font-family: ${(props) => props.theme.defaultFontFamily['regular']};
  font-size: ${(props) => props.theme.fontSize.regular};
  font-weight: 500;
  border-color: ${(props) => props.theme.colors.iconSubtleColor};
  color: ${(props) => props.theme.colors.text};
  border-bottom-width: 1px;
  margin-right: 8px;
  padding-bottom: 12px;
`;

const StepText = styled(TextInput)`
  flex: 1;
  border-color: #bebebf;
  border-bottom-width: 1px;
  padding-left: 8px;
`;
