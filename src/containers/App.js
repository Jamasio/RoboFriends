import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
// import { robots } from './robots';
import ErrorBoundry from "../components/ErrorBoundry";
import '../containers/App.css';
import Scroll from '../components/Scroll'


function App() {
    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState(''); 
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {setRobots(users)});
    },[])
    
    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

        const filteredRobot = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        if (!robots.length) {
            return <h1 className="tc">Loading</h1>
        } else {
            return(
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobot} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }      
}

export default App;