import {Button} from 'react-bootstrap';
import {getCookie, api} from '../scripts/Network'


const BookDetails = (props) => { 
    const addDays = (date, days) => {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    const handleReservation = () => {
        if(props.book.quantity == 0){
            window.alert("Ouups... Plus aucun exemplaire pour ce livre")
        }else{
            let today = Date.now();
            let inTenDays=addDays(today, 10)
            const dateFormatInTenDays = new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(inTenDays)
            try {
                api.post(
                    `/users/emprunts/add`,{
                        userID : getCookie('loggedUsr', document.cookie) ,
                        bookID : props.book.bookID,
                        date_retour : dateFormatInTenDays
                    }
                ).then(
                    res => {
                        if (res.success) {
                            console.log(res)
                            window.alert('Votre emprunt a été validé pour une période de 10 jours')
                        } else {
                            window.alert("Votre période de prêt n'est pas encore terminée pour ce livre");
                        }
                    }
                ).catch( err =>  {
                    window.alert("Votre période de prêt n'est pas encore terminée pour ce livre");
                })
            } catch( err ){
                window.alert("Une erreur s'est produite lors de votre réservation.");
            }
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