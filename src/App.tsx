import { useState, useEffect } from 'react';
import User from './components/User';
import './App.css';

interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  gender: string;
  address: {
    state: string;
  };
}

function App() {
  const [users, setUsers] = useState<UserDetails[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);
  return (
    <>
      <header className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">
            User Management Page
          </h1>
        </div>
      </header>
      <div className="bg-gray-100 p-8">
        <div className="mb-4">
          <div className="hidden lg:flex mb-4 px-2 py-5 bg-gray-200 rounded-t-lg text-center">
            <span className="font-bold text-gray-600 flex-1">Name</span>
            <span className="font-bold text-gray-600 flex-1">Email</span>
            <span className="font-bold text-gray-600 flex-1">
              Date of Birth
            </span>
            <span className="font-bold text-gray-600 flex-1">Gender</span>
            <span className="font-bold text-gray-600 flex-1">State</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
