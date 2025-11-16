import Container from "../components/Container.jsx"
import Yogesh_img from '../assets/Images/Yogesh.png'

const About = () => {
    return (
        <Container >
            <div className="px-8 space-y-6 md:space-y-12">
                <div className="flex flex-col items-center gap-4">
                    <div className="self-center ">
                        <div
                            className='flex items-center dark:bg-[#374151] dark:text-[#D1D5DB] justify-center rounded-xl bg-gray-200 px-5 py-1'>
                            <div className="font-medium text-sm">
                                About me
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex w-full flex-col justify-between gap-12 md:flex-row">
                    {/* Image */}
                    <div className="flex justify-center md:order-first md:justify-end">
                        <div className="relative h-[380px] w-[320px] md:h-[460px] md:w-[380px] lg:h-[520px] lg:w-[440px]">
                            <img
                                src={Yogesh_img}
                                className="absolute z-10 h-[360px] w-[280px] border-8 border-gray-50 dark:border-[#111827] max-md:left-5 md:right-0 md:top-0 md:h-[420px] md:w-[340px] lg:h-[480px] lg:w-[400px]"
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="absolute h-[360px] w-[320px] border-8 border-transparent bg-gray-200 dark:bg-[#374151] max-md:top-5 md:bottom-0 md:left-0 md:h-[420px] md:w-[340px] lg:h-[480px] lg:w-[400px]"></div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex max-w-xl flex-col gap-6 dark:text-[#D1D5DB]">
                        <h3 className='text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-gray-900 dark:text-[#F9FAFB]'>
                            Curious about me? Here you have it:
                        </h3>
                        <div>
                            I&apos;m a passionate,{' '}

                            self-proclaimed web developer
                            {' '}
                            who specializes in full stack development (React.js & Node.js). I am
                            enthusiastic about bringing the technical and visual aspects of
                            digital products to life. User experience,and writing clear, readable, highly performant code matters to me.
                        </div>
                        <p>
                            As a fresher, I want to begin my journey as a web developer.
                            I&apos;ve continued to grow and evolve as a developer, taking on new
                            challenges and learning the latest technologies along the way.
                            I&apos;m building cutting-edge web applications using
                            modern technologies such as React.js, Express.js, Node.js, MongoDB, Tailwindcss and much more.
                        </p>
                        <p>
                            I am very much a progressive thinker and enjoy working on products
                            end to end, from ideation all the way to development.
                        </p>
                        <h3>Finally, some quick bits about me.</h3>
                        <div className="flex flex-col gap-2 md:flex-row md:gap-6">
                            <ul className="flex list-inside list-disc flex-col gap-2">
                                <li>
                                    B.E. in Electrical Engineering
                                </li>

                                <li >Full Stack Developer</li>

                            </ul>
                            <ul className="flex list-inside list-disc flex-col gap-2">
                                <li>Avid learner</li>
                                <li >Self Motivated</li>
                            </ul>
                        </div>
                        <p>
                            One last thing, I&apos;m available for full time work, so feel free
                            to reach out and say hello!😉
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default About
