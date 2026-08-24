import { useState, useCallback } from 'react';
import { GymEquipment, PhotoEvidence } from '../types/gymReport';
import { sha256 } from 'js-sha256';

interface PhotoUploaderProps {
  equipmentIndex: number;
  onUpdate: (updated: Partial<GymEquipment>) => void;
  currentEquipment?: GymEquipment;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  equipmentIndex,
  onUpdate,
  currentEquipment
}) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>(
    currentEquipment?.photoEvidence.map((p: PhotoEvidence) => p.url) || []
  );

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // Process files: compress client-side and generate SHA-256 hashes
    const newPhotoEvidence: PhotoEvidence[] = [];

    for (const file of files) {
      try {
        // 1. Read as data URL for processing
        const dataUrl = await readFileAsDataUrl(file);
        
        // 2. Generate SHA-256 hash
        const hash = sha256(dataUrl);
        
        // 3. Compress image client-side
        const compressedDataUrl = await compressImage(dataUrl, 1920, 0.85);
        
        // 4. Create PhotoEvidence object
        newPhotoEvidence.push({
          id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          url: compressedDataUrl,
          hash,
          description: `Foto capturada em ${new Date().toLocaleString('pt-BR')}`,
          severity: 'INFO',
          timestamp: new Date().toISOString(),
          equipmentTag: currentEquipment?.tag || '',
          category: 'OUTROS'
        });
      } catch (error) {
        console.error('Error processing file:', file.name, error);
      }
    }

    // Update equipment with new photos
    const updatedPhotos = [
      ...(currentEquipment?.photoEvidence || []),
      ...newPhotoEvidence
    ];
    
    onUpdate({ photoEvidence: updatedPhotos });
    setPreviewUrls(updatedPhotos.map(p => p.url));
  }, [currentEquipment, onUpdate]);

  const handleRemovePhoto = (index: number) => {
    if (!currentEquipment) return;
    const newPhotos = [...currentEquipment.photoEvidence];
    newPhotos.splice(index, 1);
    onUpdate({ photoEvidence: newPhotos });
    setPreviewUrls(newPhotos.map(p => p.url));
  };

  return (
    <div className="photo-uploader">
      <div className="field">
        <label>Adicionar Fotos de Evidência:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <small>Formatos: JPG, PNG, WebP (máx. 10MB cada). Compressão automática em 1920px de largura.</small>
      </div>

      {previewUrls.length > 0 && (
        <div className="photos-grid">
          {previewUrls.map((url, index) => (
            <div key={index} className="photo-item">
              <img src={url} alt={`Foto ${index + 1}`} />
              <button 
                onClick={() => handleRemovePhoto(index)}
                className="remove-photo"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Reads a File as Data URL
 */
function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Compresses an image client-side using Canvas
 */
async function compressImage(
  dataUrl: string, 
  maxWidth: number,
  quality: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Calculate new dimensions maintaining aspect ratio
      const aspectRatio = img.height / img.width;
      const newWidth = Math.min(img.width, maxWidth);
      const newHeight = newWidth * aspectRatio;
      
      // Create canvas and compress
      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      // Draw image to canvas (this compresses it)
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      
      // Convert to data URL with compression
      // Image format auto-detected from original
      const format = dataUrl.includes('png') ? 'image/png' : 'image/jpeg';
      resolve(canvas.toDataURL(format, quality));
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
}

export default PhotoUploader;