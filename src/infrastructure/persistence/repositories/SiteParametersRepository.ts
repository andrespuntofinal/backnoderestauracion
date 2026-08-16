import { ISiteParametersRepository } from '../../../domain/repositories/ISiteParametersRepository';
import { SiteParameters } from '../../../domain/entities/SiteParameters';
import { SiteParametersModel } from '../models/SiteParametersModel';

export class SiteParametersRepository implements ISiteParametersRepository {
  async getParameters(): Promise<SiteParameters | null> {
    const doc = await SiteParametersModel.findOne();
    if (!doc) return null;
    return new SiteParameters({
      id: doc._id.toString(),
      heroImages: doc.heroImages,
      aboutUs: doc.aboutUs,
      mission: doc.mission,
      vision: doc.vision,
      events: doc.events,
      contact: doc.contact,
      theme: doc.theme,
      updatedAt: doc.updatedAt,
    });
  }

  async update(parameters: SiteParameters): Promise<SiteParameters> {
    let doc = await SiteParametersModel.findOne();
    if (!doc) {
      doc = new SiteParametersModel({
        heroImages: parameters.heroImages,
        aboutUs: parameters.aboutUs,
        mission: parameters.mission,
        vision: parameters.vision,
        events: parameters.events,
        contact: parameters.contact,
        theme: parameters.theme,
      });
    } else {
      doc.heroImages = parameters.heroImages;
      doc.aboutUs = parameters.aboutUs;
      doc.mission = parameters.mission;
      doc.vision = parameters.vision;
      doc.events = parameters.events;
      doc.contact = parameters.contact;
      if (parameters.theme) {
        doc.theme = parameters.theme;
      }
      doc.updatedAt = new Date();
    }
    await doc.save();

    return new SiteParameters({
      id: doc._id.toString(),
      heroImages: doc.heroImages,
      aboutUs: doc.aboutUs,
      mission: doc.mission,
      vision: doc.vision,
      events: doc.events,
      contact: doc.contact,
      theme: doc.theme,
      updatedAt: doc.updatedAt,
    });
  }
}
