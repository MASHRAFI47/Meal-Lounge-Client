
const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <p className="font-bold mr-2">Loading</p>
            <span className="loading loading-dots loading-lg text-error"></span>
        </div>
    )
}

export default LoadingSpinner