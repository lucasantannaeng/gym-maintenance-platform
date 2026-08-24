// src/utils/pdfGenerator.ts
// Forensic & Technical Gym Maintenance PDF Generator v6.0
// Supports 4 Specialized Regulatory Templates (NR-12, Preventive, Forensic Accident, Handover)
// Standards: ABNT NBR ISO 20957-1/2, NR-12 MTE 2022, ISO 4309:2017, CONFEA 1.025/09

import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import QRCode from 'qrcode';
import { sha256 } from 'js-sha256';
import { GymEquipment, ARTData, ReportType, NonConformity, PDFGenerationOptions } from '../types/gymReport';

const REPORT_TITLES: Record<ReportType, { title: string; subtitle: string; norm: string }> = {
  NR12_CONFORMITY: {
    title: 'LAUDO TÉCNICO DE CONFORMIDADE NR-12 & ABNT NBR ISO 20957',
    subtitle: 'Auditoria de Segurança em Máquinas, Equipamentos de Musculação e Proteções Mecânicas',
    norm: 'Portaria MTE nº 4.219/2022 (NR-12) · ABNT NBR ISO 20957-1:2019 · Resolução CONFEA 1.025/2009'
  },
  PREVENTIVE_MAINTENANCE: {
    title: 'LAUDO TÉCNICO DE MANUTENÇÃO PREVENTIVA & PLANO PERIÓDICO (PMOC)',
    subtitle: 'Inspeção Dimensional de Cabos de Aço, Lubrificação de Guias e Integridade Estrutural',
    norm: 'ISO 4309:2017 (Critérios de Descarte de Cabos) · ABNT NBR ISO 20957-2 · NR-12 Item 12.11'
  },
  FORENSIC_ACCIDENT_INVESTIGATION: {
    title: 'LAUDO PERICIAL FORENSE DE SINISTRO & INVESTIGAÇÃO DE FALHA MECÂNICA',
    subtitle: 'Perícia Cautelar de Fratura por Fadiga, Nexo Causal e Responsabilidade Técnica',
    norm: 'Lei Federal 5.194/1966 · Código Civil Art. 618 · CDC Arts. 12/14 · ABNT NBR 8800'
  },
  NEW_EQUIPMENT_HANDOVER: {
    title: 'TERMO DE COMISSIONAMENTO, ENTREGA TÉCNICA & AUDITORIA DE MONTAGEM',
    subtitle: 'Validação de Nivelamento, Torques Estruturais de Fábrica e Garantia Operacional',
    norm: 'ABNT NBR ISO 20957-1 · Manuais de Engenharia do Fabricante · ART de Comissionamento'
  }
};

export class GymLaudoPdfGenerator {
  private doc: jsPDF;
  private equipment: GymEquipment[];
  private artData: ARTData | null;
  private options: PDFGenerationOptions;
  private reportType: ReportType;
  private clientName: string;
  private clientAddress: string;
  private canonicalHash: string = '';

  constructor(
    equipment: GymEquipment[],
    artData: ARTData | null = null,
    options: PDFGenerationOptions = { includeArt: true, includeQrCode: true, includeForensicHash: true, includeSignatureBlock: true },
    reportType: ReportType = 'NR12_CONFORMITY',
    clientName: string = 'Academia / Condomínio Contratante',
    clientAddress: string = 'Av. Principal, 1000 - Centro'
  ) {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    this.equipment = equipment;
    this.artData = artData;
    this.options = options;
    this.reportType = reportType;
    this.clientName = clientName;
    this.clientAddress = clientAddress;
  }

  private calculateHash(): string {
    const payload = JSON.stringify({
      reportType: this.reportType,
      client: this.clientName,
      equipmentCount: this.equipment.length,
      tags: this.equipment.map(e => ({ tag: e.tag, model: e.model, status: e.status })),
      timestamp: new Date().toISOString()
    });
    return sha256(payload);
  }

  private drawHeader(pageNum: number, totalPages: number) {
    // Top banner
    this.doc.setFillColor(15, 23, 42); // slate-900
    this.doc.rect(0, 0, 210, 18, 'F');

    this.doc.setTextColor(56, 189, 248); // cyan-400
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(8.5);
    this.doc.text('LION FITNESS & FORENSIC GYM ENGINEERING SUITE', 14, 8);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(7.5);
    this.doc.setTextColor(226, 232, 240);
    this.doc.text(`LAUDO PERICIAL MECÂNICO · EMISSÃO: ${new Date().toLocaleDateString('pt-BR')}`, 14, 13);

    this.doc.setFontSize(7.5);
    this.doc.text(`Pág. ${pageNum} de ${totalPages}`, 196, 11, { align: 'right' });

    // Decorative line
    this.doc.setDrawColor(14, 165, 233); // cyan-500
    this.doc.setLineWidth(0.8);
    this.doc.line(0, 18, 210, 18);
  }

  private drawFooter(hash: string) {
    const pageHeight = 297;
    this.doc.setDrawColor(203, 213, 225);
    this.doc.setLineWidth(0.3);
    this.doc.line(14, pageHeight - 12, 196, pageHeight - 12);

    this.doc.setFontSize(6.5);
    this.doc.setTextColor(100, 116, 139);
    this.doc.text(`Autenticação SHA-256: ${hash.substring(0, 32)}... · Lei Federal 5.194/66 · CREA/CONFEA`, 14, pageHeight - 7);
    this.doc.text('Documento Pericial com Validade Jurídica e Rastreabilidade Técnica', 196, pageHeight - 7, { align: 'right' });
  }

  public async generatePdf(): Promise<Blob> {
    this.canonicalHash = this.calculateHash();
    const config = REPORT_TITLES[this.reportType] || REPORT_TITLES.NR12_CONFORMITY;

    // === PÁGINA 1: CAPA & SUMÁRIO EXECUTIVO ===
    let y = 28;

    // Title box
    this.doc.setFillColor(241, 245, 249);
    this.doc.roundedRect(14, y, 182, 34, 2, 2, 'F');
    this.doc.setDrawColor(14, 165, 233);
    this.doc.setLineWidth(0.5);
    this.doc.roundedRect(14, y, 182, 34, 2, 2, 'S');

    this.doc.setTextColor(15, 23, 42);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(11);
    this.doc.text(config.title, 18, y + 8);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(8.5);
    this.doc.setTextColor(51, 65, 85);
    this.doc.text(config.subtitle, 18, y + 16);

    this.doc.setFontSize(7.5);
    this.doc.setTextColor(100, 116, 139);
    this.doc.text(`Normas Base: ${config.norm}`, 18, y + 24);
    this.doc.text(`Identificador do Laudo: LAUDO-${new Date().getFullYear()}-${this.canonicalHash.substring(0, 8).toUpperCase()}`, 18, y + 30);

    y += 40;

    // Client & Engineering Info Box
    this.doc.setFillColor(255, 255, 255);
    this.doc.setDrawColor(226, 232, 240);
    this.doc.rect(14, y, 182, 30, 'DF');

    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(8.5);
    this.doc.setTextColor(15, 23, 42);
    this.doc.text('DADOS DO CLIENTE & CONTRATANTE', 18, y + 6);
    this.doc.text('RESPONSABILIDADE TÉCNICA (CREA / ART)', 110, y + 6);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(7.5);
    this.doc.setTextColor(71, 85, 105);
    this.doc.text(`Cliente / Academia: ${this.clientName}`, 18, y + 12);
    this.doc.text(`Endereço da Unidade: ${this.clientAddress}`, 18, y + 17);
    this.doc.text(`Data da Vistoria: ${new Date().toLocaleDateString('pt-BR')}`, 18, y + 22);

    const engName = this.artData?.inspectorName || "Eng. Luca Rodrigues Gomes de Sant'Anna";
    const creaNum = this.artData?.creaNumber || 'CREA-RJ / CONFEA';
    const artNum = this.artData?.artNumber || 'ART nº 2026-LAUDO-BR';

    this.doc.text(`Engenheiro Mecânico: ${engName}`, 110, y + 12);
    this.doc.text(`Registro Profissional: ${creaNum}`, 110, y + 17);
    this.doc.text(`Anotação de Resp. Técnica: ${artNum}`, 110, y + 22);

    y += 36;

    // Executive Summary Bar
    const totalEq = this.equipment.length;
    const conforme = this.equipment.filter(e => e.status === 'CONFORME').length;
    const observacao = this.equipment.filter(e => e.status === 'OBSERVACAO').length;
    const naoconforme = this.equipment.filter(e => e.status === 'NAO_CONFORME').length;
    const interditado = this.equipment.filter(e => e.status === 'INTERDITADO').length;

    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(9.5);
    this.doc.setTextColor(15, 23, 42);
    this.doc.text('1. RESUMO EXECUTIVO & INVENTÁRIO DO PARQUE DE MÁQUINAS', 14, y);
    y += 5;

    // Metrics Mini Cards
    const cardW = 43;
    const cardH = 14;
    const cards = [
      { label: 'TOTAL ATIVOS', val: `${totalEq}`, color: [15, 23, 42] },
      { label: 'CONFORMES', val: `${conforme}`, color: [22, 101, 52] },
      { label: 'OBSERVAÇÃO', val: `${observacao}`, color: [161, 98, 7] },
      { label: 'INTERDITADOS / RNC', val: `${interditado + naoconforme}`, color: [153, 27, 27] }
    ];

    cards.forEach((c, idx) => {
      const cx = 14 + idx * (cardW + 3.3);
      this.doc.setFillColor(248, 250, 252);
      this.doc.setDrawColor(226, 232, 240);
      this.doc.rect(cx, y, cardW, cardH, 'DF');
      this.doc.setFont('helvetica', 'bold');
      this.doc.setFontSize(6.5);
      this.doc.setTextColor(100, 116, 139);
      this.doc.text(c.label, cx + 4, y + 5);
      this.doc.setFontSize(10);
      this.doc.setTextColor(c.color[0], c.color[1], c.color[2]);
      this.doc.text(c.val, cx + 4, y + 11);
    });

    y += 18;

    // Inventory Table Header
    this.doc.setFillColor(30, 41, 59);
    this.doc.rect(14, y, 182, 7, 'F');
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(7);
    this.doc.setTextColor(255, 255, 255);
    this.doc.text('TAG', 18, y + 4.8);
    this.doc.text('EQUIPAMENTO / MODELO', 42, y + 4.8);
    this.doc.text('LINHA', 110, y + 4.8);
    this.doc.text('CABO / MBL', 135, y + 4.8);
    this.doc.text('STATUS', 170, y + 4.8);
    y += 7;

    // Inventory Table Rows
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(7);

    this.equipment.slice(0, 10).forEach((eq, idx) => {
      const rowColor = idx % 2 === 0 ? 255 : 248;
      this.doc.setFillColor(rowColor, rowColor, rowColor);
      this.doc.rect(14, y, 182, 6.5, 'F');
      this.doc.setDrawColor(226, 232, 240);
      this.doc.line(14, y + 6.5, 196, y + 6.5);

      this.doc.setTextColor(15, 23, 42);
      this.doc.text(eq.tag || `TAG-0${idx + 1}`, 18, y + 4.5);
      this.doc.text(eq.model || 'Equipamento', 42, y + 4.5);
      this.doc.text(eq.line || 'KRATOS', 110, y + 4.5);
      this.doc.text(`${eq.specifications?.cableDiameter || 6}mm (${eq.specifications?.cableMBLkN || 35}kN)`, 135, y + 4.5);

      if (eq.status === 'CONFORME') {
        this.doc.setTextColor(22, 101, 52);
        this.doc.text('CONFORME', 170, y + 4.5);
      } else if (eq.status === 'OBSERVACAO') {
        this.doc.setTextColor(161, 98, 7);
        this.doc.text('OBSERVAÇÃO', 170, y + 4.5);
      } else {
        this.doc.setTextColor(185, 28, 28);
        this.doc.text('INTERDITADO', 170, y + 4.5);
      }
      y += 6.5;
    });

    y += 8;

    // === CAPÍTULO ESPECÍFICO DO TEMPLATE REGULATÓRIO ===
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(9.5);
    this.doc.setTextColor(15, 23, 42);
    this.doc.text('2. FUNDAMENTAÇÃO NORMATIVA & DIRETRIZES ESPECÍFICAS', 14, y);
    y += 5;

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(7.5);
    this.doc.setTextColor(51, 65, 85);

    let specificText = '';
    if (this.reportType === 'NR12_CONFORMITY') {
      specificText =
        'A vistoria baseou-se nos preceitos da NR-12 (Portaria MTE 4.219/2022) e ABNT NBR ISO 20957-1/2, avaliando zonas de aprisionamento de membros em polias e torres de peso. Equipamentos com distância de segurança inferior a 25 mm desprovidos de proteção fixa foram apontados para imediata adequação ou interdição cautelar.';
    } else if (this.reportType === 'PREVENTIVE_MAINTENANCE') {
      specificText =
        'A avaliação de desgaste seguiu a norma ISO 4309:2017. Cabos de aço com redução de diâmetro superior a 7% ou com mais de 3 arames rompidos por passo foram classificados para descarte compulsório. Foi homologado o uso exclusivo de silicone spray puro nas colunas inox e graxa sintética PTFE nas articulações.';
    } else if (this.reportType === 'FORENSIC_ACCIDENT_INVESTIGATION') {
      specificText =
        'A perícia forense inspecionou as superfícies de ruptura estrutural, investigando nexo causal entre fadiga por flexão alternada e ausência de manutenção preventiva. A análise fundamenta-se nos Arts. 12 e 14 do CDC e Art. 618 do Código Civil para apuração de responsabilidade civil e cobertura de sinistro securitário.';
    } else {
      specificText =
        'O comissionamento e entrega técnica avaliou a conformidade dimensional, nivelamento de chassi com tolerância máxima de 1 grau, torques de aperto em parafusos classe 8.8 (35 Nm em estrutura principal) e integridade do revestimento em pintura eletrostática a pó dos equipamentos novos recebidos.';
    }

    const splitText = this.doc.splitTextToSize(specificText, 182);
    this.doc.text(splitText, 14, y);

    // === PÁGINA 2: RELATÓRIO FOTOGRÁFICO DE EVIDÊNCIAS (RNCs) ===
    this.doc.addPage();
    y = 26;

    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(9.5);
    this.doc.setTextColor(15, 23, 42);
    this.doc.text('3. RELATÓRIO FOTOGRÁFICO DE EVIDÊNCIAS & NÃO-CONFORMIDADES (RNCs)', 14, y);
    y += 6;

    // Collect all photo evidences
    const allPhotos = this.equipment.flatMap(e =>
      e.photoEvidence.map(p => ({ ...p, equipmentModel: e.model, tag: e.tag || 'TAG' }))
    );

    if (allPhotos.length === 0) {
      this.doc.setFont('helvetica', 'italic');
      this.doc.setFontSize(8);
      this.doc.setTextColor(100, 116, 139);
      this.doc.text('Nenhuma evidência fotográfica crítica registrada. Parque de máquinas em conformidade visual.', 14, y + 6);
      y += 18;
    } else {
      // Photo Grid: 2 per row
      const photoW = 88;
      const photoH = 50;

      for (let i = 0; i < Math.min(allPhotos.length, 4); i++) {
        const photo = allPhotos[i];
        const col = i % 2;
        const px = 14 + col * (photoW + 6);
        const py = y + Math.floor(i / 2) * (photoH + 24);

        if (py + photoH > 270) break;

        // Photo card container
        this.doc.setFillColor(248, 250, 252);
        this.doc.setDrawColor(203, 213, 225);
        this.doc.rect(px, py, photoW, photoH + 20, 'DF');

        // Draw photo image if valid base64
        try {
          if (photo.url && photo.url.startsWith('data:image')) {
            this.doc.addImage(photo.url, 'JPEG', px + 2, py + 2, photoW - 4, photoH - 4);
          } else {
            this.doc.setFillColor(226, 232, 240);
            this.doc.rect(px + 2, py + 2, photoW - 4, photoH - 4, 'F');
            this.doc.setFont('helvetica', 'normal');
            this.doc.setFontSize(7);
            this.doc.setTextColor(100, 116, 139);
            this.doc.text('[Evidência Fotográfica Anexada]', px + 20, py + 25);
          }
        } catch {
          this.doc.setFillColor(226, 232, 240);
          this.doc.rect(px + 2, py + 2, photoW - 4, photoH - 4, 'F');
        }

        // Caption & Severity Badge
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(7);
        this.doc.setTextColor(15, 23, 42);
        this.doc.text(`${photo.tag}: ${photo.category}`, px + 3, py + photoH + 4);

        this.doc.setFont('helvetica', 'normal');
        this.doc.setFontSize(6.5);
        this.doc.setTextColor(71, 85, 105);
        const descText = this.doc.splitTextToSize(photo.description || 'Inspeção visual realizada.', photoW - 6);
        this.doc.text(descText, px + 3, py + photoH + 9);

        // Severity pill
        if (photo.severity === 'CRITICA') {
          this.doc.setFillColor(254, 226, 226);
          this.doc.setTextColor(185, 28, 28);
        } else {
          this.doc.setFillColor(254, 249, 195);
          this.doc.setTextColor(161, 98, 7);
        }
        this.doc.rect(px + photoW - 22, py + photoH + 1, 19, 5, 'F');
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(5.5);
        this.doc.text(photo.severity, px + photoW - 20, py + photoH + 4.5);
      }
      y += Math.ceil(Math.min(allPhotos.length, 4) / 2) * (photoH + 24) + 6;
    }

    // === PÁGINA 3 (ou Seção Final): PLANO DE AÇÃO, RESPONSABILIDADE TÉCNICA & QR CODE ===
    if (y > 180) {
      this.doc.addPage();
      y = 26;
    }

    // Action Plan Table
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(9.5);
    this.doc.setTextColor(15, 23, 42);
    this.doc.text('4. PLANO DE AÇÃO CORRETIVA & CRONOGRAMA RECOMENDADO', 14, y);
    y += 5;

    this.doc.setFillColor(30, 41, 59);
    this.doc.rect(14, y, 182, 6, 'F');
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(6.5);
    this.doc.setTextColor(255, 255, 255);
    this.doc.text('ITEM', 18, y + 4.2);
    this.doc.text('NÃO-CONFORMIDADE / AÇÃO CORRETIVA', 36, y + 4.2);
    this.doc.text('PRIORIDADE', 120, y + 4.2);
    this.doc.text('PRAZO MÁXIMO', 160, y + 4.2);
    y += 6;

    const actionItems = [
      { item: '01', desc: 'Substituição preventiva de cabos de aço com desgaste > 7% (ISO 4309)', prio: 'URGENTE', prazo: '72 horas' },
      { item: '02', desc: 'Lubrificação integral de colunas com silicone spray puro 100%', prio: 'ROTINA', prazo: 'Semanal' },
      { item: '03', desc: 'Reaperto estrutural com torquímetro em parafusos classe 8.8 (35 Nm)', prio: 'MÉDIA', prazo: '15 dias' },
      { item: '04', desc: 'Troca de buchas de PU e roldanas de poliacetal com folga axial', prio: 'ALTA', prazo: '7 dias' }
    ];

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(6.5);
    this.doc.setTextColor(15, 23, 42);

    actionItems.forEach((act, idx) => {
      const rColor = idx % 2 === 0 ? 255 : 248;
      this.doc.setFillColor(rColor, rColor, rColor);
      this.doc.rect(14, y, 182, 6, 'F');
      this.doc.setDrawColor(226, 232, 240);
      this.doc.line(14, y + 6, 196, y + 6);

      this.doc.text(act.item, 18, y + 4.2);
      this.doc.text(act.desc, 36, y + 4.2);
      this.doc.text(act.prio, 120, y + 4.2);
      this.doc.text(act.prazo, 160, y + 4.2);
      y += 6;
    });

    y += 10;

    // Responsibility & Digital Signature Block
    this.doc.setFillColor(248, 250, 252);
    this.doc.setDrawColor(14, 165, 233);
    this.doc.rect(14, y, 182, 45, 'DF');

    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(8.5);
    this.doc.setTextColor(15, 23, 42);
    this.doc.text('5. DECLARAÇÃO DE RESPONSABILIDADE TÉCNICA & ENCERRAMENTO PERICIAL', 18, y + 6);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(7);
    this.doc.setTextColor(71, 85, 105);
    const legalText =
      'O presente Laudo Técnico Pericial atesta as condições mecânicas e operacionais dos equipamentos inspecionados com base nas normas vigentes. O responsável técnico assume total responsabilidade pelas conclusões emitidas nos termos da Lei Federal nº 5.194/66 e Lei nº 6.496/77 (ART vinculada).';
    const splitLegal = this.doc.splitTextToSize(legalText, 125);
    this.doc.text(splitLegal, 18, y + 13);

    // Signature Line
    this.doc.setDrawColor(15, 23, 42);
    this.doc.line(18, y + 36, 95, y + 36);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(7.5);
    this.doc.setTextColor(15, 23, 42);
    this.doc.text(engName, 18, y + 40);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(6.5);
    this.doc.text(`Engenheiro Mecânico · ${creaNum}`, 18, y + 43);

    // Generate QR Code with verification link
    const qrUrl = `https://verify.antigravity-engineering.com/laudo?h=${this.canonicalHash}`;
    try {
      const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1, width: 100 });
      this.doc.addImage(qrDataUrl, 'PNG', 152, y + 8, 30, 30);
      this.doc.setFontSize(5.5);
      this.doc.setTextColor(100, 116, 139);
      this.doc.text('Verificação Antifraude', 167, y + 41, { align: 'center' });
    } catch {
      this.doc.rect(152, y + 8, 30, 30, 'S');
      this.doc.setFontSize(6);
      this.doc.text('[QR Code]', 167, y + 24, { align: 'center' });
    }

    // Apply header & footer on all pages
    const totalPages = this.doc.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      this.doc.setPage(p);
      this.drawHeader(p, totalPages);
      this.drawFooter(this.canonicalHash);
    }

    return this.doc.output('blob');
  }
}

export async function generateAndDownloadLaudo(
  equipment: GymEquipment[],
  artData: ARTData | null,
  options: PDFGenerationOptions,
  reportType: ReportType = 'NR12_CONFORMITY',
  clientName: string = 'Academia / Condomínio Contratante',
  clientAddress: string = 'Av. Principal, 1000 - Centro'
) {
  const generator = new GymLaudoPdfGenerator(equipment, artData, options, reportType, clientName, clientAddress);
  const pdfBlob = await generator.generatePdf();
  const filename = `Laudo_Tecnico_${reportType}_${new Date().toISOString().split('T')[0]}.pdf`;
  saveAs(pdfBlob, filename);
}