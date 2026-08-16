import { Request, Response } from 'express';
import { Container } from '../../infrastructure';
import { SiteParameters } from '../../domain';

export class SiteParametersController {
  private container = Container.getInstance();
  private siteParamsRepository = this.container.getSiteParametersRepository();

  async getParams(req: Request, res: Response): Promise<void> {
    try {
      let params = await this.siteParamsRepository.getParameters();
      if (!params) {
        // Retornar valores por defecto si aún no existen en DB
        params = new SiteParameters({
          heroImages: [
            'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200'
          ],
          aboutUs: 'Somos una comunidad comprometida con el crecimiento espiritual y el servicio social.',
          mission: 'Nuestra misión es transformar vidas a través del amor y el servicio.',
          vision: 'Ser una comunidad referente en impacto social y espiritual para el año 2030.',
          events: [
            { id: '1', title: 'Reunión General', date: 'Todos los Domingos', imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800' }
          ],
          contact: {
            address: 'Calle Principal #123, Ciudad',
            phone: '+57 300 000 0000',
            email: 'contacto@comunidad.pro',
            facebook: 'https://facebook.com',
            instagram: 'https://instagram.com',
            youtube: 'https://youtube.com'
          },
          theme: {
            primaryColor: '#00555C',
            primaryHover: '#004247',
            secondaryColor: '#0f172a',
            accentColor: '#06b6d4',
            cardBg: '#ffffff',
            cardBorder: '#e2e8f0',
            tableHeaderBg: '#f8fafc',
            tableHeaderText: '#475569',
            sidebarBg: '#c9d1d2',
            activeNavBg: '#00555C',
            activeNavText: '#ffffff',
            sidebarHoverBg: '#b8c1c2',
            sidebarTextColor: '#1e293b',
            formHeaderBg: '#00555C',
            formLabelColor: '#475569',
            formInputText: '#000000',
            formTitleColor: '#ffffff'
          }
        });
      }

      res.json({
        success: true,
        data: params,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async updateParams(req: Request, res: Response): Promise<void> {
    try {
      const { heroImages, aboutUs, mission, vision, events, contact, theme } = req.body;

      const paramsToUpdate = new SiteParameters({
        heroImages: heroImages || [],
        aboutUs: aboutUs || '',
        mission: mission || '',
        vision: vision || '',
        events: events || [],
        contact: contact || { address: '', phone: '', email: '' },
        theme: theme,
      });

      const updated = await this.siteParamsRepository.update(paramsToUpdate);

      res.json({
        success: true,
        data: updated,
        message: 'Parámetros del sitio actualizados exitosamente',
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: any): void {
    console.error('❌ Error en SiteParametersController:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error?.message,
    });
  }
}
