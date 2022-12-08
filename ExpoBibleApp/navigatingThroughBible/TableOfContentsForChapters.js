import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { saveBookData } from '../reusableComponents/saveToAsync';

const bibleJson = require('../jsonFiles/CompleteBible.json');

function tableOfContentsForChapters(props) {
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

export default tableOfContentsForChapters

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#8fcbbc',
    }
})