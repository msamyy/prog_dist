import { useState } from 'react' ;
import {api, setCookie} from "../scripts/Network" ;
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import "./login.css"

const Login = () =>
{
    const [email, setemail] = useState('')
    const [mdp, setmdp] = useState('')

    const onChangeHandler = (event/*:React.ChangeEvent<HTMLInputElement>*/) => {
        event.preventDefault()
        switch (event.target.name) {
            case "email":
                setemail(event.target.value)
                break;
            case "mdp":
                setmdp(event.target.value)
                break;
            default:
                break;
        }     
    }

    const login = (e) => {
        e.preventDefault()
        api.post(
            `/login/login`,{
                email : email ,
                mdp : mdp
            }
        ).then(
            res => {
                if (res.success) {
                    setCookie("accessToken",res.accessToken)
                    window.location.href = "/browse"
                }
            }
        ).catch( err =>  {
                console.log(err)
                setemail("")
                setmdp("")
            }
        )
    } 

    return (
        <Container style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#F9F3EE'}}>
            
            <h1 className="mt-5 text-center">Connexion</h1>
            <Row>
                <Col md={8} sm={12} className="p-5 m-auto rounded-lg">
                    <Form onSubmit={login}>   
                        <Form.Group>
                            <Form.Label>Votre adresse email</Form.Label>
                            <Form.Control size="lg" type="email" placeholder="test@test.test" name="email" value={email} onChange={onChangeHandler}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Votre mot de passe</Form.Label>
                            <Form.Control size="lg" type="password" id="pwd" placeholder="******" name="mdp" value={mdp} onChange={onChangeHandler}></Form.Control>
                        </Form.Group>
                        <Col sm={8} md={6}  className="m-auto">
                            <Button size="lg" className="mt-5" variant="primary btn-block" type="submit">
                                    Se connecter
                            </Button>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login

