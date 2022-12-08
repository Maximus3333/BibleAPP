

import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Button } from 'react-native';


function BookHeader(props) {
    console.log(props, 'gogo');
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button}
            onPress={() => props.navigation.navigate('navigateBible')}
        >   
            <Text>{props.currentBook} {props.currentChapter}</Text>


        </TouchableOpacity>
    </View>
    
  )
}

export default BookHeader

const styles = StyleSheet.create({
    container: {
        position:"absolute",
        backgroundColor: "#FFFFFF",
        top:0,
        left:0,
        right:0,
        flexDirection:"row",
        justifyContent:"space-between",
        // alignContent: 'center',
        elevation:4,
        height: 50,
        borderBottomWidth: .7,
        borderBottomColor: "#F4EAD5"
    },
    button: {
        padding: 5,
        marginLeft: 15,
        borderRadius: 10,
        // height: 30,
        alignSelf: 'center',
                // color: "black"
        backgroundColor: "#DDDDDD"
    }


})
