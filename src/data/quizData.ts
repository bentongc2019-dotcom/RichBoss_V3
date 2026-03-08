import { ArchetypeType } from '../utils/supabase'

// ===== 20 道信念原型测验题目 =====
// 每题 4 个选项，分别对应 4 种原型：
// A = entrepreneur（创业家）
// B = investor（投资家）
// C = stability（稳健者）
// D = explorer（探险家）

export interface QuizQuestion {
    id: number
    question: string
    options: {
        label: 'A' | 'B' | 'C' | 'D'
        text: string
        archetype: ArchetypeType
    }[]
}

export const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        question: '当你有一笔闲钱时，第一反应是？',
        options: [
            { label: 'A', text: '投入我正在做的项目或生意', archetype: 'entrepreneur' },
            { label: 'B', text: '研究股票、基金或资产配置', archetype: 'investor' },
            { label: 'C', text: '存入银行或买保险', archetype: 'stability' },
            { label: 'D', text: '用来体验新事物或旅行学习', archetype: 'explorer' },
        ],
    },
    {
        id: 2,
        question: '面对失败或亏损，你通常的反应是？',
        options: [
            { label: 'A', text: '迅速复盘，调整策略，重新出发', archetype: 'entrepreneur' },
            { label: 'B', text: '分析原因，调整资产配置模型', archetype: 'investor' },
            { label: 'C', text: '暂停行动，等待更稳定的时机', archetype: 'stability' },
            { label: 'D', text: '视为学习经历，尝试全新方向', archetype: 'explorer' },
        ],
    },
    {
        id: 3,
        question: '你理想的财富来源是？',
        options: [
            { label: 'A', text: '我创立并运营的企业', archetype: 'entrepreneur' },
            { label: 'B', text: '持续增值的投资组合', archetype: 'investor' },
            { label: 'C', text: '稳定的薪水 + 被动收入', archetype: 'stability' },
            { label: 'D', text: '多元化的副业和项目', archetype: 'explorer' },
        ],
    },
    {
        id: 4,
        question: '你最享受哪种状态？',
        options: [
            { label: 'A', text: '带领团队攻克难题，快速成长', archetype: 'entrepreneur' },
            { label: 'B', text: '独立研究，等待时机出手', archetype: 'investor' },
            { label: 'C', text: '按部就班，生活有规律有保障', archetype: 'stability' },
            { label: 'D', text: '不断尝试新领域，保持好奇心', archetype: 'explorer' },
        ],
    },
    {
        id: 5,
        question: '你如何看待"风险"？',
        options: [
            { label: 'A', text: '风险是机会，我愿意为它付代价', archetype: 'entrepreneur' },
            { label: 'B', text: '风险可以通过分散和研究来管控', archetype: 'investor' },
            { label: 'C', text: '风险是需要规避的威胁', archetype: 'stability' },
            { label: 'D', text: '风险让生活更有趣和刺激', archetype: 'explorer' },
        ],
    },
    {
        id: 6,
        question: '你最看重的资产是？',
        options: [
            { label: 'A', text: '我的人脉、品牌和执行力', archetype: 'entrepreneur' },
            { label: 'B', text: '能持续产生回报的金融资产', archetype: 'investor' },
            { label: 'C', text: '房产和有保障的退休金', archetype: 'stability' },
            { label: 'D', text: '技能、经验和人生体验', archetype: 'explorer' },
        ],
    },
    {
        id: 7,
        question: '你的工作动力主要来自？',
        options: [
            { label: 'A', text: '把一个想法做成现实的成就感', archetype: 'entrepreneur' },
            { label: 'B', text: '看到资产数字在增值', archetype: 'investor' },
            { label: 'C', text: '稳定的工作环境和未来保障', archetype: 'stability' },
            { label: 'D', text: '持续学习和探索未知的乐趣', archetype: 'explorer' },
        ],
    },
    {
        id: 8,
        question: '你如何做一个重大决策？',
        options: [
            { label: 'A', text: '快速决策，边做边调整', archetype: 'entrepreneur' },
            { label: 'B', text: '大量研究数据，仔细评估', archetype: 'investor' },
            { label: 'C', text: '寻求专业建议，谨慎行事', archetype: 'stability' },
            { label: 'D', text: '凭直觉和当下感受做决定', archetype: 'explorer' },
        ],
    },
    {
        id: 9,
        question: '你对"被动收入"的理解是？',
        options: [
            { label: 'A', text: '把生意做成能自动运转的系统', archetype: 'entrepreneur' },
            { label: 'B', text: '股息、利息和租金等投资回报', archetype: 'investor' },
            { label: 'C', text: '退休金和保险等安全网', archetype: 'stability' },
            { label: 'D', text: '内容创作或技能变现', archetype: 'explorer' },
        ],
    },
    {
        id: 10,
        question: '朋友如何形容你的金钱习惯？',
        options: [
            { label: 'A', text: '大手笔、愿意为未来投入', archetype: 'entrepreneur' },
            { label: 'B', text: '精打细算、注重长期回报', archetype: 'investor' },
            { label: 'C', text: '保守稳健、不喜欢冒险', archetype: 'stability' },
            { label: 'D', text: '花钱在体验上，不太注重存钱', archetype: 'explorer' },
        ],
    },
    {
        id: 11,
        question: '理想的"自由"对你意味着？',
        options: [
            { label: 'A', text: '有足够资源去实现更大的目标', archetype: 'entrepreneur' },
            { label: 'B', text: '财务独立，不再需要工作', archetype: 'investor' },
            { label: 'C', text: '没有负债，生活无忧无虑', archetype: 'stability' },
            { label: 'D', text: '随时可以去任何我想去的地方', archetype: 'explorer' },
        ],
    },
    {
        id: 12,
        question: '你最欣赏哪类人？',
        options: [
            { label: 'A', text: '从零开始创立企业的创业家', archetype: 'entrepreneur' },
            { label: 'B', text: '通过投资实现财务自由的人', archetype: 'investor' },
            { label: 'C', text: '拥有稳定工作和幸福家庭的人', archetype: 'stability' },
            { label: 'D', text: '走遍世界、活出精彩的自由灵魂', archetype: 'explorer' },
        ],
    },
    {
        id: 13,
        question: '面对一个有利可图但风险高的机会，你会？',
        options: [
            { label: 'A', text: '全力以赴，迅速行动抢先机', archetype: 'entrepreneur' },
            { label: 'B', text: '深入研究，控制仓位后入场', archetype: 'investor' },
            { label: 'C', text: '观望多时，机会消失也能接受', archetype: 'stability' },
            { label: 'D', text: '小额尝试，当作一次探索体验', archetype: 'explorer' },
        ],
    },
    {
        id: 14,
        question: '你认为财富积累最快的方式是？',
        options: [
            { label: 'A', text: '建立可复制可规模化的商业模式', archetype: 'entrepreneur' },
            { label: 'B', text: '复利增值，时间是最好的朋友', archetype: 'investor' },
            { label: 'C', text: '积少成多，坚持储蓄', archetype: 'stability' },
            { label: 'D', text: '不断提升自己的技能与价值', archetype: 'explorer' },
        ],
    },
    {
        id: 15,
        question: '你如何对待金钱上的"负债"？',
        options: [
            { label: 'A', text: '杠杆是工具，用来以小博大', archetype: 'entrepreneur' },
            { label: 'B', text: '好的负债可以接受，坏的要避开', archetype: 'investor' },
            { label: 'C', text: '尽量无债一身轻', archetype: 'stability' },
            { label: 'D', text: '不太在意，活在当下比较重要', archetype: 'explorer' },
        ],
    },
    {
        id: 16,
        question: '如果突然失去稳定收入，你会？',
        options: [
            { label: 'A', text: '抓住机会创业，这正是我要的', archetype: 'entrepreneur' },
            { label: 'B', text: '用现有储蓄和投资维持生计', archetype: 'investor' },
            { label: 'C', text: '立刻寻找新的稳定工作', archetype: 'stability' },
            { label: 'D', text: '利用空档期去旅行或探索新领域', archetype: 'explorer' },
        ],
    },
    {
        id: 17,
        question: '你通常在什么时候最有灵感？',
        options: [
            { label: 'A', text: '看到市场空白或社会痛点时', archetype: 'entrepreneur' },
            { label: 'B', text: '研究市场数据和财报时', archetype: 'investor' },
            { label: 'C', text: '生活有规律、心情平静时', archetype: 'stability' },
            { label: 'D', text: '旅行或接触陌生事物时', archetype: 'explorer' },
        ],
    },
    {
        id: 18,
        question: '你的"成功"定义是？',
        options: [
            { label: 'A', text: '带领团队创造出影响力和价值', archetype: 'entrepreneur' },
            { label: 'B', text: '资产超过某个目标数字', archetype: 'investor' },
            { label: 'C', text: '家人幸福，生活无忧', archetype: 'stability' },
            { label: 'D', text: '过上随心所欲的生活', archetype: 'explorer' },
        ],
    },
    {
        id: 19,
        question: '你最担心的财务噩梦是？',
        options: [
            { label: 'A', text: '项目失败、创业烧光了钱', archetype: 'entrepreneur' },
            { label: 'B', text: '投资判断错误、资产大幅缩水', archetype: 'investor' },
            { label: 'C', text: '失业或生病，收入突然中断', archetype: 'stability' },
            { label: 'D', text: '被固定在某地、失去自由', archetype: 'explorer' },
        ],
    },
    {
        id: 20,
        question: '你觉得"朝九晚五"是？',
        options: [
            { label: 'A', text: '获取资本和经验的跳板，迟早要离开', archetype: 'entrepreneur' },
            { label: 'B', text: '提供稳定现金流去做投资', archetype: 'investor' },
            { label: 'C', text: '安稳且有价值的生活方式', archetype: 'stability' },
            { label: 'D', text: '一种限制，越快突破越好', archetype: 'explorer' },
        ],
    },
]

// ===== 原型信息配置 =====
export const archetypeInfo: Record<
    ArchetypeType,
    {
        name: string
        emoji: string
        color: string
        gradient: string
        tagline: string
        description: string
        strengths: string[]
        blindspots: string[]
        advice: string
    }
> = {
    entrepreneur: {
        name: '创业家型',
        emoji: '🚀',
        color: '#FF6B35',
        gradient: 'from-orange-500 to-red-500',
        tagline: '你天生就是要颠覆世界的那个人',
        description:
            '你拥有极强的行动力和对商机的直觉嗅觉。你不甘于平庸，总在寻找可以落地的机会。你相信执行力大于一切，愿意承担风险来换取更大的可能性。',
        strengths: ['快速决策与执行', '对商机极度敏感', '承受不确定性的能力强', '天然的领导力和感召力'],
        blindspots: ['容易过度扩张，忽视风险管控', '耐心不足，难以专注长期积累', '对系统建立和被动收入重视不够'],
        advice:
            '你最需要的是建立"让钱自动流动"的系统——把你的执行力转化为能自我运转的资产。加入富老板私享会，学习如何把创业力转变为财富系统。',
    },
    investor: {
        name: '投资家型',
        emoji: '📈',
        color: '#D4AF37',
        gradient: 'from-yellow-500 to-amber-400',
        tagline: '让时间和复利为你工作',
        description:
            '你是天生的财富分析师。你相信数据和逻辑，懂得用耐心等待最佳时机。你追求系统性、可量化的资产增长，并且深刻理解复利的力量。',
        strengths: ['冷静客观，不被情绪左右', '善于分析和研究', '长期思维，注重复利积累', '风险管理意识强'],
        blindspots: ['有时过于谨慎而错失机会', '对人脉和创业潜力重视不足', '可能因分析麻痹而迟迟不行动'],
        advice:
            '你已经拥有最重要的财富思维——冷静和耐心。现在需要进一步构建你的财富系统组合，把投资、被动收入和商业机会有机结合。',
    },
    stability: {
        name: '稳健者型',
        emoji: '🏛️',
        color: '#4ECDC4',
        gradient: 'from-teal-400 to-cyan-400',
        tagline: '稳定是底气，系统是突破口',
        description:
            '你珍视稳定和安全感，这是极其宝贵的品质。你是家人和朋友的守护者，你的财务决策以保护为先。但这也意味着，你可能还没有发挥出财富积累的全部潜力。',
        strengths: ['财务纪律极强，能坚持储蓄', '不冲动，做决策前会充分考虑', '家庭责任感强，财务规划周全'],
        blindspots: ['过度规避风险，可能错过财富增值机会', '对通货膨胀的侵蚀重视不足', '缺乏建立资产系统的意识'],
        advice:
            '你最需要的是一个"突破安全区"的财富系统。稳定是基础，但真正的安全来自于多元化的资产和被动收入。富老板的系统能帮你在保持稳健的同时实现增长。',
    },
    explorer: {
        name: '探险家型',
        emoji: '🌍',
        color: '#A855F7',
        gradient: 'from-purple-500 to-violet-500',
        tagline: '你的好奇心是最大的财富',
        description:
            '你是一个自由灵魂，对世界充满好奇。你渴望体验多元的人生，不愿被任何单一的路径所束缚。你的多元化视野和持续学习能力，是这个时代最宝贵的财富。',
        strengths: ['适应力极强，拥抱变化', '跨界思维，创意无限', '持续学习，不断突破认知边界', '对新趋势极度敏感'],
        blindspots: ['容易分散注意力，难以深耕一处', '财务纪律相对薄弱', '可能缺乏长期积累的战略规划'],
        advice:
            '你最需要的是一套"自动运转的财富基础设施"——让系统帮你积累财富，而你专注于探索和体验。富老板的系统正是为你这样的人设计的。',
    },
}
