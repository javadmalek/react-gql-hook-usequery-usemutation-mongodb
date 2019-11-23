const GraphQLSchema = require('graphql').GraphQLSchema;
const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLList = require('graphql').GraphQLList;
const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLID = require('graphql').GraphQLID;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLInt = require('graphql').GraphQLInt;
const GraphQLDate = require('graphql-date');

// these are mongodb's models
var StudentModel = require('../models/student');
var CourseModel = require('../models/course');
var MarkModel = require('../models/mark');

const studentType = new GraphQLObjectType({
    name: 'student',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString }, 
        field_of_study: { type: GraphQLString },
        enrolment_year: { type: GraphQLInt },
        updated_at: { type: GraphQLDate },
        created_at: { type: GraphQLDate },
    }),
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        students: {
            type: new GraphQLList(studentType), // out put data type
            resolve: () => {
                const students = StudentModel.find().exec();
                console.log('I am here-------------------------')
                if(!students) throw new Error('Error, Can not find Students!.');
                return students;
            },
        },
        student: {
            type: studentType,
            args: {
                id: { name: '_id', type: GraphQLString },
            },
            resolve: (root, args) => {
                const studentDetails = StudentModel.findById(args.id).exec();
                if(!studentDetails) throw new Error('Error, Can not find the student!.');
                return studentDetails;
            },
        },
    }),
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addStudent: {
            type: studentType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                field_of_study: { type: new GraphQLNonNull(GraphQLString) },
                enrolment_year: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: (root, params) => {
                const studentModel = new StudentModel(params);
                const newStudent = studentModel.save();
                if(!newStudent) throw new Error('Error, can not create a new student!.');
                return newStudent;
            },
        },
        updateStudent: {
            type: studentType,
            args: {
                id: { name: 'id', type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                field_of_study: { type: new GraphQLNonNull(GraphQLString) },
                enrolment_year: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: (root, params) => {
                const values = {
                    ...params,
                    updated_at: new Date(),
                }
                return StudentModel.findByIdAndUpdate(params.id, values, (err) => !!err ? next(err) : null);
            },
        },
        removeStudent: {
            type: studentType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (root, params) => {
                const remStudent = StudentModel.findByIdAndRemove(params.id).exec();
                if(!remStudent) throw new Error('Error, Can not remove the student!.');
            },
        }
    }),
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
