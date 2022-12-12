import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, Alert, Modal, Pressable } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';




const CreateBookMark = ( props ) => {
    const [titleText, setTitleText] = useState('');
    const [bookClicked, setBookClicked] = useState()
    const [chapterClicked, setChapterClicked] = useState()
    const [selectedVerse, setSelectedVerse] = useState()
    const [verseInterval, setVerseInterval] = useState('')

    // const [verseNumClicked, setVerseNumClicked] = useState()
    // const [verseTextClicked, setVerseTextClicked] = useState()    
    let verses = ""
    let verses_text = ""
    useEffect(() => {
        // console.log(props)
        setBookClicked(props.route.params.currentBook)
        setChapterClicked(props.route.params.currentChapter)
        setSelectedVerse(props.route.params.clickedOnVersesArray)
        // setVerseNumClicked(props.route.params.verseNumClicked)
        // setVerseTextClicked(props.route.params.verseTextClicked)
        let tempSelectedVerses = props.route.params.clickedOnVersesArray
        if (tempSelectedVerses.length > 1) {
            let min = parseInt(tempSelectedVerses[0].verse)
            let max = parseInt(tempSelectedVerses[1].verse)
            for (let i=0; i < tempSelectedVerses.length; i++){
                // console.log(parseInt(tempSelectedVerses[i].verse), 'yo');
                if (max < parseInt(tempSelectedVerses[i].verse)){
                    if (max < min) {
                        min = max
                    }else 
                    max = parseInt(tempSelectedVerses[i].verse)
                }else if (min > parseInt(tempSelectedVerses[i].verse)) {
                    min = parseInt(tempSelectedVerses[i].verse)
                
                    
                }
            }
            // console.log(min, min + "");
            verses = min + "-" + max

        }else {verses = tempSelectedVerses[0].verse}
        
        // console.log(max, min, 'hahah');
        // console.log(verses);
        setVerseInterval(verses)


    }, [props])
    useEffect(() => {
        // console.log(verseTextClicked, verseNumClicked)
    }, [titleText])
    
    // const saveBookMark = async () => {
    //     try {
    //         for (let i=0; i < selectedVerse.length; i++){
    //             if (verses.length == 0){
    //                 verses = verses + selectedVerse[i].verse
    //                 verses_text = verses_text + selectedVerse[i].text
    //             }else if (i+1 == selectedVerse.length) {
    //                 verses = verses + "-" + selectedVerse[i].verse
    //                 verses_text = verses_text + " " + selectedVerse[i].text
    //             }else {
    //                 verses_text = verses_text + " " + selectedVerse[i].text
    //             }
                

    //         }
    //         console.log(verses, verses_text);
            
    //         const bookMarkObject = {'book':bookClicked, 'chapter': chapterClicked, 'verse_num': verses, 'verse_Text': verses_text, 'title': titleText}
    //         let bookMarksArray = await AsyncStorage.getItem('bookmarks');
    //         if (bookMarksArray) {
    //             let jsonBookMarksArray = JSON.parse(bookMarksArray)
    //             console.log(jsonBookMarksArray)
    //             jsonBookMarksArray.push(bookMarkObject)
    //             await AsyncStorage.setItem('bookmarks', JSON.stringify(jsonBookMarksArray), () => {
    //             console.warn('Stored data!')});
                
                
    
    //         }else {
    //             bookMarksArray = [bookMarkObject]
    //             await AsyncStorage.setItem('bookmarks', JSON.stringify(bookMarksArray), () => {
    //                 console.warn('Stored new bookmark in new bookmark array!')});

    //             }
    
    
            
          
          
    //     } catch (error) {
    //       console.log(error)
          
    //     }
    // }
    const saveBookMark = async () => {
        try{
            const bookMarkObject = {'book':bookClicked, 'chapter': chapterClicked, 'verses': selectedVerse, 'title': titleText, 'verseInterval': verseInterval}
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
            <Text style={styles.basetitleText}>{ bookClicked} {chapterClicked}:{verseInterval}</Text>
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