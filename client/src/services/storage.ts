import { initializeApp } from "firebase/app";
import {
    getStorage,
    ref,
    uploadBytes,
    deleteObject,
    uploadBytesResumable,
    getDownloadURL 
} from "firebase/storage";

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

// Fetch File
export const fetchFileFromStorage = async(path:string, fileName:string) => {
    try {
        const fileRef = ref(storage, `${import.meta.env.VITE_FIREBASE_PATH}${path}/${fileName}`);
        const url = await getDownloadURL(fileRef);
        return url;
    } catch (error) {
        return false;
    }
}

// Upload File And See Progress
export const uploadFileWithProgress = (file: File, path: string, fileName:string, onProgress:(progress:number) => void) => {
    if (!file || !path.trim() || !fileName.trim()) return false;
    const fileRef = ref(storage, `${import.meta.env.VITE_FIREBASE_PATH}${path}/${fileName}`);
    const uploadTask = uploadBytesResumable(fileRef, file);
    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgress(progress);
            },
            (error) => {
                reject(error);
            },
            () => {
                resolve(true);
            }
        );
    });
}

// Delete File
export const deleteFile = async(path:string) => {
    if (!path.trim()) return false;
    const fileRef = ref(storage, `${import.meta.env.VITE_FIREBASE_PATH}${path}`);
    try {
        await deleteObject(fileRef);
        return true;
    } catch (error) {
        return false;
    }
}