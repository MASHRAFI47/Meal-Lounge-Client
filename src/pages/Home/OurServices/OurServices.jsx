import { IoDiamondOutline } from "react-icons/io5";
import { MdMovieEdit } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";


const OurServices = () => {
    return (
        <section className="container mx-auto relative top-60">
            <h1 className="text-4xl font-bold mb-10 text-center" data-aos="zoom in">Our Services</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                <div className="card bg-base-100" data-aos="fade-up" data-aos-delay="100">
                    <figure><p className="text-4xl bg-[#F2611C] p-4 rounded-full"><IoDiamondOutline className="text-white" /></p></figure>
                    <div className="card-body p-3">
                        <h2 className="card-title mx-auto">Catering Services</h2>
                        <p className="text-center">Our catering services are perfect for any occasion.</p>
                    </div>
                </div>

                <div className="card bg-base-100" data-aos="fade-up" data-aos-delay="300">
                    <figure><p className="text-4xl bg-[#F2611C] p-4 rounded-full"><MdMovieEdit className="text-white" /></p></figure>
                    <div className="card-body p-3">
                        <h2 className="card-title mx-auto">Meal Delivery</h2>
                        <p className="text-center">Enjoy the convenience of our meal delivery service.</p>
                    </div>
                </div>

                <div className="card bg-base-100" data-aos="fade-up" data-aos-delay="500">
                    <figure><p className="text-4xl bg-[#F2611C] p-4 rounded-full"><FaRegStar className="text-white" /></p></figure>
                    <div className="card-body p-3">
                        <h2 className="card-title mx-auto">Private Dining</h2>
                        <p className="text-center">Experience the exclusivity of private dining.</p>
                    </div>
                </div>

                <div className="card bg-base-100" data-aos="fade-up" data-aos-delay="700">
                    <figure><p className="text-4xl bg-[#F2611C] p-4 rounded-full"><CiLocationOn className="text-white" /></p></figure>
                    <div className="card-body p-3">
                        <h2 className="card-title mx-auto">Cooking Classes</h2>
                        <p className="text-center">Join our expert chefs for hands-on cooking classes.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurServices