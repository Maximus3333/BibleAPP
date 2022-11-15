import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, Modal, Pressable } from 'react-native';
import Book from '../screens/Book';
import { createStackNavigator } from '@react-navigation/stack';
import { TableOfContents, Chapters, Verses } from './bibleNavigateUpperTabs';
import CreateBookMark from '../screens/BookmarkCreate';
import ProfileMainScreen from '../screens/ProfileMainScreen';
import BookMarks from '../screens/BookMarks';



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
                <BookNavigatorTab.Screen name="Books" component={TableOfContents} />
                <BookNavigatorTab.Screen name="Chapters" component={Chapters} />
                <BookNavigatorTab.Screen name="Verses" component={Verses} />

            </BookNavigatorTab.Navigator>
        )
    }

    const BibleStack = createStackNavigator()
    const BibleScreens = ({ navigation }) => {
        return (
            <BibleStack.Navigator>
                <BibleStack.Screen name='currentBook' options={{
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: 'grey',
                        height: 105,
                    },
                    headerLeftContainerStyle: {
                        paddingLeft: 10,
                        paddingBottom: 20,
                        height: 60


                    },
                    headerLeftAlign: 'center',

                    headerLeft: () => (
                        <Button
                            onPress={() => navigation.navigate('navigateBible')}
                            title={currentBook}
                            color="black"

                        />
                    ),
                    headerTintColor: 'black',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
                    {(props) => <Book {...props} sendDataToParent={sendDataToParent} />}

                </BibleStack.Screen>


                <BibleStack.Screen name='createBookmark' component={CreateBookMark} />
                <BibleStack.Screen name='navigateBible' component={BookChapVerseScreens} />
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
        </Tab.Navigator>
    )
}

export default Tabs;