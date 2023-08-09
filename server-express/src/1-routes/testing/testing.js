const express = require('express');

// LAYER 1: ROUTES - TESTING
const routerTesting = () =>{

  const routerApi = express.Router();

  routerApi.get('/saintseiya', (req, res)=>{
    res.json({
      saints: 
      [ 
        {id:1000,name:"Seiya",type:"Bronce",constellation:"Pegaso",saga:"todas",armor:["Bronce","Oro","Asgard"],thumbnail:"https://static.wikia.nocookie.net/doblaje/images/5/5b/SeiyadePegasoSaintSeiya02.png/revision/latest?cb=20190728210056&path-prefix=eshyoga"},
        {id:1001,name:"Hyoga",type:"Bronce",constellation:"Cisne",saga:"todas",armor:["Bronce","Oro"],thumbnail:"https://static.wikia.nocookie.net/doblaje/images/b/b2/HYogadeCisneSAintseiya02.png/revision/latest/scale-to-width-down/162?cb=20190728224632&path-prefix=es"},
        {id:1002,name:"Shiriu",type:"Bronce",constellation:"Dragon",saga:"todas",armor:["Bronce","Oro"],thumbnail:"https://static.wikia.nocookie.net/ficcion-sin-limites/images/c/c8/ShiryuV1.png/revision/latest?cb=20210714193420&path-prefix=es"},
        {id:1003,name:"Ikki",type:"Bronce",constellation:"Fenix",saga:"todas",armor:["Bronce"],thumbnail:"https://static.wikia.nocookie.net/doblaje/images/a/ab/IkkiFenixSaintSeiya02.png/revision/latest/thumbnail/width/360/height/450?cb=20190728200313&path-prefix=es"},
        {id:1004,name:"Shun",type:"Bronce",constellation:"Andromeda",saga:"todas",armor:["Bronce"],thumbnail:"https://static.wikia.nocookie.net/saintseiya/images/3/34/Andromeda_Shun_V1.jpg/revision/latest?cb=20130530021941"},
        {id:1006,name:"Milo",type:"Oro",constellation:"Escorpio",saga:"12 casas",armor:["oro"],thumbnail:"https://static.wikia.nocookie.net/doblaje/images/c/cc/ScorpioMiloSaintSeiya02.png/revision/latest?cb=20190808014554&path-prefix=es"},
        {id:1007,name:"Aldebaran",type:"Oro",constellation:"Tauro",saga:"12 casas",armor:["oro"],thumbnail:"https://static.wikia.nocookie.net/doblaje/images/d/d9/AldebarandeTauroSaintSeiya02.png/revision/latest?cb=20190808164809&path-prefix=es"},
        {id:1008,name:"Aiyoria",type:"Oro",constellation:"Leo",saga:"12 casas",armor:["oro"],thumbnail:"https://static.wikia.nocookie.net/doblaje/images/4/41/AioriadeLeoSaintSeiya02.png/revision/latest?cb=20190807180808&path-prefix=es"},
        {id:1009,name:"Mu",type:"Oro",constellation:"Aries",saga:"12 casas",armor:["oro"],thumbnail:"https://static.wikia.nocookie.net/doblaje/images/a/a2/Aries_muu23.png/revision/latest/scale-to-width-down/327?cb=20190807181108&path-prefix=es"},
        {id:1010,name:"Camus",type:"Oro",constellation:"Acuario",saga:"12 casas",armor:["oro"],thumbnail:"https://static.wikia.nocookie.net/doblaje/images/8/8a/CamusdeACuarioSaintseiya02.png/revision/latest?cb=20190808201430&path-prefix=es"},
        {id:1011,name:"Sigrfied ",type:"Asgard",constellation:"Dubhe Alfa",saga:"Asgard",armor:["Asgard"],thumbnail:"https://i.pinimg.com/originals/76/c4/25/76c4252b42685cc1f0f4e175f7256548.png"},
        {id:1012,name:"Hagen  ",type:"Asgard",constellation:"Merak Beta",saga:"Asgard",armor:["Asgard"],thumbnail:"https://static.wikia.nocookie.net/saintseiya/images/1/16/Merak_Beta_H%C3%A4gen44.jpg/revision/latest?cb=20140503015137"},
      ]
    });
  });

  routerApi.get('/saintseiya2', (req, res)=>{
    res.json([ 
      {id:1000,name:"Seiya",type:"Bronce",constellation:"Pegaso",saga:"todas",armor:["Bronce","Oro","Asgard"],thumbnail:"https://static.wikia.nocookie.net/doblaje/images/5/5b/SeiyadePegasoSaintSeiya02.png/revision/latest?cb=20190728210056&path-prefix=eshyoga"},
      {id:1001,name:"Hyoga",type:"Bronce",constellation:"Cisne",saga:"todas",armor:["Bronce","Oro"],thumbnail:"https://static.wikia.nocookie.net/doblaje/images/b/b2/HYogadeCisneSAintseiya02.png/revision/latest/scale-to-width-down/162?cb=20190728224632&path-prefix=es"},
      {id:1002,name:"Shiriu",type:"Bronce",constellation:"Dragon",saga:"todas",armor:["Bronce","Oro"],thumbnail:"https://static.wikia.nocookie.net/ficcion-sin-limites/images/c/c8/ShiryuV1.png/revision/latest?cb=20210714193420&path-prefix=es"},
      {id:1003,name:"Ikki",type:"Bronce",constellation:"Fenix",saga:"todas",armor:["Bronce"],thumbnail:"https://static.wikia.nocookie.net/doblaje/images/a/ab/IkkiFenixSaintSeiya02.png/revision/latest/thumbnail/width/360/height/450?cb=20190728200313&path-prefix=es"},
      {id:1004,name:"Shun",type:"Bronce",constellation:"Andromeda",saga:"todas",armor:["Bronce"],thumbnail:"https://static.wikia.nocookie.net/saintseiya/images/3/34/Andromeda_Shun_V1.jpg/revision/latest?cb=20130530021941"},
      {id:1006,name:"Milo",type:"Oro",constellation:"Escorpio",saga:"12 casas",armor:["oro"],thumbnail:"https://static.wikia.nocookie.net/doblaje/images/c/cc/ScorpioMiloSaintSeiya02.png/revision/latest?cb=20190808014554&path-prefix=es"},
      {id:1007,name:"Aldebaran",type:"Oro",constellation:"Tauro",saga:"12 casas",armor:["oro"],thumbnail:"https://static.wikia.nocookie.net/doblaje/images/d/d9/AldebarandeTauroSaintSeiya02.png/revision/latest?cb=20190808164809&path-prefix=es"},
      {id:1008,name:"Aiyoria",type:"Oro",constellation:"Leo",saga:"12 casas",armor:["oro"],thumbnail:"https://static.wikia.nocookie.net/doblaje/images/4/41/AioriadeLeoSaintSeiya02.png/revision/latest?cb=20190807180808&path-prefix=es"},
      {id:1009,name:"Mu",type:"Oro",constellation:"Aries",saga:"12 casas",armor:["oro"],thumbnail:"https://static.wikia.nocookie.net/doblaje/images/a/a2/Aries_muu23.png/revision/latest/scale-to-width-down/327?cb=20190807181108&path-prefix=es"},
      {id:1010,name:"Camus",type:"Oro",constellation:"Acuario",saga:"12 casas",armor:["oro"],thumbnail:"https://static.wikia.nocookie.net/doblaje/images/8/8a/CamusdeACuarioSaintseiya02.png/revision/latest?cb=20190808201430&path-prefix=es"},
      {id:1011,name:"Sigrfied ",type:"Asgard",constellation:"Dubhe Alfa",saga:"Asgard",armor:["Asgard"],thumbnail:"https://i.pinimg.com/originals/76/c4/25/76c4252b42685cc1f0f4e175f7256548.png"},
      {id:1012,name:"Hagen  ",type:"Asgard",constellation:"Merak Beta",saga:"Asgard",armor:["Asgard"],thumbnail:"https://static.wikia.nocookie.net/saintseiya/images/1/16/Merak_Beta_H%C3%A4gen44.jpg/revision/latest?cb=20140503015137"},
    ])
  });

  return routerApi;

}

module.exports ={
    routerTesting
}