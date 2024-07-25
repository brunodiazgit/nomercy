import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <>
            <header>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="#home"><img className="logo" src="../../public/nomercy-logo.png" alt="NoMercy logo" /></Navbar.Brand>
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
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}

export default NavBar