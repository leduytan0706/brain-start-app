import { auth, signIn, signOut } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

// Server component: vì xử lý chạy asynchronous và làm việc với session

const Navbar = async () => {
    const session = await auth();

  return (
    // px-5: padding horizontal (1.25rem), py-3: padding vertical (0.75rem)
    // bg-white: background color white, shadow-sm: small shadow
    // font-work-sans: font family sans-serig
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
        {// flex: display flex
        // justify-between: justify content space-between
        // items-center: align items center
        }
        <nav className='flex justify-between items-center'>
            <Link href="/">
                <Image src="/logo.png" alt="logo" width={144} height={30} />
            </Link>
            {// gap-5: flex gap 1.25rem
            // text-black: color black
            }
            <div className='flex items-center gap-5 text-black'>
                {session && session?.user ? (
                    <>
                        <Link href="/startup/create" >
                            <span className='max-sm:hidden'>Create</span>
                            <BadgePlus className='size-6 sm:hidden'/>
                        </Link>
                        {// server action on form submit (React 19)
                        }
                        <form action={async () => {
                            'use server';

                            await signOut({redirectTo: "/"});
                        } } className='h-full flex items-center'>
                            <button 
                                className='cursor-pointer'
                                type='submit'
                            >   
                                <span className='max-sm:hidden'>Logout</span>
                                <LogOut className='size-6 sm:hidden text-red-500' />
                            </button>
                        </form>
                        <Link href={`/user/${session?.id}`}>
                            <Avatar className='size-10'>
                                <AvatarImage 
                                    src={session?.user?.image || ""}
                                    alt={session?.user?.name || ""}
                                />
                                <AvatarFallback >
                                    AV
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                    </>
                ) : (
                    
                    <form action={async () => {
                        // make sure signIn is used on the server
                        'use server';
                        await signIn('github');
                    }}>
                        <button className='cursor-pointer' type="submit">Login</button>
                    </form>
                )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar