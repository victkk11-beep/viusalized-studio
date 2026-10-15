# 五个平台 API 接入核实

核实日期：2026-10-15。范围是公开的官方开放平台文档；没有登录商家/服务商控制台，没有创建应用、申请权限、获取令牌或实测接口。因此，“文档可见”不代表当前账号具备调用资格。

## 结论速览

| 平台 | 订单读取/状态 | 收件箱消息 | 营销互动数据 | 当前判断 |
| --- | --- | --- | --- | --- |
| 抖音电商 | 有订单列表、详情及交易状态消息文档 | 有三方客服 API / 消息能力文档，具体能力受应用权限、服务商与店铺授权约束 | 本轮未核实到可直接汇总内容互动的商家 API | 订单接入路径较明确；客服需要核对申请到的权限包 |
| 小红书 | 电商开放平台有订单、售后 API 和 SDK 的 `OrderClient` | 当前公开电商 API 目录未找到通用商家私信收件箱 API；需向平台工单确认 | 当前未核实到可用的笔记互动汇总 API | 订单可继续做账号级权限核实；内容账号与电商 API 分开处理 |
| 淘宝/天猫 | 开放平台有交易/订单相关 API 和商家应用体系 | 有独立消息服务文档；消息订阅和消息类型需在应用权限中确认 | 本轮未核实到适用于本项目的营销互动 API | 以商家应用、用户授权和 API 权限包为接入前提 |
| 拼多多 | 官方 API 目录列有 `pdd.order.information.get`、`pdd.order.status.get` | 公开材料不足以确认统一买家会话读取/回复能力 | 本轮未核实 | 先用已有个人店铺登录控制台，确认应用身份和订单 API 权限是否可申请 |
| 闲鱼 | 文档有服务商小程序交易链路的订单查询与状态消息 | 消息文档对应上述小程序订单链路；不等于普通闲鱼会话收件箱 | 未核实 | 官方快速接入文档称小程序申请面向运营定向邀请服务商；普通店铺数据不能据此视为可接入 |

## 分平台核实

### 抖音电商（抖店）

- 官方开发指南描述存量订单拉取、增量消息推送和漏单补偿流程，列出 `/order/searchList`、`/order/orderDetail`，以及订单创建、支付、完成、取消等 `doudian_trade_*` 状态消息。
- 开放平台另有“三方客服 API”目录和客服工具接口。已查到的客服工具 API 受 ISV/店铺授权和会话频控约束；这不等于已确认可任意读取全部会话内容或代商家自由回复。
- **建议接入顺序：** 先申请只读订单权限，按订单状态/完成事件建立幂等的成功订单台账；客服能力单独做应用权限审核；营销内容互动指标暂用人工导入或官方报表，不推测接口能力。
- 官方资料：[订单打通开发指南](https://op.jinritemai.com/docs/guide-docs/205)、[消息文档](https://op.jinritemai.com/docs/guide-docs/217)、[API 文档目录](https://op.jinritemai.com/docs/api-docs/)、[三方客服 API](https://op.jinritemai.com/docs/api-docs/13/54)。

### 小红书

- [电商开放平台 API 目录](https://open.xiaohongshu.com/document/api) 明列订单、售后、商品、库存、财务等业务域；[官方 SDK 说明](https://open.xiaohongshu.com/document/developer/file/42) 提到授权、订单新旧客户端及 `OrderClient`。
- 这套文档验证的是**电商商家业务**。公开目录里没有确认到通用笔记/评论/私信统一收件箱 API，也没有确认到可用于注意力矩阵的笔记互动指标接口；不能把电商订单权限当作内容账号权限。
- **建议接入顺序：** 登录开放平台确认应用类型、店铺授权、订单 API 申请范围和消息订阅；另向平台工单核实笔记互动、评论或私信 API 的当前开放范围。未获得明确答复前，内容互动以人工汇总为准。
- 官方资料：[API 文档目录](https://open.xiaohongshu.com/document/api)、[SDK 使用说明](https://open.xiaohongshu.com/document/developer/file/42)、[售后接口和消息更新公告](https://open.xiaohongshu.com/platformSupport/notice/31/155)。

### 淘宝 / 天猫

- [淘宝开放平台文档中心](https://open.taobao.com/docs/doc_index.htm) 提供接入指南、API 权限申请、用户授权、应用环境和消息文档入口。可把 `taobao.trades.sold.get`、`taobao.trade.fullinfo.get` 作为订单查询候选接口，具体能否申请取决于应用身份、店铺授权及权限包。
- [消息服务文档](https://open.taobao.com/doc.htm?docId=101663&docType=1) 独立于交易 API；接入时要核实目标店铺可授权的消息类型、订阅方式及历史消息能力，不能直接假设覆盖所有旺旺会话。
- 本轮没有核实到适用于该工作台的内容互动/营销数据 API。先用订单来源标记和手动汇总做归因。
- **建议接入顺序：** 确认淘宝账号已经开店及服务类目准入，再创建商家后台应用，核实交易与消息权限包；密钥和令牌必须放在本地服务端，不能写入 GitHub Pages 静态前端。
- 官方资料：[文档中心](https://open.taobao.com/docs/doc_index.htm)、[用户授权介绍](https://open.taobao.com/doc.htm?docId=102635&docType=1)、[消息服务](https://open.taobao.com/doc.htm?docId=101663&docType=1)。

### 拼多多

- 官方 API 文档目录可查到 `pdd.order.information.get`（订单信息）和 `pdd.order.status.get`（订单状态）等 API 条目；参数、数据范围、频控与当前账号可申请权限需登录控制台后确认。
- 公开检索结果不足以证明商家开放平台有通用买家会话读取/回复接口，也不足以确认订单来源或商品互动的分析 API。不要将多多客推广 API 当作商家店铺 API。
- **建议接入顺序：** 用现有个人店铺账号登录控制台，确认开发者/应用身份是否通过审核、店铺是否可授权订单查询权限；如没有消息权限，则收件箱先保留人工录入。
- 官方资料：[拼多多开放平台 API 文档目录](https://open.pinduoduo.com/application/document/api)、[订单信息 API](https://open.pinduoduo.com/application/document/api?id=pdd.order.information.get)、[订单状态 API](https://open.pinduoduo.com/application/document/api?id=pdd.order.status.get)、[接入方案](https://open.pinduoduo.com/application/document/browse?idStr=ACD8CDA5CA04B827)。

### 闲鱼

- [闲鱼合作方服务端文档](https://open.goofish.com/doc/development/dev/server.html) 列出 `alibaba.idle.isv.order.query`、退款查询及 `idle_autotrade_OrderStateSync` / `idle_autotrade_RefundSync` 交易消息。这些能力对应闲鱼开放平台合作方/小程序交易链路。
- [快速接入文档](https://open.goofish.com/doc/quick-start.html) 写明闲鱼小程序面向运营定向邀请服务商，且需要在管理平台为具体 TOP API 申请权限。因此不能据此推断普通闲鱼账号或个人店铺可同步订单。
- 文档中的订单查询结果可能包含买家姓名、地址、电话等敏感字段。未来后端仅按必要字段最小化保存；不把收件地址、电话或 access token 放入工作台页面、Git 仓库或营销分析。
- **建议接入顺序：** 先确认是否能获得闲鱼服务商邀请/合作方资格及目标订单场景权限；没有该资格前，闲鱼只作为手工订单来源。
- 官方资料：[合作方服务端文档](https://open.goofish.com/doc/development/dev/server.html)、[快速接入](https://open.goofish.com/doc/quick-start.html)、[常见问题](https://open.goofish.com/doc/development/other/questions.html)。

## 接入建议与未决项

1. 先把工作台的数据契约定为平台、平台订单 ID、订单状态、成交时间、金额、内容主题来源、最后同步时间；订单成功以平台交易完成状态为准，并使用平台+订单 ID 去重。
2. 收件箱、订单、内容指标分开申请权限。优先做只读订单同步和成功订单台账；客服读取/发送、退款、发货等写操作按平台权限单独启用。
3. 当前网页是公开静态前端，不具备安全保存平台密钥、刷新令牌、接收回调或保护真实订单数据的后端。上线真实账号接入前，需要本地后端；未来扩展服务器时再迁移到托管后端和数据库。
4. 注意力矩阵里的订单只从成功订单台账计算；无官方可用指标时显示“未接入/未知”，不要把未知填成 0。每条营销指标保留平台、内容主题、统计区间和来源。
5. 后续需要逐个平台在登录态下复核：账号主体和类目资格、应用审核、店铺授权、权限包、数据字段脱敏、消息推送/轮询限制、接口频控、数据保留要求。文档更新或权限变化后重新核验。
