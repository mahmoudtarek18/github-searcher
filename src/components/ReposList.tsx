import React from "react";
import styled from "styled-components";
import Layout from "./Layout";

const AuthorName = styled.h4`
  font-size: 14px;
  line-height: 15px;
  word-break: break-word;
`;

type props = {
  repos: Repo[];
};

const ReposList = ({ repos }: props) => {
  return (
    <>
      {repos?.map((repo) => (
        <Layout key={repo.id}>
          <a target="_blank" href={repo.html_url}>
            <AuthorName>{repo.full_name}</AuthorName>
          </a>
          <h4>forks: {repo.forks_count}</h4>
          <h6>visibility: {repo.visibility}</h6>
          <h6>watchers: {repo.watchers_count}</h6>
        </Layout>
      ))}
    </>
  );
};

export default ReposList;
