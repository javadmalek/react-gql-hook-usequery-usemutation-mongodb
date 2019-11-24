import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import StudentList from './components/student/List.js';
import StudentEdit from './components/student/Edit.js';
import StudentCreate from './components/student/Create.js';
import StudentShow from './components/student/Show.js';


// uri: server/graphql
const client = new ApolloClient({ uri: 'http://localhost:3000/graphql' });

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <div>
                <Route exact path='/' component={App} />
                <Route path='/student/list' component={StudentList} />
                <Route path='/student/edit/:id' component={StudentEdit} />
                <Route path='/student/create' component={StudentCreate} />
                <Route path='/student/show/:id' component={StudentShow} />
            </div>
        </Router>
    </ApolloProvider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();