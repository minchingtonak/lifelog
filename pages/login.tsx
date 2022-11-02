import type { GetServerSideProps, NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { signIn, signOut, useSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { ROUTES } from 'src/constants';

const LoginPage: NextPage = () => {
  return (
    <main className={styles.main}>
      <button onClick={() => signIn()}>Sign in</button>
    </main>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions,
  );

  if (session?.user) {
    return {
      redirect: {
        destination: ROUTES.root,
        permanent: false,
      },
    };
  }

  return { props: {} };
};
