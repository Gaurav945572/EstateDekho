import { useRef, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from '../firebase';
import { updateUserFailure,updateUserStart,updateUserSuccess,deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutUserStart,
  signoutUserFailure,
  signoutUserSuccess, } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';

export default function Profile() {
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [percent, setPercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const[showListingError,setShowListingError] = useState(false);
  const[userListing,setUserListings]=useState([]);
  //console.log(formData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log('Upload is ' + progress + '% done');
        setPercent(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (donwloadURL) => {
            setFormData({ ...formData, avatar: donwloadURL });
          });
      })
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart);
      const res= await fetch(`/api/user/update/${currentUser._id}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(formData),
      });
      const  data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data)); 
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));  
    }
  }


  const handleDelete = async(e)=>{
    e.preventDefault();
    try {
      dispatch(deleteUserStart);
      const res= await fetch(`/api/user/delete/${currentUser._id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(formData),
      });
      const  data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data)); 
      //setUpdateSuccess(true);
    } catch (error) {
      dispatch(deleteUserFailure(error.message)); 
    }
  }


  const handleSignout = async(e)=>{
    e.preventDefault();
    try {
      dispatch(signoutUserStart());
      const res =await fetch('/api/auth/signout',{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(formData),
      });
      const data =await res.json();
      if(data.success === false){
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      
    }
  }

  const handleShowList = async(e)=>{
    //console.log(listing.imageURL);
    //e.preventDefault();
    try {
      setShowListingError(false);
      const res=await fetch(`/api/listing/${currentUser._id}`);
      const data =await res.json();
      if(data.success === false){
        setShowListingError(true);
        return;
      }  
      setUserListings(data);
      //console.log(data);
    } catch (error) {
      setShowListingError(true);   
    }
  }

  const handleDeleteListing =async(listingId)=>{
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`,{
        method:"DELETE"}
      );
      const data = res.json();
      if(data.success===false){
        console.log(data.message);
        return;
      }
      setUserListings((prev)=>prev.filter((listing)=>listing._id !==listingId));
      
    } catch (error) {
      console.log(error.message);
      
    }

  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input onChange={(e) => { setFile(e.target.files[0]) }} type="file" ref={fileRef} hidden accept="image/*" />
        
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
        <p className='text-sk self-center'>
          {fileUploadError ?
            (<span className='text-red-800'>Error Image Upload</span>) :
            percent > 0 && percent < 100 ? (<span className='text-green-500'>{`Uploading ${percent}%`}</span>) :
              percent === 100 ? (<span className='text-slate-900'>File Uploaded successfully!!!</span>) : ""
          }
        </p>
        <input type="text" defaultValue={currentUser.username} placeholder='username' id='username' className='border p-3 rounded-lg' onChange={handleChange} />
        <input type="email" defaultValue={currentUser.email} placeholder='email' id='email' className='border p-3 rounded-lg' onChange={handleChange} />
        <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg' onChange={handleChange} />
        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link to={"/create"} className='bg-green-800 text-white p-3 rounded-lg uppercase text-center hover:opacity-90'>
          Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDelete} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handleSignout} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>

      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
      <button onClick={handleShowList} className='mt-4 text-green-800 w-full underline'>Show Listings</button>
      <p className='text-red-700 mt-5'>{showListingError?'Error Showing list.....':''}</p>

      {userListing &&
        userListing.length > 0 &&
        <div className="flex flex-col gap-4">
          <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
          {userListing.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4 shadow-2xl'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageURL[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain border-2 rounded-sm border-neutral-500'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/api/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button onClick={()=>handleDeleteListing(listing._id)} className=' text-red-700 border border-red-700 rounded uppercase hover:shadow-lg hover:bg-red-700 hover:text-white disabled:opacity-80 mb-2'>Delete</button>
                <Link to={`/update/${listing._id}`}>
                <button  className=' text-green-700 border border-green-700 rounded uppercase hover:shadow-lg hover:bg-green-700 hover:text-white disabled:opacity-80'>Edit</button>
                </Link>
                
              </div>
            </div>
          ))}
        </div>}
    </div>
  )
}