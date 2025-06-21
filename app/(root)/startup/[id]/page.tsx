import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { sanityFetch } from '@/sanity/lib/live';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { IMAGES_MANIFEST } from 'next/dist/shared/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupCardSkeleton, StartupCardType } from '@/components/StartupCard';

const md = markdownit();

export const experimental_ppr = true;

// Áp dụng PPR: phần chi tiết startup được render sử dụng ISR (Incremental Static Rendering) còn phần Views thì sử dụng SSR (Server Side Rendering)
// Destructure params va dinh nghia kieu cua params la promise tra lai id kieu string
const Page = async ({params}: {params: Promise<{id: string}>}) => {
    const id = (await params).id;

    // Parallel data fetching using Promise.all
    const [post, {select: editorPicks}] = await Promise.all(
        [   
            await client.fetch(STARTUP_BY_ID_QUERY, {id}),     // get the start by _id
            await client.fetch(
                PLAYLIST_BY_SLUG_QUERY, {slug: "editor-s-picks"}
            ) // Get startup playlist by slug
        ]
    );


    if (!post) return notFound();

    const {_createdAt, title, description, author, pitch, views, image, category} = post;

    const parsedPitch = md.render(pitch || '');

  return (
    <>
        <section className='blue_container !min-h-[230px]'>
            <p className='tag'>{formatDate(_createdAt)}</p>
            <h1 className='heading'>{title}</h1>
            <p className='sub-heading'>{description}</p>
        </section>
        <section className='section_container'>
            <img 
                src={`${image}`}
                alt="thumbnail" 
                className='w-full h-auto rounded-xl'
            />
            <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
                <div className='flex-between gap-5'>
                    <Link 
                        href={`/user/${author?._id}`}
                        className='flex gap-2 items-center mb-3'
                    >
                        <Image 
                            src={`${author?.image}`}
                            alt="avatar"
                            width={64}
                            height={64}
                            className='rounded-full drop-shadow-lg'
                        />

                        <div>
                            <p className='text-20-medium'>{author?.name}</p>
                            <p className='text-16-medium !text-black-300'>@{author?.username}</p>
                        </div>
                    </Link>

                    <p className="category-tag">{post.category}</p>
                </div>

                <h3 className='text-30-bold'>
                    Startup Details
                </h3>
                {parsedPitch? (
                    <article
                        dangerouslySetInnerHTML={
                            {
                                __html: parsedPitch
                            }
                        }
                        /* break-all (word-break: break-all): được sử dụng để ngắt dòng tại bất kỳ ký tự nào, bao gồm cả giữa các từ, để ngăn tràn nội dung ra khỏi vùng chứa */
                        className='prose max-w-4xl font-work-sans break-all'
                    />
                ): (
                    <p className='no-result'>
                        No details provided
                    </p>
                )}

                <hr className='divider'/>
                
                <Suspense fallback={<StartupCardSkeleton />}>
                    {editorPicks?.length > 0 && (
                    <div className='max-w-4xl mx-auto'>
                        <p className='text-30-semibold'>Editor's Picks</p>

                        <ul className='mt-7 card_grid-sm'>
                            {editorPicks.map((startup: StartupCardType, index: number) => (
                                <StartupCard key={index} post={startup}/>
                            ))}
                        </ul>
                    </div>
                    )}
                </Suspense>
                

                {/* Noi dung dynamic duoc bao quanh boi the Suspense */}
                <Suspense fallback={<Skeleton className='view_skeleton'/>}>
                    <View id={id} />
                </Suspense>
            </div>
            
        </section>
    </>
  )
}

export default Page