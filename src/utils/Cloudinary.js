import {v2 as cloudinary} from "cloudinary";
import { response } from "express";
import fs from "fs";
//fs is a file system


cloudinary.config(
    {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    }
)

const cloudinaryUploader = async (localFilePath) => {
    try{
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"                               //there are so many other options we can try (refer cloudinary website)
        });
        console.log("File is uploaded on cloudinary")
        return response.url;     //cloudinary will return a url of the image after the upload is successfull
    }catch(error){
        fs.unlinkSync(localFilePath)  //it removes the locally saved temporary file as the upload got failed
        return null;
    }
}

export {cloudinaryUploader}