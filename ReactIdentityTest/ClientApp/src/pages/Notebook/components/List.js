import React from 'react';
import Item from './Item'

const List = ({ listData, deleteData, submittingStatus }) => {
    return <div className="list">
        {
            listData.map(item => {
                const { id, note, date, time } = item
                return <Item key={id} id={id} note={note} date={date} time={time} deleteData={deleteData} submittingStatus={submittingStatus} />
            })
        }
    </div>
}

export default List