import ImageKit from '@imagekit/nodejs';
import { Config } from '../config/config';

const ImagetKitUpload = async (buffer) => {

    const client = new ImageKit.client({
        privateKey: Config.IMAGEKIT_PRIVATE_KEY
    })

    const response = await client.files.upload({
        file: await toFiles(Buffer.from(buffer), 'file'),
        filename: '/Snitch/ProductImages'
    })

    return response
}