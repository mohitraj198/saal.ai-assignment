import React from 'react'
import TableRow from './TableRow'
import TableHead from './TableHead'


const Table = ({ users, loading }) => {
    const tableHead = ["", "Name", "Email", "DOB", "Address", "Phone"]

    return (
        <table>
            <TableHead
                tableHead={tableHead}
            />
            {loading
                ? <div className="loader"></div>
                : <tbody>
                    {
                        users && users.map(user =>
                            <TableRow
                                user={user}
                            />)
                    }
                </tbody>}
        </table>
    )
}

export default Table
