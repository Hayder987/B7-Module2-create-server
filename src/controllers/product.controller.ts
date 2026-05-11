
import type { IncomingMessage, ServerResponse } from "node:http";
import { getProduct, insertProduct } from "../services/product.service";
import { perseBody } from "../utility/persebody";
import type { IProduct } from "../types/product.type";

export const productController = async (
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
  } else if (method === "POST" && url === "/products") {
    const body = await perseBody(req);
    const product = getProduct();
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    product.push(newProduct);
    insertProduct(product);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "product create successfully",
        data: newProduct,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    const body = await perseBody(req);
    const products = getProduct();

    const index = products.findIndex((item: IProduct) => item.id === id);
    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "product Not Found", data: {} }));
      return;
    }

    products[index] = { id: products[index].id, ...body };

    insertProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "product update successfully",
        data: products[index],
      }),
    );
  } else if (method === "DELETE" && id !== null) {
    const products = getProduct();
    const index = products.findIndex((item: IProduct) => item.id === id);

    // method-1
    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "product Not Found", data: null }));
    }
    const deletedProduct = products.find((item: IProduct) => item.id === id);
    products.splice(index, 1);
    insertProduct(products);

    
    // method-2
    // const newProducts = products.filter((item:IProduct)=> item.id !== id);
    // insertProduct(newProducts);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "product Delete successfully",
        data: deletedProduct,
      }),
    );
  }
};
