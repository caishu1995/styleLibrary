var myTableClass = new MyTableClass(getTableDescribe1());
myTableClass.baseDraw();
myTableClass.boundData(getData());
myTableClass.tableDraw();

var myTableClass1 = new MyTableClass(getTableDescribe2());
myTableClass1.baseDraw();
myTableClass1.boundData(getData());
myTableClass1.tableDraw();



///设置基础信息
function getTableDescribe1() {
    var tableDescribe = {};

    tableDescribe.rowIdFrom = ["SystemID"]; //行id来源
    tableDescribe.id = "table1";//属于的表格id
    tableDescribe.titleList = [{ title: "SystemID", columns: "SystemID" }, { title: "aa", columns: "aa", type: 1 }, { title: "bb", columns: "bb", type: 2 }, { title: "cc", columns: "cc" }, { title: "dd", columns: "dd" }, { title: "ee", columns: "ee" }, { title: "ff", columns: "ff" }, { title: "gg", columns: "gg" }, { title: "hh", columns: "hh" }];//列名

    return tableDescribe;
}
function getTableDescribe2() {
    var tableDescribe = {};

    tableDescribe.rowIdFrom = ["SystemID", "aa"]; //行id来源
    tableDescribe.id = "table2";//属于的表格id
    tableDescribe.titleList = [{ title: "SystemID", columns: "SystemID" }, { title: "aa", columns: "aa", type: 1 }, { title: "bb", columns: "bb", type: 2 }, { title: "cc", columns: "cc" }, { title: "dd", columns: "dd" }, { title: "ee", columns: "ee" }, { title: "ff", columns: "ff" }, { title: "gg", columns: "gg" }, { title: "hh", columns: "hh" }];//列名

    return tableDescribe;
}
///获得数据
function getData() {
    var dataSource = [];//中间数据
    for (var i = 0; i < 100000; i++) {
        var res = {};
        res.aa = "2018/1/2 12:00:00";
        res.bb = "55.23000";
        res.cc = "ccc";
        res.dd = "ddd";
        res.ee = "eee";
        res.ff = "fff";
        res.gg = "ggg";
        res.hh = "hhh";
        res.SystemID = i + 1;
        dataSource.push(res);
    }
    return dataSource;
}
