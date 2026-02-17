'use client';

import { useState } from 'react';
import { FISH_DATA } from '@/data/fish';
import { useLanguage, localized } from '@/lib/i18n';

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
  const { lang } = useLanguage();

  const t = {
    zh: {
      // Page header
      pageTitle: '钓鱼须知',
      pageSubtitle: '新南威尔士州钓鱼法规、装备推荐与安全须知',

      // Section titles
      sectionRegulations: '📜 新南威尔士州钓鱼法规',
      sectionGear: '🎣 初学者装备推荐',
      sectionSafety: '⚠️ 安全须知',

      // Fishing licence
      licenceTitle: '钓鱼执照 (Fishing Licence)',
      licenceDesc: '在NSW进行休闲钓鱼需要持有有效的钓鱼执照（18岁以下及部分持卡人士除外）',
      thDuration: '时长',
      thFee: '费用',
      dur3d: '3天',
      dur1m: '1个月',
      dur1y: '1年',
      dur3y: '3年',

      // Size limits
      sizeLimitsTitle: '尺寸限制与每日限额',
      thSpecies: '鱼种',
      thMinSize: '最低尺寸',
      thBagLimit: '每日限额',
      bagLimitUnit: '条',

      // Protected species
      protectedWarning: '⚠️ 受保护物种: 东部蓝鹦嘴鱼 (Eastern Blue Groper) 自2025年起全面禁止捕捞',

      // Gear kits
      kit1Title: '入门套装 1 — 河口/码头',
      kit1Desc: '覆盖80%的岸钓场景',
      kit1Rod: '竿: 7ft (2.1m) 2-4kg 纺车竿',
      kit1Reel: '轮: 2500号纺车轮',
      kit1Line: '线: 6-8lb 尼龙线或PE线',
      kit1Use: '适用: 码头、河口、防波堤',
      kit1Budget: '预算: ~$100-130 AUD',

      kit2Title: '入门套装 2 — 海滩/岩钓',
      kit2Desc: '适合远投和大鱼',
      kit2Rod: '竿: 9-10ft (2.7-3m) 4-8kg 投竿',
      kit2Reel: '轮: 4000号纺车轮',
      kit2Line: '线: 15-20lb PE线 + 前导线',
      kit2Use: '适用: 海滩、岩石平台',
      kit2Budget: '预算: ~$130-150 AUD',

      // Budget overview
      budgetTitle: '💰 预算总览',
      budgetDesc: '完整入门套装 (竿+轮+线+钩+铅+饵):',

      // Rigs
      rigsTitle: '三种必学线组',
      rigRunningSinkerDesc: '最基础的底钓线组，铅坠可自由滑动，适合各种底层鱼',
      rigPaternosterDesc: '双钩底钓线组，一次可挂两种不同饵料，适合码头和防波堤',
      rigFloatDesc: '可调节深度，适合钓中上层鱼类，视觉观察咬口',

      // Safety
      rockWarningTitle: '🪨 岩钓安全警告',
      rockWarningText1: '岩钓是澳大利亚最危险的户外活动之一。',
      rockWarningText2: '每年NSW约有8人因岩钓丧生',
      rockWarningText3: '，多数事故由意外巨浪造成。',
      safetyRulesTitle: '安全守则',
      rule1: '不要背对大海 — 始终注意海浪情况',
      rule2: '不要独自岩钓 — 至少两人同行',
      rule3: '穿救生衣 (PFD) — 岩钓时必须穿戴',
      rule4: '穿防滑鞋 — 有钉/防滑底的矶钓鞋',
      rule5: '查看天气和海况预报 — 避免大浪天气',
      rule6: '告知他人你的钓鱼计划和预计返回时间',
      rule7: '不要在湿滑或青苔覆盖的岩石上行走',
      rule8: '携带手机并确保有信号覆盖',
      emergency: '紧急情况请拨打 000',

      // Best fishing times
      bestTimesTitle: '🕐 最佳钓鱼时间',
      timeDawn: '🌅 黎明和黄昏',
      timeDawnDesc: '鱼类最活跃的进食时段',
      timeTide: '🌊 涨潮至满潮',
      timeTideDesc: '水流带来食物，鱼群靠近岸边',
      timeSpring: '🌙 大潮期间',
      timeSpringDesc: '满月和新月前后几天',
      timeOvercast: '☁️ 阴天或微风',
      timeOvercastDesc: '鱼类戒心降低，更容易咬钩',

      // minSize "无" translation
      noLimit: '无',
    },
    en: {
      // Page header
      pageTitle: 'Fishing Info',
      pageSubtitle: 'NSW fishing regulations, gear recommendations and safety information',

      // Section titles
      sectionRegulations: '📜 NSW Fishing Regulations',
      sectionGear: '🎣 Beginner Gear Recommendations',
      sectionSafety: '⚠️ Safety Information',

      // Fishing licence
      licenceTitle: 'Fishing Licence',
      licenceDesc: 'A valid fishing licence is required for recreational fishing in NSW (exemptions for under 18 and certain concession card holders)',
      thDuration: 'Duration',
      thFee: 'Fee',
      dur3d: '3 Days',
      dur1m: '1 Month',
      dur1y: '1 Year',
      dur3y: '3 Years',

      // Size limits
      sizeLimitsTitle: 'Size Limits & Bag Limits',
      thSpecies: 'Species',
      thMinSize: 'Min. Size',
      thBagLimit: 'Bag Limit',
      bagLimitUnit: '',

      // Protected species
      protectedWarning: '⚠️ Protected Species: Eastern Blue Groper — total fishing ban since 2025',

      // Gear kits
      kit1Title: 'Starter Kit 1 — Estuary/Wharf',
      kit1Desc: 'Covers 80% of shore fishing scenarios',
      kit1Rod: 'Rod: 7ft (2.1m) 2\u20134kg spinning rod',
      kit1Reel: 'Reel: 2500 size spinning reel',
      kit1Line: 'Line: 6\u20138lb mono or braid',
      kit1Use: 'Suited for: Wharves, estuaries, breakwalls',
      kit1Budget: 'Budget: ~$100\u2013130 AUD',

      kit2Title: 'Starter Kit 2 — Beach/Rock Fishing',
      kit2Desc: 'Suitable for long casting and larger fish',
      kit2Rod: 'Rod: 9\u201310ft (2.7\u20133m) 4\u20138kg surf rod',
      kit2Reel: 'Reel: 4000 size spinning reel',
      kit2Line: 'Line: 15\u201320lb braid + leader',
      kit2Use: 'Suited for: Beaches, rock platforms',
      kit2Budget: 'Budget: ~$130\u2013150 AUD',

      // Budget overview
      budgetTitle: '💰 Budget Overview',
      budgetDesc: 'Complete starter kit (rod+reel+line+hooks+sinkers+bait):',

      // Rigs
      rigsTitle: 'Three Essential Rigs',
      rigRunningSinkerDesc: 'The most basic bottom fishing rig with a free-sliding sinker. Suitable for all bottom-dwelling fish',
      rigPaternosterDesc: 'Two-hook bottom rig allowing two different baits at once. Great for wharves and breakwalls',
      rigFloatDesc: 'Adjustable depth for mid-water fish. Visual bite detection',

      // Safety
      rockWarningTitle: '🪨 Rock Fishing Safety Warning',
      rockWarningText1: 'Rock fishing is one of Australia\'s most dangerous outdoor activities.',
      rockWarningText2: 'Around 8 people die rock fishing in NSW each year',
      rockWarningText3: ', most caused by unexpected large waves.',
      safetyRulesTitle: 'Safety Rules',
      rule1: 'Never turn your back to the sea — always watch the waves',
      rule2: 'Never fish alone — always go with at least one other person',
      rule3: 'Wear a life jacket (PFD) — mandatory for rock fishing',
      rule4: 'Wear non-slip shoes — cleated/grip-sole rock fishing boots',
      rule5: 'Check weather and sea conditions — avoid rough seas',
      rule6: 'Tell someone your fishing plan and expected return time',
      rule7: 'Avoid walking on wet or algae-covered rocks',
      rule8: 'Carry a mobile phone and ensure signal coverage',
      emergency: 'Emergency: Call 000',

      // Best fishing times
      bestTimesTitle: '🕐 Best Fishing Times',
      timeDawn: '🌅 Dawn and dusk',
      timeDawnDesc: 'Most active feeding periods',
      timeTide: '🌊 Incoming to high tide',
      timeTideDesc: 'Current brings food, fish move closer to shore',
      timeSpring: '🌙 Spring tides',
      timeSpringDesc: 'A few days around full and new moon',
      timeOvercast: '☁️ Overcast or light breeze',
      timeOvercastDesc: 'Fish are less cautious and more likely to bite',

      // minSize "无" translation
      noLimit: 'None',
    },
  }[lang];

  const licenceFees: [string, string][] = [
    [t.dur3d, '$7'],
    [t.dur1m, '$14'],
    [t.dur1y, '$35'],
    [t.dur3y, '$85'],
  ];

  const rigs = [
    {
      name: 'Running Sinker',
      nameCn: '活铅线组',
      desc: t.rigRunningSinkerDesc,
    },
    {
      name: 'Paternoster',
      nameCn: '天平线组',
      desc: t.rigPaternosterDesc,
    },
    {
      name: 'Float Rig',
      nameCn: '浮漂线组',
      desc: t.rigFloatDesc,
    },
  ];

  const safetyRules = [
    t.rule1,
    t.rule2,
    t.rule3,
    t.rule4,
    t.rule5,
    t.rule6,
    t.rule7,
    t.rule8,
  ];

  /** Display minSize with i18n support */
  function renderMinSize(fish: (typeof FISH_DATA)[string]) {
    if (typeof fish.minSize === 'number') {
      return `${fish.minSize}cm`;
    }
    // String value — check for English override
    if (lang === 'en') {
      if (fish.minSizeEn) return fish.minSizeEn;
      // Translate "无" to "None"
      if (fish.minSize === '无') return t.noLimit;
      return fish.minSize;
    }
    return fish.minSize;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-[#4FC3F7] to-[#81C784] bg-clip-text text-transparent mb-2">
          {t.pageTitle}
        </h2>
        <p className="text-sm text-[#8b949e]">
          {t.pageSubtitle}
        </p>
      </div>

      {/* Section 1: Regulations */}
      <Section title={t.sectionRegulations} defaultOpen>
        <div className="space-y-5 pt-4">
          <div>
            <h4 className="text-sm font-semibold text-[#e6edf3] mb-3">{t.licenceTitle}</h4>
            <p className="text-xs text-[#8b949e] mb-3">
              {t.licenceDesc}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2a3040]">
                    <th className="text-left py-2 pr-4 text-[#6b7280] font-medium text-xs">{t.thDuration}</th>
                    <th className="text-left py-2 text-[#6b7280] font-medium text-xs">{t.thFee}</th>
                  </tr>
                </thead>
                <tbody className="text-[#e6edf3]">
                  {licenceFees.map(([duration, price]) => (
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
            <h4 className="text-sm font-semibold text-[#e6edf3] mb-3">{t.sizeLimitsTitle}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2a3040]">
                    <th className="text-left py-2 pr-4 text-[#6b7280] font-medium text-xs">{t.thSpecies}</th>
                    <th className="text-left py-2 pr-4 text-[#6b7280] font-medium text-xs">{t.thMinSize}</th>
                    <th className="text-left py-2 text-[#6b7280] font-medium text-xs">{t.thBagLimit}</th>
                  </tr>
                </thead>
                <tbody className="text-[#e6edf3]">
                  {fishEntries.map(([id, fish]) => (
                    <tr key={id} className="border-b border-[#2a3040]/50">
                      <td className="py-1.5 pr-4 text-xs">
                        {fish.emoji} {localized(fish, 'name', lang)}
                      </td>
                      <td className="py-1.5 pr-4 text-xs text-[#f59e0b]">
                        {renderMinSize(fish)}
                      </td>
                      <td className="py-1.5 text-xs text-[#81C784]">
                        {fish.bagLimit}{t.bagLimitUnit ? ` ${t.bagLimitUnit}` : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-lg p-3">
            <p className="text-xs text-[#ef4444] font-medium">
              {t.protectedWarning}
            </p>
          </div>
        </div>
      </Section>

      {/* Section 2: Gear */}
      <Section title={t.sectionGear}>
        <div className="space-y-5 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0d1117] border border-[#2a3040] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🎣</span>
                <h4 className="text-sm font-semibold text-[#4FC3F7]">{t.kit1Title}</h4>
              </div>
              <p className="text-xs text-[#8b949e] mb-2">{t.kit1Desc}</p>
              <ul className="text-xs text-[#e6edf3] space-y-1">
                <li>{t.kit1Rod}</li>
                <li>{t.kit1Reel}</li>
                <li>{t.kit1Line}</li>
                <li>{t.kit1Use}</li>
              </ul>
              <p className="text-xs text-[#81C784] mt-2 font-medium">{t.kit1Budget}</p>
            </div>

            <div className="bg-[#0d1117] border border-[#2a3040] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🏖️</span>
                <h4 className="text-sm font-semibold text-[#4FC3F7]">{t.kit2Title}</h4>
              </div>
              <p className="text-xs text-[#8b949e] mb-2">{t.kit2Desc}</p>
              <ul className="text-xs text-[#e6edf3] space-y-1">
                <li>{t.kit2Rod}</li>
                <li>{t.kit2Reel}</li>
                <li>{t.kit2Line}</li>
                <li>{t.kit2Use}</li>
              </ul>
              <p className="text-xs text-[#81C784] mt-2 font-medium">{t.kit2Budget}</p>
            </div>
          </div>

          <div className="bg-[#0d1117] rounded-lg p-4">
            <h4 className="text-sm font-semibold text-[#e6edf3] mb-2">{t.budgetTitle}</h4>
            <p className="text-xs text-[#8b949e]">
              {t.budgetDesc} <span className="text-[#81C784] font-medium">$200-300 AUD</span>
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#e6edf3] mb-3">{t.rigsTitle}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {rigs.map((rig) => (
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
      <Section title={t.sectionSafety}>
        <div className="space-y-5 pt-4">
          <div className="bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-[#ef4444] mb-2">{t.rockWarningTitle}</h4>
            <p className="text-xs text-[#e6edf3]">
              {t.rockWarningText1}<span className="text-[#ef4444] font-medium">{t.rockWarningText2}</span>{t.rockWarningText3}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#e6edf3] mb-3">{t.safetyRulesTitle}</h4>
            <ul className="space-y-2">
              {safetyRules.map((rule, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#e6edf3]">
                  <span className="text-[#f59e0b] mt-0.5 shrink-0">●</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-lg p-3 text-center">
            <p className="text-sm font-semibold text-[#ef4444]">
              {t.emergency}
            </p>
            <p className="text-xs text-[#8b949e] mt-1">
              Water Police: 13 12 36 | Marine Rescue: VHF Ch 16
            </p>
          </div>

          <div className="bg-[#0d1117] rounded-lg p-4">
            <h4 className="text-sm font-semibold text-[#e6edf3] mb-2">{t.bestTimesTitle}</h4>
            <ul className="space-y-1.5 text-xs text-[#e6edf3]">
              <li><span className="text-[#f59e0b]">{t.timeDawn}</span> — {t.timeDawnDesc}</li>
              <li><span className="text-[#4FC3F7]">{t.timeTide}</span> — {t.timeTideDesc}</li>
              <li><span className="text-[#8b949e]">{t.timeSpring}</span> — {t.timeSpringDesc}</li>
              <li><span className="text-[#81C784]">{t.timeOvercast}</span> — {t.timeOvercastDesc}</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
