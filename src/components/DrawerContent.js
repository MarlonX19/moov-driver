import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome5';


export default function DrawerContent(props) {
    return (
        <View style={styles.drawerContent}>
            <View style={styles.mainView}>
                <View style={styles.userData}>
                    <Image source={require('../assets/profile.jpg')} style={styles.userPhoto} />
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={5}
                        starSize={25}
                        fullStarColor={'lightgreen'}
                        selectedStar={(rating) => { }}
                    />
                </View>
                <Text style={styles.userName}>Marvin Bennet</Text>
                <Text style={styles.userEmail}>marvin@gmail.com</Text>
            </View>
            <View style={{ flex: 3, padding: 10 }}>
                <View style={styles.menuOption}>
                    <View style={{ width: 25, marginLeft: 2 }}>
                        <Icon name="user" size={16} color="lightgreen" />
                    </View>
                    <Text style={styles.menuOptionText}>Perfil</Text>
                </View>
                <View style={styles.menuOption}>
                    <View style={{ width: 25 }}>
                        <Icon name="money-bill-alt" size={16} color="lightgreen" />
                    </View>
                    <Text style={styles.menuOptionText}>Recebimentos</Text>
                </View>
                <View style={styles.menuOption}>
                    <View style={{ width: 25 }}>
                        <Icon name="history" size={16} color="lightgreen" />
                    </View>
                    <Text style={styles.menuOptionText}>Histórico</Text>
                </View>
                <View style={styles.menuOption}>
                    <View style={{ width: 25 }}>
                        <Icon name="question-circle" size={18} color="lightgreen" />
                    </View>
                    <Text style={styles.menuOptionText}>Ajuda</Text>
                </View>
                <View style={styles.menuOption}>
                    <View style={{ width: 25, marginLeft: 2 }}>
                        <Icon name="cog" size={16} color="lightgreen" />
                    </View>
                    <Text style={styles.menuOptionText}>Configurações</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        flexDirection: 'column'
    },

    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd'
    },

    userPhoto: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#525151',
        marginRight: 5
    },

    userName: {
        color: '#525151',
        fontWeight: '700',
        fontSize: 20,
        fontFamily: 'sans-serif-thin'
    },

    userEmail: {
        color: '#999', 
        fontFamily: 'sans-serif-thin' 
    },

    userData: {
        flexDirection: 'row',
        width: 200,
        alignItems: 'center'
    },

    menuOption: {
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    menuOptionText: {
        marginLeft: 10,
        fontFamily: 'Roboto',
        fontSize: 17,
        color: '#525151',
        marginVertical: 5
    }
});