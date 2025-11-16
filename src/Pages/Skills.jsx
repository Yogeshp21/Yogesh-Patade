import React from 'react'
import Container from '../components/Container'
import { TECHNOLOGIES } from '../components/Constants'

const Skills = () => {
  return (

    <Container>
      <div>
        <div className="flex flex-col items-center gap-4">
          <div className="self-center">
            <div className='flex items-center justify-center rounded-xl dark:bg-[#374151] dark:text-[#D1D5DB] bg-gray-200 px-5 py-1'>
              <div className="font-medium text-sm ">
                Skills
              </div>
            </div>
          </div>
          <p className="max-w-xl text-center text-[#4B5563] md:dark:text-[#D1D5DB] text-lg md:text-xl">
            The skills, tools and technologies I am really good at:
          </p>
        </div>

        <ul className="grid text-[#4B5563] grid-cols-3 mt-6 md:mt-12 gap-y-4 md:grid-cols-6 md:gap-y-8 lg:grid-cols-8 lg:gap-y-12">
          {TECHNOLOGIES.map((technology, index) => (

            <div key={index} className="flex flex-col items-center gap-2">
              <a href={technology.url} rel='noreferrer' target='blank'>
                <img
                  src={technology.logo}
                  // srcForDarkMode={darkModeLogo}
                  alt={technology.label}
                  className="transition-transform duration-300 md:hover:scale-110"
                />
              </a>
              <h3 className="text-base md:text-lg dark:text-[#D1D5DB]">{technology.label}</h3>
            </div>



          ))

          }
        </ul>
      </div>

    </Container >

  )
}

export default Skills
