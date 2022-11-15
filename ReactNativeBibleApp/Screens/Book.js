import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Share } from 'react-native';
import { Icon } from 'react-native-elements';
import BookNames from '../jsonFiles/BookNames.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveBookData } from '../reusableComponents/saveToAsync';

import { getHighlightedVerses, saveHighlightedVerse } from '../reusableComponents/saveHighlightedVerses';
import { BookVersesListComponent, bottomUtilitySheetComponent } from './verseListComponent';

var bibleJson = require('../jsonFiles/CompleteBible.json');

function Book(props) {
  const [currentBook, setCurrentBook] = useState()
  const [chapterClicked, setchapterClicked] = useState(1)
  const [chapterClickedVerses, setchapterClickedVerses] = useState("")

  const totalChapters = []

  // useEffect to load Book, chapter, and verses to screen
  const loadVersesForChapterAndBook = () => {
    bibleJson.every(element => {
      if (currentBook == element.book) {
        element.chapters.forEach(element2 => {
          if (element2.chapter == chapterClicked) {
            setchapterClickedVerses(element2.verses)
          }
        })
        if (element.chapters.chapter == chapterClicked) {
          null
        }
        return false;
      }
      return true;

    });
  }

  //Gets saved data which user left off such as book, and chapter from async
  //TODO: get state of last chapter
  const getBookUserLeftOffOn = async (bookKey, chapterKey) => {
    try {
      let bookName = await AsyncStorage.getItem(bookKey)
      let chapter = await AsyncStorage.getItem(chapterKey)
      if (bookName == undefined) {
        bookName = 'Matthew'
      }
      if (chapter == undefined) {
        chapter = 1
      }
      setCurrentBook(bookName)
      setchapterClicked(chapter)
      props.sendDataToParent(bookName)
    } catch (error) {
    }
  }

  // gets the order of current book in bible
  const indexOfBook = parseInt(BookNames.findIndex(object => object == currentBook))

  bibleJson.forEach(element => {
    totalChapters[element.book] = element.chapters.length
  });


  // navigates through bible chapters and books on arrowclick
  const arrowClick = (leftOrRight) => {
    if (parseInt(chapterClicked) == 1 & leftOrRight == 'left') {
      const prevBook = BookNames[indexOfBook - 1]
      setchapterClicked(totalChapters[prevBook])
      setCurrentBook(prevBook)
      saveBookData('book', prevBook)
      props.sendDataToParent(prevBook)
    } else if (parseInt(chapterClicked) == totalChapters[currentBook] & leftOrRight == 'right') {
      const nextBook = BookNames[indexOfBook + 1]
      setchapterClicked(1)
      setCurrentBook(nextBook)
      saveBookData('book', nextBook)
    } else if (leftOrRight == 'left') {
      setchapterClicked(parseInt(chapterClicked) - 1)
    } else if (leftOrRight == 'right') {
      setchapterClicked(parseInt(chapterClicked) + 1)
    }
  }

  useEffect(() => {
    getBookUserLeftOffOn('book', 'chapter')
  }, [])

  useEffect(() => {
    loadVersesForChapterAndBook()
  }, [currentBook, chapterClicked])

  useEffect(() => {
    if (props.route.params) {
      getBookUserLeftOffOn('book', 'chapter')
    }
  }, [props]);


  return (
    <SafeAreaView style={styles.container}
    >
      <Text style={{ fontSize: 30, textAlign: "center", marginTop: 20, fontWeight: 'bold', textDecorationLine: 'underline' }}> {`${currentBook} Chapter: ${chapterClicked}`} </Text>

      <BookVersesListComponent
        onBookmarkCallBack={(selectedVerse) => {
          props.navigation.navigate('createBookmark', { currentBook, chapterClicked, selectedVerse });
        }}
        verses={chapterClickedVerses}
        currentBook={currentBook}
        chapterClicked={chapterClicked}
      />

      <View style={styles.arrowCont}>
        <Icon name="arrow-left" size={20} color="black" onPress={() => arrowClick('left')} type="entypo" />
        <Icon name="arrow-right" size={20} color="black" onPress={() => arrowClick('right')} type="entypo" />
      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    // flexDirection: 'row'
  },
  panelContainer: {

    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'

  },
  item: {
    padding: 5,
    fontSize: 15,
    marginTop: 5,
    height: 60

  },
  cardStyle: {
    padding: 10,
    margin: 10,
  },
  arrowCont: {
    flexDirection: 'row',
    justifyContent: 'space-around'

  },
  container2: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',

  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
  panelHeader: {
    height: 220,
    backgroundColor: '#b197fc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#2b8a3e',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1
  },
  CircleShape: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  }

});

export default Book

