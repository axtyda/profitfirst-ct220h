import React from 'react';
import { View, Text,Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../providers/AuthProvider';

export default function SessionScreen() {
  const { user, logout } = useAuth();

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.title}>Profile</Text>
      
  //     <View style={styles.infoContainer}>
  //       <Text style={styles.label}>Email:</Text>
  //       <Text style={styles.value}>{user?.email}</Text>
  //     </View>

  //     <TouchableOpacity style={styles.logoutButton} onPress={logout}>
  //       <Text style={styles.logoutButtonText}>Logout</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user?.email}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#111',
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#6B6B6B',
  },
  value: {
    fontSize: 18,
    color: '#111',
  },
  logoutButton: {
    backgroundColor: '#F34F5E',
    paddingVertical: 15,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
