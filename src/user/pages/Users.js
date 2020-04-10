import React from 'react';
import UsersList from '../component/UsersList';
import img from "../../assets/img.jpg";

const  Users = () => {

    const USERS = [{id: "u1", name: "Rajat", image: img,places: 3 }];
  return (
   <UsersList items={USERS} />
  );
}

export default Users;
