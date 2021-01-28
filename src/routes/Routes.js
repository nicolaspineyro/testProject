import Main from '../views/Main';
import Login from '../views/Login';
import Register from '../views/Register';
import Welcome from '../views/Welcome'

const Routes = [
    {
        name: 'Login',
        component: Login,
        options: {
            headerShown: false
        }
    },
    {
        name: 'Main',
        component: Main,
        options: {
            headerShown: false
        }

    },
    {
        name: 'Register',
        component: Register,
        options: {
            headerShown: false
        }
    },
    {
        name: 'Welcome',
        component: Welcome,
        options: {
            headerShown: false
        }
    }
];

export default Routes;