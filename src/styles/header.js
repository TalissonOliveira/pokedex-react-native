import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header: {
        backgroundColor: '#08173B',
        height: 60,
        flexDirection: 'row',
        //justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    input: {
        width: '100%',
        height: 25,
        color: '#fff',
        marginLeft: 7,
    },
    searchBox: {
        width: '86%',
        flexDirection: 'row',
        marginLeft: 10,
        paddingLeft: 5,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    }
})