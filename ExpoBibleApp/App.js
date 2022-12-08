// import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native'
// import {createStackNavigator} from '@react-navigation/stack'
// import 'react-native-gesture-handler';
// import Tabs from './navigationRouting/Tabs';
// import Routes from './authenticationNavigation/index';
// import OnboardingScreen from './screens/OnboardingScreen'

// import AsyncStorage from '@react-native-async-storage/async-storage';



// const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

// const App = () => {
//   const LoginAndOnboardingStack = createStackNavigator()
//   const LoginScreenAndSignupStack = createStackNavigator()
//   const [isFirstLaunch, setIsFirstLaunch] = React.useState(null)

//   React.useEffect(() => {
//     AsyncStorage.getItem('alreadyLaunched').then(value => {
//       if (value == null) {
//         AsyncStorage.setItem('alreadyLaunched', 'true');
//         setIsFirstLaunch(true);
//       }else {
//         setIsFirstLaunch(false);
//       }
//     })
//   }, [])
//   // const { user } = useAuth();

//   if (isFirstLaunch == null) {
//     return null;
//   } else if (isFirstLaunch == true) {
//     return (
//       <NavigationContainer>
//       <LoginAndOnboardingStack.Navigator>
//         <LoginAndOnboardingStack.Screen name="Onboarding" component={OnboardingScreen}/>
//       </LoginAndOnboardingStack.Navigator>
//     </NavigationContainer>
      
//     )
//   }else {
//     return (
//       <NavigationContainer>
//       //   {/* <LoginScreenAndSignupStack.Navigator>
//       //     <LoginScreenAndSignupStack.Screen name='Login' component={LoginScreen} />
//       //     <LoginScreenAndSignupStack.Screen name='Tabs' component={Tabs} />
//       //   </LoginScreenAndSignupStack.Navigator> */}
//       //   {/* <Tabs /> */}
//       //   {/* user ? <Tabs /> : <AuthStack />; */}
//         <Routes />

//       </NavigationContainer>
//     )
//   }

// }



// export default App;


<script src="http://localhost:8097"></script>
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from 'react';
import { firebase } from './firebase'
import Tabs from './navigationRouting/Tabs';




import Login from "./loginAndSignupScreens/Login";
import Registration from "./loginAndSignupScreens/Registration";
// import Header from "./components/Header";
import Dashboard from "./loginAndSignupScreens/Welcome";


const Stack = createStackNavigator();


function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
       
      />
    </Stack.Navigator>
    );
  }

  return (
      <Tabs/>
    
  )
  //   <Stack.Navigator>
      
  //     <Stack.Screen
  //       name="Dashboard"
  //       component={Dashboard}
        
  //     />
  //   </Stack.Navigator>
  // );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}