import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { createDrawerNavigator } from '@react-navigation/drawer'
import { navigationRef } from '../utils/CNavigator';
import LoginScreen from '../screens/auth/LoginScreen';
import CreateAccountScreen from '../screens/auth/CreateAccountScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import CustomDrawerContent from '../components/common/CustomDrawerContent';
import DashboardScreen from '../screens/home/HomeScreen';
import MyProfileScreen from '../screens/home/MyProfileScreen';
import EventScreen from '../screens/home/EventScreen';
import EventDetailScreen from '../screens/home/EventDetailScreen';
import EventMapScreen from '../screens/home/EventMapScreen';
import SplashScreen from '../screens/auth/SplashScreen';
import i18n from '../localization/i18n';

const Stack = createNativeStackNavigator(); 
const Drawer = createDrawerNavigator();


// Stack navigators for each module
const MainNavigationStack = () => (
  <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={DashboardScreen} options={{ headerShown: false }} />
    <Stack.Screen name="EventScreen" component={EventScreen} options={{ headerShown: false }} />
    <Stack.Screen name="EventDetailScreen" component={EventDetailScreen} options={{ headerShown: false }} />
    <Stack.Screen name="EventMapScreen" component={EventMapScreen} options={{ headerShown: false }} />
    <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);


// Drawer Navigator for all modules
const AppDrawer = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={MainNavigationStack} options={{headerShown: false, title: i18n.t('nav.home') }} />
  </Drawer.Navigator>
);


const AuthStack = () => ( 
  <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}> 
    <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} /> 
    <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} /> 
    <Stack.Screen name="Dashboard" component={AppDrawer} options={{ headerShown: false }} />
  </Stack.Navigator> 
);


export default function AppNav() {
  return (
    <NavigationContainer ref={navigationRef}>
      <AuthStack />
    </NavigationContainer>
  );
}