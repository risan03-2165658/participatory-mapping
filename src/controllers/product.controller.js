const db = require("../config/database");

// /**
//  * getRecords: Obtains all records
//  */
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

// /**
//  * Insert Comment/Review: Inserts user insert data of review into tblReview in the database
//  * @param {form} req - form body that contains user selected information
//  * @param {status} res - confirmation that comment has been added into the review table
//  */
exports.addRecord = async (req, res) => {
    try {
        let { contributor, content, location, image, lat, lng } = req.body;
        console.log('INSERT INTO "tblRecord"(contributor, content, lat, lng, location, image) VALUES ($1, $2, $3, $4, $5, $6)',
            [contributor, content, lat, lng, location, image]);

        let { recordRows } = await db.query(
            'INSERT INTO "tblRecord"(contributor, content, lat, lng, location, image) VALUES ($1, $2, $3, $4, $5, $6)',
            [contributor, content, lat, lng, location, image]
        );

        res.status(200).send({
            message: "Record added into record table!",
            body: {
                record: { contributor, content, lat, lng, location, image}
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
