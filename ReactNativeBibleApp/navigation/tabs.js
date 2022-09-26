import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, Modal, Pressable } from 'react-native';
import Book from '../Screens/Book';
// import Chapters from '../Screens/Chapters';
import Books from '../Books.json';  
// import Contents from '../components/tableOfContents';
import Tool from '../components/tool';
import { createStackNavigator } from '@react-navigation/stack';
import { StackRouter } from 'react-navigation';
import Contents from '../Screens/tableOfContents';
import {TableOfContents, Chapters, Verses} from './bookNavUpperTabs';
import CreateBookMark from '../Screens/BookmarkCreate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileMainScreen from '../Screens/ProfileMainScreen';



const Tab = createBottomTabNavigator();

const Tabs = () => {

    const [currentBook, setCurrentBook] = useState('Matthew');

    // const getBookName = async () => {
    //     try {
    //         let name = await AsyncStorage.getItem('book')
    //         if (name != undefined) {
    //             setCurrentBook(name)
    
    //         }
    //         // props.sendDataToParent(name)
                
    //     } catch (error) {
    //       console.log('error')
          
    //     }
    //   }
    
    // getBookName()

    // const [displayContents, setdisplayContents] = useState()
    const sendDataToParent = (index) => { // the callback. Use a better name
        console.log(index);
        setCurrentBook(index);
      };

    //   useEffect(() => {
    //     setdisplayContents(false)


    //     // loadData();
    //     // const willFocusSubscription = props.navigation.addListener('focus', () => {
    //     //     loadData();
    //     // });

    // }, [])
    const BookNavigatorTab = createMaterialTopTabNavigator();
    const BookChapVerseScreens = ({navigation}) => {
        return (
        <BookNavigatorTab.Navigator>
            <BookNavigatorTab.Screen name="Books" component={TableOfContents} />
            {/* {(props) => <TableOfContents {...props} sendDataToParent={sendDataToParent} />}
            </BookNavigatorTab.Screen> */}
            <BookNavigatorTab.Screen name="Chapters" component={Chapters} />
            <BookNavigatorTab.Screen name="Verses" component={Verses} />

      </BookNavigatorTab.Navigator>
        )    
}



    const BibleStack = createStackNavigator()
    const BibleScreens = ({navigation}) => {
        return (
            <BibleStack.Navigator>
                <BibleStack.Screen name='currentBook'  options={{
                headerTitle: '',
                headerStyle: {
                    backgroundColor: 'grey',
                    height: 105,
                },
                headerLeftContainerStyle: {
                    paddingLeft:10,
                    paddingBottom:20,
                    height: 60
                    
                    
                },
                headerLeftAlign: 'center',

                headerLeft: () => (
                <Button
                onPress={() => navigation.navigate('navigateBible')}
                title= {currentBook} 
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


                <BibleStack.Screen name='createBookmark' component={CreateBookMark}/>
                <BibleStack.Screen name='navigateBible' component={BookChapVerseScreens}/>
            </BibleStack.Navigator>

        )
    }

    const ProfileStack = createStackNavigator()
    const ProfileScreens = ({navigation}) => {
        return(
            <ProfileStack.Navigator>
                <ProfileStack.Screen name='mainScreen' component={ProfileMainScreen}>

                </ProfileStack.Screen>
            </ProfileStack.Navigator>
        )
    }


    return(
        <Tab.Navigator >
            <Tab.Screen name="Bible"
                component={BibleScreens}
                options={{headerShown: false}}
                
        // children={()=>{displayContents ? <Contents  sendDataToParent={sendDataToParent} defaultBook={currentBook} displayContents={displayContents} /> : Tool}}
            >
                {/* {(props) => <Contents  sendDataToParent={sendDataToParent} defaultBook={currentBook} displayContents={displayContents} />} */}
            </Tab.Screen>
            <Tab.Screen name="Profile"
                component={ProfileScreens}
                options={{headerShown: false}}
            >

            </Tab.Screen>
              

        </Tab.Navigator>
    )
}

export default Tabs;