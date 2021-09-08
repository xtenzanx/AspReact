import React from 'react';
import { useState } from 'react'
import { v4 } from 'uuid'

const Edit = ({ add, submittingStatus }) => {

    const [note, setNote] = useState("")
    function noteChange(e) {
        setNote(e.target.value)
    }

    const [date, setDate] = useState("")
    function dateChange(e) {
        setDate(e.target.value)
    }

    const [time, setTime] = useState("")
    function timeChange(e) {
        setTime(e.target.value)
    }

    console.log(note, date, time)

    function addItem() {
        submittingStatus.current = true
        add(function (prevData) {
            return [{
                id: v4(),
                note,
                date,
                time
            }, ...prevData]
        })
    }

    return <div className="edit">
        <h1>備忘錄</h1>
        <div>
            <div className="form-group">
                <label>記事:</label>
                <input type="text" className="form-control" value={note} onChange={noteChange} />
            </div>
            <div className="form-group">
                <label>日期:</label>
                <input type="date" className="form-control" value={date} onChange={dateChange} />
            </div>
            <div className="form-group">
                <label>時間:</label>
                <input type="time" className="form-control" value={time} onChange={timeChange} />
            </div>
        </div>
        <button onClick={addItem} className="add btn btn-primary">新增</button>
    </div>
}

export default Edit