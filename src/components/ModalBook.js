import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import {
  Modal,
  Table,
  Button,
  Label,
  Rating,
  Header,
  Image
} from "semantic-ui-react";

export default class SingleBook extends Component {
  render() {
    const { book, modalOpen, handleClose } = this.props;

    return (
      <Modal open={modalOpen} onClose={handleClose} closeIcon>
        <Modal.Content image>
          <Image
            className="cover-book"
            rounded
            size="small"
            src={
              book.imageLinks
                ? book.imageLinks.thumbnail
                : "http://via.placeholder.com/128x188?text=no+available"
            }
          />

          <Modal.Description className="book-description">
            <Header>
              <Header as="h2" content={book.title} subheader={book.subtitle} />

              <small>{book.ratingsCount || 0}</small>

              <Rating
                icon="star"
                size="huge"
                defaultRating={book.averageRating}
                maxRating={5}
                disabled
              />
            </Header>

            {book.categories &&
              book.categories.map(category => (
                <Label as="a" key={category}>
                  {category}
                </Label>
              ))}

            <h3>Description</h3>
            <p>{book.description || "No description available"}</p>

            <Button
              as={Link}
              to={book.previewLink}
              target="noblank"
              icon="external"
              positive
              content="Open external"
            />

            <h3>More details</h3>
            <Table basic="very" celled collapsing>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Publisher</Table.HeaderCell>
                  <Table.HeaderCell>Published Date</Table.HeaderCell>
                  <Table.HeaderCell>Pages</Table.HeaderCell>
                  <Table.HeaderCell>Language</Table.HeaderCell>
                  <Table.HeaderCell>Identifier</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>{book.publisher || "No available"}</Table.Cell>
                  <Table.Cell>
                    {book.publishedDate || "No available"}
                  </Table.Cell>
                  <Table.Cell>{book.pageCount || "No available"}</Table.Cell>
                  <Table.Cell>{book.language || "No available"}</Table.Cell>
                  <Table.Cell style={{ listStyle: "inside" }}>
                    {book.industryIdentifiers
                      ? (book.industryIdentifiers.map(id => (
                        <li key={id.identifier}>
                          {id.type} {id.identifier}
                        </li>
                      )))
                      : (
                        "No identifier"
                      )
                    }
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

SingleBook.propTypes = {
  book: PropTypes.object.isRequired,
  modalOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired
};
SingleBook.defaultProps = {
  modalOpen: null
};
