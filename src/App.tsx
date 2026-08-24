// src/App.tsx
import { useState } from 'react';
import EquipmentForm from './components/EquipmentForm';
import ReportTypeSelector from './components/ReportTypeSelector';
import InventorySummaryCard from './components/InventorySummaryCard';
import WalkthroughModal from './components/WalkthroughModal';
import { LION_PRESETS, getLionLines, getLionCategories } from './data/lionPresets';
import { GymEquipment, ReportType, ARTData } from './types/gymReport';
import { generateAndDownloadLaudo } from './utils/pdfGenerator';

function App() {
  const [equipments, setEquipments] = useState<GymEquipment[]>([]);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [reportType, setReportType] = useState<ReportType>('NR12_CONFORMITY');
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Client and Engineering Meta
  const [clientName, setClientName] = useState('Academia Iron Pro Fitness');
  const [clientAddress, setClientAddress] = useState('Av. das Américas, 5000 - Barra da Tijuca, Rio de Janeiro - RJ');
  const [artNumber, setArtNumber] = useState('ART-2026-098421-RJ');
  const [inspectorName, setInspectorName] = useState("Eng. Luca Rodrigues Gomes de Sant'Anna");
  const [creaNumber, setCreaNumber] = useState('CREA-RJ 2026109482/D');

  const handleAddEquipment = (line: string, category: string) => {
    const preset = LION_PRESETS[`${line}_${category}` as keyof typeof LION_PRESETS];
    if (preset) {
      const newTag = `LF-${line.substring(0, 3)}-${String(equipments.length + 1).padStart(3, '0')}`;
      setEquipments(prev => [...prev, { ...preset, tag: newTag, reportType }]);
    }
  };

  const handleUpdateEquipment = (index: number, updated: Partial<GymEquipment>) => {
    setEquipments(prev => {
      const newList = [...prev];
      newList[index] = { ...newList[index], ...updated };
      return newList;
    });
  };

  const handleRemoveEquipment = (index: number) => {
    setEquipments(prev => prev.filter((_, i) => i !== index));
  };

  const handleGeneratePdf = async () => {
    if (equipments.length === 0) {
      alert('Adicione pelo menos um equipamento antes de gerar o laudo.');
      return;
    }
    setIsGenerating(true);
    try {
      const artData: ARTData = {
        artNumber,
        creaNumber,
        creaUf: 'RJ',
        specialization: 'MECANICA',
        issueDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        inspectorName,
        inspectorCrea: creaNumber,
        inspectorCreaUf: 'RJ'
      };

      await generateAndDownloadLaudo(
        equipments,
        artData,
        {
          includeArt: true,
          includeQrCode: true,
          includeForensicHash: true,
          includeSignatureBlock: true
        },
        reportType,
        clientName,
        clientAddress
      );
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Verifique o console para detalhes.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOpenWalkthrough = () => setWalkthroughOpen(true);
  const handleCloseWalkthrough = () => setWalkthroughOpen(false);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>Gerador de Laudos Técnicos Periciais — Academia</h1>
            <p>Forensic Gym Engineering Suite · Lion Fitness Edition v6.0</p>
          </div>
          <button onClick={handleOpenWalkthrough} className="walkthrough-toggle-btn">
            📖 Como Usar / Tour Guiado
          </button>
        </div>
      </header>

      <main className="app-main">
        {/* Walkthrough Onboarding Modal */}
        <WalkthroughModal isOpen={walkthroughOpen} onClose={handleCloseWalkthrough} />

        {/* Report Type Selector */}
        <div className="selector-section">
          <ReportTypeSelector reportType={reportType} onChange={setReportType} />
        </div>

        {/* Client & Engineering Identification Card */}
        <section className="client-meta-card">
          <div className="summary-title">Identificação do Cliente & Responsabilidade Técnica (ART/CREA)</div>
          <div className="client-meta-grid">
            <div className="meta-field">
              <label>Academia / Cliente:</label>
              <input
                type="text"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                placeholder="Razão Social / Nome Fantasia"
              />
            </div>
            <div className="meta-field">
              <label>Endereço da Unidade:</label>
              <input
                type="text"
                value={clientAddress}
                onChange={e => setClientAddress(e.target.value)}
                placeholder="Endereço Completo"
              />
            </div>
            <div className="meta-field">
              <label>Engenheiro Mecânico:</label>
              <input
                type="text"
                value={inspectorName}
                onChange={e => setInspectorName(e.target.value)}
                placeholder="Nome do Responsável Técnico"
              />
            </div>
            <div className="meta-field">
              <label>Registro CREA:</label>
              <input
                type="text"
                value={creaNumber}
                onChange={e => setCreaNumber(e.target.value)}
                placeholder="CREA-UF e Número"
              />
            </div>
            <div className="meta-field">
              <label>Número da ART:</label>
              <input
                type="text"
                value={artNumber}
                onChange={e => setArtNumber(e.target.value)}
                placeholder="ART vinculada ao laudo"
              />
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="tabs">
          <button
            className={activeTab === 'form' ? 'active' : ''}
            onClick={() => setActiveTab('form')}
          >
            📋 Formulário de Inspeção ({equipments.length})
          </button>
          <button
            className={activeTab === 'preview' ? 'active' : ''}
            onClick={() => setActiveTab('preview')}
          >
            👁️ Visualizar Laudo & Evidências
          </button>
        </div>

        {/* Form Tab */}
        {activeTab === 'form' && (
          <section className="form-section">
            <InventorySummaryCard equipments={equipments} />

            <div className="equipment-controls">
              <span className="controls-label">Adicionar Preset Lion Fitness:</span>
              <select id="line-select">
                {getLionLines().map(line => (
                  <option key={line} value={line}>Linha {line}</option>
                ))}
              </select>
              <select id="category-select">
                {getLionCategories().map(cat => (
                  <option key={cat} value={cat}>{cat.replace('_', ' ')}</option>
                ))}
              </select>
              <button
                className="add-btn"
                onClick={() => {
                  const line = (document.getElementById('line-select') as HTMLSelectElement).value;
                  const category = (document.getElementById('category-select') as HTMLSelectElement).value;
                  handleAddEquipment(line, category);
                }}
              >
                ➕ Adicionar Máquina
              </button>
            </div>

            {equipments.length === 0 && (
              <div className="empty-state">
                <p>Nenhum equipamento adicionado ainda.</p>
                <p className="empty-sub">Selecione a linha e o modelo acima para carregar as especificações de engenharia.</p>
              </div>
            )}

            {equipments.map((eq, index) => (
              <EquipmentForm
                key={index}
                index={index}
                equipment={eq}
                onUpdate={updated => handleUpdateEquipment(index, updated)}
                onRemove={() => handleRemoveEquipment(index)}
              />
            ))}

            <div className="form-actions">
              <button
                onClick={handleGeneratePdf}
                className="primary generate-btn"
                disabled={equipments.length === 0 || isGenerating}
              >
                {isGenerating ? '⏳ Compilando Laudo Forense...' : '📄 Gerar Laudo Técnico Pericial PDF (A4)'}
              </button>
            </div>
          </section>
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <section className="preview-section">
            <div className="preview-header">
              <h2>Pré-visualização do Laudo Pericial</h2>
              <button onClick={handleGeneratePdf} className="primary" disabled={equipments.length === 0 || isGenerating}>
                {isGenerating ? '⏳ Gerando...' : '📥 Baixar Laudo PDF'}
              </button>
            </div>

            <div className="preview-content-box">
              <div className="preview-card-header">
                <h3>{clientName}</h3>
                <p>{clientAddress}</p>
                <span className="report-badge">{reportType}</span>
              </div>

              <div className="preview-table-container">
                <h4>Inventário de Ativos ({equipments.length} máquinas)</h4>
                {equipments.length === 0 ? (
                  <p className="empty-state">Nenhum equipamento para exibir.</p>
                ) : (
                  <table className="preview-table">
                    <thead>
                      <tr>
                        <th>TAG</th>
                        <th>Modelo</th>
                        <th>Linha</th>
                        <th>Cabo (MBL)</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {equipments.map((eq, idx) => (
                        <tr key={idx}>
                          <td><strong>{eq.tag || `TAG-${idx + 1}`}</strong></td>
                          <td>{eq.model}</td>
                          <td>{eq.line}</td>
                          <td>{eq.specifications.cableDiameter}mm ({eq.specifications.cableMBLkN} kN)</td>
                          <td>
                            <span className={`status-pill status-${eq.status.toLowerCase().replace('_', '')}`}>
                              {eq.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="preview-actions">
                <button onClick={() => setActiveTab('form')} className="secondary">
                  ⬅️ Voltar ao Formulário
                </button>
                <button onClick={handleGeneratePdf} className="primary" disabled={equipments.length === 0 || isGenerating}>
                  {isGenerating ? '⏳ Gerando...' : '📄 Baixar Laudo Completo em PDF'}
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;