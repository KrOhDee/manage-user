import { UserDetails } from '../App';

interface UserProps {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    gender: string;
    address: {
      state: string;
    };
  };
  onEdit: (user: UserDetails) => void;
}

const truncateEmail = (email: string, length: number): string => {
  return email.length > length ? `${email.substring(0, length - 3)}...` : email;
};

function User({ user, onEdit }: UserProps) {
  const maxLength = 20;
  const flexItemStyle =
    'flex-1 p-3 border-b lg:border-b-0 lg:border-r lg:text-center';
  const responsiveLabelStyle = 'lg:hidden font-bold';

  return (
    <div
      className="bg-white shadow rounded-lg mb-2 sm:w-3/4 lg:w-full cursor-pointer hover:scale-105 transition-transform duration-300 sm:hover:scale-110 lg:hover:scale-105"
      onClick={() => onEdit(user)}
    >
      <div className="flex flex-col lg:flex-row">
        <div className={flexItemStyle}>
          <span className={responsiveLabelStyle}>Name: </span>
          <span>{`${user.firstName} ${user.lastName}`}</span>
        </div>
        <div className={flexItemStyle}>
          <span className={responsiveLabelStyle}>Email: </span>
          <span title={user.email}>{truncateEmail(user.email, maxLength)}</span>
        </div>
        <div className={flexItemStyle}>
          <span className={responsiveLabelStyle}>Date of Birth: </span>
          <span>{user.birthDate}</span>
        </div>
        <div className={flexItemStyle}>
          <span className={responsiveLabelStyle}>Gender: </span>
          <span>{user.gender}</span>
        </div>
        <div className={flexItemStyle}>
          <span className={responsiveLabelStyle}>State: </span>
          <span>{user.address.state}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
