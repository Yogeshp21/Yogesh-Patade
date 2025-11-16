import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full dark:text-[#D1D5DB] bg-gray-50 dark:bg-[#111827] py-6">
      <div className="flex items-center justify-center gap-1">
          <svg className="inline-block h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copyright"><circle cx="12" cy="12" r="10"/><path d="M14.83 14.83a4 4 0 1 1 0-5.66"/></svg>
        <div className="flex items-center text-sm">
          
          {new Date().getFullYear()} |&nbsp;
          <h4>
            Designed
          </h4>
          &nbsp;and&nbsp;
          <a
          className='underline'
            href='https://github.com/Yogeshp21'
          >
            coded
          </a>
          &nbsp;with ❤️️ by Yogesh Patade
        </div>
      </div>
    </footer>
  )
}

export default Footer
