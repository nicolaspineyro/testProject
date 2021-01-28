import React, { useState } from 'react';
import { Keyboard, Text, View, TouchableOpacity, StyleSheet, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native';

import globalStyles from '../assets/styles/globalStyles';
import colors from '../assets/colors/colors';
import { Icon, Toast } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import auth from '@react-native-firebase/auth';

const Register = () => {

    const [message, setMessage] = useState(null);

    const navigation = useNavigation();

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
            .createUserWithEmailAndPassword(email, password)
            .then(
                () => {
                    setMessage('User successfully created.');
                    navigation.navigate('Main');
                }
            )
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setMessage('The user already exists!')
                }

                console.log(error);
            });
    }

    const showAlert = () => {
        Toast.show({
            text: message,
            buttonText: 'Ok',
            duration: 4000
        });
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>

                <Text style={globalStyles.text}>Sign Up</Text>

                <View style={globalStyles.container}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={submitForm}
                        validateOnBlur={true}
                        validateOnChange={false}
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
                                    <Text style={[globalStyles.buttonText, { color: 'white' }]}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                    </Formik>

                    <TouchableOpacity
                        style={styles.separator}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={[globalStyles.text, styles.text]}>Don't have an Account? Sign In</Text>
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

export default Register;