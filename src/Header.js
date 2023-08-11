import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const hello = JSON.parse(localStorage.getItem("user-info"))
    const navigate = useNavigate()
    const Logout = () => {
        localStorage.clear()
        navigate("/register")
    }
    return (
        <>
            <div>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href="#home">Home</Navbar.Brand>
                        <Nav className="me-auto nav_bar_wrapper">
                            {
                                localStorage.getItem("user-info") ?
                                    <>
                                        <Link to="/homepage">Homepage</Link>
                                        <Link to="/confirm">Confirmation</Link>
                                    </>
                                    :
                                    <>
                                        <Link to="/register">Signup</Link>
                                        <Link to="/login">Login</Link>
                                    </>
                            }
                        </Nav>

                        {localStorage.getItem("user-info") ?
                            <Nav>
                                <NavDropdown title={hello && hello.info.username}>
                                    <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            : null
                        }
                    </Container>
                </Navbar>
            </div>
        </>
    )
}
export default Header

