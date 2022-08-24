import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, Modal, Pressable } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import Books from 'C:/Users/mdeis/ProgrammingProjects/bibleApp/ReactNativeBibleApp/Books.json';  
// import * from 'C:/Users/mdeis/ProgrammingProjects/bibleApp/ReactNativeBibleApp/Bible/'; 




const context = require('../Bible/1Chronicles.json');
// console.log(context)

function Home(props) {
    const [data, setData] = useState([])
    // const [loading, setLoading] = useState(true)
    // const customData = require('./Books.json');
    // console.log(Books)
    

    // const loadData = () => {
    //     fetch('./Bible-kjv-master/Books')

    //     .then(resp => resp.text())
    //     .then(text => {
    //         // setData(data) 
    //         // setLoading(false)

    //         // setLoading(false)
    //         console.log('hello')
    //         console.log(data)
    //         // console.log('hello')
    //     })
 
    //     .catch(error => console.log('error')) 

    // }

    // useEffect(() => {
    //     loadData();
    //     // const willFocusSubscription = props.navigation.addListener('focus', () => {
    //     //     loadData();
    //     // });

    // }, [])
    useEffect(() => {
        setData(Books)

        // loadData();
        // const willFocusSubscription = props.navigation.addListener('focus', () => {
        //     loadData();
        // });

    }, [])
    const [modalVisible, setModalVisible] = useState(false);
  
    const clickedItem = (data) => {
        
        props.navigation.navigate("Book", {data:data})

    }




    const renderData = (item) => {
        return (
            // console.log(item['data'].book_title)
            
            <Card style = {styles.cardStyle} onPress = {() => clickedItem(item)}>
                <Text style = {{fontSize:25}}>{item}</Text>
            </Card>
          )
    }
    // console.log(data)


    return (
        <View style={styles.centeredView}>
            <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
        >
            <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
        <Modal
            // animationType="slide"
            dropdownStyle={true}
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView]}>
                    <FlatList style={{backgroundColor: 'red', width: 300}}
                        data={data}
                        renderItem = {({item}) => {
                            return renderData(item)
                        }}
                        // onRefresh = {() => loadData()} 
                        // refreshing = {loading}
                        // keyExtractor = {item => `${item.book_title}`}

                    />
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                    
                </View>
            </View>
        </Modal>
      
    </View>
        // <View style = {{flex:1}}>
            // <FlatList
            //     data={data}
            //     renderItem = {({item}) => {
            //         return renderData(item)
            //     }}
            //     // onRefresh = {() => loadData()} 
            //     // refreshing = {loading}
            //     // keyExtractor = {item => `${item.book_title}`}

            // />
        // </View> 

        // null
        
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

export default Home
