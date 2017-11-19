import React from 'react'
import PropTypes from 'prop-types'

class BookChanger extends React.Component {
  	static propTypes = {
      	id: PropTypes.string.isRequired,
      	handler: PropTypes.func
    }
  	state = {
    	value: ''
    }
  	
	render () {
    	return(
			<div className="book-shelf-changer">
          		<select 
          			onChange={this.props.handler}
          			value={this.state.value}
             		id={this.props.id}
          		>
                  <option value="none">Move to...</option>
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