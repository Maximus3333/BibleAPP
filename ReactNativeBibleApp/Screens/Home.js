import React, {useState, useEffect} from 'react';
import Contents from './tableOfContents';




// console.log(context)

function Home({sendDataToParent}) {
    return(
        <Contents sendDataToParent={sendDataToParent}/>
    )
}
    

export default Home
