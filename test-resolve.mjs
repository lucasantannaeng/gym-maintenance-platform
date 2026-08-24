import('./src/data/lionPresets.ts').then(m=>console.log(Object.keys(m).slice(0,5))).catch(e=>console.error('ERR:', e.message));
