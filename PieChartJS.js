var data = [{
    values: [19, 26, 55],
    labels: ['Residential', 'Non-Residential', 'Utility'],
    pull: [0, 0, 0],
    type: 'pie',
    automargin: true
  }];
  
  var layout = {
    height: "100%",
    width: "100%"
  };
  
  var plot = document.getElementById('plot')
  Plotly.newPlot(plot, data, layout);
  
  window.tween = null;
  
  function tween_function(d, from=0, to=0.5) {
    var tweenValue = {pull: from}
    window.tween = new TWEEN.Tween(tweenValue, false)
    .to({pull: to}, 300)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      var pull = [0,0,0]
      pull[d.pointNumber] = tweenValue.pull
      d.data.pull = pull
      Plotly.restyle(plot, {
        marker: {
          pull: pull
        }
      });
    }).start()
    // Setup the animation loop.
    function animate(time) {
      tween.update(time)
      requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }
  
  plot.on('plotly_hover', function(data){
    //if (tween && tween.isPlaying()) return
    var d = data.points[0]
    tween_function(d)
  });
  
  plot.on('plotly_unhover', function(data) {
    if (tween && tween.isPlaying()) return
    var d = data.points[0]
    tween_function(d, 0.5, 0)
  })