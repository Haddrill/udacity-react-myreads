import React from 'react'
import PropTypes from 'prop-types'
import BookChanger from './BookChanger'

class Book extends React.Component {
	static propTypes = {
      	id: PropTypes.string.isRequired,
    	title: PropTypes.string,
      	authors: PropTypes.array,
      	url: PropTypes.string,
      	handler: PropTypes.func
    }

	render() {
      let author = (this.props.authors && this.props.authors.isArray()) ? this.props.authors.join(", ") : '';
      return(
      	<div className="book">
        	<div className="book-top">
            	<div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url(' + this.props.url + ')' }}></div>
				<BookChanger id={this.props.id} handler={this.props.handler} />
         	</div>
			<div className="book-title">{this.props.title}</div>
            <div className="book-authors">{author}</div>
         </div>
        )
    }
}

export default Book