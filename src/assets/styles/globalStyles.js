import { StyleSheet } from 'react-native';
import colors from '../colors/colors';
import Colors from '../colors/colors'

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        margin: '10%'
    },
    button: {
        padding: '4%',
        borderRadius: 30,
        marginVertical: '2.5%'
    },
    buttonLight: {
        backgroundColor: colors.lightViolet
    },
    buttonBold: {
        backgroundColor: colors.boldViolet
    },
    buttonText: {
        textTransform: 'uppercase',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text: {
        textAlign: 'center',
        marginTop: '5%',
        fontSize: 18
    },
    textError: {
        textAlign: 'center',
        color: colors.red,
        fontWeight: 'bold',
        fontSize: 15,
        marginVertical: '2.5%'
    },
    inputContainer: {
        backgroundColor: colors.lightViolet,
        marginVertical: '4%',
        borderRadius: 30,
        flexDirection: 'row'
    },
    inputIcon: {
        color: colors.boldViolet,
        padding: '3%',
        marginHorizontal: '2.5%'
    },
    input: {
        fontSize: 18,
        color: '#000',
        paddingRight: '40%'
    },
    separator: {
        marginBottom: '15%'
    },
    googleButton: {
        color: colors.boldViolet,
        textAlign: 'center'
    },
    googleButtonContainer: {
        flexDirection: 'row',
        backgroundColor: colors.lightViolet,
        borderRadius: 20,
        paddingVertical: '2.5%',
        justifyContent: 'center'
    },
    googleButtonText: {
        marginHorizontal: '5%',
        color: colors.boldViolet,
        fontSize: 20
    }
});

export default globalStyles;