import { Profile } from "@/components/Profile";
import { serverTrpc } from "@/utils/server/trpc";
import { inferRouterOutputs } from "@trpc/server";
import { getUserSchema } from "@weett/schemas";
import { AppRouter, t } from "@weett/server/src/trpc";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

type PageProps = {
  user: NonNullable<inferRouterOutputs<AppRouter>["user"]["getUser"]>;
};

const User: NextPage<PageProps> = ({ user }) => {
  return (
    <>
      <Profile user={user} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const parse = getUserSchema.safeParse(params);

  if (!parse.success) {
    return { notFound: true };
  }

  const { handle } = parse.data;

  const user = await serverTrpc.user.getUser.query({ handle });

  if (!user)
    return {
      notFound: true,
    };

  return {
    props: { user },
    revalidate: 60,
  };
};

export default User;
