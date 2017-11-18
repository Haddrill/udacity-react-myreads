import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class ListBooks extends Component {
  	state = {
      	fetched: false,
      	shelves: {
    		currentlyReading: {title: "Currently Reading", books: []},
      		wantToRead: {title: "Want to Read", books: []},
          	read: {title: "Read", books: []}
    	}
    }
	render() {
      	let component = this;
      	let shelves = this.state.shelves;
      	if (component.state.fetched === false) {
          BooksAPI.getAll().then(results => {
              // iterate through each of the results and categorise into shelves
              results.forEach((result, index) => {
                  shelves[result.shelf].books.push(result)
              })
              component.setState({shelves: shelves, fetched: true})
          })
		}
		
    	return (
    	 <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
          		<div>
          		{Object.keys(this.state.shelves).map((key) => (
					<div className="bookshelf">
                       	<h2 className="bookshelf-title">{component.state.shelves[key].title}</h2>
                        <div className="bookshelf-books">
							<ol className="books-grid">
								{component.state.shelves[key].books.map((book) => (
                                	<li key={book.id}>
										<Book 
											title={book.title} 
											author={book.authors} 
											url={book.imageLinks.smallThumbnail} 
											id={book.id} />
                                	</li>
								))}
							</ol>
						</div>
					</div>
          		))}
				</div>
            </div>
            <div className="open-search">
            <Link 
          		to='/search'
          		className='search-book'
          	>Add a book</Link>
            </div>
      	</div>
		)
	}
}

export default ListBooks