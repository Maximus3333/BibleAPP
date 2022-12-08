import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { StyleSheet, Text, Image, Button, FlatList, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';



function OnboardingScreen() {
    return(
        <Onboarding
        pages={[
        {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/censor.png')} />,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/cross.png')} />,
            title: 'Onboarding 2',
            subtitle: 'Done with React Native Onboarding Swiper',
        },
        ]}
    />
    )
}

export default OnboardingScreen