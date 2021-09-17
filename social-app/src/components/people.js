import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { AddPeople, addFriend } from '../features'


export const People = () => {
    const [people, setPeople] = useState()
    const history = useHistory()

    const id = JSON.parse(localStorage.getItem('user')).User._id
    // console.log(id)
    useEffect(() => {
        const id = JSON.parse(localStorage.getItem('user')).User._id

        AddPeople(setPeople, id)
    }, [setPeople, history])

    return (
        <div style={{ border: 'solid black 1px', textAlign: 'center' }}>
            <hr style={{ color: 'grey' }} />
            people you may know
            <br />
            <br />
            {
                people ?

                    people.map((val, ind) => {
                        return (
                            <div key={ind} style={{ border: 'solid black 1px', padding: '20px' }}>
                                {val.firstName}{' '}{val.lastName}
                                <button
                                    onClick={() => addFriend(id, val._id)}
                                >Add Friend</button>
                            </div>
                        )
                    })

                    : 'No People to found'
            }

        </div>
    )
}