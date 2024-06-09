import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UpcomingMealCard = ({ meal }) => {
    return (
        <div>
            <div className="card card-compact bg-base-100 shadow-xl border ">
                <figure><img src={meal?.image} className='w-[40rem] h-[20rem]' alt={meal?.title} /></figure>
                <div className="card-body">
                    <h2 className="card-title font-bold">{meal?.title}</h2>
                    <h2 className='text-lg font-semibold inline mr-2'>Price: <span className='text-red-600'>${meal?.price}</span></h2>
                    <button className='btn'>Like</button>
                    <div className="card-actions justify-end">
                        <Link className='btn bg-[#CA301B] hover:bg-[#ff3535] text-white' to={`/meal-details/${meal?._id}`}>Details</Link>
                    </div>
                </div>
            </div></div>
    )
}

UpcomingMealCard.propTypes = {
    meal: PropTypes.object,
}

export default UpcomingMealCard