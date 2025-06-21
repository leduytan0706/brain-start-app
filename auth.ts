import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  // Modify callback functions to handle after successful OAuth
  callbacks: {
    // modify signIn callback
    // destructure name, email, image từ user
    // destructure id, username (login), bio từ profile
    async signIn({
      user: {name, email, image}, 
      profile: {id, login, bio},
    }) {
      // console.log(id);
      // Check if user with this github already exists in the DB
      const existingUser = await client
        .withConfig({useCdn: false})
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: id
      });

      // console.log(existingUser);

      // If the user hasn't existed yet, create a new one
      if (!existingUser){
        await writeClient.create({
          _type: 'author',
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || ''
        });
      }

      return true;
    },

    // modify jwt callback
    // connect github user with sanity 'author'
    async jwt({token, account, profile}){
      // check if account or profile exist before assigning id to token
      if (account && profile){
        const user = await client
          .withConfig({useCdn: false})
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id
        });

        // console.log(profile?.id);

        // connect
        token.id = user?._id;
      }

      return token;
    },

    // modify session callback
    // Đặt id của author vào session
    async session({session, token}){
      Object.assign(session, {id: token.id});
      return session;
    }
  },
})