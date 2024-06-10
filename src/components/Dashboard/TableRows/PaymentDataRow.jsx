import PropTypes from 'prop-types';


const PaymentDataRow = ({ meal, index }) => {
    return (
        <tr>
            <th>{index++}</th>
            <td>{meal?.title}</td>
            <td className='text-red-600 font-bold'>${meal?.price}</td>
        </tr>
    )
}

PaymentDataRow.propTypes = {
    meal: PropTypes.object,
    index: PropTypes.number
}

export default PaymentDataRow