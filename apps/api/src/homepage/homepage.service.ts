import {
  BadGatewayException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';

const sectionPopulates: Record<string, string[]> = {
  'sections.hero': ['benefits', 'gallery', 'review'],
  'sections.benefits': ['items', 'image'],
  'sections.story': ['image'],
  'sections.comfort': ['cards'],
  'sections.testimonials': ['gallery', 'reviews'],
  'sections.faq': ['image', 'items'],
  'sections.impact': ['metrics'],
  'sections.closing-cta': ['gallery'],
};

@Injectable()
export class HomepageService {
  async getHomepage(): Promise<unknown> {
    const cmsUrl = process.env.STRAPI_URL ?? 'http://localhost:1337';
    const url = new URL('/api/homepage', cmsUrl);
    const headers = new Headers({ Accept: 'application/json' });
    const token = process.env.STRAPI_API_TOKEN;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    url.searchParams.set('populate[pressLogos][populate][logo]', '*');

    for (const [component, fields] of Object.entries(sectionPopulates)) {
      for (const field of fields) {
        url.searchParams.set(
          `populate[sections][on][${component}][populate][${field}]`,
          '*',
        );
      }
    }

    let response: Response;
    try {
      response = await fetch(url, {
        headers,
        signal: AbortSignal.timeout(8000),
      });
    } catch {
      throw new ServiceUnavailableException(
        'The content service is unavailable.',
      );
    }

    if (!response.ok) {
      throw new BadGatewayException(
        `The content service returned status ${response.status}.`,
      );
    }

    try {
      return await response.json();
    } catch {
      throw new BadGatewayException(
        'The content service returned invalid JSON.',
      );
    }
  }
}
