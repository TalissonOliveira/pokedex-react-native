import React, {useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../styles/favorite';
import headerStyles from '../styles/header';
import cardStyles from '../styles/cards';
import styleCard from '../scripts/changeStyleCard';

export default function Favorite({ navigation }) {
    const [pokemons, setPokemons] = useState([])
    const [userId, setUserId] = useState()

    useEffect(() => {
        async function getId() {
            let tokenId = await AsyncStorage.getItem('token')
            setUserId(tokenId)
        }
        getId()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            if(!userId) return
            
            const url = `https://poke-api-pokedex.herokuapp.com/favorites/${userId}`

            fetch(url)
                .then(response => response.json()
                .then(data => {
                    setPokemons([...pokemons, data])
                }))
        }, [userId])
    )

    function showPokemons(item) {
        const { pokemon_id, name, types } = item.item   
        const pokemonTypes = types.map(typeName => typeName.type.name).join(' | ')

        const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemon_id}.png`
        
        return (
            <View style={[cardStyles.card, styleCard(types[0].type.name)]}>
                <Image style={cardStyles.pokemonImage} source={{uri: imageUrl}} />
                <View style={cardStyles.info}>
                    <Text style={{fontWeight: 'bold'}}>{pokemon_id}. {name}</Text>
                    <Text>{pokemonTypes}</Text>
                </View>
                <View style={cardStyles.buttonFavorite}>
                    <TouchableOpacity onPress={() => deleteFavorite(item)}>
                        <MaterialIcons name="favorite" size={24} color="#ff3333" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function deleteFavorite(pokemonRemove) {
        let newPokemons = pokemons[0].filter(pokemon => pokemon.pokemon_id !== pokemonRemove.item.pokemon_id) 
        setPokemons([newPokemons])

        const { pokemon_id } = pokemonRemove.item
        const url = `https://poke-api-pokedex.herokuapp.com/favorite/${userId}/${pokemon_id}`

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json'
            }
        })  
    }

    return (
        <View style={styles.container}>
            {/* header */}
            <View style={headerStyles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('settings')}>
                    <Entypo name="menu" size={35} color="white" />
                </TouchableOpacity>
                <Text style={{color: '#fff', fontSize: 20, paddingLeft: 10}}>Your Favorites</Text>
            </View>
            {/* body */}
            <View style={styles.body}>
                <FlatList 
                    data={pokemons[0]}
                    scrollEnabled={true}
                    keyExtractor={key => key.name}  
                    renderItem={showPokemons}
                />
            </View>
        </View>
    )
}