import cloudinary from "../../config/cloudinary";

export class CloudinaryService {

  static async upload(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "attachments",
          resource_type: "auto",
          type: "upload",            
          access_mode: "public"      
        },
        (error, result) => {
          if (error) return reject(error);

          resolve({
            url: result!.secure_url,
            publicId: result!.public_id
          });
        }
      ).end(file.buffer);
    });
  }

  static async delete(publicId: string) {
    return cloudinary.uploader.destroy(publicId);
  }

  static async replace(publicId: string, file: Express.Multer.File) {
    await cloudinary.uploader.destroy(publicId);

    return this.upload(file);
  }
}