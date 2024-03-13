import "./loadEnvironment.mjs";
import express from 'express'
import cors from 'cors'
const app = express()
const router = express.Router()
import db from "./db/conn.mjs";
import { ObjectId } from "mongodb";

app.use(cors())
app.use(express.json())

app.use("/form-responses", router)

router.get("/", async (req, res) => {
    let collection = await db.collection("form-responses");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// router.get("/:id", async (req, res) => {
//     let collection = await db.collection("form-responses");
//     let query = { _id: new ObjectId(req.params.id) }
//     let result = await collection.findOne(query)
//     res.send(result).status(200)
// })

router.post("/", async (req, res) => {
    let newDocument = {
        name: req.body.name,
        todos: []
    }
    const collection = await db.collection('form-responses')
    let result = await collection.insertOne(newDocument)
    res.send(result).status(204)
})

// router.patch("/:id", async (req, res) => {
//     const query = { _id: new ObjectId(req.params.id) }
//     const updates = {
//         $push: {
//             todos:req.body.todo
//         }
//     }
//     const collection = db.collection('todos')
//     const result = await collection.updateOne(query,updates)
//     res.send(result).status(200)
// })

// router.delete("/:id/:index",async (req,res)=>{
//     const query = {_id: new ObjectId(req.params.id)}
//     const updates = {
//         $push:{
//             todos:req.params.index
//         }
//     }
//     const collection = db.collection('todos')
//     const result = await collection.updateOne(query,updates)

//     console.log(req.params)
//     console.log(result)

//     res.send(result)

// })




// const PORT = process.env.PORT


// app.listen(PORT, () => { console.log(`server running on ${PORT}`) })