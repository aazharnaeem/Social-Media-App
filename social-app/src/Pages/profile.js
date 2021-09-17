import React from 'react'
import { AddPost, Header } from '../components'

export const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user')).User
    console.log(user)

    return (
        <div>
            <Header />
            <AddPost />
            <h1>This is Profile Page</h1>
            <label>First Name: </label>{user.firstName}<br />
            <label>Last Name: </label>{user.lastName}<br />
            <label>user Name: </label>{user.userName}<br />
            <label>Email: </label>{user.email}<br />

        </div>
    )
}