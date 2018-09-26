///初始化数据
var initData = [
    {
        "type":"table",
        "Point":{"PointX":"100.00","PointY":"20.00"},
        "Height":"8.00",
        "Width":"60.00",
        "Text":{"Font":"华文楷体","FontSize":"18"},
        "Column":[
            {"ColumnWidth":"19.33","ColumnBound":"1","ColumnName":"123"},
            {"ColumnWidth":"19.33","ColumnBound":"2","ColumnName":"223"},
            {"ColumnWidth":"19.33","ColumnBound":"3","ColumnName":"323"}
        ]
    },{
        "type":"characters",
        "Point":{"PointX":"51.00","PointY":"31.00"},
        "Height":"8.00",
        "Width":"55.00",
        "Text":{"Font":"华文楷体","FontSize":"18"},
        "Content":"这是我的第一个label"
    }
];

//初始化放置位置
var baseDiv = document.getElementById("part1");
var dropPlace = baseDiv.getElementsByClassName("basePart")[0];
var detailPlace = baseDiv.getElementsByClassName("detailCase")[0];
var seeContent = baseDiv.getElementsByClassName("seeDetail");

//初始化属性控制
//"getRealResult": 获得DOM结构的内容
//"getShowResult": 获得真实的内容
//"show": 获得属性区展示的内容
//"set" : 更改DOM中的内容
var config = {
    crossRangeProportion: 1/3, //横向比例。 实际/展示
    verticalProportion: 1/3, //横向比例。 实际/展示

    //坐标的设置和获得
    Point:{
        //X坐标的设置和获得
        PointX: {
            "getRealResult": function(value) {
                return (value / config.crossRangeProportion).toFixed(2) + "px";
            },
            "getShowResult": function(value) {
                return (value * config.crossRangeProportion).toFixed(2);
            },
            "show": function(thisEle) {
                return "<div class=\"rowPart\"><label>X轴</label><input value=" + config.Point.PointX.getShowResult(thisEle.offsetLeft) + " onchange='config.Point.PointX.set(this)'></div>";
            },
            "set": function(thisEle) {
                seeContent[0].style.left = config.Point.PointX.getRealResult(thisEle.value);
            }
        },
        //Y坐标的设置和获得
        PointY: {
            "getRealResult": function(value) {
                return (value / config.crossRangeProportion).toFixed(2) + "px";
            },
            "getShowResult": function(value) {
                return (value * config.crossRangeProportion).toFixed(2);
            },
            "show": function(thisEle) {
                return "<div class=\"rowPart\"><label>Y轴</label><input class='pointYContent' value=" + config.Point.PointY.getShowResult(thisEle.offsetTop) + " onchange='config.Point.PointY.set(this)'></div>";
            },
            "set": function(thisEle) {
                seeContent[0].style.top = config.Point.PointY.getRealResult(thisEle.value);
            }
        },
        "show": function(thisEle) {
            return "<div class=\"twoRow\"><label>坐标</label><div class='rowDetailContent'>" + config.Point.PointX.show(thisEle) + config.Point.PointY.show(thisEle) + "</div></div>";
        }
    },

    //高度的设置和获得
    Height: {
        "getRealResult": function(value) {
            return (value / config.verticalProportion).toFixed(2) + "px";
        },
        "getShowResult": function(value) {
            return (value * config.verticalProportion).toFixed(2);
        },
        "show": function(thisEle) {
            return "<div class=\"rowPart\"><label>高度</label><input class='heightContent' value=" + config.Height.getShowResult(thisEle.clientHeight) + " onchange='config.Height.set(this)'></div>";
        },
        "set": function(thisEle) {
            seeContent[0].style.height = config.Height.getRealResult(thisEle.value);
        }
    },

    //宽度的设置和获得
    Width: {
        "getRealResult": function(value) {
            return (value / config.crossRangeProportion).toFixed(2) + "px";
        },
        "getShowResult": function(value) {
            return (value * config.crossRangeProportion).toFixed(2);
        },
        "show": function(thisEle) {
            return "<div class=\"rowPart\"><label>宽度</label><input value=" + config.Width.getShowResult(thisEle.clientWidth) + " onchange='config.Width.set(this)'></div>";
        },
        "set": function(thisEle) {
            seeContent[0].style.width = config.Width.getRealResult(thisEle.value);
        }
    },

    //文字的设置和获得
    Text:{
        //字体的设置和获得
        Font: {
            "getRealResult": function(value) {
                return value;
            },
            "getShowResult": function(value) {
                return value;
            },
            "show": function(thisEle) {
                var font = config.Text.Font.getShowResult(thisEle.style.fontFamily);

                var str = "<div class=\"rowPart\"><label>字体</label><select onchange='config.Text.Font.set(this)'>";
                str += "<option " + (font == "宋体"? "selected": "") + ">宋体</option>";
                str += "<option " + (font == "华文楷体"? "selected": "") + ">华文楷体</option>";
                str += "</select></div>";
                return str;
            },
            "set": function(thisEle) {
                seeContent[0].style.fontFamily = config.Text.Font.getRealResult(thisEle.value);
            }
        },
        //字号的设置和获得
        FontSize: {
            "getRealResult": function(value) {
                return value + "px";
            },
            "getShowResult": function(value) {
                return value.slice(0, value.length - 2);
            },
            "show": function(thisEle) {
                var fontSize = config.Text.FontSize.getShowResult(thisEle.style.fontSize);
                var str = "<div class=\"rowPart\"><label>字号</label><select onchange='config.Text.FontSize.set(this)'>";
                str += "<option " + (fontSize == "16"? "selected": "") + ">16</option>";
                str += "<option " + (fontSize == "18"? "selected": "") + ">18</option>";
                str += "<option " + (fontSize == "20"? "selected": "") + ">20</option>";
                str += "<option " + (fontSize == "22"? "selected": "") + ">22</option>";
                str += "</select></div>";
                return str;
            },
            "set": function(thisEle) {
                seeContent[0].style.fontSize = config.Text.FontSize.getRealResult(thisEle.value);
            }
        },
        "show": function(thisEle) {
            return "<div class=\"twoRow\"><label>文字</label><div class='rowDetailContent'>" + config.Text.Font.show(thisEle) + config.Text.FontSize.show(thisEle) + "</div></div>";
        }
    },

    //内容的设置和获得
    Content: {
        "getRealResult": function(value) {
            return value;
        },
        "getShowResult": function(value) {
            return value;
        },
        "show": function(thisEle) {
            return "<div class=\"twoRow\"><label>内容</label><textarea onchange='config.Content.set(this)'>" + config.Content.getShowResult(thisEle.innerText) + "</textarea></div>";
        },
        "set": function(thisEle) {
            seeContent[0].innerText = config.Content.getRealResult(thisEle.value);
        }
    },

    //列名的设置和获得
    Column: {
        "show": function(thisEle) {
            var result = "<div class=\"severalRow\"><label>列</label><table><thead><tr><td>列名</td><td>数据名称</td><td>列宽</td><td></td></tr></thead><tbody>";
            var list = thisEle.children;
            for(var i = 0; i < list.length; i++){
                if(list[i].className != "deleteStyle"){
                    result += "<tr data-index='" + i + "'><td>" + config.Column.ColumnName.show(list[i]) + "</td><td>" + config.Column.ColumnBound.show(list[i]) + "</td><td>" + config.Column.ColumnWidth.show(list[i]) + "</td><td>" + config.Column.ColumnDelete.show(list[i]) + "</td></tr>";
                }
            }
            result += config.Column.new().outerHTML;
            result += "</tbody></table></div>";
            return result;
        },
        "new": function(thisEle) {
            var tr = document.createElement("tr");
            tr.setAttribute("data-index", -1);
            tr.innerHTML = "<td>" + config.Column.ColumnName.show() + "</td><td>" + config.Column.ColumnBound.show() + "</td><td>" + config.Column.ColumnWidth.show() + "</td><td>" + config.Column.ColumnDelete.show() + "</td>";
            return tr;
        },
        "getShowResult": function(thisEle) {
            var result = [];
            var list = thisEle.children;
            for(var i = 0; i < list.length; i++){
                if(list[i].className != "deleteStyle"){
                    result.push({
                        "ColumnWidth": config.Column.ColumnWidth.getShowResult(list[i].offsetWidth),
                        "ColumnBound": config.Column.ColumnBound.getShowResult(list[i].dataset.bound),
                        "ColumnName": config.Column.ColumnName.getShowResult(list[i].innerText)
                    });
                }
            }
            return result;
        },

        "ColumnWidth": {
            "getRealResult": function(value) {
                return (value / config.crossRangeProportion).toFixed(2) + "px";

            },
            "getShowResult": function(value) {
                if(value == "") return 50;

                return (value * config.crossRangeProportion).toFixed(2);
            },
            "show": function(thisEle) {
                var value =  (thisEle != undefined) ? config.Column.ColumnWidth.getShowResult(thisEle.offsetWidth): "";
                return "<input value='" + value + "' onchange='config.Column.ColumnWidth.set(this)' />";
            },
            "set": function(thisEle) {
                var index = thisEle.parentNode.parentNode.dataset.index;
                var width = config.Column.ColumnWidth.getRealResult(thisEle.value);

                //如果存在，修改宽度
                if(index != -1) {
                    var baseDiv = seeContent[0].children[index];
                    baseDiv.style.width = width;
                } else {
                    //如果不存在，创建一个
                    var newLi = document.createElement("li");
                    newLi.style.width = width;
                    newLi.setAttribute("data-bound", "");
                    seeContent[0].appendChild(newLi);

                    //修改属性区内容
                    thisEle.parentNode.parentNode.dataset.index = seeContent[0].children.length - 1;

                    //追加行
                    thisEle.parentNode.parentNode.parentNode.appendChild(config.Column.new());
                }
            }
        },
        "ColumnBound": {
            "getRealResult": function(value) {
                return value;
            },
            "getShowResult": function(value) {
                return value;
            },
            "show": function(thisEle) {
                var value = (thisEle != undefined) ? config.Column.ColumnBound.getShowResult(thisEle.dataset.bound): "";
                return "<input value='" + value + "' onchange='config.Column.ColumnBound.set(this)' />";
            },
            "set": function(thisEle) {
                var index = thisEle.parentNode.parentNode.dataset.index;
                var baseDiv = seeContent[0].children[index];
                var ColumnBound = config.Column.ColumnBound.getRealResult(thisEle.value);

                //如果存在，修改宽度
                if(index != -1) {
                    baseDiv.dataset.bound = ColumnBound;
                } else {
                    //如果不存在，创建一个
                    var newLi = document.createElement("li");
                    newLi.setAttribute("data-bound", ColumnBound);
                    seeContent[0].appendChild(newLi);

                    //修改属性区内容
                    thisEle.parentNode.parentNode.dataset.index = seeContent[0].children.length - 1;

                    //追加行
                    thisEle.parentNode.parentNode.parentNode.appendChild(config.Column.new());
                }
            }
        },
        "ColumnName": {
            "getRealResult": function(value) {
                return value;
            },
            "getShowResult": function(value) {
                return value;
            },
            "show": function(thisEle) {
                var value =  (thisEle != undefined) ? config.Column.ColumnName.getShowResult(thisEle.innerText) : "";
                return "<input value='" + value + "' onchange='config.Column.ColumnName.set(this)'  />";
            },
            "set": function(thisEle) {
                var index = thisEle.parentNode.parentNode.dataset.index;
                var baseDiv = seeContent[0].children[index];
                var value = config.Column.ColumnName.getRealResult(thisEle.value);

                //如果存在，修改宽度
                if(index != -1) {
                    baseDiv.innerText = value;
                } else {
                    //如果不存在，创建一个
                    var newLi = document.createElement("li");
                    newLi.innerText = value;
                    newLi.setAttribute("data-bound", "");
                    seeContent[0].appendChild(newLi);

                    //修改属性区内容
                    thisEle.parentNode.parentNode.dataset.index = seeContent[0].children.length - 1;

                    //追加行
                    thisEle.parentNode.parentNode.parentNode.appendChild(config.Column.new());
                }
            }
        },
        "ColumnDelete": {
            "show": function(thisEle) {
                return "<button onclick='config.Column.ColumnDelete.set(this)'>删除</button>";
            },
            "set": function(thisEle) {
                var index = thisEle.parentNode.parentNode.dataset.index;
                if(index == -1) return;

                //添加隐藏样式
                var baseDiv = seeContent[0].children[index];
                baseDiv.classList.add("deleteStyle");

                //删除当前展示
                var thisRow = thisEle.parentNode.parentNode;
                thisRow.parentNode.removeChild(thisRow);
            }
        }
    }
};


///初始化，根据数据创建元素
function init(data) {
    var thisEle = dropPlace;
    for(var i = 0; i < data.length; i++){
        var type = data[i].type;
        var ele = null;

        //根据类型创建元素，并初始化属性
        switch(type){
            case "characters":
                var ele = document.createElement("pre");
                ele.className = "charactersStyle";
                ele.setAttribute("data-type", "characters");
                ele.innerText = config.Content.getRealResult(data[i].Content);
                break;
            case "table":
                var ele = document.createElement("ul");
                ele.className = "tableStyle";
                ele.setAttribute("data-type", "table");
                for(var j = 0; j < data[i].Column.length; j++){
                    var str = "<li data-bound='";
                    str += (data[i].Column[j].ColumnBound != undefined) ? config.Column.ColumnBound.getRealResult(data[i].Column[j].ColumnBound) : "";
                    str += "'";
                    str += (data[i].Column[j].ColumnWidth != undefined) ? (" style='width: " + config.Column.ColumnWidth.getRealResult(data[i].Column[j].ColumnWidth) + "'") : "";
                    str += ">";
                    str += (data[i].Column[j].ColumnName != undefined) ? config.Column.ColumnName.getRealResult(data[i].Column[j].ColumnName) : "";
                    str += "</li>";

                    ele.innerHTML += str;
                }
                break;
        }
        if(data[i].Point != undefined){
            ele.style.top = config.Point.PointY.getRealResult(data[i].Point.PointY);
            ele.style.left = config.Point.PointX.getRealResult(data[i].Point.PointX);
        }
        if(data[i].Height != undefined){ ele.style.height = config.Height.getRealResult(data[i].Height);}
        if(data[i].Width != undefined){ ele.style.width = config.Width.getRealResult(data[i].Width);}
        if(data[i].Text != undefined){
            ele.style.fontFamily = config.Text.Font.getRealResult(data[i].Text.Font);
            ele.style.fontSize = config.Text.FontSize.getRealResult(data[i].Text.FontSize);
        } else {
            ele.style.fontFamily = "Arial";
            ele.style.fontSize = "16px";
        }

        ele.draggable = true;
        ele.onclick = function(e) {
            //标记当前内容
            while(seeContent.length)
                seeContent[0].classList.remove("seeDetail");
            this.classList.add("seeDetail");

            ///改变属性
            var htmlShow = [];
            htmlShow.push(config.Point.show(this));
            htmlShow.push(config.Width.show(this));
            htmlShow.push(config.Height.show(this));
            htmlShow.push(config.Text.show(this));
            switch(this.dataset.type){
                case "characters":
                    htmlShow.push(config.Content.show(this));
                    break;
                case "table":
                    htmlShow.push(config.Column.show(this));
                    break;
            }
            detailPlace.children[1].innerHTML = htmlShow.join("");

            event.stopPropagation();
        };
        ele.ondragstart = function(e) {
            e.dataTransfer.setData('Text', e.offsetX + ";" + e.offsetY);
            this.parentNode.moveChild = this;
        };
        ele.ondrop = function(e) { moveFunction(e.dataTransfer.getData('Text'), this, this.parentNode, 0, e); };
        thisEle.appendChild(ele);
    }
}
init(initData);


///左侧的放置函数
function dropFunction(thisEle, event){
    event.preventDefault();

    var type = event.dataTransfer.getData("Text");
    switch(type){
        case "characters":
            init([{
                type: type,
                Point: {
                    PointY: config.Point.PointY.getShowResult(event.offsetY),
                    PointX: config.Point.PointY.getShowResult(event.offsetX)
                },
                Content:"请点击后修改文字内容"
            }]);
            break;
        case "table":
            init([{
                type: type,
                Point: {
                    PointY: config.Point.PointY.getShowResult(event.offsetY),
                    PointX: config.Point.PointY.getShowResult(event.offsetX)
                },
                Column:[
                    {"ColumnName":"列1"},
                    {"ColumnName":"列2"},
                    {"ColumnName":"列3"}
                ]
            }]);
            break;
        default:
            moveFunction(type, thisEle.moveChild, thisEle, 1, event);
            break;
    }

    event.stopPropagation();
}

///左侧的移动函数
///beginPoint：开始的坐标
///thisEle   ：当前元素
///parentEle : 父级元素
///algorithmType: 算法类型。 1表示内部移动； 0表示其他
///e         : event
function moveFunction(beginPoint, thisEle, parentEle, algorithmType, e) {
    e.preventDefault();

    //计算新坐标
    var point = beginPoint.split(';');
    if(algorithmType == 1){
        thisEle.style.top = (event.offsetY - point[1]) + "px";
        thisEle.style.left = (event.offsetX - point[0]) + "px";
    } else if(algorithmType == 0){
        thisEle.style.top = (e.offsetY - point[1] + this.offsetTop) + "px";
        thisEle.style.left = (e.offsetX - point[0] + this.offsetLeft) + "px";
    }

    thisEle.click();     //展示属性
    parentEle.moveChild = null; //清空移动元素

    e.stopPropagation();  //阻止冒泡
}

///保存配置
function saveOnClickFunction(thisEle) {
    var result = [];

    var childList = thisEle.previousElementSibling.children;
    for(var i = 0; i < childList.length; i++){
        var childEle = childList[i];

        var type = childList[i].dataset.type;
        var content = {
            "type": type,
            "Point": {
                "PointX": config.Point.PointX.getShowResult(childEle.offsetLeft),
                "PointY": config.Point.PointY.getShowResult(childEle.offsetTop)
            },
            "Height": config.Height.getShowResult(childEle.clientHeight),
            "Width": config.Width.getShowResult(childEle.clientWidth),
            "Text": {
                "Font": config.Text.Font.getShowResult(childEle.style.fontFamily),
                "FontSize": config.Text.FontSize.getShowResult(childEle.style.fontSize)
            }
        };

        switch(type){
            case "characters":
                content.Content = config.Content.getShowResult(childEle.innerText);
                break;
            case "table":
                content.Column = config.Column.getShowResult(childEle);
                break;
        }

        result.push(content);
    }
    alert(JSON.stringify(result));
}