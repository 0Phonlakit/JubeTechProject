import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";

import "../../../assets/css/category/category_form.css";

interface CreateCategory {
    _id: string,
    category: string,
    showForm: boolean,
    fetchData: () => void,
    setEditId: (value: string | ((prev: string) => string)) => void,
    setForm: (value: boolean | ((prev: boolean) => boolean)) => void
    setCategory: (value: string | ((prev: string) => string)) => void
}

interface ResponseSuccess {
    data: {
        _id: string,
        name: string,
        createdAt: Date,
        updatedAt: Date,
        __v: number
    },
    success: string
}

export default function CreateCategory({ 
    setForm,
    setEditId,
    setCategory,
    showForm,
    fetchData,
    _id,
    category 
}:CreateCategory) {
    function saveCategory(event: React.FormEvent) {
        event.preventDefault();
        if (_id.trim().length === 0) {
            Swal.fire({
                title: "ระบบกำลังทำงาน",
                html: "ระบบกำลังทำการสร้างหมวดหมู่",
                didOpen: () => {
                    Swal.showLoading();
                    // const timer = Swal!.getPopup().querySelector("b");
                    createCategory().then((response) => {
                        setForm(false);
                        setCategory("");
                        const info = response as ResponseSuccess;
                        Swal.fire({
                            title: "สถานะหมวดหมู่",
                            text: info.success ?? "เกิดข้อผิดพลาดในการสร้างหมวดหมู่",
                            icon: info.success ? "success" : "error"
                        });
                        fetchData();
                    }).catch((error) => {
                        if (error.response && error.response.data) {
                            Swal.fire({title: "สถานะหมวดหมู่",text: error.response.data.error,icon: "error"});
                        } else {
                            Swal.fire({title: "สถานะหมวดหมู่",text: "เกิดข้อผิดพลาดขึ้น",icon: "error"});
                        }
                    });
                }
            });
        } else {
            Swal.fire({
                title: "ระบบกำลังทำงาน",
                html: "ระบบกำลังทำการแก้ไขหมวดหมู่",
                didOpen: () => {
                    Swal.showLoading();
                    // const timer = Swal!.getPopup().querySelector("b");
                    updateCategory().then((response) => {
                        setForm(false);
                        setEditId("");
                        setCategory("");
                        const info = response as ResponseSuccess;
                        Swal.fire({
                            title: "สถานะหมวดหมู่",
                            text: info.success ?? "เกิดข้อผิดพลาดในการอัพเดตหมวดหมู่",
                            icon: info.success ? "success" : "error"
                        });
                        fetchData();
                    }).catch((error) => {
                        if (error.response && error.response.data) {
                            Swal.fire({title: "สถานะหมวดหมู่",text: error.response.data.error,icon: "error"});
                        } else {
                            Swal.fire({title: "สถานะหมวดหมู่",text: "เกิดข้อผิดพลาดขึ้น",icon: "error"});
                        }
                    });
                }
            });
        }
    }

    function createCategory() {
        return new Promise<ResponseSuccess | AxiosError>(async(resolve, reject) => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/category/create`, {
                    name: category
                });
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    function updateCategory() {
        return new Promise<ResponseSuccess | AxiosError>(async(resolve, reject) => {
            try {
                const response = await axios.put(`${import.meta.env.VITE_API_URL}/category/update`, {
                    _id, name: category
                });
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    return (
        <Modal
            className="category-modal"
            show={showForm}
            onHide={() => setForm(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                {_id.trim().length > 0 ? "แก้ไขหมวดหมู่" : "สร้างหมวดหมู่"}
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={saveCategory}>
                    <input 
                        type="text"
                        placeholder="ป้อนชื่อหมวดหมู่..."
                        maxLength={100}
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        required
                    />
                    <button className="category-btn" type="submit">บันทึกข้อมูล</button>
                </form>
            </Modal.Body>
        </Modal>
    );
}