import React, {useState, useEffect} from 'react';
import {Button, Navbar, Form} from 'react-bootstrap';
import axios from "axios";
import setAuthorizationToken from '../utils/setAuthorizationToken';

const LOCAL_STORAGE_KEY_LOGIN = "loginForm.loginyet";
const LOCAL_STORAGE_KEY_USER = "loginForm.user";

export default function LoginForm() {
    const [loginyet, setLoginyet] = useState(false);
    const [user,setUser] = useState("");

    useEffect(()=>{
        const storedLoginyet = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_LOGIN));
        const storedUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USER));
        
        if(storedLoginyet) setLoginyet(storedLoginyet);
        if(storedUser) setUser(storedUser);
    
    }, []);


    useEffect(()=> {
        localStorage.setItem(LOCAL_STORAGE_KEY_LOGIN, JSON.stringify(loginyet))
    }, [loginyet]);

    useEffect(()=>{
        localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(user))
    },[user]);

    if(loginyet == false){
    
        return (
            <div>
                <Form inline onSubmit={(e) => login(e)}>                
                    <Form.Group className="mr-sm-2">
                        <Form.Control autoComplete="off" type="text" placeholder="Employee ID" id="username" style={{marginRight:"10px"}}></Form.Control>
                        <Form.Control type="password" placeholder="Password" id="password" style={{marginRight:"10px"}}></Form.Control>
                        <Button variant="success" type="submit">LOGIN</Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }else{ // Already login 
        
        return(
            <>
                <div style={{width:"280px"}}></div>
                <Navbar.Brand id="welcomeMessage">{user}</Navbar.Brand>
                <Button variant="success"onClick={(e) => logout(e)}>LOG OUT</Button>
            </>
        );
    }
    function login(e){
        e.preventDefault();
        let request = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }
        axios.post('/login',request).then(res =>{
            if(res.data.success == true){
                setLoginyet(true);
                setUser(res.data.message);
                alert("Successfully login as: " + res.data.message);
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);
                setAuthorizationToken(token);
                window.location.reload(false);
            }else{
                alert(res.data.message);
                document.getElementById('username').value = "";
                document.getElementById('password').value = "";
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    function logout(e){
        setLoginyet(false);
        window.location.reload(false);
    }
}

