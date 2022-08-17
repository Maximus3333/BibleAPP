import React, {useState, useEffect} from 'react';
// import RNFS from 'react-native-fs';

function Book(props) {
  const [data, setData] = useState([props.route.params.data])

//   const [file, setFile] = useState([])
//   const [downloadsFolder, setDownloadsFolder] = useState('');
//   const [documentsFolder, setDocumentsFolder] = useState('');
//   const [externalDirectory, setExternalDirectory] = useState('');
//   useEffect(() => {
//     //get user's file paths from react-native-fs
//     setDownloadsFolder(RNFS.DownloadDirectoryPath);
//     setDocumentsFolder(RNFS.DocumentDirectoryPath); //alternative to MainBundleDirectory.
//     setExternalDirectory(RNFS.ExternalStorageDirectoryPath);
//   }, []);
//   return (
//     <SafeAreaView>
//       <Text> Downloads Folder: {downloadsFolder}</Text>
//       <Text>Documents folder: {documentsFolder}</Text>
//       <Text>External storage: {externalDirectory}</Text>
//     </SafeAreaView>
//   );
  

    // console.log(data)

  useEffect(() => {
    const data3 = '../Bible/' + data + `.json`;
    console.log(data3)
    const customData = require(data3);



  //   setData(props.route.params.data)
  //   // var data3 = data + `.json`;
  //   // var data4 = `C:/Users/mdeis/ProgrammingProjects/bibleApp/ReactNativeBibleApp/Bible-kjv-master/` + data3
  //   // var customData = require(data4);

  //   // loadData();
  //   // const willFocusSubscription = props.navigation.addListener('focus', () => {
  //   //     loadData();
  //   // });
  //   console.log(data)

  }, [])

  // console.log(data)
  // console.log('hero')
  // console.log(data.length)
  // if (data.length != 0) {
  //   var data3 = data + `.json`;
  //   var data4 = `C:/Users/mdeis/ProgrammingProjects/bibleApp/ReactNativeBibleApp/Bible-kjv-master/` + data3
  //   var customData = require(data4); 
  //   console.log(data4)

  // } 

        // const list = []
        // var data3 = props.route.params.data + `.json`;
        // var data = `C:/Users/mdeis/ProgrammingProjects/bibleApp/ReactNativeBibleApp/Bible-kjv-master/` + data3
        // console.log(data)


        // const fileList = 'Jude.json'; //files list in public folder
        // var data2 = `C:/Users/mdeis/ProgrammingProjects/bibleApp/ReactNativeBibleApp/Bible-kjv-master/Daniel.json`

        // console.log(data)  
        // console.log(data2) 
        // list.push(data2)

        // if (data3 == String) {
        //     var customData = require(data); 

        // }
        // var customData = require(data2); 
        
        // console.log(data3)
        // console.log(customData)

        // console.log(data)
        // fileList.forEach(filename => {
        // fetch(`C:/Users/mdeis/ProgrammingProjects/bibleApp/ReactNativeBibleApp/Bible-kjv-master/${filename}.json`).then(response => {
        //     return response.json() //parse json
        // }).then(data => {
        //     setFileData(files => [...files, {[filename]:data}]); // pushing json data by key of filename
        //     console.log(data)
        // } 
        //     )
        // var customData = require(`C:/Users/mdeis/ProgrammingProjects/bibleApp/ReactNativeBibleApp/Bible-kjv-master/Daniel.json`); 
        // var data = `C:/Users/mdeis/ProgrammingProjects/bibleApp/ReactNativeBibleApp/Bible-kjv-master/${filename}`
        // var data2 = `C:/Users/mdeis/ProgrammingProjects/bibleApp/ReactNativeBibleApp/Bible-kjv-master/Daniel.json`
        // // console.log(data) 
        // // console.log(data2) 
        // // list.push(data2)

        // var customData = require(data); 
        // console.log(customData)
        
    // })
    // var customData = require(list[0]);
    // console.log(list[0]) 
    // var d = list[0]
    // var customData = require(d);



    // const [fileData, setFileData] = useState([])
    // useEffect(()=>{
    //     const fileList = ['Jude.json']; //files list in public folder
    //     fileList.forEach(filename => {
    //     // fetch(`C:/Users/mdeis/ProgrammingProjects/bibleApp/ReactNativeBibleApp/Bible-kjv-master/${filename}.json`).then(response => {
    //     //     return response.json() //parse json
    //     // }).then(data => {
    //     //     setFileData(files => [...files, {[filename]:data}]); // pushing json data by key of filename
    //     //     console.log(data)
    //     // } 
    //     //     )
    //     // var customData = require(`C:/Users/mdeis/ProgrammingProjects/bibleApp/ReactNativeBibleApp/Bible-kjv-master/Daniel.json`); 
    //     var data = `C:/Users/mdeis/ProgrammingProjects/bibleApp/ReactNativeBibleApp/Bible-kjv-master/${filename}.json`
    //     var data2 = `C:/Users/mdeis/ProgrammingProjects/bibleApp/ReactNativeBibleApp/Bible-kjv-master/Daniel.json`
    //     console.log(typeof(data)) 
    //     console.log(typeof(data2)) 

    //     var customData = require(data); 

    //     // console.log(`${filename}.json`)
    //     })
    // },[])
    // console.log(items)
  return (
    // <div>Book</div>
    null
  )
}

export default Book