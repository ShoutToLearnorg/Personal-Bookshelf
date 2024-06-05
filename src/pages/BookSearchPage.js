import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 300px;
  margin-bottom: 20px;
  font-size: 16px;
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

const AddButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const BookSearchPage = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchBooks = async () => {
      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data.docs);
      } catch (error) {
        setError(error.message);
        console.error('Failed to fetch books:', error);
      }
    };

    const debounceSearch = setTimeout(() => {
      if (query.trim() !== '') {
        searchBooks();
      } else {
        setBooks([]);
      }
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [query]);

  const addToBookshelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    bookshelf.push(book);
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
    // Display toast message
    toast.success('Book added to Bookshelf',);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {error && <p>Error: {error}</p>}
      <BookList>
        {books.map((book, index) => (
          <BookCard key={`${book.key}-${index}`}>
            <BookCover
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={book.title}
            />
            <BookTitle>{book.title}</BookTitle>
            <BookAuthor>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</BookAuthor>
            <BookEdition>Editions: {book.edition_count}</BookEdition>
            <AddButton onClick={() => addToBookshelf(book)}>Add to Bookshelf</AddButton>
          </BookCard>
        ))}
      </BookList>
      <ToastContainer />
    </SearchContainer>
  );
};

export default BookSearchPage;
