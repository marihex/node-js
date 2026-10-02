const express = require('express');
const  app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const users = [
    {id: 1, name: 'Maksym', email: 'feden@gmail.com', password: 'qwe123'},
    {id: 2, name: 'Alina', email: 'alindosik@gmail.com', password: 'ert345'},
    {id: 3, name: 'Anna', email: 'ann43@gmail.com', password: 'ghj393'},
    {id: 4, name: 'Tamara', email: 'tomochka23@gmail.com', password: 'afs787'},
    {id: 5, name: 'Dima', email: 'taper@gmail.com', password: 'rtt443'},
    {id: 6, name: 'Rita', email: 'torpeda@gmail.com', password: 'vcx344'},
    {id: 7, name: 'Denis', email: 'denchik@gmail.com', password: 'sdf555'},
    {id: 8, name: 'Sergey', email: 'BigBoss@gmail.com', password: 'ccc322'},
    {id: 9, name: 'Angela', email: 'lala@gmail.com', password: 'cdd343'},
    {id: 10, name: 'Irina', email: 'irka7@gmail.com', password: 'kkk222'},
];

app.get('/users', (req, res) => {
    try {
        res.send(users);
    } catch(err) {
        res.status(500).send(err.message);
    }
});

app.post('/users', (req, res) => {
    try {
        const {name, email, password} = req.body;
        const id = users[users.length - 1].id + 1;
        const newUser = {id, name, email, password};
        users.push(newUser);
        res.status(201).send(newUser);
    } catch(err) {
        res.status(500).send(err.message);
    }
});

app.get('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const user = users.find(user => user.id === userId);
        if(!user){
            return res.status(404).send('No user found.');
        }
        res.send(user);
    } catch(err) {
        res.status(500).send(err.message);
    }
})

app.post('/users/:userId', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    res.send('post a user');
});


app.put('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).send('No user found.');
        }
        const {name, email, password} = req.body;

        users[userIndex].name = name;
        users[userIndex].email = email;
        users[userIndex].password = password;
        res.status(201).send(users[userIndex]);
    } catch(err) {
        res.status(500).send(err.message);
    }
});

app.delete('/users/:userId', (req, res) => {
    try {
      const userId = Number(req.params.userId);
      const userIndex = users.findIndex(user => user.id === userId);
      if (userIndex === -1) {
          return res.status(404).send('No user found.');
      }
      users.splice(userIndex, 1);
      res.sendStatus(204)
    } catch (err) {
        res.status(500).send(err.message);
    }
})

app.listen(3000, ()=> {
    console.log('server is running on port 3000');
});



// const path = require('node:path');
// const fs = require('node:fs');
// const http = require('node:http');
//
// const server = http.createServer((req, res) => {
//     if (req.url === '/users' && req.method === 'GET') {
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.end(JSON.stringify({
//             data: 'Hello World'
//         }));
//         return;
//     }
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end(JSON.stringify({
//         data: 'Hello World'
//     }));
// });
//
// server.listen(3000);
