'use client'
import React from 'react'
import Link from 'next/link'

const Header = () => {
    return (
        <header className="bg-teal-500 text-white z-50 w-full top-0 sticky">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <div className="text-2xl font-bold">
                    <Link href="/">
                        DJAGOAN
                    </Link>
                </div>
                <div className='flex flex-row items-center gap-4'>
                    <nav className="flex space-x-6">
                        <button onClick={() => window.scrollTo(0, 500)}>
                            About
                        </button>
                        <Link href="/contact">
                            Contact
                        </Link>
                    </nav>
                    <div>
                        <Link href="/signup"><button className='bg-green-950 py-2 px-9 rounded-full hover:bg-green-600'>Sign Up</button></Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
