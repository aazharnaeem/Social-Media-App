import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { Header, People } from '../components'
import { getRequests, confirmRequest ,addFriend} from '../features'

export const Requests = () => {
    const [req, setreq] = useState()
    const history = useHistory()


    const id = JSON.parse(localStorage.getItem('user')).User._id

    useEffect(() => {

        const id = JSON.parse(localStorage.getItem('user')).User._id

        getRequests(id, setreq)
    }, [history,req])
    console.log(req)
    return (
        <div style={{ border: 'solid black 1px', textAlign: 'center' }}>
            <Header />

            {
                req ?
                    req.map((val, inde) => {

                        return (
                            // <Link to='/profile'>
                                <div key={inde} style={{ border: 'solid black 1px', padding: '20px' }}>
                                    {val.firstName}{' '}{val.lastName}
                                    <button className='bttn'
                                        onClick={() => confirmRequest(id, val._id, true)+history.push('/requests')}
                                    >Confirm</button>
                                    <button className='bttn'
                                        onClick={() => confirmRequest(id, val._id, false)+history.push('/requests')}
                                    >delete</button>
                                </div>
                            // </Link>
                        )
                    })
                    : 'no Requests'
            }
            <People />
        </div>
    )
}