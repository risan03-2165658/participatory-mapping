const db = require("../config/database");

const { Parser } = require('json2csv');
const json2csvParser = new Parser();

/**
 * getRecord: Obtains all records
 */
exports.getRecord = async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM "tblRecord" ORDER BY id ASC');
        const json = JSON.stringify(response);
        res.status(200).send(json);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Error occurred while fetching records!",
            error: error.message
        });
    }
};

/**
 * addRecord: Inserts user insert data of review into tblRecord in the database
 * @param {form} req - form body that contains user selected information
 * @param {status} res - confirmation that comment has been added into the review table
 */
exports.addRecord = async (req, res) => {
    try {
        let { contributor, location, content, lat, lng } = req.body;
        // let currTime = new Date().toISOString();
        console.log('INSERT INTO "tblRecord"(contributor, location, content, lat, lng) VALUES ($1, $2, $3, $4, $5)',
            [contributor, location, content, lat, lng]);
        await db.query(
            'INSERT INTO "tblRecord"(contributor, location, content, lat, lng) VALUES ($1, $2, $3, $4, $5)',
            [contributor, location, content, lat, lng]
        );

        res.status(200).send({
            message: "Record added into record table!",
            body: {
                record: { contributor, location, content, lat, lng }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Error occurred while adding record into record table!",
            error: error.message
        });
    }
};
