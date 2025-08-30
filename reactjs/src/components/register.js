import { useState } from "react"
import AuthUser  from "./AuthUser";
import { useNavigate } from "react-router-dom";

export default function Register(){

    const navigate = useNavigate();
    const {http, setToken} = AuthUser();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const submitForm = () => {
      //API call
      http.post('/auth/register',{email:email,password:password,name:name}).then((res)=>{
        navigate('/login')
      })
    }

    return(
        <div className="row justify-content-center pt-5">
          <div className="col-sm-6">
            <div className="card p-4">

              <div className="mb-3 mt-3">
                <label className="form-label">Username:</label>
                  <input type="text" className="form-control" id="name" placeholder="Username" onChange={e=>setName(e.target.value)} />
              </div>

              <div className="mb-3 mt-3">
                <label className="form-label">Email:</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={e=>setEmail(e.target.value)} />
              </div>
              
              <div className="mt-3">
                <label className="form-label">Password:</label>
                  <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" onChange={e=>setPassword(e.target.value)} />
              </div>
                <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Register</button>
            </div>
                
          </div>
        </div>  
    )
}