import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { TurAyirma } from '../firebase'

function Katogeri() {

    const {name} = useParams()
    const secilenKategoriId = useSelector(state => {return state.film.secilenKategoriId})
    const Katogeri = useSelector(state => {return state.film.Katogeri} )

    useEffect(()=>{

        async function guncelle (){
        if(secilenKategoriId){
            await TurAyirma(secilenKategoriId)
           
        }
    }
    guncelle()

   },[secilenKategoriId])
    console.log(secilenKategoriId)
    console.log(Katogeri)
  return (
   <>
   {Katogeri?.map((tur) => {
    return(
        <>
        <img src={tur.imgUrl}></img>
        <h4>{tur.isim}</h4>
        </>
    )
})}
   </>
  )
}

export default Katogeri
