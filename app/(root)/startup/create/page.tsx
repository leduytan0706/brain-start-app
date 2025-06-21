import StartupForm from '@/components/StartupForm'
import React from 'react'

const Page = () => {
    return (<>
        <div className='blue_container !min-h-[230px]'>
            <h1 className='heading'>Submit Your Idea</h1>
        </div>

        <StartupForm />
    </>)
}

export default Page