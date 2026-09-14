import http from 'node:http';import fs from 'node:fs';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');const manifest=JSON.parse(fs.readFileSync(path.join(root,'downloads.json'),'utf8'));
const publicRoot=path.join(root,'public'),releaseRoot=path.join(root,'release-assets');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.txt':'text/plain; charset=utf-8','.apk':'application/vnd.android.package-archive','.zip':'application/zip'};
const server=http.createServer((req,res)=>{
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
 const download=pathname.startsWith('/downloads/');const dir=download?releaseRoot:publicRoot;
 const relative=download?pathname.slice(11):(pathname==='/'?'index.html':pathname.slice(1));const target=path.resolve(dir,relative);
 if(!target.startsWith(dir+path.sep)){res.writeHead(403).end();return;}
 if(!fs.existsSync(target)||!fs.statSync(target).isFile()){res.writeHead(404,{'Content-Type':'text/plain'}).end('File not found');return;}
 const headers={'Content-Type':mime[path.extname(target)]||'application/octet-stream'};
 if(download){headers['Content-Disposition']=`attachment; filename="${path.basename(target)}"`;headers['Content-Length']=fs.statSync(target).size;}
 res.writeHead(200,headers);if(req.method==='HEAD'){res.end();return;}
 if(path.extname(target)==='.html')res.end(fs.readFileSync(target,'utf8').replaceAll('__RELEASE_BASE__','/downloads/').replaceAll('__REPOSITORY_URL__','/downloads/KenMirrorScreen-Source-0.4.3.zip').replaceAll('__APK_SIZE__',manifest.android.sizeLabel).replaceAll('__WIN_SIZE__',manifest.windows.sizeLabel));else fs.createReadStream(target).pipe(res);
});server.listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log('Preview at http://127.0.0.1:'+server.address().port));
