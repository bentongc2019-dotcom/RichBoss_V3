
export type AxisType = 'V' | 'R' | 'S' | 'A';

export interface PrototypeInfo {
  id: string;
  axis: AxisType;
  name: string;
  description: string;
}

export interface Question {
  id: number;
  code: string; // e.g. V1-1
  text: string;
  axis: AxisType;
  prototypeId: string; // e.g. V1
}

export interface Profile {
  name: string;
  contact: string;
}

export interface PrototypeResult {
  id: string;
  name: string;
  axis: AxisType;
  rawScore: number;      // 3-15
  tutorPoint: number;    // 0-3
  isPrimary: boolean;
  isSecondary: boolean;
  isPotential: boolean;
  hasHighIntensity: boolean; // at least one 4 or 5
  description: string;
}

export interface AxisResult {
  id: AxisType;
  name: string;
  rawScore: number;      // 9-45
  tutorPoint: number;    // 0-9
  isPrimary: boolean;
}

export interface FinalReport {
  profile: Profile;
  answers: Record<number, number>;
  prototypes: PrototypeResult[];
  axes: AxisResult[];
  primaryPrototypes: PrototypeResult[];
  secondaryPrototypes: PrototypeResult[];
  potentialPrototypes: PrototypeResult[];
  primaryAxes: AxisResult[];
}
