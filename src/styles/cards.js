import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    card: {
        backgroundColor: 'tomato',
        height: 60,
        flex: 1,
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    pokemonImage: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        marginLeft: 10,
    },
    info: {
        justifyContent: 'center',
        paddingLeft: 20,
    },
    buttonFavorite: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10
    },
    steel: {
        backgroundColor: '#f4f4f4'
    },

    fire: {
        backgroundColor: '#ff6666'
    },

    grass: {
        backgroundColor: '#DEFDE0'
    },

    electric: {
        backgroundColor: '#FCF7DE'
    },

    water: {
        backgroundColor: '#DEF3FD'
    },
    ice: {
        backgroundColor: '#DEF3FD'
    },

    ground: {
        backgroundColor: '#f4e7da'
    },

    rock: {
        backgroundColor: '#d5d5d4'
    },

    fairy: {
        backgroundColor: '#fceaff'
    },

    poison: {
        backgroundColor: '#98d7a5'
    },

    bug: {
        backgroundColor: '#f8d5a3'
    },

    dragon: {
        backgroundColor: '#97b3e6'
    },

    psychic: {
        backgroundColor: '#eaeda1'
    },

    flying: {
        backgroundColor: '#F5F5F5'
    },

    fighting: {
        backgroundColor: '#E6E0D4'
    },

    normal: {
        backgroundColor: '#F5F5F5'
    },

})