const parkSources=[
{name:'Banff National Park',url:'https://parks.canada.ca/pn-np/ab/banff/bulletins'},
{name:'Jasper National Park',url:'https://parks.canada.ca/pn-np/ab/jasper/bulletins'},
{name:'Glacier National Park',url:'https://parks.canada.ca/pn-np/bc/glacier/bulletins'},
{name:'Mount Revelstoke National Park',url:'https://parks.canada.ca/pn-np/bc/revelstoke/bulletins'},
{name:'Manning / BC Parks',url:'https://bcparks.ca/ec-manning-park/'},
{name:'BC Parks · Sea to Sky',url:'https://bcparks.ca/shannon-falls-park/'}
];
const strip=s=>s.replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&#39;|&apos;/g,"'").replace(/&quot;/g,'"').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
export function extractNotices(html,base){
 const out=[],seen=new Set();
 for(const m of html.matchAll(/<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)){
  let url;try{url=new URL(m[1],base)}catch{continue}
  if(url.protocol!=='https:'||url.hostname!==new URL(base).hostname)continue;
  const title=strip(m[2]);
  if(title.length<12||title.length>240||seen.has(url.href))continue;
  if(!/bulletins?\/.+|avis|advisories|closures|conditions|alerts/i.test(url.pathname))continue;
  if(/privacy|contact|terms|accessib|français/i.test(title))continue;
  seen.add(url.href);out.push({title,url:url.href});if(out.length===8)break;
 }return out;
}
const cache=new Map();
async function cached(key,fn){const old=cache.get(key);if(old&&Date.now()-old.time<600000)return old.value;const value=await fn();cache.set(key,{time:Date.now(),value});return value}
async function remote(url){const r=await fetch(url,{headers:{Accept:'application/json,text/html;q=0.9','User-Agent':'CanadaRoadbook/1.0 (personal trip conditions reader)'},signal:AbortSignal.timeout(12000)});if(!r.ok)throw Error('HTTP '+r.status);return r}
function point(geometry){if(!geometry)return null;const c=geometry.coordinates;if(geometry.type==='Point')return[c[1],c[0]];if(geometry.type==='LineString'&&c.length)return[c[Math.floor(c.length/2)][1],c[Math.floor(c.length/2)][0]];return null}
export async function api(path){
 if(path==='/api/roads')return cached('roads',async()=>{try{const r=await remote('https://api.open511.gov.bc.ca/events?status=ACTIVE&limit=500');const data=await r.json();if(!Array.isArray(data.events))throw Error('Unexpected feed');return{ok:true,source:'DriveBC Open511',fetchedAt:new Date().toISOString(),truncated:!!data.pagination?.next_url,events:data.events.filter(e=>e.status==='ACTIVE').map(e=>({id:e.id,type:e.event_type,severity:e.severity,description:e.description,road:(e.roads||[]).map(x=>x.name).join(', '),point:point(e.geography),updated:e.updated}))}}catch{return{ok:false,source:'DriveBC Open511',fetchedAt:new Date().toISOString(),events:[]}}});
 if(path==='/api/parks')return cached('parks',async()=>({sources:await Promise.all(parkSources.map(async p=>{try{const r=await remote(p.url);const text=await r.text();return{...p,ok:true,notices:extractNotices(text,p.url),fetchedAt:new Date().toISOString()}}catch{return{...p,ok:false,notices:[],fetchedAt:new Date().toISOString()}}}))}));
 return null;
}
