import React, { useState, useEffect } from 'react';


const SolarCableCalculator = () => {
  const [activeTab, setActiveTab] = useState('dc');
  
  // --- Constants ---
  const RESISTIVITY = {
    copper: 0.0178, // Ohm*mm^2/m at 20C
    aluminum: 0.0290 // Ohm*mm^2/m at 20C
  };
  
  // Standard cable sizes (mm2)
  const CABLE_SIZES = [2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400];

  // Standard Breaker Sizes (Amps)
  const BREAKER_SIZES = [10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 320, 400, 630, 800, 1000, 1250, 1600, 2000, 2500];

  // Installation Factors (Simplified Derating)
  const INSTALLATION_METHODS = {
    'tray': { label: 'Perforated Cable Tray (Air)', factor: 1.0 },
    'conduit': { label: 'Conduit / Pipe', factor: 0.8 },
    'buried': { label: 'Direct Buried (Underground)', factor: 0.9 }
  };

  // --- State for DC Calculator ---
  const [dcInput, setDcInput] = useState({
    strings: 1,
    modulesPerString: 18,
    moduleVoc: 49.5,
    moduleIsc: 13.5,
    cableLength: 50, // meters
    material: 'copper',
    selectedSize: 4, // mm2
    maxDropAllowed: 1.5, // %
    method: 'tray',
    cores: '1C' // DC is almost always 1C
  });

  const [dcResult, setDcResult] = useState(null);

  // --- State for AC Calculator ---
  const [acInput, setAcInput] = useState({
    inverterPower: 50, // kW
    systemVoltage: 415, // V (3-phase)
    phases: 3,
    powerFactor: 0.99,
    cableLength: 30, // meters
    material: 'aluminum',
    selectedSize: 50, // mm2
    maxDropAllowed: 2.0, // %
    method: 'tray',
    cores: '3.5C'
  });
  
  const [acResult, setAcResult] = useState(null);

  // --- Helper: Find Breaker ---
  const getRecommendedBreaker = (current) => {
    // Rule: Breaker should be > Current * 1.25
    const requiredRating = current * 1.25;
    const size = BREAKER_SIZES.find(s => s >= requiredRating);
    return size || 'Custom';
  };

  // --- Calculations ---

  // DC Calculation Effect
  useEffect(() => {
    const vString = dcInput.modulesPerString * dcInput.moduleVoc;
    const iDesign = dcInput.moduleIsc * 1.25 * dcInput.strings;
    
    // Voltage Drop
    const rho = RESISTIVITY[dcInput.material];
    const vDrop = (2 * dcInput.cableLength * iDesign * rho) / dcInput.selectedSize;
    const vDropPercent = (vDrop / vString) * 100;
    const powerLoss = iDesign * vDrop;

    // Switchgear & Ampacity
    const installFactor = INSTALLATION_METHODS[dcInput.method].factor;
    const minAmpacityRequired = iDesign / installFactor;
    const recommendedBreaker = getRecommendedBreaker(iDesign);

    setDcResult({
      vString: vString.toFixed(1),
      iDesign: iDesign.toFixed(2),
      vDrop: vDrop.toFixed(2),
      vDropPercent: vDropPercent.toFixed(2),
      powerLoss: powerLoss.toFixed(1),
      isSafe: vDropPercent <= dcInput.maxDropAllowed,
      minAmpacity: minAmpacityRequired.toFixed(1),
      breaker: recommendedBreaker
    });
  }, [dcInput]);

  // AC Calculation Effect
  useEffect(() => {
    const pWatts = acInput.inverterPower * 1000;
    let iNominal = 0;
    
    if (acInput.phases === 3) {
      iNominal = pWatts / (Math.sqrt(3) * acInput.systemVoltage * acInput.powerFactor);
    } else {
      iNominal = pWatts / (acInput.systemVoltage * acInput.powerFactor);
    }
    
    // Voltage Drop
    const rho = RESISTIVITY[acInput.material];
    let vDrop = 0;
    
    if (acInput.phases === 3) {
      vDrop = (Math.sqrt(3) * acInput.cableLength * iNominal * rho) / acInput.selectedSize;
    } else {
      vDrop = (2 * acInput.cableLength * iNominal * rho) / acInput.selectedSize;
    }

    const vDropPercent = (vDrop / acInput.systemVoltage) * 100;
    
    // Power Loss
    const rCond = (rho * acInput.cableLength) / acInput.selectedSize;
    let powerLoss = 0;
    if (acInput.phases === 3) {
      powerLoss = 3 * Math.pow(iNominal, 2) * rCond;
    } else {
      powerLoss = 2 * Math.pow(iNominal, 2) * rCond;
    }

    // Switchgear & Ampacity
    const installFactor = INSTALLATION_METHODS[acInput.method].factor;
    const minAmpacityRequired = iNominal / installFactor;
    const recommendedBreaker = getRecommendedBreaker(iNominal);

    setAcResult({
      iNominal: iNominal.toFixed(1),
      vDrop: vDrop.toFixed(2),
      vDropPercent: vDropPercent.toFixed(2),
      powerLoss: powerLoss.toFixed(1),
      isSafe: vDropPercent <= acInput.maxDropAllowed,
      minAmpacity: minAmpacityRequired.toFixed(1),
      breaker: recommendedBreaker
    });
  }, [acInput]);

  // --- Handlers ---
  const handleDcChange = (e) => {
    const { name, value } = e.target;
    setDcInput(prev => ({
      ...prev,
      [name]: (name === 'material' || name === 'method' || name === 'cores') ? value : parseFloat(value)
    }));
  };

  const handleAcChange = (e) => {
    const { name, value } = e.target;
    setAcInput(prev => ({
      ...prev,
      [name]: (name === 'material' || name === 'method' || name === 'cores') ? value : parseFloat(value)
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calculator className="h-6 w-6 text-amber-500" />
          <h1 className="text-xl font-bold">Solar Design Engineering Suite</h1>
        </div>
        <div className="text-sm text-slate-400">v2.2.0 | Cable & Switchgear Sizing</div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Calculators</h2>
            <button 
              onClick={() => setActiveTab('dc')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dc' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Zap className="h-4 w-4" />
              DC System Sizing
            </button>
            <button 
              onClick={() => setActiveTab('ac')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium mt-2 transition-colors ${activeTab === 'ac' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Cable className="h-4 w-4" />
              AC System Sizing
            </button>
          </div>
          
          <div className="p-4 mt-auto">
            <div className="bg-slate-100 p-3 rounded-lg text-xs text-slate-500">
              <div className="flex items-center gap-2 mb-2 font-bold">
                <Info className="h-3 w-3" /> Note
              </div>
              <p>Switchgear recommendations use a 1.25x safety factor. Cable ampacity calculations include derating factors for installation method.</p>
            </div>
          </div>
        </div>

        {/* Calculation Area */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {activeTab === 'dc' && (
            <div className="max-w-5xl mx-auto animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">DC Cable & Protection Sizing</h2>
                  <p className="text-slate-500">String to Inverter Calculations</p>
                </div>
                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold border border-amber-200">
                  Standard: IEC 60364-7-712
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Inputs Panel */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <Settings className="h-4 w-4 text-slate-400" /> Electrical Parameters
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {/* Module Data */}
                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Module Voc (V)</label>
                      <input type="number" name="moduleVoc" value={dcInput.moduleVoc} onChange={handleDcChange} className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Module Isc (A)</label>
                      <input type="number" name="moduleIsc" value={dcInput.moduleIsc} onChange={handleDcChange} className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Modules per String</label>
                      <input type="number" name="modulesPerString" value={dcInput.modulesPerString} onChange={handleDcChange} className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Number of Strings</label>
                      <input type="number" name="strings" value={dcInput.strings} onChange={handleDcChange} className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                    
                    <div className="col-span-2 border-t border-slate-100 my-2"></div>
                    <h3 className="col-span-2 font-bold text-slate-700 mb-2 flex items-center gap-2 text-sm">
                       <Box className="h-4 w-4 text-slate-400" /> Cable & Installation
                    </h3>

                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Route Length (m)</label>
                      <input type="number" name="cableLength" value={dcInput.cableLength} onChange={handleDcChange} className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                    
                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Placement Method</label>
                      <select name="method" value={dcInput.method} onChange={handleDcChange} className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                        {Object.entries(INSTALLATION_METHODS).map(([key, val]) => (
                          <option key={key} value={key}>{val.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Cable Core</label>
                      <select name="cores" value={dcInput.cores} onChange={handleDcChange} className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                        <option value="1C">Single Core (1C)</option>
                        <option value="2C">Two Core (2C)</option>
                      </select>
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Material</label>
                      <select name="material" value={dcInput.material} onChange={handleDcChange} className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                        <option value="copper">Copper (Cu)</option>
                        <option value="aluminum">Aluminum (Al)</option>
                      </select>
                    </div>
                    
                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Cable Size (mm²)</label>
                      <select name="selectedSize" value={dcInput.selectedSize} onChange={handleDcChange} className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white font-mono">
                        {CABLE_SIZES.map(size => (
                          <option key={size} value={size}>{size} mm²</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Max Drop (%)</label>
                      <input type="number" name="maxDropAllowed" value={dcInput.maxDropAllowed} onChange={handleDcChange} step="0.1" className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                  </div>
                </div>

                {/* Results Panel */}
                <div className="bg-slate-800 text-white rounded-xl shadow-lg flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap className="w-32 h-32" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-amber-400 font-bold mb-6 text-sm uppercase tracking-wider">Engineering Results</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-end border-b border-slate-700 pb-2">
                        <span className="text-slate-400 text-sm">String Voltage (Voc)</span>
                        <span className="text-xl font-mono">{dcResult?.vString} V</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-slate-700 pb-2">
                        <span className="text-slate-400 text-sm">Design Current</span>
                        <span className="text-xl font-mono">{dcResult?.iDesign} A</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-slate-700 pb-2">
                        <span className="text-slate-400 text-sm">Voltage Drop</span>
                        <span className="text-xl font-mono">{dcResult?.vDrop} V ({dcResult?.vDropPercent}%)</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-slate-700 pb-2">
                        <div className="flex flex-col">
                          <span className="text-slate-400 text-sm">Req. Cable Ampacity</span>
                          <span className="text-xs text-slate-500">After derating</span>
                        </div>
                        <span className="text-xl font-mono text-amber-200">{dcResult?.minAmpacity} A</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-6 border-t border-slate-700">
                     <div className="flex items-center gap-3 mb-4">
                        <ShieldCheck className="text-amber-500 h-5 w-5" />
                        <span className="text-sm font-bold text-slate-300">Switchgear Recommendation</span>
                     </div>
                     <div className="flex justify-between items-center bg-slate-800 p-3 rounded border border-slate-600">
                        <span className="text-xs text-slate-400 uppercase">Fuse / DC Breaker</span>
                        <span className="text-2xl font-bold text-white">{dcResult?.breaker} A</span>
                     </div>
                     
                     <div className={`mt-4 p-3 rounded-lg flex items-start gap-3 ${dcResult?.isSafe ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                      {dcResult?.isSafe ? <CheckCircle className="w-5 h-5 text-green-400 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />}
                      <div className="text-xs">
                        {dcResult?.isSafe 
                          ? `Voltage drop is within limit (${dcInput.maxDropAllowed}%). Ensure cable ampacity > ${dcResult?.minAmpacity}A.`
                          : `Voltage drop exceeds ${dcInput.maxDropAllowed}%. Increase cable size.`
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ac' && (
            <div className="max-w-5xl mx-auto animate-in fade-in duration-300">
               <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">AC Cable & Switchgear Sizing</h2>
                  <p className="text-slate-500">Inverter to Grid/Panel Calculations</p>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">
                  Standard: IEC 60364-5-52
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Inputs Panel */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <Settings className="h-4 w-4 text-slate-400" /> Electrical Parameters
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Inverter Power (kW)</label>
                      <input type="number" name="inverterPower" value={acInput.inverterPower} onChange={handleAcChange} className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">System Voltage (V)</label>
                      <input type="number" name="systemVoltage" value={acInput.systemVoltage} onChange={handleAcChange} className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Phases</label>
                      <select name="phases" value={acInput.phases} onChange={handleAcChange} className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                        <option value={3}>3-Phase</option>
                        <option value={1}>1-Phase</option>
                      </select>
                    </div>
                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Power Factor</label>
                      <input type="number" name="powerFactor" value={acInput.powerFactor} onChange={handleAcChange} step="0.01" max="1" className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    
                    <div className="col-span-2 border-t border-slate-100 my-2"></div>
                    <h3 className="col-span-2 font-bold text-slate-700 mb-2 flex items-center gap-2 text-sm">
                       <Box className="h-4 w-4 text-slate-400" /> Cable & Installation
                    </h3>

                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Route Length (m)</label>
                      <input type="number" name="cableLength" value={acInput.cableLength} onChange={handleAcChange} className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    
                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Placement Method</label>
                      <select name="method" value={acInput.method} onChange={handleAcChange} className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                        {Object.entries(INSTALLATION_METHODS).map(([key, val]) => (
                          <option key={key} value={key}>{val.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Cable Core</label>
                      <select name="cores" value={acInput.cores} onChange={handleAcChange} className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                         <option value="3C">3 Core (3C)</option>
                         <option value="3.5C">3.5 Core (3.5C)</option>
                         <option value="4C">4 Core (4C)</option>
                         <option value="1C">Single Core (1C x 4 Runs)</option>
                      </select>
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Material</label>
                      <select name="material" value={acInput.material} onChange={handleAcChange} className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                        <option value="aluminum">Aluminum (Al)</option>
                        <option value="copper">Copper (Cu)</option>
                      </select>
                    </div>
                    
                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Cable Size (mm²)</label>
                      <select name="selectedSize" value={acInput.selectedSize} onChange={handleAcChange} className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white font-mono">
                        {CABLE_SIZES.map(size => (
                          <option key={size} value={size}>{size} mm²</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Max Drop (%)</label>
                      <input type="number" name="maxDropAllowed" value={acInput.maxDropAllowed} onChange={handleAcChange} step="0.1" className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>
                </div>

                {/* Results Panel */}
                <div className="bg-slate-800 text-white rounded-xl shadow-lg flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Cable className="w-32 h-32" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-blue-400 font-bold mb-6 text-sm uppercase tracking-wider">Engineering Results</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-end border-b border-slate-700 pb-2">
                        <span className="text-slate-400 text-sm">Nominal Current</span>
                        <span className="text-xl font-mono">{acResult?.iNominal} A</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-slate-700 pb-2">
                        <span className="text-slate-400 text-sm">Voltage Drop</span>
                        <span className="text-xl font-mono">{acResult?.vDrop} V ({acResult?.vDropPercent}%)</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-slate-700 pb-2">
                         <div className="flex flex-col">
                          <span className="text-slate-400 text-sm">Req. Cable Ampacity</span>
                          <span className="text-xs text-slate-500">After derating</span>
                        </div>
                        <span className="text-xl font-mono text-blue-200">{acResult?.minAmpacity} A</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-slate-700 pb-2">
                        <span className="text-slate-400 text-sm">Power Loss</span>
                        <span className="text-xl font-mono text-red-300">{acResult?.powerLoss} W</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-6 border-t border-slate-700">
                     <div className="flex items-center gap-3 mb-4">
                        <ShieldCheck className="text-blue-400 h-5 w-5" />
                        <span className="text-sm font-bold text-slate-300">Switchgear Recommendation</span>
                     </div>
                     <div className="flex justify-between items-center bg-slate-800 p-3 rounded border border-slate-600">
                        <span className="text-xs text-slate-400 uppercase">MCB / MCCB / ACB</span>
                        <span className="text-2xl font-bold text-white">{acResult?.breaker} A</span>
                     </div>

                    <div className={`mt-4 p-3 rounded-lg flex items-start gap-3 ${acResult?.isSafe ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                      {acResult?.isSafe ? <CheckCircle className="w-5 h-5 text-green-400 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />}
                      <div className="text-xs">
                        {acResult?.isSafe 
                          ? `AC drop is within ${acInput.maxDropAllowed}%. Ensure cable ampacity > ${acResult?.minAmpacity}A.`
                          : `High voltage drop (> ${acInput.maxDropAllowed}%). Increase cable size.`
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolarCableCalculator;
