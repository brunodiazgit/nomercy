import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import CartWidget from './Cart/CartWidget'
import Account from './Account'
import { useAuth } from './context/AuthContext'
import NavDropdown from 'react-bootstrap/NavDropdown'

function NavBar() {

    const { isAuthenticated, user, logout } = useAuth()

    return (
        <>
            <header>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand as={Link} to={'/'}><h1 className='logo'>NO MERCY</h1></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
                                <Nav.Link as={Link} to={'/maybelline/mascara'}>Mascara</Nav.Link>
                                <Nav.Link as={Link} to={'/maybelline/foundation'}>Foundation</Nav.Link>
                                <Nav.Link as={Link} to={'/maybelline/eyeshadow'}>Eyeshadow</Nav.Link>
                                <Nav.Link as={Link} to={'/maybelline/eyeliner'}>Eyeliner</Nav.Link>
                                <Nav.Link as={Link} to={'/maybelline/lipstick'}>Lipstick</Nav.Link>
                            </Nav>
                            {isAuthenticated ?
                                <div>
                                    <NavDropdown className="m-2" title={user.firstname} id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to={'/orders'}>Orders</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to={'/login'} onClick={logout} >Logout</NavDropdown.Item>
                                    </NavDropdown>
                                    <CartWidget />
                                </div>
                                :
                                <div className='cart-account'>
                                    <Account />
                                    <CartWidget />
                                </div>
                            }
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}

export default NavBar