import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routes } from "./routes/route";
import config from "./config/config";

const server:Server = createServer((req:IncomingMessage, res:ServerResponse)=>{
    routes(req, res)
});



server.listen(config.port, ()=>{
    console.log("This Server running At Port: 5000")
});