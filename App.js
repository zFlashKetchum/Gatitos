import React, { useEffect, useState } from 'react';
import { Text, View, Image, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [fact, setFact] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCatData = () => {
    setLoading(true);

    fetch('https://catfact.ninja/fact')
      .then((response) => response.json())
      .then((data) => {
        setFact(data.fact);
      })
      .catch((error) => {
        console.error('Erro ao buscar:', error);
      });

    fetch('https://api.thecatapi.com/v1/images/search')
      .then((response) => response.json())
      .then((data) => {
        setImage(data[0].url);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar a imagem:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCatData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Facts about cats</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ff6347" />
      ) : (
        <>
          {image && <Image source={{ uri: image }} style={styles.catImage} />}
          <Text style={styles.fact}>{fact}</Text>
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={fetchCatData}>
        <Text style={styles.buttonText}>Search New Fact and Image</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796b',
    textAlign: 'center',
  },
  fact: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    color: '#004d40',
  },
  catImage: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
