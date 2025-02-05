import Swal from "sweetalert2";
import Paper from "@mui/material/Paper";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import CreateCategory from "./CreateCategory";
import { FaTrashCan, FaPenToSquare, FaPlus, FaSistrix } from "react-icons/fa6";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";

import "../../../assets/css/category/category.css";

interface CategoryState {
    _id: string,
    id: number,
    name: string
    updatedAt: Date,
    action: string,
}

interface ResponseDelete {
    success: string,
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ลำดับที่', width: 120 },
    { field: 'name', headerName: 'ชื่อหมวดหมู่', width: 350 },
    {
        field: '_id',
        headerName: 'ObjectId',
        hideable: false,
    },
    { 
        field: 'updatedAt',
        headerName: 'อัพเดตเมื่อ',
        type: "dateTime",
        width: 200,
        valueGetter: (params) => new Date(params),
    },
    {
        field: 'action',
        headerName: 'การจัดการ',
        description: 'คอลัมน์นี้เป็นการจัดการข้อมูลของหมวดหมู่ไม่สามารถจัดลำดับได้',
        sortable: false,
        renderCell: (params) => params.value,
        width: 200
    },
];

export default function CategoryTable() {
    // Initial State
    const [selectedRow, setSelectedRow] = useState<GridRowSelectionModel>([]);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const [categories, setCategories] = useState<CategoryState[]>([]);
    const [searchCategory, setSearchCategory] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [category, setCategory] = useState<string>("");
    const [pageSize, setPageSize] = useState<number>(20);
    const [totalRow, setTotalRow] = useState<number>(0);
    const [editId, setEditId] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    
    // Use Effect
    useEffect(() => {
        fetchData();
    }, [page, pageSize]);

    // Fetch data function
    async function fetchData() {
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/category/pagination`, {
                params: { page, pageSize }
            });
            let categories = response.data.data;
            categories = categories.map((category:CategoryState, index:number) => ({
                ...category,
                id: index + 1,
                updatedAt: category.updatedAt,
                action: (
                    <div className="option-btn" onClick={(event) => event.stopPropagation()}>
                        <button 
                            className="edit-btn"
                            value={category._id}
                            onClick={(event) => editCategory(event)}
                        >
                            <i><FaPenToSquare /></i>
                        </button>
                        <button 
                            className="delete-btn"
                            value={category._id}
                            onClick={(event) => prepareDeleteCategory(event)}
                        >
                            <i><FaTrashCan /></i>
                        </button>
                    </div>
                )
            }));
            setCategories(categories);
            setTotalRow(response.data.pagination.total);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
        setSelectedRow([]);
    }

    async function fetchByCategoryName() {
        setIsLoading(true);
        setPage(0);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/category/search`, {
                params: { page, pageSize, name: searchCategory }
            });
            let categories = response.data.data;
            categories = categories.map((category:CategoryState, index:number) => ({
                ...category,
                id: index + 1,
                updatedAt: category.updatedAt,
                action: (
                    <div className="option-btn" onClick={(event) => event.stopPropagation()}>
                        <button 
                            className="edit-btn"
                            value={category._id}
                            onClick={(event) => editCategory(event)}
                        >
                            <i><FaPenToSquare /></i>
                        </button>
                        <button 
                            className="delete-btn"
                            value={category._id}
                            onClick={(event) => prepareDeleteCategory(event)}
                        >
                            <i><FaTrashCan /></i>
                        </button>
                    </div>
                )
            }));
            setSearchCategory("");
            setCategories(categories);
            setTotalRow(response.data.pagination.total);
        } catch (error) {
            console.error(error);
        }
        setSelectedRow([]);
        setIsLoading(false);
    }

    // Edit Category
    async function editCategory(event:React.MouseEvent<HTMLButtonElement>) {
        if (event.target instanceof HTMLButtonElement) {
            setEditId(event.target.value);
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/category/edit`, {
                    _id: event.target.value
                });
                setShowCreateForm(true);
                setCategory(response.data.data.name);
            } catch (error) {
                console.error(error);
            }
        }
    }

    // Prepare Delete
    function prepareDeleteCategory(event:React.MouseEvent<HTMLButtonElement>) {
        Swal.fire({
            title: "แจ้งเตือนการลบ",
            text: "คุณต้องการที่จะลบข้อมูลหมวดหมู่ใช่ไหม",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#BB2AFF",
            cancelButtonColor: "#A1A1A1",
            confirmButtonText: "ลบข้อมูล",
            cancelButtonText: "ยกเลิก"
        }).then((result) => {
            if (result.isConfirmed) {
                if (event.target instanceof HTMLButtonElement) {
                    if (event.target.value === "many_delete") {
                        const filterCategory = categories
                            .filter(category => selectedRow.includes(category.id))
                            .map(category => category._id);
                        Swal.fire({
                            title: "ระบบกำลังทำงาน",
                            html: "ระบบกำลังทำการลบหมวดหมู่",
                            didOpen: () => {
                                Swal.showLoading();
                                // const timer = Swal!.getPopup().querySelector("b");
                                deleteCategory(filterCategory).then((response) => {
                                    setShowCreateForm(false);
                                    setEditId("");
                                    setCategory("");
                                    const info = response as ResponseDelete;
                                    Swal.fire({
                                        title: "สถานะหมวดหมู่",
                                        text: info.success ?? "เกิดข้อผิดพลาดในการลบหมวดหมู่",
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
                            html: "ระบบกำลังทำการลบหมวดหมู่",
                            didOpen: () => {
                                Swal.showLoading();
                                // const timer = Swal!.getPopup().querySelector("b");
                                deleteCategory([(event.target as HTMLButtonElement).value]).then((response) => {
                                    setShowCreateForm(false);
                                    setEditId("");
                                    setCategory("");
                                    const info = response as ResponseDelete;
                                    Swal.fire({
                                        title: "สถานะหมวดหมู่",
                                        text: info.success ?? "เกิดข้อผิดพลาดในการลบหมวดหมู่",
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
            }
        });
    }

    // Delete Category
    async function deleteCategory(_ids:string[]) {
        return new Promise<ResponseDelete | AxiosError>(async(resolve, reject) => {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_API_URL}/category/delete`, {
                    data: { _ids }
                });
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
            setPage(0);
            setSelectedRow([]);
        });
    }

    // Render
    return (
        <div className="category-table">
            <div className="top-option-container">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="ค้นหาหมวดหมู่จากชื่อ..."
                        className="form-control"
                        value={searchCategory}
                        maxLength={100}
                        onChange={(event) => setSearchCategory(event.target.value)}
                    />
                    <div
                        className="input-group-text"
                        onClick={() => fetchByCategoryName()}
                    >
                        <i><FaSistrix /></i>
                    </div>
                </div>
                <button
                    className="create-category-btn"
                    onClick={() => {
                        setEditId("");
                        setCategory("");
                        setShowCreateForm(!showCreateForm)
                    }}
                >
                    <i><FaPlus /></i>สร้างหมวดหมู่
                </button>
            </div>
            <h1>รายการหมวดหมู่</h1>
            <Paper sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={categories}
                    columns={columns}
                    paginationMode="server"
                    rowCount={totalRow}
                    checkboxSelection
                    pageSizeOptions={[20, 50, 100]}
                    paginationModel={{ page, pageSize }}
                    onPaginationModelChange={(model) => {
                        setPage(model.page);
                        setPageSize(model.pageSize);
                    }}
                    loading={isLoading}
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                _id: false
                            }
                        },
                        // sorting: {
                        //     sortModel: [{field: "updatedAt", sort: "desc"}]
                        // }
                    }}
                    rowSelectionModel={selectedRow}
                    onRowSelectionModelChange={(rowSelected) => {
                        setSelectedRow(rowSelected);
                    }}
                    sx={{
                        '& .MuiCheckbox-root': {
                            color: 'grey',
                            '&.Mui-checked': {
                                color: 'var(--header-modal-purple)',
                            },
                        },
                        '& .MuiDataGrid-row.Mui-selected': {
                            backgroundColor: '#fbf5fc', // เปลี่ยนสีเมื่อแถวถูกเลือก
                            '&:hover': {
                            backgroundColor: '#faebfc', // สีที่แสดงเมื่อ hover เมื่อเลือก
                            }
                        }
                    }}
                />
            </Paper>
            <div className={"many-container " + (selectedRow.length > 0 ? "active-many" : "")}>
                <button
                    className="delete-many-btn"
                    type="button"
                    value="many_delete"
                    onClick={(event) => prepareDeleteCategory(event)}
                >
                    <i><FaTrashCan /></i> ลบข้อมูลหลายรายการ 
                </button>
            </div>

            <CreateCategory 
                _id={editId}
                category={category}
                fetchData={fetchData}
                setEditId={setEditId}
                setCategory={setCategory}
                showForm={showCreateForm}
                setForm={setShowCreateForm}
            />
        </div>
    )
}