import Prompt from "../model/prompts.js"
import User from "../model/user.js";
import Comments from "../model/comments.js";

const message = "Something went wrong"


export default function APIEndpoints(app) {

    //GET API
    app.get("/feed", async (req, res) => {
        const id = req.query.id
        try {
            if(!id){
                const prompts = await Prompt.find({}).populate("padmin")
                return res.status(200).send({ prompts })
            }
            else{
                const prompts = await Prompt.findOne({_id:id}).populate("padmin")
                return res.status(200).send({ prompts })
            }

        } catch (error) {
            return res.status(500).send({message:message})
        }
    });


    app.get("/profile", async (req, res) => {
        const id = req.query.id
        try {
            const prompts = await Prompt.find({ padmin: id }).populate("padmin")
            res.status(200).send({ prompts })
        } catch (error) {
            res.status(500).send({message: message})
        }
       
    });

    app.get("/comments", async (req, res) => {
        const id = req.query.id
        try {
            const comments = await Comments.find({postid: id}).populate("padmin")
            console.log(comments);
            
            return res.status(200).send({comments})
        } catch (error) {
            return res.status(500).send({message:message})
        }
    })

    app.get("/userInfo", async (req, res) => {
        const id = req.query.id
        try {
            const user = await User.findOne({ _id: id })
            return res.status(200).send({ user })
        } catch (error) {
            return res.status(500).send({ message: message })
        }
    })

  


    //POST API
    app.post("/newUser", async (req, res) => {
        const {username, phone, email, password} = req.body
        try {
            const newuser = new User({username, phone, email, password})
            await newuser.save()
            return res.status(200).send({message: "User Created"})
        } catch (error) {
            return res.status(500).send({message:message})
        }
    });

    app.post("/create", async (req, res) => {
        const {prompt, tag, padmin} = req.body
        try {
            const newp = await Prompt.create({ prompt, tag, padmin })
            newp.save()
            return res.status(200).send({ message: "Post created" })
        } catch (error) {
            return res.status(500).send({ message:message})
        }        
    })

    app.post("/postComment", async (req, res) => {
        const {comment, padmin, postid} = req.body
        console.log(req.body);
        
        try {
            const newc = await Comments.create({comment, padmin, postid})
            newc.save()
            console.log("Commented");
            
            return res.status(200).send({message: "Comment posted"})
        } catch (error) {
            return res.status(500).send({message: message})
        }
    })



    
    //PATCH API
    app.patch("/editPrompt", async (req, res) => {
        const id = req.query.id
        const { prompt, tag } = await req.body;
        try {
            const data = await Prompt.findOne({ _id: id })
            data.prompt = prompt;
            data.tag = tag;
            await data.save()
            return res.status(200).send({message: "Post Edited"})
        } catch (error) {
            return res.status(500).send({ message: message })
        }
    })

    app.patch("/userEdit", async (req, res) => {
        const id = req.query.id
        const { username, email, password } = await req.body;
        try {
            const data = await User.findOne({ _id: id })
            data.username = username;
            data.email = email;
            data.password = password;
            await data.save()
            return res.status(200).send({ message: "User Info Edited" })
        } catch (error) {
            return res.status(500).send({ message: message })
        }
    })


    

    //DELETE API
    app.delete("/delete", async (req, res) => {
        const id = req.query.id
        try {
            await Prompt.deleteOne({ _id: id })
            // await Like.deleteMany({ postid: params.id })
            return res.status(200).send({ message: "Post Deleted" })
        } catch (error) {
            return res.status(500).send({ message: message })
        }
    })

    app.delete("/deleteComment", async (req, res) => {
        const id = req.query.id
        console.log(id)
        try {
            const ccc = await Comments.findOne({ _id: id })
            console.log("This is comment ", ccc)
            await Comments.deleteOne({ _id: id })
            // await Like.deleteMany({ postid: params.id })
            return res.status(200).send({ message: "Comment Deleted" })
        } catch (error) {
            return res.status(500).send({ message: message })
        }
    })
}
