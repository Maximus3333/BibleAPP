import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';


function TableOfContentsForVerses(props) {
    const [bookClicked, setBookClicked] = useState([])
    const [chapterClicked, setchapterClicked] = useState([])
    const [clickedVersesLen, setClickedVersesLen] = useState(0)

    useEffect(() => {    
        if (props.route.params) {
            setBookClicked(props.route.params.bookClicked)
            setchapterClicked(props.route.params.chapterClicked)
            setClickedVersesLen(props.route.params.chapVersLength)
        }
    }, [props]);

    let array = []

    if (parseInt(clickedVersesLen)!==0){ 
        let b = 0
        for (let i = 1; i <= parseInt(clickedVersesLen); i++) {
            array.push({i})
        }
    }
    

    const clickedItem = (item) => {
        let verseClicked = item.i
        props.navigation.navigate("currentBook", {bookClicked, chapterClicked, verseClicked} )

    }
    
    return (
        <View >
            <FlatList
            data={array}
            horizontal={false}
            numColumns={7}
            contentContainerStyle={{alignItems : 'flex-start', width:"100%", }}

            renderItem={({ item }) => <View><Text style={{marginLeft: 3, padding: 8, height:52, width:55}} onPress = {() => clickedItem(item)} >{item.i}</Text></View>}
            >
            </FlatList>
        </View>
    )
}

export default TableOfContentsForVerses

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#8fcbbc',
    }
})