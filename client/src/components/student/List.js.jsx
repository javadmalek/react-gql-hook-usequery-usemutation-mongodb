import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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
      <td><Link to={`/student/show/${_id}`}>{name}</Link></td>
      <td>{field_of_study}</td>
      <td>{enrolment_year}</td>
    </tr>
  );
}

const List = (props) => {
   // fetchPolicy: 'network-only' >>> we don't want to get the response from the cache
  const { loading, error, data } = useQuery(GET_STUDENTS, { fetchPolicy: 'network-only' });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const studentListView = data.students.map(renderStudent);

  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4><Link to="/">Home</Link></h4>
          <h3 className="panel-title">LIST OF STUDENTS</h3>
          <h4><Link to="/student/create">Add Student</Link></h4>
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
              {studentListView}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


export default List;
