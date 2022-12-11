import React from 'react'
import Movies from '../Components/Movies'
import Loader from '../Components/Loader'
import Search from '../Components/Search'

export default class Main extends React.Component {
  state = {
    movies: [],
    loading: true
  }

  componentDidMount() {
    fetch('http://www.omdbapi.com/?apikey=e2c1b4ce&s=panda')
      .then((response) => response.json())
      .then((data) => this.setState({ movies: data.Search, loading: false}))
  }

  searchMovie = (str, type = 'all') => {
    this.setState({loading: true})
    fetch(`http://www.omdbapi.com/?apikey=e2c1b4ce&s=${str}${(type !== 'all') ? `&type=${type}`: '' }`)
      .then((response) => response.json())
      .then((data) => this.setState({ movies: data.Search, loading: false}))
  }

  render() {
    return (
    <div className="container content">
      <Search searchMovie = {this.searchMovie}/>
      {this.state.loading ?  <Loader />  : (<Movies movies = {this.state.movies} />)}
    </div>)
  }
}
