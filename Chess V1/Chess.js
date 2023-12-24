var rows=[].slice.call(document.getElementsByClassName("Row"));
for(x=0;x<rows.length;x++){
    row=rows[x];
    boxes=row.children;
    if((x+1)%2==0){
        for(var y=0;y<boxes.length;y++){
            box=boxes[y];
            if((y+1)%2==0){
                box.style.backgroundColor = "#0E3B43";
            }
            else{
                box.style.backgroundColor = "#A3BBAD";
            }
        }
    }
    else{
        for(y=0;y<boxes.length;y++){
            box=boxes[y]
            if((y+1)%2==0){
                box.style.backgroundColor = "#A3BBAD";
            }
            else{
                box.style.backgroundColor = "#0E3B43";
            }
        }
    }
};

function Wpawn(e){
    if(turn%2!=0 && !promoting){
        selectedpiece = e.currentTarget
        target=e.currentTarget
        targetrowindex=rows.indexOf(target.parentNode.parentNode)
        row=[].slice.call(rows[targetrowindex].children)
        targetboxindex=row.indexOf(target.parentNode)
        clearVS()
        clearVS()
        clearHT()
        clearHT()
        one=[].slice.call(rows[targetrowindex-1].children)
        if(!one[targetboxindex].hasChildNodes()){
            makeVS(targetrowindex-1,targetboxindex)
            if(targetrowindex==6){
                two=[].slice.call(rows[targetrowindex-2].children)
                if((!two[targetboxindex].hasChildNodes())){
                    makeVS(targetrowindex-2,targetboxindex)
                }
            }
        }
        if(targetboxindex+1<=7){
            if(one[targetboxindex+1].hasChildNodes()){
                if((one[targetboxindex+1].children[0].className=='BPawn')||(one[targetboxindex+1].children[0].className=='BRook')||(one[targetboxindex+1].children[0].className=='BBishop')||(one[targetboxindex+1].children[0].className=='BKnight')||(one[targetboxindex+1].children[0].className=='BQueen')){
                    highTake(targetrowindex-1,targetboxindex+1)
                }
            }
            if(targetrowindex==3&&rows[targetrowindex].children[targetboxindex+1].hasChildNodes()&&!one[targetboxindex+1].hasChildNodes()&&rows[targetrowindex].children[targetboxindex+1].children[0].className=='BPawn'&&rows[targetrowindex].children[targetboxindex+1].children[0].getAttribute('jumpOT')==turn-1){
                makeEnP(targetrowindex-1,targetboxindex+1,'w')
            }
        }
        if(targetboxindex-1>=0){
            if(one[targetboxindex-1].hasChildNodes()){
                if((one[targetboxindex-1].children[0].className=='BPawn')||(one[targetboxindex-1].children[0].className=='BRook')||(one[targetboxindex-1].children[0].className=='BBishop')||(one[targetboxindex-1].children[0].className=='BKnight')||(one[targetboxindex-1].children[0].className=='BQueen')){
                    highTake(targetrowindex-1,targetboxindex-1)
                }
            }
            if(targetrowindex==3&&rows[targetrowindex].children[targetboxindex-1].hasChildNodes()&&!one[targetboxindex-1].hasChildNodes()&&rows[targetrowindex].children[targetboxindex-1].children[0].className=='BPawn'&&rows[targetrowindex].children[targetboxindex-1].children[0].getAttribute('jumpOT')==turn-1){
                makeEnP(targetrowindex-1,targetboxindex-1,'w')
            }
        }

    }
}
function Bpawn(e){
    if(turn%2==0 && !promoting){
        selectedpiece = e.currentTarget
        target=e.currentTarget
        targetrowindex=rows.indexOf(target.parentNode.parentNode)
        row=[].slice.call(rows[targetrowindex].children)
        targetboxindex=row.indexOf(target.parentNode)
        clearVS()
        clearVS()
        clearHT()
        clearHT()
        one=[].slice.call(rows[targetrowindex+1].children)
        if(!one[targetboxindex].hasChildNodes()){
            makeVS(targetrowindex+1,targetboxindex)
            if(targetrowindex==1){
                two=[].slice.call(rows[targetrowindex+2].children)
                if(targetrowindex==1 && (!two[targetboxindex].hasChildNodes())){
                    makeVS(targetrowindex+2,targetboxindex)
                }
            }
        }
        if(targetboxindex+1<=7){
            if(one[targetboxindex+1].hasChildNodes()){
                if((one[targetboxindex+1].children[0].className=='WPawn')||(one[targetboxindex+1].children[0].className=='WRook')||(one[targetboxindex+1].children[0].className=='WBishop')||(one[targetboxindex+1].children[0].className=='WKnight')||(one[targetboxindex+1].children[0].className=='WQueen')){
                    highTake(targetrowindex+1,targetboxindex+1)
                }
            }
            if(targetrowindex==4&&rows[targetrowindex].children[targetboxindex+1].hasChildNodes()&&!one[targetboxindex+1].hasChildNodes()&&rows[targetrowindex].children[targetboxindex+1].children[0].className=='WPawn'&&rows[targetrowindex].children[targetboxindex+1].children[0].getAttribute('jumpOT')==turn-1){
                makeEnP(targetrowindex+1,targetboxindex+1,'b')
            }
        }
        if(targetboxindex-1>=0){
            if(one[targetboxindex-1].hasChildNodes()){
                if((one[targetboxindex-1].children[0].className=='WPawn')||(one[targetboxindex-1].children[0].className=='WRook')||(one[targetboxindex-1].children[0].className=='WBishop')||(one[targetboxindex-1].children[0].className=='WKnight')||(one[targetboxindex-1].children[0].className=='WQueen')){
                    highTake(targetrowindex+1,targetboxindex-1)
                }
            }
            if(targetrowindex==4&&rows[targetrowindex].children[targetboxindex-1].hasChildNodes()&&!one[targetboxindex-1].hasChildNodes()&&rows[targetrowindex].children[targetboxindex-1].children[0].className=='WPawn'&&rows[targetrowindex].children[targetboxindex-1].children[0].getAttribute('jumpOT')==turn-1){
                makeEnP(targetrowindex+1,targetboxindex-1,'b')
            }
        }
    }
}
function Wrook(e){
    if(turn%2!=0 && !promoting){
        clearVS()
        clearVS()
        clearHT()
        clearHT()
        selectedpiece = e.currentTarget
        target=e.currentTarget
        targetrowindex=rows.indexOf(target.parentNode.parentNode)
        raw=[].slice.call(rows[targetrowindex].children)
        targetboxindex=raw.indexOf(target.parentNode)
        x=targetrowindex-1
        while(x>=0){
            hello=rows[x].children[targetboxindex]
            if(!hello.hasChildNodes()){
                makeVS(x,targetboxindex)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn'){
                    highTake(x,targetboxindex)
                }
                break
            }
            x--
        }
        x=targetrowindex+1
        while(x<=7){
            hello=rows[x].children[targetboxindex]
            if(!hello.hasChildNodes()){
                makeVS(x,targetboxindex)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn'){
                    highTake(x,targetboxindex)
                }
                break
            }
            x++
        }
        x=targetboxindex-1
        while(x>=0){
            hello=raw[x]
            if(!hello.hasChildNodes()){
                makeVS(targetrowindex,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn'){
                    highTake(targetrowindex,x)
                }
                break
            }
            x--
        }
        x=targetboxindex+1
        while(x<=7){
            hello=raw[x]
            if(!hello.hasChildNodes()){
                makeVS(targetrowindex,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn'){
                    highTake(targetrowindex,x)
                }
                break
            }
            x++
        }
    }
}
function Brook(e){
    if(turn%2==0 && !promoting){
        clearVS()
        clearVS()
        clearHT()
        clearHT()
        selectedpiece = e.currentTarget
        target=e.currentTarget
        targetrowindex=rows.indexOf(target.parentNode.parentNode)
        raw=[].slice.call(rows[targetrowindex].children)
        targetboxindex=raw.indexOf(target.parentNode)
        x=targetrowindex-1
        while(x>=0){
            hello=rows[x].children[targetboxindex]
            if(!hello.hasChildNodes()){
                makeVS(x,targetboxindex)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn'){
                    highTake(x,targetboxindex)
                }
                break
            }
            x--
        }
        x=targetrowindex+1
        while(x<=7){
            hello=rows[x].children[targetboxindex]
            if(!hello.hasChildNodes()){
                makeVS(x,targetboxindex)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn'){
                    highTake(x,targetboxindex)
                }
                break
            }
            x++
        }
        x=targetboxindex-1
        while(x>=0){
            hello=raw[x]
            if(!hello.hasChildNodes()){
                makeVS(targetrowindex,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn'){
                    highTake(targetrowindex,x)
                }
                break
            }
            x--
        }
        x=targetboxindex+1
        while(x<=7){
            hello=raw[x]
            if(!hello.hasChildNodes()){
                makeVS(targetrowindex,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn'){
                    highTake(targetrowindex,x)
                }
                break
            }
            x++
        }
    }
}
function Bbishop(e){
    if(turn%2==0 && !promoting){
        clearVS()
        clearVS()
        clearHT()
        clearHT()
        selectedpiece = e.currentTarget
        target=e.currentTarget
        targetrowindex=rows.indexOf(target.parentNode.parentNode)
        raw=[].slice.call(rows[targetrowindex].children)
        targetboxindex=raw.indexOf(target.parentNode)
        x=targetboxindex-1
        y=targetrowindex-1
        while(!(x<0||y<0)){
            hello=rows[y].children[x]
            if(!hello.hasChildNodes()){
                makeVS(y,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn'){
                    highTake(y,x)
                }
                break
            }
            x--
            y--
        }
        x=targetboxindex+1
        y=targetrowindex-1
        while(!(x>7||y<0)){
            hello=rows[y].children[x]
            if(!hello.hasChildNodes()){
                makeVS(y,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn'){
                    highTake(y,x)
                }
                break
            }
            x++
            y--
        }
        x=targetboxindex-1
        y=targetrowindex+1
        while(!(x<0||y>7)){
            hello=rows[y].children[x]
            if(!hello.hasChildNodes()){
                makeVS(y,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn'){
                    highTake(y,x)
                }
                break
            }
            x--
            y++
        }
        x=targetboxindex+1
        y=targetrowindex+1
        while(!(x>7||y>7)){
            hello=rows[y].children[x]
            if(!hello.hasChildNodes()){
                makeVS(y,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn'){
                    highTake(y,x)
                }
                break
            }
            x++
            y++
        }
    }
}
function Wbishop(e){
    if(turn%2!=0 && !promoting){
        clearVS()
        clearVS()
        clearHT()
        clearHT()
        selectedpiece = e.currentTarget
        target=e.currentTarget
        targetrowindex=rows.indexOf(target.parentNode.parentNode)
        raw=[].slice.call(rows[targetrowindex].children)
        targetboxindex=raw.indexOf(target.parentNode)
        x=targetboxindex-1
        y=targetrowindex-1
        while(!(x<0||y<0)){
            hello=rows[y].children[x]
            if(!hello.hasChildNodes()){
                makeVS(y,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn'){
                    highTake(y,x)
                }
                break
            }
            x--
            y--
        }
        x=targetboxindex+1
        y=targetrowindex-1
        while(!(x>7||y<0)){
            hello=rows[y].children[x]
            if(!hello.hasChildNodes()){
                makeVS(y,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn'){
                    highTake(y,x)
                }
                break
            }
            x++
            y--
        }
        x=targetboxindex-1
        y=targetrowindex+1
        while(!(x<0||y>7)){
            hello=rows[y].children[x]
            if(!hello.hasChildNodes()){
                makeVS(y,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn'){
                    highTake(y,x)
                }
                break
            }
            x--
            y++
        }
        x=targetboxindex+1
        y=targetrowindex+1
        while(!(x>7||y>7)){
            hello=rows[y].children[x]
            if(!hello.hasChildNodes()){
                makeVS(y,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn'){
                    highTake(y,x)
                }
                break
            }
            x++
            y++
        }
    }
}
function Wqueen(e){
    if(turn%2!=0 && !promoting){
        clearVS()
        clearVS()
        clearHT()
        clearHT()
        selectedpiece = e.currentTarget
        target=e.currentTarget
        targetrowindex=rows.indexOf(target.parentNode.parentNode)
        raw=[].slice.call(rows[targetrowindex].children)
        targetboxindex=raw.indexOf(target.parentNode)
        x=targetboxindex-1
        y=targetrowindex-1
        while(!(x<0||y<0)){
            hello=rows[y].children[x]
            if(!hello.hasChildNodes()){
                makeVS(y,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn'){
                    highTake(y,x)
                }
                break
            }
            x--
            y--
        }
        x=targetboxindex+1
        y=targetrowindex-1
        while(!(x>7||y<0)){
            hello=rows[y].children[x]
            if(!hello.hasChildNodes()){
                makeVS(y,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn'){
                    highTake(y,x)
                }
                break
            }
            x++
            y--
        }
        x=targetboxindex-1
        y=targetrowindex+1
        while(!(x<0||y>7)){
            hello=rows[y].children[x]
            if(!hello.hasChildNodes()){
                makeVS(y,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn'){
                    highTake(y,x)
                }
                break
            }
            x--
            y++
        }
        x=targetboxindex+1
        y=targetrowindex+1
        while(!(x>7||y>7)){
            hello=rows[y].children[x]
            if(!hello.hasChildNodes()){
                makeVS(y,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn'){
                    highTake(y,x)
                }
                break
            }
            x++
            y++
        }
        x=targetrowindex-1
        while(x>=0){
            hello=rows[x].children[targetboxindex]
            if(!hello.hasChildNodes()){
                makeVS(x,targetboxindex)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn'){
                    highTake(x,targetboxindex)
                }
                break
            }
            x--
        }
        x=targetrowindex+1
        while(x<=7){
            hello=rows[x].children[targetboxindex]
            if(!hello.hasChildNodes()){
                makeVS(x,targetboxindex)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn'){
                    highTake(x,targetboxindex)
                }
                break
            }
            x++
        }
        x=targetboxindex-1
        while(x>=0){
            hello=raw[x]
            if(!hello.hasChildNodes()){
                makeVS(targetrowindex,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn'){
                    highTake(targetrowindex,x)
                }
                break
            }
            x--
        }
        x=targetboxindex+1
        while(x<=7){
            hello=raw[x]
            if(!hello.hasChildNodes()){
                makeVS(targetrowindex,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn'){
                    highTake(targetrowindex,x)
                }
                break
            }
            x++
        }
    }
}
function Bqueen(e){
    if(turn%2==0 && !promoting){
        clearVS()
        clearVS()
        clearHT()
        clearHT()
        selectedpiece = e.currentTarget
        target=e.currentTarget
        targetrowindex=rows.indexOf(target.parentNode.parentNode)
        raw=[].slice.call(rows[targetrowindex].children)
        targetboxindex=raw.indexOf(target.parentNode)
        x=targetboxindex-1
        y=targetrowindex-1
        while(!(x<0||y<0)){
            hello=rows[y].children[x]
            if(!hello.hasChildNodes()){
                makeVS(y,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn'){
                    highTake(y,x)
                }
                break
            }
            x--
            y--
        }
        x=targetboxindex+1
        y=targetrowindex-1
        while(!(x>7||y<0)){
            hello=rows[y].children[x]
            if(!hello.hasChildNodes()){
                makeVS(y,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn'){
                    highTake(y,x)
                }
                break
            }
            x++
            y--
        }
        x=targetboxindex-1
        y=targetrowindex+1
        while(!(x<0||y>7)){
            hello=rows[y].children[x]
            if(!hello.hasChildNodes()){
                makeVS(y,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn'){
                    highTake(y,x)
                }
                break
            }
            x--
            y++
        }
        x=targetboxindex+1
        y=targetrowindex+1
        while(!(x>7||y>7)){
            hello=rows[y].children[x]
            if(!hello.hasChildNodes()){
                makeVS(y,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn'){
                    highTake(y,x)
                }
                break
            }
            x++
            y++
        }
        x=targetrowindex-1
        while(x>=0){
            hello=rows[x].children[targetboxindex]
            if(!hello.hasChildNodes()){
                makeVS(x,targetboxindex)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn'){
                    highTake(x,targetboxindex)
                }
                break
            }
            x--
        }
        x=targetrowindex+1
        while(x<=7){
            hello=rows[x].children[targetboxindex]
            if(!hello.hasChildNodes()){
                makeVS(x,targetboxindex)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn'){
                    highTake(x,targetboxindex)
                }
                break
            }
            x++
        }
        x=targetboxindex-1
        while(x>=0){
            hello=raw[x]
            if(!hello.hasChildNodes()){
                makeVS(targetrowindex,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn'){
                    highTake(targetrowindex,x)
                }
                break
            }
            x--
        }
        x=targetboxindex+1
        while(x<=7){
            hello=raw[x]
            if(!hello.hasChildNodes()){
                makeVS(targetrowindex,x)
            }
            else if(hello.hasChildNodes()){
                if(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn'){
                    highTake(targetrowindex,x)
                }
                break
            }
            x++
        }
    }
}
function Bknight(e){
    if(turn%2==0 && !promoting){
        clearVS()
        clearVS()
        clearHT()
        clearHT()
        selectedpiece = e.currentTarget
        target=e.currentTarget
        targetrowindex=rows.indexOf(target.parentNode.parentNode)
        row=[].slice.call(rows[targetrowindex].children)
        targetboxindex=row.indexOf(target.parentNode)
        if(targetrowindex+2<=7){
            if(targetboxindex+1<=7){
                hello=rows[targetrowindex+2].children[targetboxindex+1]
                if(!rows[targetrowindex+2].children[targetboxindex+1].hasChildNodes()){
                    makeVS(targetrowindex+2,targetboxindex+1)
                }
                else if(rows[targetrowindex+2].children[targetboxindex+1].hasChildNodes()&&(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn')){
                    highTake(targetrowindex+2,targetboxindex+1)
                }
            }
            if(targetboxindex-1>=0){
                hello=rows[targetrowindex+2].children[targetboxindex-1]
                if(!rows[targetrowindex+2].children[targetboxindex-1].hasChildNodes()){
                    makeVS(targetrowindex+2,targetboxindex-1)
                }
                else if(rows[targetrowindex+2].children[targetboxindex-1].hasChildNodes()&&(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn')){
                    highTake(targetrowindex+2,targetboxindex-1)}
            }
        }
        if(targetrowindex-2>=0){
            if(targetboxindex+1<=7){
                hello=rows[targetrowindex-2].children[targetboxindex+1]
                if(!rows[targetrowindex-2].children[targetboxindex+1].hasChildNodes()){
                    makeVS(targetrowindex-2,targetboxindex+1)
                }
                else if(rows[targetrowindex-2].children[targetboxindex+1].hasChildNodes()&&(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn')){
                    highTake(targetrowindex-2,targetboxindex+1)
                }
            }
            if(targetboxindex-1>=0){
            hello=rows[targetrowindex-2].children[targetboxindex-1]
            if(!rows[targetrowindex-2].children[targetboxindex-1].hasChildNodes()){
                makeVS(targetrowindex-2,targetboxindex-1)
            }
            else if(rows[targetrowindex-2].children[targetboxindex-1].hasChildNodes()&&(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn')){
                highTake(targetrowindex-2,targetboxindex-1)
            }
            }
        }
        if(targetrowindex+1<=7){
            if(targetboxindex+2<=7){
                hello=rows[targetrowindex+1].children[targetboxindex+2]
                if(!rows[targetrowindex+1].children[targetboxindex+2].hasChildNodes()){
                    makeVS(targetrowindex+1,targetboxindex+2)
                }
                else if(rows[targetrowindex+1].children[targetboxindex+2].hasChildNodes()&&(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn')){
                    highTake(targetrowindex+1,targetboxindex+2)
                }
            }
            if(targetboxindex-2>=0){
                hello=rows[targetrowindex+1].children[targetboxindex-2]
                if(!rows[targetrowindex+1].children[targetboxindex-2].hasChildNodes()){
                    makeVS(targetrowindex+1,targetboxindex-2)
                }
                else if(rows[targetrowindex+1].children[targetboxindex-2].hasChildNodes()&&(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn')){
                    highTake(targetrowindex+1,targetboxindex-2)
                }
            }
        }
        if(targetrowindex-1>=0){
            if(targetboxindex+2<=7){
                hello=rows[targetrowindex-1].children[targetboxindex+2]
                if(!rows[targetrowindex-1].children[targetboxindex+2].hasChildNodes()){
                    makeVS(targetrowindex-1,targetboxindex+2)
                }
                else if(rows[targetrowindex-1].children[targetboxindex+2].hasChildNodes()&&(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn')){
                    highTake(targetrowindex-1,targetboxindex+2)
                }
            }
            if(targetboxindex-2>=0){
                hello=rows[targetrowindex-1].children[targetboxindex-2]
                if(!rows[targetrowindex-1].children[targetboxindex-2].hasChildNodes()){
                    makeVS(targetrowindex-1,targetboxindex-2)
                }
                else if(rows[targetrowindex-1].children[targetboxindex-2].hasChildNodes()&&(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn')){
                    highTake(targetrowindex-1,targetboxindex-2)
                }
            }
        }
    }
}
function Wknight(e){
    if(turn%2!=0 && !promoting){
        clearVS()
        clearVS()
        clearHT()
        clearHT()
        selectedpiece = e.currentTarget
        target=e.currentTarget
        targetrowindex=rows.indexOf(target.parentNode.parentNode)
        row=[].slice.call(rows[targetrowindex].children)
        targetboxindex=row.indexOf(target.parentNode)
        if(targetrowindex+2<=7){
            if(targetboxindex+1<=7){
                hello=rows[targetrowindex+2].children[targetboxindex+1]
                if(!rows[targetrowindex+2].children[targetboxindex+1].hasChildNodes()){
                    makeVS(targetrowindex+2,targetboxindex+1)
                }
                else if(rows[targetrowindex+2].children[targetboxindex+1].hasChildNodes()&&(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn')){
                    highTake(targetrowindex+2,targetboxindex+1)
                }
            }
            if(targetboxindex-1>=0){
                hello=rows[targetrowindex+2].children[targetboxindex-1]
                if(!rows[targetrowindex+2].children[targetboxindex-1].hasChildNodes()){
                    makeVS(targetrowindex+2,targetboxindex-1)
                }
                else if(rows[targetrowindex+2].children[targetboxindex-1].hasChildNodes()&&(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn')){
                    highTake(targetrowindex+2,targetboxindex-1)}
            }
        }
        if(targetrowindex-2>=0){
            if(targetboxindex+1<=7){
                hello=rows[targetrowindex-2].children[targetboxindex+1]
                if(!rows[targetrowindex-2].children[targetboxindex+1].hasChildNodes()){
                    makeVS(targetrowindex-2,targetboxindex+1)
                }
                else if(rows[targetrowindex-2].children[targetboxindex+1].hasChildNodes()&&(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn')){
                    highTake(targetrowindex-2,targetboxindex+1)
                }
            }
            if(targetboxindex-1>=0){
                hello=rows[targetrowindex-2].children[targetboxindex-1]
                if(!rows[targetrowindex-2].children[targetboxindex-1].hasChildNodes()){
                    makeVS(targetrowindex-2,targetboxindex-1)
                }
                else if(rows[targetrowindex-2].children[targetboxindex-1].hasChildNodes()&&(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn')){
                    highTake(targetrowindex-2,targetboxindex-1)
                }
            }
        }
        if(targetrowindex+1<=7){
            if(targetboxindex+2<=7){
                hello=rows[targetrowindex+1].children[targetboxindex+2]
                if(!rows[targetrowindex+1].children[targetboxindex+2].hasChildNodes()){
                    makeVS(targetrowindex+1,targetboxindex+2)
                }
                else if(rows[targetrowindex+1].children[targetboxindex+2].hasChildNodes()&&(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn')){
                    highTake(targetrowindex+1,targetboxindex+2)
                }
            }
            if(targetboxindex-2>=0){
                hello=rows[targetrowindex+1].children[targetboxindex-2]
                if(!rows[targetrowindex+1].children[targetboxindex-2].hasChildNodes()){
                    makeVS(targetrowindex+1,targetboxindex-2)
                }
                else if(rows[targetrowindex+1].children[targetboxindex-2].hasChildNodes()&&(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn')){
                    highTake(targetrowindex+1,targetboxindex-2)
                }
            }
        }
        if(targetrowindex-1<=7){
            if(targetboxindex+2<=7){
                hello=rows[targetrowindex-1].children[targetboxindex+2]
                if(!rows[targetrowindex-1].children[targetboxindex+2].hasChildNodes()){
                    makeVS(targetrowindex-1,targetboxindex+2)
                }
                else if(rows[targetrowindex-1].children[targetboxindex+2].hasChildNodes()&&(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn')){
                    highTake(targetrowindex-1,targetboxindex+2)
                }
            }
            if(targetboxindex-2>=0){
                hello=rows[targetrowindex-1].children[targetboxindex-2]
                if(!rows[targetrowindex-1].children[targetboxindex-2].hasChildNodes()){
                    makeVS(targetrowindex-1,targetboxindex-2)
                }
                else if(rows[targetrowindex-1].children[targetboxindex-2].hasChildNodes()&&(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn')){
                    highTake(targetrowindex-1,targetboxindex-2)
                }
            }
        }
    }
}
function Wking(e){
    if(turn%2!=0 && !promoting){
        clearVS()
        clearVS()
        clearHT()
        clearHT()
        selectedpiece = e.currentTarget
        target=e.currentTarget
        targetrowindex=rows.indexOf(target.parentNode.parentNode)
        row=[].slice.call(rows[targetrowindex].children)
        targetboxindex=row.indexOf(target.parentNode)
        if(targetrowindex+1<=7){
            if(targetboxindex+1<=7){
                hello=rows[targetrowindex+1].children[targetboxindex+1]
                if(!rows[targetrowindex+1].children[targetboxindex+1].hasChildNodes()){
                    makeVS(targetrowindex+1,targetboxindex+1)
                }
                else if(rows[targetrowindex+1].children[targetboxindex+1].hasChildNodes()&&(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn')){
                    highTake(targetrowindex+1,targetboxindex+1)
                }
            }
            if(targetboxindex-1>=0){
                hello=rows[targetrowindex+1].children[targetboxindex-1]
                if(!rows[targetrowindex+1].children[targetboxindex-1].hasChildNodes()){
                    makeVS(targetrowindex+1,targetboxindex-1)
                }
                else if(rows[targetrowindex+1].children[targetboxindex-1].hasChildNodes()&&(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn')){
                    highTake(targetrowindex+1,targetboxindex-1)}
            }
            hello=rows[targetrowindex+1].children[targetboxindex]
            if(!rows[targetrowindex+1].children[targetboxindex].hasChildNodes()){
                makeVS(targetrowindex+1,targetboxindex)
            }
            else if(rows[targetrowindex+1].children[targetboxindex].hasChildNodes()&&(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn')){
                highTake(targetrowindex+1,targetboxindex)}
        }
        if(targetrowindex-1>=0){
            if(targetboxindex+1<=7){
                hello=rows[targetrowindex-1].children[targetboxindex+1]
                if(!rows[targetrowindex-1].children[targetboxindex+1].hasChildNodes()){
                    makeVS(targetrowindex-1,targetboxindex+1)
                }
                else if(rows[targetrowindex-1].children[targetboxindex+1].hasChildNodes()&&(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn')){
                    highTake(targetrowindex-1,targetboxindex+1)
                }
            }
            if(targetboxindex-1>=0){
                hello=rows[targetrowindex-1].children[targetboxindex-1]
                if(!rows[targetrowindex-1].children[targetboxindex-1].hasChildNodes()){
                    makeVS(targetrowindex-1,targetboxindex-1)
                }
                else if(rows[targetrowindex-1].children[targetboxindex-1].hasChildNodes()&&(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn')){
                    highTake(targetrowindex-1,targetboxindex-1)}
            }
            hello=rows[targetrowindex-1].children[targetboxindex]
            if(!rows[targetrowindex-1].children[targetboxindex].hasChildNodes()){
                makeVS(targetrowindex-1,targetboxindex)
            }
            else if(rows[targetrowindex-1].children[targetboxindex].hasChildNodes()&&(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn')){
                highTake(targetrowindex-1,targetboxindex)}
        }
        if(targetboxindex+1<=7){
            hello=rows[targetrowindex].children[targetboxindex+1]
            if(!rows[targetrowindex].children[targetboxindex+1].hasChildNodes()){
                makeVS(targetrowindex,targetboxindex+1)
            }
            else if(rows[targetrowindex].children[targetboxindex+1].hasChildNodes()&&(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn')){
                highTake(targetrowindex,targetboxindex+1)
            }
        }
        if(targetboxindex-1>=0){
            hello=rows[targetrowindex].children[targetboxindex-1]
            if(!rows[targetrowindex].children[targetboxindex-1].hasChildNodes()){
                makeVS(targetrowindex,targetboxindex-1)
            }
            else if(rows[targetrowindex].children[targetboxindex-1].hasChildNodes()&&(hello.children[0].className=='BQueen'||hello.children[0].className=='BKnight'||hello.children[0].className=='BBishop'||hello.children[0].className=='BRook'||hello.children[0].className=='BPawn')){
                highTake(targetrowindex,targetboxindex-1)}
        }
        if(target.getAttribute('hasmoved')=='false'){
            if(row[7].children[0].getAttribute('hasmoved')=='false'){
                if(!row[targetboxindex+2].hasChildNodes()){
                    makeCS(targetrowindex,targetboxindex+2)
                }
            }
            if(row[0].children[0].getAttribute('hasmoved')=='false'){
                if(!row[targetboxindex-2].hasChildNodes()){
                    makeCS(targetrowindex,targetboxindex-2)
                }
            }
        }
    }
}
function Bking(e){
    if(turn%2==0 && !promoting){
        clearVS()
        clearVS()
        clearHT()
        clearHT()
        selectedpiece = e.currentTarget
        target=e.currentTarget
        targetrowindex=rows.indexOf(target.parentNode.parentNode)
        row=[].slice.call(rows[targetrowindex].children)
        targetboxindex=row.indexOf(target.parentNode)
        if(targetrowindex+1<=7){
            if(targetboxindex+1<=7){
                hello=rows[targetrowindex+1].children[targetboxindex+1]
                if(!rows[targetrowindex+1].children[targetboxindex+1].hasChildNodes()){
                    makeVS(targetrowindex+1,targetboxindex+1)
                }
                else if(rows[targetrowindex+1].children[targetboxindex+1].hasChildNodes()&&(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn')){
                    highTake(targetrowindex+1,targetboxindex+1)
                }
            }
            if(targetboxindex-1>=0){
                hello=rows[targetrowindex+1].children[targetboxindex-1]
                if(!rows[targetrowindex+1].children[targetboxindex-1].hasChildNodes()){
                    makeVS(targetrowindex+1,targetboxindex-1)
                }
                else if(rows[targetrowindex+1].children[targetboxindex-1].hasChildNodes()&&(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn')){
                    highTake(targetrowindex+1,targetboxindex-1)}
            }
            hello=rows[targetrowindex+1].children[targetboxindex]
            if(!rows[targetrowindex+1].children[targetboxindex].hasChildNodes()){
                makeVS(targetrowindex+1,targetboxindex)
            }
            else if(rows[targetrowindex+1].children[targetboxindex].hasChildNodes()&&(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn')){
                highTake(targetrowindex+1,targetboxindex)}
        }
        if(targetrowindex-1>=0){
            if(targetboxindex+1<=7){
                hello=rows[targetrowindex-1].children[targetboxindex+1]
                if(!rows[targetrowindex-1].children[targetboxindex+1].hasChildNodes()){
                    makeVS(targetrowindex-1,targetboxindex+1)
                }
                else if(rows[targetrowindex-1].children[targetboxindex+1].hasChildNodes()&&(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn')){
                    highTake(targetrowindex-1,targetboxindex+1)
                }
            }
            if(targetboxindex-1>=0){
                hello=rows[targetrowindex-1].children[targetboxindex-1]
                if(!rows[targetrowindex-1].children[targetboxindex-1].hasChildNodes()){
                    makeVS(targetrowindex-1,targetboxindex-1)
                }
                else if(rows[targetrowindex-1].children[targetboxindex-1].hasChildNodes()&&(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn')){
                    highTake(targetrowindex-1,targetboxindex-1)}
            }
            hello=rows[targetrowindex-1].children[targetboxindex]
            if(!rows[targetrowindex-1].children[targetboxindex].hasChildNodes()){
                makeVS(targetrowindex-1,targetboxindex)
            }
            else if(rows[targetrowindex-1].children[targetboxindex].hasChildNodes()&&(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn')){
                highTake(targetrowindex-1,targetboxindex)}
        }
        if(targetboxindex+1<=7){
            hello=rows[targetrowindex].children[targetboxindex+1]
            if(!rows[targetrowindex].children[targetboxindex+1].hasChildNodes()){
                makeVS(targetrowindex,targetboxindex+1)
            }
            else if(rows[targetrowindex].children[targetboxindex+1].hasChildNodes()&&(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn')){
                highTake(targetrowindex,targetboxindex+1)
            }
        }
        if(targetboxindex-1>=0){
            hello=rows[targetrowindex].children[targetboxindex-1]
            if(!rows[targetrowindex].children[targetboxindex-1].hasChildNodes()){
                makeVS(targetrowindex,targetboxindex-1)
            }
            else if(rows[targetrowindex].children[targetboxindex-1].hasChildNodes()&&(hello.children[0].className=='WQueen'||hello.children[0].className=='WKnight'||hello.children[0].className=='WBishop'||hello.children[0].className=='WRook'||hello.children[0].className=='WPawn')){
                highTake(targetrowindex,targetboxindex-1)}
        }
        if(target.getAttribute('hasmoved')=='false'){
            if(row[7].children[0].getAttribute('hasmoved')=='false'){
                if(!row[targetboxindex+2].hasChildNodes()){
                    makeCS(targetrowindex,targetboxindex+2)
                }
            }
            if(row[0].children[0].getAttribute('hasmoved')=='false'){
                if(!row[targetboxindex-2].hasChildNodes()){
                    makeCS(targetrowindex,targetboxindex-2)
                }
            }
        }
    }
}

var promoting = false
// shows valid squares and moves piece when square is clicked
function makeVS(tri,tbi){
    var ValidS=document.createElement('button')
    circle = document.createElement('div')
    circle.className = 'ValidS'
    ValidS.appendChild(circle),
    ValidS.addEventListener('click',function(e){
        newloc=e.currentTarget.parentNode
        pc=selectedpiece
        newloc.removeChild(e.currentTarget)
        pc.parentNode.removeChild(pc)
        newloc.appendChild(pc)
        pcri=rows.indexOf(pc.parentNode.parentNode)
        row=[].slice.call(rows[pcri].children)
        pcbi=row.indexOf(pc.parentNode)
        clearVS()
        clearVS()
        clearHT()
        clearHT()
        if(pc.className=='WPawn'||pc.className=='BPawn'){
            if((pc.getAttribute('hasmoved')=='false') && (pcri==3||pcri==4)){
                pc.setAttribute('jumpOT',turn)
            }
            if(pcri==0||pcri==7){
                promoting=true
            }
        }
        if(promoting){
            Promote(pc)
        }
        turn+=1
        Turntext=document.getElementsByClassName('Turn')[0]
        Turntext.innerHTML = 'Turn: '+turn
        pc.setAttribute('hasmoved',true)
        move = (turn%2)==0 ? 'Black':'White'
        Movetext.innerHTML = 'Move: '+move
    })
    row=[].slice.call(rows[tri].children)
    row[tbi].appendChild(ValidS)
}

// Make Enpassant Square
function makeEnP(tri,tbi,color){
    var ValidS=document.createElement('button')
    circle = document.createElement('div')
    circle.className = 'ValidS'
    ValidS.appendChild(circle),
    ValidS.addEventListener('click',function(e){
        newloc=e.currentTarget.parentNode
        pc=selectedpiece
        newloc.removeChild(e.currentTarget)
        pc.parentNode.removeChild(pc)
        newloc.appendChild(pc)

        EPri=rows.indexOf(pc.parentNode.parentNode)
        row=[].slice.call(rows[EPri].children)
        EPbi=row.indexOf(pc.parentNode)
        if(color=='w'){
            rows[EPri+1].children[EPbi].removeChild(rows[EPri+1].children[EPbi].children[0])
        }
        if(color=='b'){
            rows[EPri-1].children[EPbi].removeChild(rows[EPri-1].children[EPbi].children[0])
        }
        clearVS()
        clearVS()
        clearHT()
        clearHT()
        turn+=1
        Turntext=document.getElementsByClassName('Turn')[0]
        Turntext.innerHTML = 'Turn: '+turn
        pc.setAttribute('hasmoved',true)
        move = (turn%2)==0 ? 'Black':'White'
        Movetext.innerHTML = 'Move: '+move
    })
    row=[].slice.call(rows[tri].children)
    row[tbi].appendChild(ValidS)
}

// PROMOTING STUFF
function Promote(pc){
    P=document.getElementsByClassName('WPromote')[0]
    B=P.getElementsByClassName('PBox')
    if(pc.className=='WPawn'){
        PR=document.createElement('button')
        PR.className='PWRook'
        PR.addEventListener('click', function(e){
            selectedpiece.className=e.currentTarget.className.slice(1)
            selectedpiece.removeEventListener('click',Wpawn)
            selectedpiece.addEventListener('click',Wrook)
            P.style.visibility='hidden'
            promoting=false
        })
        B[0].appendChild(PR)
        PK=document.createElement('button')
        PK.className='PWKnight'
        PK.addEventListener('click', function(e){
            selectedpiece.className=e.currentTarget.className.slice(1)
            selectedpiece.removeEventListener('click',Wpawn)
            selectedpiece.addEventListener('click',Wknight)
            P.style.visibility='hidden'
            promoting=false
        })
        B[1].appendChild(PK)
        PB=document.createElement('button')
        PB.className='PWBishop'
        PB.addEventListener('click', function(e){
            selectedpiece.className=e.currentTarget.className.slice(1)
            selectedpiece.removeEventListener('click',Wpawn)
            selectedpiece.addEventListener('click',Wbishop)
            P.style.visibility='hidden'
            promoting=false
        })
        B[2].appendChild(PB)
        PQ=document.createElement('button')
        PQ.className='PWQueen'
        PQ.addEventListener('click', function(e){
            selectedpiece.className=e.currentTarget.className.slice(1)
            selectedpiece.removeEventListener('click',Wpawn)
            selectedpiece.addEventListener('click',Wqueen)
            P.style.visibility='hidden'
            promoting=false
        })
        B[3].appendChild(PQ)
    }
    else if(pc.className=='BPawn'){
        PPR=document.createElement('button')
        PR.className='PBRook'
        PR.addEventListener('click', function(e){
            selectedpiece.className=e.currentTarget.className.slice(1)
            selectedpiece.removeEventListener('click',Bpawn)
            selectedpiece.addEventListener('click',Brook)
            P.style.visibility='hidden'
            promoting=false
        })
        B[0].appendChild(PR)
        PK=document.createElement('button')
        PK.className='PBKnight'
        PK.addEventListener('click', function(e){
            selectedpiece.className=e.currentTarget.className.slice(1)
            selectedpiece.removeEventListener('click',Bpawn)
            selectedpiece.addEventListener('click',Bknight)
            P.style.visibility='hidden'
            promoting=false
        })
        B[1].appendChild(PK)
        PB=document.createElement('button')
        PB.className='PBBishop'
        PB.addEventListener('click', function(e){
            selectedpiece.className=e.currentTarget.className.slice(1)
            selectedpiece.removeEventListener('click',Bpawn)
            selectedpiece.addEventListener('click',Bbishop)
            P.style.visibility='hidden'
            promoting=false
        })
        B[2].appendChild(PB)
        PQ=document.createElement('button')
        PQ.className='PBQueen'
        PQ.addEventListener('click', function(e){
            selectedpiece.className=e.currentTarget.className.slice(1)
            selectedpiece.removeEventListener('click',Bpawn)
            selectedpiece.addEventListener('click',Bqueen)
            P.style.visibility='hidden'
            promoting=false
        })
        B[3].appendChild(PQ)
    }
    P.style.visibility='visible'
}

//Make Check Square
function makeCS(targetrow,targetboxindex){
    var CalidS=document.createElement('button')
    circle = document.createElement('div')
    circle.className = 'ValidS'
    CalidS.appendChild(circle),
    CalidS.addEventListener('click',function(e){
        newloc=e.currentTarget.parentNode
        pc=selectedpiece
        newloc.removeChild(e.currentTarget)
        pc.parentNode.removeChild(pc)
        newloc.appendChild(pc)
        clearVS()
        clearVS()
        clearHT()
        clearHT()
        if(targetboxindex==6){
            row=[].slice.call(rows[targetrow].children)
            rk=row[7].children[0]
            row[5].appendChild(rk)
        }
        else{
            row=[].slice.call(rows[targetrow].children)
            rk=row[0].children[0]
            row[3].appendChild(rk)
        }
        turn+=1
        Turntext=document.getElementsByClassName('Turn')[0]
        Turntext.innerHTML = 'Turn: '+turn
        pc.setAttribute('hasmoved',true)
        move = (turn%2)==0 ? 'Black':'White'
        Movetext.innerHTML = 'Move: '+move
    })
    row=[].slice.call(rows[targetrow].children)
    row[targetboxindex].appendChild(CalidS)
}

// Clear valid Squares
function clearVS(){
    Vsquares=[].slice.call(document.getElementsByClassName('ValidS'))
    for(x=0;x<Vsquares.length;x+=1){
        vs=Vsquares[x].parentNode
        vs.parentNode.removeChild(vs)
    }
}

// Clear board
function clearB(){
    clear=document.getElementsByClassName('Box')
    for(x=0;x<clear.length;x++){
        while(clear[x].hasChildNodes()){
            clear[x].removeChild(clear[x].children[0])
        }
    }
}

// Fill board
function fillB(){
    BProw=rows[1].children
    for(x=0;x<BProw.length;x++){
        BP=document.createElement('button')
        BP.className = 'BPawn'
        BProw[x].appendChild(BP)
    }
    WProw=rows[6].children
    for(x=0;x<BProw.length;x++){
        WP=document.createElement('button')
        WP.className = 'WPawn'
        WProw[x].appendChild(WP)
    }
    WR=document.createElement('button')
    WR.className='WRook'
    rows[7].children[0].appendChild(WR)
    WR=document.createElement('button')
    WR.className='WRook'
    rows[7].children[7].appendChild(WR)
    BR=document.createElement('button')
    BR.className='BRook'
    rows[0].children[0].appendChild(BR)
    BR=document.createElement('button')
    BR.className='BRook'
    rows[0].children[7].appendChild(BR)

    WN=document.createElement('button')
    WN.className='WKnight'
    rows[7].children[1].appendChild(WN)
    WN=document.createElement('button')
    WN.className='WKnight'
    rows[7].children[6].appendChild(WN)
    BN=document.createElement('button')
    BN.className='BKnight'
    rows[0].children[1].appendChild(BN)
    BN=document.createElement('button')
    BN.className='BKnight'
    rows[0].children[6].appendChild(BN)

    WB=document.createElement('button')
    WB.className='WBishop'
    rows[7].children[2].appendChild(WB)
    WB=document.createElement('button')
    WB.className='WBishop'
    rows[7].children[5].appendChild(WB)
    BB=document.createElement('button')
    BB.className='BBishop'
    rows[0].children[2].appendChild(BB)
    BB=document.createElement('button')
    BB.className='BBishop'
    rows[0].children[5].appendChild(BB)

    WK=document.createElement('button')
    WK.className='WKing'
    rows[7].children[4].appendChild(WK)
    WQ=document.createElement('button')
    WQ.className='WQueen'
    rows[7].children[3].appendChild(WQ)
    BK=document.createElement('button')
    BK.className='BKing'
    rows[0].children[4].appendChild(BK)
    BQ=document.createElement('button')
    BQ.className='BQueen'
    rows[0].children[3].appendChild(BQ)
}

// Make new game function
Newbutt=document.getElementsByClassName('Newgame')
Newbutt=Newbutt[0]
Newbutt.addEventListener('click',function(e){
    clearB()
    fillB()
    pbjs()
    promoting=false
    turn=1
    Turntext=document.getElementsByClassName('Turn')[0]
    Turntext.innerHTML = 'Turn: '+turn
})

// Clear Board button
Clearbutt=document.getElementsByClassName('ClearBoard')[0]
Clearbutt.addEventListener('click',function(e){
    clearB()
    pbjs()
    turn=1
    Turntext=document.getElementsByClassName('Turn')[0]
    Turntext.innerHTML = 'Turn: '+turn
})

// Turn Button
Turnbutt=document.getElementsByClassName('IncTurn')[0]
Turnbutt.addEventListener('click',function(e){
    turn+=1
    Turntext=document.getElementsByClassName('Turn')[0]
    Turntext.innerHTML = 'Turn: '+turn
})

// Highlight pieces to take
function highTake(targetrow,targetboxindex){
    var highTake=document.createElement('button')
    high = document.createElement('div')
    high.className = 'TakeS'
    highTake.appendChild(high),
    highTake.addEventListener('click',function(e){
        newloc=e.currentTarget.parentNode
        pc=selectedpiece
        newloc.removeChild(e.currentTarget)
        newloc.removeChild(newloc.children[0])
        pc.parentNode.removeChild(pc)
        newloc.appendChild(pc)
        clearVS()
        clearVS()
        clearHT()
        clearHT()
        turn+=1
        Turntext=document.getElementsByClassName('Turn')[0]
        Turntext.innerHTML = 'Turn: '+turn
        pc.setAttribute('hasmoved',true)
        move = (turn%2)==0 ? 'Black':'White'
        Movetext.innerHTML = 'Move: '+move
    })
    row=[].slice.call(rows[targetrow].children)
    row[targetboxindex].appendChild(highTake)
}

// Clear Take Squares
function clearHT(){
    hightakes=[].slice.call(document.getElementsByClassName('TakeS'))
    for(x=0;x<hightakes.length;x++){
        ht=hightakes[x].parentNode
        ht.parentNode.removeChild(ht)
    }
}

var selectedpiece = 'penis'
var Bincheck
var piececheckB
var Wincheck
var piececheckW

function pbjs(){
// Make Black Pawn
var BPawns=document.getElementsByClassName('BPawn')
for(x=0;x<BPawns.length;x++){
    const BPawn=BPawns[x]
    BPawn.setAttribute('hasmoved', false)
    BPawn.addEventListener("click", Bpawn)
}

// Make White Pawn
var WPawns=document.getElementsByClassName('WPawn')
for(x=0;x<WPawns.length;x++){
    const WPawn=WPawns[x]
    WPawn.setAttribute('hasmoved', false)
    WPawn.addEventListener("click", Wpawn)
}

// Make White Rook
var WRooks=document.getElementsByClassName('WRook')
for(x=0;x<WRooks.length;x++){
    const WRook=WRooks[x]
    WRook.setAttribute('hasmoved', false)
    WRook.addEventListener('click',Wrook)
}

// Make Black Rook
var BRooks=document.getElementsByClassName('BRook')
for(x=0;x<BRooks.length;x++){
    const BRook=BRooks[x]
    BRook.setAttribute('hasmoved', false)
    BRook.addEventListener('click',Brook)
}

// Make Black Bishop
var BBishops=document.getElementsByClassName('BBishop')
for(x=0;x<BBishops.length;x++){
    const BBishop=BBishops[x]
    BBishop.addEventListener('click',Bbishop)
}

// Make White Bishop
var WBishops=document.getElementsByClassName('WBishop')
for(x=0;x<WBishops.length;x++){
    const WBishop=WBishops[x]
    WBishop.addEventListener('click',Wbishop)
}

// Make White Queen
var WQueens=document.getElementsByClassName('WQueen')
for(x=0;x<WQueens.length;x++){
    const WQueen=WQueens[x]
    WQueen.addEventListener('click',Wqueen)
}
// Make White Queen
var BQueens=document.getElementsByClassName('BQueen')
for(x=0;x<BQueens.length;x++){
    const BQueen=BQueens[x]
    BQueen.addEventListener('click',Bqueen)
}

// Make Black Knight
var BKnights=document.getElementsByClassName('BKnight')
for(x=0;x<BKnights.length;x++){
    const BKnight=BKnights[x]
    BKnight.addEventListener("click", Bknight)
}

// Make White Knight
var WKnights=document.getElementsByClassName('WKnight')
for(x=0;x<WKnights.length;x++){
    const WKnight=WKnights[x]
    WKnight.addEventListener("click", Wknight)
}

// Make White King
var WKings=document.getElementsByClassName('WKing')
for(x=0;x<WKings.length;x++){
    const WKing=WKings[x]
    WKing.setAttribute('hasmoved', false)
    WKing.addEventListener("click", Wking)
}

// Make Black King
var BKings=document.getElementsByClassName('BKing')
for(x=0;x<BKings.length;x++){
    const BKing=BKings[x]
    BKing.setAttribute('hasmoved',false)
    BKing.addEventListener("click", Bking)
}
}

turn=1
Turntext=document.getElementsByClassName('Turn')[0]
Turntext.innerHTML = 'Turn: '+turn
Movetext=document.getElementsByClassName('Move')[0]
move = (turn%2)==0 ? 'Black':'White'
Movetext.innerHTML = 'Move: '+move
P=document.getElementsByClassName('WPromote')[0]   
P.style.visibility = "hidden"
pbjs()