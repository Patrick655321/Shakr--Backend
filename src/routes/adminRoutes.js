const express = require("express")


adminRouter.post("/login", async (req, res) => {
    const token = await loginAdmin({
        username: req.body.username,
        password: req.body.password
    })
    return res.json(token)
})