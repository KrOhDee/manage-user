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
      <div className="bg-gray-100 p-8">
        <div>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
