import React, { useState, useEffect } from 'react';

import { Text, SafeAreaView, ScrollView, StyleSheet, Image, AsyncStorage, TouchableOpacity} from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List({navigation}) {
    const [techs, setTechs] = useState([]);

    function handleLogout() {
        //botão temporario inserido para teste, será otimizado
        navigation.navigate('Login');
      }

       useEffect(() => {
           //roda backend quebrando dados inseridos e transformando em array
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
            <TouchableOpacity onPress={handleLogout} >
                <Text style={styles.textButton}> Logout </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#444"
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 25
    },
});