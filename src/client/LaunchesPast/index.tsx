import React from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

const GET_LAUNCHES_PAST = gql`
  query GetLaunchesPast($limit: Int!) {
    launchesPast(limit: $limit) {
      mission_name
      launch_site {
        site_name_long
      }
    }
  }
`;

const LaunchesPast = () => {
  const { loading, error, data } = useQuery(GET_LAUNCHES_PAST, {
    variables: { limit: 3}
  });
  
  const [
    getAllLaunchesPast,
    { loading: loadingGetAllLaunches, data: allLaunchesData },
  ] = useLazyQuery(GET_LAUNCHES_PAST,     {
    variables: { limit: 50 }
  });

  if (allLaunchesData) console.log(allLaunchesData.launchesPast.length);

  return (
      <div>
          <div>{JSON.stringify(data)}</div>
          <button onClick={() => getAllLaunchesPast()}>Click me!</button>
      </div>
  );
};

export default LaunchesPast;
