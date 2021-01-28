import React from 'react';
import { Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Root } from 'native-base';

import Routes from './src/routes/Routes';

const App = () => {

  const Stack = createStackNavigator();

  return (
    <Root>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Main'
        >
          {Routes.map((view) => (
            <Stack.Screen
              name={view.name}
              component={view.component}
              options={view.options}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
};

export default App;
