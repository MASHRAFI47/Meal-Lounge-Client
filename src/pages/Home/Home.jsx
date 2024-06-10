import { Helmet } from "react-helmet-async"
import Banner from "./Banner/Banner"
import Categories from "./Categories/Categories"
import Membership from "./Membership/Membership"
import OurServices from "./OurServices/OurServices"
import AboutUs from "./AboutUs/AboutUs"

const Home = () => {


    return (
        <div>
            <Helmet>
                <title>Meal Lounge | Home</title>
            </Helmet>


            <Banner />
            <AboutUs />
            <Categories />
            <Membership />
            <OurServices />
        </div>
    )
}

export default Home