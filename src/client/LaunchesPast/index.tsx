import React from "react";
import { gql, useQuery, useLazyQuery, useApolloClient } from "@apollo/client";

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
  const book = {
    book: "The latest book",
    author: "Chris",
    id: 5,
    __typename: "Book",
  };

  const query = gql`
    query getBooks {
      books {
        book
      }
    }
  `;

  const { data: getBooksData } = useQuery(query);

  const apolloClient = useApolloClient();
  // apolloClient.writeQuery({
  //   query,
  //   data: {
  //     books: [book],
  //   },
  // });

  const { loading, error, data } = useQuery(GET_LAUNCHES_PAST, {
    variables: { limit: 3 },
  });

  const [
    getAllLaunchesPast,
    { loading: loadingGetAllLaunches, data: allLaunchesData },
  ] = useLazyQuery(GET_LAUNCHES_PAST);

  if (allLaunchesData && !loading && !error)
    // eslint-disable-next-line no-console
    console.log(allLaunchesData.launchesPast.length);

  return (
    <div>
      <div>{JSON.stringify(data)}</div>
      <div>{JSON.stringify(getBooksData)}</div>
      {/* <button type="button" onClick={() => getBooks()}>
        Click me!
      </button> */}
    </div>
  );
};

export default LaunchesPast;
