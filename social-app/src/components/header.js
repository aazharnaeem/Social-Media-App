import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

export const Header = () => {
    const [hiden, setHiden] = useState(true)
    const show = () => {
        if (hiden === true) {
            setHiden(false)
        }
        else {
            setHiden(true)
        }
    }
    const history = useHistory()

    const logout = () => {
        localStorage.removeItem('user')
        history.push('/')
    }

    return (
        <div className='Header' >
            <h2 className={'heading'} >ShareHere</h2>

            <div className='head-lnk'>
                <Link to='/home' className='lnks' >Home</Link>
                <Link to='/requests' className='lnks'  >Requests</Link>
                {/* <Link to='/notification' className='lnks' >Notification</Link> */}

                <button type="button" className="dropdown" onClick={() => show()} >
                    ☰
                </button>
                <br />
                <ul style={{ listStyle: 'none', display: hiden ? 'none' : 'block' }} className='dropdown-content'>
                    <li ><Link to='/profile'>Profile</Link></li>
                    <li ><Link to='/settings'>Settings</Link></li>
                    {/* <li ><Link to='/'>New</Link></li> */}
                    <li ><button onClick={() => logout()}> Logout</button></li>
                </ul>
            </div>
        </div>

    )
}