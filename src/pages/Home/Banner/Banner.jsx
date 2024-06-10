import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from '../../../assets/images/banner1.jpg';
import img2 from '../../../assets/images/banner2.jpg';
import img3 from '../../../assets/images/banner3.jpg';

//icon
// import { IoIosSearch } from "react-icons/io";


const Banner = () => {
    return (
        <div>
            <Carousel autoPlay={true} infiniteLoop={true} interval={4000}>
                <div>
                    <div className="hero min-h-screen" style={{ backgroundImage: `url(${img2})` }}>
                        <div className="hero-overlay bg-opacity-40"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-5xl font-bold">Discover Gourmet Delights</h1>
                                <p className="mb-5">Explore our curated selection of gourmet meals, prepared with the freshest ingredients and expert craftsmanship. Satisfy your culinary cravings with every bite.</p>
                                <label className="input input-bordered flex items-center gap-2">
                                    <input type="text" className="grow" placeholder="Search" />
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="text-black w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                                </label>
                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    <div className="hero min-h-screen" style={{ backgroundImage: `url(${img1})` }}>
                        <div className="hero-overlay bg-opacity-40"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-5xl font-bold">Healthy and Delicious</h1>
                                <p className="mb-5">Indulge in our range of nutritious and delicious meals, crafted to provide a balanced diet without compromising on flavor. Perfect for health-conscious food lovers.</p>
                                <label className="input input-bordered flex items-center gap-2">
                                    <input type="text" className="grow" placeholder="Search" />
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="text-black w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="hero min-h-screen" style={{ backgroundImage: `url(${img3})` }}>
                        <div className="hero-overlay bg-opacity-40"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-5xl font-bold">Treat Yourself to Decadence</h1>
                                <p className="mb-5">Experience pure indulgence with our selection of decadent desserts and rich, flavorful meals. Make every meal a special occasion with our gourmet offerings.</p>
                                <label className="input input-bordered flex items-center gap-2">
                                    <input type="text" className="grow" placeholder="Search" />
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="text-black w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    )
}

export default Banner