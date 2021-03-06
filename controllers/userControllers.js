const models = require('../models')

const userControllers = {}

userControllers.create = async (req, res) => {
    try {
        const user = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        res.json({message: 'complete', user})
    } catch (error) {
        res.status(400)
    }
}

userControllers.login = async (req, res) => {
    const user = await models.user.findOne({
        where: {
            email: req.body.email
        }
    })
    if (user && (user.password === req.body.password)) {
        // res.status(200)
        console.log(user)
        res.json({id: user.id, name: user.name})
        // res.json({message: 'login sucess', user: user})
    } else {
        res.status(401)
        // res.json({error: 'login failed'})
        console.log({error: 'login failed'})
    }
}

userControllers.delete = async (req, res) => {
    try {
        let user = await models.user.findOne({
            where: {
                id: req.params.id
            }
        })
        console.log(user)
      const deleteUser =  await user.destroy()
        res.json({message: 'user removed', deleteUser})
    } catch (error) {
        res.json({error})
    }
}

userControllers.update = async (req, res) => {
    try {
        let updates = req.body
        let updatedUser = await models.user.findOne({
            where: {
                id: req.params.id
            }
        })
        let newUser = await updatedUser.update(updates)
        res.json({newUser})
    } catch (error) {
        res.json({error})
    }
}

userControllers.saveWord = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                id: req.body.userId
            }
        })

        const word = await models.word.findOne({
            where: {
                id: req.body.wordId
            }
        })
    } catch (error) {
        res.json({error})
    }
}

userControllers.logIn = async (req, res) => {
    try {
        const logedInUser = await models.user.findOne({
            where: {
                email: req.body.email
            }

        })
        if (!logedInUser) {
            res.json.error({message: 'login failed'})
        }
        // const checkPassword = models.user.
        if (logedInUser.password === req.body.password) {
            res.json({name: logedInUser.name, id: logedInUser.id})
        }
        res.json({error: 'login failed'})
    } catch (error) {
        res.json({error})
    }
}

module.exports = userControllers