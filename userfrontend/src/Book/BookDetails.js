import {Button} from 'react-bootstrap';
const BookDetails = (props) => { 
    const handleReservation = () => {
        if(props.book.quantity == 0){
            window.alert("Ouups... Plus aucun exemplaire pour ce livre")
        }else{
            /* To do for next time */
        }
    }
    
    return (
        <>
            <div className="container-details">
                <h1>Détails</h1>
                <div className="up-info">
                    <div>       
                        <img src={props.book.url} alt="book_img" width="300px"/>
                    </div>
                    <div>
                        <div className="meta-Info">
                            <div className="infos-principales">
                                <h3>{props.book.title}</h3>
                                <p>{props.book.authors}</p>
                            </div>
                            <div className="infos-secondaires">
                                <p>Date de publication : {props.book.publication_date}</p>
                                <p>Nombre de pages : {props.book.num_pages}</p>
                                <p>Catégories : {props.book.categories}</p>
                                <p>ISBN : {props.book.isbn}</p>
                                <p>Note moyenne : {props.book.average_rating}/5</p>
                            </div>
                        </div>
                    </div>
                    <Button className="btn-info" style={{ color: 'white' }} 
                            onClick={handleReservation}>
                            Réserver un exemplaire {'>'}
                    </Button>
                </div>
               
                <div className="up-summary">
                    <h3>Description : </h3>
                    <p>{props.book.long_description}</p>
                </div>
            </div>
        </>
    )
}

export default BookDetails;