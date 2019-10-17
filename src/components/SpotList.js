import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';

import api from '../services/api';

function SpotList({ tech, navigation }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    // "scrollInfinito" 
    async function loadSpots() {
      const response = await api.get('/spots', {
        params: { tech }
      })

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  function handleNavigate(id) {
    navigation.navigate('Book', { id }); //navega ate book e passa o id do spot desejado
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>

      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={spot => spot._id} //key = id do spot 
        horizontal //faz a list ficar na horizontal
        showsHorizontalScrollIndicator={false} //retira barra de rolagem
        
        //item igual ao spot, contem todas suas informações
        //não esta exibindo a imagem, apesar da thumbanil_url estar certa
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} /> 
            {console.log(item.thumbnail_url)}
            
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>
                        
            <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
              <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
          
          </View>

        )}

      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: "#444"
  },

  title: {
    fontSize: 20,
    color: '#fff',
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  bold: {
    fontWeight: 'bold'
  },

  list: {
    paddingHorizontal: 20,
  },

  listItem: {
    marginRight: 15,
  },

  thumbnail: {
    backgroundColor:"#696969", //background para alguma resposta alem de apenas o vazio
    width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2,
  },

  company: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },

  price: {
    fontSize: 15,
    color: '#eee',
    marginTop: 5
  },

  button: {
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default withNavigation(SpotList);