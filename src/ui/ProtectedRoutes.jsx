import React, { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-700);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoutes = ({ children }) => {
  // 1. load authenticated user
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  // 2.if there is no authenticated user then redirect to login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, navigate, isLoading]);

  //3. while loading show the spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. if there is authenticated user the render the app
  if (isAuthenticated) return children;
};

export default ProtectedRoutes;
