import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Alert, Modal, Pressable } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';




const CreateBookMark = ( props ) => {
    const [titleText, setTitleText] = useState('');
    const [bookClicked, setBookClicked] = useState()
    const [chapterClicked, setChapterClicked] = useState()
    const [verseNumClicked, setVerseNumClicked] = useState()
    const [verseTextClicked, setVerseTextClicked] = useState()    

    useEffect(() => {
        console.log(props)
        setBookClicked(props.route.params.bookClicked)
        setChapterClicked(props.route.params.chapterClicked)
        setVerseNumClicked(props.route.params.verseNumClicked)
        setVerseTextClicked(props.route.params.verseTextClicked)


    }, [props])
    useEffect(() => {
        console.log(verseTextClicked, verseNumClicked)
    }, [titleText])

    const saveBookMark = async () => {
        try {
            const bookMarkObject = {'book':bookClicked, 'chapter': chapterClicked, 'verse_num': verseNumClicked, 'verse_titleText': verseTextClicked, 'title': titleText}
            let bookMarksArray = await AsyncStorage.getItem('bookmarks');
            if (bookMarksArray) {
                let jsonBookMarksArray = JSON.parse(bookMarksArray)
                console.log(jsonBookMarksArray)
                jsonBookMarksArray.push(bookMarkObject)
                await AsyncStorage.setItem('bookmarks', JSON.stringify(jsonBookMarksArray), () => {
                console.warn('Stored data!')});
                
                
    
            }else {
                bookMarksArray = [bookMarkObject]
                await AsyncStorage.setItem('bookmarks', JSON.stringify(bookMarksArray), () => {
                    console.warn('Stored new bookmark in new bookmark array!')});

                }
    
    
            
          
          
        } catch (error) {
          console.log(error)
          
        }
    }



return (
        <View style = {{flex:1}}>
        {/* {verseClicked['verse']} */}
            <Text style={styles.basetitleText}>{ bookClicked} {chapterClicked}:{verseNumClicked}</Text>
            <TextInput
            style={styles.input}
            onChangeText={newTitleText => setTitleText(newTitleText)}
            // value={number}
            placeholder="Title"
        />     
        <Button
        title="Save"
        onPress={() => saveBookMark()}
        />
        </View>) 
        }

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    basetitleText: {
        fontWeight: 'bold',
        padding: 12,
        // margin: 12,
      },
    });

export default CreateBookMark;