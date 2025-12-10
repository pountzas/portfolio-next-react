import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';

import Header from '../components/Header';
import Footer from '../components/Footer';
import type { PinnedRepository, GitHubApiResponse } from '../types/github';

import {
  AiOutlineStar,
  AiOutlineFork,
  AiFillEye,
  AiFillGithub
} from 'react-icons/ai';
import { GrDeploy } from 'react-icons/gr';
import { BsPeopleFill } from 'react-icons/bs';

interface ProjectsProps {
  pinnedItems: PinnedRepository[];
}

const Projects: React.FC<ProjectsProps> = ({ pinnedItems }) => {
  const [projects, setProjects] = useState<PinnedRepository[]>(pinnedItems);

  // console.log(projects);

  return (
    <div className='max-h-screen overflow-y-scroll cursor-pointer bg-tertiary scrollbar-hide'>
      <Header />
      <section className='flex justify-center'>
        <div className='grid gap-8 p-3 pb-10 m-4 md:grid-cols-2'>
          {projects.map((item) => (
            <div
              key={item.id}
              className='flex flex-col justify-between max-w-xs border-2 text-textPrimary border-borderSecondary rounded-xl bg-quaternary md:max-w-md'
            >
              <h1 className='p-2 mb-3 text-xl font-semibold text-center rounded-t-lg bg-secondary'>
                {item.name}
              </h1>
              <div className='relative mx-5'>
                <Image
                  className='rounded-lg'
                  src={item.openGraphImageUrl}
                  width={640}
                  height={420}
                  alt={item.name}
                  priority
                />
                <div className='absolute top-auto flex items-center justify-center pb-2 inset-1'>
                  {/* {item.object && ( */}
                    <p className='flex px-3 py-1 m-1 text-xs font-bold text-gray-800 bg-teal-500 border rounded-full shadow-lg cursor-pointer border-cyan-600 hover:text-blue-900 md:text:md'>
                      <span className='pr-1'>Commits: </span>
                      {item.object?.history?.totalCount}
                    </p>
                  {/* )} */}

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
                    className='inline-block px-3 py-1 m-1 text-xs font-semibold text-blue-100 rounded-full cursor-pointer bg-tertiary'
                    key={tag.node.id}
                  >
                    {tag.node.topic.name}
                  </span>
                ))}
              </div>
              {/* Links */}
              <div className='flex items-center justify-center pb-3'>
                <Link target={'_blank'} href={item.url} passHref>
                  <div
                    className='inline-block px-3 py-1 m-1 text-xl font-semibold rounded-full text-textSecondary bg-textTertiary hover:bg-tertiary'
                  >
                    <AiFillGithub />
                  </div>
                </Link>
                {item.homepageUrl ? (
                  <Link target={'_blank'} href={item.homepageUrl} passHref>
                    <div
                      className='inline-block px-3 py-1 m-1 text-xl font-semibold rounded-full text-textSecondary bg-textTertiary hover:bg-tertiary'
                    >
                      <GrDeploy />
                    </div>
                  </Link>
                ) : (
                  <p className='inline-block px-3 py-1 m-1 text-sm font-bold rounded-full text-textSecondary bg-textTertiary hover:bg-tertiary'>
                    in progress
                  </p>
                )}
              </div>
              {/* last section */}
              <div className='flex justify-between p-2 px-5 rounded-b-lg bg-secondary'>
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
                        width={25}
                        height={25}
                        alt={user.node.name || 'Contributor'}
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
  const httpLink = new HttpLink({
    uri: 'https://api.github.com/graphql',
  });

  const token = process.env.GITHUB_ACCESS_TOKEN;

  const authLink = new SetContextLink((prevContext, operation) => ({
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const { data } = await client.query<GitHubApiResponse>({
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

  if (!data) {
    throw new Error('Failed to fetch GitHub data');
  }

  const { user } = data;
  const pinned = user.pinnedItems.edges.map(({ node }: { node: PinnedRepository }) => node);

  return {
    props: {
      pinnedItems: pinned,
    },
    revalidate: 60,
  };
}

export default Projects;
