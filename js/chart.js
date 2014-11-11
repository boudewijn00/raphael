var Chart = function (data,options) {
  
    data = data;
    options = options;
    
    //  y and x coord for bottom left position
    yChartBottomLeftCoord = (options.chart.height - options.chart.marginbottom);
    xChartBottomLeftCoord = (options.chart.marginleft);
    
    // y and x coord for bottom right position
    yChartBottomRightCoord = (options.chart.height - options.chart.marginbottom);
    xChartBottomRightCoord = (options.chart.width - options.chart.marginright);
    
    // y and x coord for bottom right position
    yChartTopRightCoord = 0;
    xChartTopRightCoord = (options.chart.width - options.chart.marginright);
    
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
    if(data.bars, options.chart.height, yChartBottomLeftCoord, paper){
        
        bars = [];
        
        for(var i in data.bars){

            var barHeight = data.bars[i]["value"];

            var xBarCoord = xChartBottomLeftCoord+(i*(options.barWidth+1))+1;
            var yBarCoord = yChartBottomLeftCoord - barHeight;

            var bar = paper.rect(xBarCoord, yBarCoord,options.barWidth,barHeight);
            bar.attr({fill: data.bars[i]["color"], 'stroke':'none'});
            
            bars.push = bar;
            
            // place the bar label on the x-axis
            paper.text(xChartBottomLeftCoord+(i*(options.barWidth+1))+15, yChartBottomLeftCoord+10, data.bars[i]["label"]);

        }
        
        return bars;
    
    }
    
}
    
Chart.prototype.axis = function(){
    
    if(options.chart.height, options.chart.width){
    
        // y1 axis
        paper.path(['M', xChartBottomLeftCoord, 0, 'L', xChartBottomLeftCoord, yChartBottomLeftCoord]);

        // y1 axis labels
        for(var i in data.axis.y[1]){
            
            // place the label on the y-axis
            paper.text(xChartBottomLeftCoord-15, yChartBottomLeftCoord-(i*(yChartBottomLeftCoord / (data.axis.y[1].length - 1))-10), data.axis.y[1][i]);
            
        }
        
        // y2 axis
        paper.path(['M', xChartBottomRightCoord, yChartBottomRightCoord, 'L', xChartTopRightCoord, yChartTopRightCoord]);
        
        // y2 axis labels
        for(var i in data.axis.y[2]){
            
            // place the label on the y-axis
            paper.text(xChartBottomRightCoord+15, yChartBottomRightCoord-(i*(yChartBottomRightCoord / (data.axis.y[2].length - 1))-10), data.axis.y[2][i]);
            
        }
        
        // x1 axis
        paper.path(['M', xChartBottomLeftCoord, yChartBottomLeftCoord, 'L', xChartBottomRightCoord, yChartBottomRightCoord]);
    
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

                var path = paper.path(['M', xChartBottomLeftCoord, yChartBottomLeftCoord, 'Q', xCurve, yCurve, xEnd, yEnd]);
                paths.push = path;
    
            } else if(data.lines[i].type == 'straight'){
                
                var path = paper.path(['M', xChartBottomLeftCoord, yChartBottomLeftCoord, 'L', xEnd, yEnd]);
                paths.push = path;
                
            }
                    
        }
        
        return paths;
       
    }

}