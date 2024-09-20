import Prompt from "../model/prompts.js"
import User from "../model/user.js";

export default function APIEndpoints(app) {

    app.get("/feed", async (req, res) => {
        const prompts = await Prompt.find({})
        res.status(200).send({ prompts })
    });


    app.get("/profile", async (req, res) => {
        const id = req.query.id
        const prompts = await Prompt.find({padmin: id})
        res.status(200).send({ prompts })
    });

    app.get("/users", async (req, res) => {
        const users = await User.find({})
        res.send({ users })
    });

    app.post("/create", async (req, res) => {
        const {prompt, tag, padmin} = req.body
        try {
            const newp = await Prompt.create({ prompt, tag, padmin })
            newp.save()
            return res.status(200).send({ message: "Post created" })
        } catch (error) {
            return res.status(500).send({ message: "something went wrong" })
        }
        
    })
}
