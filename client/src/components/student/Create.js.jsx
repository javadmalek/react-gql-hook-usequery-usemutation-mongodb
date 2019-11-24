import React, { Component } from 'react';
import gql from "graphql-tag";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';


const ADD_STUDENT = gql`
    mutation addStudent(
        $name: String!,
        $field_of_study: String!,
        $enrolment_year: Int!
    ){
        addStudent(
            name: $name,
            field_of_study: $field_of_study,
            enrolment_year: $enrolment_year
        ){
            _id
        }
    }
`;


const Create = ({ history }) => {  
    const onCompleted = () => history.push('/student/list');
    const [addStudent, { loading, error }] = useMutation(ADD_STUDENT, { onCompleted } );

    let name, field_of_study, enrolment_year;

    const onSubmit = e => {
        e.preventDefault();

        const variables = { name: name.value, field_of_study: field_of_study.value, enrolment_year: parseInt(enrolment_year.value) };
        addStudent({ variables });

        name.value = "";
        field_of_study.value = "";
        enrolment_year.value = "";
    };

    return (
        <div className="container">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4><Link to="/">Home</Link></h4>
                    <h3 className="panel-title">
                        ADD STUDENT
                    </h3>
                </div>
                <div className="panel-body">
                    <h4><Link to="/student/list" className="btn btn-primary">Student List</Link></h4>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" className="form-control" name="name" ref={node => (name = node)} placeholder="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="field_of_study">Field of Study:</label>
                            <input type="text" className="form-control" name="field_of_study" ref={node => (field_of_study = node)} placeholder="field_of_study" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Enrolment Year:</label>
                            <input type="number" className="form-control" name="enrolment_year" ref={node => (enrolment_year = node)} placeholder="Enrolment Year" />
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error :( Please try again</p>}
                </div>
            </div>
        </div>
    );
};

export default Create;
