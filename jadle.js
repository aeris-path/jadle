//kira hat  1.440 x 900


//load-dictionary

    //WICHTIG: C:\ funktioniert nicht, es muss HTTP, etc. sein. Also Webserver auf lokalem PC einrichten 
    //oder website machen, damit datei abgerufen und bearbeitet wird. Rest funktioniert, NUR Zeile 6 bis 14 nicht. 

    // $.get("C:\Users\paulm\OneDrive\Desktop\jadle\wordle-dictionary.txt",function(returnedData) {
    //     $("#dic").text(returnedData);
    // },"text/plain");
    // var text = $("#element").text();
    // var words = text.split("\n");
    // var dictionary = new Array();
    // for(var i=0; i < words.length; i++) {
    //     dictionary[i] = words[i];
    // }


let xc=30;
let yc=20;
let num = 1;
const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let catalog = [];
//game ursprünglich rgb(113, 113, 113)

let catalogDE = ["jadle","kirus","liebe","druck","musik","marla","immer","blume","deins"];
let catalogENG = ["booty","dance","train","dream"]
if(Math.floor(Math.random() * 2+1)==1){
    document.getElementById("language").innerHTML = "Deutsch";
    catalog = catalogDE;
}else{
    document.getElementById("language").innerHTML = "Englisch";
    catalog = catalogENG;
}
let word1 = catalog[Math.floor(Math.random() * (catalog.length))];
    //word1 = "kirus";
    console.log(word1);
    let charlist = word1.split('');
    let sol1 = charlist[0];
    let sol2 = charlist[1];
    let sol3 = charlist[2];
    let sol4 = charlist[3];
    let sol5 = charlist[4];

    let round = 1;
    let activeInput = true;

for(y = 0; y<5; y++){
    for(x = 0; x<5; x++){
        let box = document.createElement("div");
            box.setAttribute("id","letterbox"+num.toString());
            box.setAttribute("name",y.toString()+x.toString());
            box.setAttribute("number",num);
            box.setAttribute("content","");
            box.classList.add("square");
                box.style.width = '100%';
                box.style.height = '100%';
                box.style.backgroundColor = 'rgb(83, 83, 83)';
                box.style.display = 'block';
                // box.style.justifyContent = 'center';
                box.style.borderStyle='dashed'; box.style.borderRadius='2px'; box.style.borderColor= 'rgb(100, 100, 100)';
                // box.style.position = 'relative';
                // box.style.top = yc.toString()+'px';
                // box.style.left = xc.toString()+'px';
        let text = document.createElement("h1");
            text.setAttribute("id","textbox"+num.toString());
            text.setAttribute("number",num);
                text.style.width = '70px';
                text.style.height = '70px';
                text.style.position = 'absolute'; 
                text.style.color = 'rgb(50, 50, 50)';
                text.style.fontSize = '70px';
                text.style.content = "w";
                text.style.fontWeight = 'normal';
                text.style.marginBlockStart = '0em';
                text.style.marginBlockEnd = '0em';
                text.style.textAlign = 'center';
        document.getElementById("letterboxes").appendChild(box);
        document.getElementById("letterbox"+num.toString()).appendChild(text);
        num++;
        xc += 100;
    }
    yc += 100;
    xc = 30;
}

function setup(){
    if(Math.floor(Math.random() * 2+1)==1){
        document.getElementById("language").innerHTML = "Deutsch";
        catalog = catalogDE;
    }else{
        document.getElementById("language").innerHTML = "Englisch";
        catalog = catalogENG;
    }
    let temp = catalog[Math.floor(Math.random() * (catalog.length))];
    if(word1==temp){
        temp = catalog[Math.floor(Math.random() * (catalog.length))];
    }

    word1=temp;
    console.log(word1)

    charlist = word1.split('');
    sol1 = charlist[0];
    sol2 = charlist[1];
    sol3 = charlist[2];
    sol4 = charlist[3];
    sol5 = charlist[4];

    //console.log("setup"+sol1);
    //console.log(word1+"  "+sol1+sol2+sol3+sol4+sol5);

    round = 1;
    let activeInput = true;
    document.getElementById("pointer").style.top = '19%';
    pointer.setAttribute("counter",0);
    for(i=1;i<=25;i++){
        let doc = document.getElementById("letterbox"+i);
        doc.setAttribute("content","");
        doc.style.backgroundColor = 'rgb(83, 83, 83)';
        doc.style.borderStyle='dashed'; 
        doc.style.borderRadius='2px'; 
        doc.style.borderColor= 'rgb(100, 100, 100)';
        let textdoc = document.getElementById("textbox"+i);
        textdoc.innerHTML = "";

        document.getElementById(alphabet[i]+"k").style.backgroundColor = 'rgb(83, 83, 83)';
    }
    document.getElementById("ak").style.backgroundColor = 'rgb(83, 83, 83)';
}

function enqueue(buchstabe){
    //point-management
        pointer.setAttribute("counter",parseInt(pointer.getAttribute("Counter"))+1);
        
        let point = parseInt(pointer.getAttribute("counter"));
        //console.log("enqueue "+point+" in round "+round);
    //animation
        const tempAnim = $(('#letterbox'+point)).removeClass('pochenAnim');
        window.setTimeout(() => { $(('#letterbox'+point)).addClass('pochenAnim'); }, 50);
    //update-letterbox
        document.getElementById("letterbox"+point).setAttribute("content",buchstabe);
        document.getElementById("letterbox"+point).style.borderStyle = "solid";
        document.getElementById("letterbox"+point).style.backgroundColor = 'rgb(80, 80, 80)';
        document.getElementById("letterbox"+point).style.borderColor = 'rgb(70, 70, 70)';
    //update-text-box
        document.getElementById("textbox"+point).innerHTML = buchstabe;
        
        
    if(point==5*round){
        //input active
        activeInput = false;
    }
}
function del(){
    //point-management
        let point = parseInt(pointer.getAttribute("counter"));
        //console.log("del"+point);
        if(point==5*round){
            activeInput = true;
        }
        if(point>=(1+round*5-5)){
            pointer.setAttribute("counter",parseInt(pointer.getAttribute("Counter"))-1);
            //update-letterbox
                document.getElementById("letterbox"+point).setAttribute("content","");
                document.getElementById("letterbox"+point).style.borderStyle = "dashed";
                document.getElementById("letterbox"+point).style.backgroundColor = 'rgb(83, 83, 83)';
                document.getElementById("letterbox"+point).style.borderColor = 'rgb(100, 100, 100)';
            //update-text-box
                document.getElementById("textbox"+point).innerHTML = "";
        }
        
}
function enter(){
    let point = parseInt(pointer.getAttribute("counter"));
    //let y1=false;let y2=false;let y3=false;let y4=false;let y5=false;
    //let g1=false;let g2=false;let g3=false;let g4=false;let g5=false;
    let word =(document.getElementById("letterbox"+(point-4)).getAttribute("content")
                +document.getElementById("letterbox"+(point-3)).getAttribute("content")
                +document.getElementById("letterbox"+(point-2)).getAttribute("content")
                +document.getElementById("letterbox"+(point-1)).getAttribute("content")
                +document.getElementById("letterbox"+(point-0)).getAttribute("content")  )
    if(dic(word)){
        let yellowList = [0,0,0,0,0];
        let greenList = [0,0,0,0,0];

        if(point==5*round){
            let inputlist= [document.getElementById("letterbox"+(point-4)), //j
                            document.getElementById("letterbox"+(point-3)), //o
                            document.getElementById("letterbox"+(point-2)), //d
                            document.getElementById("letterbox"+(point-1)), //l
                            document.getElementById("letterbox"+(point-0)) ]//e
            //compare-letters-decide-color
                for(inputInt=0;inputInt<5;inputInt++){
                    for(charInt=0;charInt<5;charInt++){
                        if(inputlist[inputInt].getAttribute("content")==charlist[charInt]){
                            if(inputInt==charInt){ //&&yellowList[inputInt]!=1
                                greenList[inputInt]=1;
                            }else{
                                yellowList[inputInt]=1;
                            }
                        }
                    }
                }
            //then ggf. makeYellow / makeGreen
                //let inputYellow= [y1,y2,y3,y4,y5];
                //let inputGreen = [g1,g2,g3,g4,g5];
                makeYellow(inputlist,yellowList);
                makeGreen(inputlist,greenList);
                makeDark(inputlist,greenList,yellowList);
            //game-end?
                if(greenList[0]==1&&greenList[1]==1&&greenList[2]==1&&greenList[3]==1&&greenList[4]==1){ //right-word
                    endGame(true);
                }else{
                    round++;
                    if(round>=6){ //too-many-trys
                        endGame(false);
                    }else{
                        document.getElementById("pointer").style.top = (9*(round-1)+18.5)+'%';
                    }  
                }
                activeInput = true;
        }
    }else{
        console.log("Wort nicht vorhanden:"+word);
    }
}


function makeYellow(inputs,list){
    for(i=0;i<5;i++){
        //console.log(list[i])
        if(list[i]==1){
            //console.log(inputs[i])
            inputs[i].style.backgroundColor = 'rgb(255, 242, 0)';
            document.getElementById(inputs[i].getAttribute("content")+"k").style.backgroundColor = 'rgb(217, 199, 61)';
        }
    }
}
function makeGreen(inputs,list){
    for(i=0;i<5;i++){
            //console.log(list[i])
        if(list[i]==1){
            inputs[i].style.backgroundColor = 'rgb(0, 154, 10)';
            document.getElementById(inputs[i].getAttribute("content")+"k").style.backgroundColor = 'rgb(17 132 26)';//rgb(0, 130, 10)
        }
    }
}

function makeDark(inputs,greenList,yellowList){
    for(i=0;i<5;i++){
        if(greenList[i]==0&&yellowList[i]==0){
                //console.log(inputs[i].getAttribute("content"))
            //make-field-dark
                inputs[i].style.backgroundColor = 'rgb(60, 60,60)';
            //make-button-dark
                document.getElementById(inputs[i].getAttribute("content")+"k").style.backgroundColor = 'rgb(60 60 60)';//rgb(0, 130, 10)
        }
    }
}

function endGame(winBool){
    if(winBool){
        //win
        console.log("WIN");
        let winbool = true;
        popup(winbool);
    }else{
        //lose
        console.log("LOSE");
        let winbool = false;
        popup(winbool);
    }
}

function popup(winbool){

    if(winbool){
        //win
        document.getElementById("popuph1").innerHTML = "Congratulations!";
        document.getElementById("popuph1").style.color = "rgb(255, 217, 18)";
        document.getElementById("popuph4").innerHTML = "You did it!";
        document.getElementById("describ1").innerHTML = "You beat the game in   ";
        document.getElementById("roundh1").innerHTML = round.toString();
        document.getElementById("describ2").innerHTML = "rounds!<br><br><br><br>Just click on this window to do another round! Love you! <3"
    }else{
        document.getElementById("popuph1").innerHTML = "Maybe next time...";
        document.getElementById("popuph1").style.color = 'rgb(189, 27, 27)';
        document.getElementById("popuph4").innerHTML = "...but you did great anyway!";
        document.getElementById("describ2").innerHTML = "Just click on this window to do another round! Love you! <3";
    }

    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    //console.log("popup-open")
}

function restart(){
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    setup();
    
    //console.log("restart"+sol1);
    //console.log("restart done")
}

function dic(word) {
    var dictionary = new Array("lllll","javax","python","swift","htmlx","phpxx","jadle","kirus","liebe","druck","musik","marla","immer","blume","deins");
    var flag = 0;
    for(var i = 0; i < dictionary.length; i++) {
        if(dictionary[i] == word) {
            return true;
        }
        if(i == dictionary.length - 1) {
            return false;
        }
    }
    return false;
}

function a(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "a";
        enqueue(buchstabe);
    }
}
function b(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "b";
        enqueue(buchstabe);
    }
}
function c(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "c";
        enqueue(buchstabe);
    } 
}
function d(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "d";
        enqueue(buchstabe);
    }
}
function e(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "e";
        enqueue(buchstabe);
    }
}
function f(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "f";
        enqueue(buchstabe);
    }
}
function g(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "g";
        enqueue(buchstabe);
    }
}
function h(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "h";
        enqueue(buchstabe);
    }
}
function ki(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
            let buchstabe = "i";
            enqueue(buchstabe);
        }
}
function j(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "j";
        enqueue(buchstabe);
    }
}
function k(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "k";
        enqueue(buchstabe);
    }
}
function l(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "l";
        enqueue(buchstabe);
    }
}
function m(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "m";
        enqueue(buchstabe);
    }
}
function n(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "n";
        enqueue(buchstabe);
    }
}
function o(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "o";
        enqueue(buchstabe);
    }
}
function p(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "p";
        enqueue(buchstabe);
    }
}
function q(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "q";
        enqueue(buchstabe);
    }
}
function r(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "r";
        enqueue(buchstabe);
    }
}
function s(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "s";
        enqueue(buchstabe);
    }
}
function t(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "t";
        enqueue(buchstabe);
    }
}
function u(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "u";
        enqueue(buchstabe);
    }
}
function v(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "v";
        enqueue(buchstabe);
    }
}
function w(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "w";
        enqueue(buchstabe);
    }
}
function xk(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "x";
        enqueue(buchstabe);
    }
}
function yk(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "y";
        enqueue(buchstabe);
    }
}
function z(){ //<button onclick="b()" type="button">b</button>
    if(activeInput){
        let buchstabe = "z";
        enqueue(buchstabe);
    }
}


/*


            for(i=0;i<5;i++){ 
                console.log("testing " + inputlist[i].getAttribute("content") + "(i=" + i + ")");
                currentWord = inputlist[i].getAttribute("content");
                if(sol1==currentWord){
                     //s = 0 = leer, 1 = yellow, 2 = green
                    if(i==0&&!y1){
                        //grün
                        g1=true;
                        //console.log("g1 - green");
                    }else{
                        y1=true;
                        //console.log("y1 - yellow");
                    }
                }
                if(sol2==currentWord){
                    if(i==1&&!y2){
                        //grün
                        g2=true;
                        //console.log("g2 - green");
                    }else{
                        y2=true;
                        //console.log("y2 - yellow");
                    }
                    //console.log("s2=" + s2 + ", input[1]=" + inputlist[i].getAttribute("content"))
                }
                if(sol3==currentWord){
                    if(i==2&&!y3){
                        //grün
                        g3=true;
                        //console.log("g3 - green");
                    }else{
                        y3=true;
                        //console.log("y3 - yellow");
                    }
                    //console.log("s3=" + s3 + ", input[2]=" + inputlist[i].getAttribute("content"))
                }
                if(sol4==currentWord){
                    if(i==3&&!y4){
                        //grün
                        g4=true;
                        //console.log("g4 - green");
                    }else{
                        y4=true;
                        //console.log("y4 - yellow");
                    }
                    //console.log("s4=" + s4 + ", input[3]=" + inputlist[i].getAttribute("content"))
                }
                if(sol5==currentWord){
                    if(i==4&&!y5){
                        //grün
                        g5=true;
                        //console.log("g5 - green");
                    }else{
                        y5=true;
                        //console.log("y5 - yellow");
                    }
                    //console.log("s5=" + s5 + ", input[4]=" + inputlist[i].getAttribute("content"))
                }
                //console.log(y1.toString()+" "+y2.toString()+" "+y3.toString()+" "+y4.toString()+" "+y5.toString())
                //console.log(g1.toString()+" "+g2.toString()+" "+g3.toString()+" "+g4.toString()+" "+g5.toString())
            }


matches = document.querySelectorAll("div[id='letterbox']");
                matches.forEach(
                    function(currentIndex,listObj){
                        console.log("heyyo");
                        switch(parseInt(currentIndex.getAttribute("posY"))){
                            case 0:
                                console.log(currentIndex.style.top);
                                currentIndex.style.top = (parseInt(currentIndex.style.top)+100).toString()+'px';
                                break;
                            case 1:
                                currentIndex.style.top = (parseInt(currentIndex.style.top)+150).toString()+'px';
                                break;
                            case 2:
                                currentIndex.style.top = (parseInt(currentIndex.style.top)+200).toString()+'px';
                                break;
                            case 3:
                                currentIndex.style.top = (parseInt(currentIndex.style.top)+250).toString()+'px';
                                break;
                            case 4:
                                currentIndex.style.top = (parseInt(currentIndex.style.top)+300).toString()+'px';
                                break;
                        }

                        currentIndex.style.top = (parseInt(currentIndex.style.top)+x).toString()+'px';
                        currentIndex.style.left = (parseInt(currentIndex.style.left)+y).toString()+'px';
                        x = x+50; y=  x+20;   
                        console.log(currentIndex.style.top.toString());
                    }
                )
                */