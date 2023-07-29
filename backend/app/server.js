const express = require("express")
const usersRoute = require("./routes/users")

const app = express()

app.use(express.json())

app.use("/users", usersRoute)	

app.listen(3000, () => {
  console.log("Server is listening on port 3000")
})

module.exports = app