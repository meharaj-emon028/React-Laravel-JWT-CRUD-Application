import { useState } from "react"
import AuthUser  from "./AuthUser";

export default function Login(){

    const {http, setToken} = AuthUser();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const submitForm = () => {
      //API call
      http.post('/auth/login',{email:email,password:password}).then((res)=>{
        setToken(res.data.user,res.data.access_token);
      })
    }

    return(
        <div className="row justify-content-center pt-5">
          <div className="col-sm-6">
            <div className="card p-4">
               <div className="mb-3 mt-3">
                 <label className="form-label">Email:</label>
                   <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={e=>setEmail(e.target.value)} />
                </div>
                <div className="mt-3">
                  <label className="form-label">Password:</label>
                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" onChange={e=>setPassword(e.target.value)} />
                </div>
                  <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Login</button>
            </div>
                
          </div>
        </div>  
    )
}