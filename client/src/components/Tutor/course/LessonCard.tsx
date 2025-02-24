import { useLesson, LessonCard as IFLessonCard } from "../../../contexts/LessonContext";
import { BsBookHalf, BsCameraVideoFill } from "react-icons/bs";

interface LessonCardProp {
    deleteLesson: string,
    setDeleteLesson: React.Dispatch<React.SetStateAction<string>>
}

export default function LessonCard({ name, type, isFreePreview, updatedAt, deleteLesson:stateDelete, setDeleteLesson }:IFLessonCard & LessonCardProp) {
    const { deleteLesson } = useLesson();
    return (
        <div className="lesson-card">
            <p className="title-name">{name}</p>
            <div className="condition-info">
                <span className={"type " + (type === "lecture" ? "active-lecture" : "active-video")}>
                    {type === "lecture" ? <i><BsBookHalf size={15} /></i> : <i><BsCameraVideoFill size={18} /></i>}
                    {type.slice(0, 1).toUpperCase() + type.slice(1)}
                </span>
                {isFreePreview === true && <span className="preview">Preview</span>}
            </div>
            <span className="lesson-updated">Updated At : {new Date(updatedAt).toLocaleString()}</span>
        </div>
    );
}