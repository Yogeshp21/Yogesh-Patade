import Container from "../Container.jsx";
import Logo from "./Logo.jsx";
import Navbar from "./Navbar.jsx";

const Header = () => {
    return (
        <div className="py-4">
            <Container>
                <div className="flex justify-between items-center md:px-8">
                    <div>
                        <Logo />
                    </div>
                    <div className="flex">
                        <Navbar />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Header;