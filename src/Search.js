import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { RingLoader } from 'react-spinners';
import AlertContainer from 'react-alert'

class Search extends Component {
  	static propTypes = {
    	books: PropTypes.array
    }
	alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    }
	state = {
    	query: '',
      	loading: false,
      	books: []
    }
	success = () => {
      this.msg.show('Book Added', {
        time: 2000,
        type: 'success',
      })
    }
	save(shelf) {
    	BooksAPI.update({id: shelf.target.id}, shelf.target.value).then(results => {
          	this.success()
        })
    }
	updateQuery = (query) => {
    	this.setState({query: query.trim()}) 
      	this.setState({loading: true})
      	// TODO: update query string in url
    }
	render() {
      	const {books} = this.props
      	const {query} = this.state
		let showingBooks = (books) ? books : []
		// TODO: Modify check to compare with previous query
		if (query && this.state.books.length === 0) {
          	BooksAPI.search(query, 20).then(results => {
        		showingBooks = (results.length) ? results: [];
          		this.setState({loading: false, books: showingBooks})
        	})
        }
    	return (
<div className="search-books">
	<div className="search-books-bar">
    	<Link 
    		to='/'
        	className="close-search"
    	>Close</Link>
    	<div className="search-books-input-wrapper">
          <input
            type="text"
            className="search-books"
            placeholder="Search by title or author"
            onChange={(event) => this.updateQuery(event.target.value)}
			value={this.props.query}
          />
  		</div>
	</div>
	<AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
	<div className="list-books-content">
		<div className="bookshelf">
          <div className="search-books-results">
			<div className="bookshelf-books">
              <ol className="books-grid">
                  {this.state.books.map((book) => (
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
		</div>
	</div>
    <RingLoader
      style={{margin: "100px auto"}}
      color={'#000000'} 
      loading={this.state.loading} 
    />
</div>
		)
	}
}

export default Search