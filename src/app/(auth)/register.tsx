import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Button,
  TextInput,
} from 'react-native';
import { supabase } from '../../lib/supabase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      const { data: { session }, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        console.error('Error during sign up:', error);
        Alert.alert(error.message);
      } else {
        console.log('Sign up successful:', session);
        if (!session) {
          Alert.alert('Please check your inbox for email verification!');
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      Alert.alert('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email@address.com"
          autoCapitalize={'none'}
          style={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          style={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry={true}
          placeholder="Confirm password"
          autoCapitalize={'none'}
          style={styles.input}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
  },
});
