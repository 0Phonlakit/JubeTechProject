import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";

// Initial Cloud Storage
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASURE_ID
}
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Upload File Function
export const uploadFile = async(file:File, path:string, fileName:string) => {
    if (!file || !path.trim() || !fileName.trim()) return false;
    const fileRef = ref(storage, `${import.meta.env.VITE_FIREBASE_PATH}${path}/${fileName}`);
    try {
        await uploadBytes(fileRef, file);
        return true;
    } catch (error) {
        return false;
    }
}

// Delete File
export const deleteFile = async(path:string, fileName:string) => {
    if (!path.trim() || !fileName.trim()) return false;
    const fileRef = ref(storage, `${import.meta.env.VITE_FIREBASE_PATH}${path}/${fileName}`);
    try {
        await deleteObject(fileRef);
        return true;
    } catch (error) {
        return false;
    }
}