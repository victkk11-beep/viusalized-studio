const platforms = ["抖音", "小红书", "淘宝", "拼多多", "闲鱼"];
const platformClass = { 抖音: "douyin", 小红书: "xhs", 淘宝: "taobao", 拼多多: "pdd", 闲鱼: "xianyu" };
const topics = ["Excel 自动报表", "批量文件工具", "本地知识库", "轻量网页定制"];
const matrixData = {
  抖音: { engagement: [18, 26, 12, 8], inquiries: [2, 3, 1, 1], orders: [1, 1, 0, 0] },
  小红书: { engagement: [31, 14, 22, 9], inquiries: [4, 1, 3, 1], orders: [2, 0, 1, 0] },
  淘宝: { engagement: [5, 4, 3, 11], inquiries: [1, 0, 1, 2], orders: [0, 0, 0, 1] },
  拼多多: { engagement: [7, 12, 2, 4], inquiries: [1, 2, 0, 0], orders: [0, 1, 0, 0] },
  闲鱼: { engagement: [8, 11, 3, 6], inquiries: [2, 2, 0, 1], orders: [1, 1, 0, 0] },
};
const conversations = [
  { id: "c1", platform: "小红书", customer: "林同学", initial: "林", time: "08:42", preview: "想做一个自动整理课程表的工具…", unread: true, topic: "批量文件工具", status: "待回复", history: [{ by: "customer", time: "08:42", text: "你好，想做一个自动整理课程表和提醒作业的小工具，大概需要多久？" }, { by: "owner", time: "08:49", text: "你好，可以先说下你现在的课程表是什么格式、希望在哪种设备上使用吗？" }, { by: "customer", time: "09:03", text: "现在是 Excel 表，最好能在电脑上直接用。" }] },
  { id: "c2", platform: "抖音", customer: "小周同学", initial: "周", time: "09:10", preview: "视频里那个批量改文件名的工具…", unread: true, topic: "批量文件工具", status: "待回复", history: [{ by: "customer", time: "09:10", text: "视频里那个批量改文件名的工具，可以按表格里的名单来改吗？" }] },
  { id: "c3", platform: "淘宝", customer: "木木", initial: "木", time: "昨天", preview: "报表工具能不能加一个筛选条件？", unread: false, topic: "Excel 自动报表", status: "跟进中", history: [{ by: "customer", time: "昨天 16:21", text: "报表工具能不能加一个按月份筛选的条件？" }, { by: "owner", time: "昨天 16:40", text: "可以的，我先确认一下表格列结构，再给你估一个调整范围。" }] },
  { id: "c4", platform: "闲鱼", customer: "阿浩", initial: "浩", time: "昨天", preview: "之前的脚本还有一个小问题…", unread: false, topic: "Excel 自动报表", status: "跟进中", history: [{ by: "customer", time: "昨天 13:06", text: "之前的脚本在文件名里有空格时会报错，方便帮忙看一下吗？" }] },
  { id: "c5", platform: "拼多多", customer: "陈先生", initial: "陈", time: "周一", preview: "请问可以开发本地文档问答吗？", unread: true, topic: "本地知识库", status: "待回复", history: [{ by: "customer", time: "周一 18:14", text: "请问可以开发一个只在我自己电脑上运行的文档问答工具吗？" }] },
  { id: "c6", platform: "小红书", customer: "清风", initial: "清", time: "周一", preview: "看了案例，想咨询网页小工具…", unread: false, topic: "轻量网页定制", status: "已处理", history: [{ by: "customer", time: "周一 10:24", text: "看了你发的案例，想咨询一个给团队内部用的小网页工具。" }] },
];
const orders = [
  { id: "XS-1028", customer: "林同学", initial: "林", service: "Excel 课程表整理工具", platform: "小红书", topic: "批量文件工具", status: "待确认", amount: 299, date: "10-15 09:05" },
  { id: "TB-1027", customer: "木木", initial: "木", service: "月度报表自动化调整", platform: "淘宝", topic: "Excel 自动报表", status: "进行中", amount: 499, date: "10-14 16:28" },
  { id: "DY-1026", customer: "小周同学", initial: "周", service: "批量文件改名脚本", platform: "抖音", topic: "批量文件工具", status: "已完成", amount: 199, date: "10-14 11:16" },
  { id: "XY-1025", customer: "阿浩", initial: "浩", service: "Excel 数据清洗", platform: "闲鱼", topic: "Excel 自动报表", status: "已完成", amount: 299, date: "10-13 14:32" },
  { id: "PDD-1024", customer: "陈先生", initial: "陈", service: "本地文档问答方案咨询", platform: "拼多多", topic: "本地知识库", status: "待确认", amount: 99, date: "10-13 10:03" },
  { id: "TB-1023", customer: "小叶", initial: "叶", service: "轻量网页展示页", platform: "淘宝", topic: "轻量网页定制", status: "已完成", amount: 699, date: "10-12 15:40" },
  { id: "DY-1022", customer: "小林", initial: "林", service: "自动报表脚本", platform: "抖音", topic: "Excel 自动报表", status: "已完成", amount: 299, date: "10-11 12:05" },
  { id: "XY-1021", customer: "May", initial: "M", service: "批量图片归档工具", platform: "闲鱼", topic: "批量文件工具", status: "已完成", amount: 299, date: "10-10 17:19" },
];
let selectedConversation = conversations[0].id;
const manualRecords = [];
let toastTimer;

const $ = (selector) => document.querySelector(selector);
const money = (value) => `¥${value.toLocaleString("zh-CN")}`;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2400);
}
function platformMark(platform) {
  return `<span class="platform-mark platform-${platformClass[platform]}">${platform[0]}</span>`;
}
function inLastSevenDays(dateText) {
  const date = new Date(`${dateText}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = (today - date) / 86400000;
  return Number.isFinite(days) && days >= 0 && days < 7;
}
function matrixValue(platform, metric, topicIndex) {
  const topic = topics[topicIndex];
  return matrixData[platform][metric][topicIndex] + manualRecords.filter((record) => record.platform === platform && record.topic === topic && inLastSevenDays(record.date)).reduce((sum, record) => sum + record[metric], 0);
}
function setPage(name) {
  document.querySelectorAll(".page").forEach((page) => page.classList.toggle("active", page.id === `page-${name}`));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.page === name));
  const titles = { overview: "经营总览", inbox: "收件箱", orders: "订单管理" };
  $("#breadcrumb-current").textContent = titles[name];
}
function renderMatrix() {
  const metric = $("#matrix-metric").value;
  const values = platforms.flatMap((platform) => topics.map((_, index) => matrixValue(platform, metric, index)));
  const max = Math.max(...values);
  const labels = { engagement: "有效互动", inquiries: "咨询", orders: "订单" };
  const head = `<div class="matrix-row matrix-head" role="row"><span role="columnheader">平台 / 主题</span>${topics.map((topic) => `<span role="columnheader">${topic}</span>`).join("")}</div>`;
  const rows = platforms.map((platform) => `<div class="matrix-row" role="row"><span class="matrix-platform" role="rowheader">${platformMark(platform)}${platform}</span>${topics.map((topic, index) => {
    const value = matrixValue(platform, metric, index);
    const level = value === 0 ? 0 : Math.min(4, Math.ceil((value / max) * 4));
    return `<span class="matrix-cell level-${level}" role="cell" title="${platform} · ${topic} · ${labels[metric]} ${value}">${value}</span>`;
  }).join("")}</div>`).join("");
  $("#attention-matrix").innerHTML = head + rows;
  const top = topics.map((topic, index) => ({ topic, value: platforms.reduce((sum, platform) => sum + matrixValue(platform, metric, index), 0), inquiries: platforms.reduce((sum, platform) => sum + matrixValue(platform, "inquiries", index), 0), orders: platforms.reduce((sum, platform) => sum + matrixValue(platform, "orders", index), 0) })).sort((a, b) => b.value - a.value)[0];
  $("#insight-content").innerHTML = `<div class="insight-kicker">当前表现较好的主题</div><div class="insight-topic">${top.topic}</div><div class="insight-stats"><div class="insight-stat"><strong>${top.value}</strong><small>${labels[metric]}</small></div><div class="insight-stat"><strong>${top.inquiries}</strong><small>相关咨询</small></div><div class="insight-stat"><strong>${top.orders}</strong><small>相关订单</small></div></div><p class="insight-copy">演示数据中，这类内容带来了 ${top.inquiries} 条咨询和 ${top.orders} 笔订单。继续发布同主题内容，并记录来源，验证趋势是否持续。</p>`;
}
function renderMetrics() {
  const revenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const pending = orders.filter((order) => order.status === "待确认").length;
  const engagement = platforms.reduce((sum, platform) => sum + topics.reduce((topicSum, _, index) => topicSum + matrixValue(platform, "engagement", index), 0), 0);
  $("#metric-inquiries").textContent = conversations.filter((item) => item.status === "待回复").length;
  $("#metric-orders").textContent = orders.length;
  $("#metric-pending").textContent = pending;
  $("#metric-revenue").textContent = money(revenue);
  $("#metric-engagement").textContent = engagement;
  $("#unread-count").textContent = conversations.filter((item) => item.unread).length;
  $("#unread-count").hidden = !conversations.some((item) => item.unread);
  $("#order-summary").innerHTML = `<div class="order-summary-item"><small>演示订单</small><strong>${orders.length} 笔</strong></div><div class="order-summary-item"><small>待确认</small><strong>${pending} 笔</strong></div><div class="order-summary-item"><small>进行中</small><strong>${orders.filter((o) => o.status === "进行中").length} 笔</strong></div><div class="order-summary-item"><small>演示成交额</small><strong>${money(revenue)}</strong></div>`;
}
function renderPlatforms() {
  $("#platform-list").innerHTML = platforms.map((platform) => `<div class="platform-item">${platformMark(platform)}<span class="platform-info"><strong>${platform}</strong><small>待接入</small></span></div>`).join("");
}
function renderConversationList() {
  const search = $("#message-search").value.trim().toLowerCase();
  const platform = $("#platform-filter").value;
  const unreadOnly = $("#unread-filter").checked;
  const filtered = conversations.filter((item) => (platform === "all" || item.platform === platform) && (!unreadOnly || item.unread) && (!search || `${item.customer}${item.preview}${item.topic}`.toLowerCase().includes(search)));
  $("#conversation-total").textContent = `${filtered.length} 条`;
  $("#conversation-items").innerHTML = filtered.length ? filtered.map((item) => `<button class="conversation-item ${item.id === selectedConversation ? "selected" : ""}" data-conversation="${item.id}"><span class="customer-avatar">${item.initial}</span><span class="conversation-copy"><span class="conversation-top"><strong>${item.customer}</strong><time>${item.time}</time></span><span class="conversation-platform">${item.platform} · ${item.status}</span><span class="conversation-preview">${item.preview}</span></span>${item.unread ? `<i class="unread-dot"></i>` : ""}</button>`).join("") : `<div class="table-empty">没有匹配的会话</div>`;
  document.querySelectorAll("[data-conversation]").forEach((button) => button.addEventListener("click", () => {
    selectedConversation = button.dataset.conversation;
    const item = conversations.find((row) => row.id === selectedConversation);
    item.unread = false;
    renderInbox();
  }));
}
function renderCurrentConversation() {
  const item = conversations.find((row) => row.id === selectedConversation);
  if (!item) { $("#conversation-view").innerHTML = `<div class="table-empty">选择一条会话查看详情</div>`; $("#contact-panel").innerHTML = ""; return; }
  $("#conversation-view").innerHTML = `<div class="conversation-header"><div><strong>${item.customer}</strong><small>${item.platform} · ${item.status}</small></div><div class="conversation-actions"><button class="tiny-button" id="mark-done">${item.status === "已处理" ? "标记待跟进" : "标记已处理"}</button></div></div><div class="message-thread"><div class="thread-day">今天</div>${item.history.map((message) => `<div class="message ${message.by === "owner" ? "owner" : "customer"}"><div class="message-bubble">${message.text}</div><time>${message.time} · ${message.by === "owner" ? "我" : item.customer}</time></div>`).join("")}</div><form class="composer" id="reply-form"><textarea id="reply-text" placeholder="写下回复…（仅在本地演示，不会发送到平台）"></textarea><div class="composer-bottom"><small>来源主题：${item.topic}</small><button class="send-demo" type="submit">添加演示回复</button></div></form>`;
  $("#contact-panel").innerHTML = `<div class="contact-heading"><span class="customer-avatar">${item.initial}</span><span><strong>${item.customer}</strong><small>${item.platform} 会话</small></span></div><div class="detail-group"><span class="detail-label">跟进状态</span><span class="tag">${item.status}</span></div><div class="detail-group"><span class="detail-label">来源平台</span><span class="detail-value">${item.platform}</span></div><div class="detail-group"><span class="detail-label">内容来源</span><div class="source-content"><strong>${item.topic}</strong>来自演示数据的主题关联</div></div><p class="detail-help">真实接入后，可按平台授权范围同步会话，并在允许的接口范围内处理回复。</p>`;
  $("#mark-done").addEventListener("click", () => { item.status = item.status === "已处理" ? "跟进中" : "已处理"; renderInbox(); });
  $("#reply-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const text = $("#reply-text").value.trim();
    if (!text) { showToast("先写下回复内容"); return; }
    item.history.push({ by: "owner", time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }), text });
    item.preview = text;
    item.status = "跟进中";
    renderInbox();
    showToast("已添加到本地演示会话，未发送到平台");
  });
}
function renderInbox() { renderConversationList(); renderCurrentConversation(); renderMetrics(); }
function renderOrders() {
  const search = $("#order-search").value.trim().toLowerCase();
  const status = $("#order-status-filter").value;
  const platform = $("#order-platform-filter").value;
  const filtered = orders.filter((order) => (status === "all" || order.status === status) && (platform === "all" || order.platform === platform) && (!search || `${order.id}${order.customer}${order.service}${order.topic}`.toLowerCase().includes(search)));
  $("#order-rows").innerHTML = filtered.map((order) => `<tr><td>${order.id}</td><td><span class="order-customer"><span class="customer-avatar">${order.initial}</span>${order.customer}</span></td><td><span class="order-service">${order.service}</span></td><td><span class="conversation-platform">${order.platform}</span></td><td><span class="order-source">${order.topic}</span></td><td><span class="order-status ${order.status === "待确认" ? "status-pending" : order.status === "进行中" ? "status-progress" : "status-done"}">${order.status}</span></td><td>${money(order.amount)}</td><td>${order.date}</td></tr>`).join("");
  $("#orders-empty").hidden = filtered.length > 0;
}
function exportOrders() {
  const rows = [["订单号", "客户", "服务内容", "平台", "内容来源", "状态", "金额", "下单时间"], ...orders.map((order) => [order.id, order.customer, order.service, order.platform, order.topic, order.status, order.amount, order.date])];
  const csv = "\uFEFF" + rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.download = "码上有解-演示订单.csv";
  link.click();
  URL.revokeObjectURL(link.href);
}

document.querySelectorAll(".nav-item").forEach((item) => item.addEventListener("click", () => setPage(item.dataset.page)));
document.querySelectorAll("[data-open]").forEach((item) => item.addEventListener("click", () => setPage(item.dataset.open)));
$("#matrix-metric").addEventListener("change", renderMatrix);
const captureDialog = $("#capture-dialog");
const captureDate = $("#capture-form").elements.date;
function localDateText(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}
const todayText = localDateText(new Date());
const earliestText = new Date();
earliestText.setDate(earliestText.getDate() - 6);
captureDate.value = todayText;
captureDate.min = localDateText(earliestText);
captureDate.max = todayText;
$("#add-signal").addEventListener("click", () => captureDialog.showModal());
$("#close-capture").addEventListener("click", () => captureDialog.close());
$("#cancel-capture").addEventListener("click", () => captureDialog.close());
$("#capture-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const values = new FormData(event.currentTarget);
  const record = { platform: values.get("platform"), topic: values.get("topic"), date: values.get("date"), engagement: Number(values.get("engagement")), inquiries: Number(values.get("inquiries")), orders: Number(values.get("orders")) };
  manualRecords.push(record);
  captureDialog.close();
  renderMatrix();
  renderMetrics();
  showToast("数据已加入近 7 天矩阵");
  event.currentTarget.reset();
  captureDate.value = todayText;
});
["#message-search", "#platform-filter", "#unread-filter"].forEach((selector) => $(selector).addEventListener("input", renderConversationList));
["#order-search", "#order-status-filter", "#order-platform-filter"].forEach((selector) => $(selector).addEventListener("input", renderOrders));
$("#refresh-demo").addEventListener("click", () => showToast("演示数据已是最新"));
$("#connection-info").addEventListener("click", () => showToast("平台授权与接口能力需逐个平台核实后接入"));
$("#export-orders").addEventListener("click", exportOrders);
$("#today-label").textContent = new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "long" }).format(new Date());
renderMetrics(); renderPlatforms(); renderMatrix(); renderInbox(); renderOrders();
