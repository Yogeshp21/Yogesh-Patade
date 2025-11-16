import ThemeBtn from "../ThemeButton";

const Icons = () => {
   
   
    return (
        <div className="py-4 md:py-0 md:flex md:space-x-4">
            <div className="flex justify-between items-center">
                <h3 className="font-[Inter] md:hidden text-[#4B5563] dark:text-[#D1D5DB]">Switch Theme</h3>
                <div className="p-[6px]">
                    <ThemeBtn/>
                </div>
            </div>
            <div className="py-4 md:py-[6px]">
                <button onClick={() => window?.open('/Resume/Yogesh Resume.pdf', '_blank')}
                    className="bg-gray-900 dark:bg-[#F9FAFB] w-full rounded-xl text-gray-50 dark:text-[#111827] text-[Inter] font-medium text-base flex py-[6px] px-4 justify-center items-center gap-8 self-stretch">
                    Download CV
                </button>
            </div>
        </div>
    )
}

export default Icons;