


var ModelWalls = []




this.CreateModel = (x, y) => {

    const Body = document.getElementsByTagName("body")[0];
    const bodyModel = document.createElement('div');
    bodyModel.style.position = 'fixed';
    bodyModel.style.top = x + 'px';
    bodyModel.style.left = y + 'px';
    bodyModel.style.width = '10px'
    bodyModel.style.height = '10px'
    bodyModel.style.backgroundColor = 'black';
    bodyModel.style.transition = '2.0s'
    bodyModel.style.zIndex = '2'
    bodyModel.heading = 0.0;

    Body.appendChild(bodyModel)

    bodyModel.SetPos = (x, y) => {
        bodyModel.style.top = x + 'px';
        bodyModel.style.left = y + 'px';
    }

    bodyModel.GetPos = () => {
        return [parseInt(bodyModel.style.top), parseInt(bodyModel.style.left)]
    }

    return bodyModel
}




this.CreateWall = (x, y, h, w) => {
    
    const Body = document.getElementsByTagName("body")[0];
    const wallModel = document.createElement('div');
    wallModel.style.position = 'fixed';
    wallModel.style.top = x + 'px';
    wallModel.style.left = y + 'px';
    wallModel.style.width = w + 'px';
    wallModel.style.height = h + 'px';
    wallModel.style.backgroundColor = 'grey';
    wallModel.style.transition = '0.5s'


    wallModel.SetPos = (x, y) => {
        wallModel.style.top = x + 'px';
        wallModel.style.left = y + 'px';
    }

    wallModel.SetShape = (h, w) => {
        wallModel.style.width = w + 'px';
        wallModel.style.height = h + 'px';
    }

    wallModel.GetPoints = () => {

        var point1 = [parseInt(wallModel.style.top), parseInt(wallModel.style.left)];
        var point2 = [parseInt(wallModel.style.top), parseInt(wallModel.style.left) + w];
        var point3 = [parseInt(wallModel.style.top) + h, parseInt(wallModel.style.left) + w];
        var point4 = [parseInt(wallModel.style.top) + h, parseInt(wallModel.style.left)];
        
        return [point1, point2, point3, point4];

    }

    wallModel.id = Number(ModelWalls.length) + 1

    ModelWalls.push(wallModel)
    Body.appendChild(wallModel)

    return wallModel;

}


this.GetLineByUnit = (sx, sy, ex, ey, unit) => {

    var arrayOfPoints = [];
    //Shibe Khat Ro Be Dast Miyarim
    var m = (ey - sy) / (ex - sx);
    console.log(`M =  ${m}`)
    

    for(var x = sx , y = sy ;x <= ex && y <= ey; x += unit)
    {
        //Modaleye Khat
        if(m != Infinity)
        {
            y = m * (parseInt(x.toString()) - sx) + sy;
            arrayOfPoints.push([x, y]);
        }
        else
        {
            continue;
        }
        
    }

    return arrayOfPoints;


}




// this.GetHitPoint = (model, finalX, finalY) => {

//     //300 and 400 are the points the square must reach and 1.0 is the range they calculate

//     for(const Wall of ModelWalls)
//     {
//         var WallPoints = Wall.GetPoints();
//         var ModelPos = model.GetPos();
//         console.log(`MODEL POS : ${JSON.stringify(ModelPos)}`)
//         var lineArray = this.GetLineByUnit(ModelPos[0], ModelPos[1], finalX, finalY, 1.0);
        
//         for(const linePoint  of lineArray)
//         {
//             if(this.isInside(linePoint, WallPoints))
//             {
//                 console.log(`Collision Detected at ${JSON.stringify(linePoint)}`);
//                 // model.SetPos(linePoint[0], linePoint[1])
//                 // hit = true;
//                 return [linePoint[0], linePoint[1]];
//             }
//             else
//             {
//                 console.log(`We are at ${JSON.stringify(linePoint)}, not hits so far`);
//             }
//         }

//         return undefined;
//     }
// }



// this.GetHitPointByStartPoint = (sx, sy, ex, ey) => {
//     for(const Wall of ModelWalls)
//     {
//         var WallPoints = Wall.GetPoints();
//         var ModelPos = [sx, sy];
//         console.log(`MODEL POS : ${JSON.stringify(ModelPos)}`)
//         var lineArray = this.GetLineByUnit(ModelPos[0], ModelPos[1], ex, ey, 1.0);
        
//         for(const linePoint  of lineArray)
//         {
//             if(this.isInside(linePoint, WallPoints))
//             {
//                 console.log(`Collision Detected at ${JSON.stringify(linePoint)}`);
//                 // model.SetPos(linePoint[0], linePoint[1])
//                 // hit = true;
//                 return [linePoint[0], linePoint[1]];
//             }
//             else
//             {
//                 console.log(`We are at ${JSON.stringify(linePoint)}, not hits so far`);
//             }
//         }

//         return undefined;
//     }
// }



// this.FindClosestFreePointFromWall = (model, wall, distant, finalX, finalY) => {


//     const ModelPos = model.GetPos();

//     for(var d = 0.0 ;d<=360.0;d++)
//     {
//         console.log(`MODEL POS: ${JSON.stringify(ModelPos)} - Degree: ${d}`)
//         var TestSubject = this.GetPositionInDegreeOfPosition(ModelPos, distant, d);
//         var WallPoints = wall.GetPoints();
//         var lineArray = this.GetLineByUnit(TestSubject.x, TestSubject.y, finalX, finalY, 1.0);

//         console.log(`LINE ARRAY: ${JSON.stringify(lineArray)}`)
        
//         for(const linePoint  of lineArray)
//         {
//             if(this.isInside(linePoint, WallPoints))
//             {
//                 console.log(`Not a Free Point`);
//             }
//             else
//             {
//                 console.log(`Found a free point!`);
//                 console.log(`FREE POINT IF FUNCTION: ${JSON.stringify(linePoint)}`)
//                 return linePoint;
//             }
//         }
//     }

//     return undefined;
// }


// this.GetPositionInDegreeOfPosition = (position, distance, degree) =>
// {     
//     var AddPosY = parseFloat(distance) * Math.sin(degree * (Math.PI / 180.0));
//     var AddPosX = parseFloat(distance) * Math.cos(degree * (Math.PI / 180.0));

//     var FinalPos = {x:(position[0] + parseFloat(AddPosX)), y:(position[1] + parseFloat(AddPosY))}

//     return FinalPos;

// }



this.isInside = (point, vs) => {

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};







setTimeout(() => {

    var model = CreateModel(10, 10)


    // var svg = document.createElement('svg');

    // var line = document.createElement('polyline');
    // line.points = "20,20 800,200 950,500 0,800 0,0"

    // svg.appendChild(line);

    // document.getElementsByTagName("body")[0].appendChild(svg);


    // setTimeout(() => {

    //     // model.SetPos(50, 60)

    //     // var lines = this.GetLineByUnit(10, 10, 500, 600, 10.0);
    //     // for(const point of lines)
    //     // {
    //     //     CreateModel(point[0], point[1])
    //     // }

        
    // }, 2000);

    var Wall1 = CreateWall(100, 300, 300, 20);
    var Wall2 = CreateWall(300, 500, 300, 60);
    var Wall3 = CreateWall(600, 400, 300, 40);


    var finalX = 610;
    var finalY = 540;

    var FreeDotsToThePath = [];
    var StartPoint = model.GetPos();


    const screenWidth = screen.width;
    const screenHeight = screen.height;

    var ListOfFreePositions = [];

    for(var wid = 0;wid <= screenWidth;wid++)
    {
        for(var hgt = 0;hgt <= screenHeight;hgt++)
        {
            for(const Wall of ModelWalls)
            {
                const WallPoints = Wall.GetPoints();
                const coord = [wid, hgt];
                if(!this.isInside(coord, WallPoints))
                {
                    ListOfFreePositions.push(coord);
                }
            }
        }
    }

    //We need this to see if the current positon is occupied by a wall
    const IsPositionOccupied = (pos) => {
        for(const posObject of ListOfFreePositions)
        {
            if(parseInt(posObject[0]) == parseInt(pos[0]) && parseInt(posObject[1]) == parseInt(pos[1]))
            {
                alert(`NOT OCCUPIED: ${JSON.stringify(posObject)} -- ${JSON.stringify(pos)}`)
                return false;
            }
        }

        alert(`OCCUPIED :( ${JSON.stringify(pos)}`)
        return true;
    }

    //when we get a occupied point we need to find the free ones on the vertical axis to be able to detemine a free path
    const FindFreePositionsInVerticalAxis = (x) => {

        var FreePointsFound = [];
        for(const posObject of ListOfFreePositions)
        {
            if(posObject[0] == x)
            {
                FreePointsFound.push([x, posObject[1]])
            //     const coord = [x, posObject[1]];
            //     var inside = true;
            //     for(const Wall of ModelWalls)
            //     {
            //         const WallPoints = Wall.GetPoints();
            //         if(!this.isInside(coord, WallPoints))
            //         {
            //             FreePointsFound.push(coord);
            //         }
            //     }

            //     if(!inside)
            //     return FreePointsFound;
            }
        }

        if(FreePointsFound.length == 0) return undefined;
        else return FreePointsFound;
    }
    


    const GetDistantOf2Points = (vec1, vec2) => {
        return Math.sqrt(((vec2[1] - vec1[1]) * (vec2[1] - vec1[1])) + ((vec2[0] - vec1[0]) * (vec2[0] - vec1[0])));
    }

    console.log(`ALl Free Points: ${ListOfFreePositions}`)

    while(true)
    {

        //Now we have all the free dots !
        alert(`StartPoint: ${JSON.stringify(StartPoint)}`)
        var lineArray = this.GetLineByUnit(StartPoint[0], StartPoint[1], finalX, finalY, 1);
        alert(`Checking a new line ...`)
        for(const linePoint of lineArray)
        {
            // console.log(`Line being checked: ${JSON.stringify(linePoint)}`)
            alert(`Line being checked: ${JSON.stringify(linePoint)}`)
            if(IsPositionOccupied(linePoint))
            {
                alert(`Occupied ...`)
                // linePoint[0] = current X
                var FreeDotsInVertialAxis = FindFreePositionsInVerticalAxis(linePoint[0]);
                if(FreeDotsInVertialAxis != undefined)
                {
                    console.log(`Got free dots!`)
                    var lastDistant = undefined;
                    var closestCoord = undefined;
                    for(const freeCoords of FreeDotsInVertialAxis)
                    {
                        console.log(`Coord Being Check: ${JSON.stringify(freeCoords)}`)
                        if(lastDistant == undefined)
                        {
                            console.log(`last dist undefined ...`)
                            lastDistant = GetDistantOf2Points(freeCoords, [finalX, finalY]);
                            closestCoord = freeCoords;

                            console.log(`last dist undefined : ${lastDistant} - ${JSON.stringify(freeCoords)}`)
                        }
                        else
                        {
                            console.log(`last dist defined ...`)
                            if(lastDistant > GetDistantOf2Points(freeCoords, [finalX, finalY]))
                            {
                                lastDistant = GetDistantOf2Points(freeCoords, [finalX, finalY]);
                                closestCoord = freeCoords;
                                console.log(`last dist defined : ${lastDistant} - ${JSON.stringify(freeCoords)}`)
                            }
                            else
                            {
                                console.log(`last dist defined but not acceptable ...`)
                            }
                        }

                        // alert(`Found Free Point ${JSON.stringify(freeCoords)} - dist: ${lastDistant}`);
                        CreateModel(closestCoord[0], closestCoord[1])
                    }

                    //now we have the closest free coord to the final point
                    StartPoint = closestCoord;
                    alert(`Start Point Changed ${JSON.stringify(StartPoint)}`);
                    break;
                    
                }
                else
                {
                    console.log('Operation failed !!')
                    break;
                }
            }
            else
            {
                alert(`Line is free for sure !`)
                LastFreePoint = linePoint;
                FreeDotsToThePath.push(linePoint)

                console.log(`Free Points So Far: ${JSON.stringify(linePoint)}`)
                CreateModel(linePoint[0], linePoint[1])

                if(linePoint[0] == finalX && linePoint[1] == finalY) return;
            }
        }

        
    }
    
    // const OnPathfinderDone = () => {
    //     console.log(`Pathfinder job has finshed!`)
    //     clearInterval(Pathfinder);
    // }

    // setTimeout(() => {

    //     for(const linePoint  of lineArray)
    //     {
    //         if(this.isInside(linePoint, WallPoints))
    //         {
    //             console.log(`Made a HIT!`);
    //             // model.SetPos(linePoint[0], linePoint[1])
    //             CreateModel(linePoint[0], linePoint[1])
    //             StartPoint = linePoint;
    //             break;
    //         }
    //         else
    //         {
    //             console.log(`We are at ${JSON.stringify(linePoint)}, not hits so far`);
    //         }
    //     }

    //     while(true)
    //     {
    //         for(const Wall of ModelWalls)
    //         {
    //             var WallPoints = Wall.GetPoints();
                
    //             console.log(`MODELPOS: ${JSON.stringify(StartPoint)}`)
    //             var lineArray = this.GetLineByUnit(StartPoint[0], StartPoint[1], finalX, finalY, 1.0);
                
    //             for(const linePoint  of lineArray)
    //             {
    //                 if(this.isInside(linePoint, WallPoints))
    //                 {
    //                     console.log(`Made a HIT!`);
    //                     // model.SetPos(linePoint[0], linePoint[1])
    //                     CreateModel(linePoint[0], linePoint[1])
    //                     StartPoint = linePoint;
    //                     break;
    //                 }
    //                 else
    //                 {
    //                     console.log(`We are at ${JSON.stringify(linePoint)}, not hits so far`);
    //                 }
    //             }

    //             if(ifBreak)
    //             {
    //                 console.log(`BROKE OUT OF #1`)
    //                 break;
    //             }
    //         }
    //     }
        
    // }, 5000);







    

    // setTimeout(() => {

    //     var Path = [];
    //     var ActiveWall = undefined;
    //     var tries = 0;

    //     while(true)
    //     {
    //         tries++;
    //         if(tries > 5) break;
            // for(const Wall of ModelWalls)
            // {
            //     var ifBreak = false;
            //     var WallPoints = Wall.GetPoints();
            //     var ModelPos = model.GetPos();
            //     console.log(`MODELPOS: ${JSON.stringify(ModelPos)}`)
            //     var lineArray = this.GetLineByUnit(ModelPos[0], ModelPos[1], finalX, finalY, 1.0);
                
            //     for(const linePoint  of lineArray)
            //     {
            //         if(this.isInside(linePoint, WallPoints))
            //         {
            //             console.log(`Made a HIT!`);
            //             model.SetPos(linePoint[0], linePoint[1])
            //             // CreateModel(linePoint[0], linePoint[1])
            //             ActiveWall = Wall;
            //             ifBreak = true;
            //             break;
            //         }
            //         else
            //         {
            //             console.log(`We are at ${JSON.stringify(linePoint)}, not hits so far`);
            //         }
            //     }

            //     if(ifBreak)
            //     {
            //         console.log(`BROKE OUT OF #1`)
            //         break;
            //     }
            // }

    //         //We have all the paths!
    //         if(ActiveWall == undefined)
    //         {
    //             console.log(`ALL THE PATHES ARE DONE !`)
    //             break;
    //         }

    //         //Now we have an active wall so we calculate the free points

    //         var distant = 1.0;
    //         while(true)
    //         {
    //             console.log(`Calculating a free point by distant: ${distant}`);
    //             var FreePoint = this.FindClosestFreePointFromWall(model, ActiveWall, distant, finalX, finalY)
    //             console.log(`Current Found free point: ${JSON.stringify(FreePoint)}`);
    //             if(FreePoint == undefined)
    //             {
    //                 distant = parseFloat(distant) + 1.0;
    //             }
    //             else
    //             {
    //                 //now we have a free point and so we add it to the path, set the model pos then break and set active wall to undefined again for a new detection proccess.
    //                 Path.push(FreePoint);
    //                 ActiveWall = undefined;
    //                 CreateModel(FreePoint[0], FreePoint[1])
    //                 console.log(`Free point OK`);
    //                 console.log(`PATH: ${JSON.stringify(Path)}`);
    //                 break;
    //             }
    //         }

    //         // if(FreePoint[FreePoint.length-1])
    //     }

    //     console.log(JSON.stringify(Path));










        // var hit = false;

        // for(const Wall of ModelWalls)
        // {
        //     var WallPoints = Wall.GetPoints();
        //     var ModelPos = model.GetPos();
        //     console.log(`MODEL POS : ${JSON.stringify(ModelPos)}`)
        //     var lineArray = this.GetLineByUnit(ModelPos[0], ModelPos[1], 300, 440, 1.0);
            
        //     for(const linePoint  of lineArray)
        //     {
        //         if(this.isInside(linePoint, WallPoints))
        //         {
        //             console.log(`Collision Detected at ${JSON.stringify(linePoint)}`);
        //             model.SetPos(linePoint[0], linePoint[1])
        //             hit = true;
        //             return;
        //         }
        //         else
        //         {
        //             console.log(`We are at ${JSON.stringify(linePoint)}, not hits so far`);
        //         }
        //     }

        // }

        // if(hit)
        // {
        //     console.log(`Yes! we hit the wall`)
            
        // }
        // else
        // {
            
        //     model.SetPos(lineArray[lineArray.length-1][0], lineArray[lineArray.length-1][1])
        //     console.log(`Nope our pass was too safe!`)
        // }

        // Wall.SetPos(300, 300);
        // Wall.SetShape(500, 300)

        // setTimeout(() => {

        //     var WallPos = Wall.GetPoints();
        //     for(const point of WallPos)
        //     {
        //         console.log(`${JSON.stringify(point)}`)
        //         CreateModel(point[0], point[1])
        //     }
            
        // }, 2000);
        
    // }, 4000);
    
}, 2000);



































