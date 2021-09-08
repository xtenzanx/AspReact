import React from 'react';

const Item = ({ id, note, date, time, deleteData, submittingStatus }) => {

    function deleteItem() {
        submittingStatus.current = true
        deleteData(function (prev) {
            return prev.filter(item => item.id !== id)
        })
    }

    return <div className="item">
        <span className="mr-4">{note}</span>
        <span className="mr-4">{`${date} ${time}`}</span>
        <button onClick={deleteItem} className="remove btn btn-danger">刪除</button>
    </div>
}

export default Item