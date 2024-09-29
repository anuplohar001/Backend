import Prompt from "../model/prompts.js"
import User from "../model/user.js";
import Story from "../model/story.js";

const message = "Something went wrong"


export default function APIEndpoints(app) {

    //GET API
    app.get("/feed", async (req, res) => {
        const id = req.query.id
        try {
            if (!id) {
                const prompts = await Prompt.find({}).populate("padmin").sort({ _id: -1 }) 
                return res.status(200).send({ prompts })
            }
            else {
                const prompts = await Prompt.findOne({ _id: id }).populate("padmin")
                return res.status(200).send({ prompts })
            }

        } catch (error) {
            return res.status(500).send({ message: message })
        }
    });


    app.get("/profile", async (req, res) => {
        const id = req.query.id
        try {
            const prompts = await Prompt.find({ padmin: id }).populate("padmin")
            res.status(200).send({ prompts })
        } catch (error) {
            res.status(500).send({ message: message })
        }

    });

    app.get("/comments", async (req, res) => {
        const id = req.query.id
        try {
            const post = await Prompt.findOne({ _id: id }).populate("comment.userid")
            const comments = post.comment

            return res.status(200).send({ comments })
        } catch (error) {
            return res.status(500).send({ message: message })
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


    app.get("/oldStory", async (req, res) => {
        try {
            const stories = await Story.find({}).populate("userid")
            if(stories)
                return res.status(200).send(stories)
            return res.status(200).send({message: "No stories available"})
        } catch {
            return res.status(500).send({ message: message })
        }
    })

    app.get("/oldStory/:id", async (req, res) => {
        const id = req.params.id
        try {
            const stories = await Story.find({userid: id}).populate("userid")
            if (stories)
                return res.status(200).send(stories)
            return res.status(200).send({ message: "No stories available" })
        } catch {
            return res.status(500).send({ message: message })
        }
    })

    app.get("/likes/:postid", async (req, res) => {
        const postid = req.params.postid        
        try {
            const posts = await Prompt.findOne({_id: postid})
            const likesNo = posts.like
            const no = likesNo.length
            return res.status(200).send({no})
        } catch (error) {
            return res.status(500).send({message: message})
        }
    })

    app.get("/likes/:postid/:userid", async (req, res) => {
        const postid = req.params.postid
        const userid = req.params.userid
        
        try {
            const posts = await Prompt.find({ _id: postid, like: userid})            
            if(posts.length)
                return res.status(200).send({isLike : true})
            return res.status(200).send({isLike: false})
        } catch (error) {
            return res.status(500).send({message: message})
        }
    })


    //POST API
    app.post("/newUser", async (req, res) => {
        const { username, phone, email, password } = req.body
        try {
            const newuser = new User({ username, phone, email, password })
            await newuser.save()
            return res.status(200).send({ message: "User Created" })
        } catch (error) {
            return res.status(500).send({ message: message })
        }
    });

    app.post("/create", async (req, res) => {
        const { prompt, tag, padmin } = req.body
        try {
            const newp = await Prompt.create({ prompt, tag, padmin })
            newp.save()
            return res.status(200).send({ message: "Post created" })
        } catch (error) {
            return res.status(500).send({ message: message })
        }
    })

    app.put("/postComment", async (req, res) => {
        const { comment, padmin, postid } = req.body

        try {
            const prompt = await Prompt.findOneAndUpdate({_id: postid}, {$push:{comment: {content:comment, userid:padmin}}})
            return res.status(200).send({ message: "Comment posted" })
        } catch (error) {
            return res.status(500).send({ message: message })
        }
    })
    
    app.put("/putLike/:postid/:userid", async (req, res) => {
        const postid = req.params.postid
        const userid = req.params.userid
        
        const isLike = req.body.isLiked
        try {
            if(isLike){
                const prompt = await Prompt.findByIdAndUpdate({_id: postid}, {$push: {like:userid}})
            } else {
                const prompt = await Prompt.findByIdAndUpdate({ _id: postid }, { $pull: { like:userid } })
            }
            return res.status(200).send({message: "Like/Unlike"})
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
            return res.status(200).send({ message: "Post Edited" })
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

    app.put("/deleteComment", async (req, res) => {
        const id = req.query.id
        
        try {
            const post = await Prompt.findOneAndUpdate({ comment: { $elemMatch: {_id: id}} }, {
                $pull : {comment : {_id: id}}
            })
            return res.status(200).send({ message: "Comment Deleted" })
        } catch (error) {
            return res.status(500).send({ message: message })
        }
    })

    app.delete("/deleteStory/:id", async (req,res) => {
        const id = req.params.id        
        try {
            await Story.deleteOne({_id:id})
            return res.status(200).send({ message: "Story Deleted" })
        } catch (error) {
            return res.status(500).send({ message: message })
        }
    })
}
