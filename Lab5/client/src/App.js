import './App.css';
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    useQuery,
} from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Unsplash from './components/Unsplash';
import Navigation from './components/Navigation';
import MyBin from './components/MyBin';
import MyPost from './components/MyPost';
import NewPost from './components/NewPost';
import 'bootstrap/dist/css/bootstrap.min.css';
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
                        <Route exact path="/" element={<Unsplash />} />
                        <Route path="/my-bin" element={<MyBin />} />
                        <Route path="/my-posts" element={<MyPost />} />
                        <Route path="/new-post" element={<NewPost />} />
                    </Routes>
                </div>
            </ApolloProvider>
        </Router>
    );
}

export default App;
