import {Nav, Container, Navbar} from "react-bootstrap";

const Navigation = () => {

return (
    <Navbar className="mb-5" style={{backgroundColor:'#864879'}} >
        <Container>
            <Navbar.Brand href="browse">
                <img src="../../public/logo.svg" width="30" height="30" className="d-inline-block align-top" alt="logo"/>
            </Navbar.Brand>
            <Nav className="ml-auto" style={{color:'#ffffff'}}>
                <Nav.Link href="reservations">Mes réservations</Nav.Link>
                <Nav.Link href="#">Notifs</Nav.Link>
                <Nav.Link href="#">Profil</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
)}

export default Navigation;