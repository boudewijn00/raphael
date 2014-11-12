var Chart = function (data,options) {
  
    data = data;
    options = options;
    
    // paper should be globally available
    paper = Raphael(options.element, options.chart.width, options.chart.height);
    
    this.setCoords();
    
};

Chart.prototype.setCoords = function(){
    
    //  y and x coord for bottom left position  
    coords = {
        top : {
            left : { 
                x : 0, 
                y : 0
            },
            right : { 
                x : (options.chart.width - options.chart.marginright), 
                y : 0
            },
        },
        bottom : {
            left : { 
                x : (options.chart.marginleft),
                y : (options.chart.height - options.chart.marginbottom)
            },
            right : { 
                x : (options.chart.width - options.chart.marginright), 
                y : (options.chart.height - options.chart.marginbottom)
            }
        },
    };
    
}

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
    if(data.bars, paper){
        
        bars = [];
        
        for(var i in data.bars){

            var barHeight = data.bars[i]["value"];

            var xBarCoord = coords.bottom.left.x+(i*(options.barWidth+1))+1;
            var yBarCoord = coords.bottom.left.y - barHeight;

            var bar = paper.rect(xBarCoord, yBarCoord,options.barWidth,barHeight);
            bar.attr({fill: data.bars[i]["color"], 'stroke':'none'});
            
            bars.push = bar;
            
            // place the bar label on the x-axis
            paper.text(coords.bottom.left.x+(i*(options.barWidth+1))+15, coords.bottom.left.y+10, data.bars[i]["label"]);

        }
        
        return bars;
    
    }
    
}
    
Chart.prototype.axis = function(){
    
    if(options.chart.height, options.chart.width){
    
        // y1 axis
        paper.path(['M', coords.bottom.left.x, 0, 'L', coords.bottom.left.x, coords.bottom.left.y]);

        // y1 axis labels
        for(var i in data.axis.y[1]){
            
            // place the label on the y-axis
            paper.text(coords.bottom.left.x-15, coords.bottom.left.y-(i*(coords.bottom.left.y / (data.axis.y[1].length - 1))-10), data.axis.y[1][i]);
            
        }
        
        // y2 axis
        paper.path(['M', coords.bottom.right.x, coords.bottom.right.y, 'L', coords.top.right.x, coords.top.right.y]);
        
        // y2 axis labels
        for(var i in data.axis.y[2]){
            
            // place the label on the y2 axis
            paper.text(coords.bottom.right.x+15, coords.bottom.right.y-(i*(coords.bottom.right.y / (data.axis.y[2].length - 1))-10), data.axis.y[2][i]);
            
        }
        
        // x1 axis
        paper.path(['M', coords.bottom.left.x, coords.bottom.left.y, 'L', coords.bottom.right.x, coords.bottom.right.y]);
    
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

                var path = paper.path(['M', coords.bottom.left.x, coords.bottom.left.y, 'Q', xCurve, yCurve, xEnd, yEnd]);
                paths.push = path;
    
            } else if(data.lines[i].type == 'straight'){
                
                var path = paper.path(['M', coords.bottom.left.x, coords.bottom.left.y, 'L', xEnd, yEnd]);
                paths.push = path;
                
            }
                    
        }
        
        return paths;
       
    }

}