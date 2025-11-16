import React from 'react'
import Container from '../components/Container'
import { PROJECTS, TECHNOLOGIES } from '../components/Constants'

const Work = () => {
    return (
        <Container id="work">
            <div className="flex flex-col items-center gap-4">
                <div className="self-center">
                    <div
                        className='flex items-center dark:bg-[#374151] dark:text-[#D1D5DB] justify-center rounded-xl bg-gray-200 px-5 py-1'
                    >
                        <h3 className="font-medium text-sm">
                            Work
                        </h3>
                    </div>
                </div>
                <div className="max-w-xl text-center text-lg md:text-xl mb-12 dark:text-[#D1D5DB]">
                    Some of the noteworthy projects I have built:
                </div>
            </div>
            <div className='space-y-6 md:space-y-12 dark:text-[#D1D5DB]'>
                {PROJECTS?.map((project, index) => (
                    <div key={index} className="mx-auto flex w-full max-w-6xl flex-col md:flex-row rounded-xl bg-gray shadow-md dark:bg-[#1F2937] dark:shadow-2xl">
                        {/* Image */}
                        <div
                            className='flex items-center justify-center border-gray-100 bg-gray-50 p-8 rounded-l-xl max-md:rounded-t-xl md:w-1/2 lg:p-12 dark:bg-[#374151] '

                        >
                            <a noCustomization href={project.url} target='blank'>
                                <img
                                    src={project.previewImage}
                                    alt={`${project.name} preview`}
                                    className="rounded-xl shadow-lg transition-transform duration-500 md:hover:scale-105"
                                    style={{ objectFit: 'cover' }}
                                />
                            </a>
                        </div>


                        {/* Content */}
                        <div
                            className='flex flex-col gap-6 p-8 md:w-1/2 lg:p-12'>
                            <h3 className="font-semibold dark:text-[#F9FAFB] text-lg md:text-xl text-gray-900 ">
                                {project.name}
                            </h3>
                            <p>{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {PROJECTS[index]?.technologies?.map((technology, index) => (
                                    <div
                                        className='flex items-center justify-center rounded-xl bg-gray-200 dark:bg-[#374151] px-5 py-1'
                                        key={index}
                                    >
                                        <h4 className="font-medium text-sm">
                                            {technology}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                            <a
                                href={project.url}
                                noCustomization
                                className="self-start rounded-lg p-1.5 hover:bg-gray-50 dark:hover:bg-[#394355] [&_svg]:stroke-gray-500"
                                externalLink
                                target='blank'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
                            </a>
                        </div>
                    </div>

                ))
                }
            </div>

        </Container >
    )
}

export default Work
