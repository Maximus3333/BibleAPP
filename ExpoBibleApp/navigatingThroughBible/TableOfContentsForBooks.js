import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, Modal, Pressable, TouchableOpacity, SectionList, Alert } from 'react-native';
import { saveBookData } from '../reusableComponents/SaveToAsync';

const Books = require('../jsonFiles/BookNames.json');
const bibleJson = require('../jsonFiles/CompleteBible.json');

function TableOfContentsForBooks(props) {
    const [bookNames, setbookNames] = useState([])
    const [bookClicked, setBookClicked] = useState([])
    const [displayContents, setdisplayContents] = useState([])

    useEffect(() => {
        setbookNames(Books)
        
    }, [bookClicked])
  
    const clickedItem = (item) => {
        saveBookData('book', item)

        let bookChapters = ''
        let totalChapters = 0
        
        setBookClicked(item)
        bibleJson.forEach(element => {
            
            if (item == element.book) {
              bookChapters = element.chapters
            }

        totalChapters = bookChapters.length

        });

        props.navigation.navigate("Chapters", {data:item, totalChapters, bookChapters})
    }




    const renderData = (item) => {
        return (
            
            <Pressable style = {styles.cardStyle} onPress = {() => clickedItem(item)}>
                <Text style = {styles.bookTitles}>{item}</Text>
            </Pressable>
          )
    }


    return (
        <SafeAreaView style={styles.container}>
            <FlatList style={{width:'100%'}}
                data={bookNames}
                renderItem = {({item}) => {
                    return renderData(item)
                }}
            />   
        </SafeAreaView>
            
      
    )
}

export default TableOfContentsForBooks

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 30,
        marginTop: 10,
        marginBottom: 10
        // backgroundColor: '#8fcbbc',
    },
    bookTitles: {
        fontFamily: 'notoserif',
        fontSize: 20,
        paddingBottom: 10

    }
})