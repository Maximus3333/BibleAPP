import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, Button, ScrollView, TouchableOpacity, Share } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { getHighlightedVerses, saveHighlightedVerse } from '../reusableComponents/saveHighlightedVerses';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  GentiumBasic_400Regular,
  GentiumBasic_400Regular_Italic,
  GentiumBasic_700Bold,
  GentiumBasic_700Bold_Italic,
} from '@expo-google-fonts/gentium-basic';

import { NativeViewGestureHandler } from 'react-native-gesture-handler';

const myListEmpty = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.item}>No data found</Text>
    </View>
  );
};


function BookVersesListComponent(props) {
  const [_highlighted, setHighlighted] = useState(null)
  const [clickedOnVersesArray, setClickedOnVersesArray] = useState([])
  let [fontsLoaded] = useFonts({
    GentiumBasic_400Regular,
    GentiumBasic_400Regular_Italic,
    GentiumBasic_700Bold,
    GentiumBasic_700Bold_Italic,
  });

  // TODO: better default object for highlighted or change the way we access it
  const highlighted = (() => {
    try {
      return _highlighted[props.currentBook][props.chapterClicked]
    } catch (error) {
      console.log("no highlights");
    }

  })();

  const sheetRef = useRef();
  function selectVerse(item) {
    const indexOfVerse = clickedOnVersesArray.indexOf(item);

    if(indexOfVerse == -1){
      setClickedOnVersesArray([...clickedOnVersesArray, item]);
    }else{
      let selectedVerseRep = JSON.parse(JSON.stringify(clickedOnVersesArray))
      selectedVerseRep.splice(indexOfVerse, 1);
      setClickedOnVersesArray(selectedVerseRep);
    }
  }

  const renderItem = ({ item }) => {
    let tempColor = 'black';
    if (highlighted) {
      try {
        if (highlighted[item.verse]) {
          tempColor = highlighted[item.verse];
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (!fontsLoaded) {
      return <AppLoading />;
    }else {
    return (<TouchableOpacity
      activeOpacity={.7}
      onPress={() => { selectVerse(item); }}

    >
      <Text style={{
        paddingLeft: 8,
        paddingRight: 8,

        fontSize: 18,
        fontFamily: 'GentiumBasic_400Regular', 
        lineHeight:30,
        // marginTop: 5,
        // height: 60,
        justifySelf: 'center',

        color: tempColor,
      }}>{item.verse}{'\t'}{item.text}</Text>
    </TouchableOpacity>);
    }
  }

  const updateHighlights = async (selectedColor) => {
    for (let verse of clickedOnVersesArray) {
      let prevColor = ''
      try {
        if (highlighted[verse.verse]){
          prevColor = highlighted[verse.verse]
          if (selectedColor == prevColor) selectedColor = 'white'
        }
      } catch (error) {
        console.log(error);
      }
      var newHighlightedVerse = await saveHighlightedVerse('highlights', props.currentBook, props.chapterClicked, verse, selectedColor)
      // .then((highlights) => {
      //   return highlights;
      // })
      // setHighlighted(newHighlightedVerse);
    }
    await getHighlightedVersesAsync()
    setClickedOnVersesArray([])
  }

  const getHighlightedVersesAsync = () => {
    getHighlightedVerses().then((highlights) => {
      setHighlighted(highlights)
    })
  };

  useEffect(() => {
    getHighlightedVersesAsync()
  }, [])
  console.log(props.onBookmarkCallBack, "yoooooo");


  const shouldShowPopup = clickedOnVersesArray.length > 0;

  return <>

    <FlatList 
      style={{paddingTop: (45), backgroundColor: "#FFFFFF"}}
      data={props.verses}
      renderItem={renderItem}
      keyExtractor={(item) => item.verse}
      ListEmptyComponent={myListEmpty}

      ListFooterComponent={() => (
        <Text style={{ fontSize: 30, textAlign: "center", marginBottom: 20, fontWeight: 'bold' }}>End of Chapters</Text>
      )}
      scrollEventThrottle={16}
      onScroll= {props.onScroll}

    />

    <BottomUtilitySheetComponent
      sheetRef={sheetRef}
      shouldShow={shouldShowPopup}
      clickedOnVersesArray={clickedOnVersesArray}
      onBookmarkCallBack={props.onBookmarkCallBack}
      updateHighlights={updateHighlights}
       />
  </>
}

function RenderCircles(props) {
  const circles = [];
  const colors = ['#D08F90', '#294A3A', '#EDDD6E', '#966E41', '#96ADFC', '#B987DC', '#FF8787', '#B5FE83']
  for (let i = 0; i < 10; i++) {
    // Try avoiding the use of index as a key, it has to be unique!
    circles.push(
      <TouchableOpacity key={colors[i]} activeOpacity={.7} onPress={() => props.updateHighlights(colors[i])}>
        <View style={{ width: 50, height: 50, borderRadius: 50 / 2, backgroundColor: colors[i], margin: 5 }} />
      </TouchableOpacity>
    );
  }
  return circles;
}

function BottomUtilitySheetComponent(props) {
  //const [shouldShow, setShouldShow] = useState(props.shouldShow);
  
  var shouldShow = props.shouldShow
  
  const shareVerse = async () => {
      let versesString = ""

      props.clickedOnVersesArray.sort()
      for (let verseItem of props.clickedOnVersesArray) {
        versesString = versesString + verseItem.text + " " 
      }
      try {
        const uri = versesString
        await Share.share(
          {
            title: 'test title',
            message: uri,
          }
        );

      } catch (error) {
        console.log(error);

      }
  }

  return props.shouldShow ? <BottomSheet
    ref={props.sheetRef}
    index={0}
    snapPoints={["40%"]}
    enablePanDownToClose={true}
    onAnimate={(a)=>{
      if(a==0){
        shouldShow = false;
      }
    }}
  >
    <BottomSheetView>
      <Button title='BookMark' onPress={() => {
        let verse_nums = [];
        for (let i = 0; i < props.selectedVerse.length; i++) {
          verse_nums.push(parseInt(props.selectedVerse[i].verse));
        }
        verse_nums.sort();
        
        let flag = true;
        for (let i = 0; i < verse_nums.length - 1; i++) {
          if (verse_nums[i + 1] - verse_nums[i] != 1) {
            flag = false;
          }
        }

        // TODO: Wire up create bookmark after refactoring this component. Call bacck function.
        if (flag == true) {
          props.bookmarkCallback(props.selectedVerse)
        } else {
          alert("verses not in order");
        }
      }}></Button>
      <Button title='Share' onPress={() => { shareVerse(); }}></Button>
      <NativeViewGestureHandler disallowInterruption={true}>

        <ScrollView horizontal={true}>
          <RenderCircles updateHighlights={props.updateHighlights}/>
          <Text>hiiiii</Text>
        </ScrollView>
      </NativeViewGestureHandler>
    </BottomSheetView>
  </BottomSheet>: null
}

const styles = StyleSheet.create({
  item: {
    padding: 5,
    fontSize: 15,
    marginTop: 5,
    height: 60

  },
});

export { BookVersesListComponent }