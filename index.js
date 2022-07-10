import express, { response } from 'express';
import { request } from 'http';
import { StatusCodes } from 'http-status-codes';

const app = express();
const PORT = process.env.PORT || 3000;
let users = [
    {id: 1, name: 'Rafael Ribeiro', age: 31},
    {id: 2, name: 'Gabriel Custodio', age: 31},
    {id: 3, name: 'Marcus Vinicius', age: 31}
];

app.use(express.json()); //define que os dados estão sendo enviados no formato json

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/', (request, response) => {
    return response.send('<h1>Trabalhando com servidor express</h1>');
});

//criar duas rotas de GET

app.get('/users', (request, response) => {
    return response.send(users);
});

app.get('/users/:userId', (request, response)=>{
    const userId = request.params.userId;
    const user = users.find(user =>{
        return user.id === Number(userId);
    })
    return response.send(user);
});

//POST obter detalhes de um usuário

app.post('/users', (request, response) => {
    const newUser = request.body;

    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);

});

//PUT atuaçiaçãoo de usuario

app.put('/users/:userId', (request, response) =>{
    const userId = request.params.userId;
    const updateUser = request.body;

    users =users.map(user => {
        if(Number(userId) === user.id) {
            return updateUser;}
        return user;
    });
    return response.send(updateUser);
});

//DELETE deletar um usuárioo

app.delete('/users/:userId', (request, response) =>{
    const userId = request.params.userId;
    
    users = users.filter((user) => user.id !== Number(userId));

    return response.status(StatusCodes.NO_CONTENT).send();
});