import Lottie from "lottie-react";
import mealsAnimation from "../../../assets/meals-animation.json";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const AboutUs = () => {
    return (
        <section className="container mx-auto mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="flex justify-center" data-aos="zoom-in" data-aos-delay="100">
                    <Lottie animationData={mealsAnimation} className="w-[65%]" loop={true} />
                </div>
                <div data-aos="fade-right" data-aos-delay="300">
                    <SectionTitle title={'About Us'} desc={'Welcome to Meal Lounge, where culinary excellence meets exceptional service. Nestled in the heart of our city, our restaurant is dedicated to providing a memorable dining experience for every guest who walks through our doors. Create a warm and inviting atmosphere where friends and families can gather to enjoy delicious meals'}/>
                </div>
            </div>
        </section>
    )
}

export default AboutUs