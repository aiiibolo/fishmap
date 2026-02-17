'use client';

import { useState } from 'react';
import { FISH_DATA } from '@/data/fish';

function Section({ title, defaultOpen, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div className="bg-[#141824] border border-[#2a3040] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#1e2433] transition-colors cursor-pointer"
      >
        <h3 className="text-base font-serif font-bold text-[#e6edf3]">{title}</h3>
        <span className={`text-[#8b949e] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {open && <div className="px-5 pb-5 border-t border-[#2a3040]">{children}</div>}
    </div>
  );
}

export default function RegulationsTab() {
  const fishEntries = Object.entries(FISH_DATA);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-[#4FC3F7] to-[#81C784] bg-clip-text text-transparent mb-2">
          钓鱼须知
        </h2>
        <p className="text-sm text-[#8b949e]">
          新南威尔士州钓鱼法规、装备推荐与安全须知
        </p>
      </div>

      {/* Section 1: Regulations */}
      <Section title="📜 新南威尔士州钓鱼法规" defaultOpen>
        <div className="space-y-5 pt-4">
          <div>
            <h4 className="text-sm font-semibold text-[#e6edf3] mb-3">钓鱼执照 (Fishing Licence)</h4>
            <p className="text-xs text-[#8b949e] mb-3">
              在NSW进行休闲钓鱼需要持有有效的钓鱼执照（18岁以下及部分持卡人士除外）
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2a3040]">
                    <th className="text-left py-2 pr-4 text-[#6b7280] font-medium text-xs">时长</th>
                    <th className="text-left py-2 text-[#6b7280] font-medium text-xs">费用</th>
                  </tr>
                </thead>
                <tbody className="text-[#e6edf3]">
                  {[
                    ['3天', '$7'],
                    ['1个月', '$14'],
                    ['1年', '$35'],
                    ['3年', '$85'],
                  ].map(([duration, price]) => (
                    <tr key={duration} className="border-b border-[#2a3040]/50">
                      <td className="py-2 pr-4 text-xs">{duration}</td>
                      <td className="py-2 text-xs text-[#81C784] font-medium">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#e6edf3] mb-3">尺寸限制与每日限额</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2a3040]">
                    <th className="text-left py-2 pr-4 text-[#6b7280] font-medium text-xs">鱼种</th>
                    <th className="text-left py-2 pr-4 text-[#6b7280] font-medium text-xs">最低尺寸</th>
                    <th className="text-left py-2 text-[#6b7280] font-medium text-xs">每日限额</th>
                  </tr>
                </thead>
                <tbody className="text-[#e6edf3]">
                  {fishEntries.map(([id, fish]) => (
                    <tr key={id} className="border-b border-[#2a3040]/50">
                      <td className="py-1.5 pr-4 text-xs">
                        {fish.emoji} {fish.name}
                      </td>
                      <td className="py-1.5 pr-4 text-xs text-[#f59e0b]">
                        {typeof fish.minSize === 'number' ? `${fish.minSize}cm` : fish.minSize}
                      </td>
                      <td className="py-1.5 text-xs text-[#81C784]">{fish.bagLimit} 条</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-lg p-3">
            <p className="text-xs text-[#ef4444] font-medium">
              ⚠️ 受保护物种: 东部蓝鹦嘴鱼 (Eastern Blue Groper) 自2025年起全面禁止捕捞
            </p>
          </div>
        </div>
      </Section>

      {/* Section 2: Gear */}
      <Section title="🎣 初学者装备推荐">
        <div className="space-y-5 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0d1117] border border-[#2a3040] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🎣</span>
                <h4 className="text-sm font-semibold text-[#4FC3F7]">入门套装 1 — 河口/码头</h4>
              </div>
              <p className="text-xs text-[#8b949e] mb-2">覆盖80%的岸钓场景</p>
              <ul className="text-xs text-[#e6edf3] space-y-1">
                <li>竿: 7ft (2.1m) 2-4kg 纺车竿</li>
                <li>轮: 2500号纺车轮</li>
                <li>线: 6-8lb 尼龙线或PE线</li>
                <li>适用: 码头、河口、防波堤</li>
              </ul>
              <p className="text-xs text-[#81C784] mt-2 font-medium">预算: ~$100-130 AUD</p>
            </div>

            <div className="bg-[#0d1117] border border-[#2a3040] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🏖️</span>
                <h4 className="text-sm font-semibold text-[#4FC3F7]">入门套装 2 — 海滩/岩钓</h4>
              </div>
              <p className="text-xs text-[#8b949e] mb-2">适合远投和大鱼</p>
              <ul className="text-xs text-[#e6edf3] space-y-1">
                <li>竿: 9-10ft (2.7-3m) 4-8kg 投竿</li>
                <li>轮: 4000号纺车轮</li>
                <li>线: 15-20lb PE线 + 前导线</li>
                <li>适用: 海滩、岩石平台</li>
              </ul>
              <p className="text-xs text-[#81C784] mt-2 font-medium">预算: ~$130-150 AUD</p>
            </div>
          </div>

          <div className="bg-[#0d1117] rounded-lg p-4">
            <h4 className="text-sm font-semibold text-[#e6edf3] mb-2">💰 预算总览</h4>
            <p className="text-xs text-[#8b949e]">
              完整入门套装 (竿+轮+线+钩+铅+饵): <span className="text-[#81C784] font-medium">$200-300 AUD</span>
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#e6edf3] mb-3">三种必学线组</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  name: 'Running Sinker',
                  nameCn: '活铅线组',
                  desc: '最基础的底钓线组，铅坠可自由滑动，适合各种底层鱼',
                },
                {
                  name: 'Paternoster',
                  nameCn: '天平线组',
                  desc: '双钩底钓线组，一次可挂两种不同饵料，适合码头和防波堤',
                },
                {
                  name: 'Float Rig',
                  nameCn: '浮漂线组',
                  desc: '可调节深度，适合钓中上层鱼类，视觉观察咬口',
                },
              ].map((rig) => (
                <div key={rig.name} className="bg-[#0d1117] border border-[#2a3040] rounded-lg p-3">
                  <div className="text-xs font-semibold text-[#4FC3F7] mb-1">{rig.name}</div>
                  <div className="text-[10px] text-[#8b949e] mb-1">{rig.nameCn}</div>
                  <p className="text-[11px] text-[#e6edf3]">{rig.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Section 3: Safety */}
      <Section title="⚠️ 安全须知">
        <div className="space-y-5 pt-4">
          <div className="bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-[#ef4444] mb-2">🪨 岩钓安全警告</h4>
            <p className="text-xs text-[#e6edf3]">
              岩钓是澳大利亚最危险的户外活动之一。<span className="text-[#ef4444] font-medium">每年NSW约有8人因岩钓丧生</span>，多数事故由意外巨浪造成。
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#e6edf3] mb-3">安全守则</h4>
            <ul className="space-y-2">
              {[
                '不要背对大海 — 始终注意海浪情况',
                '不要独自岩钓 — 至少两人同行',
                '穿救生衣 (PFD) — 岩钓时必须穿戴',
                '穿防滑鞋 — 有钉/防滑底的矶钓鞋',
                '查看天气和海况预报 — 避免大浪天气',
                '告知他人你的钓鱼计划和预计返回时间',
                '不要在湿滑或青苔覆盖的岩石上行走',
                '携带手机并确保有信号覆盖',
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#e6edf3]">
                  <span className="text-[#f59e0b] mt-0.5 shrink-0">●</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-lg p-3 text-center">
            <p className="text-sm font-semibold text-[#ef4444]">
              紧急情况请拨打 000
            </p>
            <p className="text-xs text-[#8b949e] mt-1">
              Water Police: 13 12 36 | Marine Rescue: VHF Ch 16
            </p>
          </div>

          <div className="bg-[#0d1117] rounded-lg p-4">
            <h4 className="text-sm font-semibold text-[#e6edf3] mb-2">🕐 最佳钓鱼时间</h4>
            <ul className="space-y-1.5 text-xs text-[#e6edf3]">
              <li><span className="text-[#f59e0b]">🌅 黎明和黄昏</span> — 鱼类最活跃的进食时段</li>
              <li><span className="text-[#4FC3F7]">🌊 涨潮至满潮</span> — 水流带来食物，鱼群靠近岸边</li>
              <li><span className="text-[#8b949e]">🌙 大潮期间</span> — 满月和新月前后几天</li>
              <li><span className="text-[#81C784]">☁️ 阴天或微风</span> — 鱼类戒心降低，更容易咬钩</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
