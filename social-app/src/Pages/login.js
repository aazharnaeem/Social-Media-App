import React, { useEffect } from 'react'
import '../App.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import { loginSchema } from '../validation'
import { useHistory } from 'react-router'
import { LoginReq } from '../features'


export const Login = () => {
    const history = useHistory()

    const data = {
        userName: '',
        password: ''
    }

    useEffect(() => {
        const user = localStorage.getItem('user')
        const User = JSON.parse(user)
        if (User) {
            history.push('/home')
        }
        else {
            history.push('/')
        }

    }, [history])
    
    return (
        <div >
            <div className='login-main'>
                <div className='login-left'>

                    {/* <h1>Don't have account? <br /> <Link to='/signup' >Create One</Link></h1> */}

                </div>

                <div className='login-right'>
                    <span style={{ textAlign: 'center' }}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <h1 style={{ fontFamily: 'cursive', color: 'black' }}>
                            ShareHere
                            <br />
                        </h1>

                        <p style={{ fontFamily: 'Serif', fontSize: '15px', fontWeight: '600' }}>Welcome to sharehere</p>
                    </span>
                    <Formik
                        initialValues={data}
                        validationSchema={loginSchema}
                        onSubmit={values => LoginReq(values, history)}
                    >
                        <Form
                            className='login-form'
                        >
                            <label >username</label>
                            <br />
                            <Field
                                name='userName'
                                type='text'
                                id='userName'
                                label='userName'
                                placeholder='username'
                            />
                            <ErrorMessage name='userName' component={'div'} style={{ color: 'red' }} />
                            <br />
                            <label >password</label>
                            <br />
                            < Field
                                name='password'
                                type='password'
                                id='password'
                                label='password'
                                placeholder='*******'
                            />
                            <ErrorMessage name='password' component={'div'} style={{ color: 'red' }} />
                            <br />

                            <Field
                                type='submit'
                                value='login'
                                className='log-btn'
                            />

                            <span>
                                <Link to='/signup' style={{ textDecoration: 'underline', color: 'grey' }}  > create Account?</Link>
                            </span>
                        </Form>

                    </Formik>

                </div>
            </div>
        </div>
    )
}
