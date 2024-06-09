import PropTypes from 'prop-types';


const ServeMealsDataRow = ({ meal, index }) => {
    const handleServe = () => {
        console.log('serving')
    }
    console.log(meal)
    return (
        <tr className="hover">
            <th>{index++}</th>
            <td>{meal?.title}</td>
            <td>{meal?.email}</td>
            <td>{meal?.name}</td>
            <td>{meal?.status}</td>
            <td>
                <button className='btn btn-sm btn-success' onClick={handleServe}>Serve</button>
            </td>
        </tr>
    )
}

ServeMealsDataRow.propTypes = {
    meal: PropTypes.object,
    index: PropTypes.number
}

export default ServeMealsDataRow