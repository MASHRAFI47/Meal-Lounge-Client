import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import MealCard from '../../../components/Cards/MealCard';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';



const Categories = () => {
    const navigate = useNavigate();
    const axiosCommon = useAxiosCommon()

    const { data: meals = [], isLoading } = useQuery({
        queryKey: ["meals"],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/meals')
            return data
        }
    })

    if (isLoading) return <LoadingSpinner />


    const filteredBreakfast = meals.filter(meal => meal.category == 'breakfast');
    const filteredLunch = meals.filter(meal => meal.category == 'lunch');
    const filteredDinner = meals.filter(meal => meal.category == 'dinner');


    //filter by likes
    const filteredLikeMeals = meals.filter(meal => meal.likes >= 10);
    const filteredLikeBreakfast = filteredBreakfast.filter(meal => meal.likes >= 10);
    const filteredLikeLunch = filteredLunch.filter(meal => meal.likes >= 10);
    const filteredLikeDinner = filteredDinner.filter(meal => meal.likes >= 10);


    const handleAllMeals = () => {
        let currentQuery = { category: "all-meals" }
        const url = queryString.stringifyUrl({
            url: '/',
            query: currentQuery
        })
        navigate(url)
    }


    const handleBreakfast = () => {
        let currentQuery = { category: 'breakfast' }
        const url = queryString.stringifyUrl({
            url: '/',
            query: currentQuery
        })
        navigate(url)
    }

    const handleLunch = () => {
        let currentQuery = { category: "lunch" }
        const url = queryString.stringifyUrl({
            url: '/',
            query: currentQuery
        })
        navigate(url)
    }

    const handleDinner = () => {
        let currentQuery = { category: 'dinner' };
        const url = queryString.stringifyUrl({
            url: '/',
            query: currentQuery
        })
        navigate(url)
    }

    return (
        <div className='container mx-auto mt-20'>

            <SectionTitle title={"Meals"} desc={"Featuring a delightful blend of traditional and contemporary flavors"} />

            <Tabs>
                <TabList>
                    <Tab onClick={handleAllMeals}>All Meals</Tab>
                    <Tab onClick={handleBreakfast}>Breakfast</Tab>
                    <Tab onClick={handleLunch}>Lunch</Tab>
                    <Tab onClick={handleDinner}>Dinner</Tab>
                </TabList>

                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                        {
                            filteredLikeMeals?.map(meal => <MealCard key={meal?._id} meal={meal} />)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                        {
                            filteredLikeBreakfast?.map(meal => <MealCard key={meal?._id} meal={meal} />)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                        {
                            filteredLikeLunch?.map(meal => <MealCard key={meal?._id} meal={meal} />)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {
                            filteredLikeDinner?.map(meal => <MealCard key={meal?._id} meal={meal} />)
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default Categories