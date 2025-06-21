import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'
import { after } from 'next/server'

// Dynamically rendered content
const View = async ({id}: {id: string}) => {
    // Lấy số lượng người xem mới nhất
    const result = await client
        .withConfig({useCdn: false})
        .fetch(STARTUP_VIEWS_QUERY, { id });

    // console.log(result);
    const {views: totalViews} = result;

    // Sau khi lấy được totalViews thì mới tăng lượng views lên
    after(async () => {
        await writeClient
            .patch(id)
            .set({views: totalViews + 1})
            .commit();

    })
    // Cập nhật số lượng người xem mỗi khi component được render
   

  return (
    <div className='view-container'>
        {/* absolute = position: absolute
        -top-2 = top: -0.5rem
        -right-2 = right: -0.5rem
        */}
        <div className='absolute -top-2 -right-2'>
            <Ping />
        </div>
        <p className='view-text'>
            <span className='font-black'>{totalViews} {totalViews == 1? "Views": "View"}</span>
        </p>
    </div>
  )
}

export default View