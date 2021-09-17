import * as yup from 'yup'


const loginSchema = yup.object({
    userName: yup
        .string().required('user name is required'),
    password: yup
        .string()
        .required('none shall pass without password')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/,
            "must bea t least 8, containing a Capital letter and a number ")
        .max(20, "Password should be maximun of 20 characters")
        .min(6, "Password must be atleast of 6 characters"),
})

const signupSchema = yup.object({

    firstName: yup.string().required(`Don't have First name?`),
    lastName: yup.string().required(`Don't have Last name?`),
    userName: yup
        .string().required('user name is required'),
    email: yup
        .string()
        .email('Must be a valid email').required('Email is required'),
    password: yup
        .string()
        .required('none shall pass without password')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/,
            "must bea t least 8, containing a Capital letter and a number ")
        .max(20, "Password should be maximun of 20 characters")
        .min(6, "Password must be atleast of 6 characters"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

export { loginSchema , signupSchema }