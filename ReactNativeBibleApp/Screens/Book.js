import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, Modal, Pressable } from 'react-native';
import { Card, FAB } from 'react-native-paper'; 


var requireContext = require('../Bible/CompleteBible.json');


function Book(props) {
  const [bookClicked, setBookClicked] = useState([props.route.params.data[0]])
  const [chapterClicked, setchapterClicked] = useState([props.route.params.data[1]])
  const [chapterClickedVerses, setchapterClickedVerses] = useState([])


  // console.log(chapterClicked)

  useEffect(() => {    
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
  });

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
        renderItem={({ item }) => <Card style = {styles.cardStyle}>
                                    <Text style={styles.item}>{item.text}</Text>
                                </Card> }
        keyExtractor={(item) => item.text}
        ItemSeparatorComponent={myItemSeparator}
        ListEmptyComponent={myListEmpty}
        ListHeaderComponent={() => (
            
          <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold',textDecorationLine: 'underline' }}>
            {`${bookClicked} Chapters`} </Text>
        )}
        ListFooterComponent={() => (
          <Text style={{ fontSize: 30, textAlign: "center",marginBottom:20,fontWeight:'bold' }}>End of Chapters</Text>
        )}
      />
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
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
});

export default Book