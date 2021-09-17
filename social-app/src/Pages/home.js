import React from 'react'
import { Header } from '../components'
import { AddPost } from '../components'
export const Home = () => {
    // const user = JSON.parse(localStorage.getItem('user')).User
    return (
        <div>
            <Header />
            <AddPost />
            Home
        </div>
    )
}