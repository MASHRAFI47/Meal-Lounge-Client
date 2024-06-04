import { Helmet } from "react-helmet-async"
import Banner from "./Banner/Banner"
import Categories from "./Categories/Categories"

const Home = () => {
    <Helmet>
        <title>Home | Meal Lounge</title>
    </Helmet>

    return (
        <div>
            <Banner />
            <Categories />
        </div>
    )
}

export default Home