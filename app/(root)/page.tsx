import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";


// Định nghĩa searchParams cho hàm Home dưới dạng một Promise chứa query kiểu string (ko bắt buộc)
// Khi sử dụng generateStaticParams() hoặc generateMetadata(), searchParams là Promise khi dùng SSR kết hợp dynamic route.
export default async function Home({searchParams}: {
  searchParams: Promise<{query?: string}>
}) {
  // extract query tu searchParms
  const query = (await searchParams).query;
  // dat tham so cho GROG query
  const params = {search: query || null};

  const session = await auth();
  console.log(session?.id);

  // Lay tat ca startups theo thoi gian thuc co params cho chuc nang tim kiem
  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params});

  // console.log(JSON.stringify(posts, null, 2));

  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: { _id: 1, name: "Peeta Malark" },
  //     _id: 1,
  //     description: "This is a description",
  //     image: "https://img.freepik.com/vector-mien-phi/graident-ai-robot-vectorart_78370-4114.jpg?semt=ais_hybrid&w=740",
  //     category: "Robots",
  //     title: "We Robots"
  //   },

  // ]
  return (
    <>
      <section className="blue_container">
        <h1 className="heading">Pitch Your Startup, <br/> Connect With Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>

        <SearchForm query={query} />
      </section>
      
      <section className="section_container">
        <p className="text-30-semibold">
          {query? `Search results for "${query}"`: "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {// Map cac phan tu trong posts duoi kieu (Type) StartupCardType
          }
          {posts?.length > 0 ? (
            
            (posts as StartupCardType[]).map((post: StartupCardType, index: number) => (
              <StartupCard
                key={post?._id}
                post={post}
              />
            ))
          ): ( 
            <p className="no-results">
              No startups found
            </p>
          )}
        </ul>
      </section>

      
    </>
  );
}
