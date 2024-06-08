import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';



const MembershipCard = ({ membership }) => {

    return (
        <div>
            <div className="card md:w-96 bg-base-100 shadow-xl border mt-10">
                <div className=" flex flex-col justify-evenly items-center h-96">
                    <h2 className="card-title mx-auto font-bold text-3xl">{membership?.packageName}</h2>
                    <p className={`text-center font-bold text-2xl ${membership?.packageName == "silver" ? "text-purple-600" : membership?.packageName == "gold" ? "text-green-600" : "text-red-600"}`}>${membership?.price}</p>
                    <div>
                        <p className="text-center">Unlimited Access to foods</p>
                        <p className="text-center">Access to Dashboard</p>
                        <p className="text-center">Get access to upcoming foods</p>
                    </div>
                    <div className="card-actions mx-auto">
                        <Link to={`/checkout/${membership?.packageName}`} className='btn bg-[#CA301B] hover:bg-[#ff3535] text-white'>Subscribe</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}



MembershipCard.propTypes = {
    membership: PropTypes.object,
}


export default MembershipCard