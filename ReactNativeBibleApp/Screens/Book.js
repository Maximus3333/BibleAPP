import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, Modal, Pressable } from 'react-native';
import { Card, FAB } from 'react-native-paper'; 
import { Icon } from 'react-native-elements';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Books from 'C:/Users/mdeis/ProgrammingProjects/bibleApp/ReactNativeBibleApp/Books.json';  




var requireContext = require('../Bible/CompleteBible.json');


function Book(props) {
  const [bookClicked, setBookClicked] = useState([props.route.params.data[0]])
  const [chapterClicked, setchapterClicked] = useState([props.route.params.data[1]])
  const [chapterClickedVerses, setchapterClickedVerses] = useState([])
  const totalChapters = props.route.params.data[2]



  // console.log(totalChapters)



  const indexOfBook = parseInt(Books.findIndex(object => object == bookClicked ))




  // console.log(chapterClicked)
  const loadVerses = () => {
    requireContext.forEach(element => {
      // console.log(element.book) 
      if (bookClicked == element.book) {
        // console.log(element.book)
        element.chapters.forEach(element2 => {
          // console.log(element2.chapter)
          if (element2.chapter == chapterClicked) {
            // console.log(element2)
            setchapterClickedVerses(element2.verses)
          }
        })
        if (element.chapters.chapter == chapterClicked) {
          null
        }
        // console.log(bookChapters);
        // console.log(Object.keys(bookChapters.chapters))
      }
      
      
    });
  }

  useEffect(() => {    
    loadVerses()
  });
  const arrowClick  = (leftOrRight) => {
    if (parseInt(chapterClicked) == 1 & leftOrRight == 'left') {
      const prevBook = Books[indexOfBook-1]
      setchapterClicked(totalChapters[prevBook])
      console.log(totalChapters[prevBook])
      setBookClicked(prevBook)

    }else if (parseInt(chapterClicked) == totalChapters[bookClicked] & leftOrRight == 'right') {
      const nextBook = Books[indexOfBook+1]
      setchapterClicked(1)
      console.log(totalChapters[nextBook])
      setBookClicked(nextBook)

    }else if (leftOrRight == 'left') {

      setchapterClicked(parseInt(chapterClicked)-1)
      // console.log(parseInt(chapterClicked))
      

    } else if (leftOrRight == 'right') {
      setchapterClicked(parseInt(chapterClicked)+1)
    }
    loadVerses()
    console.log(chapterClicked)
    
  }

  console.log()
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

  

  


  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chapterClickedVerses}
        renderItem={({ item }) => 
                                    <Text style={styles.item}>{item.text}</Text>
                                }
        keyExtractor={(item) => item.text}
        ListEmptyComponent={myListEmpty}
        ListHeaderComponent={() => (
            
          <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold',textDecorationLine: 'underline' }}>
            {`${bookClicked} Chapter: ${chapterClicked}`} </Text>
        )}
        ListFooterComponent={() => (
          <Text style={{ fontSize: 30, textAlign: "center",marginBottom:20,fontWeight:'bold' }}>End of Chapters</Text>
        )}
      />
      <View style={styles.arrowCont}>
        <Icon name="arrow-left" size={20} color="black" onPress = {() => arrowClick('left')} type="entypo" />
        <Icon name="arrow-right" size={20} color="black" onPress = {() => arrowClick('right')} type="entypo" />
      </View>
      

    </SafeAreaView>

  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 5,
    fontSize: 15,
    marginTop: 5,
   
  },
  cardStyle:{
    padding: 10,
    margin: 10,
  },
  arrowCont:{
    flexDirection: 'row',
    justifyContent: 'space-around'

    


  }
});

export default Book