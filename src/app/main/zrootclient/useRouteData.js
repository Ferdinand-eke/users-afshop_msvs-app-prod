import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';

export const useRouteData = () => {
    const [getUrlString, setGetUrlString] = useState('')
    const [getUrlStringError, setGetUrlStringError] = useState('')
    let location = useLocation();

    // console.log("URL",location?.pathname);
    const URL = location?.pathname;
  
    const urlArray = URL.split('/')
  
    // console.log("URL_ARRAY",urlArray);
  
    // console.log("URL_ARRAY_22",urlArray[1]);

    useEffect(() =>{
        if(URL){
            const urlArray = URL.split('/')
            setGetUrlString(urlArray[1])
        }else{
            setGetUrlStringError('No URL passed')
        }
    },[
        URL,
    ])
  return {getUrlString, getUrlStringError}
}
