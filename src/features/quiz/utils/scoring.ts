
import { FinalReport, Profile, AxisResult, PrototypeResult, AxisType } from '../types';
import { QUESTIONS, PROTOTYPE_DESCRIPTIONS, AXIS_MAP } from '../constants';

export const calculateReport = (profile: Profile, answers: Record<number, number>): FinalReport => {
  const itemPoints = (score: number) => {
    if (score >= 4) return 1;
    if (score === 3) return 0.5;
    return 0;
  };

  // Grouped by prototype
  const prototypeResults: PrototypeResult[] = [];
  const prototypeIds = Object.keys(PROTOTYPE_DESCRIPTIONS);

  prototypeIds.forEach(pId => {
    const pQs = QUESTIONS.filter(q => q.prototypeId === pId);
    let rawScore = 0;
    let tutorPoint = 0;
    let hasHighIntensity = false;

    pQs.forEach(q => {
      const score = answers[q.id] || 0;
      rawScore += score;
      tutorPoint += itemPoints(score);
      if (score >= 4) hasHighIntensity = true;
    });

    prototypeResults.push({
      id: pId,
      name: PROTOTYPE_DESCRIPTIONS[pId].name,
      axis: pQs[0].axis,
      rawScore,
      tutorPoint,
      hasHighIntensity,
      isPrimary: false,
      isSecondary: false,
      isPotential: false,
      description: PROTOTYPE_DESCRIPTIONS[pId].desc
    });
  });

  // Ranking Prototypes
  const sortedPrototypes = [...prototypeResults].sort((a, b) => b.tutorPoint - a.tutorPoint);
  const eligiblePrototypes = sortedPrototypes.filter(p => p.tutorPoint >= 1 && p.hasHighIntensity);

  if (eligiblePrototypes.length > 0) {
    const maxPoint = eligiblePrototypes[0].tutorPoint;
    
    // Primary
    eligiblePrototypes.forEach((p, idx) => {
      const actualP = prototypeResults.find(orig => orig.id === p.id)!;
      if (p.tutorPoint === maxPoint) {
        actualP.isPrimary = true;
      } else if (idx === 1 || (eligiblePrototypes[0].isPrimary && p.tutorPoint < maxPoint && idx === 1)) {
        // Simple secondary logic for this app
        actualP.isSecondary = true;
      } else {
        actualP.isPotential = true;
      }
    });
  }

  // Axis Calculation
  const axisTypes: AxisType[] = ['V', 'R', 'S', 'A'];
  const axisResults: AxisResult[] = axisTypes.map(type => {
    const axisPrototypes = prototypeResults.filter(p => p.axis === type);
    const rawScore = axisPrototypes.reduce((acc, p) => acc + p.rawScore, 0);
    const tutorPoint = axisPrototypes.reduce((acc, p) => acc + p.tutorPoint, 0);
    
    return {
      id: type,
      name: AXIS_MAP[type],
      rawScore,
      tutorPoint,
      isPrimary: false
    };
  });

  // Primary Axis logic
  const maxAxisPoint = Math.max(...axisResults.map(a => a.tutorPoint));
  axisResults.forEach(a => {
    if (a.tutorPoint >= maxAxisPoint - 0.5 && a.tutorPoint > 0) {
      a.isPrimary = true;
    }
  });

  return {
    profile,
    answers,
    prototypes: prototypeResults,
    axes: axisResults,
    primaryPrototypes: prototypeResults.filter(p => p.isPrimary),
    secondaryPrototypes: prototypeResults.filter(p => p.isSecondary),
    potentialPrototypes: prototypeResults.filter(p => p.isPotential),
    primaryAxes: axisResults.filter(a => a.isPrimary)
  };
};
