import React, { createRef, useState } from 'react';
import { KeyboardAvoidingView, TextInput as RNTextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';
import { Text } from '../components/common/Text';
import { TextInput as Ti } from '../components/common/TextInput';
import { PageContainer } from '../components/common/Layout';
import { Button } from '../components/common/Button';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordInputRef = createRef<RNTextInput>();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <PageContainer>
        <LoginContainer>
          <Text style={{ marginBottom: 8 }} variant="h1">
            Login
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCompleteType="email"
            autoFocus
            autoCapitalize={'none'}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
            placeholder="email"
          />
          <TextInput
            secureTextEntry
            ref={passwordInputRef}
            value={password}
            onChangeText={setPassword}
            placeholder="password"
            returnKeyType="done"
          />

          <Button
            style={{ marginTop: 12, width: '80%' }}
            text="Login"
            variant="filled"
          />
          <Button
            style={{ marginTop: 12, width: '80%' }}
            text="Sign up"
            variant="outline"
          />
          <Button
            style={{ marginTop: 12, width: '80%' }}
            text="Continue as Guest"
            variant="outline"
          />
        </LoginContainer>
      </PageContainer>
    </KeyboardAvoidingView>
  );
};

const TextInput = styled(Ti)`
  margin-top: 8px;
  background-color: #ffffff;
  padding: 12px;
  border-radius: ${(props) => props.theme.borderRadius};
  width: 80%;
`;

const LoginContainer = styled(SafeAreaView)`
  margin-top: 30%;
  flex: 1;
  align-items: center;
`;
