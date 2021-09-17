import React from 'react'
import H from '../images/signph.jpg'

export const AddPost = () => {
    return (
        <div>
            <div className='addPost'>
                <img src={H} alt='icon' width='50px' height='50px' style={{ borderRadius: '50px' }} />
                <br />
                <input
                    type='text'
                    placeholder='whats on your mind?'
                    className='postinp'
                />
                <input
                    type='file'
                    accept="image/png, image/jpeg"
                />
                <input
                    type='submit'
                    value='submit'
                />
            </div>
        </div>
    )
}