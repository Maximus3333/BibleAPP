import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity  } from 'react-native';
import { Button, ButtonGroup, withTheme, Text } from '@rneui/themed';
import { firebase } from '../firebase'




function ProfileMainScreen(props) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedIndexes, setSelectedIndexes] = useState([0, 2, 3]);
    const CustomTitle = () => {
        return (
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>John Doe</Text>
            <Text style={{ fontStyle: 'italic', fontSize: 12 }}>
              Minister of Magic
            </Text>
          </View>
        );
        };
    const windowWidth = Dimensions.get('window').width;

  return (
    <ScrollView>
      <View style={styles.contentView}>
          <View style={styles.buttonsContainer}>
            <Button
              title="LOG IN"
              buttonStyle={{
                backgroundColor: 'black',
                // borderWidth: 2,
                // borderColor: 'white', 
                // borderRadius: 30,
              }}
              containerStyle={{
                width: windowWidth,
                // marginHorizontal: 50,
                // marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
            />
            <TouchableOpacity
              onPress={()=>{
                firebase.auth().signOut();
              }}
              style={styles.button}
            >
              <Text style={{fontWeight:'bold', fontSize:22}}>Sign Out</Text>
            </TouchableOpacity>
            <Button
              title="HOME"
              icon={{
                name: 'home',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              iconContainerStyle={{ marginRight: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: 'rgba(90, 154, 230, 1)',
                // borderColor: 'transparent',
                // borderWidth: 0,
                // borderRadius: 30,
              }}
              containerStyle={{
                width: windowWidth,
                // marginHorizontal: 50,
                // marginVertical: 10,
              }}
            />
            <Button
              title="BooKMarks"
              icon={{
                name: 'user',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              onPress={() => props.navigation.navigate('bookMarks')}
              iconRight
              iconContainerStyle={{ marginLeft: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: 'rgba(199, 43, 98, 1)',
                // borderColor: 'transparent',
                // borderWidth: 0,
                // borderRadius: 30,
              }}
              containerStyle={{
                width: windowWidth,
                // marginHorizontal: 50,
                // marginVertical: 10,
              }}
            />
            
          </View>
        </View>
    </ScrollView>


  )
}

    
    const styles = StyleSheet.create({
    contentView: {
      flex: 1,
    },
    buttonsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginVertical: 20,
    },
    subHeader: {
      backgroundColor : "#2089dc",
      color : "white",
      textAlign : "center",
      paddingVertical : 5,
      marginBottom : 10
    }
    });

export default ProfileMainScreen