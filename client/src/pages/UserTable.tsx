import { useState, useEffect } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import { Modal, Button, Breadcrumb } from 'react-bootstrap';
import CreateUser from '../components/Admin/userManagement/CreateUser';
import EditUser from '../components/Admin/userManagement/EditUser';
import DeleteUser from '../components/Admin/userManagement/DeleteUser';
import EditIcon from '../assets/img/icon/editIcon.png';
import BinIcon from '../assets/img/icon/binIcon.png';
import MainDashboard from '../layouts/MainDashboard';

DataTable.use(DT);

type User = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  role_ids: { role_name: string }[];
};

type ConfigDataTable = {
  paging?: boolean;
  searching?: boolean;
  ordering?: boolean;
  info?: boolean;
  buttons?: boolean;
  searchBuilder?: boolean;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch data from API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/getAllUsers`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  // Handle Modal Toggle
  const handleCreateUser = () => setShowCreateModal(true);
  const handleEditUser = (userId: string) => {
    const user = users.find((user) => user._id === userId);
    setSelectedUser(user || null);
    setShowEditModal(true);
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find((user) => user._id === userId);
    setSelectedUser(user || null);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    const handleButtonClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const button = target.closest('button'); // Find closest button
      if (!button) return;

      const id = button.getAttribute('data-id');
      const action = button.classList.contains('btn-edit')
        ? 'edit'
        : button.classList.contains('btn-delete')
        ? 'delete'
        : null;

      if (id && action) {
        if (action === 'edit') {
          handleEditUser(id);
        } else if (action === 'delete') {
          handleDeleteUser(id);
        }
      }
    };

    // Attach event listeners
    document.addEventListener('click', handleButtonClick);

    return () => {
      // Clean up event listeners
      document.removeEventListener('click', handleButtonClick);
    };
  }, [users]);

  const columns = [
    { title: 'No', data: null, render: (_: unknown, __: unknown, ___: unknown, meta: { row: number }) => meta.row + 1 },
    { title: 'First Name', data: 'firstname' },
    { title: 'Last Name', data: 'lastname' },
    { title: 'Email', data: 'email' },
    {
      title: 'Role',
      data: 'role_ids',
      render: (data: { role_name: string }[]) => {
        if (data && data.length > 0) {
          return data
            .map((role) => {
              let textColor, bgColor;
    
              switch (role.role_name) {
                case 'Admin':
                  textColor = '#004EFB';
                  bgColor = '#d5e0ff';
                  break;
                case 'Student':
                  textColor = '#8d44ad';
                  bgColor = '#ece0f4';
                  break;
                case 'Tutor':
                  textColor = '#F68B00';
                  bgColor = '#ffecd5';
                  break;
                default:
                  textColor = '#857D7D';
                  bgColor = '#ebebeb';
              }
    
              return `
                <span style="
                  color: ${textColor};
                  background-color: ${bgColor};
                  font-weight: bold;
                  padding: 5px 5px;
                  border-radius: 4px;
                  margin: 3px;
                  display: inline-block;">
                  ${role.role_name}
                </span>`;
            })
            .join('<br>');
        }
        return '';
      },
    },
    {
      title: 'Action',
      data: '_id',
      render: (data: string) =>
        `<div>
            <button class="btn-edit btn btn-warning" data-id="${data}"> 
                <img src="${EditIcon}" alt="Edit" width="20" />
            </button>
            <button class="btn-delete btn btn-danger" data-id="${data}"> 
                <img src="${BinIcon}" alt="Delete" width="20" />
            </button>
        </div>`,
    },
  ];

  return (
    <MainDashboard title="User Management" order={4}>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href={`/dashboard/user-management`}>
            User Management
          </Breadcrumb.Item>
          <Breadcrumb.Item active>User List</Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex align-items-center gap-2 mb-3 justify-content-end">
          <Button variant="warning" onClick={handleCreateUser}>
            <strong>+ Add User</strong>
          </Button>
        </div>

        <DataTable
          data={users}
          columns={columns as any} 
          className="display"
          options={{
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            buttons: true,
            searchBuilder: true,
          } as ConfigDataTable}
        />

        {/* Modal for Create User */}
        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
          <CreateUser onClose={() => setShowCreateModal(false)} />
        </Modal>

        {/* Modal for Edit User */}
        {selectedUser && (
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <EditUser userId={selectedUser._id} onClose={() => setShowEditModal(false)} />
          </Modal>
        )}

        {/* Modal for Delete User */}
        {selectedUser && (
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <DeleteUser userId={selectedUser._id} onClose={() => setShowDeleteModal(false)} />
          </Modal>
        )}
      </div>
    </MainDashboard>
  );
}
