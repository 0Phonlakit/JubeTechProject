const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const token = process.env.COMPILER_TOKEN;

const getCodingLanguages = async(req, res) => {
    try {
        // check req
        const { _id } = req.verify_user;
        if (!_id) return res.status(404).json({ message: "The user was not found." });
        // get languages
        const response = await axios.get(`${process.env.COMPILER_PATH}/languages/all`, {
            headers: {
                "X-Auth-Token": token
            }
        });
        return res.status(200).json({ data: response.data });
    } catch (err) {
        console.log({ position: "Get coding language", error: err });
        return res.status(500).json({ message: "Something went wrong." });
    }
}

module.exports = {
    getCodingLanguages
}