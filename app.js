const express = require('express')
const Itme = require ('./models/items')
const app = express()
const mongoose = require('mongoose')
const Item = require('./models/items')

//urlencoded() is a built-in middleware in Express. js. The main objective of this 
// method is to parse the incoming request with urlencoded payloads and is based upon the body-parser
app.use(express.urlencoded({extended:true}))

const mongodb ="mongodb+srv://WC1:wc123@cluster0.wthgv.mongodb.net/items-data?retryWrites=true&w=majority"
app.set('view engine', 'ejs')

mongoose.connect(mongodb).then(()=>{
    console.log("connected")
    app.listen(3000)
}).catch(err=>{
    console.log(err)
})
            // CODE FOR THE SAVE AND GET DATA IN MONGO DB
// // save the data to the database 
// app.get('/create-item',(req,res)=>{
//     const item = new Item({
//         name:'samsung',
//         price: 2500
//     });
//     item.save().then(result=>res.send(result)).catch(err=>console.log(err))
// })
// //getting item by ID
// app.get('/get-item-id',(req,res)=>{
//     Item.findById("62cf65bdb5246df78d3bd7a3").then(result=>res.send(result)).catch(err=>console.log(err))
// })


app.get('/',(req,res)=>{ // The '/' represent the URL after localhost:3000 - / indicate the inital page 
    
    // res.send('<p>Home pages</p>') // this is not best way to load the html conten or page 
    // res.sendFile('./views/index.html', {root: __dirname}) this is use to send html page as normal
    //  also we can pass data to the page we rendering here
    // const items =[
    //     {name: 'Mobile phone', price: 1000},
    //     {name: 'book', price: 2000},
    //     {name: 'computer', price: 3000}
    // ]

    // now redirecting to another api which returning the index file with data 
    res.redirect('./get-items') 
})

//getting all the details from the item collection
app.get('/get-items',(req,res)=>{
    Item.find().then(result=>{
        res.render('index',{items: result})
    }).catch(err=>console.log(err))
})

// if we want to work for another URL page call add-items
app.get('/add-items', (req,res)=>{
    // res.send("<h1> Add item page </h1>")// this is not best way to load the html conten or page 
    // res.sendFile('./views/additem.html', {root: __dirname})
    res.render('additem')
})

// here the post request will be handle 
// the url should be the same name as in the form action url/path name  
app.post('/items', (req,res)=>{
    console.log(req.body)
    const item = Item(req.body);
    item.save().then(()=>{
        res.redirect('./get-items')
    }).catch(err=>console.log(err))
})


// handling get with params - by id
app.get('/items/:id', (req,res)=>{
    console.log(req.params)
    const id = req.params.id;
    Item.findById(id).then(result=>{
        console.log(result)
        res.render('item-details',{item:result})
    })
})

// handling get with params - by id
app.delete('/items/:id', (req,res)=>{
    console.log(req.params)
    const id = req.params.id;
    Item.findByIdAndDelete(id).then(result=>{
        res.json({redirect: '/get-items'})
    })
})

// handling get with params - by id
app.put('/items/:id', (req,res)=>{
    console.log(req.params)
    const id = req.params.id;
    Item.findByIdAndUpdate(id, req.body).then(result=>{
        res.json({msg: 'update successfully'})
    })
})

// this should be bottom of the routing becasue it will if the user searched 
// anthing other than above route name
app.use((req,res)=>{
    // res.sendFile('./views/error.html', {root: __dirname})
    res.render('error')
})