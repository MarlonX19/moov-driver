import { StyleSheet } from 'react-native';


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },

    cardView: {
        position: 'absolute',
        bottom: 10,
        width: '90%',
        height: 200,
        alignItems: "center",
        justifyContent: 'space-around',
        alignSelf: 'center',
        borderRadius: 4,
        backgroundColor: '#fff',
        elevation: 2
    },
    cardValue: {
        width: 200,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
      },

      value: {
        fontSize: 35,
        fontWeight: 'bold'
      },

      welcomeText: {
        fontSize: 25,
        color: '#333'
      },

      btn: {
        width: 100,
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 4
      },
    
      btnText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center'
      }
})