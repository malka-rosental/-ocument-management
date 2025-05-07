
import { UserIcon } from 'src/assets/icons/user-icon';

import { useUser } from '../../contexts/UserContext';

export const UserInfo = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'row', direction:'rtl' }}>
      <UserIcon />
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        <span>{user.displayName}</span>
        <span>{user.userLibrary}</span>
      </div>
    </div>
  );
};

