import { Helmet } from "react-helmet-async"
import Banner from "./Banner/Banner"
import Categories from "./Categories/Categories"
import Membership from "./Membership/Membership"

const Home = () => {


    return (
        <div>
            <Helmet>
                <title>Meal Lounge | Home</title>
            </Helmet>


            <Banner />
            <Categories />
            <Membership />
        </div>
    )
}

export default Home