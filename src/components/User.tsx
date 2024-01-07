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
    image: string;
  };
  onEdit: (user: UserDetails) => void;
}

const truncateEmail = (email: string, length: number): string => {
  return email.length > length ? `${email.substring(0, length - 3)}...` : email;
};

function User({
  user,
  onEdit,
  onDelete,
}: UserProps & { onDelete: (id: number) => void }) {
  const maxLength = 20;
  const flexItemStyle =
    'flex-1 p-3 border-b lg:border-b-0 lg:border-r lg:text-center';
  const responsiveLabelStyle = 'lg:hidden font-bold';

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete(user.id);
  };

  return (
    <div
      className="bg-white shadow rounded-lg mb-2 sm:w-3/4 lg:w-full cursor-pointer hover:scale-[1.02] transition-transform duration-200"
      onClick={() => onEdit(user)}
    >
      <div className="flex flex-col lg:flex-row">
        <div className="lg:text-center lg:my-auto lg:ml-2 mt-2 ml-2">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="lg:w-8 lg:h-8 w-12 h-12 m-2 rounded-full"
          />
        </div>
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
        <button
          onClick={handleDeleteClick}
          className="lg:mx-2 lg:h-fit lg:my-auto lg:p-1 p-2 bg-red-700 text-white rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default User;
