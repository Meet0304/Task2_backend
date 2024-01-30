const express = require('express')

const fs = require('fs')

const app = express()

app.use(express.json())

app.post('/user/add', (req, res) => {
    const existUsers = getUserData();
    const userData = req.body;

    if (!Array.isArray(existUsers)) {
        console.error('Invalid user data format or users.json file is corrupted');
        return res.status(500).send({ error: true, msg: 'Internal server error' });
    }

    if (userData.fullname == null || userData.age == null || userData.username == null || userData.password == null) {
        return res.status(401).send({ error: true, msg: 'User data missing' });
    }

    let findExist = false;

    for (const user of existUsers) {
        if (user.username === userData.username) {
            findExist = true;
            break;
        }
    }

    if (findExist) {
        return res.status(409).send({ error: true, msg: 'Username already exists' });
    }

    existUsers.push(userData);
    saveUserData(existUsers);

    res.send({ success: true, msg: 'User data added successfully' });
});

app.get('/user/list', (req, res) => {
    const users = getUserData()
    res.send(users)
})

app.put('/user/update/:username', (req, res) => {
    const username = req.params.username;
    const updatedUserData = req.body;
    let existUsers = getUserData();

    const userToUpdateIndex = existUsers.findIndex(user => user.username === username);

    if (userToUpdateIndex === -1) {
        return res.status(404).send({ error: true, msg: 'User not found' });
    }

    existUsers[userToUpdateIndex] = { ...existUsers[userToUpdateIndex], ...updatedUserData };

    saveUserData(existUsers);
    res.send({ success: true, msg: 'User data updated successfully' });
});

app.delete('/user/delete/:username', (req, res) => {
    const username = req.params.username;

    const existUsers = getUserData();

    const userIndexToRemove = existUsers.findIndex(user => user.username === username);

    if (userIndexToRemove === -1) {
        return res.status(404).send({ error: true, msg: 'Username does not exist' });
    }
    existUsers.splice(userIndexToRemove, 1);
    saveUserData(existUsers);

    res.send({ success: true, msg: 'User removed successfully' });
});

const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('users.json', stringifyData)
}

const getUserData = () => {
    const jsonData = fs.readFileSync('users.json')
    return JSON.parse(jsonData)    
}

app.listen(3000, () => {
    console.log('Server runs on port 3000')
})