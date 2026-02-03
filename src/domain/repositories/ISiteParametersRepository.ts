import { SiteParameters } from '../entities/SiteParameters';

export interface ISiteParametersRepository {
  getParameters(): Promise<SiteParameters | null>;
  update(parameters: SiteParameters): Promise<SiteParameters>;
}