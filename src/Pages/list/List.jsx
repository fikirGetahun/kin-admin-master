import "./list.css"
import Sidebar from "../../Components/Sidebar/Sidebar"
import Navbar from "../../Components/Navbar/Navbar"
//import { DriveEta } from "@material-ui/icons"
import React,{useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import { GiEternalLove } from "react-icons/gi";
import { BASE_URL } from "../../env";
const List = () => {
  const [datas, setDatas]=useState([]);
  const [artistId, setArtistId]=useState();
  const [fname, setFname]=useState();
  const [description, setDescription]=useState();
  const [editartId, setEditArtId]=useState();
  const [editArtname, setEditArtName]=useState();
  useEffect(()=>{artistList();
    handleDelete()},[artistId]);
 
const artistList=async ()=>{
  let endpt = BASE_URL+"/artist/";
  const resp = await Axios.get(endpt)
  .then(res=>setDatas(res.data));
   console.log(resp)

}
const handleDelete= async ()=>{
  let endpt =  BASE_URL+"/artist/"+artistId+"/delete";
  return await Axios.delete(endpt).then((re)=>{
    console.log(re.data)
  })
  //http://34.78.10.124/artist/{artist_id}/
 console.log(endpt)
}
const handlEdit=(id,name,descr)=>{
setEditArtId(id);
setEditArtName(name);
console.log(editArtname);
}/*handlEdit(artst.id,artst.artist_name,artst.artist_description)*/
             
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <div>
        <div className="btnConatiner">
        

         <Link to="/users/new" className="addbtn">Add User</Link>          
        </div>
        <table className="tableContainer">
          <tr className="tr">
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th colSpan="2">Action</th>
          </tr>
          {datas.map((artst)=>{
            return(
              
            <tr key={artst.id} className="tr">
                <td>{artst.artist_name}</td>
                <td>{artst.artist_description}</td>
                <td><img src={artst.artist_avatar}/></td>
                <td onClick={()=>setArtistId(artst.id)} className="tbDButtn">delete</td>
                <td onClick={()=>console.log(artst.id)} className="tbUButton"><Link to={"/users/"+artst.id} className="addbtn">Edit</Link></td>
              </tr> 
            
          
           
            )
            
          })}

        </table>
        </div>
      </div>
    </div>
  )
}

export default List