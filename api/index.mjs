import worker from '../worker/index.js';
export default async function handler(req,res){
 try{
  // Explicit query routing survives Vercel rewrites, regardless of req.url preservation.
  const input=new URL(req.url,'https://roadbook.invalid');
  const route=input.searchParams.get('_route');
  const path=route==='home'?'/':route==='roads'?'/api/roads':route==='parks'?'/api/parks':input.pathname;
  const response=await worker.fetch(new Request(new URL(path,'https://roadbook.invalid'),{method:req.method||'GET'}));
  res.status(response.status);for(const [key,value] of response.headers)res.setHeader(key,value);
  res.send(Buffer.from(await response.arrayBuffer()));
 }catch{res.status(502).json({error:'Source unavailable'})}
}
