var Chart = function (data, options) {

    this.data = data;
    this.options = options;
    // paper should be globally available

    paper = Raphael(options.element, options.chart.width, options.chart.height);
    this.coords = this.setCoords();

};

/**
 * set the coords based on the chart width, height and margins
 * @returns {coords}
 */
Chart.prototype.setCoords = function () {

    // y and x coord for bottom left position
    coords = {
        top: {
            left: {
                x: options.chart.marginleft,
                y: options.chart.margintop
            },
            right: {
                x: (options.chart.width - options.chart.marginright),
                y: options.chart.margintop
            }
        },
        bottom: {
            left: {
                x: options.chart.marginleft,
                y: (options.chart.height - options.chart.marginbottom)
            },
            right: {
                x: (options.chart.width - options.chart.marginright),
                y: (options.chart.height - options.chart.marginbottom)
            }
        },
    };

    return coords;

}

/**
 * chart draw method invokes individual chart parts:
 * bars, axis and line
 * @returns {undefined}
 */
Chart.prototype.drawChart = function () {
    this.axis();
}

Chart.prototype.drawContent = function (number) {
    this.bars(data.content[number]);
    this.lines();
}

/**
 * loop through data.bars and draw rectangles for each bar
 * @returns {Chart.prototype.bars}
 */
Chart.prototype.bars = function (content) {

    // we need data, the chart height and a paper to draw the rectangle
    if (content.bars, paper) {

        bars = [];

        for (i in content.bars) {
            
            yPos = coords.bottom.left.y;
            
            for (j in content.bars[i].values.segments){
            
                var barHeight = content.bars[i].values.segments[j].value;
                var xBarCoord = coords.bottom.left.x + (i * (options.barWidth + 1)) + 1;
                var yBarCoord = yPos - barHeight;
                var bar = paper.rect(xBarCoord, yBarCoord, options.barWidth, barHeight);
                var yPos = yBarCoord;
                
                bar.attr({
                    fill: content.bars[i].values.segments[j].color,
                    'stroke': 'none'
                });

                bars.push = bar;
                
            }
            
            // place the bar label on the x-axis
            paper.text(
            coords.bottom.left.x + (i * (options.barWidth + 1)) + 15,
            coords.bottom.left.y + 10,
            content.bars[i]["label"]);

            // continue this line by adding the position for this bar to the path
            if (content.bars[i].values.line) {

                if (!yLineCoordStart) {
                    var yLineCoordStart = coords.bottom.left.y;
                }

                var xLineCoordStart = coords.bottom.left.x + (i * (options.barWidth)) + 1;
                var xLineCoordEnd = xLineCoordStart + options.barWidth + 1;
                var yLineCoordEnd = coords.bottom.left.y - content.bars[i].values.line;

                paper.path(['M', xLineCoordStart, yLineCoordStart, 'L', xLineCoordEnd, yLineCoordEnd]);

                var yLineCoordStart = yLineCoordEnd;

            }
        }

        return bars;

    }
}

/**
 * draw the axis plus related labels
 * @returns {undefined}
 */
Chart.prototype.axis = function () {

    for (var position in data.axis.y) {

        if (position == "left") {
            paper.path(['M', coords.top.left.x, coords.top.left.y, 'L', coords.bottom.left.x, coords.bottom.left.y]);
        } else if (position == "right") {
            paper.path(['M', coords.bottom.right.x, coords.bottom.right.y, 'L', coords.top.right.x, coords.top.right.y]);
        }

        // y axis labels
        for (var i in data.axis.y[position]) {
            if (position == "left") {
                var xCoord = coords.bottom.left.x - 15;
                var yLabelDistance = i * ((coords.bottom.left.y - coords.top.left.y) / (data.axis.y[position].length - 1));
                var yCoord = (coords.bottom.left.y - yLabelDistance);
            } else if (position == "right") {
                var xCoord = coords.bottom.right.x + 15;
                var yLabelDistance = i * ((coords.bottom.right.y - coords.top.right.y) / (data.axis.y[position].length - 1));
                var yCoord = (coords.bottom.right.y - yLabelDistance);
            }

            var text = data.axis.y[position][i];

            // arguments: x-coord, y-coord, text
            paper.text(xCoord, yCoord, text);

        }
    }

    // x1 axis
    paper.path(['M', coords.bottom.left.x, coords.bottom.left.y, 'L', coords.bottom.right.x, coords.bottom.right.y]);

}

/**
 * draw a curve line following a curve path
 * @returns {Array|paths}
 */
Chart.prototype.lines = function () {

    if (data.lines, options.chart.height, paper) {

        paths = [];

        for (var i in data.lines) {

            // set x and y end coords for line
            var xEnd = data.lines[i].xEnd;
            var yEnd = data.lines[i].yEnd;

            // determine what kind of line we want to draw
            if (data.lines[i].type == 'curve') {

                // a curve line needs a curve path
                var xCurve = xEnd / 2;
                var yCurve = yEnd;
                var path = paper.path(['M', coords.bottom.left.x, coords.bottom.left.y, 'Q', xCurve, yCurve, xEnd, yEnd]);
                paths.push = path;

            } else if (data.lines[i].type == 'straight') {
                var path = paper.path(['M', coords.bottom.left.x, coords.bottom.left.y, 'L', xEnd, yEnd]);
                paths.push = path;
            }
        }

        return paths;

    }
}
