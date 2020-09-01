import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

function Profile(props) {
  return (
    <View style={styles.container}>
      <Text>olá profile</Text>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Update')}
      >
        <Text>ir para atualziar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile;
