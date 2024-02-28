import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    film:[],
    AramaFilm:[],
    BulunanFilm:[],
    detayFilm:[],
    ustMenu:[],
   Katogeri:[],
   tumKatogeri:[],
   AltMenu:[],
  oneCikanlar:{},
   trend:[],
   Soncikanlar:[],
   Filmler:[],
Slider:[],
Sliderlar:[], 
siraliDizi:[],
  
};
 const film = createSlice({
    name:'film',
    initialState,
    reducers:{
        Films:(state,action) =>{
           
            state.film = action.payload
          

        },
        KategoriId:(state,action) =>{
           
            state.secilenKategoriId = action.payload
          

        },
        PaginationDizi:(state,action) =>{
            let sayfalama = [...state.siraliDizi, ...action.payload ];
            state.siraliDizi = sayfalama;
        },
      
        setTrend:(state,action) =>{
           
            state.trend = action.payload
          

        },
        setSliders:(state,action) =>{
           
            state.Sliderlar = action.payload
          

        },
   
        setSoncikanalar:(state,action) =>{
           
            state.Soncikanlar = action.payload
          

        },
        setSlider:(state,action) =>{
           
            state.Slider = action.payload
          

        },
        setOneCikanlar:(state,action) =>{
            state.oneCikanlar[action.payload.tur.name  ]=  action.payload.data 
        },
        setFilmler:(state,action) =>{
           
            state.Filmler = action.payload
          

        },
        AranaFilm:(state,action) =>{
           
            state.AramaFilm = action.payload
          

        },
        AramaSonuc:(state,action) =>{
           
            state.BulunanFilm = action.payload
          

        },
        Detaylar:(state,action) =>{
            state.detayFilm = action.payload
        },
        
       
       
       FlimDizi: (state,action)=>{
        state.film =[...state.film , action.payload]
       },

       EkleTuru:(state,action) =>{
        state.ustMenu = action.payload
    },
   
   
   DiziTur: (state,action)=>{
    state.ustMenu =[...state.ustMenu , action.payload]
   },
   KatogeriAyirma: (state,action)=>{
    state.Katogeri = action.payload;
   },
   AltMenuSet:(state,action) =>{
    state.AltMenu = action.payload
},

setTumKategoriler:(state,action) =>{

    state.tumKatogeri= action.payload

},
   
    }
 })

 export const {FlimDizi,Films,AranaFilm , setSlider, setSliders, PaginationDizi ,AramaSonuc, Detaylar,EkleTuru,DiziTur,KatogeriAyirma , setOneCikanlar, KategoriId  , setFilmler ,setSoncikanalar ,AltMenuSet , setTrend, setTumKategoriler} = film.actions;
 export default film.reducer;