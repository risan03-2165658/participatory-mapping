const db = require("../config/database");
const path = require("path");
const fs = require("fs");

// Define the directory where uploaded images will be stored
const uploadDir = path.join(__dirname, "../uploads");

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Function to handle file uploads
const handleFileUpload = (file) => {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    file.mv(filePath); // Move the uploaded file to the designated directory
    return filePath;
};

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
        let { contributor, content, location, lat, lng } = req.body;
        let image = null;

        // Check if an image file was uploaded
        if (req.files && req.files.image) {
            // Handle file upload and get the file path
            image = handleFileUpload(req.files.image);
        }

        console.log('INSERT INTO "tblRecord"(contributor, content, lat, lng, location, image) VALUES ($1, $2, $3, $4, $5, $6)',
            [contributor, content, lat, lng, location, image]);

        let { recordRows } = await db.query(
            'INSERT INTO "tblRecord"(contributor, content, lat, lng, location, image) VALUES ($1, $2, $3, $4, $5, $6)',
            [contributor, content, lat, lng, location, image]
        );

        res.status(200).send({
            message: "Record added into record table!",
            body: {
                record: { contributor, content, lat, lng, location, image }
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
