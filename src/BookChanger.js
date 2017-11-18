import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class BookChanger extends React.Component {
  	static propTypes = {
      	id: PropTypes.string.isRequired
    }
  	state = {
    	value: ''
    }
  	change(shelf) {
    	// TODO: verify id is valid
      	// TODO: verify target value is valid
    	BooksAPI.update({id: shelf.target.id}, shelf.target.value).then(result => {
        	// TODO: Check if result was successful.
        })
    }
	render () {
		// TODO: Add changer functionality.
    	return(
			<div className="book-shelf-changer">
          		<select 
          			onChange={this.change}
          			value={this.state.value}
             		id={this.props.id}
          		>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
              	</select>
          	</div>
        )
    }
}

export default BookChanger