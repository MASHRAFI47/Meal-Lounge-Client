import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';



const Categories = () => {
    const navigate = useNavigate()

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
        let currentQuery = {category: 'dinner'};
        const url = queryString.stringifyUrl({
            url: '/',
            query: currentQuery
        })
        navigate(url)
    }

    return (
        <Tabs>
            <TabList>
                <Tab onClick={handleAllMeals}>All Meals</Tab>
                <Tab onClick={handleBreakfast}>Breakfast</Tab>
                <Tab onClick={handleLunch}>Lunch</Tab>
                <Tab onClick={handleDinner}>Dinner</Tab>
            </TabList>

            <TabPanel>
                <h2>Any content 1</h2>
            </TabPanel>
            <TabPanel>
                <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel>
                <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel>
                <h2>Any content 2</h2>
            </TabPanel>
        </Tabs>
    )
}

export default Categories