const bcryt= require("bcrypt");
const jwt= require("jsonwebtoken")


function TokenVerify(token) {

    const Token= req.headers.token;

    const decode= jwt.decode(Token)
    const id= decode.id

    
}
