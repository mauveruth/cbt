//helper functions, it turned out chrome doesn't support Math.sgn() 
function signum(x) {
    return (x < 0) ? -1 : 1;
}
function absolute(x) {
    return (x < 0) ? -x : x;
}

function drawPath(svg, path, startX, startY, endX, endY) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    var stroke =  parseFloat(path.attr("stroke-width"));
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.attr("height") <  endY)                 svg.attr("height", endY);
    if (svg.attr("width" ) < (startX + stroke) )    svg.attr("width", (startX + stroke));
    if (svg.attr("width" ) < (endX   + stroke) )    svg.attr("width", (endX   + stroke));
    
    var deltaX = (endX - startX) * 0.15;
    var deltaY = (endY - startY) * 0.15;
    // for further calculations which ever is the shortest distance
    var delta  =  deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    var arc1 = 0; var arc2 = 1;
    if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
    }
    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end 
    path.attr("d",  "M"  + startX + " " + startY +
                    " V" + (startY + delta) +
                    " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX + delta*signum(deltaX)) + " " + (startY + 2*delta) +
                    " H" + (endX - delta*signum(deltaX)) + 
                    " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3*delta) +
                    " V" + endY );
}

function connectElements(svg, path, startElem, endElem) {
    var svgContainer= $("#svgContainer");

    // if first element is lower than the second, swap!
    if(startElem.offset().top > endElem.offset().top){
        var temp = startElem;
        startElem = endElem;
        endElem = temp;
    }

    // get (top, left) corner coordinates of the svg container   
    var svgTop  = svgContainer.offset().top;
    var svgLeft = svgContainer.offset().left;

    // get (top, left) coordinates for the two elements
    var startCoord = startElem.offset();
    var endCoord   = endElem.offset();

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var startX = startCoord.left + 0.5*startElem.outerWidth() - svgLeft;    // x = left offset + 0.5*width - svg's left offset
    var startY = startCoord.top  + startElem.outerHeight() - svgTop;        // y = top offset + height - svg's top offset

        // calculate path's end (x,y) coords
    var endX = endCoord.left + 0.5*endElem.outerWidth() - svgLeft;
    var endY = endCoord.top  - svgTop;

    // call function for drawing the path
    drawPath(svg, path, startX, startY, endX, endY);

}



function connectAll() {
    // connect all the paths you want!

    // path for stage two!
    connectElements($("#svg"), $("#path1"), $("#one"),   $("#you") );
    connectElements($("#svg"), $("#path2"), $("#two"),    $("#you") );
    // second line
    connectElements($("#svg"), $("#path3"), $("#a-one"),   $("#one")  );
    connectElements($("#svg"), $("#path4"), $("#a-two"),   $("#one")  );
    connectElements($("#svg"), $("#path5"), $("#b-one"),   $("#two")  );
    connectElements($("#svg"), $("#path6"), $("#b-two"),   $("#two")  );
    // third line
    connectElements($("#svg"), $("#path7"), $("#a-one-first"),   $("#a-one") );
    connectElements($("#svg"), $("#path8"), $("#a-one-second"),    $("#a-one") );
    connectElements($("#svg"), $("#path9"), $("#a-two-first"),   $("#a-two")  );
    connectElements($("#svg"), $("#path10"), $("#a-two-second"),   $("#a-two")  );
    connectElements($("#svg"), $("#path11"), $("#b-one-first"),   $("#b-one")  );
    connectElements($("#svg"), $("#path12"), $("#b-one-second"),   $("#b-one")  );
    connectElements($("#svg"), $("#path13"), $("#b-two-first"),   $("#b-two")  );
    connectElements($("#svg"), $("#path14"), $("#b-two-second"),   $("#b-two")  );
    // fourth line
    connectElements($("#svg"), $("#path15"), $("#a-one-first-1"),   $("#a-one-first") );
    connectElements($("#svg"), $("#path16"), $("#a-one-first-2"),    $("#a-one-first") );
    connectElements($("#svg"), $("#path17"), $("#a-one-second-1"),   $("#a-one-second")  );
    connectElements($("#svg"), $("#path18"), $("#a-one-second-2"),   $("#a-one-second")  );
    connectElements($("#svg"), $("#path19"), $("#a-two-first-1"),   $("#a-two-first")  );
    connectElements($("#svg"), $("#path20"), $("#a-two-first-2"),   $("#a-two-first")  );
    connectElements($("#svg"), $("#path21"), $("#a-two-second-1"),   $("#a-two-second")  );
    connectElements($("#svg"), $("#path22"), $("#a-two-second-2"),   $("#a-two-second")  );
    connectElements($("#svg"), $("#path23"), $("#b-one-first-1"),   $("#b-one-first") );
    connectElements($("#svg"), $("#path24"), $("#b-one-first-2"),    $("#b-one-first") );
    connectElements($("#svg"), $("#path25"), $("#b-one-second-1"),   $("#b-one-second")  );
    connectElements($("#svg"), $("#path26"), $("#b-one-second-2"),   $("#b-one-second")  );
    connectElements($("#svg"), $("#path27"), $("#b-two-first-1"),   $("#b-two-first")  );
    connectElements($("#svg"), $("#path28"), $("#b-two-first-2"),   $("#b-two-first")  );
    connectElements($("#svg"), $("#path29"), $("#b-two-second-1"),   $("#b-two-second")  );
    connectElements($("#svg"), $("#path30"), $("#b-two-second-2"),   $("#b-two-second")  );

}

$(document).ready(function() {
    // reset svg each time 
    $("#svg1").attr("height", "0");
    $("#svg1").attr("width", "0");
    connectAll();
});

$(window).resize(function () {
    // reset svg each time 
    $("#svg1").attr("height", "0");
    $("#svg1").attr("width", "0");
    connectAll();
});