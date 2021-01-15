import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions, selectors} from '../../redux/modules/method/Method';
import {RootState} from '../../redux';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {SvgImage} from '../common/SvgImage';
import {useTheme} from '../../context/ThemeContext';
import {Images} from '../../../assets/images';

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
  border-radius: ${(props) => props.theme.borderRadius};
  margin-bottom: 8px;
  padding: 11px 16px 7px 16px;
  box-shadow: ${(props) => props.theme.shadow};
  align-items: center;
`;

const TextInput = styled.TextInput`
  font-family: ${(props) => props.theme.defaultFontFamily['regular']};
  font-size: ${(props) => props.theme.fontSize.regular};
  font-weight: 500;
  border-color: ${(props) => props.theme.colors.iconSubtleColor};
  color: ${(props) => props.theme.colors.text};
  border-bottom-width: 1px;
  margin-right: 8px;
  padding-bottom: 8px;
`;

const StepText = styled(TextInput)`
  flex: 1;
`;
