import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

function Projects({ pinnedItems }) {
  return (
    <div className='bg-gray-700 min-h-screen'>
      <Header />
      <section className='m-4'>
        {pinnedItems.map((item) => (
          <div
            key={item.id}
            className='border-2 border-blue-200 text-blue-200 bg-gray-800 rounded-lg'
          >
            <h1>{item.name}</h1>
            <Image
              className=''
              src={item.openGraphImageUrl}
              width='640px'
              height='480px'
              alt={item.name}
            />
            <p>{item.description}</p>
            <p>
      Projects Page
              {item.forkCount}
            </p>
            <p>
              {item.stargazerCount}
            </p>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      {
        user(login: "pountzas") {
          id
          pinnedItems(first: 6) {
            edges {
              node {
                ... on Repository {
                  id
                  name
                  forkCount
                  stargazerCount
                  openGraphImageUrl
                  assignableUsers(first: 5) {
                    edges {
                      node {
                        id
                        avatarUrl
                        name
                      }
                    }
                  }
                  description
                  url
                  repositoryTopics(first: 6) {
                    edges {
                      node {
                        id
                        topic {
                          name
                        }
                      }
                    }
                  }
                  watchers {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  const { user } = data;
  const pinned = user.pinnedItems.edges.map(({ node }) => node);
  // console.log(pinnedItems);

  return {
    props: {
      pinnedItems: pinned,
    },
  };
}

export default Projects;
