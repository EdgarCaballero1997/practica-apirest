const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
const rutas = `RUTAS:
               Usuarios: /api/usuarios
               Usuario 1: /api/usuarios/1
               Usuario 2: /api/usuarios/2
               Usuario 3: /api/usuarios/3
               Usuario 4: /api/usuarios/4`;
const usuarios = [
    {id: 1, name: 'Edgar', surname: 'Caballero'},
    {id: 2, name: 'Abel', surname: 'Caballero'},
    {id: 3, name: 'Olgar', surname: 'Mora'},
    {id: 4, name: 'Javi', surname: 'Caballero'}
];

app.get('/', (request, response) => {
    response.send(rutas);
});

app.get('/api/usuarios', (request, response) => {
    response.send(usuarios);
});

app.post('/api/usuarios', (request, response) => {
    const usuario = {
        id: usuarios.length + 1,
        name: request.body.name,
        surname: request.body.surname
    }
    usuarios.push(usuario);
    response.send(usuario);
});

app.get('/api/usuarios/:id', (request, response) => {
    let usuario = usuarios.find(u => u.id === parseInt(request.params.id));
    if(!usuario){
        response.status(404).send('Usuario no encontrado');
    }else{
        response.send(usuario);
    }
});

app.put('/api/usuarios/:id', (request, response) => {
    let usuario = usuarios.find(u => u.id === parseInt(request.params.id));
    if(!usuario){
        response.status(404).send('Usuario no encontrado.');
    }
    usuario.name = request.body.name;
    usuario.surname = request.body.surname;
    response.send(usuario);
});

app.delete('/api/usuarios/:id', (request, response) => {
    let usuario = usuarios.find(u => u.id === parseInt(request.params.id));
    if(!usuario){
        response.status(404).send('Usuario no encontrado');
    }
    const index = usuarios.indexOf(usuario);
    usuarios.splice(index, 1);
    response.send(usuarios);
});

app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
});