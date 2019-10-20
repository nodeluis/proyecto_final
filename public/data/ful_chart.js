function llenarchart(data,p,contenedor){
  if(p==2){
    am4core.ready(function() {

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      var chart = am4core.create(contenedor, am4charts.PieChart);

      // Add data
      chart.data = data;

      // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "total";
      pieSeries.dataFields.category = "fecha";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;

    }); // end am
  }else if(p==1){
    am4core.ready(function() {

      let maxim=0;
      for (let x = 1; x <=10; x++) {
        if(((data[0].total%10)+x)>=10){
          maxim=data[0].total+x;
          break;
        }
      }
      let divisor=1;
      let cop=maxim;
      while(cop>0){
        cop=parseInt(cop/10);
        divisor*=10;
      }
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end
      var chart = am4core.create(contenedor, am4charts.XYChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.data = data;

      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.dataFields.category = "desc";
      categoryAxis.renderer.minGridDistance = 40;
      categoryAxis.fontSize = 11;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.max = maxim; //tamaño del chart
      valueAxis.strictMinMax = true;
      valueAxis.renderer.minGridDistance = 30;
      // axis break
      var axisBreak = valueAxis.axisBreaks.create();
      axisBreak.startValue = parseInt(maxim/8)*6;
      axisBreak.endValue = parseInt(maxim/8)*8;
      axisBreak.breakSize = 5/divisor;

      // make break expand on hover
      var hoverState = axisBreak.states.create("hover");
      hoverState.properties.breakSize = 1;
      hoverState.properties.opacity = 0.1;
      hoverState.transitionDuration = parseInt(maxim/8);

      axisBreak.defaultState.transitionDuration = parseInt(maxim/8);
      /*
      // this is exactly the same, but with events
      axisBreak.events.on("over", function() {
        axisBreak.animate(
          [{ property: "breakSize", to: 1 }, { property: "opacity", to: 0.1 }],
          1500,
          am4core.ease.sinOut
        );
      });
      axisBreak.events.on("out", function() {
        axisBreak.animate(
          [{ property: "breakSize", to: 0.005 }, { property: "opacity", to: 1 }],
          1000,
          am4core.ease.quadOut
        );
      });*/

      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.categoryX = "desc";
      series.dataFields.valueY = "total";
      series.columns.template.tooltipText = "{valueY.value}";
      series.columns.template.tooltipY = 0;
      series.columns.template.strokeOpacity = 0;

      // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
      series.columns.template.adapter.add("fill", function(fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
      });

    });
  }
}
