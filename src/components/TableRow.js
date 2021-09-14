import React, { useState } from 'react'
import ImageLightbox from "./ImageLightbox"
import Modal from "./Modal"
import UserDetails from "./UserDetails"

const TableRow = ({ user }) => {
    const [isImageLightboxOpen, setIsImageLightboxOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // User's Details
    const {
        picture: { thumbnail, large },
        name: { title, first, last },
        email,
        location: {
            street: { number, name },
            city,
            country,
            postcode
        },
        dob: { date },
        phone
    } = user

    // Formatting User's DOB
    const newDate = new Date(date)
    const formateDOB = `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`

    // Formatting Mobile Number(Remove hyphen)
    const formattedPhone = phone.replace(/-/g, "")

    // Lightbox Handler
    const handleLightbox = () => {
        setIsImageLightboxOpen(true)
    }

    // Modal Handler for User
    const handleUserModal = () => {
        setIsModalOpen(true)
    }

    return (
        <>
            <tr>
                <td>
                    <img onClick={handleLightbox} className="user-thumbnail" src={thumbnail} alt="User's Profile" />
                </td>
                <td>
                    <span className="user_name" onClick={handleUserModal}>{title}. {first} {last}</span>
                </td>
                <td>{email}</td>
                <td>{formateDOB}</td>
                <td>{number} {name}, {city} {country}, {postcode}</td>
                <td>{formattedPhone}</td>
            </tr>

            <ImageLightbox
                imageUrl={large}
                isImageLightboxOpen={isImageLightboxOpen}
                setIsImageLightboxOpen={setIsImageLightboxOpen}
            />

            <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
                <UserDetails user={user} />
            </Modal>
        </>
    )
}

export default TableRow
