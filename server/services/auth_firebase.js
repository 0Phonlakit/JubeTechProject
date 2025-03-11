const admin = require("./admin_firebase");

const createUser = async(email, password) => {
    try {
        await admin.auth().createUser({ email: email, password: password });
        console.log("The user was created from firebase successfully.");
        return true;
    } catch (err) {
        console.error({ position: "Create user from Firebase", error: err });
        return false;
    }
}

const deleteUser = async(currentEmail) => {
    try {
        const currentUser = await admin.auth().getUserByEmail(currentEmail);
        await admin.auth().deleteUser(currentUser.uid);
        console.log("The user was deleted from firebase successfully.");
        return true;
    } catch (err) {
        console.error({ position: "Delete user from firebase", error: err });
        return false;
    }
}

const updateUser = async(currentEmail, newEmail, newPassword) => {
    try {
        const currentUser = await admin.auth().getUserByEmail(currentEmail);
        await admin.auth().updateUser(currentUser.uid, { email: newEmail, password: newPassword });
        console.log("The user was updated from firebase successfully.");
        return true;
    } catch (err) {
        console.error({ position: "Update user from firebase", error: err });
        return false;
    }
}

module.exports = {
    createUser,
    deleteUser,
    updateUser
}