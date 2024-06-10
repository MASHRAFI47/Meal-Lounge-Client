import { useQuery } from "@tanstack/react-query"
import useAxiosCommon from "../../../hooks/useAxiosCommon"
import MembershipCard from "./MembershipCard"
import SectionTitle from "../../../components/SectionTitle/SectionTitle"

const Membership = () => {
    const axiosCommon = useAxiosCommon()

    const { data: memberships = [] } = useQuery({
        queryKey: ['memberships'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/memberships')
            return data
        }
    })


    return (
        <div className="container mx-auto relative top-40">
            <SectionTitle title={'Memberships'} desc={'Choose your package and get access to many more'} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    memberships?.map(membership => <MembershipCard key={membership?._id} membership={membership} />)
                }
            </div>
        </div>
    )
}

export default Membership