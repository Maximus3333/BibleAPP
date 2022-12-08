
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, Modal, Pressable, TouchableOpacity, SectionList, Alert } from 'react-native';
import { saveBookData } from '../reusableComponents/saveToAsync';


const Books = require('../jsonFiles/BookNames.json');
const bibleJson = require('../jsonFiles/CompleteBible.json');

const TableOfContents = (props) => {
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

function Chapters(props) {
    const [bookClicked, setBookClicked] = useState([])
    const [bookChapters, setBookChapters] = useState([])
    const [totalChapters, setTotalChapters] = useState(3)


    useEffect(() => {    
        if (props.route.params) {
            setBookClicked(props.route.params.data)
            setTotalChapters(props.route.params.totalChapters)
            setBookChapters(props.route.params.bookChapters)
    
        }
      }, [props]);

    let array = []
    
    if (parseInt(totalChapters)!==0){ 
        let b = 0
        for (let i = 1; i <= parseInt(totalChapters); i++) {
            array.push({i})
        }
    }

    const clickedItem = (item) => {
        saveBookData('chapter', item.i)
        let chapterClicked = item.i
        let chapVersLength = 0
        bibleJson.forEach(element => {
            if (bookClicked == element.book) {
            element.chapters.forEach(element2 => {
              if (element2.chapter == item.i) {
                chapVersLength = element2.verses.length
              }
            })
            if (element.chapters.chapter == item) {
              null
            }
          }
            
            
        });
        props.navigation.navigate("Verses", {chapterClicked, chapVersLength, bookClicked})

            }        
    

    return (
      <View >
        <Text>{totalChapters}</Text>
        <FlatList
        data={array}
        style={{flexWrap:'wrap', width:100}}
        renderItem={({ item }) => <Text style={{padding: 10}} onPress = {() => clickedItem(item)}>{item.i}</Text>}
        >
        </FlatList>
      </View>
      
    )
}
  
function Verses( props ) {
    const [bookClicked, setBookClicked] = useState([])
    const [chapterClicked, setchapterClicked] = useState([])
    const [clickedVersesLen, setClickedVersesLen] = useState(0)

    useEffect(() => {    
        if (props.route.params) {
            setBookClicked(props.route.params.bookClicked)
            setchapterClicked(props.route.params.chapterClicked)
            setClickedVersesLen(props.route.params.chapVersLength)
        }
    }, [props]);

    let array = []

    if (parseInt(clickedVersesLen)!==0){ 
        let b = 0
        for (let i = 1; i <= parseInt(clickedVersesLen); i++) {
            array.push({i})
        }
    }
    

    const clickedItem = (item) => {
        let verseClicked = item.i
        props.navigation.navigate("currentBook", {bookClicked, chapterClicked, verseClicked} )

    }
    
    return (
        <View >
            <FlatList
            data={array}
            style={{flexWrap:'wrap', width:100}}
            renderItem={({ item }) => <Text style={{padding: 10}} onPress = {() => clickedItem(item)} >{item.i}</Text>}
            >
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#8fcbbc',
    }
})


export {TableOfContents, Chapters, Verses};