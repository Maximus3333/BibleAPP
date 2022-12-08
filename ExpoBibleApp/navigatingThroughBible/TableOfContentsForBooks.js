import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, Modal, Pressable, TouchableOpacity, SectionList, Alert } from 'react-native';
import { saveBookData } from '../reusableComponents/saveToAsync';

const Books = require('../jsonFiles/BookNames.json');
const bibleJson = require('../jsonFiles/CompleteBible.json');

function tableOfContentsForBooks(props) {
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
                <Text style = {{fontSize:25}}>{item}</Text>
            </Pressable>
          )
    }


    return (
        <View style={styles.container}>
            <View style={styles.centeredView}>
                <View style={[styles.modalView]}>
                    <FlatList style={{backgroundColor: 'red', width: 300}}
                        data={bookNames}
                        renderItem = {({item}) => {
                            return renderData(item)
                        }}
                    />   
                </View>
            </View>
            
      
    </View>
    )
}

export default tableOfContentsForBooks

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#8fcbbc',
    }
})