import { IFToggleSidebar } from "../app";
import CodeMirror from "@uiw/react-codemirror";
import { aura } from '@uiw/codemirror-theme-aura';
import { useState, useRef, useEffect } from "react";
import MainDashboard from "../layouts/MainDashboard";

import "../assets/css/codeeditor/code_editor.css";

export default function CodeEditor({toggleSidebar, setToggleSidebar}:IFToggleSidebar) {
    const boxRef = useRef<HTMLDivElement | null>(null);
    const startYRef = useRef(0);
    const startHeightRef = useRef(0);
    const [isResizing, setIsResizing] = useState<boolean>(false);

    const handleMouseDown = (e:any) => {
        if (!boxRef.current) return;
        setIsResizing(true);
        startYRef.current = e.clientY;
        startHeightRef.current = boxRef.current.getBoundingClientRect().height;
        e.preventDefault();
    };

    const handleMouseMove = (e:any) => {
        if (!isResizing || !boxRef.current) return;

        const deltaY = e.clientY - startYRef.current;
        const newHeight = startHeightRef.current + deltaY * -1;

        if (newHeight > 100) {
            boxRef.current.style.height = `${newHeight}px`;
        }
    };

    const handleMouseUp = () => {
        setIsResizing(false);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    // render
    return (
        <MainDashboard
            title="Code Editor"
            toggleSidebar={toggleSidebar}
            setToggleSidebar={setToggleSidebar}
            title_sidebar="ภาพรวมแดชบอร์ด"
        >
            <div className="code-editor-container">
                <div className="main-code-editor">
                    <CodeMirror
                        theme={aura}
                        className="code-editor-content"
                    />
                    <div className="code-option">
                        
                    </div>
                </div>
                <div className="result-container" ref={boxRef}>
                    <div className="resize-handle" onMouseDown={handleMouseDown} />
                </div>
            </div>
        </MainDashboard>
    );
}