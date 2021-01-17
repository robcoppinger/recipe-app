import React, {createRef, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  Keyboard,
  TextInput as RNTextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {actions} from '../../redux/modules/method/Method';
import {v4 as uuidV4} from 'uuid';
import {TextInput} from '../common/TextInput';
import {SvgImage} from '../common/SvgImage';
import {useTheme} from '../../context/ThemeContext';
import {Images} from '../../../assets/images';

type NewStepProps = {
  recipeId: string;
};

export const NewStep = ({recipeId}: NewStepProps) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState('');
  const inputRef = createRef<RNTextInput>();
  const theme = useTheme();

  useEffect(() => {
    Keyboard.addListener('keyboardWillHide', addStep);
    return () => {
      Keyboard.removeListener('keyboardWillHide', addStep);
    };
  }, [step]);

  const addStep = () => {
    if (step === '') return;
    dispatch(actions.addStep(uuidV4(), recipeId, {text: step}));
    setStep('');
    inputRef.current?.focus();
  };
  return (
    <ItemContainer>
      <StepText
        ref={inputRef}
        value={step}
        onChangeText={setStep}
        multiline
        blurOnSubmit
        placeholder="New step"
        returnKeyType="done"
      />
      <TouchableOpacity
        style={{marginRight: 8}}
        onPress={addStep}
        disabled={step === ''}>
        <SvgImage
          style={{
            width: 25,
            height: 25,
            fill:
              step === '' ? theme.colors.iconSubtleColor : theme.colors.primary,
          }}
          source={Images.addFilled}
        />
      </TouchableOpacity>
    </ItemContainer>
  );
};

const ItemContainer = styled.View`
  flex-direction: row;
  background-color: transparent;
  margin-bottom: 8px;
  padding: ${(props) => props.theme.itemPadding};
  padding-right: 12px;
`;
const Input = styled(TextInput)`
  font-weight: 500;
  border-bottom-width: 1px;
  margin-right: 8px;
  padding-bottom: 12px;
`;

const StepText = styled(Input)`
  flex: 1;
  border-bottom-width: 1px;
  padding-left: 8px;
`;
