import http from 'node:http';
import {execFileSync} from 'node:child_process';
execFileSync('node',['scripts/build.mjs'],{stdio:'inherit'});
const worker=(await import('../worker/index.js')).default;
http.createServer(async(req,res)=>{try{const r=await worker.fetch(new Request('http://localhost:3000'+req.url));res.writeHead(r.status,Object.fromEntries(r.headers));res.end(Buffer.from(await r.arrayBuffer()))}catch{res.writeHead(500);res.end('Unable to serve request')}}).listen(3000,'0.0.0.0',()=>console.log('Local: http://localhost:3000'));
