import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import Search from './Search'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
  }

  render() {
    return (
    	<div className="app">
      		<Route exact path='/' render={() => (
        		<ListBooks />
      		)} />
			<Route path='/search' render={() => (
          		<Search />
        	)} />
    	</div>
    )
  }
}

export default BooksApp