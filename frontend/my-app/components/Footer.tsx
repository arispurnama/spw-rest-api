import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-teal-500 text-white py-10  w-full ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">Online Learning</h2>
          <p>&copy; 2024 Online Learning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
