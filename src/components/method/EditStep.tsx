import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions, selectors} from '../../redux/modules/method/Method';
import {RootState} from '../../redux';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {SvgImage} from '../common/SvgImage';
import {useTheme} from '../../context/ThemeContext';
import {Images} from '../../../assets/images';
import {TextInput} from '../common/TextInput';

type EditStepProps = {
  stepId: string;
  recipeId: string;
};

export const EditStep = ({stepId, recipeId}: EditStepProps) => {
  const dispatch = useDispatch();
  const stepEntry = useSelector((st: RootState) => selectors.step(st, stepId));
  const [step, setStep] = useState(stepEntry.text);
  const theme = useTheme();

  const onBlur = () => {
    if (step === '') {
      dispatch(actions.deleteStep(stepId, recipeId));
      return;
    }
    dispatch(actions.editStep(stepId, {text: step}));
  };

  return (
    <StepContainer>
      <StepText
        value={step}
        onChangeText={setStep}
        multiline
        blurOnSubmit
        onBlur={onBlur}
      />
      <TouchableOpacity
        onPress={() => dispatch(actions.deleteStep(stepId, recipeId))}>
        <SvgImage
          style={{width: 25, height: 25, fill: theme.colors.iconSubtleColor}}
          source={Images.closeFilled}
        />
      </TouchableOpacity>
    </StepContainer>
  );
};

const StepContainer = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.paper};
  padding: 15px 20px 11px 20px;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.itemSeparator};
`;

const Input = styled(TextInput)`
  font-weight: 500;
  border-bottom-width: 1px;
  margin-right: 8px;
  padding-bottom: 8px;
`;

const StepText = styled(Input)`
  flex: 1;
`;
