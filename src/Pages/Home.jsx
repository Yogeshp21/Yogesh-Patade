import React from 'react'
import Header from '../components/Header/Header'
import Hero from './Hero'
import About from './About'
import Skills from './Skills'
import Work from './Work'
import Contact from './Contact'
import Footer from '../components/Footer'


const Home = () => {
    return (
        <div className='dark:bg-[#030712] '>
            <div className={`sticky top-0 z-30 w-full border-b border-transparent bg-gray max-md:border-gray-0 bg-gray/50 backdrop-blur-xl`}>
                <Header />
            </div>
            <div className='py-16 md:py-24' id='home' >
                <Hero />
            </div>
            <div className='py-16 md:py-24 bg-[#F9FAFB] dark:bg-[#111827]' id="about" >
                <About />
            </div>
            <div className='py-16 md:py-24 ' id='skills'>
                <Skills />
            </div>
            <div className='py-16 md:py-24 dark:bg-[#111827]' id="work" >
                <Work />
            </div >
            <div className='py-16 md:py-24' id="contact" >
                <Contact />
            </div >
            <Footer />
        </div>
    )
}

export default Home
