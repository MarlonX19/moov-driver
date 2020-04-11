import { StyleSheet } from 'react-native';


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    input: {
        width: 250,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 4,
        marginVertical: 4,
        paddingLeft: 10
    },
    
    title: {
        fontSize: 35,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'sans-serif-thin'
    },

    btn: {
        width: 250,
        padding: 15,
        borderRadius: 4,
        backgroundColor: '#000000'
    },
    
    btnText: {
        fontSize: 14,
        color: '#fff',
        alignSelf: 'center'
    },

    forgotPass: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: 10
    },
    bottomBtn: {
        marginTop: 100
    },

    bottomText2: {
        color: 'grey'
    },

    bottomText2: {
        color: 'black',
        fontWeight: 'bold'
    }
})