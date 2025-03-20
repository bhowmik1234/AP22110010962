import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Top Posts</Link></li>
        <li><Link to="/max-comments">Max Comments</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
