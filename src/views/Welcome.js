import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import auth from '@react-native-firebase/auth'

import globalStyles from '../assets/styles/globalStyles'

const Welcome = ({ route }) => {

    const navigation = useNavigation()    
    const { user } = route.params;

    const signOut = () => {
        auth()
            .signOut()
            .then(() => {
                navigation.navigate('Main')
            })
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={globalStyles.text}>Welcome {user.email}</Text>
            <View style={globalStyles.container}>
                <TouchableOpacity
                    style={[globalStyles.button, globalStyles.buttonBold, globalStyles.separator]}
                >
                    <Text style={[globalStyles.buttonText, { color: '#fff' }]}
                        onPress={() => signOut()}
                    >
                        Log Out
                        </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Welcome;