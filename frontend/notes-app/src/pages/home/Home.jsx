import {React,useEffect,useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from "react-modal"
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import Toast from '../../components/toastMessage/Toast'
import AddNewNoteImge from '../../assets/images/AddNewNote.png'
import EmptyCard from '../../components/emtptyCard/emptyCard'
import noNotes from '../../assets/images/no-notes.png';

const Home = () => {
  // Set the app element to root div
  Modal.setAppElement('#root');

// USER INFO 
  const [userInfo,setUserInfo] = useState("");  
  const[allNotes,setAllNotes] = useState([]);
  const [isSearch,setIsSearch] = useState(false);

  const[openAddEditModal,setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data:null,
  });

  const [showToastMessage,setShowToastMessage] = useState({
    isShown:false,
    message:"",
    type:"add"
  });

  //search for a note 
  const onSearchNote = async (query) => {
   try{ const response= await axiosInstance.get("/search-notes", {
      params:{query},
    });

    if(response.data && response.data.notes){
      setIsSearch(true);
      setAllNotes(response.data.notes)
    }
  } catch (error) {
    console.log(error);
  }
  };

  // clearSearch 
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  // pin note 
  const updateIsPinned = async(noteData) => {
    const noteId = noteData._id;
    try{

    const response = await axiosInstance.put("/update-note-pinned/"+noteId, {
      "isPinned" : !noteData.isPinned
    });

    if(response.data && response.data.note){
      handleShowToast("note updated successfully !")
      getAllNotes()
    }

    } catch(error) {
      console.log(error);
    };
  };


  // show function for the Toast 
  const handleShowToast = (message,type) => {
    setShowToastMessage({
      isShown:true,
      message,
      type,
    });
  }
  // close function for the Toast 
  const handleCloseToast = () => {
    setShowToastMessage({
      isShown:false,
      message:"",
    });
  };


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

// Edit note  
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal(
    {
      isShown: true,
      type: "edit",
      data:noteDetails,
    });
      
  }

// GET ALL NOTES

  const getAllNotes =async() => {
    try{
    const response = await axiosInstance.get("/get-all-notes");

    if(response.data && response.data.notes) {
      setAllNotes(response.data.notes)
    }
    }catch(error){
      console.log("an unexpected error occurred. Please Try Again ")
    }

  }

// delete note 
  const deleteNote = async(data) => {
    const noteId = data._id;
    try{
      const response = await axiosInstance.delete("/delete-note/"+noteId,
      );

      if(response.data && !response.data.error){
          handleShowToast("note Deleted successfully !","delete")
          getAllNotes()
          onClose()
      }

  } catch(error) {
      if(error.response &&
         error.response.data &&
         error.response.data.message
      ) {
        console.log("an unexpected error occurred. Please Try Again ")

      }

  }
  }

  useEffect(()=>{
    getAllNotes()
    getUserInfo()
    return ()=>{};
  },[]);


  return (
    <>
   <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
   <div className="container mx-auto">
    { allNotes.length > 0 ?
      <div className='grid grid-cols-3 gap-4 mt-8'>
     { allNotes.map((item,index)=>(
    <NoteCard 
    key={index}
    title={item.title}
     date={item.createdOn} 
     content={item.content} 
     tags={item.tags}
     isPinned={item.isPinned}
     
     onEdit={()=>handleEdit(item)}
     onDelete={()=>{deleteNote(item)}}
     onPinote={()=>{updateIsPinned(item)}}
     />
     ))}



     </div> 
     : <EmptyCard image={isSearch? noNotes : AddNewNoteImge} message={isSearch ?"Ooops, no notes found matching your search .":"Start Creating your first note! Click the 'Add New' button to jot down your toughts, ideas and considers. Let's get started!"}/>
     }
   </div>
   <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' 
   onClick={() => {
    setOpenAddEditModal({isShown: true, type: "add", data:null});
   }}
    >
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
   getAllNotes={getAllNotes}
   onClose={() => {
     setOpenAddEditModal({isShown:false, type:"add", data: null})
   }} 
   handleShowToast={handleShowToast}/>    
   </Modal>
   <Toast 
   isShown={showToastMessage.isShown}
   message={showToastMessage.message}
   type={showToastMessage.type}
   onClose={handleCloseToast}
   />


    </>
  )
}

export default Home