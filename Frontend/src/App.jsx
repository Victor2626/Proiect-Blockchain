import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useState } from 'react';
import { Donate } from './components/Donate';
import Vote from './components/Vote'; // Importăm componenta Vote
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/donate">Donate</Link>
            </li>
            <li>
              <Link to="/vote">Vote</Link> {/* Link-ul pentru pagina Vote */}
            </li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/donate" component={Donate} />
          <Route path="/vote" component={Vote} /> {/* Ruta pentru Vote */}
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to the Fundraising for Charities</h1>
    </div>
  );
}

export default App;
