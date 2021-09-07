import React from 'react';

const Item = ({ id, note, date, time, deleteData, submittingStatus }) => {

    function deleteItem() {
        submittingStatus.current = true
        deleteData(function (prev) {
            return prev.filter(item => item.id !== id)
        })
    }

    return <div className="item">
        <span>{note}</span>
        <span>{`${date} ${time}`}</span>
        <button onClick={deleteItem} className="remove">刪除</button>
    </div>
}

export default Item