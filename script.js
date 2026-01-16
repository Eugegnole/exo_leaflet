// Configuration carte
var map = L.map('map', {
center: [48.11, -1.66],
zoom: 13});



// FONDS DE CARTES
var baselayers = {
Stadia: L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 10,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; Master SIGAT',
	ext: 'png'}),
  
Carto: L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  minZoom: 10,
	maxZoom: 20}),
  
IGN: L.tileLayer('https://data.geopf.fr/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
	attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
	bounds: [[-75, -180], [81, 180]],
	minZoom: 10,
	maxZoom: 20,
	format: 'image/png',
	style: 'normal'
}),

 RennesMétropole: L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?',
                                 {layers: 'raster:ortho2021',
                                  attribution: '&copy; Rennes métropole',
                                 	minZoom: 11,
                                  maxZoom: 20})
};baselayers.Stadia.addTo(map);



// AUTRES COUCHES GEO
var cartographie = {
trafic: L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?',
                                 {layers: 'trp_rout:v_rva_trafic_fcd',
                                  attribution: '&copy; Rennes métropole',
                                  format:'image/png',
                                  transparent:true,
                                 	minZoom: 11,
                                  maxZoom: 20}),

cadastre: L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?',
                                 {layers: 'ref_cad:parcelle',
                                  attribution: '&copy; Rennes métropole',
                                  format:'image/png',
                                  transparent:true,
                                 	minZoom: 11,
                                  maxZoom: 20}),

batiments: L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?',
                                 {layers: 'ref_cad:batiment',
                                  attribution: '&copy; Rennes métropole',
                                  format:'image/png',
                                  transparent:true,
                                 	minZoom: 11,
                                  maxZoom: 20}),
  
espaces_canins: L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?',
                                 {layers: 'espub_mob:mobilier_urbain',
                                  attribution: '&copy; Rennes métropole',
                                  styles: 'espub_mob:mobilier_urbain_type_canisite',
                                  format:'image/png',
                                  transparent:true,
                                 	minZoom: 11,
                                  maxZoom: 20})};





// OUTILS DE LA CARTE

// Contrôleur de couche
L.control.layers(baselayers, cartographie, {position: 'topleft', collapsed : false}).addTo(map);

// Echelle cartographique
L.control.scale().addTo(map);



// COUCHES DE DONNÉES
// Ajout des Stations de vélos
var url = 'https://raw.githubusercontent.com/mastersigat/data/main/velostar.geojson';
$.getJSON(url, function (geojson) {
  var velos = L.geoJson(geojson,{
    
    // Transformer les marqueurs en point
    pointToLayer: function (geoJsonPoint, latlng) {
      return L.circleMarker(latlng);
    },
    
    // Modifier la symbologie des points
    style: function (geoJsonFeature) {
      return {
        fillColor: '#922D50',
        radius: 6,
        fillOpacity: 0.7,
        stroke: false};
    },
  }).addTo(map);
  
  // Ajout Popup
  velos.bindPopup(function(velos) {console.log(velos.feature.properties);
                                   return "<h2> Station : "+velos.feature.properties.nom+"<h2>"+"<hr><h3>" + velos.feature.properties.nombreemplacementstheorique+ "&nbsp; vélos</h3>" ;});
});