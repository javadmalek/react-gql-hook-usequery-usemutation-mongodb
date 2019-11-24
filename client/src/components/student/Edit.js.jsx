import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
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

const UPDATE_STUDENT = gql`
    mutation updateStudent(
        $id: String!,
        $name: String!,
        $field_of_study: String!,
        $enrolment_year: Int!
    ){
        updateStudent(
            id:$id,
            name: $name,
            field_of_study: $field_of_study,
            enrolment_year: $enrolment_year
        ){
            updated_at
        }
    }
`;

const Edit = ({ match, history }) => {
    const { id: studentId } = match.params;
    let name, field_of_study, enrolment_year;

    const onCompleted = () => history.push(`/student/list`);
    const { loading, error, data } = useQuery(GET_STUDENT_BY_ID, { variables: { studentId }});
    const [updateStudent, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_STUDENT, { onCompleted });

    const onSubmit = e => {
        e.preventDefault();

        const variables = { id: studentId, name: name.value, field_of_study: field_of_study.value, enrolment_year: parseInt(enrolment_year.value) };
        updateStudent({ variables });

        field_of_study.value = "";
        enrolment_year.value = "";
    };

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    
    return (
        <div className="container">
            <div className="panel panel-default">
            <h4><Link to="/">Home</Link></h4>
                <div className="panel-heading">
                    <h3 className="panel-title">EDIT STUDENT</h3>
                </div>
                <div className="panel-body">
                    <h4><Link to="/student/list" className="btn btn-primary">Student List</Link></h4>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" className="form-control" name="name" ref={node => (name = node)} placeholder="name" defaultValue={data.student.name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="field_of_study">Field of Study:</label>
                            <input type="text" className="form-control" name="field_of_study" ref={node => (field_of_study = node)} placeholder="field_of_study" defaultValue={data.student.field_of_study} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Enrolment Year:</label>
                            <input type="number" className="form-control" name="enrolment_year" ref={node => (enrolment_year = node)} placeholder="Enrolment Year" defaultValue={data.student.enrolment_year} />
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                    {mutationLoading && <p>Loading...</p>}
                    {mutationError && <p>Error :( Please try again</p>}
                </div>
            </div>
        </div>
    );
};


export default Edit;
