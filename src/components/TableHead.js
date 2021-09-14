import React from 'react'

const TableHead = ({ tableHead }) => {
    return (
        <thead>
            <tr>
                {
                    tableHead.map(head => <th key={head}>{head}</th>)
                }
            </tr>
        </thead>
    )
}

export default TableHead
