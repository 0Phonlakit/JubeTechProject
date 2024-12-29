import React, { useState, useEffect } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import { Modal, Button, Breadcrumb} from 'react-bootstrap';
import CreatePromotion from './CreatePromotion';
import EditPromotion from './EditPromotion';
import DeletePromotion from './DeletePromotion'
import EditIcon from "../assets/editIcon.png";
import BinIcon from "../assets/binIcon.png"

DataTable.use(DT);

function PromotionTable() {
    const [promotions, setPromotion] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPromotion, setSelectedPromotion] = useState(null);

    // Fetch data from API
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/getAllPromotion`)
        .then(response => response.json())
        .then(data => setPromotion(data))
        .catch(error => console.error('Error fetching promotion data:', error));
    }, []);

    // Handle Modal Toggle
    const handleCreatePromotion = () => setShowCreateModal(true);
    const handleEditPromotion = (promotionId) => {
        const promotion = promotions.find((promotion) => promotion._id === promotionId);
        setSelectedPromotion(promotion); 
        setShowEditModal(true);
    };

    const handleDeletePromotion = (promotionId) => {
        const promotion = promotions.find((promotion) => promotion._id === promotionId);
        setSelectedPromotion(promotion);
        setShowDeleteModal(true);
      };
    
      window.MyFunction = (id, action) => {
        if (action === 'edit') {
          console.log(id);
          handleEditPromotion(id);
        } else if (action === 'delete') {
          console.log(id)
          handleDeletePromotion(id);
        }
      };

    const columns = [
        { title: 'No', data: null, render: (data, type, row, meta) => meta.row + 1},
        { title: 'Promotion Name', data: "promotionname"},
        { title: 'Code', data: "code"},
        { title: 'Discount Type', data: "discounttype"},
        { title: 'Discount Value', data: "discountvalue"},
        { title: 'End Date', data: "enddate"},
        { title: 'Action', data: '_id', render: (data, type, row) => (`
            <div>
                <button onclick="MyFunction('${data}', 'edit')" class="btn btn-warning"> 
                <img src= ${EditIcon} alt="Edit" width="20" /> </button>
                <button onclick="MyFunction('${data}', 'delete')" class="btn btn-danger"> 
                <img src= ${BinIcon} alt="Delete" width="20" /> </button>
            </div>`
            ),
        },
    ];

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="http://localhost:3000/promotionmanagement"> Promotion Management </Breadcrumb.Item>
                <Breadcrumb.Item active>Promotion List</Breadcrumb.Item>
            </Breadcrumb>
            <div className="d-flex align-items-center gap-2 mb-3 justify-content-end">
                <Button variant="warning" onClick={handleCreatePromotion}><strong>+ Add Promotion</strong></Button>
            </div>

            <DataTable 
                data={promotions}
                columns={columns}
                className='display'
                options={{
                    paging: true,
                    searching: true,
                    ordering: true,
                    info: true,
                    buttons: true,
                    searchbuilder: true
                }}
            />

            {/* Modal for Create Promotion */}
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
                <CreatePromotion onClose={() => setShowCreateModal(false)} />
            </Modal>

            {/* Modal for Edit User */}
            {selectedPromotion && (
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <EditPromotion userId={selectedPromotion._id} onClose={() => setShowEditModal(false)} />
                </Modal>
            )}

            {/* Modal for Delete User */}
            {selectedPromotion && (
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <DeletePromotion userId={selectedPromotion._id} onClose={() => setShowDeleteModal(false)} />
                </Modal>
            )}
        </div>
    );
}

export default PromotionTable;