import { Helmet } from "react-helmet-async"
import Banner from "./Banner/Banner"
import Categories from "./Categories/Categories"

const Home = () => {


    return (
        <div>
            <Helmet>
                <title>Meal Lounge | Home</title>
            </Helmet>


            <Banner />
            <Categories />
        </div>
    )
}

export default Home