import React from "react";
import { useRouter } from "next/router";
import useDataFetch from "../../components/hooks/useDataFetch";
import { LoadingOutlined } from "@ant-design/icons";

const RecipePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, data, error } = useDataFetch(`/recipes/${id}`);

  return loading ? (
    <div>
      <LoadingOutlined />
    </div>
  ) : (
    <div>
      <h1></h1>
    </div>
  );
};

export default RecipePage;
