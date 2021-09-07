import React from 'react';

const Item = ({ note, date, time }) => {
    return <div className="item">
        <span>{note}</span>
        <span>{`${date} ${time}`}</span>
        <button className="remove">刪除</button>
    </div>
}

export default Item