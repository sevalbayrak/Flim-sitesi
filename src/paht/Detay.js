import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Detaylartamami } from '../firebase';
import { useSelector } from 'react-redux';

function Detay() {

    const {id} = useParams();
    const  detayFilm = useSelector(state => {return state.film.detayFilm})
    useEffect(()=>{

        async function guncelle (){
        if(id){
            await Detaylartamami(id)
            
        }
    }
    
     guncelle()
    console.log(Detaylartamami)
       },[id])
  return (
    <div>
        <div className='baslik'> 
        <h1>Detaylar</h1>
        </div>
        <div >
      {
        detayFilm?.map((bulunan) =>{
          return(
            <>
            <img src={bulunan.imgUrl} height={150}  width={150}/>
            <div >
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




export default Detay
