import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Link component
import styled from 'styled-components';
import BookSearchPage from './pages/BookSearchPage';
import BookshelfPage from './pages/BookshelfPage';

// Your styled components and other code...

const Navigation = styled.nav`
  background-color: #007bff;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

function App() {
  return (
    <Router>
      <Navigation>
        <NavLink to="/">Search Books</NavLink>
        <NavLink to="/bookshelf">My Bookshelf</NavLink>
      </Navigation>
      <Routes>
        <Route exact path="/" element={<BookSearchPage />} />
        <Route path="/bookshelf" element={<BookshelfPage />} />
      </Routes>
    </Router>
  );
}

export default App;
