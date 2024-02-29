const db = require("../config/database");
const { Parser } = require('json2csv');
const json2csvParser = new Parser();

/**
 * getRecord: Obtains all records
 */
exports.getRecord = async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM "tblRecord" ORDER BY id ASC');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error("Error retrieving records:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * addRecord: Inserts user insert data of review into tblRecord in the database
 * @param {form} req - form body that contains user selected information
 * @param {status} res - confirmation that comment has been added into the record table
 */
exports.addRecord = async (req, res) => {
    try {
        const { contributor, content, location, lat, lng } = req.body;
        const image = req.file.filename; // Assuming the uploaded image filename is saved in req.file

        const queryText = 'INSERT INTO "tblRecord"(contributor, content, location, lat, lng, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [contributor, content, location, lat, lng, image];

        const { rows } = await db.query(queryText, values);

        res.status(201).json({
            message: "Record added into record table!",
            record: rows[0]
        });
    } catch (error) {
        console.error("Error adding record:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
