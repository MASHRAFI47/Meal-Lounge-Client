import './sectiontitle.css'
import PropTypes from 'prop-types';

const SectionTitle = ({ title, desc }) => {
    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold bars uppercase">{title}</h1>
            <p className='my-4 text-xl'>{desc}</p>
        </div>
    )
}


SectionTitle.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
}


export default SectionTitle