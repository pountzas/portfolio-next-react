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

import { AiOutlineStar, AiOutlineFork } from 'react-icons/ai';
import Link from 'next/link';

function Projects({ pinnedItems, contributors, repoTags }) {
  return (
    <div className='bg-gray-700 min-h-screen'>
      <Header />
      <section className='flex justify-center'>
        <div className='grid md:grid-cols-2 gap-8 m-4 p-3 pb-10'>
          {pinnedItems.map((item) => (
            <Link href={item.url} key={item.id} passHref>
              <div className='max-w-md border-2 border-blue-200 text-blue-200 bg-gray-900 rounded-lg p-4'>
                <h1 className='text-center text-xl font-semibold p-2'>
                  {item.name}
                </h1>
                <Image
                  className='rounded-lg p-4'
                  src={item.openGraphImageUrl}
                  width='640px'
                  height='480px'
                  alt={item.name}
                />
                <p className='py-2'>{item.description}</p>
                <div className='flex justify-center items-center space-x-4 whitespace-normal'>
                  <AiOutlineFork />
                  {item.forkCount}
                  <AiOutlineStar />
                  {item.stargazerCount}
                </div>
              </div>
            </Link>
          ))}
        </div>
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

  console.log(pinned);

  return {
    props: {
      pinnedItems: pinned,
      // repoTags: tags,
    },
  };
}

export default Projects;
