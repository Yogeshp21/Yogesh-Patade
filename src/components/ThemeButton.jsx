import { useState } from "react";
import useTheme from "./ThemeChanger.jsx";

export default function ThemeBtn() {
    const { themeMode, lightTheme, darkTheme } = useTheme()
    // const [isDark, setIsDark] = useState(localStorage.getItem('Theme'))

    const onChangeBtn = (e) => {
        const darkModestatus = e.currentTarget.checked
        if (darkModestatus) {
            darkTheme()
            // setIsDark(localStorage.getItem('Theme'))
        }
        else {
            lightTheme()
            // setIsDark(localStorage.getItem('Theme'))

        }
    }
    

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer "
                onChange={onChangeBtn}
                checked={themeMode === 'dark'}
            />
            {localStorage.getItem("Theme") === 'dark' ?
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg> :
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-star"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path><path d="M19 3v4"></path><path d="M21 5h-4"></path></svg>
            }
        </label>
    );
}

