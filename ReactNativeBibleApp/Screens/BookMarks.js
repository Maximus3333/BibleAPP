import React, {useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, Text, View, Button, FlatList, TextInput, Alert, Modal, Pressable } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';



function BookMarks() {
    const [bookMarks, setBookMarks] = useState([]);



    
    const getBookData2 = async () => {
        try {
          
          let bookMarks = await AsyncStorage.getItem("bookmarks")
          if (bookMarks == undefined) {
            return null
    
          }
          bookMarks = JSON.parse(bookMarks)
          setBookMarks(bookMarks)
          // console.log(bookMarks)
           
          
    
          
        } catch (error) {
          
        }
      }

      useEffect(() => {
        getBookData2()
        // console.log(bookMarks)

      }, [])
    //   PhotoEditor.Edit({
    //     path: RNFS.DocumentDirectoryPath + "../assets/censor.png"
    // });
    // const View1 = ({item}) => {
    //   return(
    //     <Text>{item.verse}{item.text}</Text>
    //     )
    // };
    const renderItem = ({item}) => {
      let items = [] 
      // for(const verse of item.verses) {
        items = item.verses.map(verse => {
          return <Text>{verse.verse}{verse.text}</Text>
        })
        return (
          <View style={styles.container}>
            <Text >
              {item.book}
            </Text>
            {items}
          </View>
        )
        
        // return(
        // <Text>{verse.verse}{verse.text}</Text>
        // )
      // }
    };


  return (
        <SafeAreaView style={styles.container}>
        <FlatList 
            data={bookMarks}
            renderItem={renderItem}
            // renderItem={({ item, index }) => <Text style={styles.item}>{item.book}</Text>}
            
            
        />
        </SafeAreaView>
        
        
    
    
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 50,
    },
    item: {
      padding: 20,
      fontSize: 15,
      marginTop: 5,
    }
  });

export default BookMarks