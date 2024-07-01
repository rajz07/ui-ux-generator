const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'users.json');

// Ensure data directory and file exist
if (!fs.existsSync(path.dirname(dataFilePath))) {
    fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
}
if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
}

const getUsers = () => {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
};

const saveUsers = (users) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
};

module.exports = { getUsers, saveUsers };
