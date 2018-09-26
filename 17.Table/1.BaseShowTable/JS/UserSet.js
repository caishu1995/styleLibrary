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

    tableDescribe.titleList = [{ title: "", content:"<input name='name1' value='' type='radio'>" }, { title: "aa", columns: "aa", type: 1 }, { title: "bb", columns: "bb", type: 2 }, { title: "cc", columns: "cc" }, { title: "dd", columns: "dd" }, { title: "ee", columns: "ee" }, { title: "ff", columns: "ff" }, { title: "", content:"<button>aa</button><button>b</button>" } ];//列名

    tableDescribe.idFrom = ["SystemID"]; //行id来源
    tableDescribe.menuList = [{ name: "删除", onclick: "alert('aa');" }];//右键菜单列表
    tableDescribe.newRow = true;//存在新增的行
    tableDescribe.id = "table1";//属于的表格id

    tableDescribe.IsHasFooter = true;//是否存在分页情况
    tableDescribe.pageSet  = {
        pageIndex : 1, //当前是第几页
        pageSize : 20, //每页的数量
        allCount : 103,//总数
        pageSelectIndex : function(tableDescribe) {
            alert(tableDescribe.pageSet.pageIndex);//请注意：更改tableDescribe中的dataSource
        }//设置分页时触发的函数
    };//分页的具体内容


    return tableDescribe;
}
function getTableDescribe2() {
    var tableDescribe = {};

    tableDescribe.titleList = [{ title: "啊啊", columns: "aa", type: 1 }, { title: "宝宝", columns: "bb", type: 2 }, { title: "存储", columns: "cc" }, { title: "", content:"<button>aa</button>" } ];//列名

    tableDescribe.idFrom = ["SystemID", "aa"]; //行id来源
    tableDescribe.IsHasFooter = false;//是否存在分页情况
    tableDescribe.id = "table2";//属于的表格id

    return tableDescribe;
}
///获得数据
function getData() {
    var dataSource = [];//中间数据
    for (var i = 0; i < 5; i++) {
        var res = {};
        res.aa = "2018/1/2 12:00:00";
        res.bb = "55.23000";
        res.cc = "ccc";
        res.dd = "ddd";
        res.ee = "eee";
        res.ff = "fff";
        res.SystemID = i + 1;
        dataSource.push(res);
    }
    return dataSource;
}