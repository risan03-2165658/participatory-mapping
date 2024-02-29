const db = require("../config/database");

const { Parser } = require('json2csv');
const json2csvParser = new Parser();

// Function to obtain all records
exports.getRecord = async(req, res) => {//
    const response = await db.query('SELECT * FROM "tblRecord" ORDER BY id ASC');//
    const json = JSON.stringify(response);
    res.status(200).send(json);//
};//

// Function to insert a new record
exports.addRecord = async (req, res) => {
    try {
        let { contributor, place, content, lat, lng } = req.body;
        console.log('INSERT INTO "tblRecord"(contributor, place, content, lat, lng) VALUES ($1, $2, $3, $4, $5)',
            [contributor, place, content, lat, lng]);
        let { recordRows } = await db.query(
            'INSERT INTO "tblRecord"(contributor, place, content, lat, lng) VALUES ($1, $2, $3, $4, $5)',
            [contributor, place, content, lat, lng]
        );

        res.status(200).send({
            message: "Record added into record table!",
            body: {
                record: { contributor, place, content, lat, lng }
            }
        });
    } catch (error) {
        console.error("Error adding record:", error);
        res.status(500).send("Internal Server Error");
    }
};

