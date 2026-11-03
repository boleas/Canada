const stays = [
{city:'Vancouver',start:6,end:9,hotel:'Hotel Belmont Vancouver MGallery',address:'654 Nelson Street',lat:49.279022,lng:-123.12305,phone:'+16046054333',checkin:'15:00',note:'Arrive YVR 19:50 · Thrifty pickup 20:50',road:'City roads',km:0,hours:'Arrival',via:[]},
{city:'Penticton',start:9,end:10,hotel:'Sandman Hotel Penticton',address:'939 Burnaby Avenue W',lat:49.49766,lng:-119.60887,phone:'+12504937151',checkin:'16:00',note:'Contact the hotel ahead of arrival for check-in instructions.',road:'Hwy 1 · 3 · 3A',km:420,hours:'5–6 h',via:[[49.38,-121.44],[49.06,-120.79],[49.46,-120.51]]},
{city:'Revelstoke',start:10,end:11,hotel:'The Sutton Place Hotel',address:'2950 Camozzi Road',lat:50.95855,lng:-118.16461,phone:'+12508145000',checkin:'16:00',note:'Resort operations are seasonal; verify before heading uphill.',road:'Hwy 97 · 97A · 1',km:260,hours:'3.5–4.5 h',via:[[49.89,-119.49],[50.26,-119.27],[50.84,-118.98]]},
{city:'Banff',start:11,end:13,hotel:'Banff Caribou Lodge and Spa',address:'521 Banff Avenue',lat:51.18418,lng:-115.56046,phone:'+14037625887',checkin:'16:00',note:'Cross into Alberta: clocks move forward one hour.',road:'Hwy 1 · Rogers Pass',km:290,hours:'4–5 h',via:[[51.30,-117.52],[51.30,-116.97],[51.44,-116.19]]},
{city:'Jasper',start:13,end:15,hotel:'Lobstick Lodge',address:'94 Geikie Street',lat:52.88648,lng:-118.08012,phone:'+17808524431',checkin:'16:00',note:'Icefields Parkway: check closures first. Fuel up in Lake Louise; services and cell coverage are limited.',road:'Hwy 1 · 93N',km:290,hours:'4–5 h',via:[[51.43,-116.18],[51.68,-116.58],[52.22,-117.23],[52.79,-117.99]]},
{city:'100 Mile House',start:15,end:16,hotel:'Super 8 by Wyndham',address:'989 Alder Avenue',lat:51.629406,lng:-121.30034,phone:'+12503958888',checkin:'15:00',note:'Longest driving day. Leave early; breakfast is included here. Back to Pacific time.',road:'Hwy 16 · 5 · 24 · 97',km:460,hours:'6–7 h',via:[[52.88,-119.30],[52.13,-119.29],[51.65,-120.04],[51.55,-120.75]]},
{city:'Whistler',start:16,end:18,hotel:'Pinnacle Hotel Whistler Village',address:'4319 Main Street',lat:50.11743,lng:-122.9573,phone:'+16049383218',checkin:'16:00',note:'Hwy 99 via Lillooet has steep, winding sections. Check winter conditions before departure.',road:'Hwy 97 · 99',km:300,hours:'4.5–5.5 h',via:[[50.81,-121.32],[50.69,-121.94],[50.32,-122.80]]},
{city:'Vancouver',start:18,end:19,hotel:'Hotel Belmont Vancouver MGallery',address:'654 Nelson Street',lat:49.279022,lng:-123.12305,phone:'+16046054333',checkin:'15:00',note:'19 Nov: return car at YVR 19:55 · flight departs 21:55. Confirm airline check-in cutoff; this leaves only 2 hours.',road:'Hwy 99 · Sea to Sky',km:125,hours:'2–2.5 h',via:[[49.70,-123.15],[49.50,-123.24]]}
];
// Suggested visits, never claims of current opening or trail safety.
const spots=[
[0,'Stanley Park seawall','Fresh air',49.302,-123.143,45,'outdoor','Choose a short waterfront section if wind and rain allow.'],
[0,'Granville Island Public Market','Rain plan',49.272,-123.135,60,'indoor','Covered food stop. Check market hours.'],
[0,'Museum of Anthropology','Culture',49.269,-123.259,90,'indoor','A good wet-weather visit; verify tickets and opening hours.'],
[1,'Hope','Coffee + fuel',49.38,-121.44,25,'service','Break before Hwy 3 and mountain driving.'],
[1,'Manning Park resort area','Mountain break',49.064,-120.787,30,'outdoor','Only stop in an open, ploughed parking area. Skip trails in snow.'],
[1,'Okanagan Lake waterfront','Lakeside',49.504,-119.599,30,'outdoor','Short walk close to Penticton; easy to shorten in rain.'],
[2,'Kelowna waterfront','Stretch your legs',49.89,-119.497,30,'outdoor','A convenient break on the northbound drive.'],
[2,'Sicamous','Coffee + fuel',50.836,-118.981,25,'service','Refuel and take a break before Revelstoke.'],
[2,'Revelstoke Railway Museum','Rain plan',51.004,-118.196,60,'indoor','Seasonal hours: confirm before visiting.'],
[3,'Rogers Pass Discovery Centre','Mountain stop',51.303,-117.518,35,'indoor','Check Parks Canada hours and safe highway access first.'],
[3,'Golden','Coffee + fuel',51.299,-116.969,30,'service','Useful service stop before the final mountain leg.'],
[3,'Bow Falls viewpoint','Short stop',51.166,-115.561,25,'outdoor','Use designated access only; paths can be icy.'],
[3,'Cave and Basin','Culture',51.17,-115.591,60,'indoor','Check seasonal hours and admission.'],
[4,'Lake Louise village','Fuel + supplies',51.425,-116.18,25,'service','Fill up before Hwy 93N. Do not rely on seasonal Parkway services.'],
[4,'Bow Lake roadside viewpoint','Scenic stop',51.674,-116.465,15,'outdoor','Only if the pullout is open and safe; no lake-ice access.'],
[4,'Athabasca Falls','Short stop',52.664,-117.883,30,'outdoor','Check park access and trail conditions. Icy stairs are a reason to skip.'],
[4,'Jasper town centre','Easy afternoon',52.873,-118.082,45,'indoor','Cafés and services; verify individual business operations.'],
[5,'Valemount','Coffee + fuel',52.829,-119.266,30,'service','Break the long drive early.'],
[5,'Clearwater','Lunch + fuel',51.65,-120.035,45,'service','A practical break before Hwy 24.'],
[6,'Lillooet','Lunch + fuel',50.686,-121.936,40,'service','Check Hwy 99 before continuing toward Pemberton.'],
[6,'Squamish Lil’wat Cultural Centre','Rain plan',50.121,-122.946,75,'indoor','Check admission and opening days.'],
[6,'Whistler Village','Easy walk',50.117,-122.956,40,'outdoor','Stay in the village if alpine operations are closed.'],
[7,'Shannon Falls','Short stop',49.665,-123.162,30,'outdoor','Check BC Parks notices and icy paths first.'],
[7,'Squamish','Coffee + fuel',49.701,-123.15,30,'service','Easy final road-trip break on the Sea to Sky.' ]
].map((a,i)=>({id:i,leg:a[0],name:a[1],tag:a[2],lat:a[3],lng:a[4],minutes:a[5],type:a[6],note:a[7]}));
