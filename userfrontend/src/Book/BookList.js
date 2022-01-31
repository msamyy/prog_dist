const BookList = (props) => { 
    return (
        <>
            {props.books.map((book, index) => (
                <div className='image-container d-flex justify-content-start m-3'
                     onClick={() => {
                         props.handleBookClick(book);
                     }}>
                    <img src={book.url} alt='livre'/>
                    <div className='overlay d-flex align-items-center justify-content-center'>
                        {book.title}
                    </div>
                </div>
            ))}
        </>    
    )
}
export default BookList;

/**
 * <Card  style={{ backgroundColor:'#F9F3EE', width: '10rem' }}>
            <Card.Img className="mt-2 m-auto" variant="top" src={book?.url} alt="book_image" style={{width:'90%'}}/>
            <Card.Body>
                <Card.Subtitle style={{ color:'#00000', textDecoration:'none'}}>{book?.title}</Card.Subtitle>
                <Card.Link href="#">Voir plus...</Card.Link>
            </Card.Body>
        </Card>
 */