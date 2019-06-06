const db = require('./data/dbConfig');

module.exports = {
    get,
    findById,
    add,
    update,
    remove
}

function get() {
    return db("countries")
}

function findById(id) {
    return db("countries")
        .where({ id })
        .first()
}

function add(recipe) {
    // passing 'id' as the second Param is recommended to ensure the id is returned
    // when connecting to other DBMS like Postgres
    return db("countries").insert(recipe, "id")
}

function update(id, changes) {
    return db("countries")
        .where({ id })
        .update(changes)
}

function remove(id) {
    return db("countries")
        .where({ id })
        .del()
}