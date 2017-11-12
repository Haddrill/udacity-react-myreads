import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBar extends React.Component {
	static propTypes = {
    	query: PropTypes.string,
    }
	state = {
    	query: ''
    }
	updateQuery = (query) => {
    	this.setState({query: query.trim()}) 
    }
	render() {
      return (
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
        )
    }
}

export default SearchBar