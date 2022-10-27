import React, {useState, useEffect, useRef, } from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, Dimensions, TouchableOpacity, Share } from 'react-native';
import { Icon } from 'react-native-elements';
import SlidingUpPanel from 'rn-sliding-up-panel';
import BookNames from '../jsonFiles/BookNames.json'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveBookData } from '../reusableComponents/saveToAsync';





var bibleJson = require('../jsonFiles/CompleteBible.json');



function Book(props) {
  const [bookClicked, setBookClicked] = useState()
  const [verseNumClicked, setVerseNumClicked] = useState()
  const [verseTextClicked, setVerseTextClicked] = useState()
  const [chapterClicked, setchapterClicked] = useState(1)
  const [chapterClickedVerses, setchapterClickedVerses] = useState([])
  const totalChapters = []
  const [shouldShow, setShouldShow] = useState(false);

  
  // useEffect to load Book, chapter, and verses to screen
  const loadVerses = () => {
    bibleJson.every(element => {
      if (bookClicked == element.book) {
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
  const getBookData2 = async (bookKey, chapterKey) => {
    try {
      
      let bookName = await AsyncStorage.getItem(bookKey)
      let chapter = await AsyncStorage.getItem(chapterKey)
      if (bookName == undefined) {
        bookName = 'Matthew'

      }
      if (chapter == undefined) {
        chapter = 1
        console.log(chapter, 'yoo2')
      }
      setBookClicked(bookName)
      setchapterClicked(chapter)
      props.sendDataToParent(bookName)     
      

      
    } catch (error) {
      
    }
  }

  // gets the order of current book in bible
  const indexOfBook = parseInt(BookNames.findIndex(object => object == bookClicked ))

  bibleJson.forEach(element => {
    totalChapters[element.book] = element.chapters.length

  });
  

  useEffect(() => {
    getBookData2('book', 'chapter')
  
  
  }, [])
  

  useEffect(() => {
    


    loadVerses()
  }, [bookClicked, chapterClicked])

  useEffect(() => {
    if (props.route.params) {
      getBookData2('book', 'chapter')
    }
 
  }, [props]);


  // navigates through bible chapters and books on arrowclick
  const arrowClick  = (leftOrRight) => {
    if (parseInt(chapterClicked) == 1 & leftOrRight == 'left') {
      const prevBook = BookNames[indexOfBook-1]
      setchapterClicked(totalChapters[prevBook])
      console.log(totalChapters[prevBook])
      setBookClicked(prevBook)
      saveBookData('book', prevBook)



    }else if (parseInt(chapterClicked) == totalChapters[bookClicked] & leftOrRight == 'right') {
      const nextBook = BookNames[indexOfBook+1]
      setchapterClicked(1)
      console.log(totalChapters[nextBook])
      setBookClicked(nextBook)
      saveBookData('book', nextBook)


    }else if (leftOrRight == 'left') {

      setchapterClicked(parseInt(chapterClicked)-1)      

    } else if (leftOrRight == 'right') {
      setchapterClicked(parseInt(chapterClicked)+1)
    }
    loadVerses()
    console.log(chapterClicked)
    
  }

  const myItemSeparator = () => {
    return <View style={{ height: 1, backgroundColor: "grey",marginHorizontal:10}} />;
    };

  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
      <Text style={styles.item}>No data found</Text>
      </View>
    );
  };

  
  const {height} = Dimensions.get('window')
  const windowWidth = Dimensions.get('window').width;

  // gets verse onpress and hides/unhides popup
  const onPress = (item) => {
    console.log(item)
    setVerseNumClicked(item.verse)
    setVerseTextClicked(item.text)
    setShouldShow(!shouldShow)};

  const viewRef = useRef();

  // allows popup to share verse
  const shareVerse = async () => {
    try {
      const uri = verseTextClicked
      console.log(uri, "haha")
      await Share.share(
        {
          title: 'test title',
          message: uri,
        },
        {
          // excludedActivityTypes: [
          //   // 'com.apple.UIKit.activity.PostToWeibo',
          //   // 'com.apple.UIKit.activity.Print',
          //   // 'com.apple.UIKit.activity.CopyToPasteboard',
          //   // 'com.apple.UIKit.activity.AssignToContact',
          //   // 'com.apple.UIKit.activity.SaveToCameraRoll',
          //   // 'com.apple.UIKit.activity.AddToReadingList',
          //   // 'com.apple.UIKit.activity.PostToFlickr',
          //   // 'com.apple.UIKit.activity.PostToVimeo',
          //   // 'com.apple.UIKit.activity.PostToTencentWeibo',
          //   // 'com.apple.UIKit.activity.AirDrop',
          //   // 'com.apple.UIKit.activity.OpenInIBooks',
          //   // 'com.apple.UIKit.activity.MarkupAsPDF',
          //   // 'com.apple.reminders.RemindersEditorExtension',
          //   // 'com.apple.mobilenotes.SharingExtension',
          //   // 'com.apple.mobileslideshow.StreamShareService',
          //   // 'com.linkedin.LinkedIn.ShareExtension',
          //   // 'pinterest.ShareExtension',
          //   // 'com.google.GooglePlus.ShareExtension',
          //   // 'com.tumblr.tumblr.Share-With-Tumblr',
          //   // 'net.whatsapp.WhatsApp.ShareExtension', //WhatsApp
          // ],
        }
      );
      
    } catch (error) {
      console.log(error)
      
    }
  }
  // console.log(chapterClickedVerses)

  
  
  return (
    <SafeAreaView style={styles.container}
    >
      <FlatList style={{height:100, padding: 10}}
        data={chapterClickedVerses}
        renderItem={({ item }) =>  <TouchableOpacity
                                    activeOpacity={.7}
                                    onPress={() => {onPress(item)}}
                                    >
                                    <Text style={styles.item} ref={viewRef}>{item.text}</Text>
                                  </TouchableOpacity>
                                }
        keyExtractor={(item) => item.verse}
        ListEmptyComponent={myListEmpty}
        ListHeaderComponent={() => (
            
          <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold',textDecorationLine: 'underline' }}>
            {`${bookClicked} Chapter: ${chapterClicked}`} </Text>
        )}
        ListFooterComponent={() => (
          <Text style={{ fontSize: 30, textAlign: "center",marginBottom:20,fontWeight:'bold' }}>End of Chapters</Text>
        )}
        // getItemLayout={(_, index) => (
        
        //     {length: styles.item.height, offset: styles.item.height * index, index}
        //   )}
          
        //   initialScrollIndex= {6}
      />
      <View style={styles.arrowCont}>
        <Icon name="arrow-left" size={20} color="black" onPress = {() => arrowClick('left')} type="entypo" />
        <Icon name="arrow-right" size={20} color="black" onPress = {() => arrowClick('right')} type="entypo" />
      </View>
      { shouldShow ? (<View style={{width: windowWidth}}>
        <Text >Hello world</Text>
        <SlidingUpPanel
          
          draggableRange={{top: height / 2.75, bottom: 120}}
          // animatedValue={200}
          showBackdrop={false}>
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <Button title='BookMark' onPress={() => props.navigation.navigate('createBookmark', {bookClicked, chapterClicked, verseNumClicked, verseTextClicked})}></Button>
              <Button title='Share' onPress={() => {shareVerse()}}></Button>
            </View>
            <View style={styles.container2}>
              <Text>Bottom Sheet Content</Text>
            </View>
          </View>
        </SlidingUpPanel>
      </View>) : null
      }
      

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
    height:60
   
  },
  cardStyle:{
    padding: 10,
    margin: 10,
  },
  arrowCont:{
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
        height: 120,
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
      }

});

export default Book


