const admin = require("./admin_firebase");

const bucket = admin.storage().bucket();

const uploadFile = async(file, filepath) => {
    try {
        await bucket.upload(file, {
            destination: filepath,
            metadata: {
                metadata: {
                    uploadBy: "Administrator"
                }
            }
        });
        console.log("Upload file to firebase successfully");
        return true;
    } catch (err) {
        console.log({ position: "Upload file to firebase", error: err });
        return false;
    }
}

const deleteFile = async(filepath) => {
    try {
        await bucket.file(filepath).delete();
        console.log("Delete file from firebase successfully");
        return true;
    } catch (err) {
        console.log({ position: "Delete file from firebase", error: err });
        return false;
    }
}

module.exports = {
    uploadFile,
    deleteFile
}