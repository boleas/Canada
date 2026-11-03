// Navigation apps calculate routes from the driver's current position.
function navigationURL(lat,lng){
 if(!Number.isFinite(lat)||!Number.isFinite(lng)||Math.abs(lat)>90||Math.abs(lng)>180)throw new Error('Invalid destination');
 return 'https://www.google.com/maps/dir/?'+new URLSearchParams({api:'1',destination:`${lat},${lng}`,travelmode:'driving'});
}
const waypointNames=[[],['Hope · Hwy 1 → 3','Manning Park area · Hwy 3','Princeton · Hwy 3','Keremeos · Hwy 3 → 3A'],['Kelowna · Hwy 97','Vernon · Hwy 97','Sicamous · Hwy 1'],['Rogers Pass · Hwy 1','Golden · Hwy 1','Lake Louise area · Hwy 1'],['Lake Louise village · Hwy 1 → 93N','Bow Lake area · Hwy 93N','Columbia Icefields area · Hwy 93N','Athabasca Valley · Hwy 93N'],['Tête Jaune Cache · Hwy 16 → 5','Valemount · Hwy 5','Clearwater · Hwy 5','Little Fort · Hwy 5 → 24','Lone Butte · Hwy 24'],['Clinton · Hwy 97','Hwy 97 / 99 junction','Lillooet · Hwy 99','Duffey Lake Road · Hwy 99','Pemberton · Hwy 99'],['Squamish · Hwy 99','Sea to Sky corridor · Hwy 99','Lions Gate Bridge','Stanley Park causeway']];
function drivingStages(stay,index){return [...stay.via.map((p,i)=>({name:waypointNames[index]?.[i]||`Waypoint ${i+1}`,lat:p[0],lng:p[1]})),{name:stay.hotel,lat:stay.lat,lng:stay.lng}];}

function localParts(date,zone){return Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date).filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));}
function localInstant(day,time,zone){const [h,m]=time.split(':').map(Number);const wanted=Date.UTC(2026,10,day,h,m);let instant=wanted;for(let i=0;i<4;i++){const p=localParts(new Date(instant),zone);const represented=Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute);instant+=wanted-represented;}return instant;}
function arrivalPlan(index){
 if(index===0)return null;
 const stay=stays[index],leg=agencyLegs[index],origin=agencyLegs[index-1],from=stays[index-1];
 const points=[[from.lat,from.lng],...stay.via,[stay.lat,stay.lng]];
 const rises=points.map(([lat,lng])=>solarEvent(stay.start,lat,lng,true,leg.zone));
 const sets=points.map(([lat,lng])=>solarEvent(stay.start,lat,lng,false,leg.zone));
 const daylightStart=Math.max(...rises)+15*60000,daylightEnd=Math.min(...sets)-45*60000;
 const parkingMinutes=20,baseBudget=leg.driveMax+leg.breaks+leg.buffer+parkingMinutes;
 const target=Math.min(daylightEnd,Math.max(localInstant(stay.start,leg.target,leg.zone),daylightStart+baseBudget*60000));
 const checkout=localInstant(stay.start,origin.checkout,origin.zone);
 const latestStart=Math.min(target-baseBudget*60000,checkout);
 const fits=latestStart>=daylightStart;
 const preferred=localInstant(stay.start,index===7?'10:00':'09:00',origin.zone);
 const depart=fits?Math.max(daylightStart,Math.min(preferred,latestStart)):daylightStart;
 const optional=fits?Math.max(0,Math.min(20,Math.floor((target-depart)/60000)-baseBudget)):0;
 const budget=baseBudget+optional,arrival=depart+budget*60000;
 return{departure:localClock(depart,origin.zone),arrival:localClock(arrival,leg.zone),budget,drive:leg.driveMax,breaks:leg.breaks,buffer:leg.buffer,parkingMinutes,optionalMinutes:optional,originZone:origin.zone,destinationZone:leg.zone,departTimestamp:depart,arrivalTimestamp:arrival,targetTimestamp:target,daylightStart,daylightEnd,daylightStartClock:localClock(daylightStart,origin.zone),daylightEndClock:localClock(daylightEnd,leg.zone),latestDeparture:fits?localClock(latestStart,origin.zone):null,fitsDaylight:fits,tightWindow:fits&&latestStart-daylightStart<30*60000,maxDriveMinutes:Math.max(0,Math.floor((daylightEnd-daylightStart)/60000)-leg.breaks-leg.buffer-parkingMinutes)};
}
function timeBudget(minutes){return `${Math.floor(minutes/60)}h${minutes%60?String(minutes%60).padStart(2,'0'):''}`;}
// Standard sunrise/sunset approximation (solar centre at -0.833 degrees).
// Mountain shadows and poor visibility can shorten useful daylight further.
function solarEvent(day,lat,lng,rising,zone){
 const rad=Math.PI/180,deg=180/Math.PI,N=Math.floor((Date.UTC(2026,10,day)-Date.UTC(2026,0,0))/86400000),lh=lng/15;
 const t=N+((rising?6:18)-lh)/24,M=.9856*t-3.289;
 let L=(M+1.916*Math.sin(M*rad)+.020*Math.sin(2*M*rad)+282.634)%360;if(L<0)L+=360;
 let RA=(Math.atan(.91764*Math.tan(L*rad))*deg+360)%360;RA+=(Math.floor(L/90)*90-Math.floor(RA/90)*90);RA/=15;
 const sinDec=.39782*Math.sin(L*rad),cosDec=Math.cos(Math.asin(sinDec));
 const cosH=(Math.cos(90.833*rad)-sinDec*Math.sin(lat*rad))/(cosDec*Math.cos(lat*rad));if(Math.abs(cosH)>1)return null;
 const H=(rising?360-Math.acos(cosH)*deg:Math.acos(cosH)*deg)/15;
 const hour=((H+RA-.06571*t-6.622-lh)%24+24)%24;
 let stamp=Date.UTC(2026,10,day)+hour*3600000;
 for(let n=0;n<3;n++){const p=localParts(new Date(stamp),zone);const actual=Date.UTC(+p.year,+p.month-1,+p.day),wanted=Date.UTC(2026,10,day);if(actual===wanted)break;stamp+=wanted-actual;}
 return Math.round(stamp/60000)*60000;
}
function localClock(stamp,zone){const p=localParts(new Date(stamp),zone);return `${p.hour}:${p.minute}`;}
