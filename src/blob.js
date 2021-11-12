registerPaint('blob', class  {
   static get inputProperties() {
    return [
      '--n',
      '--na',
      '--v',
      '--b',
      '--bo',
      '--t',
      '--seed'
    ]
  }
  paint(ctx, size, properties) {
    var point = [];
    const cx = size.width/2;
    const cy = size.height/2;
    const N = parseInt(properties.get('--n'));
    const Na = parseInt(properties.get('--na'));
    const T = parseInt(properties.get('--t'));
    const B = parseFloat(properties.get('--b'));
    const Bo = parseFloat(properties.get('--bo'));
    const V = parseFloat(properties.get('--v'));
    var RADIUS;
    
    switch (Na) {
        case 0: 
        case 1: 
        case 2: 
          if(V < 0)
             RADIUS = size.width/2 + V;
          else
             RADIUS = size.width/2;
          break;
        case 3: 
        case 4:
          RADIUS = size.width/2 - Math.abs(V);
          break;  
        case 5:  
        case 6:
          var r = (size.width)*Math.sin(Math.PI/(N*2));
          RADIUS = size.width/2 - r;
          break;
        default:
          RADIUS = size.width/2
    }
    
    const mask = 0xffffffff;
    const seed = parseInt(properties.get('--seed'));
    let m_w  = (123456789 + seed) & mask;
    let m_z  = (987654321 - seed) & mask;
    let random =  function() {
      m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
      m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;

      var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
      result /= 4294967296;
      return result;
    }
    
    for(var i = 0; i < N; i++) {
      var x,y;
      switch (Na) {
        case 0: /* default movement*/
          var r = RADIUS - B*(i%2);
          if(T == 1)
             r = RADIUS - B*random();
          x = Math.cos((i / N) * (2 * Math.PI)) * r + cx;
          y = Math.sin((i / N) * (2 * Math.PI)) * r + cy;
          break;
        case 1: /* x-axis to the center */
          var r = RADIUS - B*(i%2);
          if(T == 1)
             r = RADIUS - B*random();
          x = Math.cos((i / N) * (2 * Math.PI)) * r + cx;
          y = Math.sin((i / N) * (2 * Math.PI)) * RADIUS + cy;
          break;
        case 2: /* y-axis to the center */
          var r = RADIUS - B*(i%2);
          if(T == 1)
             r = RADIUS - B*random();
          x = Math.cos((i / N) * (2 * Math.PI)) * RADIUS + cx;
          y = Math.sin((i / N) * (2 * Math.PI)) * r + cy;
          break;
        case 3: /* x-axis same direction */          
          var sign = 1;
          if(i<0.75*N && i>0.25*N) 
            sign = -1; 
          var r = RADIUS - B*sign*(i%2);
          if(T == 1)
             r = RADIUS - B*sign*random();
          x = Math.cos((i / N) * (2 * Math.PI)) * r + cx;
          y = Math.sin((i / N) * (2 * Math.PI)) * RADIUS + cy;
          break;
        case 4: /* y-axis same direction */
          var sign = 1;
          if(i<0.5*N && i>0*N) 
            sign = -1; 
          var r = RADIUS - B*sign*(i%2);
          if(T == 1)
             r = RADIUS - B*sign*random();
          x = Math.cos((i / N) * (2 * Math.PI)) * RADIUS + cx;
          y = Math.sin((i / N) * (2 * Math.PI)) * r + cy;
          break;
        case 5: /* circular movement */
          var r = (size.width)*Math.sin(Math.PI/(N*2));
          var rr = r*random();
          var xx = rr*Math.cos(B * (2 * Math.PI));
          var yy = rr*Math.sin(B * (2 * Math.PI)); 
          x = Math.cos((i / N) * (2 * Math.PI)) * RADIUS + xx + cx;
          y = Math.sin((i / N) * (2 * Math.PI)) * RADIUS + yy + cy;
          break;
        case 6: /* spiral movement */
          var r = (size.width)*Math.sin(Math.PI/(N*2));
          var rr = r*random();
          var xx = rr*Math.cos(B * (2 * Math.PI));
          var yy = rr*Math.sin(B * (2 * Math.PI)); 
          var ro = RADIUS - Bo*random();
          x = Math.cos((i / N) * (2 * Math.PI)) * ro + xx + cx;
          y = Math.sin((i / N) * (2 * Math.PI)) * ro + yy + cy;
          break;
        default: /* draw a circle by default */
          var x = Math.cos((i / N) * (2 * Math.PI)) * RADIUS + cx;
          var y = Math.sin((i / N) * (2 * Math.PI)) * RADIUS + cy;
      }
      point[i] = [x,y];
    }
    
    
    ctx.beginPath();
    var xc1 = (point[0][0] + point[N - 1][0]) / 2;
    var yc1 = (point[0][1] + point[N - 1][1]) / 2;

    ctx.moveTo(xc1, yc1);
    for(var i = 0; i < N - 1; i++) {
      var xc = (point[i][0] + point[i + 1][0]) / 2;
      var yc = (point[i][1] + point[i + 1][1]) / 2;
      ctx.quadraticCurveTo(point[i][0], point[i][1], xc, yc)
    }
    ctx.quadraticCurveTo(point[N - 1][0], point[N - 1][1], xc1, yc1);
    ctx.fillStyle = '#000';
    ctx.closePath();
    ctx.fill();
    }
})
