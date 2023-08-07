import React from "react";
import styled from "styled-components";
import Layout from "./Layout";

const Image = styled.img`
  max-width: 100%;
  border-radius: 50%;
  width: 250px;
`;

const AuthorName = styled.h4`
  font-size: 14px;
  line-height: 15px;
  word-break: break-word;
`;

type props = {
  users: User[];
};

const UsersList = ({ users }: props) => {
  return (
    <>
      {users?.map((user) => (
        <Layout key={user.id}>
          <Image src={user.avatar_url} alt={user.login} />
          <a target="_blank" href={user.html_url}>
            <AuthorName>{user.login}</AuthorName>
          </a>
        </Layout>
      ))}
    </>
  );
};

export default UsersList;
