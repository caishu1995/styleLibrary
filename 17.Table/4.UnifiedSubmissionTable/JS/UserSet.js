///模拟数据
function getBaseData() {
    var tableUserDescribe = {};

    tableUserDescribe.titleList = [{ title: "aa", columns: "aa", type: 1 }, { title: "bb", columns: "bb", type: 2 }, { title: "cc", columns: "cc" }, { title: "dd", columns: "dd" }, { title: "ee", columns: "ee" }, { title: "ff", columns: "ff" } ];//列名

    tableUserDescribe.dataSource = {
        idFrom : ["SystemID"]//行id来源
    };

    tableUserDescribe.clickFunctionList = {
        deleteFunction : function (id) { alert(id); return true; }, //提供id，但必须返回bool类型，true表示允许删除
        updateFunction : function (id, index, data) { alert(id + "**" + index + "**" + data); return true; }, //提供id、index(点中的单元格的数)、date(数据)，但必须返回bool类型，true表示允许修改
        addFunction : function (trEle) { alert("aa"); return true; }, //提供tr元素，但必须返回bool类型，true表示允许新增
        saveFunction : function (dataList) { alert(dataList); return dataList; } //提供所有数据内容，需要返回修改成功的数据列表，数据列表中需要包含id值。
    };

    tableUserDescribe.id = "table1";//表格的id

    return tableUserDescribe;
}
function getBaseData1() {
    var tableUserDescribe = {};

    tableUserDescribe.titleList = [{ title: "aa", columns: "aa", type: 1 }, { title: "bb", columns: "bb", type: 2 }, { title: "cc", columns: "cc" }, { title: "dd", columns: "dd" }, { title: "ee", columns: "ee" }, { title: "ff", columns: "ff" } ];//列名

    tableUserDescribe.dataSource = {
        idFrom : ["SystemID"]//行id来源
    };

    tableUserDescribe.clickFunctionList = {
        deleteFunction : function (id) { alert(id); return true; }, //提供id，但必须返回bool类型，true表示允许删除
        updateFunction : function (id, index, data) { alert(id + "**" + index + "**" + data); return true; }, //提供id、index(点中的单元格的数)、date(数据)，但必须返回bool类型，true表示允许修改
        addFunction : function (trEle) { alert("aa"); return true; }, //提供tr元素，但必须返回bool类型，true表示允许新增
        saveFunction : function (dataList) { alert(dataList); return dataList; } //提供所有数据内容，需要返回修改成功的数据列表，数据列表中需要包含id值。
    };

    tableUserDescribe.id = "table2";//表格的id

    return tableUserDescribe;
}
function getData() {
    return data = [
        { "aa": "2018/1/2 12:00:00", "bb": "55.23000", "cc": "ccc", "dd": "ddd", "ee": "eee", "ff": "fff", "SystemID": "1" },
        { "aa": "2018/1/2 12:00:00", "bb": "55.23000", "cc": "cccc", "dd": "dddd", "ee": "eeee", "ff": "ffff", "SystemID": "2" },
        { "aa": "2018/1/2 12:00:00", "bb": "55.23000", "cc": "cccc", "dd": "dddd", "ee": "eeee", "ff": "ffff", "SystemID": "3" },
        { "aa": "2018/1/2 12:00:00", "bb": "55.23000", "cc": "cccc", "dd": "dddd", "ee": "eeee", "ff": "ffff", "SystemID": "4" },
        { "aa": "2018/1/2 12:00:00", "bb": "55.23000", "cc": "cccc", "dd": "dddd", "ee": "eeee", "ff": "ffff", "SystemID": "5" },
        { "aa": "2018/1/2 12:00:00", "bb": "55.23000", "cc": "cccc", "dd": "dddd", "ee": "eeee", "ff": "ffff", "SystemID": "6" },
        { "aa": "2018/1/2 12:00:00", "bb": "55.23000", "cc": "cccc", "dd": "dddd", "ee": "eeee", "ff": "ffff", "SystemID": "7" },
        { "aa": "2018/1/2 12:00:00", "bb": "55.23000", "cc": "cccc", "dd": "dddd", "ee": "eeee", "ff": "ffff", "SystemID": "8" },
        { "aa": "2018/1/2 12:00:00", "bb": "55.23000", "cc": "cccc", "dd": "dddd", "ee": "eeee", "ff": "ffff", "SystemID": "9" },
        { "aa": "2018/1/2 12:00:00", "bb": "55.23000", "cc": "cccc", "dd": "dddd", "ee": "eeee", "ff": "ffff", "SystemID": "10" }
    ]; //数据
    //return [];//如果无数据则用此方式
}

var myTable = new MyTableClass(getBaseData());
myTable.baseDraw(); //创建内容并增加
myTable.boundData(getData()); //创建内容并增加
myTable.tableDraw();



var myTable1 = new MyTableClass(getBaseData1());
myTable1.baseDraw(); //创建内容并增加
myTable1.boundData(getData()); //创建内容并增加
myTable1.tableDraw();