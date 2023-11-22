const express = require('express');
const app = express();
const rutas = `RUTAS: |
               Usuarios: /api/usuarios |
               Usuario 1: /api/usuarios/1 |
               Usuario 2: /api/usuarios/2 |
               Usuario 3: /api/usuarios/3 |
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
})

app.get('/api/usuarios/:id', (request, response) => {
    let usuario = usuarios.find(u => u.id === parseInt(request.params.id));
    if(!usuario){
        response.status(404).send('Usuario no encontrado');
    }else{
        response.send(usuario);
    }
});

app.listen(3000, () => {
    console.log('Server listen on port 3000');
});