import React from "react";
import styled from "styled-components";

const Item = styled.div`
  width: 33%;
  padding: 15px;
  margin-bottom : 30px;

  @media only screen and (max-width: 767px) {
    width: 50%;
`;

const Inner = styled.div`
  padding: 15px;
  border: 1px solid #eee;
  box-shadow: 0 5px 19px -2px #efefef;
`;

type props = {
  children: React.ReactNode;
};

const Layout = ({ children }: props) => {
  return (
    <Item>
      <Inner>{children}</Inner>
    </Item>
  );
};

export default Layout;
