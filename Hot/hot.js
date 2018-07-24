function Hot(baseId) {
    this.baseId = baseId;
    this.init = function() {
        $("#" + this.baseId).addClass("h_hot");
        $("#" + this.baseId).html("<img src='hot_back.png' /><p>Hot!</p>");
    }
}