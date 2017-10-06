var jMap = $(".map"),
  height = jMap.height(),
  width = jMap.width(),
  mapJsonUrl = 'https://ucarecdn.com/8e1027ea-dafd-4d6c-bf1e-698d305d4760/world110m2.json',
  svg = d3.select(".map").append("svg").attr("width", width).attr("height", height);

  var getProjection = function(worldJson) {
    // create a first guess for the projection
  var scale = 1,
    offset = [ width / 2, height / 2 ],
    projection = d3.geoEquirectangular().scale( scale ).rotate( [0,0] ).center([0,5]).translate( offset ),
    bounds = mercatorBounds( projection ),
    scaleExtent;
  
    scale = width / (bounds[ 1 ][ 0 ] - bounds[ 0 ][ 0 ]);
    scaleExtent = [ scale, 10 * scale ];

    projection
      .scale( scaleExtent[ 0 ] );
  
  return projection;
  },
      
  mercatorBounds = function(projection) {
    // find the top left and bottom right of current projection
    var maxlat = 83,
        yaw = projection.rotate()[ 0 ],
        xymax = projection( [ -yaw + 180 - 1e-6, -maxlat ] ),
        xymin = projection( [ -yaw - 180 + 1e-6, maxlat ] );

     return [ xymin, xymax ];
  };

  d3.json(mapJsonUrl, function (error, worldJson) {
     if (error) throw error;
    var projection = getProjection(),
        path = d3.geoPath().projection( projection );
    
    svg.selectAll( 'path.land' )
        .data( topojson.feature( worldJson, worldJson.objects.countries ).features )
        .enter().append( 'path' )
        .attr( 'class', 'land' )
        .attr( 'd', path )
        .on('click', function(d) {
          d3.select(this).classed("selected", true)
        })
        .on('mouseover', function(d) {
          d3.select(this).classed("hovered", true)
        })
        .on('mouseout', function(d) {
          d3.select(this).classed("hovered", false)
        });
  });
// zoom does not work yet :/   
var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        g.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g.selectAll("path")  
            .attr("d", path.projection(projection)); 
});

svg.call(zoom)