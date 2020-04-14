import React, { useState, useEffect } from 'react';
import UserList from '../../component/UserList/UsersList';
import LoadingSpinner from '../../../shared/components/UIElements/Loader/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Error/ErrorModal';
import { useHttpClient } from '../../../shared/components/hooks/httpHook';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users');
        setLoadedUser(responseData.users)
      } catch (err) { }
    }
    fetchUsers();
  }, [sendRequest])

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {
        isLoading && <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      }
      {!isLoading && loadedUser && <UserList items={loadedUser} />}
    </React.Fragment>
  );
}

export default Users;
