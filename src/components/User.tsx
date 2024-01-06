interface UserProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    gender: string;
    address: {
      state: string;
    };
  };
}

function User({ user }: UserProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 max-w-sm">
      <h2 className="text-lg font-semibold">{`${user.firstName} ${user.lastName}`}</h2>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-600">{`Date of Birth: ${user.birthDate}`}</p>
      <p className="text-gray-600">{`Gender: ${user.gender}`}</p>
      <p className="text-gray-600">{`State: ${user.address.state}`}</p>
    </div>
  );
}

export default User;
