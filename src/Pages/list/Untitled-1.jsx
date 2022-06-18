<div>
        <div className="btnConatiner">

          <p><Link to="/users/new">Add User</Link></p>
          
        </div>
        <table className="tableContainer">
          {datas.map((items)=>{
            return(
             
              <tr key={items.id} className="tr">
                <td>{items.name}</td>
                <td>{items.email}</td>


              </tr> 
          
           
            )
            
          })}

        </table>
        </div>