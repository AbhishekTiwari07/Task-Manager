const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

//const {MongoClient,ObjectID} = mongodb

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task_manager'

MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error,client)=>{
    if(error)
        return console.log("Unable to connect to Database")

    console.log("Connected to Database")
    const db = client.db(databaseName)

    //Insertion:
    // const users = [{
    //     name : "Abhishek",
    //     age: 25,
    //     height:125,
    // },
    // {
    //     name : "Abhishek2",
    //     age: 20,
    //     height:165,
    // }]
    // db.collection('users').insertOne(users[0],(error,result)=>{
    //     if(error)
    //         return console.log(error)
    //     return console.log(result.ops)
    // })
    // db.collection('users').insertMany(users,(error,result)=>{
    //     if (error)
    //         return console.log(error)
    //     return console.log(result.ops)
    // })
    //
    // tasks = [{
    //     discription: "Eat food",
    //     completed : true,
    // },
    // {
    //     discription: "Eat food2",
    //     completed : false,
    // },
    // {
    //     discription: "Eat food3",
    //     completed : true,
    // }]
    //
    // db.collection('tasks').insertMany(tasks,(error,result)=>{
    //     if(error)
    //         return console.log(error)
    //     console.log(result.ops)
    // })

    //Query:
    // db.collection('users').findOne({ name : 'Abhishek'},(error,user)=>{
    //     if(error)
    //         return console.log(error)
    //     console.log(user)
    // })
    // db.collection('tasks').find({completed:true}).toArray((error,user)=>{
    //     console.log(user)
    // })
    // db.collection('users').find({age:20}).count((error,user)=>{
    //     console.log(user)
    // })

    // Updating
    // db.collection('users').updateOne({
    //     age:20
    // },{
    //     $set :{
    //         name : "JUZ0"
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('users').updateMany({
    //     age : 25
    // },{
    //     $inc :{
    //         age :1
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    //Deleting
    // db.collection('users').deleteMany({
    //     age: 21
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
})
