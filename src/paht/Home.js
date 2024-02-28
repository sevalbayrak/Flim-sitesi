import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../css/Home.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import { Link, NavLink } from 'react-router-dom';
import {  TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Film, Trend, TurAyirma, searchFilm , Soncikanlar, Soncikantrend, AltMenuFilmleri, db, SayfaDegis} from '../firebase';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import film, {  KategoriId } from '../store/film';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Slide } from 'react-slideshow-image';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


function Home() {

    const film = useSelector(state => {return state.film.film})
    const  AramaFilm = useSelector(state => {return state.film.AramaFilm})
    const ustMenu = useSelector(state => state.film.ustMenu)
    const siraliDizi = useSelector(state => {return state.film.siraliDizi })
  const Slider = useSelector(state => {return state.film.Slider})
    const AltMenu = useSelector(state => {return  state.film.AltMenu})
const Sliderlar = useSelector(state => {return  state.film.Sliderlar})
    const oneCikanlar = useSelector(state => {return state.film.oneCikanlar})
    const dispach = useDispatch()

    const [search , setSearch] = useState('');
    const [yukleme , setYukleme ] = useState(true)
    const [page, setPage] = React.useState(1);

 
  
  
   
  

  window.addEventListener('scroll' , async (e) =>{
  
 if((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight){

   

  

  
  
  var sonDokuman = siraliDizi[siraliDizi.length - 1];
      console.log(sonDokuman);
      
      await SayfaDegis( sonDokuman ) 
     
  
   
  
  
   console.log('sss')
 
  } 
 
 
 })
 

let sayi = film.length /5 ; 


    

   useEffect(()=>{
   
 

   setTimeout(() =>{
    setYukleme(false)

   },2000)
  


      
      
    
  
   })

   

    useEffect(()=>{
      async function guncelle (){
    for(var i = 0 ; i< AltMenu.length ; i++){
        await AltMenuFilmleri(AltMenu[i])
        console.log(AltMenu[i])
    }
  
   
   
  }


  guncelle()
  
     },[AltMenu ])
    
 
   
 
    
    const FilmArama =  async (value) =>{
      setSearch(value)
      await searchFilm(value)
    }

    const secimTuru =  async (id) =>{
   console.log(  dispach(KategoriId(id))
   )
    }

  
  return (

    <>
   { !yukleme && <>
   
    
      <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'#ff7f24'}}>
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{  }}
          >
            <LiveTvOutlinedIcon/>
          </IconButton>
      
          <Typography variant="h6" component="div" sx={{ flexGrow: 1  }}>
     
           Filmler 
          
           </Typography>
           <Typography variant="h6" component="div">

 <List  sx={{ display: { xs: 'none', sm: 'flex', flexDirection:'row', marginRight:'1050px'} }}>

 {ustMenu?.map((tur) => {
  return(
    <>
       <Box sx={{ display: { xs: 'none', sm: 'flex', flexDirection:'row',  marginTop:'-30px'  ,  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '240px' }},marginBottom:'-30px' }}>
          <ListItem key={tur} disablePadding>
          <NavLink to={`/katogeri/${(tur.name)}`} className='navlink'>
            <ListItemButton sx={{ textAlign: 'center' }}  onClick={() => secimTuru(tur.id)}>
              <ListItemText primary={tur.name} />
            </ListItemButton>
            </NavLink>
          </ListItem>
          </Box>
          </>
  )
 })}
      </List>

           

      </Typography>   
        
          <Button color="inherit"><Link to='/giris'>Login</Link></Button>
       
        </Toolbar>
      </AppBar>
    </Box>
    </div>
    <div style={{height:'450px'  , margin: '30px' , textAlign:'center'}}>
<Slide >
  {Sliderlar?.map((slider) => {
    return(
    <>
     
      <div >
        <img src={slider.imgUrl} width={500}  height={400}/>

         
 
  </div>
 
    </>
    )
  })}
            
   </Slide>
</div>
    <div className='arama'>
     
        <TextField sx={{ width: 600 }} placeholder='Arama'  value={search}  onChange={(event) => FilmArama(event.target.value)} InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <SearchIcon/>
            </InputAdornment>
          )}}/>
         
    </div>
    <div >

     {AramaFilm?.map((film,index ) => {
       return(
      <>
        <button className='buttonarama'>
        <div key={index} className='AramaFilm-Klon' >
         
          <img  className='imgArama' src={film.imgUrl} height={40} width={40}/>
          
          <h4 className='isimArama'>{film.isim}</h4>
          </div>
     
   
      
        
        </button>
          <NavLink to={`/aramalar/${(film.isim)}`}>
        <ArrowForwardIosIcon className='icon'/>
        </NavLink>
        </>
       )
      })}
      


  
    </div>
    <div className='filmkolon'>
 


 <div>
  {Object.keys(oneCikanlar).map((onecikan) =>{
    return(
      <>
      <div className='onecikanlar-isim'>
    <h2>{onecikan}</h2>
    </div>
    <div className='film'>
      {oneCikanlar[onecikan].map((filmler) =>{
        return(
        <div>
        <div className='klon' >
    <Link  to={`/deyat/${(filmler.id)}`}>
    <div className='contenir'>
   <div className='image'>
 <img className='imgs'  src={filmler.imgUrl} height={200} width={200}/>
 </div>

 <div className='icons'>
   <PlayCircleFilledWhiteIcon  sx={{ fontSize: 40 }}/>

 </div>     
    </div>
 </Link>

  <div className='iceri'>
  <h4 >{filmler.isim}</h4>
  </div>
  <div div class="film-menu">
      <div div className='menu-li'>
        <AccessTimeFilledIcon sx={{width:'18px'}}/>
        
        <div className='menu-ic'>{filmler.dakika}dk</div>
    
        </div>

        <div className='menu-li'>
          <CalendarMonthIcon  sx={{width:'18px'}}/>
          <div className='menu-ic' >  {filmler.year}</div>
        </div>
      
  </div>

</div>
        </div>
        )
      })}
    </div>
    </>
    )
  })}
 </div>

 </div>
 <div className='filmler-Baslik'>
  <h2>Karışık Liste</h2>
  </div>
<div>
<div className='filmler-butun'>
 
<div className='container'>
 

{siraliDizi?.map((filmler) =>{
    return(
      <>
    
     <div className='klon'  key={filmler.id}>

    <Link  to={`/deyat/${(filmler.id)}`}>
    <div className='contenir'>
   <div className='image'>
 <img className='imgs'  src={filmler.imgUrl} height={200} width={200}/>
 </div>

 <div className='icons'>
   <PlayCircleFilledWhiteIcon  sx={{ fontSize: 40 }}/>

 </div>     
    </div>
 </Link>

  <div className='iceri'>
  <h4 >{filmler.isim}</h4>
  </div>
  <div div class="film-menu">
      <div div className='menu-li'>
        <AccessTimeFilledIcon sx={{width:'18px'}}/>
        
        <div className='menu-ic'>{filmler.dakika}dk</div>
    
        </div>

        <div className='menu-li'>
          <CalendarMonthIcon  sx={{width:'18px'}}/>
          <div className='menu-ic' >  {filmler.year}</div>
        </div>
        </div>
      
 
  
        
</div>


      </>
  

    )
  })}

 
 </div>

 </div>
</div>

   
   
   </>}

   { yukleme && <>
   
   <CircularProgress sx={{width:'450px' }}/>
   </>}
    
    
    </>
 


   
  )

}

export default Home
