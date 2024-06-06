import PropTypes from 'prop-types';

const MealCard = ({ meal }) => {
    return (
        <div className="">
            <div className="card card-compact bg-base-100 shadow-xl">
                <figure><img src={meal?.image} className='w-[40rem] h-[20rem]' alt={meal?.title} /></figure>
                <div className="card-body">
                    <h2 className="card-title">{meal?.title}
                        <div className="badge badge-secondary">{meal?.rating}</div>
                    </h2>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Details</button>
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