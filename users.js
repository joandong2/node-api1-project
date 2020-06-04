const users = [
    {
        id: 1, // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane", // String, required
    },
];

function getUsers() {
    return users;
}

function getUserById(id) {
    return users.find((user) => user.id === Number(id));
}

function createUser(data) {
    const payload = {
        id: String(users.length + 1),
        ...data,
    };

    users.push(payload);
    return payload;
}

function updateUser(id, data) {
    const index = users.findIndex((user) => user.id === Number(id));
    users[index] = {
        ...users[index],
        ...data,
    };

    return users[index];
}

function deleteUser(id) {
    users = users.filter((user) => user.id != Number(id));
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
