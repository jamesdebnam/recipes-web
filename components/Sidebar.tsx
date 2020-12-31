import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  HomeOutlined,
  MenuOutlined,
  SettingOutlined,
  KeyOutlined,
  StarOutlined,
  SmileOutlined,
  InboxOutlined,
} from "@ant-design/icons";

import Link from "next/link";
import { useRouter } from "next/router";
import s from "../styles/components/Sidebar.module.scss";
import { selectGroup } from "../redux/groupsSlice";

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

export default function Sidebar({
  isFolded,
  setIsFolded,
}: SidebarProps): React.ReactElement {
  const { route, push } = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn, userData } = useSelector((state) => state.auth);

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

  const customGroupRoutes: Route[] =
    userData.customGroups?.map((item) => {
      return {
        cb: () => dispatch(selectGroup(item.name)),
        name: item.name,
        icon: <InboxOutlined />,
      };
    }) || [];

  const loggedInRoutes: Route[] = [
    {
      cb: () => {
        if (route.split("/")[1] === "") {
          dispatch(selectGroup("all"));
        } else {
          push("/");
        }
      },
      name: "Home",
      icon: <HomeOutlined />,
    },
    {
      cb: () => dispatch(selectGroup("starred")),
      name: "Starred Recipes",
      icon: <StarOutlined />,
    },
    {
      cb: () => dispatch(selectGroup("personal")),
      name: "My Recipes",
      icon: <SmileOutlined />,
    },
    ...customGroupRoutes,
    {
      cb: () => {},
      name: "Logout",
      icon: <KeyOutlined />,
    },
  ];

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
