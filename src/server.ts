import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routes } from "./routes/route";

const server:Server = createServer((req:IncomingMessage, res:ServerResponse)=>{
    
    routes(req, res)
});



server.listen(5000, ()=>{
    console.log("This Server running At Port: 5000")
});