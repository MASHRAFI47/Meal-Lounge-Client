import PropTypes from 'prop-types';

const UsersDataRow = ({ user, index }) => {
    console.log(user)
    return (
        <tr className="hover">
            <th>{index++}</th>
            <td>{user?.name}</td>
            <td>{user?.email}</td>
            <td>{user?.role}</td>
        </tr>
    )
}

UsersDataRow.propTypes = {
    user: PropTypes.object,
    index: PropTypes.number,
}

export default UsersDataRow