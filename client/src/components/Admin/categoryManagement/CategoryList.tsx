import { BsSearch, BsPlus, BsFillFilterCircleFill } from "react-icons/bs";

import "../../../assets/css/category/category-list.css";

export default function CategoryList() {
    return (
        <div className="category-list-container">
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
                    <button className="create-category">
                        <i><BsPlus size={20} /></i>
                        Create category
                    </button>
                </div>
            </div>
        </div>
    );
}