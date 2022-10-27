// import React, {useState, useEffect} from 'react';
// import { StyleSheet, Text, View, Button, FlatList, Alert, Modal, Pressable } from 'react-native';
// import { Card, FAB } from 'react-native-paper';
// import Books from '../Books.json';




// const Contents = ( props ) => {
//     const [bookNames, setbookNames] = useState()
//     const [displayContents, setdisplayContents] = useState()

//     useEffect(() => {
//         setbookNames(Books)

//         // loadData();
//         // const willFocusSubscription = props.navigation.addListener('focus', () => {
//         //     loadData();
//         // });

//     }, [])
  
//     const clickedItem = (item) => {
//         // props.sendDataToParent(item)

        
//         // props.navigation.navigate("Chapters", {data:item})

//         props.navigation.navigate("currentBook")
        

//     }




//     const renderData = (item) => {
//         return (
//             // console.log(item['data'].book_title)
//             // onPress = {() => clickedItem(item)}
//             <Card style = {styles.cardStyle} onPress = {() => clickedItem(item)}
//             >
//                 <Text style = {{fontSize:25}}>{item}</Text>
//             </Card>
//           )
//     }
//     // console.log(data)


//     return (
//         <View style={styles.container}>
//             <View style={styles.centeredView}>
//                 <View style={[styles.modalView]}>
//                     <FlatList style={{backgroundColor: 'red', width: 300}}
//                         data={bookNames}
//                         renderItem = {({item}) => {
//                             return renderData(item)
//                         }}
//                         // onRefresh = {() => loadData()} 
//                         // refreshing = {loading}
//                         // keyExtractor = {item => `${item.book_title}`}

//                     />
                    
                    
//                 </View>
//             </View>
            
      
//     </View>
//         // <View style = {{flex:1}}>
//             // <FlatList
//             //     data={data}
//             //     renderItem = {({item}) => {
//             //         return renderData(item)
//             //     }}
//             //     // onRefresh = {() => loadData()} 
//             //     // refreshing = {loading}
//             //     // keyExtractor = {item => `${item.book_title}`}

//             // />
//         // </View> 

//         // null
        
//     )
    
    

  
// }

//     // return (
//     //     <View style={styles.container}>
//     //         <Text> Home Screen</Text>
//     //         <Button
//     //             title='Click Here'
//     //         />
//     //     </View>
//     // )

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#8fcbbc',
//     }
// })
// //     

// // const styles = StyleSheet.create({
// //     cardStyle:{
// //         padding: 10,
// //         margin: 10,
// //     },

// //     fab: {
// //         position: 'absolute',
// //         margin: 16,
// //         right: 0,
// //         bottom: 0,
// //     },
// //     centeredView: {
// //         flex: 1,
// //         justifyContent: "center",
// //         alignItems: "center",
// //         marginTop: 22
// //       },
// //       modalView: {
// //         margin: 20,
// //         backgroundColor: "white",
// //         borderRadius: 20,
// //         padding: 35,
// //         alignItems: "center",
// //         shadowColor: "#000",
// //         shadowOffset: {
// //           width: 0,
// //           height: 2
// //         },
// //         shadowOpacity: 0.25,
// //         shadowRadius: 4,
// //         elevation: 5
// //       },
// //       button: {
// //         borderRadius: 20,
// //         padding: 10,
// //         elevation: 2
// //       },
// //       buttonOpen: {
// //         backgroundColor: "#F194FF",
// //       },
// //       buttonClose: {
// //         backgroundColor: "#2196F3",
// //       },
// //       textStyle: {
// //         color: "white",
// //         fontWeight: "bold",
// //         textAlign: "center"
// //       },
// //       modalText: {
// //         marginBottom: 15,
// //         textAlign: "center"
// //       }
// // })




// export default Contents;