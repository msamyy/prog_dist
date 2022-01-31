import {Nav, Container, Navbar, Button, ModalBody, Modal, Row, Col} from "react-bootstrap";
import { useState, useEffect } from 'react' ;
import { api, getCookie } from "../scripts/Network";

const Navigation = () => {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({})

    useEffect(() => {
        loadUser();
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const loadUser = () => {
        api.get(
            `/users/${getCookie('loggedUsr', document.cookie)}`
        ).then( res => {
            if(res){
                console.log(res[0])
                setUser(res[0])
            }
        }).catch( err =>  {
            console.log(err)
        })
    } 

return (
    <>
        <Navbar style={{ position:"fixed" }} className="navigation mb-5" style={{backgroundColor:'#002E46'}} >
            <Container>
                <Navbar.Brand style={{color: 'white'}} href="browse">
                    <img src="../../public/logo.png" width="30" height="30" className="d-inline-block align-top" alt="Savoir"/>
                </Navbar.Brand>
                <Nav className="ml-auto" style={{color:'#ffffff'}}>
                    <Nav.Link href="reservations" style={{color: 'white'}}>Mes réservations</Nav.Link>
                    <Nav.Link href="" style={{color: 'white'}} onClick={handleShow}>Profil</Nav.Link>
                </Nav>
            </Container>
        </Navbar>

        <Modal size="lg" onHide={handleClose} show={show}>
            <div className=" modal-header">
                <h2 className=" modal-title" id="exampleModalLabel">
                    Mon profil
                </h2>
                <button
                    aria-label="Close"
                    className=" close"
                    type="button"
                    onClick={handleClose}
                 >
                <span aria-hidden={true}>×</span>
                </button>
            </div>
            <ModalBody>
                <Container fluid={true}>
                    <Row>
                        <Col xs={12} md={4}>
                            <h4>{user.name}</h4>
                            {user.avatar_url ?
                                <img src={user.avatar_url} alt="profile"/>
                                :
                                <img src="https://gravatar.com/avatar/f46d5a2eeb7620a116a1485878b2acf3?s=400&d=robohash&r=x" width='80%' alt="profile"/>
                            }
                        </Col>
                        <Col xs={12} md={8}>
                            <div style={{ paddingLeft:'5%'}}>
                                <p>Email : {user.email}</p>
                                <p>Date de naissance : {user.date_de_naissance}</p>
                                <p>Date d'adhésion : {user.date_adhesion}</p>
                                <p>Numéro de téléphone : {user.tel}</p>
                                <p>Adresse : {user.adresse}</p>
                            </div>
                        </Col>
                    </Row>
                    </Container>
            </ModalBody>
        </Modal>
    </>



)}

export default Navigation;