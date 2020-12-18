import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../styles/settings.js';

export default function settings({ navigation }) {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [user_id, setUser_id] = useState()

    useFocusEffect(
        React.useCallback(() => {
            async function getId() {
                let tokenId = await AsyncStorage.getItem('token')
    
                setUser_id(tokenId)
            }
            getId()
        }, [])
    )

    useFocusEffect(
        React.useCallback(() => {
            if(!user_id) return

            const url = `https://poke-api-pokedex.herokuapp.com/auth/user/${user_id}`
            
            async function getDataAccount() {
                await fetch(url, {
                    method: 'GET',
                    headers: {
                      'Accept' : 'application/json'  
                    }
                })
                .then(response => response.json()
                .then(data => {
                    setUsername(data.username)
                    setEmail(data.email)
                }))
            }
            getDataAccount()
        }, [user_id])
    )

    function deleteAccount() {
        const url = `https://poke-api-pokedex.herokuapp.com/auth/users/${user_id}`

        fetch(url, {
            method: 'DELETE'
        })

        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <View style={styles.infoAccount}>
                <Text style={{fontSize: 30, fontWeight: 'bold', color: '#08173B'}}>{username}</Text>
                <Text style={{fontSize: 17, paddingLeft: 5, fontStyle: 'italic'}}>{email}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => deleteAccount()}>
                <AntDesign name="deleteuser" size={20} color="black" />
                <Text style={{fontSize: 19, fontWeight: 'bold', paddingLeft: 7}}>
                    Delete Account
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <AntDesign name="logout" size={20} color="#ff1f0f" />
                <Text style={{color: '#ff1f0f', fontSize: 19, fontWeight: 'bold', paddingLeft: 7}}>
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    )
}
