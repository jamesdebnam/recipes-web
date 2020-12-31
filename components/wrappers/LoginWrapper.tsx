import React, { useEffect } from "react";
import { Store } from "redux";
import { login } from "../../redux/authSlice";
import { addToCacheArray } from "../../redux/cacheSlice";
import useDataFetch from "../hooks/useDataFetch";

type LoginWrapperProps = {
  children: React.ReactNode;
  store: Store;
};

const LoginWrapper = ({
  children,
  store,
}: LoginWrapperProps): React.ReactNode => {
  const { error } = useDataFetch("/users/isLoggedIn", (data) =>
    store.dispatch(login(data))
  );

  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  return children;
};

export default LoginWrapper;
