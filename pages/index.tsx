import Head from "next/head";
import React from "react";
import RecipeList from "../components/RecipeList";

export default function Home(): React.ReactElement {
  return (
    <div>
      <h1>Yum Yum Time</h1>
      <h3>Let your wildest dreams come true</h3>
      <RecipeList />
    </div>
  );
}
