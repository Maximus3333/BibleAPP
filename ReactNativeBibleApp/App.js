import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Screens/Home';
import Book from './Screens/Book';

import Constants from 'expo-constants';

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import 'react-native-gesture-handler';
import { Title } from 'react-native-paper';



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

const Stack = createStackNavigator()



function App() {
  return (
    <View style={styles.container}>
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home}
        options = {{title: "Home"}}

      />
      <Stack.Screen name='Book' component={Book}

      />


    </Stack.Navigator>
      
    </View>  );
}


export default() => {
  return (
  <NavigationContainer>
    <App/>
  </NavigationContainer>)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffee',
    marginTop: Constants.statusBarHeight, 
  },
});
