import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server:Server = createServer((req:IncomingMessage, res:ServerResponse)=>{
    const url = req.url;
    const method = req.method;

    if(url === "/" && method === "GET"){
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({ message: "This is Root Route" }));
    }
    else if(url?.startsWith("/products")){
        
    }
    else{
        res.writeHead(404, {"content-type":"application/json"})
        res.end(JSON.stringify({message: "Route Note Found"}))
    }
});



server.listen(5000, ()=>{
    console.log("This Server running At Port: 5000")
});