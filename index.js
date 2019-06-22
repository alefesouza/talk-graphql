var express = require('express');
var graphQL = require('graphql');
var expressGraphQL = require('express-graphql');

var usuarios = [{
    id: 1,
    nome: 'Alefe',
    idade: 22,
}, {
    id: 2,
    nome: 'Rodrigo',
    idade: 32,
}, {
    id: 3,
    nome: 'Reinaldo',
    idade: 42,
}];

var schema = graphQL.buildSchema(`
    type User {
        id: Int
        nome: String
        idade: Int
    }

    type Query {
        users: [User],
        user(id: Int!): User
    }

    type Mutation {
        addUser(nome: String!, idade: Int!): User
    }
`);

var getUsers = function () {
    return usuarios;
}

var getUser = function (args) {
    return usuarios.find(u => u.id === args.id);
}

var addUser = function (args) {
    var novoUsuario = {
        id: Math.floor(Math.random() * 1000),
        nome: args.nome,
        idade: args.idade,
    };

    usuarios.push(novoUsuario);

    return novoUsuario;
}

var root = {
    user: getUser,
    users: getUsers,
    addUser: addUser,
};

var app = express();
app.use('/graphql', expressGraphQL({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000, function () {
    console.log('Servidor iniciado em: http://localhost:4000');
});
