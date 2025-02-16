import { IFInitialCategory, Category, ErrorResponse } from "../contexts/CategoryContext";

export interface IFAction {
    type: string,
    ids?: string[],
    payload?: Category[] | null,
    message?: string | ErrorResponse[],
    status?: number
}

export const CategoryReducer = (state:IFInitialCategory, action:IFAction) => {
    switch (action.type) {
        default:
            return state;
    }
}