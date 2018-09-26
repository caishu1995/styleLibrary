var data = [{
    "pp": "pp1",
    "tt": "tttttttttttttttttttttttttt",
    "uu": "uu1",
    "ss": "ss1",
    "dd": "dd1",
    "ue":"ue"
},{
    "pp": "pp2",
    "tt": "tttttttttttttttttttttttttt",
    "uu": "uu1",
    "ss": "ss1",
    "dd": "dd1",
    "ue":"ue"
},{
    "pp": "pp2",
    "tt": "tttttttttttttttttttttttttt",
    "uu": "uu2",
    "ss": "ss1",
    "dd": "dd1",
    "ue":"ue"
},{
    "pp": "pp2",
    "tt": "tttttttttttttttttttttttttt",
    "uu": "uu2",
    "ss": "ss2",
    "dd": "dd1",
    "ue":"ue"
},{
    "pp": "pp3",
    "tt": "tttttttttttttttttttttttttt",
    "uu": "uu1",
    "ss": "ss1",
    "dd": "dd1",
    "ue":"ue"
},{
    "pp": "pp3",
    "tt": "tttttttttttttttttttttttttt",
    "uu": "uu2",
    "ss": "ss1",
    "dd": "dd1",
    "ue":"ue"
}];


var lastChange = 0;
var str = [];
var oldpp = "", olduu = "", olddd = "";
while(lastChange < data.length){
    for(var i = lastChange; i < data.length; i++){
        if(data[i].pp != oldpp){
            if(oldpp != ""){
                str.push("</div></div></div></div></div></div></div>");
                oldpp = "";
                olduu = "";
                olddd = "";
            }

            str.push("<div class=\"allRow\"><div class=\"ppShow\">" + data[lastChange].pp + "</div>");
            str.push("<div class=\"ppOtherShow\"><div class=\"ttShow\"><input readonly value='" + data[lastChange].tt + "'></div><div class=\"ttOtherShow\">");

            oldpp = data[i].pp;
        }


        if(data[i].uu != olduu){
            if(olduu != "") {
                str.push("</div></div></div></div>");
                olduu = "";
                olddd = "";
            }

            str.push("<div class=\"row\"><div class=\"uuShow\">" + data[lastChange].uu + "</div><div class=\"uuOtherShow\">");

            olduu = data[i].uu;
        }


        if(data[i].dd != olddd){
            if(olddd != "") {
                str.push("</div></div>");
            }


            str.push("<div class=\"content\"><div class=\"ddShow\">" + data[lastChange].dd + "</div><div class=\"ddOtherShow\">");
            olddd = data[i].dd;
        }

        str.push("<ul class=\"otherShow\"><li>" + data[lastChange].ss + "</li><li>" + data[lastChange].ue + "</li></ul>");

        lastChange++;
    }
    lastChange++;
}
document.getElementById("table1").getElementsByClassName("tbody")[0].innerHTML = str.join("");
