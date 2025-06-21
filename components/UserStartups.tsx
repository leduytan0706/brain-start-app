import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard, { StartupCardType } from './StartupCard'
import Link from 'next/link'

const UserStartups = async ({id, userId}: {id: string, userId: string}) => {
    const startups = await client
        .fetch(STARTUPS_BY_AUTHOR_QUERY, {id})

  return (<>
    {(startups.length > 0)? (
        startups.map((startup: StartupCardType) => (
            <StartupCard key={startup._id} post={startup} />
        ))
    ): (

        <li>
            <p className='text-xl'>
                No startups created yet.
            </p>
            {userId === id && (
                <Link href="/startup/create" className='text-20-medium !text-secondary'>
                    Create Pitch
                </Link>
            )}
        </li>
    )}
  </>
  )
}

export default UserStartups