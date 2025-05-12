const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const Joi = require("joi");

const CodeBlueprint = Joi.object({
    source_code: Joi.string().allow("").required(),
    language_id: Joi.number().integer().allow(0).required(),
    stdin: Joi.string().allow("").optional(),
    stdout: Joi.string().allow("").optional()
});

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

const compileTestCode = async(req, res) => {
    try {
        // check request
        const { _id } = req.verify_user;
        const { error } = CodeBlueprint.validate(req.body, { abortEarly: false });
        if (!_id) return res.status(400).json({ message: "The user was not found." });
        if (error && error.details) {
            const modifyDetail = error.details.map(err => ({
                path: err.path,
                message: err.message
            }));
            return res.status(400).json({ message: modifyDetail });
        }
        // submission
        const { source_code = "", language_id = 0, stdin = null, stdout = null } = req.body;
        const response = await axios.post(`${process.env.COMPILER_PATH}/submissions/?base64_encoded=false&wait=true`, {
            source_code, language_id, cpu_time_limit: 10, memory_limit: 512000
        }, {
            headers: {
                "X-Auth-Token": token
            }
        });
        return res.status(200).json({ data: response.data });
    } catch (err) {
        console.log({ position: "Compile test code", error: err });
        return res.status(500).json({ message: "Something went wrong." });
    }
}

module.exports = {
    getCodingLanguages,
    compileTestCode
}