import React, { useState } from 'react';
import { SafeAreaView, Alert, StyleSheet, TextInput, TouchableOpacity, AsyncStorage, Text } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {

  const [date, setDate] = useState('');
  const id = navigation.getParam('id');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');
    //pegar data e passar o header como id no parametro
    await api.post(`/spots/${id}/bookings`, {
      date
    }, {
      headers: { user_id }
    })

    Alert.alert('Solicitação de reserva enviada.');

    navigation.navigate('List');
  }

  function handleCancel() {
    navigation.navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        placeholder="Qual data você quer reservar?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems:"center",
    backgroundColor: '#444',
    width:"100%",
    height:"100%",
  },

  label: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    marginTop: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#fff',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
    width: "95%"
  },

  button: {
    width:"95%",
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },

  cancelButton: {
    backgroundColor: '#a9a9a9',
    marginTop: 10
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});