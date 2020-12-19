import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView, Image, StatusBar } from 'react-native';
import { Entypo, Ionicons, MaterialIcons  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import styles from '../styles/dashboard';
import headerStyles from '../styles/header';
import cardStyles from '../styles/cards';
import styleCard from '../scripts/changeStyleCard';

export default function dashboard({ navigation }) {
    const [pokemons, setPokemons] = useState([])
    const [userId, setUserId] = useState('')
    const [search, setSearch] = useState('')
    const [filteredPokemons, setFilteredPokemons] = useState([])
    const [pokemonPromises, setPokemonPromises] = useState([])

    useEffect(() => {
        async function getId() {
            let tokenId = await AsyncStorage.getItem('token')
            setUserId(tokenId)
        }
        getId()
    }, [])

   /*  useEffect(() => {
        for (let i = 1; i <= 50; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`

            fetch(url)
                .then(response => response.json()
                .then(data => pokemons.push(data)))
        }
    }, []) */

    useEffect(() => {
        const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

        for (let i = 1; i <= 200; i++) {
            pokemonPromises.push(fetch(getPokemonUrl(i))
                .then(response => response.json()))
        }

        Promise.all(pokemonPromises).then(
            pokemons => setPokemons(pokemons)
        )
    }, [])

    useEffect(() => {        
        function filterPokemons() {
            let find = pokemons.filter(pokemon => pokemon.name.includes(`${search}`))
            setFilteredPokemons(find)
        }
        filterPokemons()
    }, [search])

    function showPokemons(item) {
        const { id, name, types } = item.item   
        const pokemonTypes = types.map(typeName => typeName.type.name).join(' | ')

        const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`
        
        return (
            <View style={[cardStyles.card, styleCard(types[0].type.name)]}>
                <Image style={cardStyles.pokemonImage} source={{uri: imageUrl}} />
                <View style={cardStyles.info}>
                    <Text style={{fontWeight: 'bold'}}>{id}. {name}</Text>
                    <Text>{pokemonTypes}</Text>
                </View>
                <View style={cardStyles.buttonFavorite}>
                    <TouchableOpacity onPress={() => addFavorite(item)}>
                        <MaterialIcons name="favorite-border" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        )   
    }
    
    async function addFavorite(item) {
        const { id, name, types } = item.item
        const url = `https://poke-api-pokedex.herokuapp.com/favorite/${userId}`

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({
                "pokemon_id": id,
                "name": name,
                "types": types,
                "isFavorite": true
            })
        })
    }

    return (
        <SafeAreaView style={styles.container}>
           {/* header */}
            <View style={headerStyles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('settings')}>
                    <Entypo name="menu" size={35} color="white" />
                </TouchableOpacity>
                <View style={headerStyles.searchBox}>
                    <Ionicons name="ios-search" size={20} color="white" />
                    <TextInput style={headerStyles.input}
                        onChangeText={ text => setSearch(text)}
                    />
                </View>
                
            </View>
            {/* body */}
            <View style={styles.body}>          
                <FlatList 
                    data={search == '' ? pokemons : filteredPokemons}
                    scrollEnabled={true}
                    keyExtractor={key => key.name}  
                    renderItem={showPokemons}
                />
            </View>
            <StatusBar backgroundColor="#08173B" />
        </SafeAreaView>
    )
}