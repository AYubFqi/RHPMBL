import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
interface paramsF {
  name: string;
}
const ReadRPT = () => {
  const { name } = useParams<paramsF>();
  

  return <div>ReadRPT</div>;
};

export default ReadRPT;
