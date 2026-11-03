// Navigation apps calculate routes from the driver's current position.
function navigationURL(provider,lat,lng){
 if(!Number.isFinite(lat)||!Number.isFinite(lng)||Math.abs(lat)>90||Math.abs(lng)>180)throw new Error('Invalid destination');
 if(provider==='google')return 'https://www.google.com/maps/dir/?'+new URLSearchParams({api:'1',destination:`${lat},${lng}`,travelmode:'driving'});
 return 'https://maps.apple.com/?'+new URLSearchParams({daddr:`${lat},${lng}`,dirflg:'d'});
}
const waypointNames=[[],['Hope','Manning Park area','Princeton'],['Kelowna','Vernon','Sicamous'],['Rogers Pass','Golden','Lake Louise'],['Lake Louise village','Bow Lake area','Columbia Icefield area','Athabasca Valley'],['Valemount area','Blue River area','Clearwater','Highway 24 corridor'],['Cache Creek area','Lillooet','Pemberton'],['Squamish','Sea to Sky corridor']];
function drivingStages(stay,index){return [...stay.via.map((p,i)=>({name:waypointNames[index]?.[i]||`Waypoint ${i+1}`,lat:p[0],lng:p[1]})),{name:stay.hotel,lat:stay.lat,lng:stay.lng}];}
