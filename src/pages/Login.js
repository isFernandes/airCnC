import React, { useState, useEffect } from 'react';

import { View, AsyncStorage, KeyboardAvoidingView, Text, TextInput, Platform, Image, StyleSheet, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png'
import api from '../services/api';

export default function Login({navigation}) {
    //estados para "salvar" dados adc pelo usuario
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(()=> {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('List'); 
            }
        })
    }, []);

    async function handleSubmit(){
        const response = await api.post('/sessions', {email});
        const {_id} = response.data;
        console.log(email, techs, _id)

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);
        //navegar para proxima tela
        navigation.navigate('List');
    }
 
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image source={logo} />
            <View style={styles.form}>
                <Text style={styles.label}>E-mail* :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insira seu E-MAIL"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize='none'
                    autoCorrect={false}
                    value = {email}
                    onChangeText= {text => setEmail(text)} //ou apenas o identificador da função
                />
                <Text style={styles.label}>Tecnologias* :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />


                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.textButton}> Encontrar Spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#444"
    },
    label: {
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
        borderRadius: 4,
    },
    button: {
        height: 42,
        backgroundColor: "#f05a5b",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    textButton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});