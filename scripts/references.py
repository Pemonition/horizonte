import json, urllib.request, urllib.parse, concurrent.futures
from pathlib import Path

root = Path(__file__).resolve().parents[1] / 'docs' / 'referencias'
queries = [('conceito','earthrise'),('conceito','astronaut spacewalk'),('conceito','voyager'),('conceito','mars horizon'),('cor','saturn rings'),('cor','orion nebula'),('cor','earth night'),('textura','moon surface'),('textura','mars dunes'),('textura','solar panel')]
def fetch(pair):
    group, query = pair
    url = 'https://images-api.nasa.gov/search?' + urllib.parse.urlencode({'q':query,'media_type':'image','page_size':1})
    with urllib.request.urlopen(url, timeout=40) as r: item=json.load(r)['collection']['items'][0]
    data=item['data'][0]; image=item['links'][0]['href']; filename=query.replace(' ','-')+'.jpg'
    urllib.request.urlretrieve(image, root/filename)
    return {'group':group,'label':query,'file':filename,'title':data['title'],'source':'https://images.nasa.gov/details/'+urllib.parse.quote(data['nasa_id']),'image':image,'credit':data.get('photographer',data.get('center','NASA'))}
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
    refs=list(pool.map(fetch,queries))
(root/'sources.json').write_text(json.dumps(refs,indent=2),encoding='utf-8')
urllib.request.urlretrieve('https://public-website-assets.paramountpictures.com/paramount2025/s3fs-public/styles/poster_medium/public/intersteller_en_dvd_800x1200.jpg?itok=YxrRaJN2',root/'poster.jpg')
print('Saved 10 NASA references and source poster.')
