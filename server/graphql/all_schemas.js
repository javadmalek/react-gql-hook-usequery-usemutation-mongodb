const GraphQLSchema = require('graphql').GraphQLSchema;
const GraphQLObjectType = require('graphql').GraphQLObjectType;
const { StudentQueries, StudentMutaions } = require ('./student_schema');

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        ...StudentQueries,
    }),
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        ...StudentMutaions,
    }),
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
