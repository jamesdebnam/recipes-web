import "antd/dist/antd.css";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "../styles/global.scss";
import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import { store } from "../redux/store";
import useDataFetch from "../components/hooks/useDataFetch";
import CacheWrapper from "../components/wrappers/CacheWrapper";
import LoginWrapper from "../components/wrappers/LoginWrapper";

axios.defaults.baseURL = "http://localhost:3001/api";
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  const [isFolded, setIsFolded] = useState(false);

  return (
    <Provider store={store}>
      <LoginWrapper store={store}>
        <CacheWrapper store={store}>
          <>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, minimum-scale=1"
              />
            </Head>

            <Sidebar isFolded={isFolded} setIsFolded={setIsFolded} />

            <div
              className={
                isFolded
                  ? "content-container content-container-folded"
                  : "content-container"
              }
            >
              <Component {...pageProps} />
            </div>
          </>
        </CacheWrapper>
      </LoginWrapper>
    </Provider>
  );
}

export default MyApp;
