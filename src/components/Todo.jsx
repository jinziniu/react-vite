import { useEffect, useRef, useState, useCallback } from "react"; 
import Popup from "reactjs-popup"; 
import "reactjs-popup/dist/index.css"; 
import Webcam from "react-webcam"; 
import { addPhoto,deletePhoto, GetPhotoSrc } from "../db.jsx"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SMSComponent from './SMSComponent.jsx'; // 确保路径正确
import MapComponent from "./MapComponent.jsx";
import WeatherComponent from "./WeatherComponent.jsx";

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const editButtonRef = useRef(null);
  const [returnToMain, setReturnToMain] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [latitude, longitude] = props.name.split(',').map(Number);

;

  useEffect(() => {
    setLocation({ lat: latitude, lng: longitude });
  }, [latitude, longitude]);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }
  

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>

    <div className="form-group">
      <label className="todo-label" htmlFor={props.id}>
        New name for {props.name}
      </label>
      <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
        />
    </div>
    <div className="btn-group">
    <button
  type="button"
  className="btn todo-cancel"
  onClick={() => setEditing(false)}>
  Cancel
  <span className="visually-hidden">renaming {props.name}</span>
</button>

      <button type="submit" className="btn btn__primary todo-edit">
        Save
        <span className="visually-hidden">new name for {props.name}</span>
      </button>
    </div>
  </form>
);
const viewTemplate = (
  <div className="stack-small">
  <div className="c-cb">
  <input
  id={props.id}
  type="checkbox"
  defaultChecked={props.completed}
  onChange={() => props.toggleTaskCompleted(props.id)}
  />
  <label className="todo-label" htmlFor={props.id}>
  {props.name}
  
  <Popup
    trigger={<button type="button" className="btn">(map)</button>}
    modal
    nested
>
    {close => (
      <div className="modal-content">
          <MapComponent center={{ lat: latitude, lng: longitude }} />
          <WeatherComponent lat={latitude} lon={longitude} />
          <button
              className="btn"
              onClick={() => {
                  close();
                  window.location.reload(); // 刷新整个页面
              }}
          >
              Close
          </button>
      </div>
    )}
</Popup>



  <Popup
          trigger={<button type="button" className="btn">(sms)</button>}
          modal
          nested
        >
          {close => (
            <SMSComponent 
              close={close} 
              taskId={props.id}
              taskName={props.name}
              // 这里添加任何其他的 props 你的 SMSComponent 需要
            />
          )}

        </Popup>

  </label>
  </div>
  <div className="btn-group">
  <button
  type="button"
  className="btn"
  onClick={() => {
  setEditing(true);
  }}
  ref={editButtonRef}
  >
  Edit <span className="visually-hidden">{props.name}</span>
  </button>
  <Popup 
  trigger={
  <button type="button" className="btn">
  {" "}
  Take Photo{" "}
  </button>
  }
  modal
  >
  <div>
    
  <WebcamCapture id={props.id} photoedTask={props.photoedTask} 
  imgSrc={imgSrc} setImgSrc={setImgSrc}/>
  </div>
  </Popup>
  
  <Popup 
  
  trigger={
    
  <button type="button" className="btn">
  {" "}
  View Photo{" "}
  </button>
  }
  modal
  >
  <div>
  <ViewPhoto id={props.id} alt={props.name} />
  </div>
  </Popup>
  <button
  type="button"
  className="btn btn__danger"
  onClick={() => props.deleteTask(props.id)}
  >
  Delete <span className="visually-hidden">{props.name}</span>
  </button>
  </div>
  </div>
  );


return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;

  }

  const WebcamCapture = ({ imgSrc, setImgSrc, ...props }) => {
    const webcamRef = useRef(null);

    const [imgId, setImgId] = useState(null);
    const [photoSave, setPhotoSave] = useState(false);

    useEffect(() => {
        if (photoSave) {
            console.log("useEffect detected photoSave");
            props.photoedTask(imgId);
            setPhotoSave(false);
        }
    }, [photoSave, imgId, props]);

    console.log("WebCamCapture", props.id);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        console.log("capture", imageSrc.length, props.id);
    }, [webcamRef, setImgSrc, props.id]);

    const savePhoto = useCallback(() => {
        console.log("savePhoto", imgSrc.length, props.id);
        addPhoto(props.id, imgSrc);
        setImgId(props.id);
        setPhotoSave(true);
    }, [props.id, imgSrc]);

    const cancelPhoto = useCallback(() => {
        if (!imgSrc) {
            alert("img is empty");
        } else {
            alert(`cancelPhoto ${imgSrc.length}, ${props.id}`);
            setImgSrc(null);
        }
    }, [imgSrc, props.id, setImgSrc]);

    return (
        <>
            {!imgSrc && (
                <Webcam 
                    audio={false} 
                    ref={webcamRef} 
                    screenshotFormat="image/jpeg" 
                    style={{ maxWidth: '100%', height: 'auto' }} // 控制大小
                />
            )}
            {imgSrc && <img src={imgSrc} alt="Captured" />}
            <div className="btn-group">
                {!imgSrc && (
                    <button
                        type="button"
                        className="btn"
                        onClick={capture}>
                        Capture photo
                    </button>
                )}
                {imgSrc && (
                    <button
                        type="button"
                        className="btn"
                        onClick={savePhoto}>
                        Save Photo
                    </button>
                )}
                <button 
                    type="button"
                    className="btn todo-cancel"
                    onClick={cancelPhoto}>
                    Cancel
                </button>
            </div>
        </>
    );
};



const ViewPhoto = (props) => {
  const [photoSrc, setPhotoSrc] = useState(null);

  useEffect(() => {
    GetPhotoSrc(props.id).then(src => {
      setPhotoSrc(src);
    });
  }, [props.id]);

  const handleDeletePhoto = () => {
    deletePhoto(props.id);
    setPhotoSrc(null); // 添加这一行以在删除后更新UI
  };

  if (!photoSrc) {
    return <div style={{margin: 'auto'}}>No photo available.</div>;
  }

  return (
    <>
      <div style={{margin: 'auto'}}>
        <img 
          src={photoSrc} 
          alt={props.name}
          style={{ maxWidth: '100%', height: 'auto' }} // 添加内联样式以控制图片大小
        />
        <button
          type="button"
          className="btn btn__danger"
          onClick={handleDeletePhoto}
        >
          Delete Photo
        </button>
      </div>
    </>
  );
};


  export default Todo;
  