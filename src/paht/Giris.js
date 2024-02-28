import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import '../css/Giris.css'
import { login } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginol } from '../store/auht';

function Giris() {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispaht = useDispatch()

    const GirisYap = async  e =>{
        e.preventDefault();
        const user = await login(email,password);
        console.log(user)
      
            dispaht(loginol({
              email:user.email,
              displayName:user.displayName,
              emailVerified:user.emailVerified,
              photoURL:user.photoURL,
              
              uid: user.uid
          
            }))
            if(user){
      navigate('/ekle', {
              replace:true
            })
        
          console.log(user)
          setPassword('')
          setEmail('')
      
        }
       
    }
    return (
        <div >
          <div>
           
          </div>
          <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 2 , width: '35ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <form className='from' >
          <h1 >Giriş Yap</h1>
            <TextField    label="email" variant="outlined"  color="warning" type='email' placeholder='email gir' value={email} onChange={e=> setEmail(e.target.value)} />
            <TextField  label="şifre" variant="outlined"  color="warning"   type='password' placeholder='*****' value={password} onChange={e=> setPassword(e.target.value)}/>
           <div>
           <Button  color="warning" variant="contained" size="large" type='submit' onClick={GirisYap} >Giriş Yap </Button>
           </div>
          </form>
          </Box>
        </div>
      )
}

export default Giris
