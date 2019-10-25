window.Apex = {
  chart: {
    foreColor: '#fff',
    toolbar: {
      show: false
    },
  },
  colors: ['#FCCF31', '#17ead9', '#f02fc2'],
  stroke: {
    width: 3
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    borderColor: "#40475D",
  },
  xaxis: {
    axisTicks: {
      color: '#333'
    },
    axisBorder: {
      color: "#333"
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      gradientToColors: ['#F55555', '#6078ea', '#6094ea']
    },
  },
  tooltip: {
    theme: 'dark',
    x: {
      formatter: function (val) {
        return moment(new Date(val)).format("HH:mm:ss")
      }
    }
  },
  yaxis: {
    decimalsInFloat: 2,
    opposite: true,
    labels: {
      offsetX: -10
    }
  }
};

var trigoStrength = 3
var iteration = 11

function getRandom() {
  var i = iteration;
  return (Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2)
}

function getRangeRandom(yrange) {
  return Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
}

function generateMinuteWiseTimeSeries(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y = ((Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2))

    series.push([x, y]);
    baseval += 300000;
    i++;
  }
  return series;
}



function getNewData(baseval, yrange) {
  var newTime = baseval + 300000;
  return {
    x: newTime,
    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
  }
}

var optionsColumn = {
  chart: {
    height: 350,
    type: 'bar',
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
    // dropShadow: {
    //   enabled: true,
    //   left: -14,
    //   top: -10,
    //   opacity: 0.05
    // },
    events: {
      animationEnd: function (chartCtx) {
        const newData = chartCtx.w.config.series[0].data.slice()
        newData.shift()
        window.setTimeout(function () {
          chartCtx.updateOptions({
            series: [{
              data: newData
            }],
            xaxis: {
              min: chartCtx.minX,
              max: chartCtx.maxX
            },
            subtitle: {
              text: parseInt(getRangeRandom({min: 1, max: 20})).toString() + '%',
            }
          }, false, false)
        }, 300)
      }
    },
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 0,
  },
  series: [{
    name: 'Load Average',
    data: generateMinuteWiseTimeSeries(new Date("12/12/2016 00:20:00").getTime(), 12, {
      min: 10,
      max: 110
    })
  }],
  title: {
    text: 'Load Average',
    align: 'left',
    style: {
      fontSize: '12px'
    }
  },
  subtitle: {
    text: '20%',
    floating: true,
    align: 'right',
    offsetY: 0,
    style: {
      fontSize: '22px'
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.5,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.8,
      stops: [0, 100]
    }
  },
  xaxis: {
    type: 'datetime',
    range: 2700000
  },
  legend: {
    show: true
  },
}



// var chartColumn = new ApexCharts(
//   document.querySelector("#columnchart"),
//   optionsColumn
// );
// chartColumn.render()

var optionsLine = {
  chart: {
    //height: '800px',
    maxheight: '400px',
    width:'100%',
    type: 'line',
    stacked: true,
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
    dropShadow: {
      enabled: true,
      opacity: 0.3,
      blur: 5,
      left: -7,
      top: 22
    },
    
    events: {
      animationEnd: function (chartCtx) {
        const newData1 = chartCtx.w.config.series[0].data.slice()

        newData1.shift()
        const newData2 = chartCtx.w.config.series[1].data.slice()

        newData2.shift()
        window.setTimeout(function () {
          chartCtx.updateOptions({
            series: [{
              data: newData1
            }, {
              data: newData2
            }],
            // subtitle: {
            //   text: parseInt(getRandom() * Math.random()).toString(),
            // }
          }, false, false)
        }, 300)
      }
    }
    ,
    toolbar: {
      show: true
    },
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: true
  },
  stroke: {
    width: [5,5],
    curve: 'straight',
    dashArray: [0, 8]
  },
  grid: {
    padding: { //padding box
      left: 0,
      right: 0
    }
  },
  markers: {
    size: 6, 
    hover: {
      size: 3
    },
  },
  series: [
    {
      name: "Fallo",
      type: 'line',
      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
    },
    {
      name: 'Objetivo',
      type: 'line',
      data: [65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65]
    }
  ], tooltip: {
      x: {
      show: true,
      format: 'dd MMM',
      formatter: undefined,
      }
    },
  labels: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
    '10 Jan', '11 Jan', '12 Jan'],
  xaxis: {
    title: {
      text: 'Fecha',
      style: {
        fontSize: '20px',
      },
    },
    
    categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
      '10 Jan', '11 Jan', '12 Jan'
    ],
  },
  title: {
    text: 'General',
    align: 'center',
    style: {
      fontSize: '20px'
    }
  },
  /*
  subtitle: {
    text: '20',
    floating: true,
    align: 'right',
    offsetY: 0,
    style: {
      fontSize: '12px'
    }
  },
  */
  legend: {
    show: true,
    floating: true,
    horizontalAlign: 'left',
    onItemClick: {
      toggleDataSeries: false
    },
    position: 'top',
    offsetY: -33,
    offsetX: 60
  },
}






var chartLine = new ApexCharts(
  document.querySelector("#linechart"),
  optionsLine
);

chartLine.render()



/*EFECTO FONDO*/

/* ---- particles.js config ---- */

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 900
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.2,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": .5
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});


/* ---- stats.js config ---- */

var count_particles, stats, update;
stats = new Stats;
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
count_particles = document.querySelector('.js-count-particles');
update = function () {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);