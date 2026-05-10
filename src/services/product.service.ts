import fs from "fs";
import path from "path"

export const getProduct = () =>{
    const cwd = process.cwd();

    const filePath = path.join(cwd, "./src/database/db.json")
    const readFile = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(readFile);
};