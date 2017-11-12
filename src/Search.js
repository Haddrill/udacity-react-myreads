import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import SearchBar from './SearchBar'

class Search extends Component {
  	static propTypes = {
    	books: PropTypes.array,
    }
	state = {
    	query: ''
    }
	render() {
      	const {books} = this.props
      	const {query} = this.state
		let showingBooks = (books) ? books : []
		if (query) {
          	showingBooks = BooksAPI.search(query, 4).then(results => {
        		showingBooks = (results.length) ? results: [];
        	})
        }

		// TODO: instantiate showingBooks properly
    	return (
<div className="search-books">
	<SearchBar query={query}/>
  	<div className="search-books-results">
		<ol className="books-grid">
            {showingBooks.map((book) => (
                <li>
                    <Book author={book.authors} title={book.title} url={book.imagesLinks.smallThumbnail} />
                </li>
             ))
            }
        </ol>
  	</div>
</div>
		)
	}
}

export default Search