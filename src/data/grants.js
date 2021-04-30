import React from "react";
import { useQuery } from "react-query";

export const useFetchAll = (startDateStr, endDateStr, params) => {
  console.log("in the useFetchAll function", startDateStr, endDateStr);
  const { isLoading, error, data } = useQuery(
    ["grantDataAll", startDateStr, endDateStr],
    () =>
      fetch(
        ` http://grantreportflaskdev/?from_date=${startDateStr}&to_date=${endDateStr}`
        // `http://localhost:5000/?from_date=${startDateStr}&to_date=${endDateStr}`
      )
        .then((res) => res.json())
        .then((res) => res.data)
  );
  console.log("data", data);
  if (params != undefined && data != undefined) {
    const obj = data.find((arr) => arr.Grant_Name === params);
    return { isLoading: isLoading, error: error, grantObj: obj };
  }

  return { isLoading: isLoading, error: error, grantAllArr: data };
};
