/* ============================================================
 * 作者：孙芳卓
 * 创建时间：2026-11-04
 * 使用模型：DeepSeek-V4.1-Flash
 * 功能：股票榜单数据（沪涨/沪跌/深涨/深跌）
 * ============================================================ */
(function (global) {
  "use strict";

  // 四大榜单数据：name 名称 / price 现价 / change 涨跌额 / pct 涨跌幅(%)
  // 正为涨（红）、负为跌（绿），与交易所涨跌停制度一致
  global.sfz_STOCK_DATA = {
    // 沪市涨幅榜
    hu_shang_up: [
      { name: "珈能",     price: 8.88,  change:  3.35,  pct: 60.58 },
      { name: "天津松江", price: 8.16,  change:  0.65,  pct:  8.66 },
      { name: "金瑞科技", price: 8.79,  change:  0.42,  pct:  5.02 },
      { name: "宏发股份", price: 17.22, change:  0.82,  pct:  5.00 },
      { name: "杭齿前进", price: 7.23,  change:  0.34,  pct:  4.93 }
    ],
    // 沪市跌幅榜
    hu_shang_down: [
      { name: "北方股份", price: 12.15, change: -1.35,  pct: -10.07 },
      { name: "上海普天", price: 6.88,  change: -0.43,  pct:  -5.88 },
      { name: "华胜天成", price: 9.60,  change: -0.40,  pct:  -4.00 },
      { name: "氯碱化工", price: 11.22, change: -0.38,  pct:  -3.28 },
      { name: "五洲交通", price: 3.65,  change: -0.08,  pct:  -2.14 }
    ],
    // 深市涨幅榜
    shen_zhen_up: [
      { name: "天顺风能", price: 10.52, change:  0.96,  pct: 10.04 },
      { name: "兴源过滤", price: 16.02, change:  2.28,  pct: 16.03 },
      { name: "北京君正", price: 36.92, change:  3.36,  pct: 10.01 },
      { name: "美盛文化", price: 32.87, change:  2.99,  pct: 10.01 },
      { name: "鄂威股份", price: 15.16, change:  1.38,  pct: 10.01 }
    ],
    // 深市跌幅榜
    shen_zhen_down: [
      { name: "中信证券", price: 22.18, change: -2.46,  pct: -10.02 },
      { name: "平安银行", price: 13.55, change: -0.72,  pct:  -5.04 },
      { name: "徐工机械", price: 7.18,  change: -0.26,  pct:  -3.49 },
      { name: "潍柴动力", price: 15.82, change: -0.34,  pct:  -2.10 },
      { name: "格力电器", price: 35.10, change: -0.52,  pct:  -1.46 }
    ]
  };
})(window);
