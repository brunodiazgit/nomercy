import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

function Footer() {
    return (
        <footer className="footer">
            <Container fluid>
                <Row className="p-3">
                    <Col lg={6}>
                        <h1 className='footer-tag'>NOMERCY</h1>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        <strong>Designed by Bruno Díaz</strong>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        <p>© Copyright 2024 NoMercy. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
