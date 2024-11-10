import {React,useEffect,useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from "react-modal"
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  // Set the app element to root div
  Modal.setAppElement('#root');

  const[openAddEditModal,setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data:null,
  });
// USER INFO 
  const [userInfo,setUserInfo] = useState("ADIL DIB");

  const navigate = useNavigate();
//GET USER INFO 

  const getUserInfo =async() => {
    try{
      const response = await axiosInstance.get("/get_user");

      if(response.data && response.data.user){
        setUserInfo(response.data.user);
        
      }
    }catch(error){
      if(error.response.status == 401){
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(()=>{
    getUserInfo()
    return ()=>{};
  },[]);


  return (
    <>
   <Navbar userInfo={userInfo} />
   <div className="container mx-auto">
    <div className='grid grid-cols-3 gap-4 mt-8'>
    <NoteCard title={"database conception "}
     date={"8 NOvembre"} 
     content="meet in google meet 6 novembre and start conception en collaboration avec les autres membres de l'entreprise pour avoir un architechture bien structuré de notre database " 
     tags="#concepton"
     isPinned={true}
     onEdit={()=>{}}
     onDelete={()=>{}}
     onPinote={()=>{}}
     />


     </div>
   </div>
   <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' 
   onClick={() => {
    setOpenAddEditModal({isShown: true, type: "add", data:null});
   }}>
    <MdAdd className="text-[32px] text-white" />
   </button>
   <Modal 
   isOpen={openAddEditModal.isShown}
   onRequestClose={()=> {}}
   style={{
    overlay: {
      backgroundColor: "rgba(0,0,0,0.2)",
    },
   }}
   contentLabel=""
   className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
   >
   <AddEditNotes 
   type={openAddEditModal.type}
   noteData={openAddEditModal.data}
   onClose={() => {
     setOpenAddEditModal({isShown:false, type:"add", data: null})
   }} />    
   </Modal>


    </>
  )
}

export default Home