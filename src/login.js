import { Button } from "react-bootstrap"
import React, { useState} from "react"
import { useNavigate } from "react-router-dom"
import Header from "./Header"

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' })
    const navigate = useNavigate()
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)

    const {username, email, password } = user


    const handleSubmit = (e) => {
        e.preventDefault()
        login()
        setFormErrors(validate(user));
        setIsSubmit(true);
    }

    const changeUserInfo = (e) => {

        setUser({...user, [e.target.name]: e.target.value });
    }

    const validate = (values) => {
        const errors = {};
        const regexemail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i;
        const regexname = /^[a-zA-Z0-9_]+$/i
        if (!values.username) {
            errors.username = "Username Required";
        } else if (!regexname.test(values.username)) {
            errors.username = "Invalid Username format!";
        }
        if (!values.email) {
            errors.email = "Email Required!";
        } else if (!regexemail.test(values.email)) {
            errors.email = "Invalid Email format!";
        }
        if (!values.password) {
            errors.password = "Password Required!";
        } else if (values.password < 4) {
            errors.password = "Password must be more than 4 characters";
        }
         else if (values.password === 16) {
            errors.password = "Password cannot be more than 16 characters";
        }
        return errors
    }
    const login = async () => {
        try {
            let items = { username, email, password }
            // let items = user
            console.log(items)
            var result = await fetch("/login/", {
                method: "POST",
                headers: {
                    "Referrer-Policy": "strict-origin-when-cross-origin",
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(items)
            })
            let res = await result.json()
            console.log("res", res)
            // console.log(result.status)
            if (result.status === 200) {
                // sessionStorage.setItem("user-info", JSON.stringify(res))
                localStorage.setItem("user-info", JSON.stringify(res))
                alert("Login Successfull")
                setTimeout(() => {
                    navigate("/homepage")
                },1000);                
            }
            else if (result.status === 401) {
                alert("Unable to log in with provided credentials.")
            }
            else {
                alert("Some error occurred")
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <Header />
            <div className="col-sm-3 offset-sm-4">
                <h1>User Login</h1>
                <br />

                <form onSubmit={handleSubmit}>
                    Username<span style={{ color: "red" }}>*</span>
                    <input
                        type="text"
                        value={user.username||''}
                        onChange={changeUserInfo}
                        // onChange={(e) => setUsername(e.target.value)}
                        name="username"
                        className="form-control"
                        placeholder="Enter username"
                        autoComplete="off"
                    />
                    <span style={{ color: "red" }}>{formErrors.username}</span>
                    <br />
                    Email address<span style={{ color: "red" }}>*</span>
                    <input
                        type="text"
                        value={user.email||''}
                        name="email"
                        onChange={changeUserInfo}
                        className="form-control"
                        placeholder="Enter a email address"
                        autoComplete="off"
                    />
                    <span style={{ color: "red" }}>{formErrors.email}</span>
                    <br />
                    Password<span style={{ color: "red" }}>*</span>
                    <input type="password"
                        value={user.password||''}
                        name="password"
                        onChange={changeUserInfo}
                        className="form-control"
                        placeholder="Enter password"
                    />
                    <span style={{ color: "red" }}>{formErrors.password}</span>
                    <br />
                    <Button
                        className="btn btn-primary"
                        type="submit">
                        Login
                    </Button>
                </form>
            </div>
        </>
    )
}
export default Login
