import { useState } from "react";
import Logo from "./Logo";
import Icons from "./Icons";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const menuToggle = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const navItems = [
        {
            name: 'About',
            nav: '#about'
        },
        {
            name: 'Skills',
            nav: '#skills'
        },
        {
            name: 'Work',
            nav: '#work'
        },
        {
            name: 'Contact',
            nav: '#contact'
        }
    ];

    return (
        <div>
            <div className="hidden md:block">
                <div className="flex items-center justify-between space-x-6">
                    <div>
                        <ul className="flex space-x-6 font-[Inter] text-base leading-6 font-medium dark:text-[#D1D5DB]">
                            {navItems.map((items) => (
                                <a key={items.name} href={items.nav}>

                                    <li >{items.name}</li>
                                </a>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <Icons />
                    </div>

                </div>
            </div>
            {/* small screen */}
            <div className=" block md:hidden dark:text-[#D1D5DB]">
                <button onClick={menuToggle} className="p-[6px] " >
                    {isMenuOpen ?
                        null :
                        <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-menu">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                      </svg>
                      
                    }

                </button>

                <div >
                    {isMenuOpen ?
                    
                        <div className={`w-80 h-[932px] bg-gray-200 dark:bg-[#030712] absolute right-0 top-0 px-4 z-10 animate-drawer-open`}>
                            <div className="flex text-2xl justify-between py-4">
                                <Logo />
                                <button onClick={menuToggle} className="p-[6px]">
                                    <svg stroke="currentColor"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                                </button>
                            </div>
                            <div className="py-2 dark:text-[#D1D5DB]">
                                <ul >
                                    {navItems.map((items) => (
                                        <a href={items.nav}  key={items.name} >
                                             <li className="py-2 cursor-pointer" onClick={()=> setIsMenuOpen(false)}>{items.name}</li>
                                        </a>
                                       
                                    ))}
                                </ul>
                                <div>
                                    <Icons />
                                </div>
                            </div>
                        </div> :
                        null

                    }
                </div>
            </div>

        </div>
    )
}
export default Navbar;