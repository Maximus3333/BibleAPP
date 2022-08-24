import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, Modal, Pressable } from 'react-native';
import { Card, FAB } from 'react-native-paper'; 
// import RNFS from 'react-native-fs';
// import * as Things from '../Bible/';






// function importAll(r) {
//   let images = {};
//   r.keys().map((item, index) => { images[item.replace('../', '')] = r(item); });
//   return images;
// }

// const images = importAll(require('../Bible'));

var requireContext = require('../Bible/CompleteBible.json');
// console.log(requireContext[0])

// var loader = require('../Bible/moduleLoader')
// console.log(loader)


// function importAll(r) {
//   return r.keys().map(r);
// }

// const images = importAll(require.context('./', false, //.(png|jpe?g|svg|json)$/));



function Book(props) {
  const [bookClicked, setBookClicked] = useState([props.route.params.data])
  const [bookChapters, setbookChapters] = useState([])


  // console.log(data)
  // console.log(bibleData)
  // console.log(requireContext[0]["book"])
  useEffect(() => {    
    requireContext.forEach(element => {
      // console.log(element.book) 
      if (bookClicked == element.book) {
        // console.log(element.book)
        setbookChapters(element.chapters)
        // console.log(Object.keys(bookChapters.chapters))
      }
      
    });
  });

  const clickedItem = (data) => {

    data = [] + bookChapters + data 
        
    // props.navigation.navigate("Book", {data:data})

}


  const renderData = (item) => {
    return (
        // console.log(item['data'].book_title)

      
        <Card style = {styles.cardStyle} onPress = {() => clickedItem(item)}>
            <Text style = {{fontSize:25}}>{item}</Text>
        </Card>
      )
}


  return (
    <View style={styles.centeredView}>
            <View style={styles.centeredView}>
                <View style={[styles.modalView]}>
                    <FlatList style={{width: 300}}
                        data={bookChapters}
                        // keyExtractor={(item) => item.chapter}
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

const styles = StyleSheet.create({
  cardStyle:{
      padding: 10,
      margin: 10,
  },

  fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
  },
  centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
})

export default Book