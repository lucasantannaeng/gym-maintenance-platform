// src/components/WalkthroughModal.tsx
import { useState } from 'react';

const WalkthroughSteps = [
  {
    id: 1,
    title: 'Identificação & ART',
    description: 'Preencha os dados do cliente, do responsável técnico e da ART (Anotação de Responsabilidade Técnica). Este é o primeiro passo para garantir a validade legal do laudo.',
    illustration: '👤📋' // In a real app, this could be an image or icon component
  },
  {
    id: 2,
    title: 'Seleção do Tipo de Laudo',
    description: 'Escolha entre os 4 modelos de laudo disponíveis: Conformidade NR-12, Manutenção Preventiva, Investigação de Sinistro ou Entrega de Equipamentos Novos.',
    illustration: '📑'
  },
  {
    id: 3,
    title: 'Presets Lion & Evidências Fotográficas',
    description: 'Selecione rapidamente o equipamento pela lista de presets Lion Fitness. Faça upload das fotos e marque a severidade de cada não conformidade encontrada.',
    illustration: '📸🔧'
  },
  {
    id: 4,
    title: 'Emissão em 1 Clique',
    description: 'Com todos os dados preenchidos, gere o PDF A4 com paginação inteligente, QR Code antifraude e todos os elementos normativos necessários.',
    illustration: '🖨️✅'
  }
];

interface WalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalkthroughModal: React.FC<WalkthroughModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="walkthrough-backdrop" onClick={onClose}>
      <div className="walkthrough-modal" onClick={e => e.stopPropagation()}>
        <div className="walkthrough-header">
          <h2>Como Usar o Gerador de Laudos</h2>
          <button className="walkthrough-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="walkthrough-body">
          <div className="walkthrough-step">
            <div className="walkthrough-step-number">{currentStep + 1}/4</div>
            <div className="walkthrough-step-title">{WalkthroughSteps[currentStep].title}</div>
            <div className="walkthrough-step-description">{WalkthroughSteps[currentStep].description}</div>
            <div className="walkthrough-step-illustration">{WalkthroughSteps[currentStep].illustration}</div>
          </div>
        </div>
        <div className="walkthrough-footer">
          {currentStep > 0 && (
            <button className="walkthrough-nav-btn" onClick={() => setCurrentStep(currentStep - 1)}>
              Anterior
            </button>
          )}
          {currentStep < WalkthroughSteps.length - 1 ? (
            <button className="walkthrough-nav-btn" onClick={() => setCurrentStep(currentStep + 1)}>
              Próximo
            </button>
          ) : (
            <button className="walkthrough-nav-btn walkthrough-finish-btn" onClick={onClose}>
              Começar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalkthroughModal;