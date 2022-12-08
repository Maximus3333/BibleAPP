import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import 'react-native-gesture-handler';
import Tabs from './navigationRouting/tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './screens/OnboardingScreen';

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

const App = () => {
  const LoginAndOnboardingStack = createStackNavigator()
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null)

  React.useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      }else {
        setIsFirstLaunch(false);
      }
    })
  }, [])

  if (isFirstLaunch == null) {
    return null;
  } else if (isFirstLaunch == true) {
    return (
      <NavigationContainer>
      <LoginAndOnboardingStack.Navigator>
        <LoginAndOnboardingStack.Screen name="Onboarding" component={OnboardingScreen}/>
      </LoginAndOnboardingStack.Navigator>
    </NavigationContainer>
      
    )
  }else {
    return (
      <NavigationContainer>
        <Tabs />

      </NavigationContainer>
    )
  }

}



export default App;