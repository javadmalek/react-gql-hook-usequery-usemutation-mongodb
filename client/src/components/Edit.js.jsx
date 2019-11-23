import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

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

const Edit = (props) => {
    let name, field_of_study, enrolment_year;
    const { id: studentId } = props.match.params;

    return (
        <Query query={GET_STUDENT_BY_ID} variables={{ studentId }}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
        
                return (
                    <Mutation mutation={UPDATE_STUDENT} key={data.student._id} onCompleted={() => props.history.push(`/`)}>
                        {(updateStudent, { loading, error }) => (
                            <div className="container">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">EDIT STUDENT</h3>
                                    </div>
                                    <div className="panel-body">
                                        <h4><Link to="/" className="btn btn-primary">Student List</Link></h4>
                                        <form onSubmit={e => {
                                            e.preventDefault();
                                            updateStudent({ variables: { id: data.student._id, name: name.value, field_of_study: field_of_study.value, enrolment_year: parseInt(enrolment_year.value) } });
                                            field_of_study.value = "";
                                            enrolment_year.value = "";
                                        }}>
                                            <div className="form-group">
                                                <label htmlFor="name">name:</label>
                                                <input type="text" className="form-control" name="name" ref={node => (name = node)} placeholder="name" defaultValue={data.student.name} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="field_of_study">field_of_study:</label>
                                                <input type="text" className="form-control" name="field_of_study" ref={node => (field_of_study = node)} placeholder="field_of_study" defaultValue={data.student.field_of_study} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="author">Enrolment Year:</label>
                                                <input type="number" className="form-control" name="enrolment_year" ref={node => (enrolment_year = node)} placeholder="Enrolment Year" defaultValue={data.student.enrolment_year} />
                                            </div>
                                            <button type="submit" className="btn btn-success">Submit</button>
                                        </form>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error :( Please try again</p>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Mutation>
                );
            }}
        </Query>
    );
};


export default Edit;
