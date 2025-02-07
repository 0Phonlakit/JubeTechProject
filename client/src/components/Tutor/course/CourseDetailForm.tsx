import axios from "axios";
import Select from "react-select";
import ReactQuill from 'react-quill';
import { useState, useEffect } from "react";
import { FaTrashCan } from "react-icons/fa6";

import 'react-quill/dist/quill.snow.css';

interface CourseDetialProp {
    handleCourseArray: (value:string[], name:string) => void
}

interface CategoryInfo {
    _id: string,
    name: string
}

interface CategorySelect {
    value: string,
    label: string
}

export default function CourseDetailForm({ handleCourseArray }:CourseDetialProp) {
    const [objectiveInfo, setObjectiveInfo] = useState<string[]>([""]);
    const [dataCategory, setDataCategory] = useState<CategorySelect[]>([]);
    const [manualDialog, setManualDialog] = useState<string>("");

    useEffect(() => {
        fetchAllCategory();
    }, []);

    async function fetchAllCategory() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/category/all`);
            setDataCategory(response.data.data.map((category:CategoryInfo) => {
                return {
                    value: category._id,
                    label: category.name
                }
            }))
        } catch (err) {
            console.error(err);
            setDataCategory([]);
        }
    }

    function handleChangeObjective(value:string, index:number) {
        const arr_objective = [...objectiveInfo];
        arr_objective[index] = value;
        setObjectiveInfo(arr_objective);
        handleCourseArray(arr_objective, "objectives");
    }

    function addObjective() {
        if (objectiveInfo.length < 10) setObjectiveInfo([...objectiveInfo, ""]);
        handleCourseArray([...objectiveInfo, ""], "objectives");
    }

    function removeObjective(current_index:number) {
        if (objectiveInfo.length !== 1) setObjectiveInfo(objectiveInfo.filter((_, index) => index !== current_index));
        handleCourseArray(objectiveInfo.filter((_, index) => index !== current_index), "objectives");
    }

    return (
        <div className="course-detail-form">
            <form>
                <ReactQuill theme="snow" value={manualDialog} onChange={setManualDialog} />
                <div className="course-objective-container">
                    <p>สิ่งที่ผู้เรียนจะได้เรียนรู้จากคอร์ส</p>
                    <button className="add-object-btn" type="button" onClick={addObjective}>เพิ่มวัตถุประสงค์</button>
                    {objectiveInfo.map((objective, index) => (
                        <div className="sub-input form-group" key={index}>
                            <label htmlFor={"objective-" + index}>วัตถุประสงค์ที่ {index + 1}</label>
                            <div className="input-group">
                                <textarea
                                    id={"objective-" + index}
                                    className="form-control"
                                    value={objective}
                                    maxLength={100}
                                    onChange={(event) => handleChangeObjective(event.target.value, index)}
                                    required
                                />
                                <div className="input-group-text">
                                    <div
                                        className="remove-object-btn"
                                        onClick={() => removeObjective(index)}
                                    >
                                        <i><FaTrashCan /></i>
                                    </div>
                                </div>
                            </div>
                            <span className="count-word">{objective.length} / 100</span>
                        </div>
                    ))}
                    <div className="form-group sub-input pb-5 mt-3">
                        <label htmlFor="category-select">เลือกหมวดหมู่ของคอร์สเรียน</label>
                        <Select
                            options={dataCategory}
                            isMulti
                            closeMenuOnSelect={false}
                            onChange={() => console.log("change")}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderColor: state.isFocused ? '#DD95FF' : 'grey',
                                }),
                            }}
                        />
                        <span className="guide-text">สามารถเลือกได้มากกว่า 1 หมวดหมู่</span>
                    </div>
                </div>
            </form>
        </div>
    );
}