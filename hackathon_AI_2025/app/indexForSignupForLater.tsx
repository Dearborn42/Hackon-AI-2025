import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { UserContext } from '@/components/user-context';
<<<<<<< Updated upstream:hackathon_AI_2025/app/indexForSignupForLater.tsx
import { useRouter } from 'expo-router';
=======
import { ThemedView } from '@/components/themed-view';
>>>>>>> Stashed changes:hackathon_AI_2025/app/index.tsx

export default function SignUpScreen() {
  const router = useRouter();
  const { signUpUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const success = await signUpUser(email, password);
    if (success) {
      Alert.alert('Success', 'Account created!');
      router.replace('/home');
    } else {
      Alert.alert('Error', 'User already exists.');
    }
  };

  return (
    <ThemedView>
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
    </ThemedView>
  );
}
