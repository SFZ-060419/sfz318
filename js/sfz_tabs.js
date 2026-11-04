/**
 * sfz_TabSwitcher —— 可复用的 Tab 选项卡控制器
 * ------------------------------------------------------------
 * 用法：
 *   var switcher = sfz_TabSwitcher({
 *     container: "#sfz_news_tabs",     // 外层容器选择器
 *     tabSelector: ".sfz_tab_btn",     // tab 按钮选择器
 *     panelSelector: ".sfz_tab_panel", // 内容面板选择器
 *     activeClass: "sfz_active",       // 选中时加的类名
 *     defaultIndex: 0                 // 默认选中第几项
 *   });
 *
 * 可实例化多个 tab 组，互不干扰。
 */
(function (global) {
  "use strict";

  // sfz_TabSwitcher 工厂：返回一个可复用的 tab 控制器实例
  function sfz_TabSwitcher(sfz_options) {
    sfz_options = sfz_options || {};

    // sfz_switcher 保存本实例的配置与 DOM 引用，形成闭包
    var sfz_switcher = {
      sfz_container: document.querySelector(sfz_options.container || ".sfz_tab_group"),
      sfz_tabSelector: sfz_options.tabSelector || ".sfz_tab_btn",
      sfz_panelSelector: sfz_options.panelSelector || ".sfz_tab_panel",
      sfz_activeClass: sfz_options.activeClass || "sfz_active",
      sfz_defaultIndex: sfz_options.defaultIndex == null ? 0 : sfz_options.defaultIndex,
      sfz_tabs: null,
      sfz_panels: null
    };

    // init 初始化：拿到 tab 按钮集合和面板集合，绑定事件
    sfz_switcher.sfz_init = function () {
      if (!sfz_switcher.sfz_container) return;
      // querySelectorAll 返回静态集合，可安全 forEach
      sfz_switcher.sfz_tabs = sfz_switcher.sfz_container.querySelectorAll(sfz_switcher.sfz_tabSelector);
      sfz_switcher.sfz_panels = sfz_switcher.sfz_container.querySelectorAll(sfz_switcher.sfz_panelSelector);

      // 事件委托：在容器上监听，用 closest 找到被点击的 tab 按钮
      sfz_switcher.sfz_container.addEventListener("click", function (sfz_event) {
        var sfz_btn = sfz_event.target.closest(sfz_switcher.sfz_tabSelector);
        if (!sfz_btn) return;
        var sfz_index = Array.prototype.indexOf.call(sfz_switcher.sfz_tabs, sfz_btn);
        if (sfz_index > -1) {
          // 先清除所有选项卡的选中状态，再设置当前元素的选中状态
          sfz_switcher.sfz_clearAllActive();
          sfz_switcher.sfz_setCurrentActive(sfz_index);
        }
      });

      // 初始选中：先全清，再高亮默认项
      sfz_switcher.sfz_clearAllActive();
      sfz_switcher.sfz_setCurrentActive(sfz_switcher.sfz_defaultIndex);
    };

    // sfz_clearAllActive 清除所有 tab 和所有面板的 active 类
    sfz_switcher.sfz_clearAllActive = function () {
      // 遍历所有 tab 按钮，移除 active 状态
      sfz_switcher.sfz_tabs.forEach(function (sfz_btn) {
        sfz_btn.classList.remove(sfz_switcher.sfz_activeClass);
      });
      // 遍历所有面板，移除 active 状态（配合 CSS display 切换）
      sfz_switcher.sfz_panels.forEach(function (sfz_panel) {
        sfz_panel.classList.remove(sfz_switcher.sfz_activeClass);
      });
    };

    // sfz_setCurrentActive 给指定下标的 tab 和面板加上 active 类
    sfz_switcher.sfz_setCurrentActive = function (sfz_index) {
      if (sfz_index < 0 || sfz_index >= sfz_switcher.sfz_tabs.length) return;
      sfz_switcher.sfz_tabs[sfz_index].classList.add(sfz_switcher.sfz_activeClass);
      if (sfz_switcher.sfz_panels[sfz_index]) {
        sfz_switcher.sfz_panels[sfz_index].classList.add(sfz_switcher.sfz_activeClass);
      }
    };

    // 启动
    sfz_switcher.sfz_init();

    // 返回实例（方便外部调用 sfz_clearAllActive / sfz_setCurrentActive）
    return sfz_switcher;
  }

  // 挂载到全局 window，让 HTML 外部可直接使用
  global.sfz_TabSwitcher = sfz_TabSwitcher;
})(window);
