import { useState, useEffect } from "react";
import { useGroup } from "../../../contexts/GroupContext";
import { useCategory, CreateCategories } from "../../../contexts/CategoryContext";
import { BsSearch, BsPlus, BsFillFilterCircleFill, BsFillTrashFill, BsPencilSquare, BsX } from "react-icons/bs";

import ManageCategoryImage from "../../../assets/img/category/manage-group.png";

import "../../../assets/css/category/category-list.css";

interface IFEditCategory {
    _id: string
    name: string,
    group_ids: string[],
}

export default function CategoryList() {
    // Context
    const { state:groupsState } = useGroup();
    const { state:categoriesState, fetchAllCategories } = useCategory();
    // State
    const [showModal, setShowModal] = useState<boolean>(true);
    const [editCategory, setEditCategory] = useState<IFEditCategory>({ _id: "", name: "", group_ids: [] });
    const [categories, setCategories] = useState<CreateCategories[]>([{
        name: "",
        group_ids: []
    }]);
    // Effect
    useEffect(() => {
        if (categoriesState.categories.length === 0) fetchAllCategories("");
    }, [categoriesState.response, categoriesState.categories]);
    /* Function Section */
    const addCategory = () => {
        if (categories.length > 1) return setCategories((prev) => [...prev, { name: "", group_ids: [] }]);
    }

    const removeCategory = (removeIndex:number) => {
        setCategories(categories.filter((_,index) => index !== removeIndex));
    }

    const handleCategories = (currentIndex:number, key:string, value:string|string[]) => {
        setCategories((prev) => {
            return prev.map((category, index) => (
                index === currentIndex ? {...category, [key]:value } : category
            ))
        })
    }
    /* End Section */

    // Render
    return (
        <div className="category-list-container">
            {/* Option */}
            <div className="category-option-container">
                <div className="search-category-section">
                    <i><BsSearch /></i>
                    <input
                        type="text"
                        placeholder="search by category name..."
                    />
                </div>
                <div className="btn-category-container">
                    <button className="filter-advance">
                        <i><BsFillFilterCircleFill size={20} /></i>
                        Advance filter
                    </button>
                    <button className="create-category" onClick={() => setShowModal(true)}>
                        <i><BsPlus size={20} /></i>
                        Create category
                    </button>
                </div>
            </div>
            {/* Create Section */}
            <div className={"form-category-container " + (showModal ? "" : "hide-form")}>
                <div className={"form-category-content " + (showModal ? "" : "hide-content")}>
                    <div className="form-category-header">
                        <p>{editCategory._id.trim() !== "" ? "Create Category" : "Update Category"}</p>
                        <button onClick={() => setShowModal(false)}>
                            <i><BsX /></i>
                        </button>
                    </div>
                    <div className="form-category-body">
                        
                    </div>
                </div>
            </div>
            {/* Category List */}
            <div className="main-category-list">
                {categoriesState.categories.map((category, index) => (
                    <div className="category-list-card" key={index}>
                        <div className="category-content">
                            <p className="category-name">
                                {category.name} : &nbsp;
                                <span className="category-updated">{new Date(category.updatedAt).toLocaleString()}</span>
                            </p>
                            <div className="option-category-card">
                                <button
                                    className="edit-category-btn"
                                >
                                    <i><BsPencilSquare /></i>
                                </button>
                                <button
                                    className="delete-category-btn"
                                >
                                    <i><BsFillTrashFill /></i>
                                </button>
                            </div>
                        </div>
                        {category.group_ids.length > 0
                                ?
                                <ul className="category-group">
                                    {category.group_ids.map((group, index) => (
                                        <li className="sub-group" key={index}>
                                            {group.name}
                                        </li>
                                    ))}
                                </ul>
                                :
                                ""
                            }
                    </div>
                ))}
            </div>
        </div>
    );
}