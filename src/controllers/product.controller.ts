import type { IncomingMessage, ServerResponse } from "node:http";
import { getProduct, insertProduct } from "../services/product.service";
import type { IProduct } from "../types/product.type";
import { perseBody } from "../utility/persebody";

export const productController =async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const urlPart = url?.split("/");

  const id = urlPart && urlPart[1] === "products" ? Number(urlPart[2]) : null;

  const product = getProduct();

  if (url === "/products" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "this is product route", data: product }),
    );

  } else if (method === "GET" && id !== null) {
    const product = getProduct();
    const singleProduct = product.find((item: IProduct) => item.id === id);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "product route", data: singleProduct }));
  } 

  else if (method === "POST" && url === "/products") {
    const body = await perseBody(req);
    const product = getProduct();
    const newProduct = {
      id: Date.now(),
      ...body
    }
     product.push(newProduct);
     insertProduct(product);
     console.log(product)
    

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "product create successfully", data: newProduct }));
  }
};
