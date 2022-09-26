import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import Home from './Screens/Home';
// import Book from './Screens/Book';
// import Chapters from './Screens/Chapters';


import Constants from 'expo-constants';
import * as React from 'react';


import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import 'react-native-gesture-handler';
import { TabNavigator } from 'react-navigation'
import { Title } from 'react-native-paper';
import Tabs from './navigation/tabs';
import { Provider } from 'react-redux';
import { store } from './reduxConfig/store';
import AsyncStorage from '@react-native-async-storage/async-storage';




// import Books from './Books.json';


// export default function App() {
//   // console.log(Books)

//   return (
//     // <View style={styles.container}>
//       //  <Home/>
//       <Book/>

//     //  </View>

//   );
// }
const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

const App = () => {

  
  return(
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );

    // <Provider store={store}>
    //   <Navigators/>
    // </Provider>
  // );
}

// const Navigators = () => {
//   // const MainNavigator = TabNavigator({
//   //   Bible : { screen: Contents}

//   //   })
//   return(

    
// }

export default App;
// const Stack = createStackNavigator()



// function App() {
//   return (
//     <View style={styles.container}>
//     <Stack.Navigator
//       screenOptions={{
//         gestureEnabled: true
//             }}
//   >
//       <Stack.Screen name='Home' component={Home}
//         options = {{title: "Home"}}

//       />
//       <Stack.Screen name='Chapters' component={Chapters}

//       />
//       <Stack.Screen name='Book' component={Book}

//       />


//     </Stack.Navigator>
      
//     </View>  );
// }


// export default() => {
//   return (
//   <NavigationContainer>
//     <App/>
//   </NavigationContainer>)
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffee',
//     marginTop: Constants.statusBarHeight, 
//   },
// });
