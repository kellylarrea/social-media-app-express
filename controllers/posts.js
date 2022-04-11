import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
    try{
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res)=> {
    const post = req.body;

    const newPost = new PostMessage(post);
    try{
        await newPost.save()

        res.status(201).json(newPost);
    } catch (error){
res.status(409).json({ message: error.message })
    }
 
}



export const updatePost = async (req, res) =>{
    //extract id from req.params using object destructuring. Raname porperty {id: _id}
    //posts/123 when using params
    const { id: _id } = req.params
    // receiving date for update post in req.body being sent from front end
    const post = req.body
    // if check to check for valid id
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
    //new: true to receive update post async and await
   
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true} )

    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    await PostMessage.findByIdAndRemove(id)
    console.log('Delete')
    res.json({ message: 'Post has been deleted' })
}