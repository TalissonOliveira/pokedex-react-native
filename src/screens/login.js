import React, { useState, useEffect}  from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../styles/register.js';
import formStyles from '../styles/form.js';
import background from '../../assets/background.jpg';

export default function login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(true)
    const [id, setId] = useState('')
    
    const url = `https://poke-api-pokedex.herokuapp.com/auth/user/${email}/${password}`

    useFocusEffect(
        React.useCallback(() => {
            setError(true)
        }, [])
    )

    useEffect(() => {
        if(error == false) navigation.navigate('Dashboard')
    }, [error])

    useEffect(() => {
        async function saveId() {
            await AsyncStorage.setItem('token', id)
        }
        saveId()
    }, [id])
    
    async function login() {
        await fetch(url, {
            method: 'GET',
            headers: {
              'Accept' : 'application/json'  
            }
        })
        .then(response => response.json()
        .then(data => {
            setMessage(data.message)
            setError(data.error)
            setId(data.id)
        }))
    }

    function validation() {
        if(email == '' || password == '') {
            setMessage('Fill in all fields!')
            return
        }
        login()
    }

    return (
        <ImageBackground source={background} blurRadius={2} style={styles.container}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{fontSize: 45, color: 'white'}}>Pokedex</Text>
                    <Text style={{fontSize: 18, color: 'white', textAlign: "center", marginTop: 10}}>
                        Welcome back! Log in to access your Pokémons.
                    </Text>
                </View>

                <View style={formStyles.form}>
                    <Text style={{fontSize: 13, color: '#fff', fontWeight: '100'}}>Email</Text>
                    <TextInput style={[formStyles.input, /* {outline: 'none'} */]}
                        autoCapitalize="none"
                        onChangeText={ text => { setEmail(text), setMessage('') }}
                    />

                    <Text style={{fontSize: 13, color: '#fff', fontWeight: '100'}}>Password</Text>
                    <TextInput style={[formStyles.input, /* {outline: 'none'} */]}
                        onChangeText={ text => { setPassword(text), setMessage('') }}
                        secureTextEntry={true}
                    />
                    
                    <Text style={{fontSize: 12, color: '#fff', fontWeight: '100', textAlign: 'center'}}>{message}</Text>
                    
                    <TouchableOpacity style={formStyles.button} onPress={validation}>
                        <Text style={{fontSize: 15, color: '#fff', textAlign: 'center'}}>Sign in</Text>
                    </TouchableOpacity>

                    <Text style={{fontSize: 12, color: '#fff', fontWeight: '100', textAlign: 'center'}}>or</Text>
                    <Text 
                        style={{
                            fontSize: 12,
                            color: '#fff',
                            fontWeight: '100',
                            textAlign: 'center',
                            marginTop: 5,
                            textDecorationLine: 'underline'
                        }}
                        onPress={() => navigation.navigate('Register')}>
                            Create a new account
                    </Text>
                </View>
            </View>
        </ImageBackground>

    )
}
