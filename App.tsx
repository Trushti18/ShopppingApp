import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/login';
import HomeScreen from './src/screens/home';
import ProductDetail from './src/screens/productDetail';
import CartScreen from './src/screens/cart';

const Stack = createNativeStackNavigator();
const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {}, []);

  return (
    <View style={styles.mainContainer}>
      <NavigationContainer>
        {isLogin ? (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="productDetail" component={ProductDetail} />
            <Stack.Screen name="cart" component={CartScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="productDetail" component={ProductDetail} />
            <Stack.Screen name="cart" component={CartScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
