import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import queryString from 'query-string';
import Pagination from '../../components/Pagination'
import Searchbar from '../../components/Searchbar'
import { getUsers } from "../../services/user"
import Table from '../../components/Table';

const Users = () => {
    const history = useHistory()
    const location = history.location
    const query = queryString.parse(location.search);
    const page = Number(query.page)

    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(page ? page : 1)
    const [loading, setLoading] = useState(true)
    const [searchUsers, setSearchUsers] = useState([])

    const fetchUserData = async () => {
        setLoading(true)
        const userData = await getUsers(currentPage)

        if (userData) {
            setUsers(userData)
            setSearchUsers(userData)
        }

        setLoading(false)
    }

    useEffect(() => {
        history.push(`?page=${currentPage}`);
        fetchUserData()
    }, [currentPage])

    return (
        <div className="users-container">

            <Searchbar
                users={users}
                setSearchUsers={setSearchUsers}
            />

            <div className="users-list-container">
                <Table
                    users={searchUsers}
                    loading={loading}
                />
            </div>

            <div className="pagination">
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default Users
