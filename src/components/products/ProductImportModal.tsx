import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  FileCode,
  FileText,
  Plus,
  Check,
  AlertCircle,
  Sparkles,
  ShoppingBag,
  Download,
  Info
} from 'lucide-react';
import {
  DetailedProduct,
  parseProductJsonInput,
  ATTACHED_UMBRELLA_PRODUCT,
  saveProductsToStorage,
  loadProductsFromStorage
} from '../../utils/productStore';

interface ProductImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: (product: DetailedProduct, allAdded?: DetailedProduct[]) => void;
}

export const ProductImportModal: React.FC<ProductImportModalProps> = ({
  isOpen,
  onClose,
  onProductAdded
}) => {
  const [importMode, setImportMode] = useState<'file' | 'manual' | 'paste'>('file');

  // File Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [parsedFromFile, setParsedFromFile] = useState<DetailedProduct | null>(null);
  const [parsedProductsFromFile, setParsedProductsFromFile] = useState<DetailedProduct[]>([]);
  const [collectionTitle, setCollectionTitle] = useState<string>('');
  const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(new Set());

  // Paste JSON State
  const [pastedJson, setPastedJson] = useState<string>('');
  const [pasteError, setPasteError] = useState<string | null>(null);
  const [pasteSuccess, setPasteSuccess] = useState<boolean>(false);
  const [pastedProductsCount, setPastedProductsCount] = useState<number>(0);

  // Manual Form State
  const [manualForm, setManualForm] = useState({
    name: '',
    category: 'Fashion Accessories > Rain Gear',
    status: 'Researching' as DetailedProduct['status'],
    mainImage: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=500&h=500&fit=crop',
    sellingPrice: 1400,
    costPrice: 760,
    shippingCost: 202,
    supplierName: 'Guangdong Umbrella Co.',
    moq: 3,
    targetCustomer: 'Algerian online shoppers (18-40)',
    whySell: 'Strong seasonal weather demand, light shipping parcel.',
    adHooks: 'La première pluie arrive — sois prête avec un parapluie compact !'
  });

  if (!isOpen) return null;

  // Handler for File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = parseProductJsonInput(content);
      if (res.success && res.products.length > 0) {
        setParsedProductsFromFile(res.products);
        setParsedFromFile(res.products[0]);
        setCollectionTitle(res.collectionTitle || '');
        setSelectedProductIds(new Set(res.products.map((p) => p.id)));
        setFileError(null);
      } else {
        setFileError(res.error || 'Failed to parse JSON file.');
        setParsedFromFile(null);
        setParsedProductsFromFile([]);
      }
    };
    reader.onerror = () => {
      setFileError('Could not read file.');
    };
    reader.readAsText(file);
  };

  // Quick load of the master collection (10 products)
  const handleLoadMasterSample = async () => {
    try {
      const res = await fetch('/assets/aistudio/all_products_master_2026-10-17_2f10e9b8.json');
      if (res.ok) {
        const text = await res.text();
        const parsed = parseProductJsonInput(text);
        if (parsed.success && parsed.products.length > 0) {
          setFileName('all_products_master_2026-10-17_2f10e9b8.json');
          setParsedProductsFromFile(parsed.products);
          setParsedFromFile(parsed.products[0]);
          setCollectionTitle(parsed.collectionTitle || 'Universal Product Intelligence — Master Collection');
          setSelectedProductIds(new Set(parsed.products.map((p) => p.id)));
          setFileError(null);
          return;
        }
      }
    } catch (err) {
      console.warn('Could not fetch master sample:', err);
    }
  };

  // Quick load of the attached umbrella sample
  const handleLoadAttachedSample = () => {
    setFileName('prd-20261017-umbrella-dz-004_b67c68a8.json');
    setParsedFromFile(ATTACHED_UMBRELLA_PRODUCT);
    setParsedProductsFromFile([ATTACHED_UMBRELLA_PRODUCT]);
    setSelectedProductIds(new Set([ATTACHED_UMBRELLA_PRODUCT.id]));
    setCollectionTitle('');
    setFileError(null);
  };

  // Handler for Paste JSON syntax check
  const handleValidatePastedJson = () => {
    const res = parseProductJsonInput(pastedJson);
    if (res.success && res.products.length > 0) {
      setPasteError(null);
      setPasteSuccess(true);
      setPastedProductsCount(res.products.length);
      return res.products;
    } else {
      setPasteError(res.error || 'Invalid JSON format');
      setPasteSuccess(false);
      setPastedProductsCount(0);
      return null;
    }
  };

  const handlePrettifyJson = () => {
    try {
      const parsed = JSON.parse(pastedJson);
      setPastedJson(JSON.stringify(parsed, null, 2));
      setPasteError(null);
    } catch (e: any) {
      setPasteError('Cannot format invalid JSON: ' + e.message);
    }
  };

  const handleImportFile = () => {
    if (parsedProductsFromFile.length > 0) {
      const toImport = parsedProductsFromFile.filter((p) => selectedProductIds.has(p.id));
      saveAndFinish(toImport.length > 0 ? toImport : parsedProductsFromFile);
    } else if (parsedFromFile) {
      saveAndFinish(parsedFromFile);
    }
  };

  const handleImportPasted = () => {
    const products = handleValidatePastedJson();
    if (!products || products.length === 0) return;
    saveAndFinish(products);
  };

  const handleCreateManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.name.trim()) return;

    const roi = Math.round(
      ((manualForm.sellingPrice - manualForm.costPrice - manualForm.shippingCost) / manualForm.sellingPrice) * 100
    );

    const newProduct: DetailedProduct = {
      id: `prd-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: manualForm.name,
      status: manualForm.status,
      category: manualForm.category,
      country: 'DZ',
      mainImage: manualForm.mainImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      supplier: {
        name: manualForm.supplierName,
        moq: Number(manualForm.moq) || 5,
        shippingTime: 'Sea freight ~25-45 days to DZ',
        location: 'China / Global'
      },
      financials: {
        sellingPrice: Number(manualForm.sellingPrice),
        costPrice: Number(manualForm.costPrice),
        shippingCost: Number(manualForm.shippingCost),
        roi,
        breakEvenPrice: Number(manualForm.costPrice) + Number(manualForm.shippingCost)
      },
      opportunity: {
        overallScore: 65,
        demand: 70,
        competition: 55,
        margin: 60,
        algeriaCodSuitability: 80,
        advertisingPotential: 75
      },
      competitors: [],
      intelligence: {
        demandLevel: 'MEDIUM',
        competitionLevel: 'MEDIUM',
        trendDirection: 'UP',
        targetCustomer: manualForm.targetCustomer,
        evidenceNotes: 'Created via manual intelligence entry.'
      },
      aiAnalysis: {
        whySell: manualForm.whySell.split('.').filter(Boolean).map((s) => s.trim()),
        risks: ['Pricing competition and confirmation delivery funnel.'],
        marketingAngle: 'High converting Algerian COD offer',
        suggestedPrice: `${manualForm.sellingPrice} DZD`,
        adHooks: manualForm.adHooks.split('.').filter(Boolean).map((s) => s.trim())
      }
    };

    saveAndFinish(newProduct);
  };

  const saveAndFinish = (productsToSave: DetailedProduct | DetailedProduct[]) => {
    const list = Array.isArray(productsToSave) ? productsToSave : [productsToSave];
    if (list.length === 0) return;
    const existing = loadProductsFromStorage();
    const newIds = new Set(list.map((p) => p.id));
    const updated = [...list, ...existing.filter((p) => !newIds.has(p.id))];
    saveProductsToStorage(updated);
    onProductAdded(list[0], list);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#141416] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#18181c] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Add Product to Intelligence</h3>
              <p className="text-xs text-neutral-400">Import via JSON file, manual form, or raw code</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#232328] hover:bg-[#2e2e36] text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Modes Switcher */}
        <div className="flex p-2 bg-[#17171a] border-b border-white/5 gap-1.5">
          <button
            type="button"
            onClick={() => setImportMode('file')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              importMode === 'file'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>1. Upload JSON File</span>
          </button>

          <button
            type="button"
            onClick={() => setImportMode('manual')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              importMode === 'manual'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>2. Manual Form</span>
          </button>

          <button
            type="button"
            onClick={() => setImportMode('paste')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              importMode === 'paste'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>3. Paste Code JSON</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[65vh]">
          {/* MODE 1: FILE JSON */}
          {importMode === 'file' && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-8 border-2 border-dashed border-white/15 hover:border-blue-500/50 bg-[#1a1a1f] hover:bg-[#202026] rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 group-hover:bg-blue-600/20 text-blue-400 flex items-center justify-center mb-3 transition-colors">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Choose JSON File or Drag & Drop
                </h4>
                <p className="text-xs text-neutral-400 max-w-sm">
                  Upload any <code className="text-blue-300 font-mono">.json</code> product file exported from research or suppliers.
                </p>
                <span className="mt-3 px-3 py-1 rounded-lg bg-[#27272e] text-xs font-medium text-neutral-200 border border-white/10 group-hover:bg-white group-hover:text-black transition-colors">
                  Browse Files
                </span>
              </div>

              {/* Quick load presets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-2xl bg-[#1c1c22] border border-blue-500/20 flex flex-col justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="text-xs font-bold text-white">Master Collection (10 Products)</span>
                    </div>
                    <span className="text-[10.5px] text-neutral-400 block mt-0.5 leading-snug">
                      Full Algeria COD catalog (cushions, warmers, belts, camping lamps...)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLoadMasterSample}
                    className="w-full py-1.5 px-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-bold transition-all cursor-pointer text-center"
                  >
                    Load Master Collection (10 Products)
                  </button>
                </div>

                <div className="p-3 rounded-2xl bg-[#1c1c22] border border-white/5 flex flex-col justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="text-xs font-bold text-white">Single Product (Umbrella)</span>
                    </div>
                    <span className="text-[10.5px] text-neutral-400 block mt-0.5 leading-snug">
                      Compact Folding Umbrella with Carabiner D-Ring Handle
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLoadAttachedSample}
                    className="w-full py-1.5 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs font-bold transition-all cursor-pointer text-center"
                  >
                    Load Single Umbrella
                  </button>
                </div>
              </div>

              {/* Feedback / Preview */}
              {fileError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{fileError}</span>
                </div>
              )}

              {/* Multiple Products Detected in File */}
              {parsedProductsFromFile.length > 1 && (
                <div className="p-4 rounded-2xl bg-[#1c1c22] border border-blue-500/40 space-y-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">
                        {collectionTitle || 'Master Collection'}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-mono">
                        {fileName || 'all_products_master.json'}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold font-mono text-[11px]">
                      {parsedProductsFromFile.length} Products Found
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400 border-b border-white/5 pb-2">
                    <span>
                      Selected to import: <strong className="text-white">{selectedProductIds.size} / {parsedProductsFromFile.length}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (selectedProductIds.size === parsedProductsFromFile.length) {
                          setSelectedProductIds(new Set());
                        } else {
                          setSelectedProductIds(new Set(parsedProductsFromFile.map((p) => p.id)));
                        }
                      }}
                      className="text-blue-400 hover:underline font-semibold cursor-pointer"
                    >
                      {selectedProductIds.size === parsedProductsFromFile.length ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>

                  {/* Scrollable list of products */}
                  <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 divide-y divide-white/5">
                    {parsedProductsFromFile.map((prod, idx) => {
                      const isChecked = selectedProductIds.has(prod.id);
                      return (
                        <div
                          key={prod.id || idx}
                          onClick={() => {
                            const next = new Set(selectedProductIds);
                            if (next.has(prod.id)) next.delete(prod.id);
                            else next.add(prod.id);
                            setSelectedProductIds(next);
                          }}
                          className={`p-2 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                            isChecked ? 'bg-white/[0.04]' : 'opacity-60 hover:opacity-100'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="accent-blue-600 rounded cursor-pointer"
                            />
                            <img
                              src={prod.mainImage}
                              alt={prod.name}
                              className="w-9 h-9 rounded-lg object-cover border border-white/10 shrink-0"
                            />
                            <div className="min-w-0">
                              <h5 className="text-xs font-semibold text-white truncate max-w-xs">{prod.name}</h5>
                              <span className="text-[10px] text-neutral-400 block truncate">{prod.category}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 text-right">
                            <span className="font-mono text-xs font-bold text-blue-400">
                              {prod.financials.sellingPrice} DZD
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-neutral-300">
                              {prod.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={handleImportFile}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>
                      Import {selectedProductIds.size} Products to Intelligence
                    </span>
                  </button>
                </div>
              )}

              {/* Single product detected */}
              {parsedProductsFromFile.length === 1 && parsedFromFile && (
                <div className="p-4 rounded-2xl bg-[#1c1c22] border border-blue-500/30 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Single Product Loaded:</span>
                    <span className="font-mono text-blue-400 font-bold">{fileName}</span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <img
                      src={parsedFromFile.mainImage}
                      alt={parsedFromFile.name}
                      className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-white truncate">{parsedFromFile.name}</h4>
                      <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-0.5">
                        <span className="font-mono text-blue-400 font-bold">
                          {parsedFromFile.financials.sellingPrice} DZD
                        </span>
                        <span>•</span>
                        <span>Score: {parsedFromFile.opportunity.overallScore}/100</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleImportFile}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Import Product ({parsedFromFile.name.slice(0, 30)}...)</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MODE 2: MANUAL FORM */}
          {importMode === 'manual' && (
            <form onSubmit={handleCreateManual} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Product Name / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Compact Folding Umbrella with Carabiner Handle"
                  value={manualForm.name}
                  onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1a1a1f] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Category / Niche
                  </label>
                  <input
                    type="text"
                    value={manualForm.category}
                    onChange={(e) => setManualForm({ ...manualForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1a1a1f] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Status
                  </label>
                  <select
                    value={manualForm.status}
                    onChange={(e) =>
                      setManualForm({ ...manualForm, status: e.target.value as DetailedProduct['status'] })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1a1a1f] border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Researching">Researching</option>
                    <option value="Active">Active</option>
                    <option value="Testing">Testing</option>
                    <option value="Validated">Validated</option>
                  </select>
                </div>
              </div>

              {/* Financials Row */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Selling Price (DZD)
                  </label>
                  <input
                    type="number"
                    value={manualForm.sellingPrice}
                    onChange={(e) => setManualForm({ ...manualForm, sellingPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1a1a1f] border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Cost Price (DZD)
                  </label>
                  <input
                    type="number"
                    value={manualForm.costPrice}
                    onChange={(e) => setManualForm({ ...manualForm, costPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1a1a1f] border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Shipping (DZD)
                  </label>
                  <input
                    type="number"
                    value={manualForm.shippingCost}
                    onChange={(e) => setManualForm({ ...manualForm, shippingCost: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1a1a1f] border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Main Image URL
                </label>
                <input
                  type="url"
                  value={manualForm.mainImage}
                  onChange={(e) => setManualForm({ ...manualForm, mainImage: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1a1a1f] border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    value={manualForm.supplierName}
                    onChange={(e) => setManualForm({ ...manualForm, supplierName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1a1a1f] border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    MOQ (Pieces)
                  </label>
                  <input
                    type="number"
                    value={manualForm.moq}
                    onChange={(e) => setManualForm({ ...manualForm, moq: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1a1a1f] border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Target Customer & Audience
                </label>
                <input
                  type="text"
                  value={manualForm.targetCustomer}
                  onChange={(e) => setManualForm({ ...manualForm, targetCustomer: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1a1a1f] border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Why Sell (Selling Points)
                </label>
                <textarea
                  rows={2}
                  value={manualForm.whySell}
                  onChange={(e) => setManualForm({ ...manualForm, whySell: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1a1a1f] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  High-Converting Ad Hook
                </label>
                <input
                  type="text"
                  value={manualForm.adHooks}
                  onChange={(e) => setManualForm({ ...manualForm, adHooks: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1a1a1f] border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Plus className="w-4 h-4" />
                <span>Save & Create Product</span>
              </button>
            </form>
          )}

          {/* MODE 3: PASTE CODE JSON */}
          {importMode === 'paste' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Paste raw JSON code (matching the umbrella product schema or any standard product):
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const r = await fetch('/assets/aistudio/all_products_master_2026-10-17_2f10e9b8.json');
                        if (r.ok) {
                          const t = await r.text();
                          setPastedJson(t);
                          const parsed = parseProductJsonInput(t);
                          if (parsed.success) {
                            setPastedProductsCount(parsed.products.length);
                            setPasteSuccess(true);
                          }
                        }
                      } catch {}
                    }}
                    className="text-[11px] text-blue-400 hover:underline cursor-pointer font-bold"
                  >
                    Paste Master Collection (10 Products)
                  </button>
                  <span className="text-neutral-600">•</span>
                  <button
                    type="button"
                    onClick={() => {
                      setPastedJson(JSON.stringify(ATTACHED_UMBRELLA_PRODUCT, null, 2));
                      setPastedProductsCount(1);
                      setPasteSuccess(true);
                    }}
                    className="text-[11px] text-neutral-400 hover:underline cursor-pointer"
                  >
                    Umbrella Sample
                  </button>
                  <span className="text-neutral-600">•</span>
                  <button
                    type="button"
                    onClick={handlePrettifyJson}
                    className="text-[11px] text-neutral-300 hover:text-white cursor-pointer"
                  >
                    Prettify
                  </button>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d10]">
                <textarea
                  rows={14}
                  value={pastedJson}
                  onChange={(e) => {
                    setPastedJson(e.target.value);
                    setPasteError(null);
                    setPasteSuccess(false);
                    if (e.target.value.trim()) {
                      const res = parseProductJsonInput(e.target.value);
                      if (res.success && res.products.length > 0) {
                        setPastedProductsCount(res.products.length);
                        setPasteSuccess(true);
                      }
                    }
                  }}
                  placeholder={`{\n  "meta": { "totalProducts": 10 },\n  "products": [\n    { "id": "prd-1", "name": "...", "financials": { ... } }\n  ]\n}`}
                  className="w-full p-4 font-mono text-xs text-neutral-200 bg-transparent placeholder-neutral-600 focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {pasteError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{pasteError}</span>
                </div>
              )}

              {pasteSuccess && (
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0 text-blue-400" />
                    <span>Valid JSON schema detected!</span>
                  </div>
                  {pastedProductsCount > 0 && (
                    <span className="font-mono font-bold text-xs bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/30">
                      {pastedProductsCount} Product{pastedProductsCount > 1 ? 's' : ''} Ready
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleImportPasted}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>
                    Import {pastedProductsCount > 1 ? `All ${pastedProductsCount} Products` : 'Product'} & Save
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
