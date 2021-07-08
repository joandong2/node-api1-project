let users = [
    {
        id: 1, // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane", // String, required
    },
    {
        id: 2, // hint: use the shortid npm package to generate it
        name: "John Doe", // String, required
        bio: "Lorem ipsum dolor..", // String, required
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
        id: Number(users.length + 1),
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
    users = users.filter((user) => user.id != id);
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
