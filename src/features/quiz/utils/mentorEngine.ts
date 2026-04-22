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

  // Get background patterns (tutorPoint > 0 but not primary/secondary)
  const bgPatterns = report.prototypes.filter(p => !p.isPrimary && !p.isSecondary && p.tutorPoint > 0);

  // Default values
  let oneLinePersona = `「这是一个以 ${primaryName} 模式为核心驱动的行动者。」`;
  let dynamicScript = [
    `起点：${primaryName} 模式上线。当遇到挑战时，倾向于首先用此模式应对。`,
    `如果压力持续，可能会引发次生反应，进入防御状态，降低沟通效率。`,
    `对导师来说：这反映了对方在潜意识中渴望被肯定或害怕失控，需要提供安全感。`
  ];
  let growthDirection = [
    `关键转变：帮助其觉察 ${primaryName} 模式的局限，鼓励在不完美中采取微小行动。`
  ];
  let scenarios = [
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

  // Specific logic for Katherine's Archetype (V2 + A3 + S3)
  const isKatherineType = 
    (primaryId === 'V2' || secondaryId === 'V2') && 
    (primaryId === 'A3' || secondaryId === 'A3' || report.secondaryPrototypes.some(p => p.id === 'A3'));

  if (isKatherineType || primaryId === 'V2') {
    oneLinePersona = `「思考很多、标准不低，对自己略严苛，行动阈值偏高的稳定思考者。」`;
    
    dynamicScript = [
      `起点：V2 自我怀疑上线。内在语气类似：「这件事好像我还不够格…再准备一下比较安全。」结果：推迟承诺、迟疑不决。`,
      `继续：A3 理性拖延接力。表面行为是继续找资料、问意见。话术常见：「我再想一想」「等我更清楚一点再开始。」外界看到的是「迟迟没动」。`,
      `后段：S3 过度责任 & 控制启动。事情拖得越久，压力越大，越容易把责任往自己身上揽：「是不是我哪里没做好？」事后进入「我来收拾局面」的角色。`,
      `人际场景中的叠加：担心拒绝别人、提出不同意见会让对方觉得不好相处（R2/R3），安排时间时容易把别人的事排前面。`,
      `对导师来说：Ta 不是缺乏能力，而是「自我评价偏保守 + 行动门槛偏高」，加上一点「出事先怪自己」和「关系里尽量不要麻烦别人」。`
    ];

    growthDirection = [
      `价值轴：从 V2 自我怀疑 → 价值创造者。从「我值不值得？」变成「我已经在创造什么价值？下一小步可以创造什么？」`,
      `主体性轴：从 A3 理性拖延 → 主动创造者（前段）。从「再想想」变成「在不完美中迈出第一小步，再边走边调整。」`,
      `稳定轴：从 S3 过度责任 → 稳定创造者（中轻度）。从「出了事我先扛」转为「先区分：系统问题/分工问题/我自己的问题」。`,
      `导师策略：在营期中，可以当作典型的「由怀疑驱动的理性思考者」，帮助升级成「敢出手的稳定创造者」。`
    ];

    scenarios = [
      {
        title: '场景 A：营期第 1 次解读报告（小组或 1v1）',
        goal: `让其感到被理解，点出 V2+A3+S3，种下「看见就是改变」的种子。`,
        script: `「${name}，你这份图谱给我的感觉是——你其实是一个很认真、想事情很深的人。\n\n在‘价值’这条主轴上，你对自己有一点严苛，比较容易先问自己：『我够不够好？我准备得够不够？』所以在要开始行动前，你比较习惯多想几轮、确认多一点，再出手。\n\n另外一条很明显的是所谓的『理性拖延』：不是你不想做，而是脑子里会跑很多分析、很多‘再等等’，结果外面看到的是：事情还没真正开始。\n\n再加上，你对责任其实挺敏感的。出了状况，你会先往自己身上找问题，然后会想办法去把事情补回来、稳住局面。\n\n我想先跟你说一件事：这些不是缺点，这是你现在比较习惯的『行走方式』。真正关键的是——你已经开始看见它了。在【商业与你】里，我们有一句话：**看见，本身就已经在改变。**\n\n接下来三天，我们不会要你变成完全不同的人，而是陪你玩一个实验：在保持你认真、负责的前提下，看看有没有可能，让自己多迈出一点点小步，允许自己不那么完美，也可以先行动。」`
      },
      {
        title: '场景 B：小组练习中，分析很多但迟迟不做决定',
        goal: `打破一直思考的循环，让其试着落地。`,
        script: `「${name}，我听得出来你脑子里其实已经跑过很多种可能。我想邀请你试试另外一种玩法：如果我们不要求这一次‘想得完全清楚’，只问你一个问题——‘你现在最想先试的一小步，会是什么？’\n\n我们先不管这一步是不是完美，只当作一个小实验。让你脑子里的那些分析，有一个落地试看的机会。你觉得呢？」\n\n*(如果仍犹豫)*：「就把这次当作一个安全的实验场，不是你一个人负责最后结果，全组会一起扛。你只需要给出你‘当下版本’的选择就好。」`
      },
      {
        title: '场景 C：项目任务前，需要其承担关键角色时',
        goal: `轻轻挑战 A3 理性拖延，同时照顾到 V2 自我怀疑。`,
        script: `「接下来这个小项目，我其实蛮想请你担任一个关键角色——不是那种『一个人扛全部』，而是请你帮大家做第一轮的结构梳理和风险提醒。\n\n我知道你习惯想得很清楚才行动，所以我们换个游戏规则：不是要你一次就想对，而是——在 10 分钟内，给出一个 70 分的第一版结构，然后让大家在上面一起加、一起修。\n\n你可以先把自己从『我要想到完美才敢说』调整到『我给大家一个起点，然后一起变得更好』。我很想看看，你那颗想很多的大脑，在这样的限制之下，会跑出什么有趣的东西。」`
      },
      {
        title: '场景 D：一天或一轮活动结束后的 1v1 深度 debrief',
        goal: `帮其连线：自我怀疑 → 理性拖延 → 过度责任。`,
        script: `「今天这一整天，你有没有察觉到，哪一段是你脑子里在跑很多版本、但身体比较难动起来的？\n\n如果我们把早上的测评拿出来看，其实很呼应：你一方面对自己要求不低，另一方面又容易先对自己说：『我可能还不够好，再想一下。』然后时间过去了，事情也还没开始做，等到真的要动手了，你就会感觉压力上来了，甚至有一点想把责任多扛一点，去补之前‘没开始’的那一段。\n\n这些都很正常。重要的是——你已经看见这一条链路了。\n\n如果给你一个机会重来一次，同样的情境，你会不会愿意试试看：『先做一件很小的小动作，让自己先从 0 分变成 60 分，再慢慢往 80、90 分走？』\n\n你觉得，对你来说，那个‘小动作’会是什么？」`
      }
    ];
  } else if (primaryId === 'S1') {
    dynamicScript = [
      `起点：S1 控制上线。内在语气类似：「只有我亲自盯着才放心。」结果：微观管理、过度介入。`,
      `继续：表面行为是频繁确认进度，不敢放权。`,
      `对导师来说：Ta 需要建立对团队和系统的信任，而不是单纯依赖个人控制力。`
    ];
    growthDirection = [
      `稳定轴：从 S1 控制 → 赋能型领导者。从「我要掌控一切」变成「我如何设计系统让别人发挥？」`,
      `导师策略：帮助其从执行层抽离，体验放权带来的杠杆效应。`
    ];
  }

  return {
    oneLinePersona,
    dynamicScript,
    growthDirection,
    scenarios
  };
}
