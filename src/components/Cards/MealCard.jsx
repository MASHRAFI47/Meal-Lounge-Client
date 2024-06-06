import PropTypes from 'prop-types';
import Rating from 'react-rating'

import emptyStar from '../../assets/images/emptystar.png'
import star from '../../assets/images/star.png'
import { Link } from 'react-router-dom';

const MealCard = ({ meal }) => {
    return (
        <div className="">
            <div className="card card-compact bg-base-100 shadow-xl border ">
                <figure><img src={meal?.image} className='w-[40rem] h-[20rem]' alt={meal?.title} /></figure>
                <div className="card-body">
                    <h2 className="card-title font-bold">{meal?.title}</h2>
                    <div className="">
                        <h2 className='text-lg font-semibold inline mr-2'>Rating: <span className='text-purple-600'>{meal?.rating}</span></h2>
                        <Rating
                            emptySymbol={<img src={emptyStar} className="icon w-4 mr-1" />}
                            fullSymbol={<img src={star} className="icon w-4" />}
                            initialRating={meal?.rating}
                            readonly
                        />
                    </div>
                    <h2 className='text-lg font-semibold inline mr-2'>Price: <span className='text-red-600'>${meal?.price}</span></h2>
                    <div className="card-actions justify-end">
                        <Link className='btn bg-[#CA301B] hover:bg-[#ff3535] text-white' to={`/meal-details/${meal?._id}`}>Details</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


MealCard.propTypes = {
    meal: PropTypes.object,
}


export default MealCard