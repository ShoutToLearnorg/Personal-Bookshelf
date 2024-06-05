import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookshelfContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const BookList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const BookCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  margin: 10px;
  width: 200px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookCover = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const BookTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const BookAuthor = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
`;

const BookEdition = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  color: #777;
`;

const RemoveButton = styled.button`
  padding: 10px 15px;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d9363e;
  }
`;

const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const removeBook = (bookToRemove) => {
    const updatedBookshelf = bookshelf.filter(book => book.key !== bookToRemove.key);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
    toast.success('Book removed successfully!');
  };

  return (
    <BookshelfContainer>
      <h2>My Bookshelf</h2>
      <BookList>
        {bookshelf.map((book, index) => (
          <BookCard key={`${book.key}-${index}`}>
            <BookCover
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={book.title}
            />
            <BookTitle>{book.title}</BookTitle>
            <BookAuthor>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</BookAuthor>
            <BookEdition>Editions: {book.edition_count}</BookEdition>
            <RemoveButton onClick={() => removeBook(book)}>Remove</RemoveButton>
          </BookCard>
        ))}
      </BookList>
      <ToastContainer />
    </BookshelfContainer>
  );
};

export default BookshelfPage;
