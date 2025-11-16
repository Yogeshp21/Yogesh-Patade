import LogoJavascript from '../assets/Logos/icon-javascript.svg';
import LogoReact from '../assets/Logos/icon-react.svg';
import LogoTailwindcss from '../assets/Logos/icon-tailwindcss.svg'
import LogoGit from '../assets/Logos/icon-git.svg'
import LogoRedux from '../assets/Logos/icon-redux.svg'
import LogoHTML from '../assets/Logos/icon-html5.svg'
import LogoCSS from '../assets/Logos/icon-css3.svg'
import LogoFirebase from '../assets/Logos/icon-firebase.svg'
import LogoGitHub from '../assets/Logos/icon-github.svg'
import LogoExpress from '../assets/Logos/icon-express.svg'
import LogoNode from '../assets/Logos/icon-nodejs.svg'
import LogoMongoDB from '../assets/Logos/icon-mongodb.svg'
import LogoSass from '../assets/Logos/icon-sass.svg'
import LogoPostman from '../assets/Logos/icon-postman.svg'
import LogoReactRouterDom from '../assets/Logos/icon-react-router.svg'
import LogoC from '../assets/Logos/icon-cpp.svg'

import BlogZone from '../assets/Projects_img/project-blogzone.png'
import NetflixClone from '../assets/Projects_img/project-netflixclone.png'
import PortfolioImg from '../assets/Projects_img/project-portfolio.png'



export const TECHNOLOGIES = [
    {
        label: 'Javascript',
        logo: LogoJavascript,
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },

    {
        label: 'React',
        logo: LogoReact,
        url: 'https://react.dev/',
    }, 
    {
        label: 'Express',
        logo: LogoExpress,
        url: 'https://expressjs.com/',
    },
    {
        label: 'Node',
        logo: LogoNode,
        url: 'https://nodejs.org/en',
    },
    {
        label: 'MongoDB',
        logo: LogoMongoDB,
        url: 'https://www.mongodb.com/',
    },
    {
        label: 'Redux',
        logo: LogoRedux,
        url: 'https://redux.js.org/',
    },
    {
        label: 'HTML',
        logo: LogoHTML,
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    },
    {
        label: 'CSS',
        logo: LogoCSS,
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    },
    {
        label: 'Tailwindcss',
        logo: LogoTailwindcss,
        url: 'https://tailwindcss.com/',
    },
    {
        label: 'Sass',
        logo: LogoSass,
        url: 'https://sass-lang.com/',
    },
    {
        label: 'React Router DOM',
        logo: LogoReactRouterDom,
        url: 'https://reactrouter.com/en/main',
    },
    {
        label: 'Postman',
        logo: LogoPostman,
        url: 'https://www.postman.com/',
    },
    {
        label: 'C++',
        logo: LogoC,
        url: 'https://cplusplus.com/doc/tutorial/',
    },
    {
        label: 'Firebase',
        logo: LogoFirebase,
        url: 'https://firebase.com/',
    },
    {
        label: 'Git',
        logo: LogoGit,
        url: 'https://git-scm.com/',
    },
    {
        label: 'GitHub',
        logo: LogoGitHub,
        url: 'https://github.com/Yogeshp21',
    },
];


export const PROJECTS = [
    {
        name: 'Blog Zone',
        description:
            'A platform for creating and reading blogs as well as auther can update and delete blogs.',
        url: 'https://blog-zones.netlify.app/',
        previewImage: BlogZone,
        technologies: [
            'React',
            'Tilwind CSS',
            'Redux Toolkit',
            'Appwrite',
            'Email JS',
            'Responsive UI',
        ],
    },
    {
        name: 'Netflix Clone',
        description:
            'Created an immersive Netflix Clone project using react. The real time information of movies is dynamically fetched using The Movies Data Base (TMDB) API.',
        url: 'https://netflix-clone-2100.netlify.app/',
        previewImage: NetflixClone,
        technologies: [
            'React',
            'CSS',
            'API Integration (TMDB)',
            'Redux Toolkit',
            'Responsive UI',
            'Firebase',
        ],
    },
    {
        name: 'Portfolio',
        description:
            'Personal portfolio website with responsive user interface and animation.',
        url: 'https://portfolio-yogeshp.netlify.app/',
        previewImage: PortfolioImg,
        technologies: [
            'React',
            'Tailwindcss',
            'Responsive UI',
            'Dark Theme'
        ],
    },
];
