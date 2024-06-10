import Lottie from "lottie-react";
import errorLot from "../../assets/404error.json";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }
    return (
        <div>
            <button className="btn btn-error" onClick={handleBack}>Back Now</button>
            <div><Lottie animationData={errorLot} loop={true} /></div>
        </div>
    )
}

export default ErrorPage