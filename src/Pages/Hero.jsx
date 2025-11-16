import React from 'react'
import Container from '../components/Container'
import Hero_img from '../assets/Images/Hero.svg'
import SocialIcons from '../components/SocialIcons'

const Hero = () => {
    return (
        <Container >
            <div className="flex flex-col gap-12 md:flex-row md:px-8">
                {/* Image */}
                <div className="flex items-center justify-center md:order-last md:flex-grow md:justify-end">
                    <div className="relative h-[300px]  w-[380px] md:h-[360px] md:w-[520px]">
                        <img
                            src={Hero_img}
                            alt="Headshot of Yogesh"
                            className="absolute animate-moveUpDown z-10  max-md:left-5 md:right-6 md:top-0 "
                            style={{ objectFit: 'cover' }}
                        />
                        {/* <div className="absolute h-[280px] w-[280px] border-8 border-transparent bg-gray-200 max-md:top-5 md:bottom-0 md:right-0 md:h-[320px] md:w-[280px]"></div> */}
                    </div>
                </div>

                {/* Content */}
                <div className="flex max-w-3xl flex-grow flex-col justify-center gap-8 md:order-first md:items-start md:justify-center 2xl:gap-12">
                    <div className="flex flex-col gap-2">
                        <h1 className='text-4xl font-semibold md:font-bold md:text-5xl md:tracking-[-0.02em] lg:text-6xl lg:leading-[72px] dark:text-[#F9FAFB] text-gray-900'>
                            Hi, I&apos;m Yogesh{' '}
                            <span className="inline-block animate-waving-hand">👋</span>
                        </h1>
                        <p className='text-base font-normal dark:text-[#D1D5DB]'>
                            I&apos;m a full stack developer <a href='https://www.linkedin.com/in/yogeshpatade21/' target='blank'>(React.js & Node.js)</a> with a focus
                            on creating exceptional digital
                            experiences that are fast, accessible, visually appealing, and
                            responsive. 
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 text-base font-normal dark:text-[#D1D5DB]">
                        <div className="flex gap-2">
                            <svg className="stroke-gray-600 dark:stroke-[#D1D5DB]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                            <div>Nashik, India</div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center">
                                <span className="relative flex h-3 w-3">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                                </span>
                            </div>
                            <p>Available for work</p>
                        </div>
                    </div>
                        <SocialIcons/>  
                </div>
            </div>
        </Container>
    )
}

export default Hero
