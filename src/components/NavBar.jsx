import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import CartWidget from './Cart/CartWidget'
import Account from './Account'
import { useAuth } from './context/AuthContext'
import Dropdown from 'react-bootstrap/Dropdown'

function NavBar() {
    const { isAuthenticated, user, logout } = useAuth()

    return (
        <>
            <header>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand as={Link} to={'/nomercy/'}><h1 className='logo'>NO MERCY</h1></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to={'/nomercy/'}>Home</Nav.Link>
                                <Nav.Link as={Link} to={'nomercy/category/mascara'}>Mascara</Nav.Link>
                                <Nav.Link as={Link} to={'nomercy/category/foundation'}>Foundation</Nav.Link>
                                <Nav.Link as={Link} to={'nomercy/category/eyeshadow'}>Eyeshadow</Nav.Link>
                                <Nav.Link as={Link} to={'nomercy/category/eyeliner'}>Eyeliner</Nav.Link>
                                <Nav.Link as={Link} to={'nomercy/category/lipstick'}>Lipstick</Nav.Link>
                            </Nav>
                            {isAuthenticated ?
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {user.name}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to={'/nomercy/orders'}>My Orders</Dropdown.Item>
                                        <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                : <Account />
                            }
                            <CartWidget />
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}

export default NavBar