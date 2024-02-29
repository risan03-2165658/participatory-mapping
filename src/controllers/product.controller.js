const fs = require("fs");
const path = require("path");
const { db } = require("../config/database");

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

// Insert a new record
// Insert a new record
// Insert a new record
exports.addRecord = async (req, res) => {
    try {
        let { contributor, content, location, lat, lng } = req.body;
        let image = null;

        // Check if an image file was uploaded
        if (req.files && req.files.image) {
            // Handle file upload and get the file path
            image = handleFileUpload(req.files.image);
        }

        // Construct the SQL query with placeholders
        const sql = 'INSERT INTO "tblRecord" (contributor, content, lat, lng, location, image) VALUES ($1, $2, $3, $4, $5, $6)';
        const values = [contributor, content, lat, lng, location, image];

        // Execute the query with the correct parameters
        const recordRows = await db.query(sql, values);

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
