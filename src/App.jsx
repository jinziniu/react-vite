import React, { useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import TranslateComponent from './components/TranslateComponent';
import GoogleMap from './components/GoogleMapComponent'; 
import { Modal } from 'react-bootstrap';


const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);


function App(props) {
  
  const [showMapModal, setShowMapModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const toggleMapModal = () => {
    setShowMapModal(!showMapModal);
  };
  
  
  const closeAndRefresh = () => {
    setShowMapModal(false);  // 关闭模态窗口
    window.location.reload(); // 刷新页面
  };




  const listHeadingRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: -34.397, lng: 150.644 });
  const geoFindMe = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          console.log(`Latitude: ${position.coords.latitude}°, Longitude: ${position.coords.longitude}°`);
        },
        () => {
          console.log("Unable to retrieve your location");
        }
      );
    }
  };

  useEffect(() => {
    geoFindMe();
  }, []);
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setCurrentLocation({ lat: latitude, lng: longitude });
    console.log(latitude, longitude);
    console.log(`Latitude: ${latitude}°, Longitude: ${longitude}°`);
    console.log(`Try here: https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
    locateTask(lastInsertedId, {
    latitude: latitude,
    longitude: longitude,
    error: "",
    });
    };
    const error = () => {
    console.log("Unable to retrieve your location");
    };
    useEffect(() => {
      geoFindMe();
    }, []);

function usePersistedState(key,defaultValue){
const [state,setState]=useState(()=>JSON.parse(localStorage.getItem(key))||defaultValue);

useEffect(()=>{
  localStorage.setItem(key,JSON.stringify(state));
},[key,state]);

return[state,setState];

}

const [tasks, setTasks] = usePersistedState("tasks", []);
 const [filter, setFilter] = useState("All");
 const [lastInsertedId, setLastInsertedId] = useState("");

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
     
      if (id === task.id) {
      
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
  
      if (id === task.id) {
      
        return { ...task, name: newName };
      }
     
      return task;
    });
    setTasks(editedTaskList);
 
  }

  function locateTask(id, location) {
    console.log("locate Task", id, " before");
    console.log(location, tasks);
    const locatedTaskList = tasks.map((task) => {
 
    if (id === task.id) {
    //
    return { ...task, location: location };
    }
    return task;
    });
    console.log(locatedTaskList);
    setTasks(locatedTaskList);
   }

   function photoedTask(id) {
    console.log("photoedTask", id);
    const photoedTaskList = tasks.map((task) => {
 
    if (id === task.id) {
   
 
    return { ...task, photo: true };
    }
    return task;
    });
    console.log(photoedTaskList);
    setTasks(photoedTaskList); 
   }
  

 
   const taskList = tasks?.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    location={task.location} 
    toggleTaskCompleted={toggleTaskCompleted}
    photoedTask={photoedTask} 
    deleteTask={deleteTask}
    editTask={editTask}
    />
   ));
  

  
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  function addTask(name) {
    const id = "todo-" + nanoid();
    const newTask = {
    id: id,
    name: name,
    completed: false,
    location: { latitude: "##", longitude: "##", error: "##" },
    };
    setLastInsertedId(id);
    setTasks([...tasks, newTask]);
    }


    

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;


  return (
    <div className="todoapp stack-large">
        <h1>Geo TodoMatic</h1>
        <button onClick={toggleMapModal}>Show Map of Current location</button>

        {showMapModal && (
        <div className="modal" onClick={toggleMapModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <GoogleMap currentLocation={currentLocation} />
            <button onClick={closeAndRefresh}>Close</button> {/* 关闭按钮 */}
          </div>
        </div>
      )}

        <Form addTask={addTask} geoFindMe={geoFindMe} />
        <div className="filters btn-group stack-exception">{filterList}</div>
        <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
     
            {headingText}
        </h2>
        <ul
            aria-labelledby="list-heading"
            className="todo-list stack-large stack-exception"
            role="list"
        > 
            {taskList}
        </ul>
       
        <TranslateComponent /> {/* 将翻译组件放置在这里 */} 
    </div>
    
);

  
  }

export default App;

