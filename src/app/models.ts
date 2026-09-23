export interface Discovery { id: string; title: string; description: string; image: string; date: string; center: string; }
export interface Entry { id: string; title: string; body: string; discoveryId: string; discoveryTitle: string; createdAt: string; }
export interface NasaResponse { collection: { items: {data?: {nasa_id: string; title: string; description?: string; date_created: string; center?: string}[]; links?: {href: string; rel?: string}[]}[] }; }
export function mapDiscoveries(response: NasaResponse): Discovery[] {
 return response.collection.items.flatMap(item => {
  const data = item.data?.[0]; const image = item.links?.find(link => link.rel === 'preview')?.href ?? item.links?.[0]?.href;
  return data && image?.startsWith('https://') ? [{id:data.nasa_id,title:data.title,description:(data.description ?? '').replace(/<[^>]*>/g,' '),image,date:data.date_created,center:data.center ?? 'NASA'}] : [];
 });
}
