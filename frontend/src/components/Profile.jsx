import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default Profile;
