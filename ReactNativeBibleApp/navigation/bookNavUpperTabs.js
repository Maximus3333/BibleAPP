
import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, Modal, Pressable, TouchableOpacity, SectionList } from 'react-native';
import { Card, FAB } from 'react-native-paper'; 
import Books from '../Books.json';


// const bookClicked = '';
// const chapterClicked = '';
// const verseClicked = '';
const bibleJson = require('../Bible/CompleteBible.json');

function TableOfContents(props) {
    const [bookNames, setbookNames] = useState([])
    const [bookClicked, setBookClicked] = useState([])
    const [displayContents, setdisplayContents] = useState([])
    console.log(props)

    useEffect(() => {
        setbookNames(Books)

        // loadData();
        // const willFocusSubscription = props.navigation.addListener('focus', () => {
        //     loadData();
        // });
        // console.log(bookClicked)
        

    }, [bookClicked])
  
    const clickedItem = (item) => {
        // props.sendDataToParent(item)
        // console.log(item)
        let bookChapters = ''
        let totalChapters = 0
        
        setBookClicked(item)
        bibleJson.forEach(element => {
            // console.log(element.book) 
            
            // array[element.book] = element.chapters.length
            // console.log(array)
            if (item == element.book) {
              // console.log(element.book)
              bookChapters = element.chapters
            //   console.log(element)
              
              // console.log(bookChapters.length)
              // console.log(bookChapters);
              // console.log(Object.keys(bookChapters.chapters))
            }
        totalChapters = bookChapters.length

  
            
      });
        // console.log(bookClicked)

        
        // props.navigation.navigate("Chapters", {data:item})

        props.navigation.navigate("Chapters", {data:item, totalChapters, bookChapters})
        

    }




    const renderData = (item) => {
        return (
            // console.log(item['data'].book_title)
            // onPress = {() => clickedItem(item)}
            <Card style = {styles.cardStyle} onPress = {() => clickedItem(item)}
            >
                <Text style = {{fontSize:25}}>{item}</Text>
            </Card>
          )
    }
    // console.log(data)


    return (
        <View style={styles.container}>
            <View style={styles.centeredView}>
                <View style={[styles.modalView]}>
                    <FlatList style={{backgroundColor: 'red', width: 300}}
                        data={bookNames}
                        renderItem = {({item}) => {
                            return renderData(item)
                        }}
                        // onRefresh = {() => loadData()} 
                        // refreshing = {loading}
                        // keyExtractor = {item => `${item.book_title}`}

                    />
                    
                    
                </View>
            </View>
            
      
    </View>
    )
}

function Chapters(props) {
    // console.log(props)
    const [bookClicked, setBookClicked] = useState([])
    // const [chapterClicked, setchapterClicked] = useState([])
    const [bookChapters, setBookChapters] = useState([])
    const [totalChapters, setTotalChapters] = useState(3)
    // const [clickedVersesLen, setClickedVersesLen] = useState(0)


    useEffect(() => {    
    // console.log(props.route.params)
        if (props.route.params) {
            // console.log('hih')
            setBookClicked(props.route.params.data)
            setTotalChapters(props.route.params.totalChapters)
            setBookChapters(props.route.params.bookChapters)
            // console.log(props.route.params)
            // console.log(bookClicked)

      
      
        }
        // setTotalChapter(array) 
      }, [props]);

    //   console.log(totalChapters)

    // // 

    // useEffect(() => {
    //     setTotalChapters(bookChapters.length)
        
    //     // console.log(bookClicked)

    // }, [bookChapters])

    // useEffect(() => {
    //     bibleJson.forEach(element => {
    //         // console.log(element.book) 
            
    //         // array[element.book] = element.chapters.length
    //         // console.log(array)
    //         if (bookClicked == element.book) {
    //           // console.log(element.book)
    //           setBookChapters(element.chapters)
              
    //           // console.log(bookChapters.length)
    //           // console.log(bookChapters);
    //           // console.log(Object.keys(bookChapters.chapters))
    //         }
  
            
    //   });
    // }, [bookClicked])

    // // console.log(bookChapters.length)
    let array = []
    
    if (parseInt(totalChapters)!==0){ 
        let b = 0
        for (let i = 1; i <= parseInt(totalChapters); i++) {
            array.push({i})
        }
        // console.log(totalChapters)
    }
    
        console.log(array)



    // console.log(totalChapters)
    const clickedItem = (item) => {
        console.log(item)
        let chapterClicked = item.i
        let chapVersLength = 0
        bibleJson.forEach(element => {
            // setchapterClicked(item.i)
            // console.log(element.book) 
            if (bookClicked == element.book) {
            // console.log(element.book)
                console.log(bookClicked)
            element.chapters.forEach(element2 => {
              // console.log(element2.chapter)
              if (element2.chapter == item.i) {
                // console.log(element2)
                console.log(element2.verses.length)
                chapVersLength = element2.verses.length
              }
            })
            if (element.chapters.chapter == item) {
              null
            }
            // console.log(bookChapters);
            // console.log(Object.keys(bookChapters.chapters))
          }
            
            
        });
        props.navigation.navigate("Verses", {chapterClicked, chapVersLength, bookClicked})

            }        
    

    return (
      <View >
        <Text>{totalChapters}</Text>
        <FlatList
        data={array}
        // horizontal={true}
        style={{flexWrap:'wrap', width:100}}
        // keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={{padding: 10}} onPress = {() => clickedItem(item)}>{item.i}</Text>}
        >

        </FlatList>
        
        {/* <Text>{renderData()}</Text> */}

      </View>
      
    )
  }
  
function Verses( props ) {
    const [bookClicked, setBookClicked] = useState([])
    const [chapterClicked, setchapterClicked] = useState([])
    const [clickedVersesLen, setClickedVersesLen] = useState(0)

    useEffect(() => {    
        // console.log(props.route.params)
            if (props.route.params) {
                // console.log('hih')
                setBookClicked(props.route.params.bookClicked)
                setchapterClicked(props.route.params.chapterClicked)
                setClickedVersesLen(props.route.params.chapVersLength)
                console.log(props.route.params)
                // console.log(bookClicked)
    
          
          
            }
            // setTotalChapter(array) 
          }, [props]);

    let array = []

    if (parseInt(clickedVersesLen)!==0){ 
        let b = 0
        for (let i = 1; i <= parseInt(clickedVersesLen); i++) {
            array.push({i})
        }
        // console.log(totalChapters)
    }
    
    console.log(array)

    const clickedItem = (item) => {
        let verseClicked = item.i
        props.navigation.navigate("currentBook", {bookClicked, chapterClicked, verseClicked} )

    }
    
return (
    <View >
        {/* <Text>{totalChapters}</Text> */}
        <FlatList
        data={array}
        // horizontal={true}
        style={{flexWrap:'wrap', width:100}}
        // keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={{padding: 10}} onPress = {() => clickedItem(item)} >{item.i}</Text>}
        >

        </FlatList>
        
        {/* <Text>{renderData()}</Text> */}

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