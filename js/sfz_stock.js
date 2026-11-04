/* ============================================================
 * 作者：孙芳卓
 * 创建时间：2026-11-04
 * 使用模型：DeepSeek-V4.1-Flash
 * 功能：股票榜单渲染 + Tab 切换联动
 * ============================================================ */
(function () {
  "use strict";

  // 模块数据：4 个榜单对应的 sfz_STOCK_DATA 字段键，顺序与 Tab 一致
  var sfz_TABS = [
    { key: "hu_shang_up",    label: "沪涨" },
    { key: "hu_shang_down",  label: "沪跌" },
    { key: "shen_zhen_up",   label: "深涨" },
    { key: "shen_zhen_down", label: "深跌" }
  ];

  // 根据涨跌额的正负返回颜色类：涨用红、跌用绿，与 A 股习惯一致
  function sfz_colorByChange(sfz_change) {
    if (sfz_change > 0) return "sfz_up";
    if (sfz_change < 0) return "sfz_down";
    return "";
  }

  // 数字格式化：涨跌额/涨跌幅加上正负号，保留两位小数
  function sfz_fmtNum(sfz_num) {
    var sfz_str = Math.abs(sfz_num).toFixed(2);
    return (sfz_num >= 0 ? "+" : "-") + sfz_str;
  }

  // 渲染指定榜单的表格内容：清空 tbody → 遍历数据 → createElement 拼行
  function sfz_renderTable(sfz_key) {
    var sfz_tbody = document.getElementById("sfz_stock_tbody");
    sfz_tbody.innerHTML = "";

    var sfz_list = window.sfz_STOCK_DATA[sfz_key] || [];
    sfz_list.forEach(function (sfz_item, sfz_idx) {
      var sfz_tr = document.createElement("tr");

      // 序号列
      var sfz_td0 = document.createElement("td");
      sfz_td0.className = "sfz_rank";
      sfz_td0.textContent = sfz_idx + 1;
      sfz_tr.appendChild(sfz_td0);

      // 股票名称
      var sfz_td1 = document.createElement("td");
      sfz_td1.className = "sfz_name";
      sfz_td1.textContent = sfz_item.name;
      sfz_tr.appendChild(sfz_td1);

      // 现价
      var sfz_td2 = document.createElement("td");
      sfz_td2.className = "sfz_price " + sfz_colorByChange(sfz_item.change);
      sfz_td2.textContent = sfz_item.price.toFixed(2);
      sfz_tr.appendChild(sfz_td2);

      // 涨跌额（带符号）
      var sfz_td3 = document.createElement("td");
      sfz_td3.className = sfz_colorByChange(sfz_item.change);
      sfz_td3.textContent = sfz_fmtNum(sfz_item.change);
      sfz_tr.appendChild(sfz_td3);

      // 涨跌幅（带符号 + %）
      var sfz_td4 = document.createElement("td");
      sfz_td4.className = "sfz_pct " + sfz_colorByChange(sfz_item.pct);
      sfz_td4.textContent = sfz_fmtNum(sfz_item.pct) + "%";
      sfz_tr.appendChild(sfz_td4);

      sfz_tbody.appendChild(sfz_tr);
    });
  }

  // 把 Tab index 映射到数据 key，切换后重渲染表格
  function sfz_switch(sfz_index) {
    sfz_renderTable(sfz_TABS[sfz_index].key);
  }

  // 页面加载完成后：渲染默认榜单（沪涨 = index 0），并给 Tab 绑定切换回调
  document.addEventListener("DOMContentLoaded", function () {
    sfz_renderTable("hu_shang_up");  // 默认显示沪涨

    // 复用 sfz_TabSwitcher（来自 js/sfz_tabs.js），在 Tab 切换时刷新表格
    window.sfz_stockSwitcher = window.sfz_TabSwitcher({
      container: "#sfz_stock_tabs",
      tabSelector: ".sfz_tab_btn",
      panelSelector: ".sfz_tab_panel",
      activeClass: "sfz_active",
      defaultIndex: 0,
      // 新增 onChange 钩子：每次 clearAllActive / setCurrentActive 之后触发
      onChange: sfz_switch
    });
  });
})();
