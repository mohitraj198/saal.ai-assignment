import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import queryString from 'query-string';
import Pagination from '../../components/Pagination'
import Searchbar from '../../components/Searchbar'
import ListItem from '../../components/ListItem'
import { userDataApi } from "../../services/User"

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
        const userData = await userDataApi(currentPage)

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

            <div className="users-list">
                {loading
                    ? <div className="loader"></div>
                    : searchUsers.map((user) => (
                        <ListItem
                            key={user.name.first + user.name.last}
                            user={user}
                        />
                    ))
                }
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