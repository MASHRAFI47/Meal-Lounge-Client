import { Helmet } from "react-helmet-async"
import Banner from "./Banner/Banner"

const Home = () => {
    <Helmet>
        <title>Home | Meal Lounge</title>
    </Helmet>

    return (
        <div>
            <Banner />
        </div>
    )
}

export default Home