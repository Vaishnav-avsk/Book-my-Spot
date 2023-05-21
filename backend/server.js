const express = require('express');
// const path = require('path');

var app = express();
const axios = require('axios');
const PORT = process.env.PORT || 8080;


const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000'
}));








const API_KEY='
{Your Yelp API key goes here without the {}}'



app.get('/fetchYelp', (req,res)=>{
    let {term,radius,categories,latitude,longitude}=req.query;
    radius=String(Number((Number)(radius)*1609));
    console.log(radius);
    let url=`https://api.yelp.com/v3/businesses/search?term=${term}&latitude=${latitude}&longitude=${longitude}&categories=${categories}&radius=${radius}&limit=10`;
     axios.get(url,{
        headers:{
           Authorization:`Bearer ${API_KEY}`
        }
    }).then((response)=>{
        console.log(response.data.businesses);
        return res.json(response.data);
    }).catch(error=>{
        return res.json('error')
    })
  
})

app.get('/autocomplete',(req,res)=>{
    let {Keyword}=req.query;
    let url=`https://api.yelp.com/v3/autocomplete?text=${Keyword}`;
    axios.get(url,{
        headers:{
           Authorization:`Bearer ${API_KEY}`
        }
    }).then((response)=>{
        return res.json(response.data);
    }).catch(error=>{
        return res.json('error')
    })

})

app.get('/getInfo',(req,res)=>{

    let {id}=req.query;

    let url=`https://api.yelp.com/v3/businesses/${id}`;
    
    axios.get(url,{
        headers:{
           Authorization:`Bearer ${API_KEY}`
        }
    }).then((response)=>{
        return res.json(response.data);
    }).catch(error=>{
        return res.json('error')
    })
})

app.get('/fetchReviews',(req,res)=>{
  
    let{id}=req.query;

    let url=`https://api.yelp.com/v3/businesses/${id}/reviews`;
    
    axios.get(url,{
        headers:{
           Authorization:`Bearer ${API_KEY}`
        }
    }).then((response)=>{
        return res.json(response.data);
    }).catch(error=>{
        return res.json('error')
    })


})

app.listen(PORT, function() {
    console.log("Backend Application listening at http://localhost:8080")
})