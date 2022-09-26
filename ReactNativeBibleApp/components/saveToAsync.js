import AsyncStorage from '@react-native-async-storage/async-storage';


const saveBookData = async (key, item) => {
    try {
        if (key == 'chapter') {
            await AsyncStorage.setItem(key, JSON.stringify(item));

        }else {
            console.log(key, item)
            await AsyncStorage.setItem(key, item, () => {
                console.warn('Stored data!')
            })

        }
      
      
    } catch (error) {
      console.log(error)
      
    }
  }

  export {saveBookData};