import { useState, useEffect } from 'react';
import User from './components/User';
import { Dialog } from '@headlessui/react';
import './App.css';

export interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  gender: string;
  address: {
    state: string;
  };
  image: string;
}

function App() {
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');
  const headerStyle = 'font-bold text-gray-600 flex-1';
  const inputLabelStyle = 'block mb-2 font-semibold text-gray-600';
  const inputFieldStyle =
    'block w-full px-3 py-2 border rounded border-gray-400 focus:border-blue-500 focus:outline-none';

  const updateSelectedUser = (updates: Partial<UserDetails>) => {
    setSelectedUser((current) => {
      return { ...current, ...updates } as UserDetails;
    });
  };

  const handleEditUser = (user: UserDetails) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const addUser = () => {
    const newUser = {
      id: Math.floor(Math.random() * 1000000),
      firstName: 'New',
      lastName: 'User',
      email: 'newuser@example.com',
      birthDate: '1990-01-01',
      gender: 'Female',
      address: { state: 'AZ' },
      image: 'https://robohash.org/hicveldicta.png?size=50x50&set=set1',
    };
    setActionSuccess('User added successfully!');
    setTimeout(() => setActionSuccess(''), 5000);
    setUsers((prevUsers) => [newUser, ...prevUsers]);
  };

  const deleteUser = (userId: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setActionSuccess('User deleted successfully!');
    setTimeout(() => setActionSuccess(''), 5000);
    window.scrollTo(0, 0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    setIsLoadingUsers(true);
    fetch('https://dummyjson.com/users')
      .then((response) => response.json())
      .then((data) => {
        const slicedUsers = data.users.slice(0, 20);
        setUsers(slicedUsers);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      })
      .finally(() => {
        setIsLoadingUsers(false);
      });
  }, []);

  const handleSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdatingUser(true);

    setTimeout(() => {
      if (selectedUser) {
        if (
          !selectedUser.firstName ||
          !selectedUser.lastName ||
          !selectedUser.email ||
          !selectedUser.birthDate ||
          !selectedUser.gender ||
          !selectedUser.address.state ||
          !selectedUser.image
        ) {
          alert('All fields must be filled out.');
          setIsUpdatingUser(false);
          return;
        }

        const birthDate = new Date(selectedUser.birthDate);
        const minDate = new Date('01-01-1900');
        const maxDate = new Date('12-31-2100');
        if (birthDate < minDate || birthDate > maxDate) {
          alert('Birth date must be between 01-01-1900 and 12-31-2100.');
          setIsUpdatingUser(false);
          return;
        }

        const updatedUsers = users.map((user) =>
          user.id === selectedUser.id ? { ...selectedUser } : user
        );
        setActionSuccess('User updated successfully!');
        setTimeout(() => setActionSuccess(''), 5000);

        setUsers(updatedUsers);

        setIsModalOpen(false);
        setIsUpdatingUser(false);
      } else {
        alert('No user selected');
        setIsUpdatingUser(false);
      }
    }, 1000);
  };

  return (
    <>
      <header className="bg-blue-800">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">
            User Management Page
          </h1>
        </div>
      </header>
      <div className="bg-gray-100 p-8">
        {actionSuccess && (
          <div className="p-3 rounded-lg text-center my-2 bg-green-500 bg-opacity-40 text-black">
            {actionSuccess}
          </div>
        )}
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={addUser}
            className="py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors"
          >
            Add User
          </button>
        </div>
        <h2 className="lg:hidden text-2xl font-bold">Users</h2>
        <h2 className="text-md text-gray-500">
          *Click on a user to edit their information.
        </h2>
        <div className="mb-4">
          <div className="hidden lg:flex mb-4 px-16 py-5 bg-gray-200 rounded-t-lg text-center">
            <span className={headerStyle}>Name</span>
            <span className={headerStyle}>Email</span>
            <span className={headerStyle}>Date of Birth</span>
            <span className={headerStyle}>Gender</span>
            <span className={headerStyle}>State</span>
          </div>
        </div>
        {isLoadingUsers && (
          <div className="text-center my-2">Loading users...</div>
        )}
        <div className="grid grid-cols-1 gap-4">
          {users.map((user) => (
            <User
              key={user.id}
              user={user as UserDetails}
              onEdit={handleEditUser}
              onDelete={deleteUser}
            />
          ))}
          <Dialog
            open={isModalOpen}
            onClose={closeModal}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black opacity-50" />
            <div className="fixed inset-0 p-4">
              <Dialog.Panel className="bg-white rounded-lg shadow-xl p-10">
                <Dialog.Title className="text-3xl font-bold text-gray-800 mb-6">
                  Edit User Details
                </Dialog.Title>
                <form onSubmit={handleSaveChanges}>
                  <label className={inputLabelStyle}>
                    First Name:
                    <input
                      type="text"
                      className={inputFieldStyle}
                      value={selectedUser?.firstName || ''}
                      onChange={(e) =>
                        updateSelectedUser({
                          ...selectedUser,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label className={inputLabelStyle}>
                    Last Name:
                    <input
                      type="text"
                      className={inputFieldStyle}
                      value={selectedUser?.lastName || ''}
                      onChange={(e) =>
                        updateSelectedUser({
                          ...selectedUser,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label className={inputLabelStyle}>
                    Email:
                    <input
                      type="text"
                      className={inputFieldStyle}
                      value={selectedUser?.email || ''}
                      onChange={(e) =>
                        updateSelectedUser({
                          ...selectedUser,
                          email: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label className={inputLabelStyle}>
                    Date of Birth:
                    <input
                      type="text"
                      className={inputFieldStyle}
                      value={selectedUser?.birthDate || ''}
                      onChange={(e) =>
                        updateSelectedUser({
                          ...selectedUser,
                          birthDate: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label className={inputLabelStyle}>
                    Gender:
                    <input
                      type="text"
                      className={inputFieldStyle}
                      value={selectedUser?.gender || ''}
                      onChange={(e) =>
                        updateSelectedUser({
                          ...selectedUser,
                          gender: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label className={inputLabelStyle}>
                    State:
                    <input
                      type="text"
                      className={inputFieldStyle}
                      value={selectedUser?.address?.state || ''}
                      onChange={(e) =>
                        updateSelectedUser({
                          ...selectedUser,
                          address: {
                            ...selectedUser?.address,
                            state: e.target.value,
                          },
                        })
                      }
                    />
                  </label>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      className="py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors"
                      disabled={isUpdatingUser}
                    >
                      {isUpdatingUser ? 'Updating...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default App;
