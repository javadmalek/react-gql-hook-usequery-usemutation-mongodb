import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';


const GET_STUDENT_BY_ID = gql`
    query student($studentId: String) {
        student(id: $studentId){
            _id
            name
            field_of_study
            enrolment_year
            updated_at
            created_at
        }
    }
`;

const DELETE_STUDENT = gql`
    mutation removeStudent($studentId: String!) {
        removeStudent(id: $studentId) {
            _id
        }
    }
`;

const DeleteStudentLink = ({ history, studentId }) => {
    // Create student delete link
    const [removeStudent] = useMutation(DELETE_STUDENT);

    const onDeleteLinkClick = (e) => {
        e.preventDefault();

        removeStudent({ variables: { studentId } });
    };
    
    return (
        <form onSubmit={onDeleteLinkClick}>
            <Link to={`/student/edit/${studentId}`} className="btn btn-success">Edit</Link>&nbsp;
            <button type="submit" className="btn btn-danger">Delete</button>
        </form>
    );
};


const Show = ({ history, match }) => {
    const { id: studentId } = match.params;
    const onCompleted = () => history.push('/student/list');

    //Execute the get stuident query
    const { loading, error, data } = useQuery(GET_STUDENT_BY_ID, { variables: { studentId }, onCompleted })
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <div className="container">
            <div className="panel panel-default">
                <div className="panel-heading">
                <h4><Link to="/">Home</Link></h4>
                <h4><Link to="/student/list">Student List</Link></h4>
                    <h3 className="panel-title">{data.student.name}</h3>
                </div>
                <div className="panel-body">
                    <dl>
                        <dt>Field of Study:</dt>
                        <dd>{data.student.field_of_study}</dd>
                        <dt>Enrolment Year:</dt>
                        <dd>{data.student.enrolment_year}</dd>
                        <dt>Updated at:</dt>
                        <dd>{data.student.updated_at}</dd>
                    </dl>
                    <DeleteStudentLink history={history} studentId={studentId} />
                </div>
            </div>
        </div>
    );
}


export default Show;
