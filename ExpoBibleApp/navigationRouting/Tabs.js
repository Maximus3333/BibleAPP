import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, Modal, Pressable } from 'react-native';
import Book from '../screens/Book';
import { createStackNavigator } from '@react-navigation/stack';
import TableOfContentsForBooks from '../navigatingThroughBible/TableOfContentsForBooks';
import TableOfContentsForChapters from '../navigatingThroughBible/TableOfContentsForChapters';
import TableOfContentsForVerses from '../navigatingThroughBible/TableOfContentsForVerses';
import CreateBookMark from '../screens/BookmarkCreate';
import ProfileMainScreen from '../screens/ProfileMainScreen';
import BookMarks from '../screens/BookMarks';
import Illustrations from '../screens/Illustrations';



const Tab = createBottomTabNavigator();

const Tabs = () => {

    const [currentBook, setCurrentBook] = useState('Matthew');

    const sendDataToParent = (index) => { // the callback. Use a better name
        console.log(index);
        setCurrentBook(index);
    };


    const BookNavigatorTab = createMaterialTopTabNavigator();
    const BookChapVerseScreens = ({ navigation }) => {
        return (
            <BookNavigatorTab.Navigator>
                <BookNavigatorTab.Screen name="BooksList" component={TableOfContentsForBooks} />
                <BookNavigatorTab.Screen name="Chapters" component={TableOfContentsForChapters} />
                <BookNavigatorTab.Screen name="Verses" component={TableOfContentsForVerses} />

            </BookNavigatorTab.Navigator>
        )
    }

    const BibleStack = createStackNavigator()
    const BibleScreens = ({ navigation }) => {
        return (
            <BibleStack.Navigator>
                <BibleStack.Screen name='currentBook' options={{
                    headerShown: false
                    // headerTitle: '',
                    // headerStyle: {
                    //     backgroundColor: 'grey',
                    //     height: 105,
                    // },
                    // headerLeftContainerStyle: {
                    //     paddingLeft: 10,
                    //     paddingBottom: 20,
                    //     height: 60


                    // },
                    // headerLeftAlign: 'center',

                    // headerLeft: () => (
                    //     <Button
                    //         onPress={() => navigation.navigate('navigateBible')}
                    //         title={currentBook}
                    //         color="black"

                    //     />
                    // ),
                    // headerTintColor: 'black',
                    // headerTitleStyle: {
                    //     fontWeight: 'bold',
                    // },
                }}>
                    {(props) => <Book {...props} sendDataToParent={sendDataToParent} />}

                </BibleStack.Screen>


                <BibleStack.Screen name='createBookmark' component={CreateBookMark} />
                <BibleStack.Screen name='Reference' component={BookChapVerseScreens} />
            </BibleStack.Navigator>

        )
    }

    const ProfileStack = createStackNavigator()
    const ProfileScreens = ({ navigation }) => {
        return (
            <ProfileStack.Navigator>
                <ProfileStack.Screen name='mainScreen' component={ProfileMainScreen}>

                </ProfileStack.Screen>
                <ProfileStack.Screen name='bookMarks' component={BookMarks}>

                </ProfileStack.Screen>
            </ProfileStack.Navigator>
        )
    }

    const IllustrationStack = createStackNavigator()
    const IllustrationScreens = ({ navigation }) => {
        return (
            <IllustrationStack.Navigator>
                <IllustrationStack.Screen name='mainScreen' component={Illustrations}>

                </IllustrationStack.Screen>
            </IllustrationStack.Navigator>
        )
    }


    return (
        <Tab.Navigator >
            <Tab.Screen name="Bible"
                component={BibleScreens}
                options={{ headerShown: false }}
            >

            </Tab.Screen>
            <Tab.Screen name="Profile"
                component={ProfileScreens}
                options={{ headerShown: false }}
            >

            </Tab.Screen>
            <Tab.Screen name='Illustrations'
                component={IllustrationScreens}
                options={{ headerShown: false }}
            >

            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default Tabs;