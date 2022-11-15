import AsyncStorage from '@react-native-async-storage/async-storage';

// Stores last Book and chapter user was on
const getHighlightedVerses = async () => {
    try {
        let highlights = await AsyncStorage.getItem('highlights');
        return highlights != null ? JSON.parse(highlights) : null;
        
    } catch (error) {
        
    }
}

const saveHighlightedVerse = async (key, book, chapter, verseItem, color) => {
    try {
        if (key == 'highlights') {
            let getHighlightedVerse = await AsyncStorage.getItem('highlights');
            getHighlightedVerse = JSON.parse(getHighlightedVerse)

            if (getHighlightedVerse){
                if (getHighlightedVerse[book]) {
                    if (getHighlightedVerse[book][chapter]) {
                        getHighlightedVerse[book][chapter][verseItem.verse] = color
                    }else getHighlightedVerse[book][chapter] = {[verseItem.verse]:color}
                }else getHighlightedVerse[book] = {[chapter]: {[verseItem.verse]: color}}
                await AsyncStorage.setItem(key, JSON.stringify(getHighlightedVerse));
                console.log(getHighlightedVerse, verseItem, "yeyeyeyyeye")
                return getHighlightedVerse

                // return getHighlightedVerse
            }else {
                let highlightedVersesObject = {
                    [book]: {
                        [chapter]: {
                            [verseItem.verse]: color
                        }
                    }
                }
                console.log(highlightedVersesObject);
                await AsyncStorage.setItem(key, JSON.stringify(highlightedVersesObject));
                return highlightedVersesObject
                // return highlightedVersesObject

            }
        
            // console.log(getHighlightedVerse, "yoyou");
            

        }
      
      
    } catch (error) {
      console.log(error)
      
    }
  }

  export {getHighlightedVerses, saveHighlightedVerse};