import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  HomeOutlined,
  MenuOutlined,
  SettingOutlined,
  KeyOutlined,
  StarOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import Link from "next/link";
import { useRouter } from "next/router";
import s from "../styles/components/Sidebar.module.scss";

type SidebarProps = {
  isFolded: boolean;
  setIsFolded: (val: boolean) => void;
};

type Route = {
  route?: string;
  cb?: () => void;
  name: string;
  icon: React.ReactNode;
};

const notLoggedInRoutes: Route[] = [
  {
    route: "",
    name: "Home",
    icon: <HomeOutlined />,
  },
  {
    route: "login",
    name: "Login",
    icon: <SettingOutlined />,
  },
  {
    route: "signup",
    name: "Sign Up",
    icon: <KeyOutlined />,
  },
];
const loggedInRoutes: Route[] = [
  {
    route: "",
    name: "Home",
    icon: <HomeOutlined />,
  },
  {
    cb: () => {},
    name: "Starred Recipes",
    icon: <StarOutlined />,
  },
  {
    cb: () => {},
    name: "My Recipes",
    icon: <SmileOutlined />,
  },
  {
    cb: () => {},
    name: "Logout",
    icon: <KeyOutlined />,
  },
];

export default function Sidebar({
  isFolded,
  setIsFolded,
}: SidebarProps): React.ReactElement {
  const { route } = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  function isRouteMatched(path) {
    let routePath = route.split("/")[1];
    return path === routePath;
  }

  function renderRoute({ route, name, cb, icon }: Route): React.ReactNode {
    const innerComponent = (
      <li
        onClick={cb ? cb : () => {}}
        className={
          isRouteMatched(route)
            ? `${s.listItem} ${s.listItemActive}`
            : s.listItem
        }
      >
        {icon}
        {!isFolded && <span> &nbsp; {name}</span>}
      </li>
    );

    return route !== undefined ? (
      <Link key={name} href={`/${route}`}>
        {innerComponent}
      </Link>
    ) : (
      innerComponent
    );
  }

  return (
    <div
      className={
        isFolded
          ? `${s.sidebarContainer} ${s.sidebarContainerFolded}`
          : s.sidebarContainer
      }
    >
      <ul className={s.list}>
        <li
          className={s.listItem}
          onClick={() => setIsFolded(!isFolded)}
          data-cy="sb__fold"
        >
          <MenuOutlined />
        </li>
        {isLoggedIn
          ? loggedInRoutes.map(renderRoute)
          : notLoggedInRoutes.map(renderRoute)}
      </ul>
    </div>
  );
}
