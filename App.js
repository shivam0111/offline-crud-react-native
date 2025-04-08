import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import ItemListScreen from './src/screens/ItemListScreen';
import AddEditItemScreen from './src/screens/AddEditItemScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ItemList" component={ItemListScreen} options={{ title: 'My Items' }} />
          <Stack.Screen name="AddEditItem" component={AddEditItemScreen} options={{ title: 'Add / Edit Item' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
