String.prototype.countByteLength = function() {
    var count = 0;
    for (var i = 0; i < this.length; i++) {
        //全部转换成半角
        var char = (function (str, i){
            var cCode = str.charCodeAt(i);

            //全角与半角相差（除空格外）：65248（十进制）
            cCode = (cCode>=0xFF01 && cCode<=0xFF5E) ? (cCode - 65248) : cCode;
            //处理空格
            cCode = (cCode==0x03000) ? 0x0020 : cCode;

            return cCode;
        })(this, i);

        //转换中 英 日
        // Shift_JIS: 0x0 ～ 0x80, 0xa0 , 0xa1 ～ 0xdf , 0xfd ～ 0xff
        // Unicode : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3
        if ( (char >= 0x0 && char < 0x81) || (char == 0xf8f0) || (char >= 0xff61 && char < 0xffa0) || (char >= 0xf8f1 && char < 0xf8f4)) {
            count += 1;
        } else {
            count += 2;
        }
    }
    return count;
};