import { Button } from "react-bootstrap"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "./Header"

const Register = () => {

    const [user, setUser] = useState({ username: '', email: '', password: '' })
    const navigate = useNavigate()
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)

    const { username, email, password } = user

    const handleSubmit = (e) => {
        e.preventDefault()
        signUP()
        setFormErrors(validate(user));
        setIsSubmit(true);
    }

    const changeUserInfo = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
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
            errors.email = "Email Required";
        } else if (!regexemail.test(values.email)) {
            errors.email = "Invalid Email format!";
        }
        if (!values.password) {
            errors.password = "Password Required";
        } else if (values.password < 4) {
            errors.password = "Password must be more than 4 characters";
        }
        else if (values.password === 16) {
            errors.password = "Password cannot be more than 16 characters";
        }
        return errors
    }

    const signUP = async () => {
        try {
            let items = { username, email, password }
            console.log(items)
            let result = await fetch("/register/", {
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
            if (result.status === 201) {
                localStorage.setItem("user-info", JSON.stringify(res))
                navigate("/confirm")
            }
            else if (result.status === 400) {
                alert("A user with that username already exists.")
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
                <h1>User Sign Up</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    Username<span style={{ color: "red" }}>*</span>
                    <input
                        type="text"
                        autoComplete="off"
                        value={user.username}
                        name="username"
                        onChange={changeUserInfo}
                        className="form-control"
                        placeholder="Create Username"
                    />
                    <span style={{ color: "red" }}>{formErrors.username}</span>
                    <br />
                    Email address
                    <input
                        type="text"
                        autoComplete="off"
                        value={user.email}
                        name="email"
                        onChange={changeUserInfo}
                        className="form-control"
                        placeholder="Enter a email address"
                    />
                    <span style={{ color: "red" }}>{formErrors.email}</span>
                    <br />
                    Password<span style={{ color: "red" }}>*</span>
                    <input type="password"
                        value={user.password}
                        name="password"
                        // onChange={(e) => setPassword(e.target.value)}
                        onChange={changeUserInfo}
                        className="form-control"
                        placeholder="Create Password"
                    />
                    <span style={{ color: "red" }}>{formErrors.password}</span>
                    <br />
                    <Button
                        className="btn btn-primary"
                        type="submit"
                    >Sign Up</Button>
                </form>
            </div>
        </>
    )
}
export default Register
