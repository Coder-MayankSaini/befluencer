import ImageKit from "@imagekit/nodejs";
import process from 'process';
import dotenv from 'dotenv';

dotenv.config();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(buffer, fileName = 'image.jpg') {
    // Convert Buffer to Base64 string
    const base64File = buffer.toString('base64');

    const result = await imagekit.files.upload({
        file: base64File,
        fileName: fileName,
    });
    return result;
}

export default uploadFile;