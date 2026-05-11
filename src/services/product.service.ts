import fs from "fs";
import path from "path"

const cwd = process.cwd();
const filePath = path.join(cwd, "./src/database/db.json")

export const getProduct = () =>{
    const readFile = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(readFile);
};

export const insertProduct = (payload: any)=>{
  fs.writeFileSync(filePath, JSON.stringify(payload));
}