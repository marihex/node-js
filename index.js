const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [
    {
        id: 1,
        name: "Anna",
        age: 25,
        email: "anna.smith@example.com",
        password: 'qwerty12345'
    },
    {
        id: 2,
        name: "John",
        age: 32,
        email: "john.miller@example.com",
        password: 'asdfg12345'
    },
    {
        id: 3,
        name: "Emily",
        age: 28,
        email: "emily.johnson@example.com",
        password: 'zxcvb12345'
    },
    {
        id: 4,
        name: "Michael",
        age: 35,
        email: "michael.brown@example.com",
        password: 'ytrrewq54321'
    },
    {
        id: 5,
        name: "Sophia",
        age: 22,
        email: "sophia.davis@example.com",
        password: 'gfdsa54321'
    },
    {
        id: 6,
        name: "Daniel",
        age: 41,
        email: "daniel.wilson@example.com",
        password: 'bvcxz54321'
    },
    {
        id: 7,
        name: "Olivia",
        age: 30,
        email: "olivia.taylor@example.com",
        password: '12345qwertt'
    },
    {
        id: 8,
        name: "James",
        age: 27,
        email: "james.anderson@example.com",
        password: '12345asdfg'
    },
    {
        id: 9,
        name: "Isabella",
        age: 24,
        email: "isabella.thomas@example.com",
        password: '12345zxcvb'
    },
    {
        id: 10,
        name: "William",
        age: 38,
        email: "william.martinez@example.com",
        password: '54321ytrewq'
    }
]

//GET all users

app.get('/users', (req, res) => {
    try {
        res.send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//GET user by id

app.get('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const user = users.find(user => user.id === userId);
        if (!user) {
            return res.status(404).send("Error404. User not found!");
        }
        res.send(user);

    } catch (error) {
        res.status(500).send(error.message);
    }
});

//POST a new user

app.post('/users', (req, res) => {
    try {
        const {name, age, email, password} = req.body;
        const id = users[users.length - 1].id + 1;
        if (typeof name !== "string" ||
            name.length <= 3 ||
            typeof age !== "number" ||
            age < 0) {
           return res.status(400).send("Error400. Incorrect data");
        }
        const newUser = {id, name, age, email, password};
        users.push(newUser);
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//PUT a user

app.put('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).send("Error404. User not found");
        }
        const {name, age, email, password} = req.body;
        if (typeof name !== "string" ||
            name.length <= 3 ||
            typeof age !== "number" ||
            age < 0) {
            return res.status(400).send("Error400. Incorrect data");
        }

        users[userIndex].name = name;
        users[userIndex].age = age;
        users[userIndex].email = email;
        users[userIndex].password = password;
        res.status(200).send(users[userIndex]);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

//PATCH a user

app.patch('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const user = users.find(user => user.id === userId);
        if (!user) {
            return res.status(404).send("Error404. User not found!");
        }
        if (req.body.name !== undefined) {
            user.name = req.body.name;
        }
        if (req.body.age !== undefined) {
            user.age = req.body.age;
        }
        if (req.body.email !== undefined) {
            user.email = req.body.email;
        }
        if (req.body.password !== undefined) {
            user.password = req.body.password;
        }
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//DELETE a user

app.delete('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).send("Error404. User not found");
        }
        users.splice(userIndex, 1);
        res.status(200).send("User successfully deleted");

    }catch (error) {
        res.status(500).send(error.message);
    }
})



app.listen(3000, () => {
    console.log('server is running on port 3000')
})