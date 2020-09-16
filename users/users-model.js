const db = require('../data/connection');

module.exports = {
    find,
    findBy,
    findById,
    add
}

function find() {
    return db('users')
        .select("id","username", "department").orderBy('id');
};


function findBy(filter) {
    return db("users as u")
        .where(filter)
        .orderBy("u.id")
        .join("departments as d", "d.id", "u.department")
        .select("u.id", "u.username", "u.password", "d.name as department");
}

function findById(id) {
    return db('users')
        .where({ id }).first();
}

async function add(user) {
    try{
        const [id] = await db('users')
            .insert(user, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
};