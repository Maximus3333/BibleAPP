import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, Modal, Pressable } from 'react-native';
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



function Chapters(props) {
  const [bookClicked, setBookClicked] = useState([props.route.params.data])
  const [bookChapters, setBookChapters] = useState([])


  // console.log(data)
  // console.log(bibleData)
  // console.log(requireContext[0]["book"])
  let totalChapters = {}
  useEffect(() => {    
    requireContext.forEach(element => {
      // console.log(element.book) 
      
      // array[element.book] = element.chapters.length
      // console.log(array)
      if (bookClicked == element.book) {
        // console.log(element.book)
        setBookChapters(element.chapters)
        // settotalChapters(bookChapters.length)
        // console.log(bookChapters.length)
        // console.log(bookChapters);
        // console.log(Object.keys(bookChapters.chapters))
      }
      
    });
    // setTotalChapter(array) 
  });
  
  requireContext.forEach(element => {
    totalChapters[element.book] = element.chapters.length


  });


  const clickedItem = (data) => {
    let arrayData = []
    // data = [] + data
    arrayData.push(bookClicked[0], data, totalChapters)
    // console.log(data)
        
    props.navigation.navigate("Book", {data:arrayData})

}


//   const renderData = (item) => {
//     return (
//         // console.log(item['data'].book_title)

      
//         <Card style = {styles.cardStyle} onPress = {() => clickedItem(item)}>
//             <Text style = {{fontSize:25}}>{"yes"}</Text>
//         </Card>
//       )
// }
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
    // <View style={styles.container}>
    //   {bookChapters.map((chapter) => {
    //     console.log(chapter.chapter)
    //       return (
    //         <View>
    //           <Text style={styles.item}>{chapter.chapter}</Text>
    //       </View>
    //       );
    //     })}
    //         {/* <View style={styles.centeredView}>
    //             <View style={[styles.modalView]}>
    //                 <FlatList style={{width: 300}}
    //                     data={bookChapters}
    //                     // keyExtractor={(item) => item.chapter}
    //                     renderItem = {({item}) => {
    //                         return renderData(item)
    //                     }}
    //                     // onRefresh = {() => loadData()} 
    //                     // refreshing = {loading}
    //                     // keyExtractor = {item => `${item.book_title}`}

    //                 />
                    
    //             </View>
    //         </View>       */}
    // </View>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={bookChapters}
        renderItem={({ item }) => <Card style = {styles.cardStyle} onPress = {() => clickedItem(item.chapter)}>
                                    <Text style={styles.item}>{item.chapter}</Text>
                                </Card> }
        keyExtractor={(item) => item.chapter}
        ItemSeparatorComponent={myItemSeparator}
        ListEmptyComponent={myListEmpty}
        ListHeaderComponent={() => (
            
          <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold',textDecorationLine: 'underline' }}>
            {`${bookClicked} Chapters`} </Text>
        )}
        ListFooterComponent={() => (
          <Text style={{ fontSize: 30, textAlign: "center",marginBottom:20,fontWeight:'bold' }}>End of Chapter</Text>
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

export default Chapters