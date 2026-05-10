import type { IncomingMessage, ServerResponse } from "node:http";
import { getProduct } from "../services/product.service";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const product = getProduct()

  if (url?.startsWith("/products") && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "this is product route", data: product }));
  }
};
