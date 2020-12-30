import React from "react";
import { IRecipe } from "../RecipeList";
import s from "../../styles/components/displays/RecipeCard.module.scss";
import Image from "next/image";
import Tag from "./Tag";
type RecipeCardProps = {
  data: IRecipe;
};

const RecipeCard = ({ data }: RecipeCardProps) => {
  return (
    <div className={s.container}>
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
          <h5> - {data.author}</h5>
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
