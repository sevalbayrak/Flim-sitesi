import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { AramadaBulunan } from '../firebase';
import { useSelector } from 'react-redux';
import '../css/Arama.css'

function Arama() {
    const {isim} = useParams();
    const  BulunanFilm = useSelector(state => {return state.film.BulunanFilm})
    useEffect(  ()=>{

        async function guncelle (){
        if(isim){
            await AramadaBulunan(isim)
            
        }
    }
    
     guncelle()
    
       },[isim])
  return (
    <div>
        <div className='baslik'> 
        <h1>Arama Sonuçları</h1>
        </div>
        <div >
      {
        BulunanFilm?.map((bulunan) =>{
          return(
            <>
            <img src={bulunan.imgUrl} height={150}  width={150}/>
            <div className='bulunan-isim'>
              <h4>{bulunan.isim}</h4>
              </div>
              </>
          )
        })
      }
      </div>
    </div>
  )
}

export default Arama
