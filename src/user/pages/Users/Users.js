import React from 'react';
import img from "../../../assets/img.jpg";
import UserList from '../../component/UserList/UsersList';

const  Users = () => {

    const USERS = [{id: "u1", name: "Rajat", image: img,places: 3 }];
  return (
   <UserList items={USERS} />
  );
}

export default Users;
