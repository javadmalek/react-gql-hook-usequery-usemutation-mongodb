import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';


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

function onDeleteLinkClick(e, removeStudent, id) {
    e.preventDefault();
    removeStudent({ variables: { id } });
}

function renderDeleteLink(removeStudent, loading, error, student) {
    return (
        <div>
            <form onSubmit={e => onDeleteLinkClick(e, removeStudent, student._id)}>
                <Link to={`/student/edit/${student._id}`} className="btn btn-success">Edit</Link>&nbsp;
                <button type="submit" className="btn btn-danger">Delete</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
        </div>
    )
}
const DeleteStudentLink = ({ history, student}) => (
        <Mutation mutation={DELETE_STUDENT} key={student._id} onCompleted={() => history.push('/student/list')}>
            {(removeStudent, { loading, error }) => renderDeleteLink(removeStudent, loading, error, student)}
        </Mutation>
    );

function renderView(props, { loading, error, data }) {
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <div className="container">
            <div className="panel panel-default">
                <div className="panel-heading">
                <h4><Link to="/">Home</Link></h4>
                <h4><Link to="/student/list">Student List</Link></h4>
                    <h3 className="panel-title">
                    {data.student.name}
                    </h3>
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
                    <DeleteStudentLink { ...props } student={ data.student }  />
                </div>
            </div>
        </div>
    );
}

const Show = (props) => {
    const { id: studentId } = props.match.params;

    return (
        <Query pollInterval={500} query={GET_STUDENT_BY_ID} variables={{ studentId }}>
            {(params) => renderView(props, params)}
        </Query>
    );
};

export default Show;
