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
    connectElements($("#svg1"), $("#path1"), $("#one"),   $("#you") );
    connectElements($("#svg1"), $("#path2"), $("#two"),    $("#you") );
    connectElements($("#svg1"), $("#path3"), $("#a-one"),   $("#one")  );
    connectElements($("#svg1"), $("#path4"), $("#a-two"),   $("#one")  );
    connectElements($("#svg1"), $("#path5"), $("#b-one"),   $("#two")  );
    connectElements($("#svg1"), $("#path6"), $("#b-two"),   $("#two")  );

    // path for stage two!
    connectElements($("#svg1"), $("#a-path1"), $("#one1"),   $("#you1") );
    connectElements($("#svg1"), $("#a-path2"), $("#two1"),    $("#you1") );
    // second line
    connectElements($("#svg1"), $("#a-path3"), $("#a-one1"),   $("#one1")  );
    connectElements($("#svg1"), $("#a-path4"), $("#a-two1"),   $("#one1")  );
    connectElements($("#svg1"), $("#a-path5"), $("#b-one1"),   $("#two1")  );
    connectElements($("#svg1"), $("#a-path6"), $("#b-two1"),   $("#two1")  );
    // third line
    connectElements($("#svg1"), $("#a-path7"), $("#a-one-first1"),   $("#a-one1") );
    connectElements($("#svg1"), $("#a-path8"), $("#a-one-second1"),    $("#a-one1") );
    connectElements($("#svg1"), $("#a-path9"), $("#a-two-first1"),   $("#a-two1")  );
    connectElements($("#svg1"), $("#a-path10"), $("#a-two-second1"),   $("#a-two1")  );
    connectElements($("#svg1"), $("#a-path11"), $("#b-one-first1"),   $("#b-one1")  );
    connectElements($("#svg1"), $("#a-path12"), $("#b-one-second1"),   $("#b-one1")  );
    connectElements($("#svg1"), $("#a-path13"), $("#b-two-first1"),   $("#b-two1")  );
    connectElements($("#svg1"), $("#a-path14"), $("#b-two-second1"),   $("#b-two1")  );
    // fourth line
    connectElements($("#svg1"), $("#a-path15"), $("#a-one-first1-1"),   $("#a-one-first1") );
    connectElements($("#svg1"), $("#a-path16"), $("#a-one-first1-2"),    $("#a-one-first1") );
    connectElements($("#svg1"), $("#a-path17"), $("#a-one-second1-1"),   $("#a-one-second1")  );
    connectElements($("#svg1"), $("#a-path18"), $("#a-one-second1-2"),   $("#a-one-second1")  );
    connectElements($("#svg1"), $("#a-path19"), $("#a-two-first1-1"),   $("#a-two-first1")  );
    connectElements($("#svg1"), $("#a-path20"), $("#a-two-first1-2"),   $("#a-two-first1")  );
    connectElements($("#svg1"), $("#a-path21"), $("#a-two-second1-1"),   $("#a-two-second1")  );
    connectElements($("#svg1"), $("#a-path22"), $("#a-two-second1-2"),   $("#a-two-second1")  );
    connectElements($("#svg1"), $("#a-path23"), $("#b-one-first1-1"),   $("#b-one-first1") );
    connectElements($("#svg1"), $("#a-path24"), $("#b-one-first1-2"),    $("#b-one-first1") );
    connectElements($("#svg1"), $("#a-path25"), $("#b-one-second1-1"),   $("#b-one-second1")  );
    connectElements($("#svg1"), $("#a-path26"), $("#b-one-second1-2"),   $("#b-one-second1")  );
    connectElements($("#svg1"), $("#a-path27"), $("#b-two-first1-1"),   $("#b-two-first1")  );
    connectElements($("#svg1"), $("#a-path28"), $("#b-two-first1-2"),   $("#b-two-first1")  );
    connectElements($("#svg1"), $("#a-path29"), $("#b-two-second1-1"),   $("#b-two-second1")  );
    connectElements($("#svg1"), $("#a-path30"), $("#b-two-second1-2"),   $("#b-two-second1")  );

    // path for stage three!
    connectElements($("#svg1"), $("#b-path1"), $("#one2"),   $("#you2") );
    connectElements($("#svg1"), $("#b-path2"), $("#two2"),    $("#you2") );
    // second line
    connectElements($("#svg1"), $("#b-path3"), $("#a-one2"),   $("#one2")  );
    connectElements($("#svg1"), $("#b-path4"), $("#a-two2"),   $("#one2")  );
    connectElements($("#svg1"), $("#b-path5"), $("#b-one2"),   $("#two2")  );
    connectElements($("#svg1"), $("#b-path6"), $("#b-two2"),   $("#two2")  );
    // third line
    connectElements($("#svg1"), $("#b-path7"), $("#a-one-first2"),   $("#a-one2") );
    connectElements($("#svg1"), $("#b-path8"), $("#a-one-second2"),    $("#a-one2") );
    connectElements($("#svg1"), $("#b-path9"), $("#a-two-first2"),   $("#a-two2")  );
    connectElements($("#svg1"), $("#b-path10"), $("#a-two-second2"),   $("#a-two2")  );
    connectElements($("#svg1"), $("#b-path11"), $("#b-one-first2"),   $("#b-one2")  );
    connectElements($("#svg1"), $("#b-path12"), $("#b-one-second2"),   $("#b-one2")  );
    connectElements($("#svg1"), $("#b-path13"), $("#b-two-first2"),   $("#b-two2")  );
    connectElements($("#svg1"), $("#b-path14"), $("#b-two-second2"),   $("#b-two2")  );
    // fourth line
    connectElements($("#svg1"), $("#b-path15"), $("#a-one-first2-1"),   $("#a-one-first2") );
    connectElements($("#svg1"), $("#b-path16"), $("#a-one-first2-2"),    $("#a-one-first2") );
    connectElements($("#svg1"), $("#b-path17"), $("#a-one-second2-1"),   $("#a-one-second2")  );
    connectElements($("#svg1"), $("#b-path18"), $("#a-one-second2-2"),   $("#a-one-second2")  );
    connectElements($("#svg1"), $("#b-path19"), $("#a-two-first2-1"),   $("#a-two-first2")  );
    connectElements($("#svg1"), $("#b-path20"), $("#a-two-first2-2"),   $("#a-two-first2")  );
    connectElements($("#svg1"), $("#b-path21"), $("#a-two-second2-1"),   $("#a-two-second2")  );
    connectElements($("#svg1"), $("#b-path22"), $("#a-two-second2-2"),   $("#a-two-second2")  );
    connectElements($("#svg1"), $("#b-path23"), $("#b-one-first2-1"),   $("#b-one-first2") );
    connectElements($("#svg1"), $("#b-path24"), $("#b-one-first2-2"),    $("#b-one-first2") );
    connectElements($("#svg1"), $("#b-path25"), $("#b-one-second2-1"),   $("#b-one-second2")  );
    connectElements($("#svg1"), $("#b-path26"), $("#b-one-second2-2"),   $("#b-one-second2")  );
    connectElements($("#svg1"), $("#b-path27"), $("#b-two-first2-1"),   $("#b-two-first2")  );
    connectElements($("#svg1"), $("#b-path28"), $("#b-two-first2-2"),   $("#b-two-first2")  );
    connectElements($("#svg1"), $("#b-path29"), $("#b-two-second2-1"),   $("#b-two-second2")  );
    connectElements($("#svg1"), $("#b-path30"), $("#b-two-second2-2"),   $("#b-two-second2")  );

    // path for stage four!
    connectElements($("#svg1"), $("#c-path1"), $("#one3"),   $("#you3") );
    connectElements($("#svg1"), $("#c-path2"), $("#two3"),    $("#you3") );
    // second line
    connectElements($("#svg1"), $("#c-path3"), $("#a-one3"),   $("#one3")  );
    connectElements($("#svg1"), $("#c-path4"), $("#a-two3"),   $("#one3")  );
    connectElements($("#svg1"), $("#c-path5"), $("#b-one3"),   $("#two3")  );
    connectElements($("#svg1"), $("#c-path6"), $("#b-two3"),   $("#two3")  );
    // third line
    connectElements($("#svg1"), $("#c-path7"), $("#a-one-first3"),   $("#a-one3") );
    connectElements($("#svg1"), $("#c-path8"), $("#a-one-second3"),    $("#a-one3") );
    connectElements($("#svg1"), $("#c-path9"), $("#a-two-first3"),   $("#a-two3")  );
    connectElements($("#svg1"), $("#c-path10"), $("#a-two-second3"),   $("#a-two3")  );
    connectElements($("#svg1"), $("#c-path11"), $("#b-one-first3"),   $("#b-one3")  );
    connectElements($("#svg1"), $("#c-path12"), $("#b-one-second3"),   $("#b-one3")  );
    connectElements($("#svg1"), $("#c-path13"), $("#b-two-first3"),   $("#b-two3")  );
    connectElements($("#svg1"), $("#c-path14"), $("#b-two-second3"),   $("#b-two3")  );
    // fourth line
    connectElements($("#svg1"), $("#c-path15"), $("#a-one-first3-1"),   $("#a-one-first3") );
    connectElements($("#svg1"), $("#c-path16"), $("#a-one-first3-2"),    $("#a-one-first3") );
    connectElements($("#svg1"), $("#c-path17"), $("#a-one-second3-1"),   $("#a-one-second3")  );
    connectElements($("#svg1"), $("#c-path18"), $("#a-one-second3-2"),   $("#a-one-second3")  );
    connectElements($("#svg1"), $("#c-path19"), $("#a-two-first3-1"),   $("#a-two-first3")  );
    connectElements($("#svg1"), $("#c-path20"), $("#a-two-first3-2"),   $("#a-two-first3")  );
    connectElements($("#svg1"), $("#c-path21"), $("#a-two-second3-1"),   $("#a-two-second3")  );
    connectElements($("#svg1"), $("#c-path22"), $("#a-two-second3-2"),   $("#a-two-second3")  );
    connectElements($("#svg1"), $("#c-path23"), $("#b-one-first3-1"),   $("#b-one-first3") );
    connectElements($("#svg1"), $("#c-path24"), $("#b-one-first3-2"),    $("#b-one-first3") );
    connectElements($("#svg1"), $("#c-path25"), $("#b-one-second3-1"),   $("#b-one-second3")  );
    connectElements($("#svg1"), $("#c-path26"), $("#b-one-second3-2"),   $("#b-one-second3")  );
    connectElements($("#svg1"), $("#c-path27"), $("#b-two-first3-1"),   $("#b-two-first3")  );
    connectElements($("#svg1"), $("#c-path28"), $("#b-two-first3-2"),   $("#b-two-first3")  );
    connectElements($("#svg1"), $("#c-path29"), $("#b-two-second3-1"),   $("#b-two-second3")  );
    connectElements($("#svg1"), $("#c-path30"), $("#b-two-second3-2"),   $("#b-two-second3")  );



    // path for stage five!
    connectElements($("#svg1"), $("#d-path1"), $("#one4"),   $("#you4") );
    connectElements($("#svg1"), $("#d-path2"), $("#two4"),    $("#you4") );
    // second line
    connectElements($("#svg1"), $("#d-path3"), $("#a-one4"),   $("#one4")  );
    connectElements($("#svg1"), $("#d-path4"), $("#a-two4"),   $("#one4")  );
    connectElements($("#svg1"), $("#d-path5"), $("#b-one4"),   $("#two4")  );
    connectElements($("#svg1"), $("#d-path6"), $("#b-two4"),   $("#two4")  );
    // third line
    connectElements($("#svg1"), $("#d-path7"), $("#a-one-first4"),   $("#a-one4") );
    connectElements($("#svg1"), $("#d-path8"), $("#a-one-second4"),    $("#a-one4") );
    connectElements($("#svg1"), $("#d-path9"), $("#a-two-first4"),   $("#a-two4")  );
    connectElements($("#svg1"), $("#d-path10"), $("#a-two-second4"),   $("#a-two4")  );
    connectElements($("#svg1"), $("#d-path11"), $("#b-one-first4"),   $("#b-one4")  );
    connectElements($("#svg1"), $("#d-path12"), $("#b-one-second4"),   $("#b-one4")  );
    connectElements($("#svg1"), $("#d-path13"), $("#b-two-first4"),   $("#b-two4")  );
    connectElements($("#svg1"), $("#d-path14"), $("#b-two-second4"),   $("#b-two4")  );
    // fourth line
    connectElements($("#svg1"), $("#d-path15"), $("#a-one-first4-1"),   $("#a-one-first4") );
    connectElements($("#svg1"), $("#d-path16"), $("#a-one-first4-2"),    $("#a-one-first4") );
    connectElements($("#svg1"), $("#d-path17"), $("#a-one-second4-1"),   $("#a-one-second4")  );
    connectElements($("#svg1"), $("#d-path18"), $("#a-one-second4-2"),   $("#a-one-second4")  );
    connectElements($("#svg1"), $("#d-path19"), $("#a-two-first4-1"),   $("#a-two-first4")  );
    connectElements($("#svg1"), $("#d-path20"), $("#a-two-first4-2"),   $("#a-two-first4")  );
    connectElements($("#svg1"), $("#d-path21"), $("#a-two-second4-1"),   $("#a-two-second4")  );
    connectElements($("#svg1"), $("#d-path22"), $("#a-two-second4-2"),   $("#a-two-second4")  );
    connectElements($("#svg1"), $("#d-path23"), $("#b-one-first4-1"),   $("#b-one-first4") );
    connectElements($("#svg1"), $("#d-path24"), $("#b-one-first4-2"),    $("#b-one-first4") );
    connectElements($("#svg1"), $("#d-path25"), $("#b-one-second4-1"),   $("#b-one-second4")  );
    connectElements($("#svg1"), $("#d-path26"), $("#b-one-second4-2"),   $("#b-one-second4")  );
    connectElements($("#svg1"), $("#d-path27"), $("#b-two-first4-1"),   $("#b-two-first4")  );
    connectElements($("#svg1"), $("#d-path28"), $("#b-two-first4-2"),   $("#b-two-first4")  );
    connectElements($("#svg1"), $("#d-path29"), $("#b-two-second4-1"),   $("#b-two-second4")  );
    connectElements($("#svg1"), $("#d-path30"), $("#b-two-second4-2"),   $("#b-two-second4")  );


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