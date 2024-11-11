const db = require('../models/ConnectDatabase')

class ContactRepository {

    async findAll() {
        const rows = await db.query(`
            SELECT * FROM contacts;    
        `)
        return rows;
    }

    async findById(id) {
        const [row] = await db.query(
            `SELECT contacts.*, categories.name AS category_name
            FROM contacts
            LEFT JOIN categories ON categories.id = contacts.category_id
            WHERE contacts.id = ?;    
            `,
            [id]
        )
        return row;
    }

    async findByEmail(email) {
        const [row] = await db.query(`
            SELECT * FROM contacts WHERE email = ?;    
        `, [email]
        )
        return row;
    }

    async create({name, email, phone, category_id}) {
        const result = await db.query(
            `INSERT INTO contacts (name, email, phone, category_id) values (?, ?, ?, ?);`,
            [name, email, phone, category_id]
        )
        //retornar o id
        const insertedId = result.insertId
        return{
            id: insertedId,
            name,
            email,
            phone,
            category_id
        }
    }

    async update({id, name, email, phone, category_id}) {
        const result = await db.query(
            `UPDATE TABLE contacts SET
            name = ?, 
            email = ?, 
            phone = ?, 
            category_id = ?
            WHERE id = ?;`,
            [name, email, phone, category_id, id]
        )
        //retornar o id
        const updatedId = result.update
        return{
            id: updatedId,
            name,
            email,
            phone,
            category_id
        }
    }

    async delete(id) {
        const deleteItem = await db.query(
            `DELETE FROM contacts WHERE id = ?;`
        , 
        [id])
        return deleteItem;
    }
}

module.exports = new ContactRepository();