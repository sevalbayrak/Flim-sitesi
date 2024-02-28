import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { KoleksiyonEkle, addFilm, logout, storage } from '../firebase';
import { logoutol } from '../store/auht';
import { TextField ,Stack } from '@mui/material';
import { Button} from'@mui/material'
import '../css/FlimEkle.css'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';




function FlimEkle() {
    const {user} = useSelector(state => { return state.auht})
    const nagivate = useNavigate();
    const dispaht = useDispatch();
    const [ isim , setIsim] = useState('')
    const [ year , setYear] = useState('')
    const [ dakika , setDakika] = useState('')
    const [imgUrl, setImgUrl] = useState( '');
    const [secilenKategoriler , setSecilenKategoriler] = useState([]);

    const tumKatogeri = useSelector(state => state.film.tumKatogeri)
    
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };


    
    
    function getStyles(name, personName, theme) {
      return {
        fontWeight:
          personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
      };
    }
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

  console.log(personName)
    
      const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };
    

    
    const loginout =  async()=>{
        await logout()
        dispaht(logoutol())
        nagivate('/', {
          replace:true
        })
    }

    const FlimEkleme = async e =>{
  let secilentur = secilenKategoriler.map((secilen => secilen.split("-")[1]))

      e.preventDefault();
       await addFilm({
        isim,
        year,
        dakika,
      imgUrl,
      secilentur
  
      })

   

    }
    const ekle =  async (e) => {

    console.log(e)
        const file = e.target.files[0];
        console.log(file)
        
    
        if (!file) return;
        const storageRef = ref(storage, `files/${file.name}`);
       
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed",
          (snapshot) => {
          },
          (error) => {
            alert(error);
          },
          ()   => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)    =>  {
              setImgUrl(downloadURL);
              
           
              console.log(imgUrl)
            });
          }
        );
    
      
      
      }
    
    if(user) {
  return (
    <>
      <Button onClick={loginout}  color="warning" variant='outliend' >  Çıkış yap</Button>
    <div className='from'>
    <div className='butun'>

        <h2> Film ekle </h2>
        <Stack spacing={{xs: 5 , sm: 4 , mb:6}}>
       
       
        <input type='file' id='files' style={{ display: 'none' }} onChange={ekle}  />
        <label  htmlFor='files' style={{position:  "relative"}}>
        <img src={imgUrl} height={50} width={50} className='img'/>
        </label>
       
        <TextField placeholder='Kaç yılında yapıldı '   margin="normal" color="warning" label='kaç yılı'  value={year} onChange={(e)=> {setYear(e.target.value)}}/>
        <TextField  placeholder='kaç dakika'  margin="normal" color="warning" label='kaç dakika'  value={dakika} onChange={(e)=> {setDakika(e.target.value)}}/>
     
        <TextField  placeholder='Film ismi'  margin="normal"  color="warning" label=' film isim'  value={isim} onChange={(e)=> {setIsim(e.target.value)}} />
        <div>
          
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Tür</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => {
            setSecilenKategoriler(selected);
            return (
    


           
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                 
                {selected.map((value) => (
              
                  <Chip key={value.split("-")[1]} label={value.split("-")[0]}  />
                
  
                
                ))}
              </Box>
            );
          }}
     
          MenuProps={MenuProps}
        >
          {tumKatogeri.map((tur) => (
            <MenuItem
              key={tur.id}
              value={tur.name + "-" + tur.id}
              style={getStyles(tur.name, personName, theme)}
            >
              {tur.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
     
        <Button onClick={FlimEkleme} color="warning" variant="outlined" >Ekle</Button>
    
       
        </Stack>
    
        </div>
      
       

    </div>
  
    </>
  )
}

return(
    <div>
<h1>error 401 not </h1>
    </div>
)
}


export default FlimEkle
