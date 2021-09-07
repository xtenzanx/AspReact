import React from 'react';
import { useState, useEffect, useRef } from 'react'
import { API_GET_DATA } from '../../global/constants'

import Edit from './components/Edit'
import List from './components/List'
import './index.css'

async function fetchData(setData) {
    const res = await fetch(API_GET_DATA)
    const data = await res.json()
    console.log(data);
    setData(data)
}

async function fetchSetData(data) {
    await fetch('weatherforecast/SavePosts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

const Notebook = () => {
    const [data, setData] = useState([]);
    const submittingStatus = useRef(false);

    //儲存資料
    useEffect(() => {
        console.log('submittingStatus = ' + submittingStatus.current)
        if (!submittingStatus.current) {
            return
        }
        fetchSetData(data)
            .then(data => submittingStatus.current = false)
    }, [data])

    //讀取資料
    useEffect(() => {
        fetchData(setData)
    }, [])

    return <div className="app">
        <Edit add={setData} submittingStatus={submittingStatus} />
        <List listData={data} deleteData={setData} submittingStatus={submittingStatus} />
    </div>
}

export default Notebook