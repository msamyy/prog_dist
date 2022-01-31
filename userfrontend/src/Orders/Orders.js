import Navigation from "../Navigation/Navigation"
import { useEffect, useState } from "react"
import { api, getCookie } from "../scripts/Network"
import { Button, Col, Row} from "react-bootstrap"


const Orders = () => {
    const [orders, setOrders] = useState([])
    const [books, setBooks] = useState([])
    const [rendered, setRendered] = useState(false)
    const [btnDisp, setBtnDisp] = useState(true)

    useEffect(() => {
        loadEmpruntsUser();
    }, []) 

    const loadEmpruntsUser = async () => {
        try{
            await api.get(
                `/users/emprunts/${getCookie('loggedUsr', document.cookie)}`
            ).then( res => {
                if(res) {
                    setOrders(res)
                }
            }).catch( err =>  {
                console.log(err)
            })
        } catch(err){
            console.log(err)
        }
    }

    const loadBooksUser = async () => {
        if(orders != []){
            let bks = []
            let long = orders.length
            let i = 0;
            orders.map( (elt) => {
                api.get(
                    `/books/${elt.bookID}`
                ).then( result => {
                    result.book[0].dateFin = elt.date_retour
                    console.log(result.book[0])
                    bks.push(result.book[0])
                    i++

                    if(i === long){
                        setBooks(bks)
                        setRendered(true)
                        setBtnDisp(false)
                    }
                }).catch( err =>  {
                    console.log(err)
                })
            })
        }
    }

    
    return(
        <>
            <Navigation />
            {   
                !(rendered)?
                    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#F9F3EE', color:'black', padding: '10%' }}>
                        <h1>Aucune commande pour le moment</h1>
                    </div>
                :
                
                <div style={{ marginLeft: '5%', marginRight: '5%' }}className="mainord-container">
                    <h1>Vos commandes</h1>
                    {
                        (btnDisp || !rendered)?
                        <Button className="btn-info" style={{ marginLeft: '1.3%', marginTop: '1%' , color:'white'}} onClick={loadBooksUser}>
                            Charger
                        </Button>
                    :
                    <>
                    </>
                    }
                    {() => { for(let bk in books) {
                        let i=0
                        if(true){
                            <Row>
                                <Col xs={10} md={3}>
                                    <img src={books[i].url} alt='livre'/>
                                    <div className='overlay d-flex align-items-center justify-content-center'>
                                        A rendre avant le : {books[i].bookID}
                                    </div>
                                </Col>
                                <Col xs={10} md={3}>
                                    <img src={books[i+1].url} alt='livre'/>
                                    <div className='overlay d-flex align-items-center justify-content-center'>
                                        A rendre avant le : {books[i+1].dateFin}
                                    </div>
                                </Col>
                                <Col xs={10} md={3}>
                                    <img src={books[i+2].url} alt='livre'/>
                                    <div className='overlay d-flex align-items-center justify-content-center'>
                                        A rendre avant le : {books[i+2].dateFin}
                                    </div>
                                </Col>
                            </Row>
                        i+=1
                        }
                    }}}
                </div>

            }
        </>
    )
}

export default Orders;