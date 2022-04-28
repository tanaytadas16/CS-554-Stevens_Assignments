import './App.css';
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    useQuery,
} from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Trainers from './components/Trainers';
import PokemonList from './components/PokemonList';
import Pokemon from './components/Pokemon';
import Home from './components/Home';
function App() {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: 'http://localhost:4000/graphql',
    });
    return (
        <Router>
            <ApolloProvider client={client}>
                <div className="App">
                    <Navigation />
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route
                            path="/pokemon/page/:pagenum"
                            element={<PokemonList />}
                        />
                        <Route path="/pokemon/:id" element={<Pokemon />} />
                        <Route path="/trainers" element={<Trainers />} />
                    </Routes>
                </div>
            </ApolloProvider>
        </Router>
    );
}
export default App;
