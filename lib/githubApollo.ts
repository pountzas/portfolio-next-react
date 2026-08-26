import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

export function createGithubApolloClient() {
  const httpLink = new HttpLink({
    uri: "https://api.github.com/graphql"
  });

  const token = process.env.GITHUB_ACCESS_TOKEN;

  const authLink = new SetContextLink((prevContext) => ({
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }));

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
}
