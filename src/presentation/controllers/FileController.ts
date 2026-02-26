import { Request, Response } from "express";
import { CloudinaryService } from "../../infrastructure/cloudinary/cloudinary.service";

export class FileController {

  async upload(req: Request, res: Response) {
    try {
      const file = req.file;
      if (!file) throw new Error("No file");

      const result = await CloudinaryService.upload(file);

      res.json({
        success: true,
        data: result
      });

    } catch (err:any) {
      res.status(500).json({
        success:false,
        error: err.message
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await CloudinaryService.delete(req.params.id);

      res.json({ success:true });

    } catch (err:any) {
      res.status(500).json({ success:false, error:err.message });
    }
  }
}