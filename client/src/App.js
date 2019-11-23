import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_STUDENTS = gql`
  {
    students {
      _id
      name
      field_of_study
      enrolment_year
      created_at
    }
  }
`;

function renderStudent({ _id, name, field_of_study, enrolment_year }, index) {
  return (
    <tr key={index}>
      <td><Link to={`/show/${_id}`}>{name}</Link></td>
      <td>{field_of_study}</td>
      <td>{enrolment_year}</td>
    </tr>
  );
}

function renderStudents({ loading, error, data }) {
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            LIST OF STUDENTS
          </h3>
          <h4><Link to="/create">Add Student</Link></h4>
        </div>
        <div className="panel-body">
          <table className="table table-stripe">
            <thead>
              <tr>
                <th>Name</th>
                <th>Field of Study</th>
                <th>Enrolment Year</th>
              </tr>
            </thead>
            <tbody>
              {data.students.map(renderStudent)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Query pollInterval={500} query={GET_STUDENTS}>
        {renderStudents}
    </Query>
  );
}

export default App;
