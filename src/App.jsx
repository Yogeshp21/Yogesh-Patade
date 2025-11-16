import Home from './Pages/Home.jsx'
import { useEffect, useState } from 'react'
import './App.css'
import { ThemeProvider } from './components/ThemeChanger.jsx'

function App() {
  const [themeMode, setThememode] = useState('light')

  const lightTheme = () => {
    localStorage.setItem("Theme", 'light')
    setThememode(localStorage.getItem('Theme'))
  }
  const darkTheme = () => {

    localStorage.setItem("Theme", 'dark')
    setThememode(localStorage.getItem('Theme'))

  }


  // actual change in theme
  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark')
    document.querySelector('html').classList.add(localStorage.getItem("Theme"))
  }, [themeMode])

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>

      <Home />
    </ThemeProvider>
  )
}

export default App
