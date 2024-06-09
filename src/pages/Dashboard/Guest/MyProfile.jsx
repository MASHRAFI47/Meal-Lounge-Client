import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const MyProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure()

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ['userInfo', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`)
      return data
    }
  })

  if(loading, isLoading) return <LoadingSpinner />

  return (
    <div className="md:mt-20">
      <div className="card md:w-96 bg-base-100 shadow-xl mx-auto border">
        <figure><img className="rounded-full p-5 w-52" src={user?.photoURL} alt="Shoes" /></figure>
        <div className="card-body font-semibold">
          <h2 className="">Username: {user?.displayName}</h2>
          <p>Email: {user?.email}</p>
          <p>Badges: {userInfo?.membership ? <span className="text-orange-600">{userInfo?.membership}</span> : <span className="text-purple-600">No active membership</span>}</p>
        </div>
      </div>
    </div>
  )
}

export default MyProfile