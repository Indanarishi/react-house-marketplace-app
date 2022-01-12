import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

// firebase
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import { setDoc, serverTimestamp, doc } from "firebase/firestore"

// icons
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

// components
import OAuth from "../components/OAuth"

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = formData

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth()

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            const user = userCredential.user

            updateProfile(auth.currentUser, {
                displayName: name
            })

            // copy the form data
            const formDataCopy = {...formData}
            // dont input the password
            delete formDataCopy.password
            // adding timestamp
            formDataCopy.timestamp = serverTimestamp()

            // add to database
            await setDoc(doc(db, 'users', user.uid), formDataCopy)

            navigate('/')
        } catch (error) {
            toast.error('Something went wrong with registration')
        }
    }

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">
                        Welcome Back!
                    </p>
                </header>

                <form onSubmit={onSubmit}>
                    <input type="text" id="name" className="nameInput" placeholder="Name" value={name} onChange={onChange} />
                    <input type="email" id="email" className="emailInput" placeholder="Email" value={email} onChange={onChange} />

                    <div className="passwordInputDiv">
                        <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder="Password" id="password" value={password} onChange={onChange} />
                        <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)} />
                    </div>

                    <Link to='/forgotpassword' className="forgotPasswordLink">
                        Forgot Password
                    </Link>

                    <div className="signUpBar">
                        <p className="signUpText">
                            Sign Up
                        </p>
                        <button className="signUpButton">
                            <ArrowRightIcon fill="#fff" width="34px" height="34px" />
                        </button>
                    </div>
                </form>

                <OAuth />

                <Link to="/signin" className="registerLink">
                    Sign In Instead
                </Link>
            </div>
        </>
    )
}

export default SignUp
