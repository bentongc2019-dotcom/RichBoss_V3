import { FinalReport, PrototypeResult } from '../types';

export interface MentorAnalysis {
  oneLinePersona: string;
  dynamicScript: string[];
  growthDirection: string[];
  scenarios: {
    title: string;
    goal: string;
    script: string;
  }[];
}

export function generateMentorAnalysis(report: FinalReport): MentorAnalysis {
  const name = report.profile.name || '学员';
  
  // Find top prototypes
  const primary = report.primaryPrototypes.length > 0 ? report.primaryPrototypes[0] : null;
  const secondary = report.primaryPrototypes.length > 1 ? report.primaryPrototypes[1] : (report.secondaryPrototypes[0] || null);
  
  const primaryName = primary ? primary.name.split(' ')[0] : '核心';
  const primaryId = primary ? primary.id : '未知';
  
  const secondaryName = secondary ? secondary.name.split(' ')[0] : '';
  const secondaryId = secondary ? secondary.id : '';

  // 1. One Line Persona
  let oneLinePersona = `「这是一个以 ${primaryName} 模式为核心驱动的行动者。」`;
  if (primaryId === 'V2' || secondaryId === 'A3') {
     oneLinePersona = `「思考很多、标准不低，对自己略严苛，行动阈值偏高的稳定思考者。」`;
  } else if (primary) {
     oneLinePersona = `「在压力下容易表现出明显的 ${primaryName} 倾向，需要针对性的支持与破局策略。」`;
  }

  // 2. Dynamic Script
  let dynamicScript = [
    `起点：${primaryName} 模式上线。当遇到挑战时，倾向于首先用此模式应对。`,
    `如果压力持续，可能会引发次生反应，进入防御状态，降低沟通效率。`,
    `对导师来说：这反映了对方在潜意识中渴望被肯定或害怕失控，需要提供安全感。`
  ];
  if (primaryId === 'V2') {
    dynamicScript = [
      `起点：V2 自我怀疑上线。内在语气类似：「这件事好像我还不够格…再准备一下比较安全。」结果：推迟承诺、迟疑不决。`,
      `继续：表面行为可能是继续找资料、问意见。话术常见：「我再想一想」「等我更清楚一点再开始。」`,
      `对导师来说：Ta 不是缺乏能力，而是「自我评价偏保守 + 行动门槛偏高」。`
    ];
  } else if (primaryId === 'S1') {
    dynamicScript = [
      `起点：S1 控制上线。内在语气类似：「只有我亲自盯着才放心。」结果：微观管理、过度介入。`,
      `继续：表面行为是频繁确认进度，不敢放权。`,
      `对导师来说：Ta 需要建立对团队和系统的信任，而不是单纯依赖个人控制力。`
    ];
  }

  // 3. Growth Direction
  let growthDirection = [
    `关键转变：帮助其觉察 ${primaryName} 模式的局限，鼓励在不完美中采取微小行动。`
  ];
  if (primaryId === 'V2') {
    growthDirection = [
      `价值轴：从 V2 自我怀疑 → 价值创造者。从「我值不值得？」变成「我已经在创造什么价值？下一小步可以创造什么？」`,
      `导师策略：在营期中，当作典型的「由怀疑驱动的理性思考者」，帮助升级成「敢出手的稳定创造者」。`
    ];
  } else if (primaryId === 'S1') {
    growthDirection = [
      `稳定轴：从 S1 控制 → 赋能型领导者。从「我要掌控一切」变成「我如何设计系统让别人发挥？」`,
      `导师策略：帮助其从执行层抽离，体验放权带来的杠杆效应。`
    ];
  }

  // 4. Scenarios
  const scenarios = [
    {
      title: '场景 A：营期第 1 次解读报告（破冰）',
      goal: `让其感到被理解，点出 ${primaryId}，种下「看见就是改变」的种子。`,
      script: `「${name}，你这份图谱给我的感觉是——你其实是一个很认真、有追求的人。\n\n在遇到决策时，你容易触发 ${primaryName} 模式。我想先跟你说一件事：这绝不是缺点，这是你现在比较习惯的『行走方式』。\n\n真正关键的是——你已经开始看见它了。在【商业与你】里，我们有一句话：**看见，本身就已经在改变。**」`
    },
    {
      title: '场景 B：遇到瓶颈或迟疑时（深入挖掘）',
      goal: `打破 ${primaryName} 的循环，让其试着落地。`,
      script: `「${name}，我听得出来你脑子里其实已经跑过很多种可能。如果我们不要求这一次‘想得完全清楚’，只问你一个问题——‘你现在最想先试的一小步，会是什么？’\n\n就把这次当作一个安全的实验场，不要求完美，只要求开始。」`
    },
    {
      title: '场景 C：项目任务委派（行动号召）',
      goal: `轻轻挑战 ${primaryId} 模式，提供安全网。`,
      script: `「接下来这个小项目，我想请你担任一个关键角色。我知道你习惯 ${primaryName} 的状态，所以我们换个游戏规则：不是要你一次就做到 100 分，而是给出一个 70 分的第一版结构，然后让大家一起来修。\n\n我很想看看，你在这样的限制下，会跑出什么有趣的东西。」`
    },
    {
      title: '场景 D：活动结束后的深度 debrief（闭环升单）',
      goal: `连线行为模式，引导报名 MPI。`,
      script: `「今天这一天，你有没有察觉到哪一段你又进入了 ${primaryName} 的状态？\n\n如果我们把早上的测评拿出来看，其实很呼应。如果你愿意多看一眼、多试一步，你的信念系统，其实已经在悄悄往前进化了。\n\n接下来，通过 MPI 进化罗盘的深度梳理，我们可以一起把这个底层程序重构。你准备好跨出这一步了吗？」`
    }
  ];

  return {
    oneLinePersona,
    dynamicScript,
    growthDirection,
    scenarios
  };
}
