import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from '../components/Header';
import Footer from '../components/Footer';

import {
  AiOutlineStar,
  AiOutlineFork,
  AiFillEye,
  AiFillGithub
} from 'react-icons/ai';
import { GrDeploy } from 'react-icons/gr';
import { BsPeopleFill } from 'react-icons/bs';

function Projects({ pinnedItems }) {
  const [projects, setProjects] = useState(pinnedItems);
  return (
    <div className='min-h-screen bg-gray-700'>
      <Header />
      <section className='flex justify-center'>
        <div className='grid gap-8 p-3 pb-10 m-4 md:grid-cols-2'>
          {projects.map((item) => (
            <div
              key={item.id}
              className='flex flex-col justify-between max-w-xs text-blue-200 bg-gray-900 border-2 border-blue-200 rounded-lg md:max-w-md'
            >
              <h1 className='p-2 mb-3 text-xl font-semibold text-center bg-gray-800 rounded-t-lg'>
                {item.name}
              </h1>
              <div className='relative mx-5'>
                <Image
                  className='rounded-lg'
                  src={item.openGraphImageUrl}
                  width='640px'
                  height='420px'
                  alt={item.name}
                />
                <div className='absolute top-auto flex items-center justify-center pb-2 inset-1'>
                  {item.object && (
                    <p className='flex px-3 py-1 m-1 text-xs font-bold text-gray-800 bg-teal-500 border rounded-full shadow-lg cursor-pointer border-cyan-600 hover:text-blue-900 md:text:md'>
                      <p className='pr-1'>Commits: </p>
                      {item.object.history.totalCount}
                    </p>
                  )}

                  {item.cloneCount && (
                    <p className='inline-block px-3 py-1 m-1 text-xs font-bold text-gray-800 bg-teal-500 border rounded-full shadow-lg cursor-pointer border-cyan-600 hover:text-blue-900 md:text:md'>
                      <p className='pr-1'>Cloned:</p>
                      {item.cloneCount}
                    </p>
                  )}

                  {item.viewCount && (
                    <p className='inline-block px-3 py-1 m-1 text-xs font-bold text-gray-800 bg-teal-500 border rounded-full shadow-lg cursor-pointer border-cyan-600 hover:text-blue-900 md:text:md'>
                      <p className='pr-1'>Views:</p>
                      {item.viewCount}
                    </p>
                  )}
                </div>
              </div>
              <p className='py-2 mx-5'>{item.description}</p>
              {/* tags */}
              <div className='flex flex-wrap justify-center pb-2 mx-5'>
                {item.repositoryTopics.edges.map((tag) => (
                  <span
                    className='inline-block px-3 py-1 m-1 text-xs font-semibold text-blue-100 bg-gray-700 rounded-full cursor-pointer'
                    key={tag.node.id}
                  >
                    {tag.node.topic.name}
                  </span>
                ))}
              </div>
              {/* Links */}
              <div className='flex items-center justify-center pb-3'>
                <Link href={item.url} passHref>
                  <a
                    className='inline-block px-3 py-1 m-1 text-xl font-semibold text-gray-800 bg-gray-400 rounded-full hover:text-blue-900'
                    target='_blank'
                  >
                    <AiFillGithub />
                  </a>
                </Link>
                {item.homepageUrl ? (
                  <Link href={item.homepageUrl} passHref>
                    <a
                      className='inline-block px-3 py-1 m-1 text-xl font-semibold text-gray-800 bg-gray-400 rounded-full hover:text-blue-900'
                      target='_blank'
                    >
                      <GrDeploy />
                    </a>
                  </Link>
                ) : (
                  <p className='inline-block px-3 py-1 m-1 text-sm font-bold text-gray-800 bg-gray-400 rounded-full hover:text-blue-900'>
                    in progress
                  </p>
                )}
              </div>
              {/* last section */}
              <div className='flex justify-between p-2 px-5 bg-gray-800 rounded-b-lg'>
                <div className='flex items-center space-x-4 whitespace-normal'>
                  <AiOutlineFork />
                  {item.forkCount}
                  <AiOutlineStar />
                  {item.stargazerCount}
                  <AiFillEye />
                  {item.watchers.totalCount}
                </div>
                <div className='flex items-center space-x-2'>
                  <p className='hidden md:inline-block'>Contributors: </p>
                  <BsPeopleFill className='md:hidden' />
                  {item.assignableUsers.edges.map((user) => (
                    <div
                      className='relative group-hover:opacity-100'
                      key={user.node.id}
                    >
                      <Image
                        className='rounded-full'
                        src={user.node.avatarUrl}
                        width='25px'
                        height='25px'
                        alt={user.node.name}
                      />
                      <span className='absolute inset-0 z-10 flex justify-center text-sm font-semibold text-gray-300 opacity-0 -top-6 hover:opacity-100 whitespace-nowrap'>
                        {user.node.name}
                      </span>
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
                  object(expression: "main") {
                    ... on Commit {
                      id
                      history {
                        totalCount
                      }
                    }
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

  // console.log(pinned[0].object);

  return {
    props: {
      pinnedItems: pinned,
    },
  };
}

export default Projects;
