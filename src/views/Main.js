import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import globalStyles from '../assets/styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';

const Main = () => {

    const navigation = useNavigation();

    const [initialized, setInitialized] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber
    }, []);

    function onAuthStateChanged(user) {
        setUser(user);
        if (initialized) setInitialized(false)
    }

    if (initialized) return null;

    if (!user) {
        return (
            <View style={styles.container}>

                <Text style={globalStyles.text}>testApp</Text>

                <View style={globalStyles.container}>

                    <TouchableOpacity
                        style={[globalStyles.button, globalStyles.buttonBold]}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={[globalStyles.buttonText, { color: 'white' }]}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[globalStyles.button, globalStyles.buttonLight, globalStyles.separator]}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={globalStyles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    } else {
        navigation.navigate('Welcome', { user })
        return null
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Main;