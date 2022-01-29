import BookList from "../Book/BookList"
import BookDetails from "../Book/BookDetails"
import Navigation from "../Navigation/Navigation"
import {api} from "../scripts/Network" ;
import { useState, useEffect } from 'react' ;
import { BrowserRouter as Router, Route, useNavigate } from "react-router-dom"

const Browse = () => {
    const [books, setBooks] = useState([]);
    const [bookClicked, setBookClicked] = useState(false)
    const [book, setBook] = useState({})

    useEffect(() => {
        loadBooks();
    }, [])
    
    const loadBooks = () => {
        api.get(
            `/books/all`
        ).then( res => {
            if(res){
                console.log(res)
                setBooks(res)
            }
        }).catch( err =>  {
            console.log(err)
        })
    } 

    const handleBookClick = (book) => {
        setBook(book)
        setBookClicked(true)
    }

    return(
        <>
            <Navigation />
                {
                !bookClicked ?
                    <div className='container-fluid book-app' >
                        <h3 className="col ml-5 mb-5">Notre selection pour vous</h3>
                        <div className='row'>
                            <BookList
                                handleBookClick={handleBookClick}
                                books={books}
                            />
                        </div>
                    </div>  
                :
                    <BookDetails book={book}/>
                }    
        </>
        
    )
}

export default Browse;