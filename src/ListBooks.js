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
	organise(results) {
      	let shelves = this.state.shelves
    	// iterate through each of the results and categorise into shelves
        results.forEach((result, index) => {
          shelves[result.shelf].books.push(result)
        })
		return shelves
    }
	update (results) {
    	return this.setState({shelves: results, fetched: true})
    }
	save(shelf) {
    	BooksAPI.update({id: shelf.target.id}, shelf.target.value).then(results => {
          	// TODO: Remove book from current shelf, this is probably happening because of caching, or the update write is taking longer than the read in the getAll API call.
          	this.setState({fetched: false})
        })
    }
	render() {
      	let component = this;
      	if (component.state.fetched === false) {
          BooksAPI.getAll().then(results => {
              component.setState({shelves: this.organise(results), fetched: true})
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
                       	<h2 className="books.books.bookshelf-title">{component.state.shelves[key].title}</h2>
                        <div className="bookshelf-books">
							<ol className="books-grid">
								{component.state.shelves[key].books.map((book) => (
                                	<li key={book.id}>
										<Book 
											title={book.title} 
											author={book.authors} 
											url={book.imageLinks.smallThumbnail} 
          									handler={this.save.bind(this)}
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