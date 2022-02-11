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

import { AiOutlineStar, AiOutlineFork, AiFillEye } from 'react-icons/ai';
import Link from 'next/link';

function Projects({ pinnedItems, contributors, repoTags }) {
  return (
    <div className='bg-gray-700 min-h-screen'>
      <Header />
      <section className='flex justify-center'>
        <div className='grid md:grid-cols-2 gap-8 m-4 p-3 pb-10'>
          {pinnedItems.map((item) => (
            <Link href={item.url} key={item.id} passHref>
              <div className='flex flex-col justify-between max-w-md border-2 border-blue-200 text-blue-200 bg-gray-900 rounded-lg'>
                <h1 className='text-center text-xl font-semibold p-2 mb-3 rounded-t-lg bg-gray-800'>
                  {item.name}
                </h1>
                <div className='mx-5'>
                  <Image
                    className='rounded-lg'
                    src={item.openGraphImageUrl}
                    width='640px'
                    height='480px'
                    alt={item.name}
                  />
                </div>
                <p className='py-2 mx-5'>{item.description}</p>
                <div className='flex justify-between rounded-b-lg bg-gray-800 p-2 px-5'>
                  <div className='flex items-center space-x-4 whitespace-normal'>
                    <AiOutlineFork />
                    {item.forkCount}
                    <AiOutlineStar />
                    {item.stargazerCount}
                    <AiFillEye />
                    {item.watchers.totalCount}
                  </div>
                  <div className='flex space-x-2'>
                    <p>Contributors: </p>
                    {item.assignableUsers.edges.map((user) => (
                      <div className='' key={user.node.id}>
                        <Image
                          className='rounded-full'
                          src={user.node.avatarUrl}
                          width='25px'
                          height='25px'
                          alt={user.node.name}
                        />
                      </div>
                    ))}
                  </div>
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
