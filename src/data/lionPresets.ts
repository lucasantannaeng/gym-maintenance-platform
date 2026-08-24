// src/data/lionPresets.ts
// Banco de presets técnico para equipamentos Lion Fitness (Kratos, Iridium, Optimus, LFR)
// Conformidade: NR-12, ISO 20957-1/2, ISO 4309, NBR 16779
// Versão minimal para garantir build bem-sucedido (YAGNI)

import { GymEquipment, EquipmentSpecs, TechnicalMeasurements, LionLine, EquipmentCategory, Severity } from '../types/gymReport';

// Função auxiliar para gerar presets padrão
const createBasePreset = (line: LionLine, category: EquipmentCategory, overrides: Partial<GymEquipment> = {}): GymEquipment => {
  const base: GymEquipment = {
    tag: '',
    model: '',
    serialNumber: '',
    yearOfManufacture: new Date().getFullYear(),
    line,
    category,
    specifications: {
      // Cabo de aço
      cableDiameter: 6.0,
      cableConstruction: '7x19',
      cableMBLkN: 35.0,
      cableSafetyFactor: 7.0, // Excede NR-12 (5:1 mínimo)
      
      // Rolamentos
      bearingPN: '6202-2RS',
      bearingToleranceRadial: 0.15,
      bearingToleranceAxial: 0.5,
      
      // Roldanas
      pulleyMaterial: 'PA6',
      pulleyGrooveDiameter: 8.0,
      pulleyFlangeHeight: 3.0,
      
      // Molas a gás
      gasSpringForceN: 450,
      gasSpringStroke: 120,
      gasSpringMinForcePercent: 70,
      
      // Pinos
      magneticPinSpec: 'M8 x 30mm Neodymium N38',
      selectorPinSpec: 'Ø8mm aço inox 316 com presilha',
      
      // Torques
      structureBoltTorqueNm: 25,
      adjustmentBoltTorqueNm: 10,
      
      // Peças de reposição
      spareParts: {
        mainCable: '',
        bearing: '',
        pulley: '',
        gasSpring: '',
        magneticPin: '',
        selectorPin: ''
      }
    },
    status: 'CONFORME',
    measurements: {
      cableWearPercent: 0,
      cableBrokenWiresPer10d: 0,
      cableDiameterActual: 6.0,
      bearingRadialPlay: 0,
      bearingAxialPlay: 0,
      pulleyGrooveWear: 0,
      gasSpringForceActual: 450,
      gasSpringForcePercent: 100,
      structureBoltTorqueActual: 25,
      adjustmentBoltTorqueActual: 10
    },
    nonConformities: [],
    photoEvidence: [],
    reportType: 'NR12_CONFORMITY'
  };

  return { ...base, ...overrides };
};

// LINHA KRATOS - Linha Premium Comercial/Industrial (um preset representativo)
export const KRATOS_PRESETS: Record<string, GymEquipment> = {
  'KRATOS_LEG_PRESS_45': createBasePreset('KRATOS', 'LEG_PRESS', {
    tag: 'LF-KR-001',
    model: 'Leg Press 45°',
    specifications: {
      cableDiameter: 6.0,
      cableConstruction: '7x19',
      cableMBLkN: 45.0,
      cableSafetyFactor: 7.5,
      bearingPN: '6203-2RS',
      bearingToleranceRadial: 0.10,
      bearingToleranceAxial: 0.3,
      pulleyMaterial: 'PA6',
      pulleyGrooveDiameter: 10.0,
      pulleyFlangeHeight: 4.0,
      gasSpringForceN: 600,
      gasSpringStroke: 150,
      gasSpringMinForcePercent: 75,
      magneticPinSpec: 'M10 x 35mm Neodymium N38',
      selectorPinSpec: 'Ø10mm aço inox 316 com presilha duplex',
      structureBoltTorqueNm: 35,
      adjustmentBoltTorqueNm: 15,
      spareParts: {
        mainCable: 'LF-KR-CABLE-7X19-6MM-45KN',
        bearing: 'LF-KR-BEARING-6203-2RS',
        pulley: 'LF-KR-PULLEY-PA6-10MM',
        gasSpring: 'LF-KR-GAS-SPRING-600N-150MM',
        magneticPin: 'LF-KR-PIN-MAGNETIC-M10X35',
        selectorPin: 'LF-KR-PIN-SELECTOR-12MM'
      }
    }
  })
};

// LINHA IRIDIUM - Linha Premium com componentes de alta performance (um preset representativo)
export const IRIDIUM_PRESETS: Record<string, GymEquipment> = {
  'IRIDIUM_LEG_PRESS_45': createBasePreset('IRIDIUM', 'LEG_PRESS', {
    tag: 'LF-IR-001',
    model: 'Leg Press 45°',
    specifications: {
      cableDiameter: 6.0,
      cableConstruction: '7x19',
      cableMBLkN: 50.0,
      cableSafetyFactor: 8.0,
      bearingPN: '7202B-TVP',
      bearingToleranceRadial: 0.08,
      bearingToleranceAxial: 0.2,
      pulleyMaterial: 'POM',
      pulleyGrooveDiameter: 10.0,
      pulleyFlangeHeight: 4.0,
      gasSpringForceN: 600,
      gasSpringStroke: 150,
      gasSpringMinForcePercent: 80,
      magneticPinSpec: 'M10 x 35mm Neodymium N38 com capa PTFE',
      selectorPinSpec: 'Ø10mm aço inox 316 com presilha duplex e anel vedação',
      structureBoltTorqueNm: 35,
      adjustmentBoltTorqueNm: 15,
      spareParts: {
        mainCable: 'LF-IR-CABLE-7X19-6MM-50KN-316',
        bearing: 'LF-IR-BEARING-7202B-TV',
        pulley: 'LF-IR-PULLEY-POM-10MM',
        gasSpring: 'LF-IR-GAS-SPRING-600N-150MM',
        magneticPin: 'LF-IR-PIN-MAGNETIC-M10X35-PTFE',
        selectorPin: 'LF-IR-PIN-SELECTOR-10MM-316'
      }
    }
  })
};

// LINHA OPTIMUS - Linha Econômica para condomínios e clubes de baixo/médio fluxo (um preset representativo)
export const OPTIMUS_PRESETS: Record<string, GymEquipment> = {
  'OPTIMUS_LEG_PRESS_45': createBasePreset('OPTIMUS', 'LEG_PRESS', {
    tag: 'LF-OP-001',
    model: 'Leg Press 45°',
    specifications: {
      cableDiameter: 5.0,
      cableConstruction: '6x19',
      cableMBLkN: 20.0,
      cableSafetyFactor: 4.0,
      bearingPN: '6200-2RS',
      bearingToleranceRadial: 0.20,
      bearingToleranceAxial: 0.8,
      pulleyMaterial: 'NYLON',
      pulleyGrooveDiameter: 6.0,
      pulleyFlangeHeight: 2.0,
      gasSpringForceN: 150,
      gasSpringStroke: 80,
      gasSpringMinForcePercent: 50,
      magneticPinSpec: 'M6 x 25mm Ferrite',
      selectorPinSpec: 'Ø6mm aço carbono zincado',
      structureBoltTorqueNm: 12,
      adjustmentBoltTorqueNm: 5,
      spareParts: {
        mainCable: 'LF-OP-CABLE-6X19-5MM-20KN',
        bearing: 'LF-OP-BEARING-6200-2RS',
        pulley: 'LF-OP-PULLEY-NYLON-6MM',
        gasSpring: 'LF-OP-GAS-SPRING-150N-80MM',
        magneticPin: 'LF-OP-PIN-MAGNETIC-FERRITE',
        selectorPin: 'LF-OP-PIN-SELECTOR-6MM'
      }
    }
  })
};

// LINHA LFR - Livre Acesso (Outdoor) - Conformidade NBR 16779 (um preset representativo)
export const LFR_PRESETS: Record<string, GymEquipment> = {
  'LFR_LEG_PRESS_45_OUTDOOR': createBasePreset('LFR', 'LEG_PRESS', {
    tag: 'LF-LR-001',
    model: 'Leg Press 45° Outdoor',
    specifications: {
      cableDiameter: 6.0,
      cableConstruction: '7x19',
      cableMBLkN: 35.0,
      cableSafetyFactor: 5.0,
      bearingPN: '6202-2RS',
      bearingToleranceRadial: 0.15,
      bearingToleranceAxial: 0.5,
      pulleyMaterial: 'POM',
      pulleyGrooveDiameter: 8.0,
      pulleyFlangeHeight: 3.0,
      gasSpringForceN: 450,
      gasSpringStroke: 120,
      gasSpringMinForcePercent: 70,
      magneticPinSpec: 'M8 x 30mm Neodymium N35 com capa PTFE e anel vedação',
      selectorPinSpec: 'Ø8mm aço inox 316 com presilha duplex e anel vedação',
      structureBoltTorqueNm: 25,
      adjustmentBoltTorqueNm: 10,
      spareParts: {
        mainCable: 'LF-LR-CABLE-7X19-6MM-35KN-316-PA12',
        bearing: 'LF-LR-BEARING-6202-2RS-316',
        pulley: 'LF-LR-PULLEY-POM-8MM-UV',
        gasSpring: 'LF-LR-GAS-SPRING-450N-120MM-316',
        magneticPin: 'LF-LR-PIN-MAGNETIC-M8X30-PTFE-SEAL',
        selectorPin: 'LF-LR-PIN-SELECTOR-8MM-316-SEAL'
      }
    }
  })
};

// Exportar todos os presets combinados
export const LION_PRESETS: Record<string, GymEquipment> = {
  ...KRATOS_PRESETS,
  ...IRIDIUM_PRESETS,
  ...OPTIMUS_PRESETS,
  ...LFR_PRESETS
};

// Funções auxiliares
export const getLionPreset = (line: LionLine, category: EquipmentCategory): GymEquipment | undefined => {
  const key = `${line}_${category}` as const;
  return LION_PRESETS[key];
};

export const getLionLines = (): LionLine[] => {
  return ['KRATOS', 'IRIDIUM', 'OPTIMUS', 'LFR'];
};

export const getLionCategories = (): EquipmentCategory[] => {
  return [
    'LEG_PRESS',
    'HACK_SQUAT',
    'SUPINO_ARTICULADO',
    'CROSSOVER',
    'PUXADOR_ALTO',
    'CADEIRA_EXTENSORA',
    'ROSCA_DIRETA',
    'OUTROS'
  ];
};

// Matriz de criticidade para priorização de ações corretivas
export const CRITICALITY_MATRIX: Record<string, { severity: Severity; priority: number; maxResponseTimeHours: number }> = {
  cableBreak: { severity: 'CRITICA', priority: 1, maxResponseTimeHours: 1 },
  bearingWear: { severity: 'MAIOR', priority: 2, maxResponseTimeHours: 24 },
  weldCrack: { severity: 'CRITICA', priority: 1, maxResponseTimeHours: 1 },
  structuralDeform: { severity: 'CRITICA', priority: 1, maxResponseTimeHours: 1 },
  electricalFault: { severity: 'CRITICA', priority: 1, maxResponseTimeHours: 1 },
  adjustmentFailure: { severity: 'MAIOR', priority: 2, maxResponseTimeHours: 12 },
  other: { severity: 'MENOR', priority: 3, maxResponseTimeHours: 72 }
};

// Tolerâncias de inspeção por componente (baseadas em normas)
export const INSPECTION_TOLERANCES = {
  // Cabo de aço (ISO 4309:2017)
  cable: {
    maxBrokenWiresPer10d: 5, // % máximo de fios rompidos
    maxDiameterReductionPercent: 10, // % máximo de redução do diâmetro nominal
    minSafetyFactor: 5.0 // Fator de segurança mínimo (NR-12)
  },
  
  // Rolamentos (NR-12 + boas práticas)
  bearing: {
    maxRadialPlay: 0.15, // mm - Buchas
    maxAxialPlay: 0.5,   // mm - Buchas
    maxRadialPlayBall: 0.05, // mm - Rolamentos de esferas
    maxAxialPlayBall: 0.5,   // mm - Rolamentos de esferas
    maxRadialPlayRoller: 0.10, // mm - Rolamentos de rolo
    maxAxialPlayRoller: 0.8    // mm - Rolamentos de rolo
  },
  
  // Roldanas/Polias (ISO 20957-2)
  pulley: {
    maxGrooveWear: 1.0, // mm - desgaste máximo do canal
    maxFlangeDamage: 0.0, // mm - danos nas flanges (zero tolerância)
    maxMisalignmentDegrees: 1.0 // graus - desalinhamento máximo
  },
  
  // Molas a gás (NR-12 + fabricante)
  gasSpring: {
    minForcePercent: 70, // % mínimo da força nominal
    maxLeakage: 0 // Vazamento não permitido
  },
  
  // Elétrico (NR-10)
  electrical: {
    maxGroundingResistance: 10.0, // Ω - aterramento máximo
    minInsulationResistance: 1.0, // MΩ - isolação mínima a 500Vcc
    maxLeakageCurrent: 0.5 // mA - corrente de fuga máxima
  }
};

// Mapeamento de normas aplicáveis por tipo de verificação
export const REGULATORY_REFERENCES = {
  cableBreak: ['ISO 4309:2017', 'NR-12 item 12.11.1'],
  bearingWear: ['NR-12 item 12.11.1', 'ISO 20957-1:2019'],
  weldCrack: ['NR-12 Anexo I', 'ABNT NBR 8800'],
  structuralDeform: ['NR-12 Anexo I', 'ABNT NBR 8800'],
  electricalFault: ['NR-10 item 10.4.1', 'ABNT NBR 5410'],
  adjustmentFailure: ['NR-17 item 17.2.2', 'ABNT NBR ISO 20957-1']
};

// Códigos de peças OEM por fabricante (exemplo Lion Fitness)
export const OEM_PART_CODES = {
  // Cabos de aço
  'LF-KR-CABLE-7X19-6MM-45KN': {
    manufacturer: 'Lion Fitness',
    description: 'Cabo de aço 7x19, 6mm, 45kN MBL',
    material: 'Aço galvanizado com revestimento nylon',
    standard: 'ISO 4309',
    replacementInterval: '12 meses ou 200.000 ciclos'
  },
  
  // Rolamentos
  'LF-KR-BEARING-6203-2RS': {
    manufacturer: 'NSK/SKF/FAG',
    description: 'Rolamento de esferas 6203-2RS, 17x40x12mm',
    material: 'Aço cromado com vedação de borracha',
    standard: 'ISO 15',
    replacementInterval: '24 meses ou 500.000 ciclos'
  },
  
  // Molas a gás
  'LF-KR-GAS-SPRING-600N-150MM': {
    manufacturer: 'Stabilus/Lord',
    description: 'Mola a gás 600N, curso 150mm',
    material: 'Haste inox 304, cilindro aço',
    standard: 'ISO 11901',
    replacementInterval: '12 meses (criticidade máxima)'
  }
};