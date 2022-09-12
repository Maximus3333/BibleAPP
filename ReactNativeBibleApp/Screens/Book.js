import React, {useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Card, FAB } from 'react-native-paper'; 
import { Icon } from 'react-native-elements';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Books from 'C:/Users/mdeis/ProgrammingProjects/bibleApp/ReactNativeBibleApp/Books.json';  




var bibleJson = require('../Bible/CompleteBible.json');



function Book(props) {
  const [bookClicked, setBookClicked] = useState('Matthew')
  const [chapterClicked, setchapterClicked] = useState(1)
  const [chapterClickedVerses, setchapterClickedVerses] = useState([])
  const totalChapters = []
  const [shouldShow, setShouldShow] = useState(false);



  // console.log(totalChapters)



  const indexOfBook = parseInt(Books.findIndex(object => object == bookClicked ))



  bibleJson.forEach(element => {
    totalChapters[element.book] = element.chapters.length


  });
  // console.log(chapterClicked)
  const loadVerses = () => {
    bibleJson.forEach(element => {
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
    if (props.route.params) {

      setBookClicked(props.route.params.bookClicked)
      props.sendDataToParent(props.route.params.bookClicked)
      setchapterClicked(props.route.params.chapterClicked)
      loadVerses()
    }
    // console.log(props.route.params)

  }, [props]);
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

  
  const {height} = Dimensions.get('window')
  const windowWidth = Dimensions.get('window').width;

  const onPress = () => setShouldShow(!shouldShow);

  
  

  


  
  return (
    <SafeAreaView style={styles.container}
                  // onPress={onPress}
    >
      <FlatList style={{height:100, padding: 10}}
        data={chapterClickedVerses}
        renderItem={({ item }) =>  <TouchableOpacity
                                    activeOpacity={.7}
                                    onPress={onPress}
                                    >
                                    <Text style={styles.item}>{item.text}</Text>
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
              <Text style={{color: '#FFF'}}>Bottom Sheet Peek</Text>
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



// const styles = {
//   container2: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   panel: {
//     flex: 1,
//     backgroundColor: 'white',
//     position: 'relative'
//   },
//   panelHeader: {
//     height: 120,
//     backgroundColor: '#b197fc',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   favoriteIcon: {
//     position: 'absolute',
//     top: -24,
//     right: 24,
//     backgroundColor: '#2b8a3e',
//     width: 48,
//     height: 48,
//     padding: 8,
//     borderRadius: 24,
//     zIndex: 1
//   }
// }

// export default class MyComponent extends React.Component {

//   click  = () => {
//     this._panel.props.draggableRange.bottom = 120
//     console.log(this._panel.props.draggableRange.bottom)
//     // console.log(u)

//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text onPress={this.click}>Hello world</Text>
//         <SlidingUpPanel
          
//           draggableRange={{top: height / 2.75, bottom: 120}}
//           animatedValue={this._draggedValue}
//           showBackdrop={false}>
//           <View style={styles.panel}>
//             <View style={styles.panelHeader}>
//               <Text style={{color: '#FFF'}}>Bottom Sheet Peek</Text>
//             </View>
//             <View style={styles.container}>
//               <Text>Bottom Sheet Content</Text>
//             </View>
//           </View>
//         </SlidingUpPanel>
//       </View>
//     )
//   }
// }

// AppRegistry.registerComponent('navigation', () => MyComponent)