import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

function LinearBackground(props) {

  return <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    colors={['#A8F9BA', '#FA9EAF']}
    style={styles.container}
  >
    {props.children}
  </LinearGradient>
}


export default LinearBackground;
