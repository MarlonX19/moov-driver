import { StyleSheet } from 'react-native';



const styles = StyleSheet.create({
  topView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  },

  topText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },

  inputView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  input: {
    width: 250,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginVertical: 4,
    paddingLeft: 10
  },

  btn: {
    width: 250,
    padding: 15,
    borderRadius: 4,
    backgroundColor: '#000000'
  },

  btnText: {
    color: '#fff',
    textAlign: 'center',
  },

  bottomView: {
    flex: 1,
  }

})

export default styles;
