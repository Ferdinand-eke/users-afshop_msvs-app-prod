import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';

export const useRouteData = () => {
    const [getUrlString, setGetUrlString] = useState('')
    const [getUrlStringError, setGetUrlStringError] = useState('')

    const [getRootUrlString, setGeRoottUrlString] = useState('')
    let location = useLocation();

    const URL = location?.pathname;
  
    const urlArray = URL.split('/')
  

    useEffect(() =>{
        if(URL){
            const urlArray = URL.split('/')
            setGetUrlString(urlArray[1])
            setGeRoottUrlString(URL)
        }else{
            setGetUrlStringError('No URL passed')
        }
    },[
        URL,
    ])
  return {getUrlString, getUrlStringError, getRootUrlString}
}
