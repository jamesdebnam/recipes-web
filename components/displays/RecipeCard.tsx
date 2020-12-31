import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { IRecipe } from "../RecipeList";
import s from "../../styles/components/displays/RecipeCard.module.scss";
import Image from "next/image";
import Tag from "./Tag";
import useDataFetch from "../hooks/useDataFetch";
import { addToCacheObject } from "../../redux/cacheSlice";
import axios from "axios";
import { login } from "../../redux/authSlice";
import { StarFilled, StarOutlined } from "@ant-design/icons";

type RecipeCardProps = {
  data: IRecipe;
  starred: boolean;
  sendStarRequest: () => void;
};

const RecipeCard = ({ data, starred, sendStarRequest }: RecipeCardProps) => {
  const cachedUsers = useSelector((state) => state.cache.cachedUsers);
  const dispatch = useDispatch();

  async function sendUserRequest() {
    const response = (await axios.get(`/users/${data.author}`)).data;
    if (response.status === "ok") {
      dispatch(addToCacheObject({ prop: "cachedUsers", data: response.data }));
    }
  }

  useEffect(() => {
    if (!cachedUsers[data.author]) {
      sendUserRequest();
    }
  }, []);

  return (
    <div className={s.container}>
      {starred ? (
        <StarFilled className={s.star} onClick={sendStarRequest} />
      ) : (
        <StarOutlined className={s.star} onClick={sendStarRequest} />
      )}
      <div className={s.image}>
        <Image
          src="/placeholder.png"
          layout="fill"
          objectFit="cover"
          className={s.image}
          loading="lazy"
          alt="Meal placeholder image"
        />
      </div>
      <div className={s.info}>
        <div className={s.title}>
          <h3>{data.name}</h3>
          <h5>
            &nbsp; -{" "}
            {cachedUsers[data.author] &&
              `${cachedUsers[data.author].firstName} ${
                cachedUsers[data.author].lastName
              }`}
          </h5>
        </div>
        <h5 className={s.desc}>{data.description}</h5>
        <h5>Serves: {data.serves}</h5>
        <div className={s.tags}>
          {data.tags.map((item, index) => {
            if (index < 3) {
              return <Tag name={item} key={item} className={s.tag} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
