import axios from "axios";
import { getToken } from "../services/authorize";
import { CategoryReducer } from "../reducers/CategoryReducer";
import { createContext, useContext, useReducer, useEffect } from "react";

/* Interface Section */
export interface Category {
    _id: string,
    name: string,
    group_ids: string,
    updatedAt: Date
}
export interface ErrorResponse {
    path: (string | number)[],
    message: string
}
export interface IFInitialCategory {
    categories: Category[],
    loading: boolean,
    response: string | ErrorResponse[],
    status: number
}
interface IFCategoryContext {
    state: IFInitialCategory,
    // dispatch,
    // createCategories,
    // fetchAllCategories,
    // fetchPaginationCategories,
    // fetchcategoryById,
    // searchCategories,
    // updateCategory,
    // deleteCategories,
}
/* End Section */

const CategoryContext = createContext<IFCategoryContext | null>(null);
const initialCategory:IFInitialCategory = {
    categories: [],
    loading: false,
    response: "",
    status: 0
}

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(CategoryReducer, initialCategory);

    useEffect(() => {
        //
    }, [state]);

    const fetchAllCategories = async(message:string = "") => {
        try {
            dispatch({ type: "FETCH_START" });
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/category/all`);
            dispatch({ type: "FETCH_SUCCESS", payload: response.data.data, message: message, status: response.status });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch({ type: "FETCH_ERROR", message: error.response?.data.message, status: error.response?.status });
            } else {
                dispatch({ type: "FETCH_ERROR", message: "Something went wrong.", status: 404 });
            }
        }
    }

    const fetchPaginationCategories = async() => {
        try {
            dispatch({ type: "FETCH_START" });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch({ type: "FETCH_ERROR", message: error.response?.data.message, status: error.response?.status });
            } else {
                dispatch({ type: "FETCH_ERROR", message: "Something went wrong.", status: 404 });
            }
        }
    }
}