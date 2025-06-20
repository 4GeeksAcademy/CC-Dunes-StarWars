import { Outlet } from "react-router-dom/dist"
import { Navbar } from "../components/Navbar"
import { ScrollToTop } from "../components/ScrollToTop";
// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <ScrollToTop>
            <Navbar />
                <Outlet />
        </ScrollToTop>
    )
}