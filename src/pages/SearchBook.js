import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { Debounce } from "react-throttle";
import Book from "../components/Book";

class SearchBook extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  };

  searchBook = query => {
    this.props.searchBook(query.trim());
  };

  componentWillUnmount() {
    this.props.searchBook();
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <Debounce time="1000" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={e => this.searchBook(e.target.value)}
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          {this.props.results.length > 0 ? (
            <ol className="books-grid">
              {this.props.results.map(book => (
                <li key={book.id}>
                  <Book book={book} updateShelf={this.props.updateShelf} />
                </li>
              ))}
            </ol>
          ) : (
            <h1 style={{ textAlign: "center" }}>No results</h1>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBook;