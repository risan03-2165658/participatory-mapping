const db = require("../config/database");

// /**
//  * Insert Comment/Review: Inserts user insert data of review into tblReview in the database
//  * @param {form} req - form body that contains user selected information
//  * @param {status} res - confirmation that comment has been added into the review table
//  */
exports.addRecord = async (req, res) => {
    let { contributor, content, location, lat, lng, image } = req.body;
    console.log('INSERT INTO "tblRecord"(contributor, content, location, lat, lng, image) VALUES ($1, $2, $3, $4, $5, $6)',
        [contributor, content, location, lat, lng, image]);

    try {
        // Insert the record into the database
        let { recordRows } = await db.query(
            'INSERT INTO "tblRecord"(contributor, content, location, lat, lng, image) VALUES ($1, $2, $3, $4, $5, $6)',
            [contributor, content, location, lat, lng, image]
        );

        res.status(200).send({
            message: "Record added into record table!",
            body: {
                record: { contributor, content, location, lat, lng, image }
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
