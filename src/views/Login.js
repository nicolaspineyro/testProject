import React, { useState } from 'react';
import { Keyboard, Text, View, TouchableOpacity, StyleSheet, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native';

import globalStyles from '../assets/styles/globalStyles';
import colors from '../assets/colors/colors';
import { Icon, Toast } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';


const Login = () => {

    GoogleSignin.configure({
        webClientId: '744592204988-sooh77ht183g5fg564ven3m3us9bbrnm.apps.googleusercontent.com'
    })

    const onGoogleButtonPress = async () => {
        const { idToken } = await GoogleSignin.signIn()

        const googleCredential = auth.GoogleAuthProvider.credential(idToken)

        return auth().signInWithCredential(googleCredential);
    }

    const navigation = useNavigation();

    const [message, setMessage] = useState(null)

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email invalid.')
            .required('Email is required.'),
        password: Yup.string().
            required('Password is required').
            min(6, 'Your password must have at least 6 characters.')
    })

    const initialValues = {
        email: '',
        password: ''
    }

    const submitForm = (values) => {
        const { email, password } = values

        auth()
            .signInWithEmailAndPassword(email, password)
            .then(
                () => {
                    navigation.navigate('Main');
                }
            )
            .catch(error => {
                if (error.code === 'auth/user-not-found') {
                    setMessage('User does not exists!')
                }
                if (error.code === 'auth/wrong-password') {
                    setMessage('Wrong password!')
                }
            });
    }

    const showAlert = () => {
        Toast.show({
            text: message,
            buttonText: 'Ok',
            duration: 2000
        });
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>

                <Text style={globalStyles.text}>Login</Text>

                <View style={globalStyles.container}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={submitForm}
                        validateOnChange={false}
                        validateOnBlur={true}
                        enableReinitialize={true}
                    >
                        {({ handleBlur, handleChange, values, errors, touched, isValid }) => (
                            <View>
                                <View style={globalStyles.inputContainer}>
                                    <Icon name='user' type='FontAwesome' style={globalStyles.inputIcon} />
                                    <TextInput
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        placeholder='Email'
                                        keyboardType='email-address'
                                        placeholderTextColor='#000'
                                        style={globalStyles.input}
                                    />
                                </View>
                                {errors.email && touched.email ?
                                    (<View>
                                        <Text style={globalStyles.textError}>{errors.email}</Text>
                                    </View>) : null}
                                <View style={globalStyles.inputContainer}>
                                    <Icon name='lock' type='MaterialIcons' style={globalStyles.inputIcon} />
                                    <TextInput
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        placeholder='Password'
                                        secureTextEntry
                                        placeholderTextColor='#000'
                                        style={globalStyles.input}
                                    />
                                </View>
                                {errors.password && touched.password ?
                                    (<View>
                                        <Text style={globalStyles.textError}>{errors.password}</Text>
                                    </View>) : null}
                                <TouchableOpacity
                                    style={[globalStyles.button, isValid ? globalStyles.buttonBold : styles.invalidStyle]}
                                    onPress={() => submitForm(values)}
                                    disabled={!isValid}
                                >
                                    <Text style={[globalStyles.buttonText, { color: 'white' }]}>Login</Text>
                                </TouchableOpacity>
                            </View>

                        )}

                    </Formik>

                    <TouchableOpacity
                        style={styles.separator}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={[globalStyles.text, styles.text]}>Don't have an Account? Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={globalStyles.googleButtonContainer}
                        onPress={() => onGoogleButtonPress().then(() => navigation.navigate('Main'))}
                    >
                        <Icon style={globalStyles.googleButton} name='google' type='AntDesign' />
                        <Text style={globalStyles.googleButtonText}>Login with google</Text>
                    </TouchableOpacity>
                </View>
                {message && showAlert()}

            </View >
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    separator: {
        marginBottom: '25%',
        marginTop: '5%'
    },
    text: {
        color: colors.boldViolet
    },
    invalidStyle: {
        backgroundColor: colors.lightViolet
    }
})

export default Login;