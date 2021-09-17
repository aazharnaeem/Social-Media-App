import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { signupSchema } from '../validation'
import { Link } from 'react-router-dom'
import { signup } from '../features'
import { useHistory } from 'react-router'
import '../App.css'

export const Signup = () => {
    const initialValues = {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const history= useHistory()
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
        <div className={'login-main'}>
            <div className={'login-left'} id='signup-left'>


            </div>
            <div className={'login-right'} id='signup-right'>
                <span>

                    <br />
                    <h1 style={{ color: 'black', textAlign: 'center' }} >Sign up </h1>
                    {/* <br />
                    <br /> */}

                </span>
                <Formik
                    initialValues={initialValues}
                    validationSchema={signupSchema}
                    onSubmit={values => signup(values)}
                >
                    <Form className='login-form'>
                        <label>First Name</label>
                        <br />
                        {/* <br /> */}
                        <Field
                            name='firstName'
                            type='text'
                            id='firstName'
                            label='firstName'
                            placeholder='firstName'
                        />
                        <ErrorMessage name='firstName' component='div' style={{ color: 'red' }} />
                        <br />
                        <br />
                        <label>Last Name</label>
                        <br />
                        <Field
                            name='lastName'
                            type='text'
                            id='lastName'
                            label='lastName'
                            placeholder='lastName'
                        />
                        <ErrorMessage name='lastName' component='div' style={{ color: 'red' }} />
                        <br />
                        <br />
                        <label>User Name</label>
                        <br />
                        <Field
                            name='userName'
                            type='text'
                            id='userName'
                            label='userName'
                            placeholder='userName'
                        />
                        <ErrorMessage name='userName' component='div' style={{ color: 'red' }} />
                        <br />
                        <br />
                        <label>email</label>
                        <br />
                        <Field
                            name='email'
                            type='email'
                            id='email'
                            label='email'
                            placeholder='email'
                        />
                        <ErrorMessage name='email' component='div' style={{ color: 'red' }} />
                        <br />
                        <br />
                        <label>password</label>
                        <br />
                        <Field
                            name='password'
                            type='password'
                            id='password'
                            label='password'
                            placeholder='password'
                        />
                        <ErrorMessage name='password' component='div' style={{ color: 'red' }} />
                        <br />
                        <br />
                        <label>Confirm Password </label>
                        <br />
                        <Field
                            name='confirmPassword'
                            type='password'
                            id='confirmPassword'
                            label='confirmPassword'
                            placeholder='confirmPassword'
                        />
                        <ErrorMessage name='confirmPassword' component='div' style={{ color: 'red' }} />

                        <Field
                            name='submit'
                            type='submit'
                            value='Sign up'
                            className='log-btn'
                        />
                        <br />
                        <span>
                            <Link to='/' exact style={{ textDecoration: 'underline', color: 'grey' }}>already have an account? Login?</Link>
                        </span>

                    </Form>

                </Formik>


            </div>
        </div>
    )
}