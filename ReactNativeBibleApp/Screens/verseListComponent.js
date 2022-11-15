import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, Button, ScrollView, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { getHighlightedVerses, saveHighlightedVerse } from '../reusableComponents/saveHighlightedVerses';

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

  // TODO: better default object for highlighted or change the way we access it
  const highlighted = () => {
    try {
      return _highlighted[props.currentBook][props.chapterClicked]
    } catch (error) {
      console.log("no highlights");
    }

  };

  var oldHighlighted = highlighted();

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
    let tempColor = 'white';
    if (oldHighlighted) {
      try {
        if (oldHighlighted[item.verse]) {
          tempColor = oldHighlighted[item.verse];
        }
      } catch (error) {
        console.log(error);
      }
    }
    return (<TouchableOpacity
      activeOpacity={.7}
      onPress={() => { selectVerse(item); }}

    >
      <Text style={{
        padding: 5,
        fontSize: 15,
        marginTop: 5,
        height: 60,
        backgroundColor: tempColor,
      }}>{item.text}</Text>
    </TouchableOpacity>);
  }

  const updateHighlights = async (selectedColor) => {
    for (let verse of clickedOnVersesArray) {
      var newHighlightedVerse = await saveHighlightedVerse('highlights', props.currentBook, props.chapterClicked, verse, selectedColor).then((highlights) => {
        return highlights;
      })
      setHighlighted(newHighlightedVerse);
    }
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

  console.log(clickedOnVersesArray.length>0, "before component is rendered")

  const shouldShowPopup = clickedOnVersesArray.length > 0;

  return <>

    <FlatList style={{ height: 100, padding: 10 }}
      data={props.verses}
      renderItem={renderItem}
      keyExtractor={(item) => item.verse}
      ListEmptyComponent={myListEmpty}

      ListFooterComponent={() => (
        <Text style={{ fontSize: 30, textAlign: "center", marginBottom: 20, fontWeight: 'bold' }}>End of Chapters</Text>
      )}

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
  const colors = ['#E0A6AA', '#A8F29A', '#A5F7E1', '#DBE1F1', '#EDDD6E', '#F8FD89', '#96ADFC', '#B987DC', '#FF8787', '#B5FE83']
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
  console.log(props.shouldShow, "inside utility shuld show");
  
  var shouldShow = props.shouldShow
  

  // const shareVerse = () => {
  //   return async () => {
  //     try {
  //       const uri = verseTextClickedUSEDINSHARED;
  //       await Share.share(
  //         {
  //           title: 'test title',
  //           message: uri,
  //         }
  //       );

  //     } catch (error) {
  //       console.log(error);

  //     }
  //   };
  // }
  // alert(props.shouldShow)
  // console.log(props.shouldShow);

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
      {/* <Button title='Share' onPress={() => { shareVerse(); }}></Button> */}
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