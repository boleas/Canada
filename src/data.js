const stays = [
{city:'Vancouver',start:6,end:9,hotel:'Hotel Belmont Vancouver MGallery',address:'654 Nelson Street',lat:49.279022,lng:-123.12305,phone:'+16046054333',checkin:'15:00',note:'Arrive YVR 19:50 · Thrifty pickup 20:50',road:'City roads',km:0,hours:'Arrival',via:[]},
{city:'Penticton',start:9,end:10,hotel:'Sandman Hotel Penticton',address:'939 Burnaby Avenue W',lat:49.49766,lng:-119.60887,phone:'+12504937151',checkin:'16:00',note:'Contact the hotel ahead of arrival for check-in instructions.',road:'Hwy 1 · 3 · 3A',km:429,hours:'5–6 h',via:[[49.38,-121.44],[49.064,-120.787],[49.459,-120.507],[49.205,-119.829]]},
{city:'Revelstoke',start:10,end:11,hotel:'The Sutton Place Hotel',address:'2950 Camozzi Road',lat:50.95855,lng:-118.16461,phone:'+12508145000',checkin:'16:00',note:'Resort operations are seasonal; verify before heading uphill.',road:'Hwy 97 · 97A · 1',km:260,hours:'3.5–4.5 h',via:[[49.89,-119.49],[50.26,-119.27],[50.84,-118.98]]},
{city:'Banff',start:11,end:13,hotel:'Banff Caribou Lodge and Spa',address:'521 Banff Avenue',lat:51.18418,lng:-115.56046,phone:'+14037625887',checkin:'16:00',note:'Agency route: remain on Hwy 1 through Glacier National Park and Rogers Pass. Check the local time difference for your travel date.',road:'Hwy 1 · Rogers Pass',km:294,hours:'4–5 h',via:[[51.30,-117.52],[51.30,-116.97],[51.44,-116.19]]},
{city:'Jasper',start:13,end:15,hotel:'Lobstick Lodge',address:'94 Geikie Street',lat:52.88648,lng:-118.08012,phone:'+17808524431',checkin:'16:00',note:'Icefields Parkway: check closures first. Fuel up in Lake Louise; services and cell coverage are limited.',road:'Hwy 1 · 93N',km:290,hours:'4–5 h',via:[[51.425,-116.18],[51.674,-116.465],[52.224,-117.228],[52.79,-117.99]]},
{city:'100 Mile House',start:15,end:16,hotel:'Super 8 by Wyndham',address:'989 Alder Avenue',lat:51.629406,lng:-121.30034,phone:'+12503958888',checkin:'15:00',note:'Longest driving day. Leave early; breakfast is included here. Cross from Alberta to British Columbia; confirm local hotel time.',road:'Hwy 16 · 5 · 24 · 97',km:451,hours:'6–7 h',via:[[52.966,-119.42],[52.829,-119.266],[51.65,-120.035],[51.422,-120.203],[51.558,-121.215]]},
{city:'Whistler',start:16,end:18,hotel:'Pinnacle Hotel Whistler Village',address:'4319 Main Street',lat:50.11743,lng:-122.9573,phone:'+16049383218',checkin:'16:00',note:'Hwy 99 via Lillooet has steep, winding sections. Check winter conditions before departure.',road:'Hwy 97 · 99',km:306,hours:'4.5–5.5 h',via:[[51.09,-121.585],[50.886,-121.405],[50.686,-121.936],[50.383,-122.461],[50.32,-122.80]]},
{city:'Vancouver',start:18,end:19,hotel:'Hotel Belmont Vancouver MGallery',address:'654 Nelson Street',lat:49.279022,lng:-123.12305,phone:'+16046054333',checkin:'15:00',note:'19 Nov: return car at YVR 19:55 · flight departs 21:55. Confirm airline check-in cutoff; this leaves only 2 hours.',road:'Hwy 99 · Sea to Sky',km:125,hours:'2–2.5 h',via:[[49.70,-123.15],[49.50,-123.24],[49.314,-123.138],[49.304,-123.137]]}
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

const agencyLegs=[
 {source:'Flight and car vouchers',corridor:'YVR → Vancouver hotel',agencyTime:'Arrival flight 19:50; car pickup 20:50',driveMax:90,breaks:0,buffer:60,target:'23:00',zone:'America/Vancouver',checkout:'11:00',deadline:'00:00',sourceDay:1},
 {source:'Contract · Day 3',corridor:'Hwy 1 → Hope → Hwy 3 → Manning Park → Princeton → Keremeos → Hwy 3A → Penticton',agencyTime:'429 km; about 2h30 to Manning plus a little over 2h onward, without visits',driveMax:360,breaks:45,buffer:60,target:'16:00',zone:'America/Vancouver',checkout:'11:00',deadline:'00:00',sourceDay:3},
 {source:'Contract · Day 4',corridor:'Hwy 97 → Kelowna → Vernon → Hwy 97A / Sicamous → Hwy 1 → Revelstoke',agencyTime:'About 2h from Vernon to Revelstoke; no total leg time supplied',driveMax:270,breaks:45,buffer:60,target:'16:00',zone:'America/Vancouver',checkout:'11:00',deadline:null,sourceDay:4},
 {source:'Contract · Day 5',corridor:'Hwy 1 → Glacier National Park → Rogers Pass → Golden → Lake Louise area → Banff',agencyTime:'294 km; about 3h30 without stops',driveMax:300,breaks:45,buffer:60,target:'16:00',zone:'America/Edmonton',checkout:'11:00',deadline:null,sourceDay:5},
 {source:'Contract · Day 7',corridor:'Hwy 1 → Lake Louise → Hwy 93N / Icefields Parkway → Columbia Icefields → Jasper',agencyTime:'About 187 km / 2h30 to Columbia Icefields; no full-leg time supplied',driveMax:300,breaks:45,buffer:60,target:'16:00',zone:'America/Edmonton',checkout:'11:00',deadline:'00:00',sourceDay:7},
 {source:'Contract · Day 9',corridor:'Hwy 16 → Tête Jaune Cache → Hwy 5 → Clearwater → Little Fort → Hwy 24 → 100 Mile House',agencyTime:'451 km; about 5h without stops; agency explicitly recommends an early start',driveMax:420,breaks:45,buffer:60,target:'16:00',zone:'America/Vancouver',checkout:'11:00',deadline:null,sourceDay:9},
 {source:'Contract · Day 10',corridor:'Hwy 97 / Cariboo → Clinton → Hwy 99 → Lillooet → Duffey Lake Road → Pemberton → Whistler',agencyTime:'306 km; a little over 4h without stops',driveMax:330,breaks:45,buffer:60,target:'16:00',zone:'America/Vancouver',checkout:'10:00',deadline:null,sourceDay:10},
 {source:'Contract · Day 12',corridor:'Hwy 99 / Sea to Sky → Squamish → Lions Gate Bridge → Stanley Park → Vancouver',agencyTime:'No distance or driving duration supplied; Lions Gate / Stanley Park entrance is suggested',driveMax:150,breaks:30,buffer:60,target:'15:00',zone:'America/Vancouver',checkout:'11:00',deadline:'00:00',sourceDay:12}
];

agencyLegs[2].connectorNote='The agency names Hwy 97, Kelowna and Vernon, then Revelstoke. Hwy 97A / Sicamous / Hwy 1 is the app’s connecting interpretation, not an agency-provided turn-by-turn route.';
agencyLegs[5].connectorNote='The agency specifies Hwy 16 → Hwy 5 → Clearwater → 100 Mile House. Little Fort / Hwy 24 / Lone Butte supplies the connecting road not explicitly numbered in the contract.';
agencyLegs[7].connectorNote='The agency suggests Lions Gate Bridge / Stanley Park as an entrance; the app now includes that option as the planned corridor.';

const tripHighlights=[
 {pick:'Stanley Park waterfront in a dry window; Granville Island for a relaxed food stop.',rain:'Choose the public market or a museum when rain or wind makes the waterfront unpleasant.',skip:'Use the 7th and 8th for Vancouver. Arrival night is just pickup, hotel and rest.'},
 {pick:'A brief Okanagan Lake waterfront stop after reaching Penticton.',rain:'Take a warm lunch break in Hope or Princeton and keep the drive simple.',skip:'No added hikes or winery detours on the transfer. Manning is a corridor waypoint, not a promise of safe trail access.'},
 {pick:'One short Kelowna waterfront break, using the optional-stop allowance.',rain:'Warm café break in Kelowna; save sightseeing time for arrival.',skip:'Avoid southbound Okanagan Falls detours before the northbound drive.'},
 {pick:'A short Rogers Pass stop only if its parking/access is open and safe.',rain:'A warm break in Golden; enjoy the mountain views from the main road.',skip:'Skip mountain-top roads and long walks on the transfer. Use 12 Nov for Banff town and a short open viewpoint.'},
 {pick:'One short Bow Lake or Columbia Icefields-area viewpoint, only within the optional allowance and with open access.',rain:'Fuel and a warm break at Lake Louise; continue toward Jasper if conditions allow.',skip:'No glacier tours or long hikes assumed. Use 14 Nov for Jasper town and a short, officially open local visit.'},
 {pick:'Make the drive itself the experience: mountains and river valleys from the agency corridor.',rain:'Service stops for fuel, food and rest; no optional sightseeing on this transfer.',skip:'No Wells Gray / Helmcken Falls or Kinney Lake detours. Review this long day with the agency before travel if avoiding darkness is essential.'},
 {pick:'A short scenic pause on Duffey Lake Road only at an open designated pullout, within the stop allowance.',rain:'Warm service break in Lillooet; proceed only if road conditions permit.',skip:'No trails or lakeside detours on the transfer. Use 17 Nov for Whistler Village or the cultural centre; verify seasonal hours.'},
 {pick:'Shannon Falls only if access is open, paths are suitable and it fits the allowance; otherwise Squamish for a break.',rain:'A warm stop in Squamish, then enjoy Vancouver after checking in.',skip:'Leave Whistler by its 10:00 checkout. Reach Vancouver early; do not fill spare time with extra mountain driving.'}
];
