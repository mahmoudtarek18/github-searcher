import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchUsers } from "../features/users-slice";
import UsersList from "./UsersList";
import { fetchIssues } from "../features/issues-slice";
import styled from "styled-components";
import { resetError } from "../features/error-slice";
import IssuesList from "./IssuesList";
import { fetchRepos } from "../features/repos-slice";
import ReposList from "./ReposList";
import { debounce } from "lodash";
import { resetLoading, setLoading } from "../features/loading-slice";

const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  color: #888;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 10px;
  color: #888;
  font-weight: 500;
`;

const Container = styled.div`
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
`;

const Searcher = () => {
  const dispatch = useAppDispatch();
  const [searchKey, setSearchKey] = useState("users");
  const [searchValue, setSearchValue] = useState("");
  const [nonFilteredItems, setNonFilteredItems] = useState<
    User[] | Issue[] | Repo[]
  >([]);
  const [filteredItems, setFilteredItems] = useState<User[] | Issue[] | Repo[]>(
    []
  );
  const usersEntities = useAppSelector((state) => state.users.entities);
  const issuesEntities = useAppSelector((state) => state.issues.entities);
  const reposEntities = useAppSelector((state) => state.repos.entities);
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const error = useAppSelector((state) => state.error?.error);

  const changeUserHandler = (userName: string) => {
    const userNameTrimed = userName.trim();
    if (userNameTrimed.length < 3) {
      error && dispatch(resetError());
      return;
    }
    if (userNameTrimed && error) {
      dispatch(resetError());
    }
    if (!usersEntities.some((user) => user.userName === userNameTrimed)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(fetchUsers(userNameTrimed)).then((res: any) => {
        if (Array.isArray(res.payload.items)) {
          setNonFilteredItems(res.payload.items);
          setFilteredItems(res.payload.items.slice(0, 10));
        }
      });
    } else {
      const searchedUsers = usersEntities.find(
        (userEntitle) => userEntitle.userName === userNameTrimed
      )?.items;
      if (searchedUsers) {
        setNonFilteredItems(searchedUsers);
        setFilteredItems(searchedUsers.slice(0, 10));
      }
    }
  };

  // reset the loading and the error at the beginning
  useEffect(() => {
    dispatch(resetError());
    dispatch(resetLoading());
  }, []);

  useEffect(() => {
    dispatch(resetLoading());
  }, [filteredItems]);

  useEffect(() => {
    if (searchValue.length >= 3) {
      dispatch(setLoading());
      debouncedChangeHandler(searchValue);
    }
  }, [searchKey]);

  useEffect(() => {
    let batchIndex = 0;
    let endIndex = Math.min(batchIndex + 10, nonFilteredItems.length);

    function handleScroll(): void {
      if (batchIndex >= nonFilteredItems.length) {
        window.removeEventListener("scroll", handleScroll);
        return;
      }

      const scrollPosition = window.innerHeight + window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight) {
        batchIndex = endIndex;
        endIndex = Math.min(batchIndex + 5, nonFilteredItems.length);
        const batch = nonFilteredItems.slice(0, endIndex);
        setFilteredItems(batch);
      }
    }

    window.addEventListener("scroll", handleScroll);
  }, [nonFilteredItems]);

  const changeIssuesHandler = (issueName: string) => {
    const issueNameTrimed = issueName.trim();
    if (issueNameTrimed.length < 3) {
      error && dispatch(resetError());
      return;
    }
    if (issueNameTrimed && error) {
      dispatch(resetError());
    }

    if (!issuesEntities.some((issue) => issue.issueName === issueNameTrimed)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(fetchIssues(issueNameTrimed)).then((res: any) => {
        if (Array.isArray(res.payload.items)) {
          setNonFilteredItems(res.payload.items);
          setFilteredItems(res.payload.items.slice(0, 10));
        }
      });
    } else {
      const searchedIssues = issuesEntities.find(
        (issueEntitle) => issueEntitle.issueName === issueNameTrimed
      )?.items;
      if (searchedIssues) {
        setNonFilteredItems(searchedIssues);
        setFilteredItems(searchedIssues.slice(0, 10));
      }
    }
  };

  const changeReposHandler = (repoName: string) => {
    const repoNameTrimed = repoName.trim();
    if (repoNameTrimed.length < 3) {
      error && dispatch(resetError());
      return;
    }
    if (repoNameTrimed && error) {
      dispatch(resetError());
    }
    if (!reposEntities.some((repo) => repo.repoName === repoNameTrimed)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(fetchRepos(repoNameTrimed)).then((res: any) => {
        if (Array.isArray(res.payload.items)) {
          setNonFilteredItems(res.payload.items);
          setFilteredItems(res.payload.items.slice(0, 10));
        }
      });
    } else {
      const searchedRepos = reposEntities.find(
        (repoEntitle) => repoEntitle.repoName === repoNameTrimed
      )?.items;
      if (searchedRepos) {
        setNonFilteredItems(searchedRepos);
        setFilteredItems(searchedRepos.slice(0, 10));
      }
    }
  };

  const debouncedChangeHandler = debounce((value: string) => {
    if (searchKey === "users") {
      changeUserHandler(value);
    } else if (searchKey === "issues") {
      changeIssuesHandler(value);
    } else {
      changeReposHandler(value);
    }
  }, 500);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    if (val.length < 3) {
      dispatch(resetLoading());
    } else {
      dispatch(setLoading());
    }
    setSearchValue(val);
    debouncedChangeHandler(val);
  };

  const changeSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchKey(e.target.value);
  };

  return (
    <>
      <h3>Github Searcher</h3>
      <p>Search users or repositories blew</p>
      <Input
        onChange={changeHandler}
        value={searchValue}
        placeholder="Start typing to search ..."
      />
      <Select onChange={changeSelectHandler}>
        <option value="users">Users</option>
        <option value="issues">Issues</option>
        <option value="repos">Repos</option>
      </Select>
      {!isLoading && error && <p>there is something wrong</p>}
      {isLoading && <p>Loading.....</p>}
      {!error &&
        !isLoading &&
        nonFilteredItems.length === 0 &&
        searchValue.length >= 3 && <p>There is no data to show</p>}
      <Container>
        {!error &&
          !isLoading &&
          searchKey === "users" &&
          searchValue.length >= 3 && (
            <UsersList users={filteredItems as User[]} />
          )}
        {!error &&
          !isLoading &&
          searchKey === "issues" &&
          searchValue.length >= 3 && (
            <IssuesList issues={filteredItems as Issue[]} />
          )}
        {!error &&
          !isLoading &&
          searchKey === "repos" &&
          searchValue.length >= 3 && (
            <ReposList repos={filteredItems as Repo[]} />
          )}
      </Container>
    </>
  );
};

export default Searcher;
