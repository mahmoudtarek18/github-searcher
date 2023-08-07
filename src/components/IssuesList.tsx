import React from "react";
import styled from "styled-components";
import Layout from "./Layout";

const AuthorName = styled.h4`
  font-size: 14px;
  line-height: 15px;
  word-break: break-word;
`;

const Image = styled.img`
  max-width: 100%;
  border-radius: 50%;
  width: 50px;
`;

const User = styled.h5`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

type props = {
  issues: Issue[];
};

const IssuesList = ({ issues }: props) => {
  return (
    <>
      {issues?.map((issue) => (
        <Layout key={issue.id}>
          <a target="_blank" href={issue.html_url}>
            <AuthorName>{issue.title}</AuthorName>
          </a>
          <h4>Date: {issue.created_at}</h4>
          {issue.user?.login && (
            <User>
              <Image src={issue.user.avatar_url} alt={issue.user.login} />{" "}
              <a target="_blank" href={issue.user.html_url}>
                {issue.user.login}
              </a>
            </User>
          )}
        </Layout>
      ))}
    </>
  );
};

export default IssuesList;
