///模拟数据
function getBaseData1() {
    var tableUserDescribe = {};

    tableUserDescribe.titleList = [{ title: "aa", columns: "aa", type: 1 }, { title: "bb", columns: "bb", type: 2 }, { title: "cc", columns: "cc" }, { title: "dd", columns: "dd" }, { title: "ee", columns: "ee" }, { title: "ff", columns: "ff" }, ];//列名

    tableUserDescribe.dataSource = {
        idFrom: ["SystemID", "aa"]//行id来源
    }; //数据内容

    tableUserDescribe.clickFunctionList = {
        deleteFunction : function (id) { alert(id); return true; }, //提供id，但必须返回bool类型，true表示删除成功
        saveFunction : function (trEle) {
            var id = trEle.dataset.id;

            if (id == "-1")
                id = 8;

            alert(id);
            return id;
        } //提供tr元素，但必须返回int类型，-1表示新增失败，其他表示新增成功后的id号
    };

    tableUserDescribe.id = "table1";//表格的id

    return tableUserDescribe;
}
function getBaseData2() {
    var tableUserDescribe = {};

    tableUserDescribe.titleList = [{ title: "aa", columns: "aa", type: 1 }, { title: "bb", columns: "bb", type: 2 }, { title: "cc", columns: "cc" }, { title: "dd", columns: "dd" }, { title: "ee", columns: "ee" }, { title: "ff", columns: "ff" } ];//列名

    tableUserDescribe.dataSource = {
        idFrom: ["SystemID"]//行id来源
    }; //数据内容

    tableUserDescribe.clickFunctionList = {
        deleteFunction : function (id) { alert(id); return true; }, //提供id，但必须返回bool类型，true表示删除成功
        saveFunction : function (trEle) {
            var id;
            if (trEle.id.split('_').length > 1)
                id = trEle.id.split('_')[1];
            else
                id = trEle.id;

            if (id == "-1")
                id = 8;

            alert(id); return id;
        } //提供tr元素，但必须返回int类型，-1表示新增失败，其他表示新增成功后的id号
    };

    tableUserDescribe.id = "table2";//表格的id

    return tableUserDescribe;
}
function getData() {
    return data = [{ "aa": "2018/1/2 12:00:00", "bb": "55.23000", "cc": "ccc", "dd": "ddd", "ee": "eee", "ff": "fff", "SystemID": "1" }, { "aa": "2018/1/2 12:00:00", "bb": "55.23000", "cc": "cccc", "dd": "dddd", "ee": "eeee", "ff": "ffff", "SystemID": "2" }, { "aa": "2018/1/2 12:00:00", "bb": "55.23000", "cc": "cccc", "dd": "dddd", "ee": "eeee", "ff": "ffff", "SystemID": "3" }, { "aa": "2018/1/2 12:00:00", "bb": "55.23000", "cc": "cccc", "dd": "dddd", "ee": "eeee", "ff": "ffff", "SystemID": "4" }]; //数据
    //return [];//如果无数据则用此方式
}

var myTable = new MyTableClass(getBaseData1());
myTable.baseDraw(); //创建内容并增加
///获得数据并绑定数据
myTable.boundData(getData()); //创建内容并增加
myTable.tableDraw();


var myTable1 = new MyTableClass(getBaseData2());
myTable1.baseDraw(); //创建内容并增加
myTable1.boundData(getData()); //创建内容并增加
myTable1.tableDraw();