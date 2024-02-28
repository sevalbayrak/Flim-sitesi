import { FirebaseError, initializeApp } from "firebase/app";
import toast from 'react-hot-toast';
import {getAuth , onAuthStateChanged, signInWithEmailAndPassword ,signOut } from'firebase/auth'
import{ getFirestore,addDoc, collection, doc, onSnapshot, query, where , orderBy, startAt , limit, startAfter, getDoc, getDocs , docs, setDoc, endAt } from'firebase/firestore'
import { AltMenuSet, AramaSonuc, AranaFilm, Detaylar, EkleTuru, Films, KatogeriAyirma, PaginationDizi, setOneCikanlar,  setSlider,  setSliders,  setTumKategoriler } from "./store/film";
import store from "./store";
import { loginol, logoutol } from "./store/auht";
import { getStorage } from "firebase/storage";
import { createNextState } from "@reduxjs/toolkit";
const firebaseConfig = {
  apiKey: "AIzaSyCFIxGMo3oywMyUc_wOrQbxKm3iqQE2Bv4",
  authDomain: "films-e4f5d.firebaseapp.com",
  projectId: "films-e4f5d",
  storageBucket: "films-e4f5d.appspot.com",
  messagingSenderId: "376573887604",
  appId: "1:376573887604:web:18c2126f1309a2a127fd21"
  };
  
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);

  export const auht = getAuth();
  onAuthStateChanged ( auht , (user) => {
    if(user) { 
    
    console.log(store.dispatch(loginol({
      email:user.email,
      displayName:user.displayName,
      emailVerified:user.emailVerified,
      photoURL:user.photoURL,
      
      uid: user.uid
  
    })))
  
 
  
    } else{
    store.dispatch(logoutol())
    }
      })

      export const searchFilm= async (isim) => {
  
        onSnapshot (query(collection(db,'film'), where('isim', '==', isim)) , (doc) =>{
     console.log('dfghj');
         console.log( store.dispatch(AranaFilm(doc.docs.reduce((AramaFilm , filmler) =>[...AramaFilm ,{ ...filmler.data()}], []))))
         console.log(doc.docs)
       }) 
       
     }
  
     onSnapshot (collection(db,'film'), (doc) =>{
      console.log(doc.docs)
      store.dispatch(Films(doc.docs.reduce((film, filmler) =>[...film ,{ ...filmler.data()  , id:filmler.id }], [])))
      
    })
    onSnapshot (collection(db,'kategoriler'), (doc) =>{
      console.log(doc.docs)
      store.dispatch(setTumKategoriler(doc.docs.reduce((tumKatogeri, filmler) =>[...tumKatogeri ,{ ...filmler.data()  , id:filmler.id }], [])))
      
    })
    onSnapshot (query(collection(db,'kategoriler'), where('menu', '==', true)), (doc) =>{
      console.log(doc.docs)
      var menuler = doc.docs.reduce((ustMenu, tur) =>[...ustMenu ,{ ...tur.data()  , id:tur.id }], []);
       menuler.sort(function(a, b){
        return a.order - b.order;
      });
      store.dispatch(EkleTuru(menuler))
      
    })
    onSnapshot (query(collection(db,'kategoriler'), where('menu', '==', false)), (doc) =>{
      console.log(doc.docs)
      var menuleri = doc.docs.reduce((AltMenu, tur) =>[...AltMenu ,{ ...tur.data()  , id:tur.id }], []);
       menuleri.sort(function(a, b){
        return a.order - b.order;
      });
      console.log(menuleri)
      store.dispatch(AltMenuSet(menuleri))
      
    })
 
 
     
     export const  AramadaBulunan = async (isim) => {
  
      onSnapshot (query(collection(db,'film'), where('isim', '==', isim)) , (doc) =>{
   console.log('dfghj');
       console.log( store.dispatch(AramaSonuc(doc.docs.reduce((BulunanFilm , filmler) =>[...BulunanFilm ,{ ...filmler.data()}], []))))
       console.log(doc.docs)
     }) 
     
   }
   export const  Detaylartamami = async (id) => {
  
    onSnapshot (query(collection(db,'film'), where('id', '==', id)) , (doc) =>{
 console.log('dfghj');
     console.log( store.dispatch(Detaylar(doc.docs.reduce((detayFilm , filmler) =>[...detayFilm ,{ ...filmler.data()}], []))))
     console.log(doc.docs)
   }) 
   
 }
 export const  AltMenuFilmleri = async (tur) => {

  onSnapshot (query(collection(db,'film'), where('secilentur', 'array-contains', tur.id)) , (doc) =>{
  store.dispatch(setOneCikanlar({ tur, data: doc.docs.reduce((oneCikanlar, filmlers) =>[...oneCikanlar ,{ ...filmlers.data() }], [])}));
 });

}


  onSnapshot(query(collection(db,'film'), where('secilentur', 'array-contains', 'AyHD3HAcnmW9xdlbrzkR')) , (doc) =>{
  console.log(store.dispatch(setSliders( doc.docs.reduce((Sliderlar, filmlers) =>[...Sliderlar ,{ ...filmlers.data() }], []))));
 })

 
 

 export const citiesRef = collection(db, "film");

 onSnapshot(query( citiesRef , orderBy('isim') ,  startAt(  0) , limit(5) ), async (doc) =>{

  console.log(store.dispatch(PaginationDizi(  doc.docs.reduce((siraliDizi, filmleri) =>[...siraliDizi ,{ ...filmleri.data(),id:  filmleri.id  }], []))));
 })

 export const SayfaDegis = async (z) => {



 onSnapshot(query( citiesRef , orderBy('isim') ,  startAfter( z &&   z.isim  ||  0) , limit(5) ), async (doc) =>{
console.log('ffff')
  console.log(store.dispatch(PaginationDizi( doc.docs.reduce((siraliDizi, filmleri) =>[...siraliDizi ,{ ...filmleri.data(),id:  filmleri.id  }], []))));
 })
 }


 export const  TurAyirma = async (secilentur) => {
  
  onSnapshot (query(collection(db,'film'), where('secilentur', 'array-contains', secilentur)) , (doc) =>{
console.log('bbbb');
   console.log( store.dispatch(KatogeriAyirma(doc.docs.reduce((Katogeri , filmler) =>[...Katogeri ,{ ...filmler.data() }], []))))
   console.log(doc.docs)
 }) 
 
}



 
   
        
    
  export const login = async(email,password) =>{
    try{
      const {user} = await signInWithEmailAndPassword(auht,email,password)
      return user ;
    }catch(error){
      toast.error(error.message)
    }
  }
  export const logout = async() =>{
    try{
     await signOut(auht)
      return true;
    }catch(error){
      toast.error(error.message)
    }
    
  }
  export const addFilm= async  (data)  =>{
    try{
        const result = await  addDoc(collection(db,'film'),data);
        toast.success('Başarılı  bir şekilde eklendi ')
    }catch(error){
     toast.error(error.message)
    }

  
   }
  
   export const storage = getStorage(app);
   
  export default app;
