(function(exports) {
    /// find
    /// thisDOM : 当前元素
    /// findStr : . # tagName
    /// 返回    ：返回数组
    function findDOM(thisDOM, findStr) {
        return thisDOM.querySelectorAll(findStr);
    }

    /// parents
    /// thisDOM : 当前元素
    /// findStr : . # tagName
    /// 返回    ：返回数组
    function parentsDOM(thisDOM, findStr) {
        var result = [];
        do{
            thisDOM = thisDOM.parentNode;
            switch(findStr[0]){
                case ".":
                    thisDOM.classList.forEach(function(value, key, listObj) {
                        if(value == findStr.substr(1))  result.push(thisDOM);
                    });
                    break;
                case "#":
                    if(thisDOM.id == findStr.substr(1)) result.push(thisDOM);
                    break;
                default:
                    if(thisDOM.tagName.toLocaleLowerCase() == findStr) result.push(thisDOM);
                    break;
            }
        }while(thisDOM.parentNode.nodeName != "#document");

        return result;
    }

    /// brother
    /// thisDOM : 当前元素
    /// findStr : . # tagName
    /// 返回    ：返回数组
    function brotherDOM(thisDOM, findStr) {
        var childrenList = thisDOM.parentNode.children;
        var result = [];

        for(var i = 0; i < childrenList.length; i++){
            var childrenDOM = childrenList[i];

            switch(findStr[0]){
                case ".":
                    childrenDOM.classList.forEach(function(value, key, listObj) {
                        if((value == findStr.substr(1)) && (childrenDOM !== thisDOM))  result.push(childrenDOM);
                    });
                    break;
                case "#":
                    if((childrenDOM.id == findStr.substr(1)) && (childrenDOM !== thisDOM)) result.push(childrenDOM);
                    break;
                default:
                    if((childrenDOM.tagName.toLocaleLowerCase() == findStr) && (childrenDOM !== thisDOM)) result.push(childrenDOM);
                    break;
            }
        }

        return result;
    }

    exports.$ = {
        "findDOM" : findDOM,
        "parentsDOM" : parentsDOM,
        "brotherDOM" : brotherDOM
    };
})(this);
