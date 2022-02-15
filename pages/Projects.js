import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import {
  AiOutlineStar,
  AiOutlineFork,
  AiFillEye,
  AiFillGithub,
} from 'react-icons/ai';
import { GrDeploy } from 'react-icons/gr';
import { BsPeopleFill } from 'react-icons/bs';

function Projects({ pinnedItems }) {
  return (
    <div className='bg-gray-700 min-h-screen'>
      <Header />
      <section className='flex justify-center'>
        <div className='grid md:grid-cols-2 gap-8 m-4 p-3 pb-10'>
          {pinnedItems.map((item) => (
            <div
              key={item.id}
              className='flex flex-col justify-between max-w-xs md:max-w-md border-2 border-blue-200 text-blue-200 bg-gray-900 rounded-lg'
            >
              <h1 className='text-center text-xl font-semibold p-2 mb-3 rounded-t-lg bg-gray-800'>
                {item.name}
              </h1>
              <div className='mx-5 relative'>
                <Image
                  className='rounded-lg'
                  src={item.openGraphImageUrl}
                  width='640px'
                  height='420px'
                  alt={item.name}
                />
                <div className='absolute inset-1 top-auto pb-2 flex justify-center items-center'>
                  {item.commits && (
                    <p className='inline-block cursor-pointer border border-cyan-600 shadow-lg bg-teal-500 text-gray-800 hover:text-blue-900 rounded-full px-3 py-1 text-xs md:text:md font-bold m-1'>
                      Commits:
                      {/* {item.object.[...onCommit].history.totalCount} */}
                    </p>
                  )}

                  {item.cloneCount && (
                    <p className='inline-block cursor-pointer border border-cyan-600 shadow-lg bg-teal-500 text-gray-800 hover:text-blue-900 rounded-full px-3 py-1 text-xs md:text:md font-bold m-1'>
                      <p className='pr-1'>Cloned:</p>
                      {item.cloneCount}
                    </p>
                  )}
                  <p className='inline-block cursor-pointer border border-cyan-600 shadow-lg bg-teal-500 text-gray-800 hover:text-blue-900 rounded-full px-3 py-1 text-xs md:text:md font-bold m-1'>
                    Views:
                    {item.viewCount}
                  </p>
                </div>
              </div>
              <p className='py-2 mx-5'>{item.description}</p>
              {/* tags */}
              <div className='mx-5 pb-2 flex flex-wrap justify-center'>
                {item.repositoryTopics.edges.map((tag) => (
                  <span
                    className='cursor-pointer inline-block bg-gray-700 text-blue-100 rounded-full px-3 py-1 text-xs font-semibold m-1'
                    key={tag.node.id}
                  >
                    {tag.node.topic.name}
                  </span>
                ))}
              </div>
              {/* Links */}
              <div className='flex justify-center items-center pb-3'>
                <Link href={item.url} passHref>
                  <a
                    className='inline-block bg-gray-400 text-gray-800 hover:text-blue-900 rounded-full px-3 py-1 text-xl font-semibold m-1'
                    target='_blank'
                  >
                    <AiFillGithub />
                  </a>
                </Link>
                {item.homepageUrl && (
                  <Link href={item.homepageUrl} passHref>
                    <a
                      className='inline-block bg-gray-400 text-gray-800 hover:text-blue-900 rounded-full px-3 py-1 text-xl font-semibold m-1'
                      target='_blank'
                    >
                      <GrDeploy />
                    </a>
                  </Link>
                )}
              </div>
              {/* last section */}
              <div className='flex justify-between rounded-b-lg bg-gray-800 p-2 px-5'>
                <div className='flex items-center space-x-4 whitespace-normal'>
                  <AiOutlineFork />
                  {item.forkCount}
                  <AiOutlineStar />
                  {item.stargazerCount}
                  <AiFillEye />
                  {item.watchers.totalCount}
                </div>
                <div className='flex space-x-2 items-center'>
                  <p className='hidden md:inline-block'>Contributors: </p>
                  <BsPeopleFill className='md:hidden' />
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
                  homepageUrl
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

  return {
    props: {
      pinnedItems: pinned,
    },
  };
}

export default Projects;
