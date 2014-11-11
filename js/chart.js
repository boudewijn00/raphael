var Chart = function (data,options) {
  
    data = data;
    options = options;
    
    //  the y coord taken from the top to the end of the chart
    yChartBottomCoord = (options.chart.height - options.axis.bottom);
    // the x coord taken from the left to the beginning of the chart
    xChartLeftCoord = (options.axis.left);
    
    // paper should be globally available
    paper = Raphael(options.element, options.chart.width, options.chart.height);
    
};

/**
 * chart draw method invokes individual chart parts:
 * bars, axis and line
 * @returns {undefined}
 */
Chart.prototype.draw = function(){

    this.bars();
    this.axis();
    this.lines();
    
}
    
/**
 * loop through data.bars and draw rectangles for each bar
 */
Chart.prototype.bars = function(){
    
    // we need data, the chart height and a paper to draw the rectangle
    if(data.bars, options.chart.height, yChartBottomCoord, paper){
        
        bars = [];
        
        for(var i in data.bars){

            var barHeight = data.bars[i]["value"];

            var xBarCoord = xChartLeftCoord+(i*(options.barWidth+1))+1;
            var yBarCoord = yChartBottomCoord - barHeight;

            var bar = paper.rect(xBarCoord, yBarCoord,options.barWidth,barHeight);
            bar.attr({fill: data.bars[i]["color"], 'stroke':'none'});
            
            bars.push = bar;
            
            // place the bar label
            paper.text(xChartLeftCoord+(i*31)+15, yChartBottomCoord+10, data.bars[i]["label"]);

        }
        
        return bars;
    
    }
    
}
    
Chart.prototype.axis = function(){
    
    if(options.chart.height, options.chart.width){
    
        // y axis
        paper.path(['M', xChartLeftCoord, 0, 'L', xChartLeftCoord, yChartBottomCoord]);

        // x axis
        paper.path(['M', xChartLeftCoord, yChartBottomCoord, 'L', options.chart.width, yChartBottomCoord]);
    
    }
    
}
    
/*
 * draw a curve line following a curve path
 */
Chart.prototype.lines = function(){

    if(data.lines, options.chart.height, paper){

        paths = [];

        for(var i in data.lines){
        
            // set x and y end coords for line
            var xEnd = data.lines[i].xEnd;
            var yEnd = data.lines[i].yEnd;
            
            // determine what kind of line we want to draw
            if(data.lines[i].type == 'curve'){
               
                // a curve line needs a curve path
                var xCurve = xEnd  / 2;
                var yCurve = yEnd;

                var path = paper.path(['M', xChartLeftCoord, yChartBottomCoord, 'Q', xCurve, yCurve, xEnd, yEnd]);
                paths.push = path;
    
            } else if(data.lines[i].type == 'straight'){
                
                var path = paper.path(['M', xChartLeftCoord, yChartBottomCoord, 'L', xEnd, yEnd]);
                paths.push = path;
                
            }
                    
        }
        
        return paths;
       
    }

}