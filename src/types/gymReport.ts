// src/types/gymReport.ts
// Tipos estritos para a plataforma GymPericial v6.0
// Conformidade: NR-12, ISO 20957, ISO 4309, CONFEA 1.025, NBR 16779
// Forense: HRN (Hazard Rating Number), cálculo de fadiga, etc.

export type LionLine = 'KRATOS' | 'IRIDIUM' | 'OPTIMUS' | 'LFR';
export type EquipmentCategory = 
  | 'LEG_PRESS' 
  | 'HACK_SQUAT' 
  | 'SUPINO_ARTICULADO' 
  | 'CROSSOVER' 
  | 'PUXADOR_ALTO' 
  | 'CADEIRA_EXTENSORA'
  | 'ROSCA_DIRETA'
  | 'OUTROS';

export type ReportType = 
  | 'NR12_CONFORMITY'           // Modelo 1 - Laudo Pericial de Conformidade NR-12/ISO 20957
  | 'PREVENTIVE_MAINTENANCE'    // Modelo 2 - Laudo Preventivo & Plano de Manutenção
  | 'FORENSIC_ACCIDENT_INVESTIGATION' // Modelo 3 - Laudo Pericial Cautelar/Investigação Sinistro
  | 'NEW_EQUIPMENT_HANDOVER';   // Modelo 4 - Laudo de Entrega Técnica/Recebimento

export type EquipmentStatus = 'CONFORME' | 'OBSERVACAO' | 'NAO_CONFORME' | 'INTERDITADO';
export type Severity = 'CRITICA' | 'MAIOR' | 'MENOR' | 'INFO';

export interface EquipmentSpecs {
  // Cabo de aço
  cableDiameter: number;           // mm (ex: 6.0, 5.0)
  cableConstruction: '6x19' | '7x19';
  cableMBLkN: number;              // kN - Minimum Breaking Load
  cableSafetyFactor: number;       // Fator de segurança (padrão 5:1 NR-12)
  
  // Rolamentos
  bearingPN: string;               // Part Number (ex: '6202-2RS', '608-2RS', '7202B-TVP')
  bearingToleranceRadial: number;  // mm - tolerância máxima folga radial
  bearingToleranceAxial: number;   // mm - tolerância máxima folga axial
  
  // Roldanas/Polias
  pulleyMaterial: 'PA6' | 'POM' | 'NYLON';
  pulleyGrooveDiameter: number;    // mm - diâmetro do canal
  pulleyFlangeHeight: number;      // mm - altura das flanges
  
  // Molas a gás (partida assistida)
  gasSpringForceN: number;         // N - força nominal
  gasSpringStroke: number;         // mm - curso
  gasSpringMinForcePercent: number; // % - mínimo aceitável (ex: 70%)
  
  // Pinos
  magneticPinSpec?: string;        // Ex: 'M8 x 30mm Neodymium N38'
  selectorPinSpec?: string;        // Ex: 'Ø8mm aço inox 316 com presilha'
  
  // Torques estruturais
  structureBoltTorqueNm: number;   // Nm - torque parafusos estrutura
  adjustmentBoltTorqueNm: number;  // Nm - torque parafusos ajuste
  
  // Peças de reposição originais (código fabricante)
  spareParts: {
    mainCable: string;
    bearing: string;
    pulley: string;
    gasSpring: string;
    magneticPin: string;
    selectorPin: string;
  };
}

export interface TechnicalMeasurements {
  // Medições reais do equipamento (campo)
  cableWearPercent: number;           // % desgaste diâmetro (ex: 0-10%)
  cableBrokenWiresPer10d: number;     // fios rompidos / 10x diâmetro
  cableDiameterActual: number;        // mm - diâmetro medido
  
  bearingRadialPlay: number;          // mm - folga radial medida
  bearingAxialPlay: number;           // mm - folga axial medida
  
  pulleyGrooveWear: number;           // mm - desgaste canal da roldana
  
  gasSpringForceActual: number;       // N - força medida (dinamômetro)
  gasSpringForcePercent: number;      // % força nominal
  
  structureBoltTorqueActual: number;  // Nm - torque medido
  adjustmentBoltTorqueActual: number; // Nm - torque medido
  
  // Elétrico (cardio)
  groundingResistance?: number;       // Ω - aterramento (≤10Ω NR-10)
  insulationResistance?: number;      // MΩ - isolação (≥1MΩ a 500Vcc)
  leakageCurrent?: number;            // mA - corrente fuga (≤0.5mA)
}

export interface NonConformity {
  id: string;
  severity: Severity;
  description: string;
  location: string;                   // Ex: "Cabo principal - reto superior esquerdo"
  rootCause: 'cableBreak' | 'bearingWear' | 'weldCrack' | 'structuralDeform' | 'electricalFault' | 'adjustmentFailure' | 'other';
  actionRequired: string;             // Ex: "Trocar cabo imediatamente - ISO 4309"
  priority: number;                   // 1 = mais urgente
  detectedAt: string;                 // ISO timestamp
  evidencePhotoHashes: string[];      // SHA-256 das fotos evidência
  equipmentTag?: string;              // TAG do equipamento (preenchido depois)
  equipmentLine?: LionLine;           // Linha do equipamento
  deadline?: string;                  // ISO timestamp para correção
  iso4309NonCompliant?: boolean;      // Flag se viola ISO 4309 (fios rompidos >5%/10d ou redução >10%)
  // Campos forenses
  hrn?: number;                       // Hazard Rating Number (LO * FE * DPH * NP)
}

export interface PhotoEvidence {
  id: string;
  url: string;                        // Blob URL ou data URL comprimido
  hash: string;                       // SHA-256 da imagem original
  description: string;
  severity: Severity;
  timestamp: string;                  // ISO timestamp
  equipmentTag: string;
  category: 
    | 'CABO_DESFIADO'
    | 'SOLDATRINCADA'
    | 'ROLDANGASTA'
    | 'ROLAMENTO_RUIDOSO'
    | 'AJUSTE_FOLGA'
    | 'ESTOFADO_RASGADO'
    | 'ELETRICO'
    | 'OUTROS';
}

export interface GymEquipment {
  tag: string;                        // Ex: LF-KRT-001
  model: string;                      // Ex: Leg Press 45°
  serialNumber?: string;
  yearOfManufacture?: number;
  line: LionLine;
  category: EquipmentCategory;
  specifications: EquipmentSpecs;
  status: EquipmentStatus;
  measurements?: TechnicalMeasurements;
  nonConformities: NonConformity[];
  photoEvidence: PhotoEvidence[];
  reportType?: ReportType;            // Tipo de laudo específico para este equipamento
}

export interface ARTData {
  artNumber: string;
  creaNumber: string;
  creaUf: string;
  specialization: 'MECANICA' | 'ELETRICA' | 'SEGURANCA_TRABALHO';
  issueDate: string;                  // ISO timestamp
  expiryDate: string;                 // ISO timestamp
  inspectorName: string;
  inspectorCrea: string;
  inspectorCreaUf: string;
}

export interface GymClient {
  name: string;                       // Razão social / nome fantasia
  cnpj: string;
  address: string;
  responsibleName: string;
  responsiblePhone: string;
  responsibleEmail: string;
  artNumber?: string;
}

export interface InspectionSession {
  id: string;
  reportType: ReportType;
  client: GymClient;
  artData: ARTData | null;
  equipments: GymEquipment[];
  startedAt: string;
  completedAt?: string;
  overallStatus: EquipmentStatus;
  forensicHash?: string;              // SHA-256 canônico dos dados (RFC 8785)
}

export interface PDFGenerationOptions {
  includeArt: boolean;
  includeQrCode: boolean;
  includeForensicHash: boolean;
  includeSignatureBlock: boolean;
  watermark?: string;
}