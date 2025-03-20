import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopPosts from './components/TopPosts';
import MaxComment from './components/MaxComment';
import Navbar from './components/Navbar'; // Import Navbar
import './App.css';
import Feed from './components/Feed';

function App() {
  return (
    <Router>
      <Navbar /> {/* Add Navbar for navigation */}
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/top-posts" element={<TopPosts />} />
        <Route path="/max-comments" element={<MaxComment />} />
      </Routes>
    </Router>
  );
}

export default App;
