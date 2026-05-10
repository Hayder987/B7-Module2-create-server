import type { IncomingMessage, ServerResponse } from "node:http";
import { productController } from "../controllers/product.controller";

export const routes = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This is Root Route" }));
  } 
  else if (url?.startsWith("/products")) {
    productController(req, res);
  } 
  else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Route Note Found" }));
  }
};
