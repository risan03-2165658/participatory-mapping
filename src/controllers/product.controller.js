const { db } = require("../config/database");

// Obtain all records
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

// Insert a new record with image encoded as Base64
exports.addRecord = async (req, res) => {
    try {
        let { contributor, content, location, lat, lng, image } = req.body;

        // Convert the image to Base64 encoding
        const base64Image = Buffer.from(image.data, 'binary').toString('base64');

        // Construct the SQL query with placeholders
        const sql = 'INSERT INTO "tblRecord" (contributor, content, lat, lng, location, image) VALUES ($1, $2, $3, $4, $5, $6)';
        const values = [contributor, content, lat, lng, location, base64Image];

        // Execute the query with the correct parameters
        const recordRows = await db.query(sql, values);

        res.status(200).send({
            message: "Record added into record table!",
            body: {
                record: { contributor, content, lat, lng, location, image: base64Image }
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

