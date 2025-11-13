import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { UserContext } from '@/components/user-context';

export default function SignUpScreen() {
  const { signUpUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const success = await signUpUser(email, password);
    if (success) {
      Alert.alert('Success', 'Account created!');
      // Navigate to home or login screen
    } else {
      Alert.alert('Error', 'User already exists.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}
