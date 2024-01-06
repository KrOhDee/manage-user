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

const truncateEmail = (email: string, length: number): string => {
  return email.length > length ? `${email.substring(0, length - 3)}...` : email;
};

function User({ user }: UserProps) {
  const maxLength = 20;
  return (
    <div className="bg-white shadow rounded-lg mb-2 sm:w-3/4 lg:w-full">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 p-3 border-b lg:border-b-0 lg:border-r lg:text-center">
          <span className="lg:hidden font-bold">Name: </span>
          <span>{`${user.firstName} ${user.lastName}`}</span>
        </div>
        <div className="flex-1 p-3 border-b lg:border-b-0 lg:border-r lg:text-center">
          <span className="lg:hidden font-bold">Email: </span>
          <span title={user.email}>{truncateEmail(user.email, maxLength)}</span>
        </div>
        <div className="flex-1 p-3 border-b lg:border-b-0 lg:border-r lg:text-center">
          <span className="lg:hidden font-bold">Date of Birth: </span>
          <span>{user.birthDate}</span>
        </div>
        <div className="flex-1 p-3 border-b lg:border-b-0 lg:border-r lg:text-center">
          <span className="lg:hidden font-bold">Gender: </span>
          <span>{user.gender}</span>
        </div>
        <div className="flex-1 p-3 lg:text-center">
          <span className="lg:hidden font-bold">State: </span>
          <span>{user.address.state}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
