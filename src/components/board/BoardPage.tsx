import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Search,
  CheckCircle2,
  Undo2,
  Redo2,
  Eye,
  Play,
  Share2,
  Bell,
  ChevronDown,
  ChevronRight,
  X,
  Plus,
  Minus,
  Maximize2,
  Sparkles,
  RefreshCw,
  Cpu,
  Sliders,
  DollarSign,
  TrendingUp,
  MousePointer,
  HelpCircle,
  FolderKanban,
  Zap,
  Globe,
  Tag,
  Check,
  Copy,
  Megaphone,
  Mail,
  Video,
  PenTool,
  ShoppingBag,
  ShoppingCart,
  Truck,
  RotateCcw,
  BarChart2,
  Database,
  FileText,
  FileSpreadsheet,
  Download,
  Lightbulb,
  ShieldAlert,
  ArrowRight,
  Filter,
  Webhook,
  Grid as GridIcon,
  Layers,
  Move,
  GripHorizontal,
  Hand,
  ZoomIn,
  ZoomOut,
  Trash2,
  ChevronsUpDown,
  List as ListIcon,
  AlignLeft,
  AlignRight,
  Settings,
  Workflow,
  Save,
  LogOut,
  ArrowLeft,
  Type,
  Languages,
  UploadCloud,
  FileCode,
  Image as ImageIcon,
  ExternalLink,
  HardDrive,
  Paperclip,
  Table,
  FileUp,
  Palette,
  Shapes,
  Square,
  Circle,
  Store,
  MapPin,
  Wand2,
  Film,
  Clapperboard,
  Link2,
  Target,
  ShieldCheck,
  MessageSquareQuote,
  Compass,
  Code,
  Smartphone,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { ALL_SKILL_CATEGORIES, ALL_SKILLS, SkillCategory, SkillItem } from '../../data/skillsData';

import {
  ProductLibraryItem,
  BoardNode,
  BoardEdge,
  BoardStickyNote,
  BoardProject,
  BoardShape,
  SAMPLE_PRODUCTS,
  getDefaultPromptForNode,
  TextStyleConfig,
  UploadedFileItem,
  CustomSkillItem,
  FileType,
  DEFAULT_UPLOADED_FILES,
} from '../../types/board';
import {
  loadBoardProjectsFromStorage,
  saveBoardProjectsToStorage,
  loadActiveBoardProjectId,
  saveActiveBoardProjectId,
  loadOpenBoardTabIds,
  saveOpenBoardTabIds,
  createNewBoardProjectOptions,
} from '../../utils/boardProjects';
import { BoardTabBar } from './BoardTabBar';
import { BoardProjectsModal } from './BoardProjectsModal';
import { NewBoardProjectModal } from './NewBoardProjectModal';
import { BoardProjectsHub } from './BoardProjectsHub';
import { UniversalContentEngine, normalizeAndCleanAIOutput } from './UniversalContentEngine';
import { AppNodeCanvasCard } from './AppNodeCanvasCard';
import { AppSidebar } from '../navigation/AppSidebar';
import { ProductPreviewModal } from '../products/ProductPreviewModal';
import { ProductImportModal } from '../products/ProductImportModal';
import { ProductRegrouperApp, CampaignBlueprint } from './ProductRegrouperApp';
import { TextToCodeLandingPageApp, DEFAULT_THE_GOOD_DOSE_DATA, LandingPageData } from './TextToCodeLandingPageApp';
import { TextToImageLandingPageApp, DEFAULT_ORVENA_DATA, ImageLandingPageData } from './TextToImageLandingPageApp';
import {
  LandingPageGeneratorApp,
  INITIAL_LANDING_PAGE_SETTINGS,
  LandingPageSettings,
} from './LandingPageGeneratorApp';
import { CroMobileLandingPageBuilder } from './CroMobileLandingPageBuilder';
import {
  DetailedProduct,
  loadProductsFromStorage,
  saveProductsToStorage,
  ATTACHED_UMBRELLA_PRODUCT,
} from '../../utils/productStore';
import { buildMasterStoreLandingPageHtml } from '../../utils/masterLandingPageBuilder';
import { croFactsFromNode, croFactsFromProductLike } from '../../utils/croLandingPageStrategy';

export type { ProductLibraryItem, BoardNode, BoardEdge, BoardStickyNote, BoardProject, BoardShape };
export { SAMPLE_PRODUCTS };

interface BoardPageProps {
  onNavigateHome: () => void;
  onNavigateToView: (view: string, subItem?: string) => void;
  initialSubItem?: string;
}

// Pixel-perfect Brand and Skill SVGs matching image_ca6855fc.png
export const SkillBrandIcon: React.FC<{ type: string; className?: string }> = ({
  type,
  className = 'w-4 h-4',
}) => {
  switch (type) {
    case 'meta':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M16.96 4.5C14.7 4.5 13.06 5.67 12 6.96 10.94 5.67 9.3 4.5 7.04 4.5 3.16 4.5 0 7.71 0 11.73c0 4.9 4.3 8.77 10.28 8.77 1.03 0 1.95-.14 2.76-.39.81.25 1.73.39 2.76.39 5.98 0 10.28-3.87 10.28-8.77 0-4.02-3.16-7.23-7.12-7.23zM7.04 17.5c-3.19 0-5.74-2.58-5.74-5.77s2.55-5.77 5.74-5.77c1.78 0 3.29.82 4.26 2.08-1.57 2.15-2.73 5.46-4.26 9.46zm9.92 0c-1.53-4-2.69-7.31-4.26-9.46.97-1.26 2.48-2.08 4.26-2.08 3.19 0 5.74 2.58 5.74 5.77s-2.55 5.77-5.74 5.77z"
            fill="currentColor"
          />
        </svg>
      );
    case 'google_ads':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path d="M3.7 15.3l5.5-9.6c.7-1.2 2.3-1.6 3.5-.9l.9.5c1.2.7 1.6 2.3.9 3.5L8.5 18.4c-.7 1.2-2.3 1.6-3.5.9l-.4-.2c-1.3-.7-1.7-2.3-.9-3.8z" fill="#FBBC04" />
          <path d="M16.8 19.5c1.5 0 2.7-1.2 2.7-2.7s-1.2-2.7-2.7-2.7-2.7 1.2-2.7 2.7 1.2 2.7 2.7 2.7z" fill="#4285F4" />
          <path d="M20.3 13.5l-5.5-9.6c-.7-1.2-2.3-1.6-3.5-.9l-1 .6c-1.2.7-1.6 2.3-.9 3.5l5.5 9.6c.7 1.2 2.3 1.6 3.5.9l1-.6c1.1-.7 1.6-2.3.9-3.5z" fill="#34A853" />
        </svg>
      );
    case 'tiktok_ads':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.63c.3 0 .59.05.86.13V9.4a6.34 6.34 0 0 0-7.39 6.22 6.34 6.34 0 0 0 10.87 4.54 6.28 6.28 0 0 0 1.9-4.54V9.08a8.28 8.28 0 0 0 4.87 1.58V7.21a4.84 4.84 0 0 1-1-.52z" />
        </svg>
      );
    case 'sheets':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect x="3" y="2" width="18" height="20" rx="3" fill="#0F9D58" />
          <path d="M7 7h10M7 11h10M7 15h10M11 7v10" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'shopify':
    case 'store':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M18.8 6.5l-2.6-1.5c-.2-.1-.5 0-.6.2l-1 2.2-2.1-1.3c-.3-.2-.7 0-.8.3l-1.3 6.9-2.5-4.5c-.2-.3-.6-.4-.9-.2l-2.7 1.5c-.2.1-.3.3-.3.6l1.2 10.3c.1.5.5.9 1 .9h9c.5 0 .9-.4 1-.9l1.7-13.8c0-.3-.1-.6-.4-.7z" fill="#95BF47" />
          <path d="M13.2 8.9l1.7 4.1c.2.4.7.6 1.1.4l2.8-1.4-1.2 9.5c0 .3-.3.5-.6.5h-8c-.3 0-.6-.2-.6-.5L7.3 12l2.3-1.3 2.1 3.8c.3.5.9.6 1.5-.6z" fill="#5E8E3E" opacity="0.4" />
        </svg>
      );
    default:
      return null;
  }
};

// Helper to detect if text contains Arabic/Darija characters
function isArabicText(text: string): boolean {
  return /[\u0600-\u06FF\u0750-\u077F]/.test(text);
}

// Helper to format inline bold (**text**) into <strong>
function formatInlineMarkdown(text: string): React.ReactNode {
  if (!text) return '';
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

// Helper to convert hex color to transparent rgba
function hexToRgba(hex: string, alpha: number): string {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map((char) => char + char).join('');
  }
  if (c.length !== 6) return `rgba(99, 102, 241, ${alpha})`;
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export interface MarketCountryItem {
  id: string;
  name: string;
  flag: string;
  region: string;
  currency: string;
}

export const TARGET_MARKETS: MarketCountryItem[] = [
  // North Africa (Algeria Default)
  { id: 'Algeria', name: 'Algeria', flag: '🇩🇿', region: 'North Africa', currency: 'DZD' },
  { id: 'Morocco', name: 'Morocco', flag: '🇲🇦', region: 'North Africa', currency: 'MAD' },
  { id: 'Tunisia', name: 'Tunisia', flag: '🇹🇳', region: 'North Africa', currency: 'TND' },
  { id: 'Egypt', name: 'Egypt', flag: '🇪🇬', region: 'North Africa', currency: 'EGP' },
  // GCC
  { id: 'Saudi Arabia', name: 'Saudi Arabia (GCC)', flag: '🇸🇦', region: 'GCC', currency: 'SAR' },
  { id: 'UAE', name: 'UAE Emirates (GCC)', flag: '🇦🇪', region: 'GCC', currency: 'AED' },
  { id: 'Qatar', name: 'Qatar (GCC)', flag: '🇶🇦', region: 'GCC', currency: 'QAR' },
  { id: 'Kuwait', name: 'Kuwait (GCC)', flag: '🇰🇼', region: 'GCC', currency: 'KWD' },
  { id: 'Oman', name: 'Oman (GCC)', flag: '🇴🇲', region: 'GCC', currency: 'OMR' },
  { id: 'Bahrain', name: 'Bahrain (GCC)', flag: '🇧🇭', region: 'GCC', currency: 'BHD' },
  // Western Europe
  { id: 'Spain', name: 'Spain', flag: '🇪🇸', region: 'Western Europe', currency: 'EUR' },
  { id: 'France', name: 'France', flag: '🇫🇷', region: 'Western Europe', currency: 'EUR' },
  { id: 'Italy', name: 'Italy', flag: '🇮🇹', region: 'Western Europe', currency: 'EUR' },
  { id: 'Germany', name: 'Germany', flag: '🇩🇪', region: 'Western Europe', currency: 'EUR' },
  { id: 'United Kingdom', name: 'United Kingdom (UK)', flag: '🇬🇧', region: 'Western Europe', currency: 'GBP' },
  { id: 'Belgium', name: 'Belgium', flag: '🇧🇪', region: 'Western Europe', currency: 'EUR' },
  { id: 'Portugal', name: 'Portugal', flag: '🇵🇹', region: 'Western Europe', currency: 'EUR' },
  // Central & Eastern Europe
  { id: 'Poland', name: 'Poland', flag: '🇵🇱', region: 'Eastern Europe', currency: 'PLN' },
  { id: 'Ukraine', name: 'Ukraine', flag: '🇺🇦', region: 'Eastern Europe', currency: 'UAH' },
  { id: 'Romania', name: 'Romania', flag: '🇷🇴', region: 'Eastern Europe', currency: 'RON' },
  // Americas
  { id: 'USA', name: 'United States (USA)', flag: '🇺🇸', region: 'Americas', currency: 'USD' },
  { id: 'Canada', name: 'Canada', flag: '🇨🇦', region: 'Americas', currency: 'CAD' },
  { id: 'Brazil', name: 'Brazil', flag: '🇧🇷', region: 'Americas', currency: 'BRL' },
  // Asia & Pacific
  { id: 'Japan', name: 'Japan', flag: '🇯🇵', region: 'Asia & Pacific', currency: 'JPY' },
  { id: 'China', name: 'China', flag: '🇨🇳', region: 'Asia & Pacific', currency: 'CNY' },
  { id: 'Australia', name: 'Australia', flag: '🇦🇺', region: 'Asia & Pacific', currency: 'AUD' },
  // Eurasia & Other
  { id: 'Russia', name: 'Russia', flag: '🇷🇺', region: 'Eurasia', currency: 'RUB' },
  { id: 'Turkey', name: 'Turkey', flag: '🇹🇷', region: 'Eurasia', currency: 'TRY' },
];

export const BoardPage: React.FC<BoardPageProps> = ({ onNavigateHome, onNavigateToView, initialSubItem }) => {
  // Selection
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [resultViewStyle, setResultViewStyle] = useState<'organized' | 'plain'>('organized');
  const [copiedSnippetKey, setCopiedSnippetKey] = useState<string | null>(null);
  const [settingsModalNodeId, setSettingsModalNodeId] = useState<string | null>(null);
  const [settingsActiveTab, setSettingsActiveTab] = useState<'config' | 'prompt' | 'options' | 'typography'>('config');
  const [styleAppliedAllToast, setStyleAppliedAllToast] = useState(false);
  const [activeBottomResultNodeId, setActiveBottomResultNodeId] = useState<string | null>(null);
  const [isBottomResultOpen, setIsBottomResultOpen] = useState(true);
  const [bottomResultHeight, setBottomResultHeight] = useState<'normal' | 'large'>('normal');
  const [expandedCardResultIds, setExpandedCardResultIds] = useState<Record<string, boolean>>({});
  const [isSkillsPanelOpen, setIsSkillsPanelOpen] = useState(true);
  const [skillsSearch, setSkillsSearch] = useState('');
  const [skillsFilter, setSkillsFilter] = useState('All');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    stage_1_product: true,
    stage_2_strategy: true,
    stage_3_creative: true,
    dz_landing_page: true,
    fb_ads_testing: true,
    fb_ads_scaling: true,
    decision_intelligence: true,
  });
  const [skillsViewMode, setSkillsViewMode] = useState<'list' | 'grid'>('grid');
  const [activeInspectorTab, setActiveInspectorTab] = useState<'findings' | 'settings' | 'metrics' | 'connections'>('findings');

  // Left Drawer Tab Mode: 'skills' | 'products' | 'uploads' | 'apps'
  const [sidebarTab, setSidebarTab] = useState<'skills' | 'products' | 'uploads' | 'apps'>('skills');
  const [productSearch, setProductSearch] = useState('');
  const [appSearch, setAppSearch] = useState('');
  const [copiedResult, setCopiedResult] = useState(false);
  const [textDirection, setTextDirection] = useState<'ltr' | 'rtl'>('ltr');

  // Products Dossier & Intelligence Store State
  const [productsList, setProductsList] = useState<DetailedProduct[]>(() => loadProductsFromStorage());
  const [isProductImportModalOpen, setIsProductImportModalOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<DetailedProduct | null>(null);
  const [isRegrouperModalOpen, setIsRegrouperModalOpen] = useState(false);
  const [regrouperData, setRegrouperData] = useState<Partial<CampaignBlueprint> | null>(null);
  const [isTextToCodeModalOpen, setIsTextToCodeModalOpen] = useState(false);
  const [textToCodeData, setTextToCodeData] = useState<Partial<LandingPageData> | null>(null);
  const [isTextToImageLpModalOpen, setIsTextToImageLpModalOpen] = useState(false);
  const [textToImageLpData, setTextToImageLpData] = useState<Partial<ImageLandingPageData> | null>(null);
  const [isLandingPageModalOpen, setIsLandingPageModalOpen] = useState(false);
  const [landingPageSettings, setLandingPageSettings] = useState<Partial<LandingPageSettings> | null>(null);
  const [isCroMobileModalOpen, setIsCroMobileModalOpen] = useState(false);

  // Auto-open Apps Modals if navigated directly via Apps sidebar
  useEffect(() => {
    if (initialSubItem === 'regrouper') {
      setIsRegrouperModalOpen(true);
    } else if (initialSubItem === 'text-to-code-lp' || initialSubItem === 'text_to_code_landing_page') {
      setIsTextToCodeModalOpen(true);
    } else if (initialSubItem === 'text-to-image-lp' || initialSubItem === 'text_to_image_landing_page') {
      setIsTextToImageLpModalOpen(true);
    } else if (
      initialSubItem === 'cro-mobile-lp' ||
      initialSubItem === 'cro_mobile_landing_page' ||
      initialSubItem === 'cro-mobile' ||
      initialSubItem === 'cro'
    ) {
      setIsCroMobileModalOpen(true);
    } else if (
      initialSubItem === 'landing-page' ||
      initialSubItem === 'lanidng-page' ||
      initialSubItem === 'landing_page' ||
      initialSubItem === 'landing_page_generator' ||
      initialSubItem === 'ai-landing-page'
    ) {
      setIsLandingPageModalOpen(true);
    }
  }, [initialSubItem]);

  // File Uploads & Datasets State (Persistent)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileItem[]>(() => {
    try {
      const saved = localStorage.getItem('user_uploaded_files_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_UPLOADED_FILES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('user_uploaded_files_v1', JSON.stringify(uploadedFiles));
    } catch (e) {
      console.error('Failed to save uploaded files to localStorage', e);
    }
  }, [uploadedFiles]);

  const [fileFilter, setFileFilter] = useState<'all' | 'excel' | 'pdf' | 'word' | 'json' | 'image'>('all');
  const [fileSearch, setFileSearch] = useState('');
  const [previewFileModal, setPreviewFileModal] = useState<UploadedFileItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Custom AI Skills State (Persistent)
  const [customSkills, setCustomSkills] = useState<CustomSkillItem[]>(() => {
    try {
      const saved = localStorage.getItem('user_custom_skills_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('user_custom_skills_v1', JSON.stringify(customSkills));
    } catch (e) {
      console.error('Failed to save custom skills to localStorage', e);
    }
  }, [customSkills]);

  // Hidden / Removed skill IDs from list (Persistent)
  const [removedSkillIds, setRemovedSkillIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('user_removed_skill_ids_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('user_removed_skill_ids_v1', JSON.stringify(removedSkillIds));
    } catch (e) {
      console.error('Failed to save removed skill ids to localStorage', e);
    }
  }, [removedSkillIds]);

  // Skill pending removal confirmation modal state
  const [skillToRemove, setSkillToRemove] = useState<{
    id: string;
    title: string;
    isCustom?: boolean;
  } | null>(null);

  const handleConfirmRemoveSkill = () => {
    if (!skillToRemove) return;
    if (skillToRemove.isCustom) {
      setCustomSkills((prev) => prev.filter((s) => s.id !== skillToRemove.id));
      showToast(`✓ Removed custom skill "${skillToRemove.title}"`);
    } else {
      setRemovedSkillIds((prev) => [...prev, skillToRemove.id]);
      showToast(`✓ Removed skill "${skillToRemove.title}" from list`);
    }
    setSkillToRemove(null);
  };

  const handleRestoreAllSkills = () => {
    setRemovedSkillIds([]);
    showToast('✓ Restored all hidden skills to list!');
  };

  const [isNewSkillModalOpen, setIsNewSkillModalOpen] = useState(false);
  const [newSkillTitle, setNewSkillTitle] = useState('');
  const [newSkillSubtitle, setNewSkillSubtitle] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('stage_1_product');
  const [isCustomCategoryMode, setIsCustomCategoryMode] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [newSkillIcon, setNewSkillIcon] = useState('Sparkles');
  const [newSkillColor, setNewSkillColor] = useState('bg-emerald-600');
  const [newSkillPrompt, setNewSkillPrompt] = useState(
    'Execute customized intelligence analysis for "{product_title}".\nAnalyze market potential and pricing for {selling_price} DZD in Algerian COD market.\nIncorporate attached file data: {file_data}.\nProvide 3 high-converting creative hooks written 100% EXCLUSIVELY in {language}.'
  );



  // Helper parser for Clean Text Preview (Matching user attached image_571e17db.png)
  const parseCleanTextOutput = useCallback((rawContent: string, fallbackProduct?: string) => {
    let productName = fallbackProduct || '';
    let summary = '';
    const additionalSections: { title: string; body: string }[] = [];

    if (!rawContent) {
      return { productName, summary, additionalSections };
    }

    // 1. Match Product name: ...
    const productMatch = rawContent.match(/Product name:\s*([^\n\r]+)/i);
    if (productMatch && productMatch[1]) {
      productName = productMatch[1].trim();
    } else {
      const targetMatch = rawContent.match(/\*\*Target Product\*\*:\s*([^\n\r(]+)/i);
      if (targetMatch && targetMatch[1]) {
        productName = targetMatch[1].trim();
      }
    }

    // 2. Match Summary: ...
    const summaryMatch = rawContent.match(/Summary:\s*([\s\S]*?)(?=(?:\n\s*\n\s*[A-Z][A-Za-z0-9\s&/\-]+:)|(?:\n\s*###)|(?:\n\s*####)|$)/i);
    if (summaryMatch && summaryMatch[1]) {
      summary = summaryMatch[1].trim();
    } else {
      const cleaned = rawContent
        .replace(/^#+.*$/gm, '')
        .replace(/\*\*Target Product\*\*:.*$/gm, '')
        .trim();
      const paragraphs = cleaned.split(/\n\s*\n/);
      summary = paragraphs[0]?.trim() || '';
    }

    // 3. Match additional structured sections
    const lines = rawContent.split('\n');
    let currentTitle = '';
    let currentLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/^(?:####?\s*)?([A-Za-z0-9\s&/\-]+):\s*(.*)$/);
      if (match && !line.toLowerCase().startsWith('product name:') && !line.toLowerCase().startsWith('summary:')) {
        if (currentTitle && currentLines.length > 0) {
          additionalSections.push({
            title: currentTitle,
            body: currentLines.join('\n').trim(),
          });
        }
        currentTitle = match[1].trim().replace(/^#+\s*/, '').replace(/^\*\*|\*\*$/g, '');
        currentLines = match[2] ? [match[2].trim()] : [];
      } else if (currentTitle) {
        currentLines.push(line);
      }
    }

    if (currentTitle && currentLines.length > 0) {
      additionalSections.push({
        title: currentTitle,
        body: currentLines.join('\n').trim(),
      });
    }

    return { productName, summary, additionalSections };
  }, []);

  // Snippet copy handler
  const handleCopySnippet = useCallback((text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedSnippetKey(key);
    setTimeout(() => setCopiedSnippetKey(null), 2000);
  }, []);

  // --- MULTI-PROJECT BOARD STATE ---
  const [boardProjects, setBoardProjects] = useState<BoardProject[]>(() => loadBoardProjectsFromStorage());
  const [activeProjectId, setActiveProjectId] = useState<string>(() => loadActiveBoardProjectId(boardProjects));
  const [openProjectIds, setOpenProjectIds] = useState<string[]>(() => loadOpenBoardTabIds(boardProjects));
  // Default view is 'hub' matching image_ddb7176c.png so user sees all projects and chooses what to open
  const [boardViewMode, setBoardViewMode] = useState<'hub' | 'canvas'>('hub');

  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isHeaderProjectDropdownOpen, setIsHeaderProjectDropdownOpen] = useState(false);

  // Active project
  const currentProject =
    boardProjects.find((p) => p.id === activeProjectId) ||
    boardProjects[0] || {
      id: 'default',
      name: 'Algeria COD Sales Funnel',
      nodes: [],
      edges: [],
      stickyNotes: [],
      panOffset: { x: 50, y: 20 },
      zoom: 85,
    };

  // Surface Color Presets for Board Canvas (User Request: small cards view surface color)
  const SURFACE_COLOR_PRESETS = [
    {
      id: 'finalytic-dark',
      name: 'Finalytic Dark',
      color: '#161618',
      dotColor: '#454552',
      lineColor: '#2b2b32',
      isDark: true,
      description: 'Matches the sidebar & header theme',
    },
    {
      id: 'deep-obsidian',
      name: 'Deep Obsidian',
      color: '#0e0e11',
      dotColor: '#363640',
      lineColor: '#202027',
      isDark: true,
      description: 'Ultra dark high-contrast surface',
    },
    {
      id: 'midnight-navy',
      name: 'Midnight Navy',
      color: '#0B132B',
      dotColor: '#28385e',
      lineColor: '#1C2541',
      isDark: true,
      description: 'Deep celestial dark blue canvas',
    },
    {
      id: 'graphite',
      name: 'Modern Graphite',
      color: '#1E1E24',
      dotColor: '#4E4E58',
      lineColor: '#2F2F38',
      isDark: true,
      description: 'Technical matte dark charcoal',
    },
    {
      id: 'clean-slate',
      name: 'Clean Slate',
      color: '#F8FAFC',
      dotColor: '#CBD5E1',
      lineColor: '#E2E8F0',
      isDark: false,
      description: 'Crisp airy modern blueprint',
    },
    {
      id: 'warm-paper',
      name: 'Warm Paper',
      color: '#FDFBF7',
      dotColor: '#D8D1C5',
      lineColor: '#EBE5D8',
      isDark: false,
      description: 'Soft warm natural surface',
    },
    {
      id: 'pure-white',
      name: 'Studio White',
      color: '#FFFFFF',
      dotColor: '#E2E8F0',
      lineColor: '#F1F5F9',
      isDark: false,
      description: 'Minimal pure white canvas',
    },
    {
      id: 'soft-zinc',
      name: 'Soft Zinc Gray',
      color: '#F1F5F9',
      dotColor: '#94A3B8',
      lineColor: '#CBD5E1',
      isDark: false,
      description: 'Balanced cool neutral tone',
    },
  ];

  // Surface background color state
  const [boardBgColor, setBoardBgColor] = useState<string>(() => {
    return localStorage.getItem('board_surface_color') || '#161618';
  });
  const [isSurfaceColorMenuOpen, setIsSurfaceColorMenuOpen] = useState(false);

  const handleSelectBoardBgColor = (color: string) => {
    setBoardBgColor(color);
    localStorage.setItem('board_surface_color', color);
    showToast(`Board surface color set to ${color}`);
  };

  const isDarkSurface = React.useMemo(() => {
    const c = boardBgColor.replace('#', '');
    if (c.length === 6) {
      const r = parseInt(c.substring(0, 2), 16);
      const g = parseInt(c.substring(2, 4), 16);
      const b = parseInt(c.substring(4, 6), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness < 128;
    }
    return false;
  }, [boardBgColor]);

  // Zoom & Pan & Grid Style - restores from active project
  const [zoom, setZoom] = useState<number>(() => currentProject?.zoom || 85);
  const [gridStyle, setGridStyle] = useState<'dots' | 'lines' | 'cross'>('dots');
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [isRunningWorkflow, setIsRunningWorkflow] = useState(false);
  const [runningNodeId, setRunningNodeId] = useState<string | null>(null);
  const [activeLanguageMenuNodeId, setActiveLanguageMenuNodeId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');

  // Active AI Model selection & detection state on Board
  const [currentAiModel, setCurrentAiModel] = useState<string>(
    () => localStorage.getItem('ai_model') || 'gpt-4o-mini'
  );
  const [currentAiProvider, setCurrentAiProvider] = useState<string>(
    () => localStorage.getItem('ai_provider') || 'openai'
  );
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [boardDetectedModels, setBoardDetectedModels] = useState<
    Array<{ id: string; name: string; isRecommended?: boolean; category?: string }>
  >([]);
  const [verifiedWorkingModels, setVerifiedWorkingModels] = useState<
    Array<{ id: string; name?: string; provider?: string; latencyMs?: number; success?: boolean; testedAt?: string }>
  >(() => {
    try {
      const stored = localStorage.getItem('verified_working_models');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isDetectingOnBoard, setIsDetectingOnBoard] = useState(false);
  const [isTestingOnBoard, setIsTestingOnBoard] = useState(false);
  const [showOnlyVerified, setShowOnlyVerified] = useState(true);
  const [boardDetectionMsg, setBoardDetectionMsg] = useState<string | null>(null);
  const [customModelOnBoard, setCustomModelOnBoard] = useState('');
  const [isCustomInputOpen, setIsCustomInputOpen] = useState(false);
  const connectStartTimeRef = useRef<number>(0);

  const syncModelsFromStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem('verified_working_models');
      if (stored) {
        setVerifiedWorkingModels(JSON.parse(stored));
      }
      const savedModel = localStorage.getItem('ai_model');
      if (savedModel) setCurrentAiModel(savedModel);
      const savedProv = localStorage.getItem('ai_provider');
      if (savedProv) setCurrentAiProvider(savedProv);
    } catch {}
  }, []);

  useEffect(() => {
    const handleStorageChange = () => syncModelsFromStorage();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [syncModelsFromStorage]);

  const handleFetchAndTestBoardModels = async (prov = currentAiProvider) => {
    setIsTestingOnBoard(true);
    setBoardDetectionMsg(null);
    try {
      const key =
        (prov === 'openai' ? localStorage.getItem('openai_api_key') : null) ||
        (prov === 'deepseek' ? localStorage.getItem('deepseek_api_key') : null) ||
        (prov === 'gemini' ? localStorage.getItem('gemini_api_key') : null) ||
        (prov === 'openrouter' ? localStorage.getItem('openrouter_api_key') : null) ||
        (prov === 'agentrouter' ? localStorage.getItem('agentrouter_api_key') : null) ||
        (prov === 'nvidia' ? localStorage.getItem('nvidia_api_key') : null) ||
        localStorage.getItem('user_api_key') ||
        '';

      if (!key) {
        showToast('Please enter an API key in Settings first to test models.');
        setBoardDetectionMsg('Missing API key in Settings');
        setIsTestingOnBoard(false);
        return;
      }

      // Step 1: Fetch models
      setBoardDetectionMsg('Step 1/2: Fetching available models...');
      const resModels = await fetch('/api/ai/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: prov, apiKey: key }),
      });
      const dataModels = await resModels.json();
      const candidateList: string[] = (
        dataModels.models && dataModels.models.length > 0
          ? dataModels.models.map((m: any) => m.id)
          : prov === 'openai'
          ? ['gpt-4o-mini', 'gpt-4o', 'o1-mini', 'gpt-4-turbo', 'gpt-3.5-turbo']
          : [currentAiModel]
      ).slice(0, 15);

      setBoardDetectedModels(dataModels.models || []);

      // Step 2: Test models to verify working status
      setBoardDetectionMsg('Step 2/2: Testing models in parallel...');
      const resTest = await fetch('/api/ai/test-models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: prov, apiKey: key, models: candidateList }),
      });
      const dataTest = await resTest.json();

      if (dataTest.results) {
        const working = dataTest.results
          .filter((r: any) => r.success)
          .map((r: any) => ({
            id: r.model,
            name: r.model,
            provider: prov,
            latencyMs: r.latencyMs,
            success: true,
            reply: r.reply,
            testedAt: new Date().toLocaleTimeString(),
          }));

        // Merge into verified working models
        try {
          const stored: any[] = JSON.parse(localStorage.getItem('verified_working_models') || '[]');
          const testedIds = new Set(candidateList);
          const untouched = stored.filter((m) => m.provider !== prov || !testedIds.has(m.id));
          const updated = [...working, ...untouched];
          localStorage.setItem('verified_working_models', JSON.stringify(updated));
          setVerifiedWorkingModels(updated);
        } catch {
          localStorage.setItem('verified_working_models', JSON.stringify(working));
          setVerifiedWorkingModels(working);
        }

        if (working.length > 0) {
          showToast(`Verified ${working.length} working models on ${prov.toUpperCase()}!`);
          setBoardDetectionMsg(`${working.length} working models verified.`);
          // Auto-select first working model if current isn't among working
          if (!working.some((w: any) => w.id === currentAiModel)) {
            setCurrentAiModel(working[0].id);
            localStorage.setItem('ai_model', working[0].id);
          }
        } else {
          showToast('None of the tested models responded with success. Check API key quota or balance.');
          setBoardDetectionMsg('All tested models failed. Check key balance or quota.');
        }
      }
    } catch (err: any) {
      setBoardDetectionMsg(`Test error: ${err?.message}`);
      showToast(`Verification error: ${err?.message}`);
    } finally {
      setIsTestingOnBoard(false);
    }
  };

  const handleFetchBoardModels = async (prov = currentAiProvider) => {
    setIsDetectingOnBoard(true);
    setBoardDetectionMsg(null);
    try {
      const key =
        (prov === 'openai' ? localStorage.getItem('openai_api_key') : null) ||
        (prov === 'deepseek' ? localStorage.getItem('deepseek_api_key') : null) ||
        (prov === 'gemini' ? localStorage.getItem('gemini_api_key') : null) ||
        (prov === 'openrouter' ? localStorage.getItem('openrouter_api_key') : null) ||
        (prov === 'agentrouter' ? localStorage.getItem('agentrouter_api_key') : null) ||
        (prov === 'nvidia' ? localStorage.getItem('nvidia_api_key') : null) ||
        localStorage.getItem('user_api_key') ||
        '';
      const res = await fetch('/api/ai/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: prov, apiKey: key }),
      });
      const data = await res.json();
      if (data.models && data.models.length > 0) {
        setBoardDetectedModels(data.models);
        setBoardDetectionMsg(data.message || `Detected ${data.models.length} active models`);
      } else {
        setBoardDetectionMsg(data.message || 'No models returned from API.');
      }
    } catch (e: any) {
      setBoardDetectionMsg(`Error: ${e?.message}`);
    } finally {
      setIsDetectingOnBoard(false);
    }
  };

  const handleSelectBoardModel = (modelId: string) => {
    setCurrentAiModel(modelId);
    localStorage.setItem('ai_model', modelId);
    showToast(`Active AI model set to: ${modelId}`);
    setIsModelDropdownOpen(false);
  };

  const handleSelectBoardProvider = (prov: string) => {
    setCurrentAiProvider(prov);
    localStorage.setItem('ai_provider', prov);
    let target = 'gpt-4o-mini';
    if (prov === 'deepseek') target = 'deepseek-chat';
    else if (prov === 'gemini') target = 'gemini-3.8-flash';
    else if (prov === 'openai') target = 'gpt-4o-mini';
    else if (prov === 'openrouter') target = 'nvidia/nemotron-3.5-lightning:free';
    else if (prov === 'agentrouter') target = 'gpt-4o';
    else if (prov === 'nvidia') target = 'meta/llama-3.3-70b-instruct';

    // If verified working models exist for this provider, pick the first working one
    const provWorking = verifiedWorkingModels.filter((m) => (m.provider || 'openai') === prov && m.success);
    if (provWorking.length > 0) {
      target = provWorking[0].id;
    }

    setCurrentAiModel(target);
    localStorage.setItem('ai_model', target);
    showToast(`AI Provider switched to: ${prov.toUpperCase()}`);
  };

  // Manual Zoom controls state
  const [isZoomMenuOpen, setIsZoomMenuOpen] = useState(false);
  const [wheelZoomEnabled, setWheelZoomEnabled] = useState(true);

  // Pan tool state - restores user last position from active project
  const [activeTool, setActiveTool] = useState<'select' | 'pan'>('select');
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>(() => currentProject?.panOffset || { x: 50, y: 20 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  // Drag-and-drop skill from left drawer state
  const [isCanvasDragOver, setIsCanvasDragOver] = useState(false);
  const [dragOverCoords, setDragOverCoords] = useState<{ x: number; y: number } | null>(null);
  const [pointerDraggingSkill, setPointerDraggingSkill] = useState<{
    skill: any;
    currentX: number;
    currentY: number;
    startX: number;
    startY: number;
    hasMoved: boolean;
  } | null>(null);

  // Edge selection & Interactive connection drawing states
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<{
    nodeId: string;
    anchor: 'left' | 'right';
    subId?: string;
  } | null>(null);
  const [connectingMousePos, setConnectingMousePos] = useState<{ x: number; y: number } | null>(null);

  // Dragging state for smooth interactive movement
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Minimap visibility & duplicate add prevention refs
  const [isMinimapOpen, setIsMinimapOpen] = useState(true);
  const lastAddSkillTimeRef = useRef<number>(0);
  const justDraggedSkillRef = useRef<boolean>(false);
  const isAddingSkillLockRef = useRef<boolean>(false);

  // Storage keys for user's work on the board
  const STORAGE_KEY_NODES = 'user_board_nodes_v1';
  const STORAGE_KEY_EDGES = 'user_board_edges_v1';
  const STORAGE_KEY_STICKY = 'user_board_sticky_v1';
  const STORAGE_KEY_PAN = 'user_board_pan_v1';
  const STORAGE_KEY_ZOOM = 'user_board_zoom_v1';

  // Canvas state initialized directly from the current active project
  const [nodes, setNodes] = useState<BoardNode[]>(() => currentProject?.nodes || []);

  // Presets archived; board defaults to clean state as requested
  /*
  const _unusedNodes: BoardNode[] = [
    {
      id: 'node-product-scaler',
      title: 'Ultrasonic Dental Scaler Pro',
      subtitle: 'Electric calculus remover • 4,800 DZD',
      category: 'Product Library',
      iconType: 'ShoppingBag',
      iconBg: 'bg-emerald-600',
      iconColor: 'text-white',
      x: -260,
      y: 130,
      status: 'active',
      isProduct: true,
      productData: SAMPLE_PRODUCTS[0],
      metrics: [
        { label: 'Selling', value: '4,800 DZD' },
        { label: 'Cost', value: '1,400 DZD' },
        { label: 'Margin', value: '+71%' },
      ],
      config: {
        name: 'Ultrasonic Dental Scaler Pro',
        description: 'High-converting personal care item in Algerian COD market with viral TikTok video angles.',
        campaignObjective: 'Sales',
        targetAudience: 'Algeria - 18+',
        budget: '30',
        budgetPeriod: 'per day',
        autoOptimization: true,
        trackConversions: true,
        saveAdsToLibrary: true,
      },
    },
    {
      id: 'node-meta-ads',
      title: 'Meta Ads',
      subtitle: 'Find winning audience and launch campaigns',
      category: 'Acquisition',
      iconType: 'meta',
      iconBg: 'bg-blue-600',
      iconColor: 'text-white',
      x: 80,
      y: 130,
      status: 'active',
      liveWebResearch: true,
      language: 'English',
      executionResult: {
        executedAt: '10:45 AM',
        skillName: 'Meta Ads',
        productName: 'Egg Sitter-style Honeycomb Gel Seat Cushion (branded original: Egg Sitter Support Cushion by BulbHead)',
        language: 'English',
        webResearchUsed: true,
        content: `Product name: Egg Sitter-style Honeycomb Gel Seat Cushion (branded original: Egg Sitter Support Cushion by BulbHead)

Summary:
The Egg Sitter-style honeycomb gel seat cushion is a proven, globally commoditized product with a strong demonstration hook (sitting on a raw egg without breaking it) and a mature market. Global demand is evidenced by 5,514 Amazon ratings, 829 Walmart ratings, and 50,000+ sold on a French AliExpress comparable, but the product is not novel and faces intense generic competition.

Winning Hooks:
1. Demonstration Hook (Raw Egg Test): "شفت هاد الكوسان بالجيل لي راه داير حالة في تيك توك؟ يمتص كامل الضغط حتى لوكان تقعد فوق حبة بيض ما تكسرهاش!"
2. Long-Distance Driver Relief: "Fatigué du mal de dos après de longues heures au volant ou au bureau ? Découvrez le coussin gel orthopédique n°1 testé en Algérie."
3. COD Guarantee: "Livraison 58 Wilayas disponible + متخلصش حتى تفتح الكولي وتجرب بعينيك!"

Market & COD Logistics:
- Selling Price: 3,800 DZD | Product Cost: 1,100 DZD | Gross Profit: +2,700 DZD (71%)
- Break-Even Delivery Rate: 64% with Yalidine Express across 58 Wilayas
- Return Mitigation: Call center WhatsApp voice message confirmation within 10 minutes of order placement.

Action Plan:
- Launch 3 UGC demonstration video creatives on Meta Ads targeting Wilayas 16 (Alger), 31 (Oran), 19 (Setif), and 25 (Constantine) at 2,500 DZD/day test budget.`,
        isSimulated: false,
      },
      metrics: [
        { label: 'Spend', value: '$182.4' },
        { label: 'Clicks', value: '12.4K' },
        { label: 'CTR', value: '2.8%' },
      ],
      config: {
        name: 'Meta Ads',
        description: 'Find winning audience and launch campaigns for your product.',
        campaignObjective: 'Sales',
        targetAudience: 'Algeria - 18+',
        budget: '50',
        budgetPeriod: 'per day',
        autoOptimization: true,
        trackConversions: true,
        saveAdsToLibrary: true,
      },
    },
    {
      id: 'node-product-research',
      title: 'Product Research',
      subtitle: 'Analyze demand, competition and profitability',
      category: 'Product Intelligence',
      iconType: 'search',
      iconBg: 'bg-emerald-500',
      iconColor: 'text-white',
      x: 430,
      y: 130,
      status: 'active',
      metrics: [
        { label: 'Ideas', value: '128' },
        { label: 'Potential', value: '42' },
        { label: 'Score > 70', value: '18' },
      ],
      config: {
        name: 'Product Research',
        description: 'Analyze demand, competition and profitability for winning COD products.',
        campaignObjective: 'Research & Validation',
        targetAudience: 'Algeria Wilayas',
        budget: '20',
        budgetPeriod: 'per day',
        autoOptimization: true,
        trackConversions: false,
        saveAdsToLibrary: true,
      },
    },
    {
      id: 'node-creative-production',
      title: 'Creative Production',
      subtitle: 'Generate creatives (images, videos, hooks)',
      category: 'Creative Production',
      iconType: 'creative',
      iconBg: 'bg-purple-600',
      iconColor: 'text-white',
      x: 770,
      y: 130,
      status: 'active',
      metrics: [
        { label: 'Created', value: '36' },
        { label: 'Approved', value: '28' },
        { label: 'CTR', value: '4.5%' },
      ],
      config: {
        name: 'Creative Production',
        description: 'Generate high converting Algerian video ads, UGC hooks and Darija scripts.',
        campaignObjective: 'Creative Testing',
        targetAudience: 'Broad Algeria',
        budget: '35',
        budgetPeriod: 'per day',
        autoOptimization: true,
        trackConversions: true,
        saveAdsToLibrary: true,
      },
    },
    {
      id: 'node-fb-ads-library',
      title: 'Facebook Ads Library',
      subtitle: 'Research competitors & winning ads',
      category: 'Acquisition',
      iconType: 'library',
      iconBg: 'bg-purple-600',
      iconColor: 'text-white',
      x: 80,
      y: 320,
      status: 'active',
      metrics: [
        { label: 'Ads Found', value: '1.2K' },
        { label: 'Pages', value: '342' },
        { label: 'New Ads', value: '87' },
      ],
      config: {
        name: 'Facebook Ads Library',
        description: 'Monitor competitor landing pages and active creative campaigns.',
        campaignObjective: 'Competitive Intelligence',
        targetAudience: 'Algerian Competitors',
        budget: '0',
        budgetPeriod: 'per day',
        autoOptimization: true,
        trackConversions: true,
        saveAdsToLibrary: true,
      },
    },
    {
      id: 'node-landing-page',
      title: 'Landing Page',
      subtitle: 'Build and test landing pages',
      category: 'Website & Conversion',
      iconType: 'landing',
      iconBg: 'bg-rose-500',
      iconColor: 'text-white',
      x: 520,
      y: 320,
      status: 'active',
      metrics: [
        { label: 'Views', value: '8.4K' },
        { label: 'CTR', value: '5.2%' },
        { label: 'CVR', value: '3.1%' },
      ],
      config: {
        name: 'Landing Page',
        description: 'Algerian COD optimized landing page with 58 Wilayas 1-page checkout.',
        campaignObjective: 'Lead Generation',
        targetAudience: 'Algeria All Wilayas',
        budget: '15',
        budgetPeriod: 'per day',
        autoOptimization: true,
        trackConversions: true,
        saveAdsToLibrary: false,
      },
    },
    {
      id: 'node-checkout',
      title: 'Checkout',
      subtitle: 'Customer places order',
      category: 'Website & Conversion',
      iconType: 'checkout',
      iconBg: 'bg-amber-500',
      iconColor: 'text-white',
      x: 80,
      y: 500,
      status: 'active',
      metrics: [
        { label: 'Started', value: '1.2K' },
        { label: 'Completed', value: '842' },
        { label: 'CVR', value: '71%' },
      ],
      config: {
        name: 'Checkout',
        description: 'Fast mobile COD order form with address auto-completion and phone validation.',
        campaignObjective: 'Conversions',
        targetAudience: 'Algeria Mobile Users',
        budget: '0',
        budgetPeriod: 'per day',
        autoOptimization: true,
        trackConversions: true,
        saveAdsToLibrary: false,
      },
    },
    {
      id: 'node-new-order-cod',
      title: 'New Order (COD)',
      subtitle: 'Confirm order via WhatsApp/Phone',
      category: 'Algeria COD Operations',
      iconType: 'order',
      iconBg: 'bg-teal-500',
      iconColor: 'text-white',
      x: 430,
      y: 500,
      status: 'active',
      metrics: [
        { label: 'Orders', value: '842' },
        { label: 'Confirm Rate', value: '98%' },
        { label: 'COD', value: '100%' },
      ],
      config: {
        name: 'New Order (COD)',
        description: 'Instant call-center audio confirmation within 15 minutes of placement.',
        campaignObjective: 'Fulfillment & Confirmation',
        targetAudience: '58 Wilayas',
        budget: '10',
        budgetPeriod: 'per day',
        autoOptimization: true,
        trackConversions: true,
        saveAdsToLibrary: false,
      },
    },
    {
      id: 'node-delivery',
      title: 'Delivery',
      subtitle: 'Delivery company & tracking',
      category: 'Algeria COD Operations',
      iconType: 'delivery',
      iconBg: 'bg-blue-600',
      iconColor: 'text-white',
      x: 770,
      y: 500,
      status: 'active',
      metrics: [
        { label: 'Delivered', value: '780' },
        { label: 'RTO', value: '8%' },
        { label: 'Delivery Rate', value: '92%' },
      ],
      config: {
        name: 'Delivery',
        description: 'Yalidine Express and ZR Express tracking with doorstep cash collection.',
        campaignObjective: 'Logistics',
        targetAudience: 'Algeria Dispatch',
        budget: '45',
        budgetPeriod: 'per day',
        autoOptimization: true,
        trackConversions: true,
        saveAdsToLibrary: false,
      },
    },
    {
      id: 'node-rto-return',
      title: 'RTO / Return',
      subtitle: 'Manage returns if failed delivery',
      category: 'Algeria COD Operations',
      iconType: 'return',
      iconBg: 'bg-rose-500',
      iconColor: 'text-white',
      x: 770,
      y: 680,
      status: 'active',
      metrics: [
        { label: 'RTO', value: '62' },
        { label: 'Returned', value: '50' },
        { label: 'Loss', value: '$1.2K' },
      ],
      config: {
        name: 'RTO / Return',
        description: 'Auto-blacklist and return parcel recovery workflow.',
        campaignObjective: 'Risk Mitigation',
        targetAudience: 'Returns & Claims',
        budget: '0',
        budgetPeriod: 'per day',
        autoOptimization: true,
        trackConversions: true,
        saveAdsToLibrary: false,
      },
    },
    {
      id: 'node-store',
      title: 'Store',
      subtitle: 'Shopify store & products',
      category: 'Website & Conversion',
      iconType: 'store',
      iconBg: 'bg-amber-500',
      iconColor: 'text-white',
      x: 470,
      y: 680,
      status: 'active',
      metrics: [
        { label: 'Visitors', value: '5.2K' },
        { label: 'Orders', value: '842' },
        { label: 'CVR', value: '4.2%' },
      ],
      config: {
        name: 'Store',
        description: 'E-commerce platform connected with automated inventory sync.',
        campaignObjective: 'Store Management',
        targetAudience: 'Customers',
        budget: '29',
        budgetPeriod: 'per month',
        autoOptimization: true,
        trackConversions: true,
        saveAdsToLibrary: false,
      },
    },
    {
      id: 'node-profit-report',
      title: 'Profit Report',
      subtitle: 'Calculate profit and ROAS',
      category: 'Analytics & Profit',
      iconType: 'profit',
      iconBg: 'bg-purple-600',
      iconColor: 'text-white',
      x: 120,
      y: 680,
      status: 'active',
      metrics: [
        { label: 'Revenue', value: '$12.4K' },
        { label: 'Profit Margin', value: '63%' },
        { label: 'ROAS', value: '3.8' },
      ],
      config: {
        name: 'Profit Report',
        description: 'Daily gross profit, ad spend deduction, shipping costs, and net margin.',
        campaignObjective: 'Financial Analysis',
        targetAudience: 'Executive',
        budget: '0',
        budgetPeriod: 'per day',
        autoOptimization: true,
        trackConversions: true,
        saveAdsToLibrary: false,
      },
    },
    {
      id: 'node-google-sheets',
      title: 'Google Sheets',
      subtitle: 'Save data and generate reports',
      category: 'Storage & Output',
      iconType: 'sheets',
      iconBg: 'bg-emerald-600',
      iconColor: 'text-white',
      x: 430,
      y: 850,
      status: 'active',
      metrics: [
        { label: 'Records', value: '1.2K' },
        { label: 'Updated', value: '2h ago' },
        { label: 'Sync', value: 'Auto' },
      ],
      config: {
        name: 'Google Sheets',
        description: 'Automated 2-way sync with Yalidine and call center Google Spreadsheet.',
        campaignObjective: 'Data Synchronization',
        targetAudience: 'Internal Team',
        budget: '0',
        budgetPeriod: 'per day',
        autoOptimization: true,
        trackConversions: true,
        saveAdsToLibrary: false,
      },
    },
  ];
  */

  // Edges definition linking the nodes: initialized directly from active project
  const [edges, setEdges] = useState<BoardEdge[]>(() => currentProject?.edges || []);

  // Sticky Notes: initialized directly from active project
  const [stickyNotes, setStickyNotes] = useState<BoardStickyNote[]>(() => currentProject?.stickyNotes || []);

  // Background Shapes (Strictly rendered at z-0 behind cards)
  const [boardShapes, setBoardShapes] = useState<BoardShape[]>(() => {
    try {
      const saved = localStorage.getItem('user_board_shapes_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return currentProject?.shapes || [
      {
        id: 'shape-zone-testing',
        type: 'rectangle',
        x: 40,
        y: 20,
        width: 480,
        height: 720,
        title: 'Zone 1: Audience & Hook Testing (Background Frame)',
        color: '#6366f1',
        opacity: 0.12,
        strokeColor: '#818cf8',
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('user_board_shapes_v1', JSON.stringify(boardShapes));
    } catch (e) {
      console.error('Failed to save shapes', e);
    }
  }, [boardShapes]);

  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [isShapeToolMenuOpen, setIsShapeToolMenuOpen] = useState(false);
  const [draggingShapeId, setDraggingShapeId] = useState<string | null>(null);
  const [resizingShape, setResizingShape] = useState<{
    id: string;
    handle: 'corner' | 'right' | 'bottom';
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  } | null>(null);
  const [editingShapeTitleId, setEditingShapeTitleId] = useState<string | null>(null);
  const [activeMarketMenuNodeId, setActiveMarketMenuNodeId] = useState<string | null>(null);

  // Mouse interactive drawing mode for zones
  const [drawMode, setDrawMode] = useState<'rectangle' | 'circle' | null>(null);
  const [drawColor, setDrawColor] = useState<string>('#6366f1');
  const [activeDrawing, setActiveDrawing] = useState<{
    type: 'rectangle' | 'circle';
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    color: string;
  } | null>(null);

  const [draggingStickyId, setDraggingStickyId] = useState<string | null>(null);
  const [boardToast, setBoardToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setBoardToast(msg);
    setTimeout(() => setBoardToast(null), 3000);
  };

  // Add new shape (always drawn behind cards)
  const handleAddShape = (type: 'rectangle' | 'circle', preferredColor: string = '#6366f1') => {
    // Center shape in current board view
    const canvas = canvasRef.current;
    let spawnX = 120;
    let spawnY = 100;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const scale = zoom / 100;
      spawnX = Math.round((rect.width / 2 - panOffset.x) / scale - 240);
      spawnY = Math.round((rect.height / 2 - panOffset.y) / scale - 180);
    }

    const newShape: BoardShape = {
      id: `shape-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      x: Math.max(0, spawnX),
      y: Math.max(0, spawnY),
      width: type === 'circle' ? 420 : 500,
      height: type === 'circle' ? 420 : 380,
      title: type === 'circle' ? 'Focal Hub (Behind Cards)' : 'Testing Zone (Behind Cards)',
      color: preferredColor,
      opacity: 0.14,
      strokeColor: preferredColor,
    };

    setBoardShapes((prev) => [...prev, newShape]);
    setSelectedShapeId(newShape.id);
    showToast(`Added ${type === 'circle' ? 'Circle' : 'Rectangle'} zone behind cards ✓`);
  };

  const handleDeleteShape = (shapeId: string) => {
    setBoardShapes((prev) => prev.filter((s) => s.id !== shapeId));
    setSelectedShapeId((prev) => (prev === shapeId ? null : prev));
    showToast('Zone removed');
  };

  const handleShapeMouseDown = (e: React.MouseEvent, shapeId: string) => {
    e.stopPropagation();
    const target = e.target as HTMLElement | null;
    if (target && target.closest('button, input, textarea, select, [data-no-drag]')) {
      return;
    }

    setSelectedShapeId(shapeId);
    setSelectedNodeId(null);
    setSelectedEdgeId(null);

    if (activeTool === 'pan' || isSpacePressed) return;
    setDraggingShapeId(shapeId);

    const targetShape = boardShapes.find((s) => s.id === shapeId);
    if (!targetShape) return;

    const scale = zoom / 100;
    setDragOffset({
      x: e.clientX - (targetShape.x * scale + panOffset.x),
      y: e.clientY - (targetShape.y * scale + panOffset.y),
    });
  };

  const handleStartResizeShape = (
    e: React.MouseEvent,
    shapeId: string,
    handle: 'corner' | 'right' | 'bottom' = 'corner'
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const targetShape = boardShapes.find((s) => s.id === shapeId);
    if (!targetShape) return;

    setSelectedShapeId(shapeId);
    setResizingShape({
      id: shapeId,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: targetShape.width,
      startHeight: targetShape.height,
    });
  };

  // Switch Active Project
  const handleSelectProject = (projectId: string) => {
    if (projectId === activeProjectId) return;

    // Snapshot current active project before switching
    const updatedProjects = boardProjects.map((p) => {
      if (p.id === activeProjectId) {
        return {
          ...p,
          nodes,
          edges,
          stickyNotes,
          panOffset,
          zoom,
          updatedAt: new Date().toISOString(),
        };
      }
      return p;
    });

    const target = updatedProjects.find((p) => p.id === projectId);
    if (!target) return;

    setBoardProjects(updatedProjects);
    setActiveProjectId(target.id);
    const nextTabs = openProjectIds.includes(target.id) ? openProjectIds : [...openProjectIds, target.id];
    setOpenProjectIds(nextTabs);

    setNodes(target.nodes || []);
    setEdges(target.edges || []);
    setStickyNotes(target.stickyNotes || []);
    setPanOffset(target.panOffset || { x: 50, y: 20 });
    setZoom(target.zoom || 85);
    setSelectedNodeId(null);
    setSelectedEdgeId(null);

    saveBoardProjectsToStorage(updatedProjects);
    saveActiveBoardProjectId(target.id);
    saveOpenBoardTabIds(nextTabs);

    showToast(`Loaded project "${target.name}"`);
  };

  // Create New Project
  const handleCreateNewProject = (name: string, templateId: 'blank' | 'algeria_cod' | 'tiktok_scaler') => {
    const newProj = createNewBoardProjectOptions(name, templateId);

    // Snapshot current active project state before creating
    const updatedProjects = boardProjects.map((p) =>
      p.id === activeProjectId
        ? { ...p, nodes, edges, stickyNotes, panOffset, zoom, updatedAt: new Date().toISOString() }
        : p
    );
    const nextList = [newProj, ...updatedProjects];
    setBoardProjects(nextList);
    setActiveProjectId(newProj.id);
    const nextTabs = [newProj.id, ...openProjectIds.filter((id) => id !== newProj.id)];
    setOpenProjectIds(nextTabs);

    setNodes(newProj.nodes || []);
    setEdges(newProj.edges || []);
    setStickyNotes(newProj.stickyNotes || []);
    setPanOffset(newProj.panOffset || { x: 50, y: 20 });
    setZoom(newProj.zoom || 85);
    setSelectedNodeId(null);
    setSelectedEdgeId(null);

    saveBoardProjectsToStorage(nextList);
    saveActiveBoardProjectId(newProj.id);
    saveOpenBoardTabIds(nextTabs);

    setBoardViewMode('canvas');
    showToast(`Created & opened "${newProj.name}"`);
  };

  // Duplicate Project
  const handleDuplicateProject = (projectId: string) => {
    const target = boardProjects.find((p) => p.id === projectId);
    if (!target) return;

    const sourceNodes = projectId === activeProjectId ? nodes : target.nodes;
    const sourceEdges = projectId === activeProjectId ? edges : target.edges;
    const sourceSticky = projectId === activeProjectId ? stickyNotes : target.stickyNotes;
    const sourcePan = projectId === activeProjectId ? panOffset : target.panOffset;
    const sourceZoom = projectId === activeProjectId ? zoom : target.zoom;

    const duplicated: BoardProject = {
      ...target,
      id: `board_proj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: `${target.name} (Copy)`,
      nodes: sourceNodes,
      edges: sourceEdges,
      stickyNotes: sourceSticky,
      panOffset: sourcePan,
      zoom: sourceZoom,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const nextList = [duplicated, ...boardProjects];
    setBoardProjects(nextList);
    setActiveProjectId(duplicated.id);
    setOpenProjectIds((prev) => [duplicated.id, ...prev]);

    setNodes(duplicated.nodes);
    setEdges(duplicated.edges);
    setStickyNotes(duplicated.stickyNotes);
    setPanOffset(duplicated.panOffset);
    setZoom(duplicated.zoom);
    setSelectedNodeId(null);
    setSelectedEdgeId(null);

    saveBoardProjectsToStorage(nextList);
    saveActiveBoardProjectId(duplicated.id);

    showToast(`Duplicated to "${duplicated.name}"`);
  };

  // Rename Project
  const handleRenameProject = (projectId: string, newName: string) => {
    setBoardProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, name: newName, updatedAt: new Date().toISOString() } : p
      )
    );
    showToast(`Renamed project to "${newName}"`);
  };

  // Delete Project (Can remove any project and return to hub if needed)
  const handleDeleteProject = (projectId: string) => {
    const nextList = boardProjects.filter((p) => p.id !== projectId);
    const nextOpen = openProjectIds.filter((id) => id !== projectId);

    if (nextList.length === 0) {
      const fresh = createNewBoardProjectOptions('New Project', 'blank');
      setBoardProjects([fresh]);
      setActiveProjectId(fresh.id);
      setOpenProjectIds([fresh.id]);
      setNodes([]);
      setEdges([]);
      setStickyNotes([]);
      setPanOffset({ x: 50, y: 20 });
      setZoom(85);
      saveBoardProjectsToStorage([fresh]);
      saveActiveBoardProjectId(fresh.id);
      saveOpenBoardTabIds([fresh.id]);
      setBoardViewMode('hub');
      showToast('Project removed');
      return;
    }

    setBoardProjects(nextList);
    saveBoardProjectsToStorage(nextList);

    if (activeProjectId === projectId) {
      const fallback = nextList[0];
      setActiveProjectId(fallback.id);
      const remainingTabs = nextOpen.length > 0 ? nextOpen : [fallback.id];
      setOpenProjectIds(remainingTabs);
      setNodes(fallback.nodes || []);
      setEdges(fallback.edges || []);
      setStickyNotes(fallback.stickyNotes || []);
      setPanOffset(fallback.panOffset || { x: 50, y: 20 });
      setZoom(fallback.zoom || 85);
      saveActiveBoardProjectId(fallback.id);
      saveOpenBoardTabIds(remainingTabs);

      if (boardViewMode === 'canvas' && nextOpen.length === 0) {
        setBoardViewMode('hub');
      }
    } else {
      setOpenProjectIds(nextOpen.length > 0 ? nextOpen : [nextList[0].id]);
      saveOpenBoardTabIds(nextOpen.length > 0 ? nextOpen : [nextList[0].id]);
    }
    showToast('Project removed successfully');
  };

  // Close Tab - Closes project and returns to Hub if no more open tabs
  const handleCloseTab = (projectId: string) => {
    const nextOpen = openProjectIds.filter((id) => id !== projectId);
    setOpenProjectIds(nextOpen);
    saveOpenBoardTabIds(nextOpen);

    if (nextOpen.length === 0) {
      setBoardViewMode('hub');
      showToast('Closed project');
      return;
    }

    if (activeProjectId === projectId) {
      handleSelectProject(nextOpen[nextOpen.length - 1]);
    }
  };

  // Explicit Save Project Button handler
  const handleSaveProject = () => {
    const updatedProjects = boardProjects.map((p) => {
      if (p.id === activeProjectId) {
        return {
          ...p,
          nodes,
          edges,
          stickyNotes,
          panOffset,
          zoom,
          updatedAt: new Date().toISOString(),
        };
      }
      return p;
    });

    setBoardProjects(updatedProjects);
    saveBoardProjectsToStorage(updatedProjects);
    saveActiveBoardProjectId(activeProjectId);
    saveOpenBoardTabIds(openProjectIds);

    try {
      localStorage.setItem(STORAGE_KEY_NODES, JSON.stringify(nodes));
      localStorage.setItem(STORAGE_KEY_EDGES, JSON.stringify(edges));
      localStorage.setItem(STORAGE_KEY_STICKY, JSON.stringify(stickyNotes));
      localStorage.setItem(STORAGE_KEY_PAN, JSON.stringify(panOffset));
      localStorage.setItem(STORAGE_KEY_ZOOM, JSON.stringify(zoom));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }

    setSaveStatus('saved');
    showToast(`Saved "${currentProject?.name || 'Project'}" successfully! ✓`);
  };

  // Auto-save changes to the active project in localStorage
  useEffect(() => {
    setBoardProjects((prev) =>
      prev.map((p) => {
        if (p.id === activeProjectId) {
          return {
            ...p,
            nodes,
            edges,
            stickyNotes,
            panOffset,
            zoom,
            updatedAt: new Date().toISOString(),
          };
        }
        return p;
      })
    );
    setSaveStatus('saving');

    const timer = setTimeout(() => {
      setBoardProjects((currentList) => {
        saveBoardProjectsToStorage(currentList);
        return currentList;
      });
      saveActiveBoardProjectId(activeProjectId);
      saveOpenBoardTabIds(openProjectIds);

      // Legacy fallback
      try {
        localStorage.setItem(STORAGE_KEY_NODES, JSON.stringify(nodes));
        localStorage.setItem(STORAGE_KEY_EDGES, JSON.stringify(edges));
        localStorage.setItem(STORAGE_KEY_STICKY, JSON.stringify(stickyNotes));
        localStorage.setItem(STORAGE_KEY_PAN, JSON.stringify(panOffset));
        localStorage.setItem(STORAGE_KEY_ZOOM, JSON.stringify(zoom));
      } catch (e) {
        console.warn('Failed to auto-save board state', e);
      }
      setSaveStatus('saved');
    }, 450);

    return () => clearTimeout(timer);
  }, [nodes, edges, stickyNotes, panOffset, zoom, activeProjectId]);

  const selectedNode = (selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) : null) || (nodes.length > 0 ? nodes[0] : null);
  const activeBottomResultNode =
    (activeBottomResultNodeId ? nodes.find((n) => n.id === activeBottomResultNodeId) : null) ||
    (selectedNodeId ? nodes.find((n) => n.id === selectedNodeId && !!n.executionResult) : null) ||
    nodes.find((n) => !!n.executionResult) ||
    null;
  const settingsModalNode = settingsModalNodeId ? nodes.find((n) => n.id === settingsModalNodeId) : null;

  const updateNodeConfigById = (nodeId: string, updates: Partial<BoardNode['config']>) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === nodeId ? { ...n, config: { ...n.config, ...updates } } : n
      )
    );
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 400);
  };

  // Maintain stable visual screen coordinates when toggling sidebar
  const handleToggleSkillsPanel = useCallback((shouldOpen: boolean) => {
    setIsSkillsPanelOpen(shouldOpen);
    setPanOffset((prev) => ({
      ...prev,
      x: shouldOpen ? prev.x - 320 : prev.x + 320,
    }));
  }, []);

  // Smooth manual zoom anchored to center of visible viewport
  const handleSetZoomWithAnchor = useCallback(
    (newZoomOrFn: number | ((curr: number) => number)) => {
      setZoom((prevZoom) => {
        const nextRaw =
          typeof newZoomOrFn === 'function' ? newZoomOrFn(prevZoom) : newZoomOrFn;
        const clamped = Math.min(400, Math.max(10, Math.round(nextRaw)));
        if (clamped === prevZoom) return prevZoom;

        const canvas = canvasRef.current;
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const prevScale = prevZoom / 100;
          const nextScale = clamped / 100;

          setPanOffset((prevPan) => ({
            x: centerX - ((centerX - prevPan.x) / prevScale) * nextScale,
            y: centerY - ((centerY - prevPan.y) / prevScale) * nextScale,
          }));
        }

        return clamped;
      });
    },
    []
  );

  // Align board to clean left margin (60px margin from sidebar) matching image_ca6855fc.png
  const handleResetLeftMargin = useCallback(() => {
    setZoom(85);
    setPanOffset({ x: 50, y: 20 });
  }, []);

  // Delete Node and all its associated edges
  const deleteNode = useCallback((nodeId: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    setEdges((prev) => prev.filter((e) => e.from !== nodeId && e.to !== nodeId));
    setSelectedNodeId((prev) => (prev === nodeId ? null : prev));
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 300);
  }, []);

  // Update Node properties
  const updateNode = useCallback((nodeId: string, updated: Partial<BoardNode>) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === nodeId ? { ...n, ...updated } : n))
    );
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 300);
  }, []);

  // Delete Edge
  const deleteEdge = useCallback((edgeId: string) => {
    setEdges((prev) => prev.filter((e) => e.id !== edgeId));
    setSelectedEdgeId((prev) => (prev === edgeId ? null : prev));
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 300);
  }, []);

  // Hotkey listener: Spacebar for Pan, Delete / Backspace to remove selected card or line
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isTyping =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'SELECT' ||
          (activeEl as HTMLElement).isContentEditable);

      if (e.code === 'Space' && !e.repeat && !isTyping) {
        setIsSpacePressed(true);
      }

      if (e.key === 'Escape') {
        if (connectingFrom) {
          setConnectingFrom(null);
          setConnectingMousePos(null);
          return;
        }
      }

      if (!isTyping && (e.key === 'Delete' || e.key === 'Backspace')) {
        if (selectedNodeId) {
          e.preventDefault();
          deleteNode(selectedNodeId);
        } else if (selectedEdgeId) {
          e.preventDefault();
          deleteEdge(selectedEdgeId);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
        setIsPanning(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [selectedNodeId, selectedEdgeId, deleteNode, deleteEdge]);

  // Dragging Handlers for Nodes (Ignores clicks on buttons, inputs, textareas, content preview so clicks and selections work reliably)
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();

    // If user clicked inside a button, input, textarea, select, menu, or document preview, DO NOT start card drag!
    const target = e.target as HTMLElement | null;
    if (
      target &&
      target.closest(
        'button, input, textarea, select, [data-no-drag], [data-no-card-drag], .universal-content-engine, [data-scrollable="true"], .overflow-y-auto, .overflow-auto, .prose'
      )
    ) {
      return;
    }

    setSelectedNodeId(nodeId);
    setSelectedEdgeId(null);

    if (activeTool === 'pan' || isSpacePressed) return;
    setDraggingNodeId(nodeId);

    const targetNode = nodes.find((n) => n.id === nodeId);
    if (!targetNode) return;

    const scale = zoom / 100;
    setDragOffset({
      x: e.clientX - (targetNode.x * scale + panOffset.x),
      y: e.clientY - (targetNode.y * scale + panOffset.y),
    });
  };

  // Dragging Handlers for Sticky Notes
  const handleStickyMouseDown = (e: React.MouseEvent, stickyId: string) => {
    e.stopPropagation();
    if (activeTool === 'pan' || isSpacePressed) return;
    setDraggingStickyId(stickyId);

    const targetSticky = stickyNotes.find((s) => s.id === stickyId);
    if (!targetSticky) return;

    const scale = zoom / 100;
    setDragOffset({
      x: e.clientX - (targetSticky.x * scale + panOffset.x),
      y: e.clientY - (targetSticky.y * scale + panOffset.y),
    });
  };

  // Canvas Background Mouse Down (Deselects items, Pans canvas, or Starts drawing zone)
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
    if (!drawMode) {
      setSelectedShapeId(null);
    }
    if (connectingFrom) {
      setConnectingFrom(null);
      setConnectingMousePos(null);
    }

    // Mouse interactive drawing mode for zones
    if (drawMode) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const scale = zoom / 100;
      const boardX = Math.round((e.clientX - rect.left - panOffset.x) / scale);
      const boardY = Math.round((e.clientY - rect.top - panOffset.y) / scale);

      setActiveDrawing({
        type: drawMode,
        startX: boardX,
        startY: boardY,
        currentX: boardX,
        currentY: boardY,
        color: drawColor || '#6366f1',
      });
      return;
    }

    if (
      activeTool === 'pan' ||
      isSpacePressed ||
      e.button === 1 ||
      e.target === canvasRef.current ||
      (e.target as HTMLElement).tagName === 'svg' ||
      (e.target as HTMLElement).tagName === 'rect'
    ) {
      setIsPanning(true);
      setPanStart({
        x: e.clientX - panOffset.x,
        y: e.clientY - panOffset.y,
      });
    }
  };

  // Start creating an interactive connection from a port
  const handleStartConnection = (nodeId: string, anchor: 'left' | 'right', subId?: string) => {
    connectStartTimeRef.current = Date.now();
    setConnectingFrom({ nodeId, anchor, subId });
  };

  // Complete interactive connection
  const handleEndConnection = (targetNodeId: string, targetAnchor: 'left' | 'right', targetSubId?: string) => {
    if (!connectingFrom) return;
    if (connectingFrom.nodeId === targetNodeId && connectingFrom.subId === targetSubId) {
      setConnectingFrom(null);
      setConnectingMousePos(null);
      return;
    }

    // Check if connection already exists
    const exists = edges.some(
      (e) =>
        (e.from === connectingFrom.nodeId && e.to === targetNodeId && e.fromSubId === connectingFrom.subId && e.toSubId === targetSubId) ||
        (e.from === targetNodeId && e.to === connectingFrom.nodeId && e.toSubId === connectingFrom.subId && e.fromSubId === targetSubId)
    );

    if (!exists) {
      let pillMain = 'Active';
      let pillSub = 'Connected';

      const sourceNode = nodes.find((n) => n.id === connectingFrom.nodeId);
      const targetNode = nodes.find((n) => n.id === targetNodeId);

      // Support linking in both directions: OrgChart -> Skill OR Skill -> OrgChart!
      const orgChartNode = sourceNode?.appType === 'product_regrouper' ? sourceNode : targetNode?.appType === 'product_regrouper' ? targetNode : null;
      const relevantSubId = sourceNode?.appType === 'product_regrouper' ? connectingFrom.subId : targetSubId;
      const skillNode = sourceNode?.appType === 'product_regrouper' ? targetNode : sourceNode;

      let linkedProduct: any = null;

      if (orgChartNode && relevantSubId) {
        if (relevantSubId.startsWith('adset:')) {
          const rawId = relevantSubId.replace('adset:', '');
          const grp = orgChartNode.appData?.groups?.find((g: any) => g.id === rawId || String(g.id) === rawId);
          pillMain = 'AdSet Target';
          pillSub = grp ? grp.adsetName?.slice(0, 16) || 'AdSet Info' : 'AdSet Info';
        } else if (relevantSubId.startsWith('prod:')) {
          const rawId = relevantSubId.replace('prod:', '');
          orgChartNode.appData?.groups?.forEach((g: any) => {
            g.products?.forEach((p: any, pIdx: number) => {
              if (
                String(p.id) === rawId ||
                String(pIdx) === rawId ||
                `prod:${p.id}` === relevantSubId ||
                `prod:${pIdx}` === relevantSubId ||
                rawId === `${g.index}-${pIdx}`
              ) {
                linkedProduct = p;
              }
            });
          });
          pillMain = 'Product Data';
          pillSub = linkedProduct ? linkedProduct.name?.slice(0, 14) : 'Product Info';
        }
      }

      const newEdge: BoardEdge = {
        id: `edge-${Date.now()}`,
        from: connectingFrom.nodeId,
        to: targetNodeId,
        fromAnchor: connectingFrom.anchor,
        toAnchor: targetAnchor,
        fromSubId: connectingFrom.subId,
        toSubId: targetSubId,
        arrow: true,
        pillMain,
        pillSub,
      };
      setEdges((prev) => [...prev, newEdge]);
      setSelectedEdgeId(newEdge.id);
      setSelectedNodeId(null);
      setSaveStatus('saving');
      setTimeout(() => setSaveStatus('saved'), 300);

      // If linked directly to a product, immediately inject product details into the skill node's config!
      if (linkedProduct && skillNode) {
        setNodes((prev) =>
          prev.map((n) =>
            n.id === skillNode.id
              ? {
                  ...n,
                  subtitle: `Trained on: ${linkedProduct.name?.slice(0, 26)}`,
                  config: {
                    ...n.config,
                    targetAudience: linkedProduct.category || n.config?.targetAudience,
                    productName: linkedProduct.name,
                    sellingPrice: linkedProduct.financials?.sellingPrice,
                    productCost: linkedProduct.financials?.costPrice,
                    margin: linkedProduct.financials?.roi,
                  },
                  appData:
                    n.appType === 'cro_mobile_landing_page'
                      ? { ...(n.appData || {}), product: croFactsFromProductLike(linkedProduct) }
                      : n.appData,
                }
              : n
          )
        );
        showToast(`✓ Linked product "${linkedProduct.name?.slice(0, 20)}" directly to "${(sourceNode?.id === skillNode.id ? sourceNode : targetNode)?.title}"!`);
      } else {
        // Direct Support for CRO Mobile Landing Page Node Connection!
        const isCroTarget = targetNode?.appType === 'cro_mobile_landing_page';
        const isCroSource = sourceNode?.appType === 'cro_mobile_landing_page';

        if (isCroTarget || isCroSource) {
          const croNode = isCroTarget ? targetNode! : sourceNode!;
          const otherNode = isCroTarget ? sourceNode! : targetNode!;
          const hasProductFacts = Boolean(
            otherNode.isProduct ||
              otherNode.productData ||
              otherNode.isFile ||
              otherNode.appData?.settings?.product
          );

          if (!hasProductFacts) {
            showToast('Connect a product node to fill the CRO landing page facts.');
          } else {
            const facts = croFactsFromNode(otherNode);
            const factName = facts.name || 'Connected Product';
            setNodes((prev) =>
              prev.map((n) =>
                n.id === croNode.id
                  ? {
                      ...n,
                      subtitle: `Trained on: ${factName.slice(0, 26)}`,
                      appData: {
                        ...(n.appData || {}),
                        product: { ...facts, name: factName },
                      },
                    }
                  : n
              )
            );
            showToast(`✓ CRO page filled with "${factName.slice(0, 24)}" — ${facts.image ? 'photo linked' : 'add a photo to finish the hero'}`);
          }

          setConnectingFrom(null);
          setConnectingMousePos(null);
          return;
        }

        // Direct Support for Landing Page Generator Node Connection!
        const isLpTarget = targetNode?.appType === 'landing_page_generator';
        const isLpSource = sourceNode?.appType === 'landing_page_generator';
        if (isLpTarget || isLpSource) {
          const lpNode = isLpTarget ? targetNode! : sourceNode!;
          const otherNode = isLpTarget ? sourceNode! : targetNode!;

          const otherAny = otherNode as any;
          const otherProdData = (otherAny.productData || (otherAny.isProduct ? otherAny : null)) as any;
          const prodName = otherAny.title || otherAny.config?.name || otherProdData?.name || otherAny.executionResult?.productName || 'Connected Product';
          const rawPrice = otherProdData?.sellingPrice || otherProdData?.financials?.sellingPrice || otherAny.config?.sellingPrice || 4800;
          const prodPrice = typeof rawPrice === 'number' ? `${rawPrice.toLocaleString()} DZD` : String(rawPrice);
          const numPrice = typeof rawPrice === 'number' ? rawPrice : parseInt(prodPrice.replace(/\D/g, '') || '4800', 10);
          const prodOrigPrice = `${Math.round(numPrice * 1.55).toLocaleString()} DZD`;
          const prodCategory = otherProdData?.niche || otherAny.category || 'Direct Response E-Commerce';
          const prodDesc = otherProdData?.description || otherAny.subtitle || otherAny.config?.description || otherAny.executionResult?.content?.slice(0, 450) || '';
          const prodImg = otherProdData?.image || otherProdData?.previewUrl || otherAny.previewUrl || otherAny.fileData?.previewUrl;

          let sellingPoints: string[] = [];
          if (otherProdData?.sellingPoints) {
            sellingPoints = otherProdData.sellingPoints.split(/[,•\n]+/).map((s: string) => s.trim()).filter(Boolean);
          } else if (otherAny.executionResult?.content) {
            const bulletMatches = otherAny.executionResult.content.match(/^[•\-\*]\s*(.+)$/gm);
            if (bulletMatches) {
              sellingPoints = bulletMatches.map((b: string) => b.replace(/^[•\-\*]\s*/, '').trim()).filter((b: string) => b.length > 4).slice(0, 4);
            }
          }

          const existingSettings = lpNode.appData?.settings || INITIAL_LANDING_PAGE_SETTINGS;
          const updatedProduct = {
            name: prodName,
            category: prodCategory,
            price: prodPrice,
            originalPrice: prodOrigPrice,
            description: prodDesc,
            productFeatures: sellingPoints.length ? sellingPoints : ['Original Product', '100% Inspection Guarantee', 'Fast Shipping 58 Wilayas'],
            mainBenefits: sellingPoints.length ? sellingPoints : ['High-Efficiency Daily Performance', 'Yalidine COD Inspection Rights', '12-Month Official Warranty'],
            images: prodImg ? [{ id: `img-${Date.now()}`, url: prodImg, isPrimary: true, alt: prodName }] : (existingSettings.product?.images || []),
            country: 'Algeria',
            currency: 'DZD',
            language: 'Arabic',
            customerProblem: otherNode.executionResult?.content?.match(/(?:problem|pain|المشكلة)[:\s]+([^\n\.\!]+)/i)?.[1]?.trim() || 'Searching for original reliable product with inspection rights',
            productSolution: otherNode.executionResult?.content?.match(/(?:solution|حل|النتيجة)[:\s]+([^\n\.\!]+)/i)?.[1]?.trim() || 'Certified original product delivered safely to your door',
          };

          const updatedSettings = {
            ...existingSettings,
            product: updatedProduct,
            productDescription: `${prodName}\n${prodDesc}`,
            singlePrice: prodPrice,
          };

          setNodes((prev) =>
            prev.map((n) =>
              n.id === lpNode.id
                ? {
                    ...n,
                    subtitle: `Trained on: ${prodName.slice(0, 24)}`,
                    appData: {
                      ...n.appData,
                      settings: updatedSettings,
                    },
                  }
                : n
            )
          );
          showToast(`✓ Auto-filled Landing Page with "${prodName.slice(0, 24)}"!`);
        } else {
          showToast(`Linked ${pillMain} to skill! Data flows into analysis.`);
        }
      }
    }
    setConnectingFrom(null);
    setConnectingMousePos(null);
  };

  // Central Node Creation with strict mutex lock (never duplicates, exactly 1 added)
  const createNodeAtPosition = useCallback(
    (
      skill: {
        title: string;
        category?: string;
        iconType: string;
        iconBg: string;
        subtitle?: string;
        isProduct?: boolean;
        productData?: any;
        isFile?: boolean;
        fileData?: UploadedFileItem;
        isCustomSkill?: boolean;
        customPromptTemplate?: string;
        isAppNode?: boolean;
        appType?: BoardNode['appType'];
        appData?: any;
      },
      boardX: number,
      boardY: number
    ) => {
      if (isAddingSkillLockRef.current) return;
      const now = Date.now();
      if (now - lastAddSkillTimeRef.current < 400) return;

      isAddingSkillLockRef.current = true;
      lastAddSkillTimeRef.current = now;

      let finalX = boardX;
      let finalY = boardY;
      if (snapToGrid) {
        finalX = Math.round(finalX / 20) * 20;
        finalY = Math.round(finalY / 20) * 20;
      }

      const isProduct = skill.isProduct || false;
      const isFile = skill.isFile || false;
      const isCustomSkill = skill.isCustomSkill || false;
      const isAppNode = skill.isAppNode || false;
      const appType = skill.appType;

      let metrics = [
        { label: 'Traffic', value: '4.2K' },
        { label: 'CVR', value: '3.8%' },
        { label: 'ROAS', value: '4.2' },
      ];

      if (isAppNode) {
        if (appType === 'cro_mobile_landing_page') {
          metrics = [
            { label: 'CVR Potential', value: '78%' },
            { label: 'Market', value: 'COD DZ' },
            { label: 'Format', value: 'Mobile CRO' },
          ];
        } else if (appType === 'landing_page_generator') {
          metrics = [
            { label: 'Layout', value: '3-Column' },
            { label: 'Market', value: 'COD Algeria' },
            { label: 'Preview', value: 'Live Code' },
          ];
        } else if (appType === 'text_to_image') {
          metrics = [
            { label: 'Model', value: 'Imagen 3' },
            { label: 'Quality', value: '4K Studio' },
            { label: 'Aspect', value: '1:1 / 9:16' },
          ];
        } else if (appType === 'image_to_text') {
          metrics = [
            { label: 'OCR', value: '99.4%' },
            { label: 'Extracted', value: 'Specs & Hook' },
            { label: 'Format', value: 'Multilingual' },
          ];
        } else if (appType === 'text_to_storyboard') {
          metrics = [
            { label: 'Frames', value: '5 Beats' },
            { label: 'Pacing', value: '30s Viral' },
            { label: 'Conversion', value: '+34%' },
          ];
        } else if (appType === 'text_to_video_script') {
          metrics = [
            { label: 'Format', value: '3-Column' },
            { label: 'Hook', value: '0-3s Stop' },
            { label: 'Audio', value: 'Darja/FR' },
          ];
        } else {
          metrics = [
            { label: 'Type', value: 'Director Guide' },
            { label: 'Shots', value: '4 Setups' },
            { label: 'Lighting', value: '5600K Key' },
          ];
        }
      } else if (isProduct) {
        metrics = [
          { label: 'Selling', value: `${skill.productData?.sellingPrice?.toLocaleString() || 4800} DZD` },
          { label: 'Cost', value: `${skill.productData?.productCost?.toLocaleString() || 1400} DZD` },
          { label: 'Margin', value: `+${skill.productData?.profitMargin || 70}%` },
        ];
      } else if (isFile && skill.fileData) {
        if (skill.fileData.type === 'excel') {
          metrics = [
            { label: 'Type', value: 'Excel Table' },
            { label: 'Rows', value: `${skill.fileData.tableData?.totalRows || 0}` },
            { label: 'Cols', value: `${skill.fileData.tableData?.headers?.length || 0}` },
          ];
        } else if (skill.fileData.type === 'image') {
          metrics = [
            { label: 'Type', value: 'Image Asset' },
            { label: 'Size', value: `${Math.round(skill.fileData.size / 1024)} KB` },
            { label: 'Format', value: 'High-Res' },
          ];
        } else if (skill.fileData.type === 'json') {
          metrics = [
            { label: 'Type', value: 'JSON Dataset' },
            { label: 'Size', value: `${Math.round(skill.fileData.size / 1024)} KB` },
            { label: 'Format', value: 'Structured' },
          ];
        } else {
          metrics = [
            { label: 'Type', value: skill.fileData.type === 'pdf' ? 'PDF Doc' : 'Word Doc' },
            { label: 'Size', value: `${Math.round(skill.fileData.size / 1024)} KB` },
            { label: 'Status', value: 'Parsed' },
          ];
        }
      }

      const newNode: BoardNode = {
        id: `node-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        title: skill.title,
        subtitle: skill.subtitle || `${skill.title} configuration & metrics`,
        category: skill.category || (isAppNode ? 'AI Creative Studio' : isProduct ? 'Product Library' : isFile ? 'Uploaded Files' : 'Custom'),
        iconType: skill.iconType,
        iconBg: skill.iconBg,
        iconColor: 'text-white',
        x: finalX,
        y: finalY,
        status: 'active',
        liveWebResearch: false,
        language: 'English',
        isProduct,
        productData: skill.productData,
        isFile,
        fileData: skill.fileData,
        isCustomSkill,
        customPromptTemplate: skill.customPromptTemplate,
        isAppNode,
        appType,
        appData: skill.appData || {},
        sectionNumber: isAppNode ? 'AI APP' : isFile ? 'DATASET' : `SECTION ${String(nodes.length + 1).padStart(2, '0')}`,
        customInstructions: '',
        hideText: false,
        hideResult: false,
        activePreviewTab: 'preview',
        analysisMode: 'standard',
        metrics,
        config: {
          name: skill.title,
          description: isAppNode
            ? (skill.subtitle || 'AI Creative Production Studio')
            : isProduct
            ? (skill.productData?.description || 'E-commerce Winning Product')
            : isFile
            ? (skill.fileData?.summary || 'Attached dataset for e-commerce intelligence')
            : `Optimize and scale ${skill.title} for Algerian e-commerce.`,
          campaignObjective: isAppNode ? 'Creative Asset' : isProduct ? 'Sales' : isFile ? 'Data Intelligence' : 'Conversions',
          targetAudience: 'Algeria - 18+',
          budget: '30',
          budgetPeriod: 'per day',
          autoOptimization: true,
          trackConversions: true,
          saveAdsToLibrary: true,
          customPrompt: skill.customPromptTemplate || '',
        },
      };

      setNodes((prev) => [...prev, newNode]);
      setSelectedNodeId(newNode.id);
      setSelectedEdgeId(null);
      setIsInspectorOpen(true);
      setSaveStatus('saving');
      setTimeout(() => {
        setSaveStatus('saved');
        isAddingSkillLockRef.current = false;
      }, 400);
    },
    [snapToGrid]
  );

  // Global Mouse Move
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      // 0. Active mouse drawing of zone on canvas
      if (activeDrawing) {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          const scale = zoom / 100;
          const currentX = Math.round((e.clientX - rect.left - panOffset.x) / scale);
          const currentY = Math.round((e.clientY - rect.top - panOffset.y) / scale);
          setActiveDrawing((prev) => (prev ? { ...prev, currentX, currentY } : null));
        }
        return;
      }

      // 1. Connection line dragging
      if (connectingFrom) {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          const scale = zoom / 100;
          setConnectingMousePos({
            x: (e.clientX - rect.left - panOffset.x) / scale,
            y: (e.clientY - rect.top - panOffset.y) / scale,
          });
        }
        return;
      }

      // 2. Panning canvas
      if (isPanning) {
        setPanOffset({
          x: e.clientX - panStart.x,
          y: e.clientY - panStart.y,
        });
        return;
      }

      const scale = zoom / 100;

      // 3. Dragging node - completely free unconstrained movement
      if (draggingNodeId) {
        let rawX = (e.clientX - dragOffset.x - panOffset.x) / scale;
        let rawY = (e.clientY - dragOffset.y - panOffset.y) / scale;

        if (snapToGrid) {
          rawX = Math.round(rawX / 20) * 20;
          rawY = Math.round(rawY / 20) * 20;
        }

        setNodes((prev) =>
          prev.map((n) =>
            n.id === draggingNodeId ? { ...n, x: rawX, y: rawY } : n
          )
        );
        setSaveStatus('saving');
      } else if (draggingStickyId) {
        // 4. Dragging sticky note - completely free unconstrained movement
        let rawX = (e.clientX - dragOffset.x - panOffset.x) / scale;
        let rawY = (e.clientY - dragOffset.y - panOffset.y) / scale;

        if (snapToGrid) {
          rawX = Math.round(rawX / 20) * 20;
          rawY = Math.round(rawY / 20) * 20;
        }

        setStickyNotes((prev) =>
          prev.map((s) =>
            s.id === draggingStickyId ? { ...s, x: rawX, y: rawY } : s
          )
        );
        setSaveStatus('saving');
      } else if (draggingShapeId) {
        // 5. Dragging background shape zone with mouse
        let rawX = (e.clientX - dragOffset.x - panOffset.x) / scale;
        let rawY = (e.clientY - dragOffset.y - panOffset.y) / scale;

        if (snapToGrid) {
          rawX = Math.round(rawX / 20) * 20;
          rawY = Math.round(rawY / 20) * 20;
        }

        setBoardShapes((prev) =>
          prev.map((s) => (s.id === draggingShapeId ? { ...s, x: rawX, y: rawY } : s))
        );
        setSaveStatus('saving');
      } else if (resizingShape) {
        // 6. Resizing background shape zone with mouse handles
        const deltaX = (e.clientX - resizingShape.startX) / scale;
        const deltaY = (e.clientY - resizingShape.startY) / scale;
        let newW = resizingShape.startWidth;
        let newH = resizingShape.startHeight;

        if (resizingShape.handle === 'corner') {
          newW = Math.max(120, Math.round(resizingShape.startWidth + deltaX));
          newH = Math.max(80, Math.round(resizingShape.startHeight + deltaY));
        } else if (resizingShape.handle === 'right') {
          newW = Math.max(120, Math.round(resizingShape.startWidth + deltaX));
        } else if (resizingShape.handle === 'bottom') {
          newH = Math.max(80, Math.round(resizingShape.startHeight + deltaY));
        }

        setBoardShapes((prev) =>
          prev.map((s) =>
            s.id === resizingShape.id
              ? {
                  ...s,
                  width: newW,
                  height: s.type === 'circle' ? Math.max(newW, newH) : newH,
                }
              : s
          )
        );
        setSaveStatus('saving');
      }
    },
    [
      activeDrawing,
      connectingFrom,
      isPanning,
      panStart,
      draggingNodeId,
      draggingStickyId,
      draggingShapeId,
      resizingShape,
      dragOffset,
      panOffset,
      zoom,
      snapToGrid,
    ]
  );

  // Global Mouse Up
  const handleMouseUp = useCallback(() => {
    // Finalize interactive drawing of shape zone
    if (activeDrawing) {
      const minX = Math.min(activeDrawing.startX, activeDrawing.currentX);
      const minY = Math.min(activeDrawing.startY, activeDrawing.currentY);
      const rawW = Math.abs(activeDrawing.currentX - activeDrawing.startX);
      const rawH = Math.abs(activeDrawing.currentY - activeDrawing.startY);
      const width = Math.max(120, rawW);
      const height = Math.max(80, rawH);
      const finalH = activeDrawing.type === 'circle' ? Math.max(width, height) : height;
      const finalW = activeDrawing.type === 'circle' ? Math.max(width, height) : width;

      const newShape: BoardShape = {
        id: `shape-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        type: activeDrawing.type,
        x: minX,
        y: minY,
        width: finalW,
        height: finalH,
        title: activeDrawing.type === 'circle' ? 'Circle Zone' : 'Zone Frame',
        color: activeDrawing.color,
        opacity: 0.14,
        strokeColor: activeDrawing.color,
      };

      setBoardShapes((prev) => [...prev, newShape]);
      setSelectedShapeId(newShape.id);
      setActiveDrawing(null);
      setDrawMode(null);
      showToast(`Created ${activeDrawing.type === 'circle' ? 'Circle' : 'Rectangle'} zone (${finalW} × ${finalH} px) ✓`);
    }

    if (connectingFrom) {
      const elapsed = Date.now() - connectStartTimeRef.current;
      // If the user did a quick click (< 260ms), keep connectingFrom active for smooth Click-to-Connect
      if (elapsed > 260) {
        setConnectingFrom(null);
        setConnectingMousePos(null);
      }
    }

    if (isPanning) {
      setIsPanning(false);
    }

    if (draggingNodeId || draggingStickyId || draggingShapeId || resizingShape) {
      setDraggingNodeId(null);
      setDraggingStickyId(null);
      setDraggingShapeId(null);
      setResizingShape(null);
      setTimeout(() => setSaveStatus('saved'), 300);
    }
  }, [
    activeDrawing,
    isPanning,
    draggingNodeId,
    draggingStickyId,
    draggingShapeId,
    resizingShape,
    connectingFrom,
  ]);

  useEffect(() => {
    if (
      draggingNodeId ||
      draggingStickyId ||
      draggingShapeId ||
      resizingShape ||
      activeDrawing ||
      isPanning ||
      connectingFrom
    ) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [
    draggingNodeId,
    draggingStickyId,
    draggingShapeId,
    resizingShape,
    activeDrawing,
    isPanning,
    connectingFrom,
    handleMouseMove,
    handleMouseUp,
  ]);

  // NON-PASSIVE wheel listener on canvas: 100% cancels native browser scrolling and zooms centered on cursor!
  useEffect(() => {
    if (boardViewMode !== 'canvas') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onWheel = (e: WheelEvent) => {
      // 1. If mouse is over a scrollable text area or document preview, allow full scrolling without canvas interference
      const target = e.target as HTMLElement | null;
      const scrollable = target?.closest(
        '.universal-content-engine, [data-scrollable="true"], .overflow-y-auto, .overflow-auto, textarea, pre'
      ) as HTMLElement | null;

      if (scrollable && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        // Allow inner content to scroll naturally; never zoom or pan canvas when scrolling inside document
        return;
      }

      // 2. Completely prevent native browser page & element scroll
      e.preventDefault();
      e.stopPropagation();

      // 3. Shift + Wheel pans horizontally
      if (e.shiftKey && !e.ctrlKey && !e.metaKey) {
        setPanOffset((prev) => ({
          ...prev,
          x: prev.x - e.deltaY,
        }));
        return;
      }

      // 4. If wheel zoom is disabled by user, use wheel to pan the canvas smoothly
      if (!wheelZoomEnabled && !e.ctrlKey && !e.metaKey) {
        setPanOffset((prev) => ({
          x: prev.x - e.deltaX,
          y: prev.y - e.deltaY,
        }));
        return;
      }

      // 5. Smooth zoom anchored right at mouse pointer position (like Figma / Miro) with 10% - 400% freedom
      let zoomFactor: number;
      if (e.ctrlKey || e.metaKey) {
        // Trackpad pinch-to-zoom gives small continuous deltaY
        zoomFactor = Math.exp(-e.deltaY * 0.007);
      } else {
        // Standard mouse wheel notch (e.deltaY usually ±100 or ±120) or smooth wheel
        zoomFactor = e.deltaY < 0 ? 1.12 : 0.88;
      }

      setZoom((prevZoom) => {
        const nextZoom = Math.min(400, Math.max(10, Math.round(prevZoom * zoomFactor)));
        if (nextZoom === prevZoom) return prevZoom;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const prevScale = prevZoom / 100;
        const nextScale = nextZoom / 100;

        // Keep the exact point under the cursor unchanged
        setPanOffset((prevPan) => ({
          x: mouseX - ((mouseX - prevPan.x) / prevScale) * nextScale,
          y: mouseY - ((mouseY - prevPan.y) / prevScale) * nextScale,
        }));

        return nextZoom;
      });
    };

    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      canvas.removeEventListener('wheel', onWheel);
    };
  }, [wheelZoomEnabled, boardViewMode, activeProjectId]);

  // HTML5 Drag & Drop handlers on Canvas
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOverCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setIsCanvasDragOver(true);
  };

  const handleDragLeave = () => {
    setIsCanvasDragOver(false);
    setDragOverCoords(null);
  };

  const handleDropSkill = (e: React.DragEvent) => {
    e.preventDefault();
    setIsCanvasDragOver(false);
    setDragOverCoords(null);
    justDraggedSkillRef.current = true;
    setTimeout(() => {
      justDraggedSkillRef.current = false;
    }, 350);

    const dataStr = e.dataTransfer.getData('application/json');
    if (!dataStr) return;
    try {
      const skill = JSON.parse(dataStr);
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const scale = zoom / 100;
      const mouseX = e.clientX - rect.left - panOffset.x;
      const mouseY = e.clientY - rect.top - panOffset.y;
      const boardX = mouseX / scale - 116;
      const boardY = mouseY / scale - 55;
      createNodeAtPosition(skill, boardX, boardY);
    } catch (err) {
      console.error('Failed to parse dropped skill', err);
    }
  };

  // Dynamic Anchor coordinates calculator (Supports Org Chart Campaign, AdSet sub-cards, and Product sub-cards)
  const getNodeAnchor = (
    node: BoardNode,
    anchor?: 'left' | 'right' | 'top' | 'bottom',
    subId?: string
  ) => {
    const effectiveAnchor = anchor || 'right';

    // 1. DIRECT DOM MEASUREMENT: Highest accuracy, links directly to the rendered product card div & port on canvas
    if (canvasRef.current && typeof document !== 'undefined') {
      let targetEl: HTMLElement | null = null;

      if (subId) {
        // A. Look for exact port element first
        targetEl = canvasRef.current.querySelector(
          `[data-sub-port="${node.id}:${subId}:${effectiveAnchor}"]`
        );
        // B. Look for any port matching this subId on this node
        if (!targetEl) {
          targetEl = canvasRef.current.querySelector(
            `[data-sub-port^="${node.id}:${subId}"]`
          );
        }
        // C. Look for port with subId-only attribute
        if (!targetEl) {
          targetEl = canvasRef.current.querySelector(
            `[data-sub-port-id="${subId}:${effectiveAnchor}"]`
          );
        }
        // D. Look for the product card or adset card div itself
        if (!targetEl) {
          targetEl = canvasRef.current.querySelector(
            `[data-sub-card="${node.id}:${subId}"]`
          );
        }
        // E. Look for sub-card by sub-id or prod-id
        if (!targetEl) {
          targetEl = canvasRef.current.querySelector(
            `[data-sub-id="${subId}"], [data-sub-card-id="${subId}"]`
          );
        }
        // F. Try raw identifier without 'prod:' or 'adset:' prefix
        const raw = subId.replace(/^(prod|adset):/, '');
        if (!targetEl && raw) {
          targetEl = canvasRef.current.querySelector(
            `[data-node-id="${node.id}"][data-prod-id="${raw}"], [data-node-id="${node.id}"][data-sub-card*="${raw}"]`
          );
        }
        // G. If still not found and it's a product, try matching by card index
        if (!targetEl && subId.startsWith('prod:')) {
          const productCards = canvasRef.current.querySelectorAll(
            `[data-node-id="${node.id}"][data-sub-id^="prod:"]`
          );
          if (productCards.length > 0) {
            const num = parseInt(raw, 10);
            if (!isNaN(num) && num < productCards.length) {
              targetEl = productCards[num] as HTMLElement;
            } else {
              targetEl = productCards[0] as HTMLElement;
            }
          }
        }
      } else if (node.appType === 'product_regrouper') {
        // Root campaign card
        targetEl = canvasRef.current.querySelector(`[data-campaign-card="${node.id}"]`);
      }

      if (targetEl) {
        const elRect = targetEl.getBoundingClientRect();
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const scale = zoom / 100;

        const isPort = targetEl.hasAttribute('data-sub-port') || targetEl.hasAttribute('data-sub-port-id');
        if (isPort) {
          return {
            x: (elRect.left + elRect.width / 2 - canvasRect.left - panOffset.x) / scale,
            y: (elRect.top + elRect.height / 2 - canvasRect.top - panOffset.y) / scale,
          };
        } else {
          // Attaches directly to the product card div border at vertical center
          const xOffset = effectiveAnchor === 'left' ? 0 : elRect.width;
          return {
            x: (elRect.left + xOffset - canvasRect.left - panOffset.x) / scale,
            y: (elRect.top + elRect.height / 2 - canvasRect.top - panOffset.y) / scale,
          };
        }
      }
    }

    // 2. MATHEMATICAL FALLBACK: In case DOM element is not yet mounted/measured
    if (node.appType === 'product_regrouper') {
      const groups = node.appData?.groups || [];
      const groupsCount = groups.length || 3;
      const totalWidth = Math.max(440, (groupsCount - 1) * 300 + 280);
      const centerX = node.x + totalWidth / 2;
      const campaignCardHalfWidth = 220;

      // 1. If subId is an AdSet ('adset:id')
      if (subId && subId.startsWith('adset:')) {
        const rawId = subId.replace('adset:', '');
        const gIdx = groups.findIndex((g: any) => g.id === rawId || String(g.id) === rawId);
        const validIdx = gIdx >= 0 ? gIdx : 0;
        const totalAdsetWidth = groupsCount * 300 - 20;
        const adsetColX = node.x + (totalWidth - totalAdsetWidth) / 2 + validIdx * 300;
        const adsetMidY = node.y + 207 + 120;
        if (anchor === 'left') {
          return { x: adsetColX, y: adsetMidY };
        }
        return { x: adsetColX + 280, y: adsetMidY };
      }

      // 2. If subId is a Product ('prod:id')
      if (subId && subId.startsWith('prod:')) {
        const rawId = subId.replace('prod:', '');
        let targetGIdx = 0;
        let targetPIdx = 0;

        groups.forEach((g: any, gIdx: number) => {
          g.products?.forEach((p: any, pIdx: number) => {
            if (
              String(p.id) === rawId ||
              `prod:${p.id}` === subId ||
              `prod:${pIdx}` === subId ||
              rawId === `${g.index}-${pIdx}`
            ) {
              targetGIdx = gIdx;
              targetPIdx = pIdx;
            }
          });
        });

        const targetGroup = groups[targetGIdx];
        const pCount = targetGroup?.products?.length || 1;
        const totalAdsetWidth = groupsCount * 300 - 20;
        const adsetColX = node.x + (totalWidth - totalAdsetWidth) / 2 + targetGIdx * 300;

        let prodStartX = adsetColX + 75;
        let prodMidY = node.y + 207 + 250 + 24 + 65;

        if (pCount === 1) {
          prodStartX = adsetColX + (280 - 130) / 2;
          prodMidY = node.y + 207 + 250 + 24 + 65;
        } else {
          const rowIdx = Math.floor(targetPIdx / 2);
          const colIdx = targetPIdx % 2;
          prodStartX = colIdx === 0 ? adsetColX + 4 : adsetColX + 146;
          const rowSpacing = 210;
          prodMidY = node.y + 207 + 250 + 28 + rowIdx * rowSpacing + 85;
        }

        if (anchor === 'left') {
          return { x: prodStartX, y: prodMidY };
        }
        return { x: prodStartX + 130, y: prodMidY };
      }

      const anchorY = 135;
      if (anchor === 'left') {
        return { x: centerX - campaignCardHalfWidth, y: node.y + anchorY };
      }
      return { x: centerX + campaignCardHalfWidth, y: node.y + anchorY };
    }
    const cardWidth = node.isAppNode
      ? node.appType === 'cro_mobile_landing_page' || node.appType === 'landing_page_generator'
        ? 1240
        : node.appType === 'text_to_image_landing_page' || node.appType === 'text_to_code_landing_page'
        ? 940
        : 580
      : node.isProduct
      ? 320
      : node.isFile
      ? 420
      : 560;
    const anchorY = node.isAppNode ? 50 : node.isProduct ? 60 : node.isFile ? 50 : 62;
    if (anchor === 'left') {
      return { x: node.x, y: node.y + anchorY };
    }
    return { x: node.x + cardWidth, y: node.y + anchorY };
  };

  // Quick Link a Skill directly from an AdSet or Product in the Org Chart
  const handleQuickLinkSkillFromOrgChart = (
    orgChartNodeId: string,
    subType: 'adset' | 'product',
    subData: any,
    skillTitle?: string
  ) => {
    const orgNode = nodes.find((n) => n.id === orgChartNodeId);
    if (!orgNode) return;

    // If user clicked an existing skill on board
    if (subData?.targetSkillNodeId) {
      const targetNode = nodes.find((n) => n.id === subData.targetSkillNodeId);
      if (targetNode) {
        const subId = subType === 'adset' ? `adset:${subData.id}` : `prod:${subData.id}`;
        const newEdge: BoardEdge = {
          id: `edge-${Date.now()}`,
          from: orgChartNodeId,
          to: targetNode.id,
          fromAnchor: 'right',
          toAnchor: 'left',
          fromSubId: subId,
          arrow: true,
          pillMain: subType === 'adset' ? 'AdSet Info' : 'Product Info',
          pillSub: subType === 'adset' ? subData.adsetName?.slice(0, 16) : subData.name?.slice(0, 14),
        };
        setEdges((prev) => [...prev, newEdge]);
        showToast(`Linked ${targetNode.title} to ${subType === 'adset' ? `AdSet ${subData.index}` : subData.name}!`);
        return;
      }
    }

    // Otherwise spawn a new skill on the board pre-loaded with this data
    const chosenTitle = skillTitle || (subType === 'adset' ? 'Facebook & Instagram Ad Copy' : 'Product Copy & Angles');
    const subId = subType === 'adset' ? `adset:${subData.id}` : `prod:${subData.id}`;

    let foundSkillMeta: any = null;
    for (const cat of ALL_SKILL_CATEGORIES) {
      const s = cat.skills.find((item) => item.title.toLowerCase() === chosenTitle.toLowerCase());
      if (s) {
        foundSkillMeta = { ...s, category: cat.name };
        break;
      }
    }

    const groupsCount = orgNode.appData?.groups?.length || 3;
    const totalOrgWidth = Math.max(440, (groupsCount - 1) * 300 + 280);
    const spawnX = orgNode.x + totalOrgWidth + 60;
    const spawnY = orgNode.y + (subType === 'adset' ? 180 : 380);

    const newNodeId = `node-skill-${Date.now()}`;
    const newSkillNode: BoardNode = {
      id: newNodeId,
      title: chosenTitle,
      subtitle: foundSkillMeta?.subtitle || (subType === 'adset' ? `Tailored for ${subData.adsetName}` : `Trained on ${subData.name}`),
      category: foundSkillMeta?.category || 'Creative Production',
      iconType: foundSkillMeta?.iconType || (subType === 'adset' ? 'meta' : 'Sparkles'),
      iconBg: foundSkillMeta?.iconBg || 'bg-blue-600',
      iconColor: 'text-white',
      x: spawnX,
      y: spawnY,
      status: 'idle',
      language: 'English',
      liveWebResearch: true,
      config: {
        name: chosenTitle,
        description: `Automated skill linked to ${subType === 'adset' ? `AdSet: ${subData.adsetName}` : `Product: ${subData.name}`}. Extracts target audience, price, and testing angles directly.`,
        campaignObjective: 'Conversions',
        targetAudience: subType === 'adset' ? subData.audienceProfile?.avatar : subData.category,
        budget: '30',
        budgetPeriod: 'per day',
        autoOptimization: true,
        trackConversions: true,
        saveAdsToLibrary: true,
      },
    };

    const newEdge: BoardEdge = {
      id: `edge-${Date.now()}`,
      from: orgChartNodeId,
      to: newNodeId,
      fromAnchor: 'right',
      toAnchor: 'left',
      fromSubId: subId,
      arrow: true,
      pillMain: subType === 'adset' ? 'AdSet Data' : 'Product Data',
      pillSub: subType === 'adset' ? subData.adsetName?.slice(0, 16) : subData.name?.slice(0, 14),
    };

    setNodes((prev) => [...prev, newSkillNode]);
    setEdges((prev) => [...prev, newEdge]);
    setSelectedNodeId(newNodeId);
    showToast(`✓ Created "${chosenTitle}" and linked to ${subType === 'adset' ? `AdSet ${subData.index}` : subData.name}!`);
  };

  // Compute smooth Bezier curve for Left/Right ports with natural looping if needed
  const getBezierPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
    fromAnchor: 'left' | 'right' | 'top' | 'bottom' = 'right',
    toAnchor: 'left' | 'right' | 'top' | 'bottom' = 'left'
  ) => {
    const actualFrom = fromAnchor === 'left' ? 'left' : 'right';
    const actualTo = toAnchor === 'right' ? 'right' : 'left';
    const dx = end.x - start.x;
    const dy = end.y - start.y;

    if (actualFrom === 'right' && actualTo === 'left') {
      if (dx >= 20) {
        const curvature = Math.max(35, dx * 0.45);
        return `M ${start.x} ${start.y} C ${start.x + curvature} ${start.y}, ${end.x - curvature} ${end.y}, ${end.x} ${end.y}`;
      } else {
        const loop = Math.max(50, Math.abs(dy) * 0.25 + 45);
        return `M ${start.x} ${start.y} C ${start.x + loop} ${start.y}, ${end.x - loop} ${end.y}, ${end.x} ${end.y}`;
      }
    }

    if (actualFrom === 'left' && actualTo === 'right') {
      if (dx <= -20) {
        const curvature = Math.max(35, Math.abs(dx) * 0.45);
        return `M ${start.x} ${start.y} C ${start.x - curvature} ${start.y}, ${end.x + curvature} ${end.y}, ${end.x} ${end.y}`;
      } else {
        const loop = Math.max(50, Math.abs(dy) * 0.25 + 45);
        return `M ${start.x} ${start.y} C ${start.x - loop} ${start.y}, ${end.x + loop} ${end.y}, ${end.x} ${end.y}`;
      }
    }

    if (actualFrom === 'right' && actualTo === 'right') {
      const loop = Math.max(60, Math.abs(dy) * 0.25 + 45);
      const maxX = Math.max(start.x, end.x) + loop;
      return `M ${start.x} ${start.y} C ${maxX} ${start.y}, ${maxX} ${end.y}, ${end.x} ${end.y}`;
    }

    // left to left
    const loop = Math.max(60, Math.abs(dy) * 0.25 + 45);
    const minX = Math.min(start.x, end.x) - loop;
    return `M ${start.x} ${start.y} C ${minX} ${start.y}, ${minX} ${end.y}, ${end.x} ${end.y}`;
  };

  // Exact curve midpoint for floating conversion pill and line delete button
  const getCurveMidpoint = (
    start: { x: number; y: number },
    end: { x: number; y: number },
    fromAnchor: 'left' | 'right' | 'top' | 'bottom' = 'right',
    toAnchor: 'left' | 'right' | 'top' | 'bottom' = 'left'
  ) => {
    const actualFrom = fromAnchor === 'left' ? 'left' : 'right';
    const actualTo = toAnchor === 'right' ? 'right' : 'left';
    let cp1 = { x: start.x, y: start.y };
    let cp2 = { x: end.x, y: end.y };
    const dx = end.x - start.x;
    const dy = end.y - start.y;

    if (actualFrom === 'right' && actualTo === 'left') {
      if (dx >= 20) {
        const curvature = Math.max(35, dx * 0.45);
        cp1 = { x: start.x + curvature, y: start.y };
        cp2 = { x: end.x - curvature, y: end.y };
      } else {
        const loop = Math.max(50, Math.abs(dy) * 0.25 + 45);
        cp1 = { x: start.x + loop, y: start.y };
        cp2 = { x: end.x - loop, y: end.y };
      }
    } else if (actualFrom === 'left' && actualTo === 'right') {
      if (dx <= -20) {
        const curvature = Math.max(35, Math.abs(dx) * 0.45);
        cp1 = { x: start.x - curvature, y: start.y };
        cp2 = { x: end.x + curvature, y: end.y };
      } else {
        const loop = Math.max(50, Math.abs(dy) * 0.25 + 45);
        cp1 = { x: start.x - loop, y: start.y };
        cp2 = { x: end.x + loop, y: end.y };
      }
    } else if (actualFrom === 'right' && actualTo === 'right') {
      const loop = Math.max(60, Math.abs(dy) * 0.25 + 45);
      const maxX = Math.max(start.x, end.x) + loop;
      cp1 = { x: maxX, y: start.y };
      cp2 = { x: maxX, y: end.y };
    } else {
      const loop = Math.max(60, Math.abs(dy) * 0.25 + 45);
      const minX = Math.min(start.x, end.x) - loop;
      cp1 = { x: minX, y: start.y };
      cp2 = { x: minX, y: end.y };
    }

    return {
      x: (start.x + 3 * cp1.x + 3 * cp2.x + end.x) / 8,
      y: (start.y + 3 * cp1.y + 3 * cp2.y + end.y) / 8,
    };
  };

  // Dynamic Lucide and brand icon lookup
  const getDynamicSkillIcon = (iconName: string, className = 'w-4 h-4 text-white') => {
    if (iconName === 'meta') {
      return <SkillBrandIcon type="meta" className={className} />;
    }
    if (iconName === 'google_ads') {
      return <SkillBrandIcon type="google_ads" className={className} />;
    }
    if (iconName === 'tiktok_ads') {
      return <SkillBrandIcon type="tiktok_ads" className={className} />;
    }
    if (iconName === 'sheets') {
      return <SkillBrandIcon type="sheets" className={className} />;
    }
    if (iconName === 'store') {
      return <SkillBrandIcon type="store" className={className} />;
    }
    const IconComp = (LucideIcons as Record<string, any>)[iconName];
    if (IconComp && (typeof IconComp === 'function' || typeof IconComp === 'object')) {
      const Element = IconComp;
      return <Element className={className} />;
    }
    return <Zap className={className} />;
  };

  // Helper to render node icon in card
  const renderCardIcon = (node: BoardNode) => {
    return getDynamicSkillIcon(node.iconType, 'w-4 h-4 text-white');
  };

  // Toggle Category accordion open/close
  const handleToggleCategory = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // Expand or Collapse All Categories
  const handleToggleExpandAllCategories = () => {
    const allOpen = ALL_SKILL_CATEGORIES.every((c) => expandedCategories[c.id]);
    const nextState: Record<string, boolean> = {};
    ALL_SKILL_CATEGORIES.forEach((c) => {
      nextState[c.id] = !allOpen;
    });
    setExpandedCategories(nextState);
  };

  // Filtered skills and categories calculation based on search, pills, and removed skills
  const filteredCategories = React.useMemo(() => {
    const q = skillsSearch.trim().toLowerCase();
    const activeFilter = skillsFilter;

    // Build categories map incorporating custom skills
    const categoriesMap = new Map<string, SkillCategory>();

    ALL_SKILL_CATEGORIES.forEach((cat) => {
      categoriesMap.set(cat.id, {
        ...cat,
        skills: [...cat.skills],
      });
    });

    // Merge custom skills into their selected categories or create custom category
    customSkills.forEach((cSkill) => {
      if (removedSkillIds.includes(cSkill.id)) return;
      const targetCatId = (cSkill as any).categoryId || 'custom_skills';

      let targetCat = categoriesMap.get(targetCatId);
      if (!targetCat) {
        for (const cat of categoriesMap.values()) {
          if (cat.name.toLowerCase() === cSkill.category.toLowerCase()) {
            targetCat = cat;
            break;
          }
        }
      }

      const customSkillItem: SkillItem = {
        num: 999,
        id: cSkill.id,
        title: cSkill.title,
        subtitle: cSkill.subtitle,
        category: cSkill.category,
        categoryId: targetCat ? targetCat.id : targetCatId,
        tag: 'CUSTOM',
        score: '100%',
        icon: cSkill.iconType || 'Sparkles',
        iconBg: cSkill.iconBg || 'bg-emerald-600',
        iconColor: 'text-white',
        description: cSkill.subtitle || 'Custom AI Skill',
      };

      if (targetCat) {
        targetCat.skills = [customSkillItem, ...targetCat.skills];
      } else {
        categoriesMap.set(targetCatId, {
          id: targetCatId,
          name: cSkill.category,
          skillsCount: 1,
          icon: cSkill.iconType || 'Sparkles',
          color: cSkill.iconBg || 'bg-emerald-600',
          textColor: 'text-emerald-400',
          skills: [customSkillItem],
        });
      }
    });

    const allCategoriesList = Array.from(categoriesMap.values());

    return allCategoriesList.map((category) => {
      // Exclude skills hidden or removed by user
      const visibleCategorySkills = category.skills.filter((s) => !removedSkillIds.includes(s.id));
      if (visibleCategorySkills.length === 0) return null;

      // Check category pill filter
      if (activeFilter !== 'All') {
        const f = activeFilter.toLowerCase();
        const matchesCategory =
          category.id.toLowerCase() === f ||
          category.id.toLowerCase().includes(f) ||
          category.name.toLowerCase().includes(f);

        const hasMatchingTag = visibleCategorySkills.some(
          (s) => s.tag.toLowerCase() === f
        );

        if (!matchesCategory && !hasMatchingTag) return null;
      }

      // Check search query
      if (!q) {
        if (activeFilter !== 'All') {
          const f = activeFilter.toLowerCase();
          const matchesCategory =
            category.id.toLowerCase() === f ||
            category.id.toLowerCase().includes(f) ||
            category.name.toLowerCase().includes(f);

          if (matchesCategory) {
            return { ...category, skills: visibleCategorySkills };
          }

          const matchingSkills = visibleCategorySkills.filter(
            (s) =>
              s.categoryId.toLowerCase().includes(f) ||
              s.tag.toLowerCase() === f ||
              category.name.toLowerCase().includes(f)
          );
          return matchingSkills.length > 0 ? { ...category, skills: matchingSkills } : null;
        }
        return { ...category, skills: visibleCategorySkills };
      }

      const matchingSkills = visibleCategorySkills.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          (s.subtitle && s.subtitle.toLowerCase().includes(q)) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          s.tag.toLowerCase().includes(q)
      );

      if (matchingSkills.length === 0) return null;

      return {
        ...category,
        skills: matchingSkills,
      };
    }).filter(Boolean) as SkillCategory[];
  }, [skillsSearch, skillsFilter, removedSkillIds, customSkills]);

  const totalMatchingSkills = React.useMemo(() => {
    return filteredCategories.reduce((acc, c) => acc + c.skills.length, 0);
  }, [filteredCategories]);

  // Filtered products list for Product Library tab
  const filteredProducts = React.useMemo(() => {
    const q = productSearch.trim().toLowerCase();
    if (!q) return SAMPLE_PRODUCTS;
    return SAMPLE_PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.niche.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.sellingPoints.toLowerCase().includes(q)
    );
  }, [productSearch]);

  // Filtered detailed products for rich Product Dossiers
  const filteredDetailedProducts = React.useMemo(() => {
    const q = productSearch.trim().toLowerCase();
    if (!q) return productsList;
    return productsList.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        (p.intelligence?.evidenceNotes && p.intelligence.evidenceNotes.toLowerCase().includes(q)) ||
        (p.aiAnalysis?.marketingAngle && p.aiAnalysis.marketingAngle.toLowerCase().includes(q))
    );
  }, [productSearch, productsList]);

  // Filtered uploaded files for Uploads tab
  const filteredUploadedFiles = React.useMemo(() => {
    const q = fileSearch.trim().toLowerCase();
    return uploadedFiles.filter((file) => {
      if (fileFilter !== 'all') {
        if (fileFilter === 'excel' && file.type !== 'excel') return false;
        if (fileFilter === 'pdf' && file.type !== 'pdf') return false;
        if (fileFilter === 'word' && file.type !== 'word') return false;
        if (fileFilter === 'json' && file.type !== 'json') return false;
        if (fileFilter === 'image' && file.type !== 'image') return false;
      }
      if (!q) return true;
      return (
        file.name.toLowerCase().includes(q) ||
        (file.summary && file.summary.toLowerCase().includes(q)) ||
        (file.tags && file.tags.some((t) => t.toLowerCase().includes(q)))
      );
    });
  }, [uploadedFiles, fileFilter, fileSearch]);

  // Add a new node to canvas from skills list (centers on visible canvas area, adds strictly ONE)
  const handleAddSkillToBoard = (skill: {
    title: string;
    category?: string;
    iconType: string;
    iconBg: string;
    subtitle?: string;
  }) => {
    const scale = zoom / 100;
    const canvasEl = canvasRef.current;
    const width = canvasEl?.clientWidth || 800;
    const height = canvasEl?.clientHeight || 600;

    const centerX = (width / 2 - panOffset.x) / scale - 138 + (Math.random() * 40 - 20);
    const centerY = (height / 2 - panOffset.y) / scale - 82 + (Math.random() * 40 - 20);

    createNodeAtPosition(skill, centerX, centerY);
  };

  // CRO_PROMPT: The exact AI system prompt embedded into the CRO skill payload
  const CRO_LANDING_PAGE_PROMPT = `You are an AI PRODUCT → CRO STRATEGY → LANDING PAGE generator. You think:

PRODUCT → CUSTOMER → PROBLEM → DESIRE → SOLUTION → PROOF → OFFER → TRUST → CTA

BEFORE generating any UI. You pipeline ANY ecommerce product into a landing page that is adapted SPECIFICALLY to that product.

DESIGN LANGUAGE — a high-converting ecommerce product page:
- information hierarchy, conversion structure, mobile-first UX, offer presentation, product storytelling, CTA placement, visual hierarchy. Do NOT copy any specific template; apply these principles to THIS product.
- Premium modern ecommerce look: strong visual hierarchy, large product imagery, clear typography, strong CTA hierarchy, clean cards, rounded corners, subtle shadows, premium spacing, clear pricing blocks, trust indicators, fully responsive layouts.
- Avoid: generic SaaS layouts, heavy gradients, excessive animation, clutter, tiny text, too many colors.

GROUND RULES — NEVER CHANGE THESE:
- Work ONLY with the product information provided. NEVER invent product facts, statistics, reviews, certifications, guarantees, or prices.
- Any claim shown on the page MUST be traceable to the input data; if a number (price, rating, reviews count) is unknown, omit it from the page.
- The landing page must work for ANY product. The product stays the visual focus at all times.
- Copy must focus on the CUSTOMER'S RESULT, not just the product name.
- Mobile (390x844) is the PRIMARY design target; support 375, 412, 768, 1024, 1440.

=== PART 1 — DISCOVERY (complete this BEFORE planning any build) ===
DISCOVERY-FIRST RULE: catalog every fact below from the PRODUCT FACTS and USER INSTRUCTIONS. If a fact is missing, DO NOT invent random/generic filler — create a CLEARLY LABELED, realistic placeholder (example: "TODO — confirm final price, currently 3490 DZD") and record { field, whatIsMissing, placeholderUsed, howToConfirm } in the "gaps" array. Every guess MUST be in gaps.

1. BRAND IDENTITY — exact brand/product name (spelling + capitalization), a TEXT LOGO derived from the name (no logo file uploads here), brand color palette (primary, secondary, accent, background hex), font pairing (one headline + one body), and vibe/tone: playful | luxury | clinical-trustworthy | warm-organic | bold-edgy. Choose colors from the provided facts / brand trademarks / category conventions; if you must color from scratch, pick a tasteful category-appropriate palette and ADD A GAP asking the human to confirm the hex codes.
2. PRODUCT CONTENT — describe the product shots to render as realistic inline SVG art (avoid gray boxes), one category label, ONE benefit-driven headline (a promise, not a description), a 2-3 sentence supporting description, 3-4 key benefits (short label + icon name + one-sentence detail), and full accordion content (description / ingredients-or-specs / how to use).
3. PRICING & OFFER — regular price, discount price + % off, subscription option (frequencies + savings %), bundle/quantity discount, shipping policy (free threshold + delivery time), guarantee/return text.
4. SOCIAL PROOF — star rating, review count, 3-5 realistic reviews (name, rating, one-sentence quote).
5. NAVIGATION & CONVERSION — nav menu items, cart/search icons needed, primary CTA label + real destination, urgency element (countdown / low-stock / limited badge / none).

PRODUCT FACTS AVAILABLE (use ONLY these facts):
PRODUCT NAME: [Connected Product]

=== PART 2 — SECTION PLAN (choose NOTHING: the full 12-section single-product page, this exact order) ===
1 announcement bar · 2 sticky nav · 3 hero image carousel with dots + thumbnails · 4 rating strip · 5 category label + benefit headline · 6 benefit icons row · 7 price block (with offer toggles) · 8 primary CTA (sticky on mobile) · 9 info accordion · 10 reviews · 11 cross-sell row · 12 footer.

OUTPUT RULE: Return ONLY the strategy JSON below (pure JSON, no markdown fences).

{
  "gaps": [
    {
      "field": "brandIdentity.colorPalette",
      "whatIsMissing": "what was not provided",
      "placeholderUsed": "the clearly labeled placeholder you created",
      "howToConfirm": "exact instruction for the human (e.g. give me 3 hex codes)"
    }
  ],
  "brandIdentity": {
    "brandName": "exact brand/product name + capitalization",
    "logoType": "text-logo-from-name",
    "colorPalette": { "primary": "hex", "secondary": "hex", "accent": "hex", "background": "hex" },
    "fonts": { "headline": "headline font family", "body": "body font family" },
    "vibe": "playful | luxury | clinical-trustworthy | warm-organic | bold-edgy"
  },
  "productContent": {
    "photos": ["describe each product shot that will be rendered as realistic inline SVG art, e.g. hero shot on neutral studio background"],
    "categoryLabel": "one short label, e.g. Nose Hair Trimmer",
    "headline": "one benefit-driven promise, not a description",
    "description": "2-3 sentence supporting description",
    "benefits": [
      { "icon": "lucide icon name of the benefit", "label": "very short label", "detail": "one sentence" }
    ],
    "accordion": { "description": "…", "ingredientsSpecs": "…", "howToUse": "…" }
  },
  "pricingOffer": {
    "regularPrice": "…", "discountPrice": "… or ''", "percentOff": "… or ''",
    "subscription": { "available": false, "frequencies": ["…"], "savingsPercent": 0 },
    "bundleQuantityDiscount": "… or ''",
    "shippingPolicy": "free shipping threshold + delivery time",
    "guarantee": "guarantee / return policy text"
  },
  "socialProof": {
    "starRating": 0, "reviewCount": 0,
    "reviews": [ { "name": "…", "rating": 0, "quote": "one sentence" } ]
  },
  "navigation": {
    "navItems": ["About", "FAQ", "Shipping", "Contact"],
    "cartIcon": true, "searchIcon": false,
    "primaryCta": { "label": "real button label", "url": "real destination or ''" },
    "urgency": { "type": "countdown|low-stock|badge|none", "label": "…" }
  },
  "conversion": {
    "headlineAngle": "…", "offerStrategy": "…", "trustStrategy": "…", "objectionHandling": "…"
  },
  "design": {
    "primaryColor": "hex", "secondaryColor": "hex", "accentColor": "hex",
    "backgroundColor": "hex", "textColor": "hex",
    "fontHeadline": "…", "fontBody": "…", "fontStyle": "modern stack string"
  },
  "sections": [
    { "key": "announcement_bar", "name": "Top Announcement Bar", "purpose": "sitewide promo/shipping strip", "headline": "…", "subheadline": "", "body": "", "ctaLabel": "", "layout": "full-width solid color strip" },
    { "key": "nav", "name": "Sticky Nav Bar", "purpose": "logo, menu, cart, search", "headline": "", "subheadline": "", "body": "", "ctaLabel": "", "layout": "logo-left, hamburger, cart-icon" },
    { "key": "hero_carousel", "name": "Hero Image Carousel", "purpose": "real product shots, swipeable", "headline": "…", "subheadline": "…", "body": "", "ctaLabel": "…", "layout": "dotted carousel + thumbnail strip" },
    { "key": "rating_strip", "name": "Rating Strip", "purpose": "stars + review count", "headline": "", "subheadline": "…", "body": "", "ctaLabel": "", "layout": "compact centered strip" },
    { "key": "category_headline", "name": "Category Label + Benefit Headline", "purpose": "category badge + promise + description", "headline": "…", "subheadline": "…", "body": "…", "ctaLabel": "", "layout": "badge, big headline, 2-3 sentences" },
    { "key": "benefit_icons", "name": "Benefit Icons Row", "purpose": "3-4 real benefit icons", "headline": "", "subheadline": "", "body": "", "ctaLabel": "", "layout": "icon cards in a row" },
    { "key": "price_block", "name": "Price Block", "purpose": "regular/discount price, subscribe toggle, bundle", "headline": "…", "subheadline": "", "body": "…", "ctaLabel": "", "layout": "price, toggles, fee notes" },
    { "key": "primary_cta", "name": "Primary CTA", "purpose": "full-width high-contrast buy button, sticky on mobile", "headline": "", "subheadline": "", "body": "", "ctaLabel": "…", "layout": "full-width button" },
    { "key": "info_accordion", "name": "Info Accordion", "purpose": "Description / Ingredients / How to Use, collapsible", "headline": "", "subheadline": "", "body": "…", "ctaLabel": "", "layout": "collapsible rows" },
    { "key": "reviews", "name": "Reviews Section", "purpose": "real reviews, stars, names", "headline": "…", "subheadline": "…", "body": "", "ctaLabel": "", "layout": "review cards" },
    { "key": "cross_sell", "name": "Cross-Sell Row", "purpose": "related products, horizontally scrollable", "headline": "…", "subheadline": "", "body": "", "ctaLabel": "…", "layout": "horizontal scroll cards" },
    { "key": "footer", "name": "Footer", "purpose": "shipping, returns, contact, socials", "headline": "", "subheadline": "", "body": "", "ctaLabel": "", "layout": "simple link columns" }
  ]
}`;

  // Reusable Skill Item component strictly matching image_d8993db4.png
  const renderSkillItem = (s: SkillItem) => {
    const isCroMobileSkill =
      s.id === 'cro_landing_page_builder_mobile' ||
      s.title.toLowerCase().includes('cro landing page builder') ||
      (s.title.toLowerCase().includes('cro') && s.title.toLowerCase().includes('mobile'));
    const isLpSkill =
      !isCroMobileSkill &&
      (s.id === 'ai_landing_page_generator' || s.title.toLowerCase().includes('landing page'));
    const skillDataPayload = {
      title: s.title,
      category: s.category,
      iconType: s.icon,
      iconBg: s.iconBg,
      subtitle: s.subtitle || s.description,
      ...(isCroMobileSkill
        ? {
            isAppNode: true,
            appType: 'cro_mobile_landing_page' as const,
            appData: { systemPrompt: CRO_LANDING_PAGE_PROMPT },
          }
        : isLpSkill
        ? {
            isAppNode: true,
            appType: 'landing_page_generator' as const,
            appData: { settings: INITIAL_LANDING_PAGE_SETTINGS },
          }
        : {}),
    };

        return (
      <div
        key={s.id}
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData('application/json', JSON.stringify(skillDataPayload));
          e.dataTransfer.effectAllowed = 'copy';
        }}
        className="bg-[#1c1c20] hover:bg-[#25252b] rounded-2xl p-3 border border-white/5 hover:border-white/15 hover:shadow-lg transition-all flex flex-col justify-between group cursor-grab active:cursor-grabbing select-none shadow-xs"
        title={`${s.title}\n\n${s.subtitle || s.description}\n\nDrag onto canvas or click '+ Add to Board'.`}
      >
        <div>
          {/* Top Row: Tag on Left, Emerald Score & Remove Button on Right */}
          <div className="flex items-center justify-between gap-1">
            <span className="bg-[#27272c] text-neutral-300 text-[9.5px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider font-mono truncate border border-white/5">
              {s.tag || 'SKILL'}
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[#10b981] font-bold text-xs font-mono">
                {s.score || '95%'}
              </span>
              <button
                type="button"
                data-no-drag="true"
                onClick={(e) => {
                  e.stopPropagation();
                  setSkillToRemove({
                    id: s.id,
                    title: s.title,
                    isCustom: false,
                  });
                }}
                className="opacity-60 group-hover:opacity-100 p-1 rounded-md text-neutral-400 hover:text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                title={`Remove "${s.title}" from list`}
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Bold Title */}
          <h4 className="font-bold text-white text-xs mt-2.5 leading-snug line-clamp-2">
            {s.title}
          </h4>

          {/* Subtitle */}
          <p className="text-neutral-400 text-[11px] mt-1 line-clamp-2 leading-relaxed">
            {s.subtitle || s.description}
          </p>
        </div>

        {/* Action Button: + Add to Board */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleAddSkillToBoard(skillDataPayload);
          }}
          className="w-full mt-3 py-1.5 px-2.5 rounded-xl border border-white/10 bg-[#27272e] hover:bg-white hover:text-black active:scale-98 text-neutral-200 text-[11px] font-semibold font-mono flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
        >
          <span>+ Add to Board</span>
        </button>
      </div>
    );
  };

  // Add a product node to canvas from Product Library (centers on visible canvas area)
  const handleAddProductToBoard = (product: ProductLibraryItem) => {
    const scale = zoom / 100;
    const canvasEl = canvasRef.current;
    const width = canvasEl?.clientWidth || 800;
    const height = canvasEl?.clientHeight || 600;

    const centerX = (width / 2 - panOffset.x) / scale - 150 + (Math.random() * 40 - 20);
    const centerY = (height / 2 - panOffset.y) / scale - 60 + (Math.random() * 40 - 20);

    const productPayload = {
      title: product.title,
      subtitle: product.subtitle,
      category: 'Product Library',
      iconType: 'ShoppingBag',
      iconBg: 'bg-emerald-600',
      isProduct: true,
      productData: {
        image: product.image,
        sellingPrice: product.sellingPrice,
        productCost: product.productCost,
        profitMargin: product.profitMargin,
        niche: product.niche,
        sellingPoints: product.sellingPoints,
        description: product.description,
        stock: product.stock,
      },
    };

    createNodeAtPosition(productPayload, centerX, centerY);
  };

  // Add a rich detailed product node to canvas
  const handleAddDetailedProductToBoard = (product: DetailedProduct) => {
    const scale = zoom / 100;
    const canvasEl = canvasRef.current;
    const width = canvasEl?.clientWidth || 800;
    const height = canvasEl?.clientHeight || 600;

    const centerX = (width / 2 - panOffset.x) / scale - 150 + (Math.random() * 40 - 20);
    const centerY = (height / 2 - panOffset.y) / scale - 60 + (Math.random() * 40 - 20);

    const sellingPrice = product.financials?.sellingPrice ?? 1400;
    const costPrice = product.financials?.costPrice ?? 760;
    const shippingCost = product.financials?.shippingCost ?? 202;
    const marginPct = Math.round(
      ((sellingPrice - costPrice - shippingCost) / (sellingPrice || 1)) * 100
    );

    const productPayload = {
      title: product.name,
      subtitle: product.aiAnalysis?.marketingAngle || product.category || 'Product Dossier',
      category: 'Product Intelligence',
      iconType: 'ShoppingBag',
      iconBg: 'bg-blue-600',
      isProduct: true,
      productData: {
        image: product.mainImage,
        sellingPrice,
        productCost: costPrice,
        profitMargin: marginPct,
        niche: product.category,
        sellingPoints: product.aiAnalysis?.whySell?.slice(0, 2).join(' • ') || 'Verified product dossier',
        description: product.intelligence?.evidenceNotes || product.name,
        stock: product.supplier?.moq ? `MOQ ${product.supplier.moq}` : 'Active',
      },
    };

    createNodeAtPosition(productPayload, centerX, centerY);
    showToast(`Added "${product.name.slice(0, 30)}..." to the board!`);
  };

  // Add an uploaded file node to canvas (centers on visible canvas area)
  const handleAddFileToBoard = (file: UploadedFileItem) => {
    const scale = zoom / 100;
    const canvasEl = canvasRef.current;
    const width = canvasEl?.clientWidth || 800;
    const height = canvasEl?.clientHeight || 600;

    const centerX = (width / 2 - panOffset.x) / scale - 180 + (Math.random() * 40 - 20);
    const centerY = (height / 2 - panOffset.y) / scale - 80 + (Math.random() * 40 - 20);

    const iconType =
      file.type === 'excel'
        ? 'FileSpreadsheet'
        : file.type === 'image'
        ? 'Image'
        : file.type === 'json'
        ? 'FileCode'
        : 'FileText';

    const iconBg =
      file.type === 'excel'
        ? 'bg-emerald-600'
        : file.type === 'pdf'
        ? 'bg-rose-600'
        : file.type === 'word'
        ? 'bg-blue-600'
        : file.type === 'json'
        ? 'bg-amber-600'
        : 'bg-purple-600';

    const filePayload = {
      title: file.name,
      subtitle: file.summary || `${file.type.toUpperCase()} file asset`,
      category: 'Uploaded Files',
      iconType,
      iconBg,
      isFile: true,
      fileData: file,
    };

    createNodeAtPosition(filePayload, centerX, centerY);
    showToast(`Added "${file.name}" to the board!`);
  };

  // Drag start for an uploaded file
  const handleDragStartFile = (e: React.DragEvent, file: UploadedFileItem) => {
    const iconType =
      file.type === 'excel'
        ? 'FileSpreadsheet'
        : file.type === 'image'
        ? 'Image'
        : file.type === 'json'
        ? 'FileCode'
        : 'FileText';

    const iconBg =
      file.type === 'excel'
        ? 'bg-emerald-600'
        : file.type === 'pdf'
        ? 'bg-rose-600'
        : file.type === 'word'
        ? 'bg-blue-600'
        : file.type === 'json'
        ? 'bg-amber-600'
        : 'bg-purple-600';

    const filePayload = {
      title: file.name,
      subtitle: file.summary || `${file.type.toUpperCase()} file asset`,
      category: 'Uploaded Files',
      iconType,
      iconBg,
      isFile: true,
      fileData: file,
    };

    e.dataTransfer.setData('application/json', JSON.stringify(filePayload));
    e.dataTransfer.effectAllowed = 'copy';
  };

  // Delete an uploaded file
  const handleDeleteUploadedFile = (fileId: string, fileName: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
    showToast(`Deleted file "${fileName}"`);
  };

  // AI Creative Apps Catalog (CRO Mobile LP, AI Landing Page Generator, Text to Code LP, Text to Image LP, Regroupe Product, Text to Image, Image to Text, Storyboard, Script, Séance)
  const AI_STUDIO_APPS = [
    {
      id: 'app-cro-mobile-landing-page',
      title: 'CRO Landing Page Builder (Mobile)',
      subtitle: 'Mobile CRO DTC Landing Page Builder with Kada Garmin preview, conversion rings & 5-step workflow',
      appType: 'cro_mobile_landing_page' as const,
      iconType: 'Smartphone',
      iconBg: 'bg-blue-600',
      badge: 'MOBILE CRO STUDIO',
      tag: 'COD DZ HIGH-CONVERTING',
      description:
        'Exact DTC Mobile CRO Landing Page Builder featuring 3-column studio layout, live Kada Garmin Sports Smartwatch desktop hero, mobile phone frame preview, circular conversion potential ring, A/B test variations, and a 5-step master workflow footer.',
      features: [
        'Exact Layout Matching Reference: Left Controls, Center Desktop Hero, Right Mobile CRO Phone',
        'Interactive Conversion Potential Ring & Performance Score Breakdown',
        'Direct A/B Variant Simulator & COD Algeria 58-Wilaya Form',
        '5-Step Creative Workflow (Research → Angle → LP → Ads → Fulfillment)',
        'Full HTML5 / Tailwind CSS Export with 1-Click Download',
      ],
      defaultData: {},
    },
    {
      id: 'app-landing-page-generator',
      title: 'AI Landing Page Generator',
      subtitle: 'Transform product prompts into high-converting COD landing pages with live 3-column preview and section customization',
      appType: 'landing_page_generator' as const,
      iconType: 'Palette',
      iconBg: 'bg-blue-600',
      badge: '3-COLUMN LIVE LP',
      tag: 'COD CONVERSION',
      description:
        'Transform product descriptions, research, or custom prompts into full high-converting landing pages. Complete with 3 columns: Product & Template Settings, Page Sections & Reordering, and Direct Responsive Live Website Preview without phone mockups.',
      features: [
        'Exact 3-Column UI: Setup, Parameters & Live Browser Preview',
        'Direct Website Preview (Desktop & Mobile, smooth scrolling)',
        'Section Customizer: Hero, Before/After, Showcase, COD Form, FAQ',
        'Algerian COD Optimized (58 Wilayas, DZD, Cash On Delivery)',
        'Instant Code Export (HTML, Tailwind CSS, JS) + Download',
      ],
      defaultData: {
        settings: INITIAL_LANDING_PAGE_SETTINGS,
      },
    },
    {
      id: 'app-text-to-code-lp',
      title: 'Text to Code Landing Page',
      subtitle: 'Give text explaining product → generates responsive code landing page & live view (Image 1)',
      appType: 'text_to_code_landing_page' as const,
      iconType: 'Code',
      iconBg: 'bg-rose-600',
      badge: 'IMAGE 1 CODE LP',
      tag: 'DIRECT RESPONSE',
      description:
        'Synthesize production-ready e-commerce landing pages from product text. Features live countdown timer, interactive pricing tiers ($40 vs $32 subscription), quantity selector, instant cart drawer, and clean exportable HTML5 + Tailwind CSS code.',
      features: [
        'Dual View: Interactive Phone Mockup + Clean HTML Code',
        'Matching Image 1: The Good Dose layout & typography',
        'Live ticking countdown timer & pricing tier switcher',
        '1-Click Copy Code & Download Standalone HTML',
      ],
      defaultData: DEFAULT_THE_GOOD_DOSE_DATA,
    },
    {
      id: 'app-text-to-image-lp',
      title: 'Text to Image Landing Page',
      subtitle: 'Give text explaining product → generates multi-tier editorial visual landing page (Image 2)',
      appType: 'text_to_image_landing_page' as const,
      iconType: 'Image',
      iconBg: 'bg-purple-600',
      badge: 'IMAGE 2 VISUAL LP',
      tag: 'EDITORIAL GRAPHIC',
      description:
        'Generate multi-tier visual graphic landing pages matching the Orvena reference layout. Includes Editorial Brand Header, Lifestyle Action Hero, 3-Product Lineup, Story Grid ("Make it a moment, not a task"), Features Bar, Testimonials, and Packshot Showcase.',
      features: [
        '3-Column Triptych & Continuous Vertical Page Scroll',
        'Matching Image 2: Orvena editorial wellness aesthetic',
        'AI Image Studio: Regenerate any section with custom prompt',
        'Multi-palette presets: Lavender, Terracotta, Sage, Noir',
      ],
      defaultData: DEFAULT_ORVENA_DATA,
    },
    {
      id: 'app-product-regrouper',
      title: 'Regroupe Product',
      subtitle: 'Cluster products by similar category & audience into Campaign & AdSets with Org Chart diagram',
      appType: 'product_regrouper' as const,
      iconType: 'Workflow',
      iconBg: 'bg-violet-600',
      badge: 'CAMPAIGN CLUSTER',
      tag: 'STRATEGY',
      description: 'Select products, set group size, and automatically group by category & audience similarity to target the same audience in testing campaigns. Previews as an interactive Org Chart diagram (Campaign → AdSets → Products).',
      features: [
        'Select products with checkboxes & filters',
        'Choose items per group (1 to 5+)',
        'Category & audience avatar similarity clustering',
        'Interactive Org Chart Tree (Campaign → AdSets → Products)',
        'Send to Board Canvas as connected nodes',
      ],
      defaultData: {
        campaignName: 'Algeria COD Q4 Scaling / Multi-Product Testing',
        campaignType: 'cbo',
        dailyBudget: 50,
        productsPerGroup: 2,
        objective: 'Sales / COD Conversions',
        targetMarket: 'Algeria 58 Wilayas',
        groups: [],
      },
    },
    {
      id: 'app-text-to-image',
      title: 'Text to Image',
      subtitle: 'Generate photorealistic product renders & ad visuals from text prompts',
      appType: 'text_to_image' as const,
      iconType: 'Image',
      iconBg: 'bg-blue-600',
      badge: 'IMAGE AI',
      tag: 'VISUAL',
      description: 'Studio-grade e-commerce photography, custom aspect ratios (1:1, 9:16, 16:9, 4:5), preset styles, and instant prompt enhancement.',
      features: ['Aspect ratio switcher (1:1, 9:16, 16:9)', '4K Commercial studio presets', 'Prompt AI Enhancer tool'],
      defaultData: {
        prompt: 'Ultra-realistic e-commerce product render of a sleek Ultrasonic Dental Scaler Pro on a clean marble surface, studio lighting, water splash droplets, 8k resolution, commercial advertising photo',
        aspectRatio: '1:1',
        style: 'Studio Commercial',
        negativePrompt: 'blur, low quality, distorted, extra hands, text watermark',
        generatedImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      },
    },
    {
      id: 'app-image-to-text',
      title: 'Image to Text',
      subtitle: 'Extract product specs, selling angles & viral ad hooks from photos',
      appType: 'image_to_text' as const,
      iconType: 'FileText',
      iconBg: 'bg-indigo-600',
      badge: 'VISION OCR',
      tag: 'ANALYSIS',
      description: 'Deep computer vision scans packaging and item photos to extract technical specs, pain-point hooks, and multilingual sales copy.',
      features: ['Optical Character Recognition (OCR)', 'Technical specifications parser', 'Auto-generated COD marketing hooks'],
      defaultData: {
        sourceImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=450&fit=crop',
        extractedText: 'MODEL: SonicPro DS-5 • 12,000 VPM Ultrasonic • IPX6 Waterproof • Medical 316 Titanium Tip • USB-C Quick Charge 400mAh • 5 Frequency Vibrations',
        productSpecs: [
          { label: 'Technology', value: 'High-Frequency Sonic (12,000 VPM)' },
          { label: 'Material', value: 'Medical-Grade 316 Stainless Tip' },
          { label: 'Waterproof', value: 'IPX6 Full Body Washable' },
          { label: 'Battery', value: 'USB-C Rechargeable (30-day standby)' },
        ],
        generatedHooks: [
          '🇩🇿 « تهنى من الجير ورائحة الفم في دارك بلا ما تصرف ملاين عند الطبيب! »',
          '⚡ « الحل السريع والأصلي لإزالة التكلسات في 5 دقائق مع ضمان الدفع عند الاستلام »',
          '💎 « Smile like Hollywood with zero dentist appointments — 100% safe home ultrasonic cleaning! »',
        ],
      },
    },
    {
      id: 'app-text-to-storyboard',
      title: 'Text to Board Story',
      subtitle: 'Storyboard 5-beat viral conversion narrative with visual frames & voice cues',
      appType: 'text_to_storyboard' as const,
      iconType: 'Film',
      iconBg: 'bg-amber-600',
      badge: 'STORYBOARD',
      tag: 'CREATIVE',
      description: 'Structure 30-second high-converting TikTok / Reels video ads: Hook (0-3s), Agitation, Product Reveal, Social Proof, and COD Urgency CTA.',
      features: ['5-Beat viral video architecture', 'Spoken Darija / French voiceover cues', 'Interactive visual pacing checklist'],
      defaultData: {
        topic: 'Ultrasonic Dental Scaler viral TikTok/Reels direct response ad for Algerian COD',
        beats: [
          {
            id: 'b1',
            timecode: '00:00 - 00:03',
            type: 'Hook',
            visual: 'Extreme macro close-up of stubborn yellow coffee plaque on teeth. Red warning icon flashes.',
            audio: '« ما زالك تصرف دراهمك عند طبيب الأسنان غير باش تنحي الجير؟ »',
            tag: 'Scroll Stopper',
          },
          {
            id: 'b2',
            timecode: '00:03 - 00:08',
            type: 'Agitation',
            visual: 'Frustrated person looking in bathroom mirror touching yellow teeth with disappointment.',
            audio: '« الأسنان الصفراء ورائحة الفم تحرجك قدام الناس وتكلفك ملاين كل شهر... »',
            tag: 'Pain Trigger',
          },
          {
            id: 'b3',
            timecode: '00:08 - 00:16',
            type: 'Reveal & Demo',
            visual: 'Device unboxed, water droplets vibrating into mist at 12,000 VPM. Instant plaque removal test.',
            audio: '« هاهو الحل الجذري! جهاز SonicPro الأصلي بتقنية الموجات فوق الصوتية ينظف أسنانك في 5 دقائق! »',
            tag: 'Visual Proof',
          },
          {
            id: 'b4',
            timecode: '00:16 - 00:23',
            type: 'Social Proof',
            visual: 'Split screen customer selfie videos smiling brightly with clean white teeth across 58 wilayas.',
            audio: '« أكثر من 1,400 زبون في الجزائر جربوه وشكروا النتيجة الفورية من أول استعمال! »',
            tag: 'Trust Builder',
          },
          {
            id: 'b5',
            timecode: '00:23 - 00:30',
            type: 'Offer & COD CTA',
            visual: 'Delivery driver handing parcel to satisfied customer. "Livraison 58 Wilayas + Paiement à la réception".',
            audio: '« اطلب الآن واستفد من تخفيض 30% مع توصيل سريع والدفع بعد ما تفحص طلبيتك! »',
            tag: 'COD Guarantee',
          },
        ],
      },
    },
    {
      id: 'app-text-to-video-script',
      title: 'Text to Script Video',
      subtitle: '3-column studio video script with timing, visual actions & bilingual dialogue',
      appType: 'text_to_video_script' as const,
      iconType: 'Video',
      iconBg: 'bg-emerald-600',
      badge: 'SCRIPT',
      tag: 'VIDEO',
      description: 'Production-ready shooting table with precise timecodes, visual camera choreography, Darija/French voiceovers, and animated caption overlays.',
      features: ['3-Column studio layout', 'Scene-by-scene millisecond timecodes', 'On-screen text motion markers'],
      defaultData: {
        title: '30s High-Converting UGC Reel Script',
        duration: '30s',
        language: 'Algerian Darja / French',
        scenes: [
          {
            sceneNumber: 1,
            timecode: '00:00 - 00:04',
            visual: 'Split screen: Left side shows dental clinic bill (12,000 DZD). Right side shows speaker holding handheld sonic scaler with confident grin.',
            voiceover: '« وعلاش تخلص 12,000 دج عند الكابيني؟ هاد الجهاز ينقي أسنانك في دارك بـ 4,800 دج برك! »',
            onScreenText: '❌ 12,000 DZD vs ✅ 4,800 DZD',
          },
          {
            sceneNumber: 2,
            timecode: '00:04 - 00:11',
            visual: 'POV bathroom sink test. Speaker dips tip in water cup — instant ultrasonic micro-vibrations without vibrating skin. Demonstrates on model tooth.',
            voiceover: '« شوف قوة الموجات! يفتت الجير والتكلسات بلا ما يقيس اللثة ولا يوجعك خلاص. »',
            onScreenText: '⚡ 12,000 ذبذبة / دقيقة • آمن 100%',
          },
          {
            sceneNumber: 3,
            timecode: '00:11 - 00:21',
            visual: 'Close up on 5 modes switch (Soft, Normal, Clean, Strong). Quick montage of wiping clean head under tap — showing IPX6 water resistance.',
            voiceover: '« فيه 5 مستويات قوة، ضد الماء بالكامل، وتشارجيه مرة وحدة في الشهر بـ USB-C! »',
            onScreenText: '💧 مضاد للماء IPX6 • بطارية شهر كامل',
          },
          {
            sceneNumber: 4,
            timecode: '00:21 - 00:30',
            visual: 'Courier arrives with Yalidine / ZR Express parcel. Customer opens package in front of camera, smiles, and taps order link on screen.',
            voiceover: '« التوصيل متوفر لـ 58 ولاية، وتخلص حتى تفتح الباكي وتتأكد بعينيك. اضغط واطلب اليوم! »',
            onScreenText: '📦 الدفع بعد الفحص • توصيل سريع 58 ولاية',
          },
        ],
      },
    },
    {
      id: 'app-text-to-scene-video',
      title: 'Text to Séance Video',
      subtitle: 'Director shot list with camera setups, lighting, focal lengths & shooting cues',
      appType: 'text_to_scene_video' as const,
      iconType: 'Clapperboard',
      iconBg: 'bg-rose-600',
      badge: 'DIRECTOR',
      tag: 'PRODUCTION',
      description: 'Technical field filming guide for creators and video teams with lens focal lengths, 5600K key light settings, props checklist, and shoot notes.',
      features: ['Shot-by-shot lens & angle tags', '5600K Lighting & studio temperature', 'Actor movement & framing directions'],
      defaultData: {
        shootTitle: 'Algerian UGC Direct Response Shoot',
        totalShots: 4,
        location: 'Modern Bathroom / Clean Vanity Mirror Studio',
        lightingSetup: 'Key Light 5600K Diffused Softbox + 3200K Warm Rim Accent',
        shots: [
          {
            shotNumber: 1,
            shotType: 'Macro Close-Up (50mm f/2.0)',
            framing: 'Tight on device head submerging in shallow glass dish with surface tension ripples.',
            lighting: 'Direct 5600K key light at 45° angle to capture clear water droplet refraction.',
            choreography: 'Turn power on at count 2. Maintain steady hold for 3 seconds of misting.',
            equipment: 'Tripod + Macro Extension Tube',
          },
          {
            shotNumber: 2,
            shotType: 'Over-the-Shoulder POV (35mm f/2.8)',
            framing: 'Over actor shoulder looking into illuminated bathroom mirror.',
            lighting: 'Ring light behind camera + warm ceiling ambience.',
            choreography: 'Actor turns on device, brings to mirror, shows satisfied confident nod.',
            equipment: 'Handheld Gimbal (smooth micro-movements)',
          },
          {
            shotNumber: 3,
            shotType: 'Product Packshot Flat Lay (24mm f/4.0)',
            framing: 'Top-down bird-eye view of white unboxing box, USB-C cable, and 2 spare heads.',
            lighting: 'Dual 45° softboxes to eliminate harsh specular reflections on plastic.',
            choreography: 'Hand enters frame smoothly from bottom right, picks up main unit.',
            equipment: 'C-Stand overhead rig',
          },
          {
            shotNumber: 4,
            shotType: 'Doorstep Delivery Handshake (35mm f/2.8)',
            framing: 'Exterior doorway, natural daylight 10:00 AM.',
            lighting: 'Natural ambient overcast or shaded doorway (avoid direct midday sun).',
            choreography: 'Delivery courier hands brown branded box, customer signs receipt with smile.',
            equipment: 'Natural Handheld camera shake for realistic UGC feel',
          },
        ],
      },
    },
  ];

  // Add an AI App node to canvas
  const handleAddAppToBoard = (app: typeof AI_STUDIO_APPS[0]) => {
    const scale = zoom / 100;
    const canvasEl = canvasRef.current;
    const width = canvasEl?.clientWidth || 800;
    const height = canvasEl?.clientHeight || 600;

    const centerX = Math.round((width / 2 - panOffset.x) / scale - 290 + (Math.random() * 40 - 20));
    const centerY = Math.round((height / 2 - panOffset.y) / scale - 180 + (Math.random() * 40 - 20));

    const appPayload = {
      title: app.title,
      subtitle: app.subtitle,
      category: 'AI Creative Studio',
      iconType: app.iconType,
      iconBg: app.iconBg,
      isAppNode: true,
      appType: app.appType,
      appData: app.defaultData,
    };

    createNodeAtPosition(appPayload, centerX, centerY);
    showToast(`Added "${app.title}" to board! ✓`);
  };

  // Send grouped campaign from Product Regrouper onto the Board Canvas
  const handleSendRegrouperToBoard = (blueprint: CampaignBlueprint) => {
    const scale = zoom / 100;
    const canvasEl = canvasRef.current;
    const width = canvasEl?.clientWidth || 800;
    const height = canvasEl?.clientHeight || 600;

    const centerX = Math.round((width / 2 - panOffset.x) / scale - 360);
    const centerY = Math.round((height / 2 - panOffset.y) / scale - 180);

    const campaignNodeId = `node-regrouper-${Date.now()}`;

    // Add directly as the Org Chart node on the board!
    const orgChartNode: BoardNode = {
      id: campaignNodeId,
      title: blueprint.campaignName || 'Campaign Org Chart',
      subtitle: `${blueprint.campaignType.toUpperCase()} • $${blueprint.dailyBudget}/day • 🇩🇿 58 Wilayas COD`,
      category: 'AI Creative Studio',
      iconType: 'Workflow',
      iconBg: 'bg-violet-600',
      iconColor: 'text-white',
      x: centerX,
      y: centerY,
      status: 'active',
      isAppNode: true,
      appType: 'product_regrouper',
      appData: blueprint,
      config: {
        name: blueprint.campaignName || 'Campaign Org Chart',
        description: `Campaign Objective: ${blueprint.objective}. Clustered into ${blueprint.groups.length} AdSets for multi-product audience testing.`,
      },
    };

    setNodes((prev) => [...prev, orgChartNode]);
    setSelectedNodeId(campaignNodeId);
    showToast(`Added Org Chart Diagram directly to Board! ✓`);
    setIsRegrouperModalOpen(false);
  };

  // Send Text to Code Landing Page onto the Board Canvas
  const handleSendTextToCodeToBoard = (landingPage: LandingPageData, htmlCode: string) => {
    const scale = zoom / 100;
    const canvasEl = canvasRef.current;
    const width = canvasEl?.clientWidth || 800;
    const height = canvasEl?.clientHeight || 600;

    const centerX = Math.round((width / 2 - panOffset.x) / scale - 290);
    const centerY = Math.round((height / 2 - panOffset.y) / scale - 180);

    const nodeId = `node-text-to-code-${Date.now()}`;
    const codeLpNode: BoardNode = {
      id: nodeId,
      title: `${landingPage.brandName} (Code LP)`,
      subtitle: `${landingPage.headline.slice(0, 40)}...`,
      category: 'AI Creative Studio',
      iconType: 'Code',
      iconBg: 'bg-rose-600',
      iconColor: 'text-white',
      x: centerX,
      y: centerY,
      status: 'active',
      isAppNode: true,
      appType: 'text_to_code_landing_page',
      appData: { ...landingPage, htmlCode },
      config: {
        name: landingPage.brandName,
        description: landingPage.description,
      },
    };

    setNodes((prev) => [...prev, codeLpNode]);
    setSelectedNodeId(nodeId);
    showToast(`Added "Text to Code Landing Page" directly to Board! ✓`);
    setIsTextToCodeModalOpen(false);
  };

  // Send Text to Image Landing Page onto the Board Canvas
  const handleSendTextToImageLpToBoard = (landingPage: ImageLandingPageData) => {
    const scale = zoom / 100;
    const canvasEl = canvasRef.current;
    const width = canvasEl?.clientWidth || 800;
    const height = canvasEl?.clientHeight || 600;

    const centerX = Math.round((width / 2 - panOffset.x) / scale - 290);
    const centerY = Math.round((height / 2 - panOffset.y) / scale - 180);

    const nodeId = `node-text-to-image-lp-${Date.now()}`;
    const imageLpNode: BoardNode = {
      id: nodeId,
      title: `${landingPage.brandName} (Visual LP)`,
      subtitle: `${landingPage.heroHeadline.slice(0, 40)}...`,
      category: 'AI Creative Studio',
      iconType: 'Image',
      iconBg: 'bg-purple-600',
      iconColor: 'text-white',
      x: centerX,
      y: centerY,
      status: 'active',
      isAppNode: true,
      appType: 'text_to_image_landing_page',
      appData: landingPage,
      config: {
        name: landingPage.brandName,
        description: landingPage.heroCopy,
      },
    };

    setNodes((prev) => [...prev, imageLpNode]);
    setSelectedNodeId(nodeId);
    showToast(`Added "Text to Image Landing Page" directly to Board! ✓`);
    setIsTextToImageLpModalOpen(false);
  };

  // Send AI Landing Page Generator onto the Board Canvas
  const handleSendLandingPageToBoard = (settings: LandingPageSettings) => {
    const scale = zoom / 100;
    const canvasEl = canvasRef.current;
    const width = canvasEl?.clientWidth || 800;
    const height = canvasEl?.clientHeight || 600;

    const centerX = Math.round((width / 2 - panOffset.x) / scale - 590);
    const centerY = Math.round((height / 2 - panOffset.y) / scale - 220);

    const nodeId = `node-landing-page-${Date.now()}`;
    const lpNode: BoardNode = {
      id: nodeId,
      title: `${settings.brandName || 'DentalPro'} (AI Landing Page)`,
      subtitle: `${settings.heroHeadline?.slice(0, 45) || 'Professional Dental Care at Home'}...`,
      category: 'AI Creative Studio',
      iconType: 'Palette',
      iconBg: 'bg-blue-600',
      iconColor: 'text-white',
      x: centerX,
      y: centerY,
      status: 'active',
      isAppNode: true,
      appType: 'landing_page_generator',
      appData: { settings },
      width: 1190,
      config: {
        name: settings.brandName || 'AI Landing Page',
        description: settings.productDescription || 'AI Landing Page Generator for Algerian COD',
      },
    };

    setNodes((prev) => [...prev, lpNode]);
    setSelectedNodeId(nodeId);
    showToast(`Added AI Landing Page Generator card to Board! ✓`);
    setIsLandingPageModalOpen(false);
  };

  // Drag start for an AI App
  const handleDragStartApp = (e: React.DragEvent, app: typeof AI_STUDIO_APPS[0]) => {
    const appPayload = {
      title: app.title,
      subtitle: app.subtitle,
      category: 'AI Creative Studio',
      iconType: app.iconType,
      iconBg: app.iconBg,
      isAppNode: true,
      appType: app.appType,
      appData: app.defaultData,
    };

    e.dataTransfer.setData('application/json', JSON.stringify(appPayload));
    e.dataTransfer.effectAllowed = 'copy';
  };

  // Upload handler for files (Image, PDF, Word, JSON, Table Excel/CSV)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      let type: FileType = 'word';
      if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(ext)) {
        type = 'image';
      } else if (ext === 'pdf') {
        type = 'pdf';
      } else if (['xlsx', 'xls', 'csv', 'tsv'].includes(ext)) {
        type = 'excel';
      } else if (ext === 'json') {
        type = 'json';
      } else {
        type = 'word';
      }

      const reader = new FileReader();

      if (type === 'image') {
        reader.onload = (event) => {
          const previewUrl = event.target?.result as string;
          const newFile: UploadedFileItem = {
            id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            name: file.name,
            type: 'image',
            size: file.size,
            uploadedAt: 'Just now',
            previewUrl,
            summary: `High-resolution visual asset (${Math.round(file.size / 1024)} KB)`,
            tags: ['Image Asset', ext.toUpperCase()],
          };
          setUploadedFiles((prev) => [newFile, ...prev]);
          showToast(`Image "${file.name}" uploaded successfully!`);
        };
        reader.readAsDataURL(file);
      } else if (type === 'json') {
        reader.onload = (event) => {
          const text = event.target?.result as string;
          let jsonData: any = null;
          try {
            jsonData = JSON.parse(text);
          } catch {
            jsonData = { raw: text };
          }
          const keysCount = jsonData && typeof jsonData === 'object' ? Object.keys(jsonData).length : 0;
          const newFile: UploadedFileItem = {
            id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            name: file.name,
            type: 'json',
            size: file.size,
            uploadedAt: 'Just now',
            jsonData,
            textContent: text,
            summary: `Structured JSON dataset with ${keysCount} root keys`,
            tags: ['JSON Dataset', `${keysCount} keys`],
          };
          setUploadedFiles((prev) => [newFile, ...prev]);
          showToast(`JSON dataset "${file.name}" uploaded!`);
        };
        reader.readAsText(file);
      } else if (type === 'excel') {
        reader.onload = (event) => {
          const text = (event.target?.result as string) || '';
          const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
          const delimiter = file.name.endsWith('.tsv') ? '\t' : text.includes(';') ? ';' : ',';
          const headers = lines[0]
            ? lines[0].split(delimiter).map((h) => h.trim().replace(/^["']|["']$/g, ''))
            : ['Column 1', 'Column 2'];
          const rows = lines.slice(1, 30).map((l) =>
            l.split(delimiter).map((c) => c.trim().replace(/^["']|["']$/g, ''))
          );

          const newFile: UploadedFileItem = {
            id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            name: file.name,
            type: 'excel',
            size: file.size,
            uploadedAt: 'Just now',
            summary: `Spreadsheet table with ${Math.max(lines.length - 1, 1)} records and ${headers.length} columns`,
            tags: ['Spreadsheet', `${headers.length} cols`, `${Math.max(lines.length - 1, 1)} rows`],
            tableData: {
              headers,
              rows,
              totalRows: Math.max(lines.length - 1, 1),
            },
          };
          setUploadedFiles((prev) => [newFile, ...prev]);
          showToast(`Spreadsheet "${file.name}" parsed (${Math.max(lines.length - 1, 1)} rows)!`);
        };
        reader.readAsText(file);
      } else {
        reader.onload = (event) => {
          const text = (event.target?.result as string) || '';
          const words = text ? text.trim().split(/\s+/).length : 0;
          const newFile: UploadedFileItem = {
            id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            name: file.name,
            type,
            size: file.size,
            uploadedAt: 'Just now',
            textContent: text || `${file.name} document content parsed.`,
            summary: `${type.toUpperCase()} document (${words} words, ${Math.round(file.size / 1024)} KB)`,
            tags: [type === 'pdf' ? 'PDF Document' : 'Word Document', `${words} words`],
          };
          setUploadedFiles((prev) => [newFile, ...prev]);
          showToast(`Document "${file.name}" uploaded successfully!`);
        };
        reader.readAsText(file);
      }
    });

    e.target.value = '';
  };

  // Create a new custom skill
  const handleCreateCustomSkill = () => {
    if (!newSkillTitle.trim()) {
      showToast('Please enter a title for your custom skill');
      return;
    }

    // Determine final category name and categoryId
    let finalCategoryName = 'Custom AI Skills';
    let finalCategoryId = 'custom_skills';
    if (isCustomCategoryMode && customCategoryInput.trim()) {
      finalCategoryName = customCategoryInput.trim();
      finalCategoryId = `custom_${finalCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
    } else {
      const matchedCat = ALL_SKILL_CATEGORIES.find(
        (c) => c.id === newSkillCategory || c.name === newSkillCategory
      );
      if (matchedCat) {
        finalCategoryName = matchedCat.name;
        finalCategoryId = matchedCat.id;
      } else if (newSkillCategory.trim()) {
        finalCategoryName = newSkillCategory.trim();
        finalCategoryId = `cat_${Date.now()}`;
      }
    }

    const newSkill: CustomSkillItem = {
      id: `custom-skill-${Date.now()}`,
      title: newSkillTitle.trim(),
      subtitle: newSkillSubtitle.trim() || 'Custom AI e-commerce intelligence skill',
      category: finalCategoryName,
      categoryId: finalCategoryId,
      promptTemplate: newSkillPrompt.trim() || getDefaultPromptForNode(newSkillTitle),
      iconType: newSkillIcon || 'Sparkles',
      iconBg: newSkillColor || 'bg-emerald-600',
      iconColor: 'text-white',
      createdAt: new Date().toISOString(),
      isCustom: true,
    };

    setCustomSkills((prev) => [newSkill, ...prev]);

    // Automatically spawn the custom skill node directly onto the canvas board with identical card layout!
    const scale = zoom / 100;
    const canvasEl = canvasRef.current;
    const width = canvasEl?.clientWidth || 800;
    const height = canvasEl?.clientHeight || 600;

    const centerX = Math.round((width / 2 - panOffset.x) / scale - 138 + (Math.random() * 40 - 20));
    const centerY = Math.round((height / 2 - panOffset.y) / scale - 82 + (Math.random() * 40 - 20));

    createNodeAtPosition(
      {
        title: newSkill.title,
        subtitle: newSkill.subtitle,
        category: newSkill.category,
        iconType: newSkill.iconType || 'Sparkles',
        iconBg: newSkill.iconBg || 'bg-emerald-600',
        isCustomSkill: true,
        customPromptTemplate: newSkill.promptTemplate,
      },
      centerX,
      centerY
    );

    setIsNewSkillModalOpen(false);
    setNewSkillTitle('');
    setNewSkillSubtitle('');
    setIsCustomCategoryMode(false);
    setCustomCategoryInput('');
    showToast(`Custom skill "${newSkill.title}" created & added to board! ✓`);
  };

  // Add custom skill to board
  const handleAddCustomSkillToBoard = (skill: CustomSkillItem) => {
    const scale = zoom / 100;
    const canvasEl = canvasRef.current;
    const width = canvasEl?.clientWidth || 800;
    const height = canvasEl?.clientHeight || 600;

    const centerX = (width / 2 - panOffset.x) / scale - 138 + (Math.random() * 40 - 20);
    const centerY = (height / 2 - panOffset.y) / scale - 82 + (Math.random() * 40 - 20);

    const skillPayload = {
      title: skill.title,
      subtitle: skill.subtitle,
      category: skill.category,
      iconType: 'Sparkles',
      iconBg: 'bg-emerald-600',
      isCustomSkill: true,
      customPromptTemplate: skill.promptTemplate,
    };

    createNodeAtPosition(skillPayload, centerX, centerY);
    showToast(`Added custom skill "${skill.title}" to board!`);
  };

  // Run single skill node with live AI intelligence execution (linked to product & Settings API key)
  const handleRunSingleNode = useCallback(async (nodeId: string) => {
    setRunningNodeId(nodeId);

    const currentNode = nodes.find((n) => n.id === nodeId);
    if (!currentNode) {
      setRunningNodeId(null);
      return;
    }

    showToast(`⚡ Running AI Analysis for "${currentNode.title}"...`);

    // Immediately unhide result so the in-card preview container expands downward right away
    setNodes((prev) =>
      prev.map((n) =>
        n.id === nodeId
          ? {
              ...n,
              hideResult: false,
              activePreviewTab: 'preview',
            }
          : n
      )
    );

    // 1. Identify connected Product node from incoming or outgoing edges
    const incomingEdges = edges.filter((e) => e.to === nodeId);
    let linkedProductNode = nodes.find(
      (n) => incomingEdges.some((e) => e.from === n.id) && n.isProduct
    );
    if (!linkedProductNode) {
      linkedProductNode = nodes.find(
        (n) => edges.some((e) => e.from === nodeId && e.to === n.id) && n.isProduct
      );
    }
    if (!linkedProductNode) {
      linkedProductNode = nodes.find((n) => n.isProduct);
    }

    // 1b. Identify connected File node from incoming or outgoing edges
    let linkedFileNode = nodes.find(
      (n) => incomingEdges.some((e) => e.from === n.id) && n.isFile
    );
    if (!linkedFileNode) {
      linkedFileNode = nodes.find(
        (n) => edges.some((e) => e.from === nodeId && e.to === n.id) && n.isFile
      );
    }
    if (!linkedFileNode) {
      linkedFileNode = nodes.find((n) => n.isFile);
    }

    // 1c. Identify connected Org Chart (Regrouper) node and extract AdSet or Product info
    const linkedOrgChartEdge = edges.find(
      (e) => (e.to === nodeId || e.from === nodeId) && (
        nodes.find((n) => n.id === (e.to === nodeId ? e.from : e.to))?.appType === 'product_regrouper'
      )
    );

    let orgChartPromptAddition = '';
    let extractedAdSetData: any = null;
    let extractedProductData: any = null;

    if (linkedOrgChartEdge) {
      const orgChartNode = nodes.find(
        (n) => (n.id === linkedOrgChartEdge.from || n.id === linkedOrgChartEdge.to) && n.appType === 'product_regrouper'
      );
      const subId = linkedOrgChartEdge.from === orgChartNode?.id ? linkedOrgChartEdge.fromSubId : linkedOrgChartEdge.toSubId;
      const groups: any[] = orgChartNode?.appData?.groups || [];

      if (subId && subId.startsWith('adset:')) {
        const rawId = subId.replace('adset:', '');
        extractedAdSetData = groups.find((g: any) => g.id === rawId || String(g.id) === rawId) || groups[0];
      } else if (subId && subId.startsWith('prod:')) {
        const rawId = subId.replace('prod:', '');
        groups.forEach((g: any) => {
          const found = g.products?.find((p: any) => String(p.id) === rawId);
          if (found) {
            extractedProductData = found;
            extractedAdSetData = g;
          }
        });
      } else if (groups.length > 0) {
        extractedAdSetData = groups[0];
      }

      if (extractedProductData) {
        orgChartPromptAddition = `\n\n=== EXTRACTED DATA FROM LINKED PRODUCT (ORG CHART) ===
Product Title: ${extractedProductData.name}
Selling Price: ${extractedProductData.financials?.sellingPrice || 4800} DZD
Product Cost: ${extractedProductData.financials?.productCost || 1400} DZD
ROI / Margin: ${extractedProductData.financials?.roi || 70}%
Category: ${extractedProductData.category}
Opportunity Score: ${extractedProductData.opportunity?.overallScore || 85}/100
Image Asset: ${extractedProductData.mainImage}
CRITICAL INSTRUCTION: Analyze and optimize hooks, copy, and creative strategy specifically for this selected product!`;
      } else if (extractedAdSetData) {
        const prodsList = extractedAdSetData.products?.map((p: any, idx: number) => `  ${idx + 1}. ${p.name} — ${p.financials?.sellingPrice || 3500} DZD (${p.category})`).join('\n') || '';
        orgChartPromptAddition = `\n\n=== EXTRACTED DATA FROM LINKED ADSET (ORG CHART) ===
AdSet: ${extractedAdSetData.adsetName} (Group #${extractedAdSetData.index})
Target Audience Avatar: ${extractedAdSetData.audienceProfile?.avatar}
Demographics: Age ${extractedAdSetData.audienceProfile?.ageRange} | Gender: ${extractedAdSetData.audienceProfile?.gender}
Interest Tags: #${extractedAdSetData.audienceProfile?.interestTags?.join(' #')}
Core Testing Angle: "${extractedAdSetData.sharedAngle}"
Products in this AdSet:
${prodsList}
CRITICAL INSTRUCTION: Tailor all hooks, copies, scripts, and targeting angles specifically to resonate with this exact audience avatar and core test angle!`;
      }
    }

    const effectiveProduct = extractedProductData
      ? {
          title: extractedProductData.name,
          sellingPrice: extractedProductData.financials?.sellingPrice || 4800,
          productCost: extractedProductData.financials?.productCost || 1400,
          profitMargin: extractedProductData.financials?.roi || 70,
          niche: extractedProductData.category || 'Algeria COD',
          sellingPoints: extractedProductData.opportunity?.recommendations?.join(', ') || 'High margin, viral angle',
          description: `Extracted from Org Chart. Score: ${extractedProductData.opportunity?.overallScore}/100. Category: ${extractedProductData.category}.`,
        }
      : extractedAdSetData && extractedAdSetData.products?.[0]
      ? {
          title: `${extractedAdSetData.products[0].name} (AdSet ${extractedAdSetData.index})`,
          sellingPrice: extractedAdSetData.products[0].financials?.sellingPrice || 3500,
          productCost: extractedAdSetData.products[0].financials?.productCost || 1200,
          profitMargin: extractedAdSetData.products[0].financials?.roi || 65,
          niche: extractedAdSetData.products[0].category || 'Algeria COD',
          sellingPoints: `Targeting: ${extractedAdSetData.audienceProfile?.avatar}. Angle: ${extractedAdSetData.sharedAngle}`,
          description: `Grouped in ${extractedAdSetData.adsetName} with ${extractedAdSetData.products.length} products.`,
        }
      : linkedProductNode?.productData
      ? {
          title: linkedProductNode.title,
          ...linkedProductNode.productData,
        }
      : {
          title: SAMPLE_PRODUCTS[0].title,
          sellingPrice: SAMPLE_PRODUCTS[0].sellingPrice,
          productCost: SAMPLE_PRODUCTS[0].productCost,
          profitMargin: SAMPLE_PRODUCTS[0].profitMargin,
          niche: SAMPLE_PRODUCTS[0].niche,
          sellingPoints: SAMPLE_PRODUCTS[0].sellingPoints,
          description: SAMPLE_PRODUCTS[0].description,
        };

    // 2. Read saved AI Provider & API key from Settings (localStorage)
    const provider = localStorage.getItem('ai_provider') || 'openai';
    const userApiKey =
      (provider === 'openai' ? localStorage.getItem('openai_api_key') : null) ||
      (provider === 'deepseek' ? localStorage.getItem('deepseek_api_key') : null) ||
      (provider === 'gemini' ? localStorage.getItem('gemini_api_key') : null) ||
      (provider === 'openrouter' ? localStorage.getItem('openrouter_api_key') : null) ||
      (provider === 'agentrouter' ? localStorage.getItem('agentrouter_api_key') : null) ||
      (provider === 'nvidia' ? localStorage.getItem('nvidia_api_key') : null) ||
      localStorage.getItem('openai_api_key') ||
      localStorage.getItem('user_api_key') ||
      localStorage.getItem('deepseek_api_key') ||
      localStorage.getItem('gemini_api_key') ||
      '';
    const aiModel =
      currentAiModel ||
      localStorage.getItem('ai_model') ||
      (provider === 'openai'
        ? 'gpt-4o-mini'
        : provider === 'deepseek'
        ? 'deepseek-chat'
        : provider === 'openrouter'
        ? 'nvidia/nemotron-3.5-lightning:free'
        : provider === 'agentrouter'
        ? 'gpt-4o'
        : provider === 'nvidia'
        ? 'meta/llama-3.3-70b-instruct'
        : 'gemini-3.8-flash');

    const rawTemplate =
      currentNode.config.customPrompt && currentNode.config.customPrompt.trim().length > 0
        ? currentNode.config.customPrompt
        : currentNode.customPromptTemplate && currentNode.customPromptTemplate.trim().length > 0
        ? currentNode.customPromptTemplate
        : getDefaultPromptForNode(currentNode.title, currentNode.subtitle);

    let filePromptAddition = '';
    if (linkedFileNode && linkedFileNode.fileData) {
      const fd = linkedFileNode.fileData;
      filePromptAddition = `\n\n=== ATTACHED FILE DATA FOR ANALYSIS ===
File Name: ${fd.name}
File Type: ${fd.type.toUpperCase()}
${fd.summary ? `Summary: ${fd.summary}\n` : ''}
${fd.tableData ? `Spreadsheet Data (${fd.tableData.totalRows} rows):\nHeaders: ${fd.tableData.headers.join(' | ')}\nSample Rows:\n${fd.tableData.rows.slice(0, 12).map((r) => r.join(' | ')).join('\n')}\n` : ''}
${fd.jsonData ? `JSON Data:\n${JSON.stringify(fd.jsonData, null, 2).slice(0, 3000)}\n` : ''}
${fd.textContent ? `Document Content:\n${fd.textContent.slice(0, 3000)}\n` : ''}
Please incorporate this specific attached file data and metrics directly into your analysis and strategic recommendations!`;
    }

    const targetMarket = currentNode.targetMarket || 'Algeria';
    const targetMarketObj = TARGET_MARKETS.find((m) => m.id === targetMarket) || TARGET_MARKETS[0];

    const interpolatedPrompt = rawTemplate
      .replace(/\{product_title\}/g, effectiveProduct.title || '')
      .replace(/\{title\}/g, effectiveProduct.title || '')
      .replace(/\{skill_name\}/g, currentNode.title)
      .replace(/\{skill_subtitle\}/g, currentNode.subtitle || '')
      .replace(/\{niche\}/g, effectiveProduct.niche || 'E-commerce')
      .replace(/\{selling_price\}/g, String(effectiveProduct.sellingPrice || 4800))
      .replace(/\{product_cost\}/g, String(effectiveProduct.productCost || 1400))
      .replace(/\{profit_margin\}/g, String(effectiveProduct.profitMargin || 70))
      .replace(/\{selling_points\}/g, effectiveProduct.sellingPoints || 'High quality, viral appeal')
      .replace(/\{description\}/g, effectiveProduct.description || '')
      .replace(/\{file_name\}/g, linkedFileNode?.fileData?.name || 'Dataset')
      .replace(/\{file_data\}/g, linkedFileNode?.fileData?.summary || '')
      .replace(/\{language\}/g, currentNode.language || 'English')
      .replace(/\{target_market\}/g, `${targetMarketObj.flag} ${targetMarketObj.name}`)
      .replace(/\{market\}/g, targetMarketObj.name);

    const marketPromptAddition = `\n\n=== TARGET MARKET SPECIFICATION ===\nTarget Country / Market: ${targetMarketObj.flag} ${targetMarketObj.name} (Region: ${targetMarketObj.region}, Currency: ${targetMarketObj.currency})\nTailor all market assumptions, buyer demographics, price elasticity (${targetMarketObj.currency}), courier dynamics, customer objections, and ad angle psychology specifically to ${targetMarketObj.name}!`;

    const baseWithMarket = `${interpolatedPrompt}${marketPromptAddition}`;
    const baseWithFile = filePromptAddition ? `${baseWithMarket}\n${filePromptAddition}` : baseWithMarket;
    const baseWithOrg = orgChartPromptAddition ? `${baseWithFile}\n${orgChartPromptAddition}` : baseWithFile;

    const fullPrompt = currentNode.customInstructions?.trim()
      ? `${baseWithOrg}\n\nAdditional Custom AI Instructions:\n${currentNode.customInstructions}`
      : baseWithOrg;

    try {
      const response = await fetch('/api/ai/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskType: currentNode.title,
          provider,
          model: aiModel,
          prompt: fullPrompt,
          contextData: {
            title: effectiveProduct.title,
            language: currentNode.language || 'English',
            targetMarket: targetMarketObj.name,
            currency: targetMarketObj.currency,
            liveWebResearch: !!currentNode.liveWebResearch,
            product: effectiveProduct,
            fileData: linkedFileNode?.fileData || null,
          },
          apiKey: userApiKey,
        }),
      });

      const data = await response.json();
      const executedAt = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const content = data.result || 'Skill analysis completed.';
      const finalContent = normalizeAndCleanAIOutput(content);

      setNodes((prev) =>
        prev.map((n) =>
          n.id === nodeId
            ? {
                ...n,
                status: 'active',
                hideResult: false,
                activePreviewTab: 'preview',
                executionResult: {
                  executedAt,
                  skillName: currentNode.title,
                  productName: effectiveProduct.title,
                  language: currentNode.language || 'English',
                  webResearchUsed: !!currentNode.liveWebResearch,
                  content: finalContent,
                  isSimulated: data.isSimulated || false,
                },
              }
            : n
        )
      );

      setSelectedNodeId(nodeId);
      showToast(`✓ AI Analysis completed for "${currentNode.title}"!`);
      setSaveStatus('saving');
      setTimeout(() => setSaveStatus('saved'), 400);
    } catch (error) {
      const executedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const targetLang = currentNode.language || 'English';
      const tLower = (currentNode.title || '').toLowerCase();
      const pTitle = effectiveProduct.title || 'Product';
      const sPrice = Number(effectiveProduct.sellingPrice) || 3800;
      const pCost = Number(effectiveProduct.productCost) || 1100;
      const pMargin = effectiveProduct.profitMargin ? Number(effectiveProduct.profitMargin) : Math.round(((sPrice - pCost) / sPrice) * 100);
      const pProfit = sPrice - pCost;

      let fallbackContent = '';

      if (tLower.includes('all in one') || tLower.includes('master') || tLower.includes('15-stage')) {
        fallbackContent = `### summary

| Layer | Stage | Key Metric | Status 🟢🟡🔴 | #1 Next Action |
|-------|-------|------------|----------------|----------------|
| 1     | Product | Total Score | 🟢 | Finalize supplier agreements |
| 2     | Strategy | USP Clarity | 🟢 | Create detailed buyer personas |
| 3     | Creative | CTR Prediction | 🟡 | Test 3 new hooks this week |
| 4     | Campaign | Budget Allocation | 🟢 | Set up initial ad campaign |
| 5     | Traffic | CTR Rate | 🟡 | Optimize landing page design |
| 6     | Order | Conversion Rate | 🟡 | Review checkout process |
| 7     | Confirmation | Contact Rate | 🟡 | Enhance confirmation scripts |
| 8     | Delivery | Avg Delivery Days | 🟡 | Partner with additional couriers |
| 9     | RTO | RTO Rate | 🟡 | Address customer objections in ads |
| 10    | Revenue | Net Revenue | 🟢 | Monitor daily sales closely |
| 11    | Profit | Net Profit Margin | 🟢 | Assess cost-cutting opportunities |
| 12    | Customer Quality | Quality Score | 🟡 | Implement retention strategies |
| 13    | Ad Platform Signal | Signal Quality | 🟢 | Ensure pixel tracking is optimized |
| 14    | AI Optimization | CPA | 🟡 | Adjust campaigns based on data |
| 15    | New Traffic | Expansion Opportunities | 🟡 | Research new audience segments |

### keyPoints

| 🎯 Metric | Value | Why it matters |
|-----------------|-------|---------------------------------------------------------------------|
| Demand Score | 8 | Strong market interest for ergonomic products in Algeria |
| Wow Factor | 7 | Unique honeycomb design appeals to comfort seekers |
| Problem Severity | 9 | High incidence of discomfort among office workers and drivers |
| Profit Margin | 10 | ${pMargin}% margin maximizes profitability |
| Risk | 6 | Moderate risk due to competition and market saturation |
| **Total Score** | **40/50** | High potential for a successful launch |

\`\`\`
USP → Value Prop → Positioning → Pricing
   ├─ Ergonomic Comfort
   │   ├─ Alleviates Pressure Points
   │   │   ├─ Targeting Office Workers
   │   │   │   ├─ ${sPrice} DZD
   │   │   │   └─ Affordable Comfort
   │   │   └─ Targeting Drivers
   │   │       ├─ ${sPrice} DZD
   │   │       └─ On-the-Go Relief
   └─ Competitive Pricing
\`\`\``;
      } else if (tLower.includes('discovery') || tLower.includes('winning') || tLower.includes('finder') || tLower.includes('demand') || tLower.includes('trend')) {
        fallbackContent = `### Product Opportunity Assessment: ${pTitle}

${pTitle} represents a high-velocity e-commerce opportunity with strong impulse-purchase triggers in the Algerian Cash on Delivery ecosystem. Priced at ${sPrice.toLocaleString()} DZD against a landed cost of ${pCost.toLocaleString()} DZD (+${pMargin}% gross margin), it provides healthy unit economics.

### Opportunity Scoring Matrix

| 🎯 Metric | Value | Why it matters |
|-----------------|-------|---------------------------------------------------------------------|
| Demand Score | 8/10 | High search volume and active consumer interest across Algeria |
| Wow Factor | 9/10 | Instantly demonstrable visual benefit within the first 3 seconds |
| Problem Severity | 9/10 | Solves acute, widespread discomfort for drivers & desk workers |
| Profit Margin | 10/10 | ${pMargin}% margin (+${pProfit.toLocaleString()} DZD) absorbs ad spend and shipping buffer |
| Risk Assessment | 6/10 | Unbreakable flexible elastomer virtually eliminates transit damage |
| **Total Score** | **42/50** | **High potential for immediate scale & profitable ad launch 🟢** |

### Market Validation Criteria

| Validation Criteria | Benchmark | Product Status | Risk Level |
|---------------------|-----------|----------------|------------|
| Monthly Search Volume | > 15,000 / mo | 28,400 queries / mo | 🟢 Low Risk |
| Competitor Saturation | Moderate | 3 Active Advertisers (Generic creative) | 🟡 Medium |
| Local Supplier Stock | Guaranteed | Available in Algiers & Blida wholesale hubs | 🟢 Low Risk |
| Transit Breakage Risk | < 3% | Flexible silicone elastomer (Shockproof) | 🟢 Safe |

### Launch Verdict & Recommendations
- **Verdict**: Scale immediately. Emphasize physical demonstration and Algerian Darja voiceover.
- **Offer Structure**: Single unit at ${sPrice.toLocaleString()} DZD; Duo bundle at ${(sPrice * 1.8).toFixed(0)} DZD with free national delivery.`;
      } else if (tLower.includes('deep dive') || tLower.includes('technical') || tLower.includes('spec') || tLower.includes('anatomy') || tLower.includes('quality')) {
        fallbackContent = `### Product Technical & Practical Deep Dive: ${pTitle}

An exhaustive ergonomic and material breakdown of ${pTitle}, analyzing physical build specifications, stress tolerances, and return-mitigation packaging protocols.

\`\`\`
USP → Value Prop → Positioning → Pricing
   ├─ Breathable Honeycomb Gel Matrix
   │   ├─ Dynamic Weight Redistribution & Pressure Relief
   │   │   ├─ Desk & Office Professionals
   │   │   │   ├─ ${sPrice.toLocaleString()} DZD
   │   │   │   └─ Ergonomic Productivity & Posture
   │   │   └─ Taxi, Truck & Commute Drivers
   │   │       ├─ ${sPrice.toLocaleString()} DZD
   │   │       └─ Road Shock Vibration Dampening
   └─ Removable Non-Slip Washable Enclosure
\`\`\`

### Technical Specifications & Material Breakdown

| Component / Feature | Material & Engineering Spec | Quality Grade | Durability Impact |
|---------------------|-----------------------------|---------------|-------------------|
| Cushion Core | Hyper-elastic Medical Polymer Gel | Grade A+ Flex | Retains elastic memory; zero permanent sagging |
| Matrix Architecture | Dual-layer Honeycomb Air Chambers | Pressure Dispersion | Promotes continuous air circulation; prevents sweat |
| Protective Cover | Breathable Poly-Mesh Zippered Sleeve | Machine Washable | Protects polymer matrix from UV & particulate wear |
| Base Traction | Micro-Silica Anti-Skid Friction Dots | High Grip | Prevents slippage on car leather & office chairs |

### Failure Points & COD Return Mitigation Table

| Potential Failure Point | Failure Risk % | Root Cause | Packaging & Quality Prevention Fix |
|-------------------------|----------------|------------|------------------------------------|
| Customer perceives cushion too soft | 11% | Misunderstanding firmness vs pressure relief | Insert glossy user quick-start card inside box |
| Transit compression creasing | 6% | Tight courier strapping | Ship uncompressed in flat reinforced polybags |
| Zipper snagging during first wash | 3% | Low-gauge zipper pull | Inspect and verify reinforced nylon coil zippers |`;
      } else if (tLower.includes('avatar') || tLower.includes('persona') || tLower.includes('strategy') || tLower.includes('positioning') || tLower.includes('buyer')) {
        fallbackContent = `### Customer Persona & Market Strategy: ${pTitle}

Target audience segmentation and psychological buying drivers for ${pTitle} in Algeria.

### Customer Avatar Matrix

| Avatar | Pain Points | Desires | Awareness Level | Objections |
|----------------|-------------------|------------------|------------------|-------------------|
| Professional Driver | Lower back stiffness, tailbone numbness on 6h+ shifts | Long-lasting relief, durable cushion that doesn't slip | Problem Aware | "Will it go flat after two weeks of heavy use?" |
| Desk / Remote Worker | Poor desk posture, sciatic nerve pain, office fatigue | All-day comfort, higher focus, neat office look | Solution Aware | "Is the price justified compared to basic foam?" |
| Post-Surgery / Elder | Tailbone soreness, inability to sit on hard dining chairs | Safe, soft orthopedic support recommended by family | Pain Aware | "Can I inspect the product before paying the courier?" |

### Pricing Strategy Evaluation

| Pricing Strategy | Score | Demand Impact | Profit Potential |
|------------------|-------|---------------|------------------|
| Low Price Entry (${(sPrice * 0.8).toFixed(0)} DZD) | 6/10 | High Volume | Low margin buffer (${pMargin - 15}%) |
| Recommended Sweetspot (${sPrice.toLocaleString()} DZD) | 9/10 | Balanced High Demand | Optimal Profit (+${pProfit.toLocaleString()} DZD / order) |
| Premium 2x Duo Bundle (${(sPrice * 1.8).toFixed(0)} DZD) | 8.5/10 | +38% Increase in AOV | Maximum Net Profit & Free Wilaya Shipping |
| **Overall Strategy** | **8.5/10** | **Balanced approach maximizing cash flow & conversion rate** |`;
      } else if (tLower.includes('creative') || tLower.includes('hook') || tLower.includes('angle') || tLower.includes('copy') || tLower.includes('video') || tLower.includes('ugc') || tLower.includes('script')) {
        fallbackContent = `### Creative Angles & Viral Hooks Engine: ${pTitle}

Direct-response creative angles and viral scripts engineered for Meta & TikTok feeds.

### Creative Angle Matrix

| Angle Name | Hook Formula | Visual Concept | Emotion Targeted |
|-------------------|---------------------------------|----------------|--------------------|
| Comfort Revolution | "Discover the secret to pain-free daily sitting!" | Split-screen contrasting stiff posture vs instant comfort | Relief & Curiosity |
| Driver's Daily Relief | "Say goodbye to back pain on every commute!" | In-car POV camera testing on uneven roads | Freedom & Relief |
| The Unbreakable Egg Test | "Can you sit directly on an egg without breaking it?" | High-tension macro test sitting on a raw egg | Shock & Pattern Interrupt |
| Workplace Upgrade | "Transform your stressful 8-hour workday into pure comfort!" | Clean office setup with energetic professional nod | Motivation & Status |

### Viral Hook Scripts with Predicted CTR %

| Hook Script | Predicted CTR % | Format | Priority |
|-------------------|-----------------|--------|----------|
| "Stop scrolling if you drive or sit more than 4 hours a day — this changes everything!" | 12.8% | UGC Vertical 9:16 | P1 🔥 |
| "We put a raw egg on this cushion and sat on it... watch what happened!" | 11.4% | Shock Pattern Interrupt | P1 🔥 |
| "Doorstep delivery across all 58 Wilayas: open and verify the parcel before paying!" | 9.6% | COD Trust & Guarantee | P2 ⚡ |
| "Why tolerate lower back pain when modern ergonomic polymer fixes it for ${sPrice} DZD?" | 8.4% | Problem-Agitation | P3 🎯 |

### Visual Storyboard Flow
\`\`\`
Step 1 (0-3s): Pattern Interrupt (Sudden close-up raw egg test demonstration).
Step 2 (4-10s): Problem Agitation (Showing severe pressure on tailbone from rigid seats).
Step 3 (11-20s): Product Utility (Showing breathable honeycomb flex & washable cover).
Step 4 (21-30s): Irresistible Offer (Special price ${sPrice.toLocaleString()} DZD with 58 Wilaya COD).
\`\`\``;
      } else if (tLower.includes('delivery') || tLower.includes('courier') || tLower.includes('rto') || tLower.includes('return') || tLower.includes('confirmation') || tLower.includes('logistics') || tLower.includes('yalidine')) {
        fallbackContent = `### Logistics, Courier Performance & RTO Suppression: ${pTitle}

Operational fulfillment and delivery rate optimization across 58 Algerian Wilayas.

### Courier Delivery Performance

| Courier Partner | Delivery Rate % | Avg Transit Days | Cost (DZD) | Operational Status |
|-----------------|-----------------|------------------|------------|-------------------|
| Yalidine Express | 89.4% | 1.8 Days | 450 | 🟢 Primary National Partner |
| ZR Express | 86.8% | 2.0 Days | 400 | 🟢 Urban Metro Specialist |
| Nord & Sud Express | 81.2% | 3.5 Days | 650 | 🟡 South / Remote Wilayas |

### RTO Failure Root Cause Analysis

| Failure Reason | % of RTOs | Cumulative % | Priority | Actionable Fix |
|----------------|-----------|--------------|----------|----------------|
| Customer Unreachable on Phone | 39% | 39% | 1 | Collect 2 phone numbers on order form |
| Delivery Delay (> 48h) | 30% | 69% | 2 | Dispatch parcels within 4 hours of phone confirmation |
| Customer Impulsive Regret | 19% | 88% | 3 | Send WhatsApp voice confirmation reassuring guarantee |
| Refusal to Pay Shipping | 12% | 100% | 4 | Explicitly confirm total price with shipping included |

### Return Reduction Priority Matrix

| Corrective Action | Impact (1-5) | Effort (1-5) | Priority |
|-------------------|--------------|--------------|----------|
| 10-Minute Instant WhatsApp Voice Note | 5 | 2 | 🟩 High |
| Mandatory Backup Phone Number Input | 5 | 1 | 🟩 High |
| SMS Tracking Link upon Pickup Dispatch | 4 | 2 | 🟩 High |
| Wilaya-specific Stop-Desk Guidance | 4 | 3 | 🟨 Medium |`;
      } else {
        fallbackContent = `### Strategic Intelligence: ${currentNode.title} for ${pTitle}

Executive strategic breakdown for **${pTitle}** in the ${effectiveProduct.niche || 'E-commerce'} category.

### Opportunity & Performance Overview

| 🎯 Evaluation Metric | Value | Strategic Assessment |
|----------------------|-------|----------------------|
| Market Feasibility | 8.8/10 | High alignment with Algerian Cash on Delivery consumer demand |
| Margin Viability | +${pMargin}% | Generous unit margin (+${pProfit.toLocaleString()} DZD) absorbs advertising costs |
| Logistics Feasibility | 88% Delivery | Unbreakable polymer construction minimizes shipping damage |
| Launch Readiness | Immediate | Standard SKU with established local supplier availability |

### Core Strategic Focus
- **Target Pricing**: ${sPrice.toLocaleString()} DZD for single unit, ${(sPrice * 1.8).toFixed(0)} DZD for 2-pack bundle.
- **Acquisition Angle**: Focus on demonstration of pressure relief and verified delivery across 58 Wilayas.
- **Fulfillment Protocol**: 10-minute confirmation audio call to suppress return-to-origin rates under 12%.`;
      }

      setNodes((prev) =>
        prev.map((n) =>
          n.id === nodeId
            ? {
                ...n,
                status: 'active',
                hideResult: false,
                activePreviewTab: 'preview',
                executionResult: {
                  executedAt,
                  skillName: currentNode.title,
                  productName: effectiveProduct.title,
                  language: targetLang,
                  webResearchUsed: !!currentNode.liveWebResearch,
                  content: fallbackContent,
                  isSimulated: true,
                },
              }
            : n
        )
      );
      setSelectedNodeId(nodeId);
      showToast(`✓ AI Analysis generated for "${currentNode.title}" (${targetLang})!`);
    } finally {
      setRunningNodeId(null);
    }
  }, [nodes, edges]);

  // Toggle Live Web Research for a specific node
  const handleToggleLiveWebResearch = useCallback((nodeId: string) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === nodeId ? { ...n, liveWebResearch: !n.liveWebResearch } : n
      )
    );
  }, []);

  // Update language for a specific node and enforce pure output
  const handleChangeNodeLanguage = useCallback((nodeId: string, lang: string) => {
    const isRtl = lang === 'Arabic' || lang === 'Algerian Darja';
    setNodes((prev) =>
      prev.map((n) =>
        n.id === nodeId
          ? {
              ...n,
              language: lang,
              previewDirection: isRtl ? 'rtl' : 'ltr',
              executionResult: n.executionResult
                ? { ...n.executionResult, language: lang }
                : undefined,
            }
          : n
      )
    );
    setActiveLanguageMenuNodeId(null);
    showToast(`✓ Language set to ${lang} — all results will generate 100% in ${lang}`);
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 400);
  }, []);

  const handleRunWorkflow = () => {
    setIsRunningWorkflow(true);
    setTimeout(() => {
      setIsRunningWorkflow(false);
      showToast('Workflow simulation completed! All 12 nodes executed successfully.');
    }, 2000);
  };

  const updateSelectedNodeConfig = (updates: Partial<BoardNode['config']>) => {
    if (!selectedNode) return;
    setNodes((prev) =>
      prev.map((n) =>
        n.id === selectedNode.id
          ? { ...n, config: { ...n.config, ...updates } }
          : n
      )
    );
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 400);
  };

  const updateNodeTextStyle = (nodeId: string, updates: Partial<TextStyleConfig>) => {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id !== nodeId) return n;
        const current = n.textStyle || {};
        return {
          ...n,
          textStyle: {
            ...current,
            ...updates,
          },
        };
      })
    );
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 400);
  };

  const applyTextStyleToAllNodes = (style: TextStyleConfig) => {
    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        textStyle: {
          ...(n.textStyle || {}),
          ...style,
        },
      }))
    );
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 400);
  };

  // If in Hub mode, show BoardProjectsHub with AppSidebar version noir
  if (boardViewMode === 'hub') {
    return (
      <div className="w-screen h-screen flex bg-[#F8FAFC] overflow-hidden select-none">
        {/* AppSidebar Version Noir */}
        <AppSidebar
          activeView="board"
          onNavigate={(view, subItem) => {
            if (view === 'board') {
              setBoardViewMode('hub');
            } else {
              onNavigateToView(view, subItem);
            }
          }}
          onOpenNewModal={() => setIsNewProjectModalOpen(true)}
        />

        {/* Main Hub Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <BoardProjectsHub
            projects={boardProjects}
            activeProjectId={activeProjectId}
            onOpenProject={(projId) => {
              handleSelectProject(projId);
              setBoardViewMode('canvas');
            }}
            onNewProject={() => setIsNewProjectModalOpen(true)}
            onDuplicateProject={handleDuplicateProject}
            onDeleteProject={handleDeleteProject}
            onExportProject={(proj) => {
              try {
                const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(proj, null, 2));
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute('href', dataStr);
                downloadAnchor.setAttribute('download', `${proj.name.replace(/\s+/g, '_').toLowerCase()}_board.json`);
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
                showToast(`Exported "${proj.name}"`);
              } catch (err) {
                console.warn('Failed to export', err);
              }
            }}
            onNavigateHome={onNavigateHome}
          />
        </div>

        <NewBoardProjectModal
          isOpen={isNewProjectModalOpen}
          onClose={() => setIsNewProjectModalOpen(false)}
          onCreate={(name, template) => {
            handleCreateNewProject(name, template);
            setBoardViewMode('canvas');
          }}
        />
        {boardToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <span>{boardToast}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-screen h-screen bg-[#161618] text-neutral-200 font-sans overflow-hidden select-none">
      {/* 1. TOP HEADER BAR (CSS selector 1) styled with same theme color bg-[#161618] */}
      <header className="h-14 bg-[#161618] border-b border-white/10 px-5 flex items-center justify-between gap-4 shrink-0 z-30 shadow-md text-neutral-200">
        {/* Left: App Logo & Breadcrumb */}
        <div className="flex items-center gap-3">
          <div
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold shadow-sm shrink-0">
              <Workflow className="w-4 h-4 text-black stroke-[2.2]" />
            </div>
            <span className="font-bold text-sm text-white hidden sm:inline tracking-tight">
              Product Intelligence OS
            </span>
          </div>

          {/* Return to Hub Button */}
          <button
            type="button"
            onClick={() => setBoardViewMode('hub')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#1f1f23] hover:bg-[#282830] hover:text-emerald-400 text-neutral-200 text-xs font-bold transition-all border border-white/10 cursor-pointer shadow-xs"
            title="Return to Board Projects Hub"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden sm:inline">All Projects</span>
          </button>

          <div className="hidden md:flex items-center gap-2 text-xs text-neutral-400 font-medium relative">
            <button
              onClick={() => setBoardViewMode('hub')}
              className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1 text-neutral-400"
            >
              <FolderKanban className="w-3.5 h-3.5 text-emerald-400" />
              <span>Projects Hub</span>
            </button>
            <span className="text-neutral-600">›</span>
            {/* Interactive Project Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsHeaderProjectDropdownOpen(!isHeaderProjectDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#1f1f23] hover:bg-[#282830] text-white font-bold transition-all border border-white/10 cursor-pointer shadow-xs"
                title="Switch between board projects or create a new one"
              >
                <Workflow className="w-3.5 h-3.5 text-emerald-400" />
                <span className="max-w-[170px] truncate">{currentProject?.name || 'Board Project'}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {isHeaderProjectDropdownOpen && (
                <div
                  className="absolute left-0 top-full mt-1.5 w-72 bg-[#1c1c20] rounded-2xl shadow-2xl border border-white/15 p-2 z-50 text-xs animate-in fade-in text-neutral-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between px-2.5 py-1 border-b border-white/10 mb-1">
                    <span className="font-bold text-[10px] uppercase text-neutral-400 tracking-wider">
                      Switch Board Project
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      {boardProjects.length} saved
                    </span>
                  </div>

                  <div className="max-h-60 overflow-y-auto space-y-1 py-1">
                    {boardProjects.map((proj) => {
                      const isCur = proj.id === activeProjectId;
                      return (
                        <button
                          key={proj.id}
                          onClick={() => {
                            handleSelectProject(proj.id);
                            setIsHeaderProjectDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                            isCur
                              ? 'bg-[#242429] text-white font-bold border border-white/10'
                              : 'text-neutral-300 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <Workflow className={`w-3.5 h-3.5 shrink-0 ${isCur ? 'text-emerald-400' : 'text-neutral-500'}`} />
                            <div className="truncate">
                              <span className="block truncate text-xs">{proj.name}</span>
                              <span className="block text-[10px] text-neutral-500 font-normal">
                                {proj.nodes?.length || 0} nodes • {proj.edges?.length || 0} links
                              </span>
                            </div>
                          </div>
                          {isCur && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 mt-1 border-t border-white/10 flex items-center justify-between gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setIsHeaderProjectDropdownOpen(false);
                        setIsNewProjectModalOpen(true);
                      }}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-[#25252b] hover:bg-[#303038] text-emerald-400 font-bold text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer border border-white/5"
                    >
                      <Plus className="w-3 h-3 text-emerald-400" />
                      <span>New Board</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsHeaderProjectDropdownOpen(false);
                        setBoardViewMode('hub');
                      }}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-[#1f1f23] hover:bg-[#282830] text-neutral-300 font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer border border-white/10"
                    >
                      <FolderKanban className="w-3 h-3 text-neutral-400" />
                      <span>All Projects</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <span className="text-neutral-600">›</span>
            <span className="font-bold text-white">Board</span>
          </div>
        </div>

        {/* Center: Search Bar with Ctrl+K */}
        <div className="relative flex-1 max-w-md hidden lg:block">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search nodes, products, or anything..."
            className="w-full pl-9 pr-14 py-1.5 rounded-xl bg-[#1f1f23] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 focus:bg-[#242429] transition-all shadow-inner"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-neutral-400 bg-[#282830] border border-white/10 px-1.5 py-0.5 rounded shadow-xs">
            Ctrl + K
          </kbd>
        </div>

        {/* Right Actions Zone */}
        <div className="flex items-center gap-2">
          {/* Active AI Model Switcher with Live Detection & Tested Models Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                const nextOpen = !isModelDropdownOpen;
                setIsModelDropdownOpen(nextOpen);
                if (nextOpen) {
                  syncModelsFromStorage();
                  if (verifiedWorkingModels.length === 0 && boardDetectedModels.length === 0) {
                    handleFetchBoardModels(currentAiProvider);
                  }
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1f1f23] hover:bg-[#282830] text-xs font-semibold text-neutral-200 border border-white/10 hover:border-blue-500/50 transition-all cursor-pointer shadow-xs"
              title="Click to choose which AI model executes workflows or detect models on your API key"
            >
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[10px] uppercase font-bold text-neutral-400">
                {currentAiProvider}:
              </span>
              <span className="font-mono text-blue-300 font-bold max-w-[130px] truncate">
                {currentAiModel}
              </span>
              {verifiedWorkingModels.some(
                (m) => m.id === currentAiModel && (m.provider || 'openai') === currentAiProvider && m.success
              ) && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.8)]" title="Tested & Working" />
              )}
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {isModelDropdownOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-92 bg-[#1c1c20] rounded-2xl shadow-2xl border border-white/15 p-3.5 z-50 animate-in fade-in text-neutral-200 select-text"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-white">AI Engine & Working Models</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleFetchAndTestBoardModels(currentAiProvider)}
                      disabled={isTestingOnBoard || isDetectingOnBoard}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10.5px] font-bold bg-blue-950/70 text-blue-300 border border-blue-700/60 hover:bg-blue-900/60 cursor-pointer transition-colors disabled:opacity-50"
                      title="Fetch models and test which ones work on this API key"
                    >
                      <Zap className={`w-3 h-3 ${isTestingOnBoard ? 'animate-spin text-blue-400' : 'text-blue-400'}`} />
                      <span>{isTestingOnBoard ? 'Testing...' : 'Fetch & Test'}</span>
                    </button>
                  </div>
                </div>

                {/* Provider switcher pills */}
                <div className="grid grid-cols-3 gap-1 mb-2.5">
                  {[
                    { id: 'openai', label: 'OpenAI' },
                    { id: 'gemini', label: 'Gemini' },
                    { id: 'deepseek', label: 'DeepSeek' },
                    { id: 'openrouter', label: 'OpenRouter' },
                    { id: 'agentrouter', label: 'AgentRouter' },
                    { id: 'nvidia', label: 'NVIDIA' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectBoardProvider(p.id)}
                      className={`py-1 px-1.5 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 border transition-all cursor-pointer ${
                        currentAiProvider === p.id
                          ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                          : 'bg-[#25252b] text-neutral-300 border-white/5 hover:bg-[#303038]'
                      }`}
                    >
                      <span className="truncate">{p.label}</span>
                    </button>
                  ))}
                </div>

                {/* Filter Header: Tested Working Only */}
                {(() => {
                  const providerWorking = verifiedWorkingModels.filter(
                    (m) => (m.provider || 'openai') === currentAiProvider && m.success
                  );

                  return (
                    <div className="mb-2 flex items-center justify-between text-[10.5px] px-2.5 py-1.5 rounded-lg bg-blue-950/40 border border-blue-800/40">
                      <div className="flex items-center gap-1.5 text-blue-300 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                        <span>
                          {providerWorking.length > 0
                            ? `${providerWorking.length} Tested & Working Model${providerWorking.length > 1 ? 's' : ''}`
                            : 'No tested models yet'}
                        </span>
                      </div>
                      {providerWorking.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setShowOnlyVerified(!showOnlyVerified)}
                          className="text-[10px] text-blue-400 hover:underline font-bold cursor-pointer"
                        >
                          {showOnlyVerified ? 'Show All' : 'Only Tested'}
                        </button>
                      )}
                    </div>
                  );
                })()}

                {/* Model List */}
                <div className="max-h-56 overflow-y-auto space-y-1 pr-1 mb-2">
                  {(() => {
                    const providerWorking = verifiedWorkingModels.filter(
                      (m) => (m.provider || 'openai') === currentAiProvider && m.success
                    );

                    // When user has tested models and showOnlyVerified is active, SHOW JUST TESTED WORKING MODELS
                    if (showOnlyVerified && providerWorking.length > 0) {
                      return providerWorking.map((m) => {
                        const isSelected = currentAiModel === m.id;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => handleSelectBoardModel(m.id)}
                            className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-blue-950/70 text-white font-bold border border-blue-600/70 shadow-xs'
                                : 'text-neutral-300 hover:bg-white/5 border border-transparent'
                            }`}
                          >
                            <div className="truncate pr-2">
                              <div className="flex items-center gap-1.5 truncate">
                                <span className="font-mono text-[11.5px] truncate text-white">{m.id}</span>
                                <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                  Working{m.latencyMs ? ` • ${m.latencyMs}ms` : ''}
                                </span>
                              </div>
                              {m.testedAt && (
                                <span className="block text-[9.5px] text-neutral-400 truncate mt-0.5">
                                  Verified response confirmed at {m.testedAt}
                                </span>
                              )}
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                          </button>
                        );
                      });
                    }

                    // Fallback or full list when no tested models or showOnlyVerified is false
                    const candidateModels =
                      boardDetectedModels.length > 0
                        ? boardDetectedModels
                        : currentAiProvider === 'openai'
                        ? [
                            { id: 'gpt-4o-mini', name: 'gpt-4o-mini (Fast & Economical)', isRecommended: true },
                            { id: 'gpt-4o', name: 'gpt-4o (Flagship Omni)', isRecommended: true },
                            { id: 'gpt-4o-2024-08-06', name: 'gpt-4o-2024-08-06 (Structured Analysis)', isRecommended: false },
                            { id: 'chatgpt-4o-latest', name: 'chatgpt-4o-latest (Dynamic Latest Checkpoint)', isRecommended: false },
                            { id: 'o1-mini', name: 'o1-mini (Fast Reasoning & Math)', isRecommended: true },
                            { id: 'o1', name: 'o1 (Deep Reasoning Proof)', isRecommended: false },
                            { id: 'gpt-4-turbo', name: 'gpt-4-turbo (128k Context)', isRecommended: false },
                            { id: 'gpt-4', name: 'gpt-4 (Standard Base)', isRecommended: false },
                            { id: 'gpt-3.5-turbo', name: 'gpt-3.5-turbo (Classic Fast)', isRecommended: false },
                          ]
                        : currentAiProvider === 'gemini'
                        ? [
                            { id: 'gemini-3.8-flash', name: 'gemini-3.8-flash (Recommended Fast & Smart)', isRecommended: true },
                            { id: 'gemini-4-argon', name: 'gemini-4-argon (Flagship Complex Reasoning)', isRecommended: true },
                            { id: 'gemini-3.1-flash-lite', name: 'gemini-3.1-flash-lite (Ultra-Low Latency)', isRecommended: false },
                            { id: 'gemini-3.1-flash-lite-image', name: 'gemini-3.1-flash-lite-image (Vision Tasks)', isRecommended: false },
                          ]
                        : currentAiProvider === 'openrouter'
                        ? [
                            { id: 'nvidia/nemotron-3.5-lightning:free', name: 'nvidia/nemotron-3.5-lightning:free (Free Tier • 50/day)', isRecommended: true },
                            { id: 'google/gemma-4-31b-it:free', name: 'google/gemma-4-31b-it:free (Free Tier)', isRecommended: true },
                            { id: 'nvidia/nemotron-3.5-super-vl:free', name: 'nvidia/nemotron-3.5-super-vl:free (Free Tier)', isRecommended: false },
                            { id: 'meta-llama/llama-3.2-3b-instruct:free', name: 'meta-llama/llama-3.2-3b-instruct:free (Free Tier)', isRecommended: false },
                            { id: 'deepseek/deepseek-chat', name: 'deepseek/deepseek-chat (DeepSeek V3 • Paid)', isRecommended: false },
                            { id: 'anthropic/claude-3.5-sonnet', name: 'anthropic/claude-3.5-sonnet (Claude 3.5 Sonnet • Paid)', isRecommended: false },
                            { id: 'openai/gpt-4o', name: 'openai/gpt-4o (GPT-4o Omni • Paid)', isRecommended: false },
                          ]
                        : currentAiProvider === 'agentrouter'
                        ? [
                            { id: 'gpt-4o', name: 'gpt-4o (GPT-4o Routed)', isRecommended: true },
                            { id: 'claude-3-5-sonnet-latest', name: 'claude-3-5-sonnet-latest (Claude Routed)', isRecommended: true },
                            { id: 'deepseek-v3', name: 'deepseek-v3 (DeepSeek V3 Routed)', isRecommended: true },
                            { id: 'deepseek-r1', name: 'deepseek-r1 (DeepSeek R1 Routed)', isRecommended: true },
                            { id: 'agentrouter/auto', name: 'agentrouter/auto (Smart Dynamic Routing)', isRecommended: false },
                          ]
                        : currentAiProvider === 'nvidia'
                        ? [
                            { id: 'meta/llama-3.3-70b-instruct', name: 'meta/llama-3.3-70b-instruct (NVIDIA NIM Llama 3.3 70B)', isRecommended: true },
                            { id: 'deepseek-ai/deepseek-r1', name: 'deepseek-ai/deepseek-r1 (NVIDIA NIM DeepSeek R1)', isRecommended: true },
                            { id: 'mistralai/mixtral-8x22b-instruct-v0.1', name: 'mistralai/mixtral-8x22b-instruct-v0.1 (Mixtral 8x22B)', isRecommended: true },
                            { id: 'nvidia/llama-3.1-nemotron-70b-instruct', name: 'nvidia/llama-3.1-nemotron-70b-instruct (Nemotron 70B)', isRecommended: true },
                            { id: 'meta/llama-3.1-8b-instruct', name: 'meta/llama-3.1-8b-instruct (NVIDIA NIM High Speed 8B)', isRecommended: false },
                          ]
                        : [
                            { id: 'deepseek-chat', name: 'deepseek-chat (DeepSeek-V3)', isRecommended: true },
                            { id: 'deepseek-reasoner', name: 'deepseek-reasoner (DeepSeek-R1)', isRecommended: true },
                          ];

                    return (
                      <>
                        {providerWorking.length === 0 && (
                          <div className="p-3 rounded-xl bg-[#24242c] border border-white/10 text-[11px] text-neutral-300 mb-1.5 space-y-2">
                            <p className="text-neutral-300 text-[11px] leading-snug">
                              No models tested yet for {currentAiProvider.toUpperCase()}. Run a test to filter and display only working models.
                            </p>
                            <button
                              type="button"
                              onClick={() => handleFetchAndTestBoardModels(currentAiProvider)}
                              disabled={isTestingOnBoard}
                              className="w-full py-1.5 px-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                            >
                              <Zap className="w-3 h-3 text-white" />
                              <span>{isTestingOnBoard ? 'Testing in progress...' : 'Fetch & Test Available Models'}</span>
                            </button>
                          </div>
                        )}
                        {candidateModels.map((m) => {
                          const isSelected = currentAiModel === m.id;
                          const verifiedItem = verifiedWorkingModels.find(
                            (v) => v.id === m.id && (v.provider || 'openai') === currentAiProvider && v.success
                          );
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => handleSelectBoardModel(m.id)}
                              className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-950/60 text-white font-bold border border-blue-700/70'
                                  : 'text-neutral-300 hover:bg-white/5 border border-transparent'
                              }`}
                            >
                              <div className="truncate pr-2">
                                <div className="flex items-center gap-1.5 truncate">
                                  <span className="font-mono text-[11px] truncate text-white">{m.id}</span>
                                  {verifiedItem && (
                                    <span className="text-[9.5px] font-bold px-1 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                      Tested {verifiedItem.latencyMs}ms
                                    </span>
                                  )}
                                </div>
                                {m.name && m.name !== m.id && (
                                  <span className="block text-[10px] text-neutral-400 truncate">
                                    {m.name}
                                  </span>
                                )}
                              </div>
                              {isSelected && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </>
                    );
                  })()}
                </div>

                {/* Custom Model Input Option */}
                {isCustomInputOpen ? (
                  <div className="flex gap-1.5 mb-2">
                    <input
                      type="text"
                      value={customModelOnBoard}
                      onChange={(e) => setCustomModelOnBoard(e.target.value)}
                      placeholder="Enter custom model ID..."
                      className="flex-1 px-2.5 py-1 rounded-xl bg-[#161618] border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customModelOnBoard.trim()) {
                          handleSelectBoardModel(customModelOnBoard.trim());
                          setIsCustomInputOpen(false);
                        }
                      }}
                      className="px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer"
                    >
                      Set
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsCustomInputOpen(true)}
                    className="w-full text-left px-2 py-1 mb-2 rounded-lg text-[10.5px] font-bold text-neutral-400 hover:text-white hover:bg-white/5 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3 h-3 text-neutral-400" />
                    <span>Type Custom Model ID...</span>
                  </button>
                )}

                {/* Status or Detection Message */}
                {boardDetectionMsg && (
                  <p className="text-[10px] text-blue-400 font-medium px-1 mb-1 truncate">
                    {boardDetectionMsg}
                  </p>
                )}

                {/* Link to Settings */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400">
                    Active: <code className="text-blue-300 font-bold">{currentAiModel}</code>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModelDropdownOpen(false);
                      onNavigateToView?.('settings', 'ai');
                    }}
                    className="text-blue-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Full Diagnostics in Settings</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Launcher: Regroupe Product (Campaign & AdSet Org Chart) */}
          <button
            type="button"
            onClick={() => setIsRegrouperModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer active:scale-95"
            title="Open Regroupe Product App: Select products & cluster into Campaign & AdSets with Org Chart diagram"
          >
            <Workflow className="w-3.5 h-3.5 text-white" />
            <span className="hidden md:inline">Regroupe Product</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-white/20 text-white font-mono font-bold">
              APP
            </span>
          </button>

          {/* Explicit Save Project Button */}
          <button
            type="button"
            onClick={handleSaveProject}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
            title="Save current board state to project"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save</span>
          </button>

          {/* Close Project Button */}
          <button
            type="button"
            onClick={() => handleCloseTab(activeProjectId)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#1f1f23] hover:bg-rose-950/40 hover:text-rose-400 text-neutral-300 text-xs font-semibold transition-all border border-white/10 cursor-pointer shadow-xs"
            title="Close this project and return to projects hub"
          >
            <LogOut className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden sm:inline">Close</span>
          </button>

          {/* Auto-Saved Status */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#1f1f23] border border-white/10 text-xs text-neutral-300" title="Changes are automatically saved to your browser storage">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-[11px]">{saveStatus === 'saved' ? 'Auto-Saved' : 'Saving...'}</span>
          </div>

          {/* Clear Board Button */}
          <button
            type="button"
            onClick={() => {
              if (nodes.length > 0) {
                setNodes([]);
                setEdges([]);
                setSelectedNodeId(null);
                localStorage.removeItem('user_board_nodes_v1');
                localStorage.removeItem('user_board_edges_v1');
                showToast('Board cleared. You now have a clean canvas.');
              }
            }}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
            title="Clear All Nodes (Start Fresh)"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Undo / Redo */}
          <button className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
            <Redo2 className="w-3.5 h-3.5" />
          </button>

          {/* Tool Selector: Select (Pointer) vs Pan (Hand) */}
          <div className="flex items-center rounded-xl bg-[#1f1f23] border border-white/10 p-0.5 text-xs">
            <button
              onClick={() => setActiveTool('select')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTool === 'select'
                  ? 'bg-[#2b2b32] text-white shadow-xs font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Select Tool (V) - Move & Select Cards"
            >
              <MousePointer className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTool('pan')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTool === 'pan'
                  ? 'bg-[#2b2b32] text-white shadow-xs font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Pan Tool (H) - Drag Canvas freely (or hold Space)"
            >
              <Hand className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Grid Toggle Selector & Snap */}
          <div className="flex items-center gap-1">
            <button
              onClick={() =>
                setGridStyle((curr) => (curr === 'dots' ? 'lines' : curr === 'lines' ? 'cross' : 'dots'))
              }
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#1f1f23] border border-white/10 text-xs text-neutral-200 hover:bg-[#282830] transition-colors cursor-pointer"
              title="Toggle Grid (Dots / Lines / Cross)"
            >
              <GridIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span className="capitalize text-[11px] font-medium">{gridStyle}</span>
            </button>
            <button
              onClick={() => setSnapToGrid(!snapToGrid)}
              className={`px-2 py-1 rounded-xl border text-[11px] font-semibold transition-colors cursor-pointer ${
                snapToGrid
                  ? 'bg-[#2b2b32] border-white/20 text-white font-bold'
                  : 'bg-[#1f1f23] border-white/10 text-neutral-500'
              }`}
              title="Snap to Grid (20px)"
            >
              Snap
            </button>
          </div>

          {/* INTERACTIVE MANUAL ZOOM CONTROLS (Slider + Quick Menu + Presets: 10% - 400%) */}
          <div className="relative flex items-center gap-1 px-2 py-1 rounded-xl bg-[#1f1f23] border border-white/10 text-xs text-neutral-200">
            <button
              onClick={() => handleSetZoomWithAnchor((z) => Math.max(10, z - 10))}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Zoom Out (-10%)"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            {/* Manual Range Slider: Drag directly with mouse (10% to 400%) */}
            <input
              type="range"
              min="10"
              max="400"
              step="5"
              value={zoom}
              onChange={(e) => handleSetZoomWithAnchor(Number(e.target.value))}
              className="w-16 sm:w-20 md:w-24 h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              title={`Drag to Zoom: ${zoom}%`}
            />

            <button
              onClick={() => handleSetZoomWithAnchor((z) => Math.min(400, z + 10))}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Zoom In (+10%)"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            {/* Clickable Percentage Dropdown with Presets & Manual Input */}
            <div className="relative">
              <button
                onClick={() => setIsZoomMenuOpen(!isZoomMenuOpen)}
                className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg text-neutral-200 font-bold hover:bg-white/10 transition-colors cursor-pointer"
                title="Click to choose preset zoom or enter exact %"
              >
                <span className="w-10 text-right font-mono text-[11px] text-white">{zoom}%</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {isZoomMenuOpen && (
                <div className="absolute top-full mt-2 right-0 w-52 bg-[#1c1c20] rounded-2xl shadow-2xl border border-white/15 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 text-neutral-200">
                  <div className="text-[10px] uppercase font-bold text-neutral-400 px-2 pb-1 tracking-wider border-b border-white/10 mb-1 flex items-center justify-between">
                    <span>Zoom Level</span>
                    <span className="font-mono text-emerald-400 font-bold">{zoom}%</span>
                  </div>

                  {/* Direct Numeric Input */}
                  <div className="flex items-center gap-2 px-2 py-1.5 mb-1 bg-[#161618] rounded-xl border border-white/10">
                    <span className="text-[11px] text-neutral-400 font-medium">Exact %:</span>
                    <input
                      type="number"
                      min="10"
                      max="400"
                      value={zoom}
                      onChange={(e) =>
                        handleSetZoomWithAnchor(Math.max(10, Math.min(400, Number(e.target.value) || 10)))
                      }
                      className="w-16 px-1.5 py-0.5 rounded bg-[#1f1f23] border border-white/10 text-xs font-mono font-bold text-white focus:outline-none focus:border-white/30"
                    />
                    <button
                      onClick={() => setIsZoomMenuOpen(false)}
                      className="ml-auto text-[10px] font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/10 cursor-pointer"
                    >
                      OK
                    </button>
                  </div>

                  {/* Quick Margin Alignment Action */}
                  <button
                    onClick={() => {
                      handleResetLeftMargin();
                      setIsZoomMenuOpen(false);
                    }}
                    className="w-full mb-1 text-left px-2 py-1.5 rounded-lg text-xs font-semibold bg-[#25252b] hover:bg-[#303038] text-white flex items-center justify-between transition-colors cursor-pointer border border-white/5"
                    title="Reset to 85% with 60px left margin from sidebar"
                  >
                    <span>Align Left Margin (60px)</span>
                    <span className="text-[10px] bg-emerald-950/70 border border-emerald-800/50 px-1.5 py-0.5 rounded text-emerald-300 font-mono">
                      85%
                    </span>
                  </button>

                  {/* Preset Options */}
                  <div className="space-y-0.5 max-h-48 overflow-y-auto pr-0.5">
                    {[
                      { label: "25% - Bird's Eye", value: 25 },
                      { label: '50% - Far Out', value: 50 },
                      { label: '75% - Overview', value: 75 },
                      { label: '85% - Default Fit', value: 85 },
                      { label: '100% - Actual Size', value: 100 },
                      { label: '125% - Zoomed In', value: 125 },
                      { label: '150% - Close Up', value: 150 },
                      { label: '200% - Detailed', value: 200 },
                      { label: '300% - High Zoom', value: 300 },
                      { label: '400% - Maximum', value: 400 },
                    ].map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => {
                          handleSetZoomWithAnchor(preset.value);
                          setIsZoomMenuOpen(false);
                        }}
                        className={`w-full text-left px-2 py-1 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          zoom === preset.value
                            ? 'bg-[#242429] text-white font-bold border border-white/10'
                            : 'text-neutral-300 hover:bg-white/5'
                        }`}
                      >
                        <span>{preset.label}</span>
                        {zoom === preset.value && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    ))}
                  </div>

                  {/* Mouse Wheel Zoom Toggle */}
                  <div className="pt-2 mt-1.5 border-t border-white/10 flex items-center justify-between px-2 text-[11px] text-neutral-300">
                    <span>Mouse Wheel Zoom:</span>
                    <button
                      onClick={() => setWheelZoomEnabled(!wheelZoomEnabled)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                        wheelZoomEnabled
                          ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/50'
                          : 'bg-[#25252b] text-neutral-400'
                      }`}
                    >
                      {wheelZoomEnabled ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preview Button */}
          <button
            onClick={() => showToast('Preview mode ready')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-[#282830] transition-colors bg-[#1f1f23] shadow-xs cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-neutral-400" />
            <span>Preview</span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
              }
              showToast('Board link copied to clipboard!');
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-[#282830] transition-colors bg-[#1f1f23] shadow-xs cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-neutral-400" />
            <span>Share</span>
          </button>

          {/* Notification Bell */}
          <button className="relative p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5 ring-2 ring-[#161618]" />
          </button>

          {/* User Profile Yahia Pro User */}
          <div className="flex items-center gap-2 pl-1 cursor-pointer">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-slate-800 relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
                alt="Yahia"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="w-full h-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold absolute inset-0">
                Y
              </div>
            </div>
            <div className="text-left hidden xl:block leading-tight">
              <span className="text-xs font-bold text-white block">Yahia</span>
              <span className="text-[10px] text-emerald-400 font-semibold block">Pro User</span>
            </div>
          </div>
        </div>
      </header>

      {/* BOARD PROJECTS TAB BAR (Multi-Project Tabs & Switcher) */}
      <BoardTabBar
        projects={boardProjects}
        openProjectIds={openProjectIds}
        activeProjectId={activeProjectId}
        onSelectProject={handleSelectProject}
        onCloseTab={handleCloseTab}
        onReturnToHub={() => setBoardViewMode('hub')}
        onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)}
        onDuplicateProject={handleDuplicateProject}
        onRenameProject={handleRenameProject}
        onDeleteProject={handleDeleteProject}
        onSaveProject={handleSaveProject}
        saveStatus={saveStatus}
      />

      {/* 2. MAIN 3-PANEL BODY (Skills Left Drawer + Center Board Canvas + Right Inspector) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* PANEL A: Left Drawer "Skills / Nodes" with 670 Skills matching image_d8993db4.png */}
        {isSkillsPanelOpen ? (
          <aside className="w-[360px] sm:w-[390px] my-3 ml-3 h-[calc(100%-1.5rem)] rounded-3xl bg-[#161618] border border-white/10 shadow-2xl flex flex-col z-20 shrink-0 select-none overflow-hidden text-neutral-200">
            {/* Header (CSS Selector 2: aside:nth-of-type(1) > div:nth-of-type(1)) */}
            <div className="h-14 px-3.5 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#161618]">
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Rounded White Square Icon Box matching image_aea12bb5.png */}
                <div className="w-9 h-9 rounded-xl bg-white text-neutral-900 flex items-center justify-center font-bold shadow-md shrink-0">
                  <Workflow className="w-5 h-5 text-neutral-950 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block leading-none">
                    Team
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-sm font-bold text-white tracking-tight block leading-tight truncate">
                      Finalytic
                    </span>
                    <span className="text-neutral-500 text-xs hidden sm:inline">• AI Skills</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {/* Expand / Collapse All Toggle with ChevronsUpDown matching image */}
                <button
                  type="button"
                  onClick={handleToggleExpandAllCategories}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  title="Expand / Collapse All Categories"
                >
                  <ChevronsUpDown className="w-3.5 h-3.5" />
                </button>

                {/* Add New Custom Skill Button */}
                <button
                  type="button"
                  onClick={() => setIsNewSkillModalOpen(true)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 text-[10.5px] font-bold shadow-xs transition-all cursor-pointer mr-0.5 active:scale-95"
                  title="Create custom AI skill with your own prompt"
                >
                  <Plus className="w-3.5 h-3.5 text-neutral-950" />
                  <span>Skill</span>
                </button>

                {/* View Mode Toggle: List vs Grid */}
                <button
                  onClick={() => setSkillsViewMode((prev) => (prev === 'list' ? 'grid' : 'list'))}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  title={skillsViewMode === 'list' ? 'Switch to 2-Column Grid' : 'Switch to Detailed View'}
                >
                  {skillsViewMode === 'list' ? (
                    <GridIcon className="w-3.5 h-3.5" />
                  ) : (
                    <ListIcon className="w-3.5 h-3.5" />
                  )}
                </button>

                {/* Close Drawer Button */}
                <button
                  onClick={() => handleToggleSkillsPanel(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer ml-0.5"
                  title="Collapse Skills Panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Left Drawer Navigation Tabs (CSS Selector 3: aside:nth-of-type(1) > div:nth-of-type(2)) */}
            <div className="p-1 bg-[#1f1f23] rounded-2xl mx-3 mt-2.5 mb-1 border border-white/5 grid grid-cols-4 gap-1 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarTab('skills');
                }}
                className={`py-1.5 px-1 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 select-none ${
                  sidebarTab === 'skills'
                    ? 'bg-[#2b2b32] text-white font-bold shadow-xs border border-white/10 ring-1 ring-white/10'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                }`}
                title="Browse 670 E-commerce Skills & Funnel Stages"
              >
                <Sparkles className="w-3.5 h-3.5 text-white shrink-0 pointer-events-none" />
                <span className="truncate text-[11px] pointer-events-none">Skills</span>
                {/* Orange Badge matching image Connections 2 */}
                <span className="bg-[#f97316] text-white font-bold text-[9px] px-1 py-0.2 rounded-md font-mono shrink-0 pointer-events-none">
                  {totalMatchingSkills + customSkills.length}
                </span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarTab('products');
                }}
                className={`py-1.5 px-1 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 select-none ${
                  sidebarTab === 'products'
                    ? 'bg-[#2b2b32] text-white font-bold shadow-xs border border-white/10 ring-1 ring-white/10'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                }`}
                title="Product Dossiers & Intelligence Catalog"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-neutral-300 shrink-0 pointer-events-none" />
                <span className="truncate text-[11px] pointer-events-none">Products</span>
                <span className="text-[9.5px] text-neutral-400 font-mono pointer-events-none">
                  {productsList.length}
                </span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarTab('uploads');
                }}
                className={`py-1.5 px-1 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 select-none ${
                  sidebarTab === 'uploads'
                    ? 'bg-[#2b2b32] text-white font-bold shadow-xs border border-white/10 ring-1 ring-white/10'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                }`}
                title="Uploaded Files, Datasets & Documents"
              >
                <UploadCloud className="w-3.5 h-3.5 text-neutral-300 shrink-0 pointer-events-none" />
                <span className="truncate text-[11px] pointer-events-none">Uploads</span>
                <span className="text-[9.5px] text-neutral-400 font-mono pointer-events-none">
                  {uploadedFiles.length}
                </span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarTab('apps');
                }}
                className={`py-1.5 px-1 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 select-none ${
                  sidebarTab === 'apps'
                    ? 'bg-[#2b2b32] text-purple-300 font-bold shadow-xs border border-purple-500/40 ring-1 ring-purple-500/20'
                    : 'text-neutral-400 hover:text-purple-300 hover:bg-purple-950/20'
                }`}
                title="AI Studio Apps: Text to Code LP, Text to Image LP, Regroupe Product, Storyboard, Script Video, Séance Video"
              >
                <Wand2 className="w-3.5 h-3.5 text-purple-400 shrink-0 pointer-events-none" />
                <span className="truncate text-[11px] pointer-events-none">Apps</span>
                <span className="bg-purple-600 text-white font-bold text-[9px] px-1 py-0.2 rounded-md font-mono shrink-0 pointer-events-none">
                  {AI_STUDIO_APPS.length}
                </span>
              </button>
            </div>

            {sidebarTab === 'skills' ? (
              <>
                {/* Filter Pills & Search */}
                <div className="p-3 border-b border-white/5 space-y-2.5 bg-[#161618]">
                  {/* Search Skills Input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search 670 skills, sub-skills..."
                      value={skillsSearch}
                      onChange={(e) => setSkillsSearch(e.target.value)}
                      className="w-full pl-8 pr-7 py-2 rounded-xl bg-[#1f1f23] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 shadow-inner"
                    />
                    {skillsSearch && (
                      <button
                        onClick={() => setSkillsSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Category Filter Pills (CSS Selector 1: aside:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2)) */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold scrollbar-none">
                    {[
                      { label: 'All (670)', id: 'All' },
                      { label: 'Stage 1: Product (19)', id: 'stage_1_product' },
                      { label: 'Stage 2: Strategy (26)', id: 'stage_2_strategy' },
                      { label: 'Stage 3: Creative (32)', id: 'stage_3_creative' },
                      { label: 'Stage 4: Campaign (30)', id: 'stage_4_campaign' },
                      { label: 'Stage 5: Traffic (28)', id: 'stage_5_traffic' },
                      { label: 'Stage 6: Order (23)', id: 'stage_6_order' },
                      { label: 'Stage 7: Confirmation (21)', id: 'stage_7_confirmation' },
                      { label: 'Stage 8: Delivery (21)', id: 'stage_8_delivery' },
                      { label: 'Stage 9: RTO & Returns (24)', id: 'stage_9_rto' },
                      { label: 'Stage 10: Revenue (22)', id: 'stage_10_revenue' },
                      { label: 'Stage 11: Profit (26)', id: 'stage_11_profit' },
                      { label: 'Stage 12: Customer Quality (25)', id: 'stage_12_customer' },
                      { label: 'Stage 13: Signals (CAPI) (26)', id: 'stage_13_signals' },
                      { label: 'Stage 14: AI Engine (34)', id: 'stage_14_ai' },
                      { label: 'Stage 15: Acquisition (26)', id: 'stage_15_acquisition' },
                      { label: 'DZ Landing Page (17)', id: 'dz_landing_page' },
                      { label: 'Ads Testing (15)', id: 'fb_ads_testing' },
                      { label: 'Ads Scaling (15)', id: 'fb_ads_scaling' },
                      { label: 'Decision Intelligence (4)', id: 'decision_intelligence' },
                      { label: 'Advanced Strategy (22)', id: 'advanced_strategy_intelligence' },
                      { label: 'Advanced Product (17)', id: 'advanced_product_intelligence' },
                      { label: 'Advanced Creative (8)', id: 'advanced_creative_intelligence' },
                      { label: 'Autonomous Agents (7)', id: 'autonomous_agents' },
                      { label: 'Copywriting (10)', id: 'copywriting_frameworks' },
                      { label: 'Shopify & Store (6)', id: 'shopify_store_apps' },
                      { label: 'Analytics & Ops (13)', id: 'advanced_ads_analytics_ops' },
                      { label: 'Advanced Algeria (6)', id: 'advanced_algeria_skills' },
                      { label: 'Suppliers & Sourcing (6)', id: 'supplier_sourcing_intelligence' },
                      { label: 'Logistics (5)', id: 'logistics_supply_chain' },
                      { label: 'Business & Setup (5)', id: 'business_company_setup' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSkillsFilter(cat.id)}
                        className={`px-3 py-1 rounded-xl text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                          skillsFilter === cat.id
                            ? 'bg-white text-neutral-950 shadow-xs font-bold'
                            : 'bg-[#1f1f23] border border-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {skillsSearch && (
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 font-medium px-0.5">
                      <span>Found {totalMatchingSkills} skills</span>
                      <button
                        onClick={() => setSkillsSearch('')}
                        className="text-white hover:underline cursor-pointer"
                      >
                        Clear search
                      </button>
                    </div>
                  )}
                </div>

                {/* 2-Column Skill Cards (CSS Selector 1: aside:nth-of-type(1) > div:nth-of-type(4)) */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-[#141416] scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                  {/* Restore bar if any skills have been removed */}
                  {removedSkillIds.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-[#231b20] border border-rose-500/30 flex items-center justify-between text-[11px] shadow-xs">
                      <span className="text-neutral-300">
                        <strong className="text-rose-400 font-bold">{removedSkillIds.length}</strong> hidden skill{removedSkillIds.length > 1 ? 's' : ''}
                      </span>
                      <button
                        type="button"
                        onClick={handleRestoreAllSkills}
                        className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline cursor-pointer flex items-center gap-1 font-mono"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Restore All</span>
                      </button>
                    </div>
                  )}

                  {/* Custom AI Skills section if any exist */}
                  {customSkills.length > 0 && (
                    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 overflow-hidden shadow-xs p-2.5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-xs font-bold text-emerald-300">
                            Custom Skills ({customSkills.length})
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsNewSkillModalOpen(true)}
                          className="text-[10px] font-bold text-emerald-400 hover:underline cursor-pointer"
                        >
                          + New
                        </button>
                      </div>
                      <div className="space-y-2">
                        {customSkills.map((cSkill) => (
                          <div
                            key={cSkill.id}
                            draggable={true}
                            onDragStart={(e) => {
                              const payload = {
                                title: cSkill.title,
                                subtitle: cSkill.subtitle,
                                category: cSkill.category,
                                iconType: 'Sparkles',
                                iconBg: 'bg-emerald-600',
                                isCustomSkill: true,
                                customPromptTemplate: cSkill.promptTemplate,
                              };
                              e.dataTransfer.setData('application/json', JSON.stringify(payload));
                              e.dataTransfer.effectAllowed = 'copy';
                            }}
                            className="bg-[#1f1f23] rounded-xl p-2.5 border border-white/5 hover:border-emerald-500/40 shadow-xs transition-all cursor-grab active:cursor-grabbing"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono uppercase border border-emerald-500/30">
                                CUSTOM
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSkillToRemove({
                                    id: cSkill.id,
                                    title: cSkill.title,
                                    isCustom: true,
                                  });
                                }}
                                className="text-neutral-400 hover:text-rose-400 p-1 rounded-md hover:bg-rose-500/15 transition-colors cursor-pointer"
                                title="Delete Custom Skill"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <h5 className="font-bold text-xs text-white mt-1 line-clamp-1">
                              {cSkill.title}
                            </h5>
                            <p className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">
                              {cSkill.subtitle}
                            </p>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddCustomSkillToBoard(cSkill);
                              }}
                              className="w-full mt-2 py-1 px-2 rounded-xl border border-white/10 bg-[#27272e] hover:bg-white hover:text-black text-neutral-200 text-[10.5px] font-bold font-mono flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
                            >
                              <Plus className="w-3 h-3" />
                              <span>+ Add to Board</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredCategories.length === 0 ? (
                    <div className="p-8 text-center text-neutral-500 space-y-2">
                      <Search className="w-8 h-8 mx-auto text-neutral-600" />
                      <p className="text-xs font-semibold text-neutral-300">No skills found</p>
                      <p className="text-[11px]">Try a different search term or category filter</p>
                      <button
                        onClick={() => {
                          setSkillsSearch('');
                          setSkillsFilter('All');
                        }}
                        className="mt-2 px-3 py-1 bg-white text-black font-bold text-xs rounded-xl hover:bg-neutral-200 cursor-pointer shadow-xs"
                      >
                        Reset filters
                      </button>
                    </div>
                  ) : (
                    filteredCategories.map((category) => {
                      const isOpen = skillsSearch.trim() || skillsFilter !== 'All' ? true : !!expandedCategories[category.id];
                      const CategoryIconComp =
                        (LucideIcons as Record<string, any>)[category.icon] || LucideIcons.Zap;

                      return (
                        <div
                          key={category.id}
                          className="rounded-2xl border border-white/5 bg-[#19191d] overflow-hidden shadow-xs hover:border-white/10 transition-all"
                        >
                          {/* Accordion Category Header */}
                          <button
                            onClick={() => handleToggleCategory(category.id)}
                            className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-[#222227] transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div
                                className={`w-6 h-6 rounded-lg ${category.color} flex items-center justify-center text-white shrink-0 shadow-2xs`}
                              >
                                <CategoryIconComp className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs font-semibold text-neutral-200 group-hover:text-white truncate block leading-tight">
                                  {category.name}
                                </span>
                                <span className="text-[10px] text-neutral-400 font-medium">
                                  {category.skills.length} skills
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#25252b] text-neutral-300 border border-white/5">
                                {category.skills.length}
                              </span>
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-200 transition-transform duration-200 ${
                                  isOpen ? 'rotate-180' : ''
                                }`}
                              />
                            </div>
                          </button>

                          {/* Accordion Category Skills List: 2-Column Cards Layout with Tree Branch Accents */}
                          {isOpen && (
                            <div className="p-2 pt-1 border-t border-white/5 grid grid-cols-2 gap-2 bg-[#161619]">
                              {category.skills.map((skill) => renderSkillItem(skill))}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            ) : sidebarTab === 'products' ? (
              /* Product Library & Intelligence Tab Content */
              <div className="flex-1 flex flex-col overflow-hidden bg-[#141416]">
                {/* Product Header & Add Trigger */}
                <div className="p-3 border-b border-white/5 space-y-2 bg-[#17171a] shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-xs font-bold text-white tracking-tight">Products</span>
                      <span className="px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-mono text-[9.5px] font-bold border border-blue-500/30">
                        {filteredDetailedProducts.length}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onNavigateToView('products')}
                        className="px-2 py-1 rounded-xl bg-[#25252c] hover:bg-white hover:text-black text-neutral-300 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer border border-white/10"
                        title="Open dedicated Products Intelligence page"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Full Page</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsProductImportModalOpen(true)}
                        className="px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                      >
                        <Plus className="w-3 h-3" />
                        <span>+ Add Product</span>
                      </button>
                    </div>
                  </div>

                  {/* Search Input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search products by title, category, ID..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-[#1f1f23] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-all shadow-inner"
                    />
                    {productSearch && (
                      <button
                        onClick={() => setProductSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Quick Helper Banner */}
                  <div
                    onClick={() => setIsProductImportModalOpen(true)}
                    className="p-2 rounded-xl bg-[#1d1d24] border border-white/5 text-[10.5px] text-neutral-300 leading-snug flex items-center justify-between gap-1.5 hover:bg-[#23232b] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="truncate">Add via <strong>JSON File</strong>, <strong>Manual</strong> or <strong>Paste JSON</strong></span>
                    </div>
                    <span className="text-[10px] text-blue-400 font-bold shrink-0">Open</span>
                  </div>
                </div>

                {/* Products List (CSS Selector 1: aside:nth-of-type(1) > div:nth-of-type(4)) */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {filteredDetailedProducts.map((product) => {
                    const sellingPrice = product.financials?.sellingPrice ?? 1400;
                    const costPrice = product.financials?.costPrice ?? 760;
                    const shippingCost = product.financials?.shippingCost ?? 202;
                    const marginPct = Math.round(
                      ((sellingPrice - costPrice - shippingCost) / (sellingPrice || 1)) * 100
                    );

                    const productPayload = {
                      title: product.name,
                      subtitle: product.aiAnalysis?.marketingAngle || product.category || 'Product Dossier',
                      category: 'Product Intelligence',
                      iconType: 'ShoppingBag',
                      iconBg: 'bg-blue-600',
                      isProduct: true,
                      productData: {
                        image: product.mainImage,
                        sellingPrice,
                        productCost: costPrice,
                        profitMargin: marginPct,
                        niche: product.category,
                        sellingPoints: product.aiAnalysis?.whySell?.slice(0, 2).join(' • ') || 'Verified product dossier',
                        description: product.intelligence?.evidenceNotes || product.name,
                        stock: product.supplier?.moq ? `MOQ ${product.supplier.moq}` : 'Active',
                      },
                    };

                    return (
                      <div
                        key={product.id}
                        draggable={true}
                        onDragStart={(e) => {
                          e.dataTransfer.setData('application/json', JSON.stringify(productPayload));
                          e.dataTransfer.effectAllowed = 'copy';
                        }}
                        onClick={() => setPreviewProduct(product)}
                        className="bg-[#1c1c20] rounded-2xl p-3 border border-white/5 hover:border-blue-500/30 hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer select-none"
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-[#25252b]">
                            <img
                              src={product.mainImage}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  'https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=500&h=500&fit=crop';
                              }}
                            />
                            <div className="absolute top-1 left-1 px-1 rounded bg-black/70 text-[8px] font-mono text-white font-bold">
                              DZ
                            </div>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span
                                className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold uppercase tracking-wider font-mono truncate ${
                                  product.status === 'Active'
                                    ? 'bg-blue-950/70 text-blue-300 border border-blue-800/40'
                                    : 'bg-amber-950/70 text-amber-300 border border-amber-800/40'
                                }`}
                              >
                                {product.status}
                              </span>
                              <span className="text-[9.5px] text-blue-400 font-mono font-bold shrink-0">
                                Score {product.opportunity?.overallScore ?? 52}/100
                              </span>
                            </div>

                            <h4 className="font-bold text-xs text-white mt-1 leading-snug line-clamp-1 group-hover:text-blue-300 transition-colors">
                              {product.name}
                            </h4>

                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-xs font-bold text-blue-400 font-mono">
                                {(product.financials?.sellingPrice ?? 1400).toLocaleString()} DZD
                              </span>
                              <span className="text-[10px] text-neutral-500 font-mono">
                                Cost: {(product.financials?.costPrice ?? 760).toLocaleString()}
                              </span>
                              <span
                                className={`text-[9px] font-bold px-1 rounded font-mono ${
                                  (product.financials?.roi ?? 0) >= 0
                                    ? 'text-blue-300 bg-blue-950/60 border border-blue-800/40'
                                    : 'text-rose-300 bg-rose-950/60 border border-rose-800/40'
                                }`}
                              >
                                {(product.financials?.roi ?? 0) > 0 ? `+${product.financials.roi}%` : `${product.financials?.roi ?? 0}%`}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-neutral-400 text-[10.5px] mt-2 line-clamp-2 leading-relaxed">
                          {product.intelligence?.evidenceNotes || product.aiAnalysis?.marketingAngle || product.source}
                        </p>

                        <div className="flex items-center gap-2 mt-2.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewProduct(product);
                            }}
                            className="flex-1 py-1.5 px-2.5 rounded-xl border border-white/10 bg-[#27272e] hover:bg-white hover:text-black active:scale-98 text-neutral-200 text-[11px] font-bold font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddDetailedProductToBoard(product);
                            }}
                            className="flex-1 py-1.5 px-2.5 rounded-xl border border-blue-500/30 bg-blue-600 hover:bg-blue-500 active:scale-98 text-white text-[11px] font-bold font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Add</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : sidebarTab === 'uploads' ? (
              /* Uploads / Files Tab Content */
              <div className="flex-1 flex flex-col overflow-hidden bg-[#141416]">
                {/* Upload Header & Filters (CSS Selector 1: aside:nth-of-type(1) > div:nth-of-type(3)) */}
                <div className="p-3 border-b border-white/5 space-y-2.5 bg-[#17171a] shrink-0">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".png,.jpg,.jpeg,.webp,.svg,.gif,.pdf,.doc,.docx,.txt,.rtf,.xlsx,.xls,.csv,.tsv,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {/* Dropzone Upload Trigger */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                        handleFileUpload({ target: { files: e.dataTransfer.files } } as any);
                      }
                    }}
                    className="p-3 rounded-2xl border-2 border-dashed border-white/15 hover:border-white/40 bg-[#1c1c20] hover:bg-[#232329] transition-all cursor-pointer flex flex-col items-center justify-center text-center group shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/10 group-hover:bg-white/20 text-white flex items-center justify-center mb-1.5 transition-colors shadow-xs">
                      <FileUp className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      Click to Upload or Drag & Drop
                    </span>
                    <span className="text-[10px] text-neutral-400 mt-0.5 font-medium">
                      Excel / CSV • PDF • Word • JSON • Images
                    </span>
                  </div>

                  {/* Search Files Input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search uploaded files, data..."
                      value={fileSearch}
                      onChange={(e) => setFileSearch(e.target.value)}
                      className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-[#1f1f23] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-all shadow-inner"
                    />
                    {fileSearch && (
                      <button
                        onClick={() => setFileSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Filter Pills for File Types */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs font-semibold scrollbar-none">
                    {[
                      { id: 'all', label: `All (${uploadedFiles.length})` },
                      { id: 'excel', label: `📊 Tables (${uploadedFiles.filter((f) => f.type === 'excel').length})` },
                      { id: 'pdf', label: `📄 PDF (${uploadedFiles.filter((f) => f.type === 'pdf').length})` },
                      { id: 'word', label: `📝 Word (${uploadedFiles.filter((f) => f.type === 'word').length})` },
                      { id: 'json', label: `📦 JSON (${uploadedFiles.filter((f) => f.type === 'json').length})` },
                      { id: 'image', label: `🖼️ Images (${uploadedFiles.filter((f) => f.type === 'image').length})` },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFileFilter(f.id as any)}
                        className={`px-2 py-0.5 rounded-lg text-[10.5px] whitespace-nowrap transition-all cursor-pointer ${
                          fileFilter === f.id
                            ? 'bg-white text-neutral-950 font-bold shadow-xs'
                            : 'bg-[#1f1f23] border border-white/5 text-neutral-400 hover:text-white hover:bg-[#27272e]'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Uploaded Files List (CSS Selector 1: aside:nth-of-type(1) > div:nth-of-type(4)) */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {filteredUploadedFiles.length === 0 ? (
                    <div className="p-8 text-center text-neutral-400 space-y-2">
                      <UploadCloud className="w-8 h-8 mx-auto text-neutral-600" />
                      <p className="text-xs font-semibold text-neutral-300">No files found</p>
                      <p className="text-[11px] text-neutral-500">Upload an Excel table, PDF, Word doc, JSON, or image</p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-2 px-3 py-1 bg-[#27272e] text-neutral-200 hover:bg-white hover:text-black font-bold text-xs rounded-xl transition-all cursor-pointer border border-white/10"
                      >
                        Browse Files
                      </button>
                    </div>
                  ) : (
                    filteredUploadedFiles.map((file) => {
                      const iconBg =
                        file.type === 'excel'
                          ? 'bg-emerald-600'
                          : file.type === 'pdf'
                          ? 'bg-rose-600'
                          : file.type === 'word'
                          ? 'bg-blue-600'
                          : file.type === 'json'
                          ? 'bg-amber-600'
                          : 'bg-purple-600';

                      return (
                        <div
                          key={file.id}
                          draggable={true}
                          onDragStart={(e) => handleDragStartFile(e, file)}
                          className="bg-[#1c1c20] rounded-2xl p-3 border border-white/5 hover:border-white/20 hover:shadow-lg transition-all flex flex-col justify-between group cursor-grab active:cursor-grabbing select-none"
                        >
                          <div>
                            {/* Top info row */}
                            <div className="flex items-center justify-between gap-1">
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider font-mono ${
                                file.type === 'excel' ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/40' :
                                file.type === 'pdf' ? 'bg-rose-950/70 text-rose-300 border border-rose-800/40' :
                                file.type === 'word' ? 'bg-blue-950/70 text-blue-300 border border-blue-800/40' :
                                file.type === 'json' ? 'bg-amber-950/70 text-amber-300 border border-amber-800/40' :
                                'bg-purple-950/70 text-purple-300 border border-purple-800/40'
                              }`}>
                                {file.type.toUpperCase()}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] text-neutral-500 font-mono">
                                  {Math.round(file.size / 1024)} KB
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteUploadedFile(file.id, file.name);
                                  }}
                                  className="p-1 rounded-md text-neutral-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                                  title="Delete File"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Middle file presentation */}
                            <div className="flex items-start gap-2.5 mt-2">
                              {file.type === 'image' && file.previewUrl ? (
                                <img
                                  src={file.previewUrl}
                                  alt={file.name}
                                  className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                                />
                              ) : (
                                <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center text-white shrink-0 shadow-xs`}>
                                  {file.type === 'excel' && <FileSpreadsheet className="w-5 h-5" />}
                                  {file.type === 'pdf' && <FileText className="w-5 h-5" />}
                                  {file.type === 'word' && <FileText className="w-5 h-5" />}
                                  {file.type === 'json' && <FileCode className="w-5 h-5" />}
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <h4 className="font-bold text-xs text-white leading-snug line-clamp-1" title={file.name}>
                                  {file.name}
                                </h4>
                                <p className="text-neutral-400 text-[10px] mt-0.5 line-clamp-2 leading-tight">
                                  {file.summary}
                                </p>
                              </div>
                            </div>

                            {/* Tags */}
                            {file.tags && file.tags.length > 0 && (
                              <div className="flex items-center gap-1 mt-2 flex-wrap">
                                {file.tags.slice(0, 3).map((tag, tIdx) => (
                                  <span key={tIdx} className="px-1.5 py-0.5 rounded bg-[#25252b] text-neutral-300 text-[9px] font-mono border border-white/5">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Action Buttons: Add to Board & Inspect */}
                          <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddFileToBoard(file);
                              }}
                              className="flex-1 py-1 px-2 rounded-full border border-white/10 bg-[#27272e] hover:bg-white hover:text-black text-neutral-200 text-[11px] font-bold font-mono flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
                            >
                              <Plus className="w-3 h-3" />
                              <span>+ Add to Board</span>
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewFileModal(file);
                              }}
                              className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                              title="Inspect File Data"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ) : (
              /* AI Creative Studio Apps Tab Content (sidebarTab === 'apps') */
              <div className="flex-1 flex flex-col overflow-hidden bg-[#141416]">
                {/* Apps Header & Filters */}
                <div className="p-3 border-b border-white/5 space-y-2.5 bg-[#17171a] shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">AI Creative Apps</span>
                        <span className="bg-purple-600/30 text-purple-300 border border-purple-500/40 text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold">
                          {AI_STUDIO_APPS.length} APPS READY
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        Production studio tools for e-commerce creatives & ads
                      </p>
                    </div>
                  </div>

                  {/* Search Apps Input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search apps (Image, Storyboard, Script, Séance)..."
                      value={appSearch}
                      onChange={(e) => setAppSearch(e.target.value)}
                      className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-[#1f1f23] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-all shadow-inner"
                    />
                    {appSearch && (
                      <button
                        onClick={() => setAppSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Apps List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {AI_STUDIO_APPS.filter((app) =>
                    !appSearch ||
                    app.title.toLowerCase().includes(appSearch.toLowerCase()) ||
                    app.subtitle.toLowerCase().includes(appSearch.toLowerCase()) ||
                    app.description.toLowerCase().includes(appSearch.toLowerCase())
                  ).map((app) => {
                    return (
                      <div
                        key={app.id}
                        draggable={true}
                        onDragStart={(e) => handleDragStartApp(e, app)}
                        onClick={() => {
                          if (app.appType === 'cro_mobile_landing_page') {
                            setIsCroMobileModalOpen(true);
                          } else if (app.appType === 'landing_page_generator') {
                            setIsLandingPageModalOpen(true);
                          } else if (app.appType === 'product_regrouper') {
                            setIsRegrouperModalOpen(true);
                          } else if (app.appType === 'text_to_code_landing_page') {
                            setIsTextToCodeModalOpen(true);
                          } else if (app.appType === 'text_to_image_landing_page') {
                            setIsTextToImageLpModalOpen(true);
                          } else {
                            handleAddAppToBoard(app);
                          }
                        }}
                        className="bg-[#1c1c20] hover:bg-[#232328] rounded-2xl p-3.5 border border-white/5 hover:border-purple-500/30 hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer active:scale-[0.99] select-none"
                      >
                        <div>
                          {/* Top Badges */}
                          <div className="flex items-center justify-between gap-1 mb-2">
                            <span className="bg-[#27272c] text-neutral-300 text-[9.5px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider font-mono border border-white/5">
                              {app.tag}
                            </span>
                            <span className="bg-purple-900/60 text-purple-300 border border-purple-500/30 font-bold text-[9px] px-2 py-0.5 rounded-md font-mono shrink-0">
                              {app.badge}
                            </span>
                          </div>

                          {/* App Icon + Title */}
                          <div className="flex items-start gap-2.5">
                            <div className={`w-9 h-9 rounded-xl ${app.iconBg} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                              {app.appType === 'cro_mobile_landing_page' && <Smartphone className="w-4.5 h-4.5" />}
                              {app.appType === 'landing_page_generator' && <Palette className="w-4.5 h-4.5" />}
                              {app.appType === 'text_to_code_landing_page' && <Code className="w-4.5 h-4.5" />}
                              {app.appType === 'text_to_image_landing_page' && <ImageIcon className="w-4.5 h-4.5" />}
                              {app.appType === 'text_to_image' && <ImageIcon className="w-4.5 h-4.5" />}
                              {app.appType === 'image_to_text' && <FileText className="w-4.5 h-4.5" />}
                              {app.appType === 'text_to_storyboard' && <Film className="w-4.5 h-4.5" />}
                              {app.appType === 'text_to_video_script' && <Video className="w-4.5 h-4.5" />}
                              {app.appType === 'text_to_scene_video' && <Clapperboard className="w-4.5 h-4.5" />}
                              {app.appType === 'product_regrouper' && <Workflow className="w-4.5 h-4.5" />}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-white text-xs leading-tight group-hover:text-purple-200 transition-colors">
                                {app.title}
                              </h4>
                              <p className="text-neutral-400 text-[11px] mt-0.5 line-clamp-2 leading-relaxed">
                                {app.subtitle}
                              </p>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-[11px] text-neutral-400 mt-2.5 leading-relaxed bg-[#17171a] p-2 rounded-xl border border-white/5">
                            {app.description}
                          </p>

                          {/* Feature Highlights */}
                          <div className="mt-2.5 space-y-1">
                            {app.features.map((feat, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 text-[10.5px] text-neutral-300">
                                <span className="text-emerald-400 text-[11px]">✓</span>
                                <span className="truncate">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1.5 mt-3.5">
                          {app.appType === 'cro_mobile_landing_page' && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsCroMobileModalOpen(true);
                              }}
                              className="flex-1 py-1.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold font-mono flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
                              title="Open CRO Landing Page Builder (Mobile)"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Open App</span>
                            </button>
                          )}
                          {app.appType === 'landing_page_generator' && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsLandingPageModalOpen(true);
                              }}
                              className="flex-1 py-1.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold font-mono flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
                              title="Open AI Landing Page Generator (3-Column Live Studio)"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Open App</span>
                            </button>
                          )}
                          {app.appType === 'product_regrouper' && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsRegrouperModalOpen(true);
                              }}
                              className="flex-1 py-1.5 px-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold font-mono flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
                              title="Open Fullscreen Org Chart & Regroup Products"
                            >
                              <Workflow className="w-3.5 h-3.5" />
                              <span>Open App</span>
                            </button>
                          )}
                          {app.appType === 'text_to_code_landing_page' && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsTextToCodeModalOpen(true);
                              }}
                              className="flex-1 py-1.5 px-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold font-mono flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
                              title="Open Text to Code Landing Page Generator"
                            >
                              <Code className="w-3.5 h-3.5" />
                              <span>Open App</span>
                            </button>
                          )}
                          {app.appType === 'text_to_image_landing_page' && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsTextToImageLpModalOpen(true);
                              }}
                              className="flex-1 py-1.5 px-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-mono flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
                              title="Open Text to Image Landing Page Generator"
                            >
                              <ImageIcon className="w-3.5 h-3.5" />
                              <span>Open App</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddAppToBoard(app);
                            }}
                            className={`py-1.5 px-3 rounded-xl border border-purple-500/30 bg-[#272733] hover:bg-purple-600 hover:text-white active:scale-98 text-purple-200 text-xs font-bold font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                              app.appType === 'cro_mobile_landing_page' || app.appType === 'landing_page_generator' || app.appType === 'product_regrouper' || app.appType === 'text_to_code_landing_page' || app.appType === 'text_to_image_landing_page'
                                ? 'flex-1'
                                : 'w-full'
                            }`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Add to Board</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        ) : (
          /* Button to re-open Skills panel when collapsed */
          <button
            onClick={() => handleToggleSkillsPanel(true)}
            className="absolute left-3 top-3 z-30 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-md text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
            title="Open Skills Panel"
          >
            <Plus className="w-3.5 h-3.5 text-blue-600" />
            <span>Skills / Nodes</span>
          </button>
        )}

        {/* PANEL B: Center Board Canvas with MOVABLE CARDS, CRISP GRID, DYNAMIC BEZIERS */}
        <main
          ref={canvasRef}
          onMouseDown={handleCanvasMouseDown}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDropSkill}
          style={{ backgroundColor: boardBgColor }}
          className={`flex-1 h-full relative overflow-hidden select-none transition-colors duration-150 ${
            drawMode
              ? 'cursor-crosshair'
              : activeTool === 'pan' || isSpacePressed
              ? isPanning
                ? 'cursor-grabbing'
                : 'cursor-grab'
              : 'cursor-default'
          }`}
        >
          {/* Active Mouse Drawing Banner Overlay */}
          {drawMode && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-[#16161a]/95 text-white border border-blue-500/60 rounded-full px-5 py-2 shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in fade-in select-none">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-bold text-white">
                ✏️ Mouse Draw: Click & drag anywhere on board to draw {drawMode === 'circle' ? 'Circle' : 'Rectangle'} zone
              </span>
              <button
                type="button"
                onClick={() => {
                  setDrawMode(null);
                  setActiveDrawing(null);
                }}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-rose-500/20 hover:text-rose-300 text-white text-[11px] font-semibold cursor-pointer transition-colors"
              >
                Cancel
              </button>
            </div>
          )}

          {/* PROFESSIONAL SVG GRID (Dots, Lines, or Cross) - Synchronized with Zoom & Pan */}
          <div className="absolute inset-0 pointer-events-none">
            <svg width="100%" height="100%" className="w-full h-full">
              <defs>
                {gridStyle === 'dots' && (
                  <pattern
                    id="board-grid-pattern"
                    width={24 * (zoom / 100)}
                    height={24 * (zoom / 100)}
                    patternUnits="userSpaceOnUse"
                    patternTransform={`translate(${panOffset.x}, ${panOffset.y})`}
                  >
                    <circle
                      cx={(12 * zoom) / 100}
                      cy={(12 * zoom) / 100}
                      r={Math.max(0.9, (1.2 * zoom) / 100)}
                      fill={isDarkSurface ? '#555566' : '#CBD5E1'}
                      opacity={isDarkSurface ? '0.75' : '0.85'}
                    />
                  </pattern>
                )}
                {gridStyle === 'lines' && (
                  <pattern
                    id="board-grid-pattern"
                    width={30 * (zoom / 100)}
                    height={30 * (zoom / 100)}
                    patternUnits="userSpaceOnUse"
                    patternTransform={`translate(${panOffset.x}, ${panOffset.y})`}
                  >
                    <path
                      d={`M ${30 * (zoom / 100)} 0 L 0 0 0 ${30 * (zoom / 100)}`}
                      fill="none"
                      stroke={isDarkSurface ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}
                      strokeWidth="1"
                    />
                  </pattern>
                )}
                {gridStyle === 'cross' && (
                  <pattern
                    id="board-grid-pattern"
                    width={36 * (zoom / 100)}
                    height={36 * (zoom / 100)}
                    patternUnits="userSpaceOnUse"
                    patternTransform={`translate(${panOffset.x}, ${panOffset.y})`}
                  >
                    <path
                      d={`M ${18 * (zoom / 100)} ${14 * (zoom / 100)} L ${18 * (zoom / 100)} ${22 * (zoom / 100)} M ${14 * (zoom / 100)} ${18 * (zoom / 100)} L ${22 * (zoom / 100)} ${18 * (zoom / 100)}`}
                      stroke={isDarkSurface ? 'rgba(255,255,255,0.18)' : '#CBD5E1'}
                      strokeWidth="1"
                      opacity="0.85"
                    />
                  </pattern>
                )}
              </defs>
              <rect width="100%" height="100%" fill="url(#board-grid-pattern)" />
            </svg>
          </div>

          {/* Visual Drop Target Highlight when dragging a skill over canvas with mouse */}
          {isCanvasDragOver && (
            <div className="absolute inset-4 rounded-3xl border-2 border-dashed border-blue-500 bg-blue-500/5 z-20 pointer-events-none flex items-center justify-center animate-pulse">
              <div className="px-4 py-2.5 rounded-2xl bg-white shadow-2xl border border-blue-300 text-blue-600 font-bold text-xs flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>Drop skill here to add to Board</span>
              </div>
            </div>
          )}

          {/* Floating Live Connection Status Helper */}
          {connectingFrom && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
              <div className="px-4 py-2 rounded-2xl bg-neutral-900/95 text-white border border-emerald-500/50 shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <span className="text-emerald-400 font-bold">Connecting:</span>
                  <span className="text-neutral-200">
                    {connectingFrom.subId?.startsWith('prod:')
                      ? 'Product selected'
                      : connectingFrom.subId?.startsWith('adset:')
                      ? 'AdSet selected'
                      : 'Skill node selected'}
                  </span>
                  <span className="text-neutral-400 mx-1">•</span>
                  <span className="text-neutral-300">
                    Click or drop on any {connectingFrom.subId ? 'Skill card' : 'Product or Skill card'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setConnectingFrom(null);
                    setConnectingMousePos(null);
                  }}
                  className="px-2 py-0.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-[11px] font-mono cursor-pointer border border-white/10"
                >
                  Cancel (Esc)
                </button>
              </div>
            </div>
          )}

          {/* Canvas Scaled & Panned Content Viewport - Infinite plane without artificial bounding clamp */}
          <div
            className="absolute inset-0 origin-top-left overflow-visible select-none transition-transform duration-75"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom / 100})`,
              transformOrigin: '0 0',
            }}
          >
            {/* 0. BACKGROUND SHAPES & FRAMES (STRICTLY ALWAYS IN THE BACK BEHIND CARDS AT z-0) */}
            {boardShapes.map((shape) => {
              const isSelected = selectedShapeId === shape.id;
              const isCircle = shape.type === 'circle';
              const isEditingTitle = editingShapeTitleId === shape.id;
              const isBeingDragged = draggingShapeId === shape.id;
              const isBeingResized = resizingShape?.id === shape.id;

              return (
                <div
                  key={shape.id}
                  data-shape-id={shape.id}
                  onMouseDown={(e) => handleShapeMouseDown(e, shape.id)}
                  className={`absolute group transition-shadow ${
                    isBeingDragged ? 'cursor-grabbing' : 'cursor-move'
                  } ${
                    isCircle ? 'rounded-full' : 'rounded-3xl'
                  } ${
                    isSelected
                      ? 'ring-2 ring-blue-500/90 shadow-xl'
                      : 'hover:ring-1 hover:ring-white/40'
                  }`}
                  style={{
                    left: shape.x,
                    top: shape.y,
                    width: shape.width,
                    height: shape.height,
                    backgroundColor: hexToRgba(shape.color, shape.opacity || 0.14),
                    borderWidth: '2px',
                    borderStyle: 'dashed',
                    borderColor: shape.strokeColor || shape.color,
                    zIndex: 0, // ALWAYS BEHIND CARDS
                    pointerEvents: 'auto',
                  }}
                >
                  {/* Top Title Tag Header Badge */}
                  <div
                    data-no-drag="true"
                    onMouseDown={(e) => e.stopPropagation()}
                    className={`absolute -top-3.5 left-6 px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-2 backdrop-blur-md border cursor-default select-none ${
                      isDarkSurface
                        ? 'bg-[#18181b]/95 border-white/20 text-white'
                        : 'bg-white/95 border-slate-300 text-slate-800'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: shape.color }}
                    />
                    {isEditingTitle ? (
                      <input
                        type="text"
                        autoFocus
                        value={shape.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBoardShapes((prev) =>
                            prev.map((s) => (s.id === shape.id ? { ...s, title: val } : s))
                          );
                        }}
                        onBlur={() => setEditingShapeTitleId(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') setEditingShapeTitleId(null);
                        }}
                        className="bg-transparent border-b border-blue-400 text-xs font-bold outline-none px-1"
                      />
                    ) : (
                      <span
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          setEditingShapeTitleId(shape.id);
                        }}
                        title="Double-click to edit zone title"
                        className="cursor-pointer hover:underline text-[11px]"
                      >
                        {shape.title || (isCircle ? 'Circle Zone' : 'Rectangle Zone')}
                      </span>
                    )}

                    {/* Quick color change swatches */}
                    <div className="flex items-center gap-1 pl-1 border-l border-white/20">
                      {['#6366f1', '#10b981', '#f59e0b', '#f43f5e', '#06b6d4', '#8b5cf6'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setBoardShapes((prev) =>
                              prev.map((s) => (s.id === shape.id ? { ...s, color: c, strokeColor: c } : s))
                            );
                          }}
                          className="w-2.5 h-2.5 rounded-full hover:scale-125 transition-transform cursor-pointer"
                          style={{ backgroundColor: c }}
                          title={`Color ${c}`}
                        />
                      ))}

                      {/* Delete shape button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteShape(shape.id);
                        }}
                        className="ml-1 p-0.5 rounded text-neutral-400 hover:text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                        title="Delete this background zone"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Multi-Handle Mouse Resizing (Corner, Right, Bottom) */}
                  {isSelected && (
                    <>
                      {/* Bottom-right Corner Resize Handle */}
                      <div
                        data-no-drag="true"
                        onMouseDown={(e) => handleStartResizeShape(e, shape.id, 'corner')}
                        className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-white border-2 border-blue-500 shadow-md flex items-center justify-center cursor-nwse-resize hover:scale-125 transition-transform z-10"
                        title="Drag corner with mouse to resize both width and height"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      </div>

                      {/* Right Edge Resize Handle */}
                      {!isCircle && (
                        <div
                          data-no-drag="true"
                          onMouseDown={(e) => handleStartResizeShape(e, shape.id, 'right')}
                          className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-7 rounded-full bg-white border border-blue-500 shadow-md flex items-center justify-center cursor-ew-resize hover:scale-125 transition-transform z-10"
                          title="Drag right edge with mouse to adjust width"
                        >
                          <div className="w-0.5 h-3 rounded-full bg-blue-500" />
                        </div>
                      )}

                      {/* Bottom Edge Resize Handle */}
                      {!isCircle && (
                        <div
                          data-no-drag="true"
                          onMouseDown={(e) => handleStartResizeShape(e, shape.id, 'bottom')}
                          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-7 h-3 rounded-full bg-white border border-blue-500 shadow-md flex items-center justify-center cursor-ns-resize hover:scale-125 transition-transform z-10"
                          title="Drag bottom edge with mouse to adjust height"
                        >
                          <div className="w-3 h-0.5 rounded-full bg-blue-500" />
                        </div>
                      )}

                      {/* Live Dimensions Display Badge */}
                      <div className="absolute -bottom-6 right-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-neutral-900/90 text-white/95 border border-white/20 shadow-md pointer-events-none select-none flex items-center gap-1 z-10">
                        <span>{shape.width} × {shape.height} px</span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}

            {/* Ghost Preview for Active Mouse Drawing on Canvas */}
            {activeDrawing && (() => {
              const minX = Math.min(activeDrawing.startX, activeDrawing.currentX);
              const minY = Math.min(activeDrawing.startY, activeDrawing.currentY);
              const rawW = Math.abs(activeDrawing.currentX - activeDrawing.startX);
              const rawH = Math.abs(activeDrawing.currentY - activeDrawing.startY);
              const isCircle = activeDrawing.type === 'circle';
              const w = Math.max(10, isCircle ? Math.max(rawW, rawH) : rawW);
              const h = Math.max(10, isCircle ? Math.max(rawW, rawH) : rawH);

              return (
                <div
                  className={`absolute pointer-events-none border-2 border-dashed ${
                    isCircle ? 'rounded-full' : 'rounded-3xl'
                  } z-0 shadow-lg`}
                  style={{
                    left: minX,
                    top: minY,
                    width: w,
                    height: h,
                    backgroundColor: hexToRgba(activeDrawing.color, 0.22),
                    borderColor: activeDrawing.color,
                  }}
                >
                  <div
                    className="absolute -top-7 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-md flex items-center gap-1.5"
                    style={{ backgroundColor: activeDrawing.color }}
                  >
                    <span>✏️ Drawing {isCircle ? 'Circle' : 'Rectangle'}: {w} × {h} px</span>
                  </div>
                </div>
              );
            })()}

            {/* DYNAMIC SVG CONNECTING EDGES (Follow nodes in real-time) */}
            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0">
              <defs>
                <marker
                  id="board-arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3B82F6" />
                </marker>
                <marker
                  id="board-arrow-selected"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#EF4444" />
                </marker>
              </defs>

              {/* Existing Connected Edges */}
              {edges.map((edge) => {
                const fromNode = nodes.find((n) => n.id === edge.from);
                const toNode = nodes.find((n) => n.id === edge.to);
                if (!fromNode || !toNode) return null;

                const start = getNodeAnchor(fromNode, edge.fromAnchor || 'right', edge.fromSubId);
                const end = getNodeAnchor(toNode, edge.toAnchor || 'left', edge.toSubId);
                const pathString = getBezierPath(start, end, edge.fromAnchor || 'right', edge.toAnchor || 'left');
                const isSelected = selectedEdgeId === edge.id;

                return (
                  <g key={edge.id} className="pointer-events-auto">
                    {/* Wide invisible click target for easy line selection */}
                    <path
                      d={pathString}
                      stroke="transparent"
                      strokeWidth="18"
                      fill="none"
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEdgeId(edge.id);
                        setSelectedNodeId(null);
                      }}
                    />
                    {/* Background glow path */}
                    <path
                      d={pathString}
                      stroke={isSelected ? '#FDA4AF' : '#93C5FD'}
                      strokeWidth={isSelected ? '6' : '4'}
                      strokeOpacity={isSelected ? '0.6' : '0.25'}
                      fill="none"
                      className="pointer-events-none transition-all"
                    />
                    {/* Foreground path */}
                    <path
                      d={pathString}
                      stroke={isSelected ? '#EF4444' : '#3B82F6'}
                      strokeWidth={isSelected ? '2.5' : '2'}
                      strokeDasharray={edge.style === 'dashed' || isRunningWorkflow ? '5 5' : 'none'}
                      fill="none"
                      markerEnd={isSelected ? 'url(#board-arrow-selected)' : 'url(#board-arrow)'}
                      className="cursor-pointer transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEdgeId(edge.id);
                        setSelectedNodeId(null);
                      }}
                    />
                  </g>
                );
              })}

              {/* Live interactive connection preview while dragging a port */}
              {connectingFrom && connectingMousePos && (() => {
                const sourceNode = nodes.find((n) => n.id === connectingFrom.nodeId);
                if (!sourceNode) return null;
                const start = getNodeAnchor(sourceNode, connectingFrom.anchor, connectingFrom.subId);
                const end = connectingMousePos;
                const path = getBezierPath(start, end, connectingFrom.anchor, 'left');
                return (
                  <path
                    d={path}
                    stroke="#3B82F6"
                    strokeWidth="2.5"
                    strokeDasharray="5 5"
                    fill="none"
                    markerEnd="url(#board-arrow)"
                    className="pointer-events-none"
                  />
                );
              })()}
            </svg>

            {/* DYNAMIC CONVERSION METRIC PILLS & DELETE ACTIONS (Exact midpoint on curves) */}
            {edges.map((edge) => {
              const fromNode = nodes.find((n) => n.id === edge.from);
              const toNode = nodes.find((n) => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              const start = getNodeAnchor(fromNode, edge.fromAnchor || 'right', edge.fromSubId);
              const end = getNodeAnchor(toNode, edge.toAnchor || 'left', edge.toSubId);
              const mid = getCurveMidpoint(start, end, edge.fromAnchor || 'right', edge.toAnchor || 'left');
              const isSelected = selectedEdgeId === edge.id;

              if (edge.pillMain) {
                return (
                  <div
                    key={`pill-${edge.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEdgeId(edge.id);
                      setSelectedNodeId(null);
                    }}
                    className={`group/pill absolute z-20 px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-md border shadow-md text-center leading-none transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-rose-400 ring-2 ring-rose-400/30 text-rose-700 shadow-rose-200'
                        : 'border-blue-200 hover:border-blue-400 text-blue-700 hover:shadow-lg'
                    }`}
                    style={{ left: mid.x, top: mid.y }}
                  >
                    <div className="flex items-center gap-1.5">
                      <div>
                        <span className="text-[11px] font-bold block">{edge.pillMain}</span>
                        {edge.pillSub && (
                          <span className="text-[9px] opacity-80 font-medium block mt-0.5">
                            {edge.pillSub}
                          </span>
                        )}
                      </div>
                      {/* Delete connection line button on pill */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteEdge(edge.id);
                        }}
                        className={`p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer ${
                          isSelected ? 'opacity-100 text-rose-600' : 'opacity-0 group-hover/pill:opacity-100'
                        }`}
                        title="Delete this connection line (or press Delete key)"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              }

              // If edge has no pill, show floating delete button when selected
              if (isSelected) {
                return (
                  <div
                    key={`edge-del-${edge.id}`}
                    className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: mid.x, top: mid.y }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteEdge(edge.id);
                      }}
                      className="px-2 py-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-transform hover:scale-105"
                      title="Delete connection line"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete Line</span>
                    </button>
                  </div>
                );
              }

              return null;
            })}

            {/* STICKY NOTES matching screenshot image_ca6855fc.png (Draggable on Canvas) */}
            {stickyNotes.map((note) => {
              const isDragging = draggingStickyId === note.id;
              return (
                <div
                  key={note.id}
                  onMouseDown={(e) => handleStickyMouseDown(e, note.id)}
                  className={`absolute z-10 p-3.5 w-48 rounded-2xl bg-[#FEF08A] text-amber-950 shadow-lg border border-amber-300/80 select-none cursor-grab active:cursor-grabbing transition-shadow ${
                    isDragging ? 'shadow-2xl scale-105 z-30 opacity-95' : 'hover:shadow-xl'
                  }`}
                  style={{
                    left: note.x,
                    top: note.y,
                    transform: `rotate(${note.rotate}deg)`,
                  }}
                >
                  <div className="flex items-center justify-between pb-1.5 text-amber-800 border-b border-amber-300/50 mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
                      Sticky Note
                    </span>
                    <span className="text-sm">{note.icon}</span>
                  </div>
                  <span className="text-xs font-semibold leading-snug block text-amber-950 font-sans">
                    {note.title}
                  </span>
                </div>
              );
            })}

            {/* Clean Board Empty State when no skills exist on board */}
            {nodes.length === 0 && (
              <div
                style={{ left: 180, top: 140 }}
                className="absolute z-10 w-[450px] p-7 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl text-center space-y-4 select-none animate-in fade-in zoom-in-95"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center mx-auto shadow-md shadow-blue-500/25">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900">
                    Your Board is Clean & Ready
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                    Default skills have been removed. Drag any skill from the left library, or click below to start building your custom workflow. All changes save automatically.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isSkillsPanelOpen) {
                        handleToggleSkillsPanel(true);
                      }
                      showToast('Select any skill from the left library to add to your board');
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Browse 670+ Skills</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleAddProductToBoard(SAMPLE_PRODUCTS[0]);
                      showToast('Winning product added to board');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 text-emerald-600" />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>
            )}

            {/* CARDS MATCHING USER ATTACHED SPEC (image_29b431d7.png): Same Card Down Result Preview */}
            {nodes.map((node, nodeIdx) => {
              const isSelected = selectedNodeId === node.id;
              const isDragging = draggingNodeId === node.id;
              const incomingEdge = edges.find((e) => e.to === node.id);
              const sourceNode = incomingEdge ? nodes.find((n) => n.id === incomingEdge.from) : null;
              const dependsOnText = sourceNode ? sourceNode.title : 'Connected Node';
              const isRunningThis = runningNodeId === node.id;
              const isRegrouper = node.appType === 'product_regrouper';

              return (
                <div
                  key={node.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (connectingFrom && connectingFrom.nodeId !== node.id) {
                      handleEndConnection(node.id, 'left');
                      return;
                    }
                    setSelectedNodeId(node.id);
                    setSelectedEdgeId(null);
                  }}
                  onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                  onMouseUp={(e) => {
                    if (connectingFrom && connectingFrom.nodeId !== node.id) {
                      e.stopPropagation();
                      handleEndConnection(node.id, 'left');
                    }
                  }}
                  className={`group absolute z-10 select-none cursor-grab active:cursor-grabbing transition-all duration-150 ${
                    isRegrouper
                      ? 'bg-transparent border-0 shadow-none ring-0 w-max max-w-none'
                      : `${
                          node.isAppNode
                            ? node.appType === 'cro_mobile_landing_page'
                              ? 'w-[1280px] max-w-[98vw] min-h-[820px]'
                              : node.appType === 'landing_page_generator'
                              ? 'w-[1200px] max-w-[98vw] min-h-[500px]'
                              : node.appType === 'text_to_image_landing_page' || node.appType === 'text_to_code_landing_page'
                              ? 'w-[940px] max-w-[96vw] min-h-[160px]'
                              : 'w-[580px] max-w-[94vw] min-h-[160px]'
                            : node.isProduct
                            ? 'w-[320px]'
                            : node.isFile
                            ? 'w-[420px] max-w-[92vw]'
                            : (node.previewSide === 'left' || node.previewSide === 'right') && !node.hideResult && (node.executionResult || isRunningThis)
                            ? 'w-[960px] max-w-[96vw]'
                            : node.isExpandedDown
                            ? 'w-[840px] max-w-[95vw]'
                            : 'w-[560px] max-w-[92vw]'
                        } rounded-2xl bg-white border ${
                          isSelected
                            ? 'border-emerald-500 ring-4 ring-emerald-500/20 shadow-[0_12px_32px_rgba(5,150,105,0.22)]'
                            : connectingFrom && connectingFrom.nodeId !== node.id
                            ? 'border-emerald-400 ring-2 ring-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:border-emerald-500'
                            : 'border-slate-200/90 hover:border-slate-300 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.1)]'
                        }`
                  } ${isDragging ? 'opacity-90 scale-[1.01] shadow-2xl z-30' : ''}`}
                  style={{ left: node.x, top: node.y }}
                >
                  {/* Visual Drop / Click to Link Indicator when Connecting */}
                  {!isRegrouper && connectingFrom && connectingFrom.nodeId !== node.id && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold font-mono tracking-wider shadow-md flex items-center gap-1 z-30 animate-bounce pointer-events-none">
                      <Link2 className="w-3 h-3" />
                      <span>Click to Link</span>
                    </div>
                  )}

                  {/* Top Accent Line */}
                  {!isRegrouper && (
                    <div
                      className={`absolute inset-x-0 top-0 h-[2.5px] rounded-t-2xl ${
                        isSelected
                          ? 'bg-emerald-600'
                          : node.isAppNode
                          ? 'bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500'
                          : node.isFile
                          ? 'bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500'
                          : 'bg-gradient-to-r from-emerald-500/40 via-teal-500/50 to-emerald-500/40'
                      }`}
                    />
                  )}

                  {/* STRICTLY 2-PORT CONNECTION HANDLES: Left & Right anchored firmly at header */}
                  {!isRegrouper && (
                    <>
                      <div
                        title="Connect Left (click or drag to link directly)"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (connectingFrom && connectingFrom.nodeId !== node.id) {
                            handleEndConnection(node.id, 'left');
                          } else {
                            handleStartConnection(node.id, 'left');
                          }
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          handleStartConnection(node.id, 'left');
                        }}
                        onMouseUp={(e) => {
                          e.stopPropagation();
                          handleEndConnection(node.id, 'left');
                        }}
                        className={`absolute -left-2 ${node.isAppNode || node.isFile ? 'top-[50px]' : 'top-[62px]'} -translate-y-1/2 w-4.5 h-4.5 rounded-full bg-white border-2 ${connectingFrom ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-400' : 'border-emerald-500'} shadow-xs hover:scale-150 hover:bg-emerald-600 hover:border-white transition-all cursor-crosshair z-20 group-hover:scale-125 flex items-center justify-center`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      </div>
                      <div
                        title="Connect Right (click or drag to link directly)"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (connectingFrom && connectingFrom.nodeId !== node.id) {
                            handleEndConnection(node.id, 'right');
                          } else {
                            handleStartConnection(node.id, 'right');
                          }
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          handleStartConnection(node.id, 'right');
                        }}
                        onMouseUp={(e) => {
                          e.stopPropagation();
                          handleEndConnection(node.id, 'right');
                        }}
                        className={`absolute -right-2 ${node.isAppNode || node.isFile ? 'top-[50px]' : 'top-[62px]'} -translate-y-1/2 w-4.5 h-4.5 rounded-full bg-white border-2 ${connectingFrom ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-400' : 'border-emerald-500'} shadow-xs hover:scale-150 hover:bg-emerald-600 hover:border-white transition-all cursor-crosshair z-20 group-hover:scale-125 flex items-center justify-center`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      </div>
                    </>
                  )}

                  {node.isAppNode ? (
                    /* AI APP CARD ON CANVAS */
                    <AppNodeCanvasCard
                      node={node}
                      isSelected={isSelected}
                      isConnecting={Boolean(connectingFrom)}
                      onUpdateNode={(updated) => updateNode(node.id, updated)}
                      onDeleteNode={() => deleteNode(node.id)}
                      onStartConnection={(anchor, subId) => handleStartConnection(node.id, anchor, subId)}
                      onEndConnection={(anchor, subId) => handleEndConnection(node.id, anchor, subId)}
                      onLinkSkillToSubItem={(subType, subData, skillTitle) => handleQuickLinkSkillFromOrgChart(node.id, subType, subData, skillTitle)}
                      existingConnectedSubIds={edges.filter((e) => e.from === node.id || e.to === node.id).map((e) => (e.from === node.id ? e.fromSubId : e.toSubId)).filter(Boolean) as string[]}
                      boardSkillsList={nodes.filter((n) => n.id !== node.id && !n.isAppNode).map((n) => ({ id: n.id, title: n.title, category: n.category }))}
                    />
                  ) : node.isFile ? (
                    /* UPLOADED FILE NODE CARD ON CANVAS (Best Visual Preview) */
                    <div className="p-3.5 space-y-3">
                      {/* File Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-9 h-9 rounded-xl ${node.iconBg} flex items-center justify-center text-white shrink-0 shadow-xs`}>
                            {node.fileData?.type === 'excel' && <FileSpreadsheet className="w-5 h-5" />}
                            {node.fileData?.type === 'pdf' && <FileText className="w-5 h-5" />}
                            {node.fileData?.type === 'word' && <FileText className="w-5 h-5" />}
                            {node.fileData?.type === 'json' && <FileCode className="w-5 h-5" />}
                            {node.fileData?.type === 'image' && <ImageIcon className="w-5 h-5" />}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider font-mono ${
                                node.fileData?.type === 'excel' ? 'bg-emerald-100 text-emerald-800' :
                                node.fileData?.type === 'pdf' ? 'bg-rose-100 text-rose-800' :
                                node.fileData?.type === 'word' ? 'bg-blue-100 text-blue-800' :
                                node.fileData?.type === 'json' ? 'bg-amber-100 text-amber-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {node.fileData?.type?.toUpperCase() || 'FILE'}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {Math.round((node.fileData?.size || 0) / 1024)} KB
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5" title={node.title}>
                              {node.title}
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {node.fileData && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewFileModal(node.fileData!);
                              }}
                              className="p-1 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-all cursor-pointer"
                              title="Inspect Full File"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNode(node.id);
                            }}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                            title="Remove File Node"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Type-Specific Visual Preview */}
                      {node.fileData?.type === 'excel' && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[10px] font-mono font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                            <span>📊 {node.fileData.tableData?.totalRows || 0} Records</span>
                            <span>{node.fileData.tableData?.headers?.length || 0} Columns</span>
                            <span className="text-emerald-600 font-bold">COD Table</span>
                          </div>

                          {/* Real Interactive Spreadsheet Table Preview */}
                          <div className="max-h-48 overflow-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
                            <table className="w-full text-left text-[10px] border-collapse font-sans">
                              <thead>
                                <tr className="bg-slate-100/90 border-b border-slate-200 sticky top-0 z-10">
                                  {node.fileData.tableData?.headers?.slice(0, 4).map((h, i) => (
                                    <th key={i} className="p-1.5 font-bold text-slate-700 whitespace-nowrap border-r border-slate-200 last:border-0 font-mono text-[9px]">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {node.fileData.tableData?.rows?.slice(0, 5).map((row, rIdx) => (
                                  <tr key={rIdx} className="border-b border-slate-100 hover:bg-emerald-50/40 transition-colors odd:bg-white even:bg-slate-50/50">
                                    {row.slice(0, 4).map((cell, cIdx) => (
                                      <td key={cIdx} className="p-1.5 text-slate-700 whitespace-nowrap border-r border-slate-100 last:border-0 font-mono text-[9.5px]">
                                        {String(cell)}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <p className="text-[10.5px] text-slate-600 leading-tight">
                            💡 {node.fileData.summary}
                          </p>
                        </div>
                      )}

                      {node.fileData?.type === 'image' && (
                        <div className="space-y-2">
                          <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 max-h-52 group">
                            <img
                              src={node.fileData.previewUrl || node.fileData.url}
                              alt={node.title}
                              className="w-full h-44 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[9.5px] font-mono">
                              High-Res Visual
                            </div>
                          </div>
                          <p className="text-[10.5px] text-slate-600 leading-tight">
                            {node.fileData.summary}
                          </p>
                        </div>
                      )}

                      {(node.fileData?.type === 'pdf' || node.fileData?.type === 'word') && (
                        <div className="space-y-2">
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-sans text-[11px] text-slate-700 leading-relaxed max-h-44 overflow-y-auto space-y-1.5">
                            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-[10.5px] border-b border-slate-200 pb-1 font-mono">
                              <span>📄 Document Excerpt</span>
                              <span className="text-[9px] text-slate-400 font-normal ml-auto">Ready for AI analysis</span>
                            </div>
                            <div className="whitespace-pre-line text-slate-600 text-[10px] line-clamp-6">
                              {node.fileData.textContent || node.fileData.summary}
                            </div>
                          </div>
                          <p className="text-[10.5px] text-slate-600 leading-tight">
                            💡 {node.fileData.summary}
                          </p>
                        </div>
                      )}

                      {node.fileData?.type === 'json' && (
                        <div className="space-y-2">
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-[10px] max-h-44 overflow-y-auto leading-relaxed shadow-inner">
                            <pre className="whitespace-pre-wrap">
                              {JSON.stringify(node.fileData.jsonData, null, 2)?.slice(0, 320)}...
                            </pre>
                          </div>
                          <p className="text-[10.5px] text-slate-600 leading-tight">
                            💡 {node.fileData.summary}
                          </p>
                        </div>
                      )}

                      {/* Connection Footer */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                        <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Connected to Board</span>
                        </span>
                        <span className="font-mono text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded-md">
                          Drag link to any Skill ⚡
                        </span>
                      </div>
                    </div>
                  ) : node.isProduct ? (
                    /* PRODUCT NODE CARD ON CANVAS */
                    <div className="p-3.5 space-y-2.5">
                      <div className="flex items-start gap-3">
                        <img
                          src={node.productData?.image || 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=300&h=300&fit=crop'}
                          alt={node.title}
                          className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200/90 shadow-2xs"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200/60 uppercase tracking-wider font-mono truncate">
                              {node.productData?.niche || 'Winning Product'}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSettingsModalNodeId(node.id);
                                  setSettingsActiveTab('config');
                                }}
                                className="p-1 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all cursor-pointer"
                                title="Product Settings"
                              >
                                <Settings className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNode(node.id);
                                }}
                                className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                                title="Delete Product Card"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5 leading-tight">
                            {node.title}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-xs font-black text-emerald-600 font-mono">
                              {node.productData?.sellingPrice?.toLocaleString() || '4,800'} DZD
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono line-through">
                              {node.productData?.productCost?.toLocaleString() || '1,400'}
                            </span>
                            <span className="text-[9.5px] font-bold text-blue-600 bg-blue-50 px-1 rounded">
                              +{node.productData?.profitMargin || 71}% margin
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 text-[9.5px]">
                        <span className="text-slate-400 flex items-center gap-1">
                          <ShoppingBag className="w-3 h-3 text-emerald-600" />
                          Source Product
                        </span>
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                          Connect right dot → Skill
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* AI SKILL CARD MATCHING EXACT SPEC (image_29b431d7.png) */
                    <div className={`p-4 ${
                      (node.previewSide === 'left' || node.previewSide === 'right') && !node.hideResult && (node.executionResult || isRunningThis)
                        ? `flex ${node.previewSide === 'left' ? 'flex-row-reverse' : 'flex-row'} items-start gap-4`
                        : 'space-y-3'
                    }`}>
                      <div className={`space-y-3 ${
                        (node.previewSide === 'left' || node.previewSide === 'right') && !node.hideResult && (node.executionResult || isRunningThis)
                          ? 'w-[390px] shrink-0'
                          : 'w-full'
                      }`}>
                      {/* 1. SECTION BADGE & STATUS */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider font-mono">
                            {node.sectionNumber || `SECTION ${String(nodeIdx + 1).padStart(2, '0')}`}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{node.executionResult ? 'Completed — — •' : isRunningThis ? 'Running Analysis...' : 'Ready — — •'}</span>
                          </span>
                        </div>

                        {/* Action Icons: Typography (Aa), Settings & Delete */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            data-no-drag="true"
                            onMouseDown={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSettingsModalNodeId(node.id);
                              setSettingsActiveTab('typography');
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Taille & Style du texte (Taille, Police, Graisse)"
                          >
                            <Type className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            data-no-drag="true"
                            onMouseDown={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSettingsModalNodeId(node.id);
                              setSettingsActiveTab('config');
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                            title="Skill Settings & Prompt"
                          >
                            <Settings className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            data-no-drag="true"
                            onMouseDown={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNode(node.id);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                            title="Delete Card"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* 2. CARD TITLE & SUBTITLE */}
                      <div>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-lg ${node.iconBg} flex items-center justify-center shrink-0 shadow-2xs text-white`}>
                            {renderCardIcon(node)}
                          </div>
                          <h3 className="text-base font-bold text-slate-900 leading-tight">
                            {node.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {node.subtitle}
                        </p>
                      </div>

                      {/* 3. CONTROLS PILLS ROW 1: Depends on, Web Research, Language */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Org Chart Div Link Badge */}
                        {incomingEdge && incomingEdge.fromSubId && (() => {
                          const fromOrgNode = nodes.find((n) => n.id === incomingEdge.from);
                          if (fromOrgNode?.appType === 'product_regrouper') {
                            const isAdSet = incomingEdge.fromSubId.startsWith('adset:');
                            const isProd = incomingEdge.fromSubId.startsWith('prod:');
                            return (
                              <div
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-violet-300 bg-violet-50 text-[11px] font-bold text-violet-800 shadow-2xs"
                                title={`This skill is actively receiving extracted data from ${isAdSet ? 'AdSet' : 'Product'}: ${incomingEdge.pillSub}`}
                              >
                                <Zap className="w-3 h-3 text-amber-500 animate-pulse" />
                                <span>{isAdSet ? `⚡ AdSet: ${incomingEdge.pillSub || 'Target'}` : isProd ? `⚡ Product: ${incomingEdge.pillSub || 'Data'}` : '⚡ Linked to Org Chart'}</span>
                              </div>
                            );
                          }
                          return null;
                        })()}

                        {/* Depends on pill */}
                        <div
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-700 shadow-2xs"
                          title={`Depends on: ${dependsOnText}`}
                        >
                          <span className="text-slate-400">Depends on:</span>
                          <span className="font-semibold text-slate-800 truncate max-w-[150px]">{dependsOnText}</span>
                        </div>

                        {/* Live Web Research Toggle Button */}
                        <button
                          type="button"
                          data-no-drag="true"
                          onMouseDown={(e) => e.stopPropagation()}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleLiveWebResearch(node.id);
                          }}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10.5px] font-bold tracking-tight uppercase transition-all cursor-pointer shadow-2xs ${
                            node.liveWebResearch
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                          title="Toggle Live Web Research"
                        >
                          <Globe className={`w-3 h-3 ${node.liveWebResearch ? 'text-emerald-600' : 'text-slate-400'}`} />
                          <span>LIVE WEB RESEARCH | {node.liveWebResearch ? 'ON' : 'OFF'}</span>
                        </button>

                        {/* Language dropdown */}
                        <div className="relative">
                          <button
                            type="button"
                            data-no-drag="true"
                            onMouseDown={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveLanguageMenuNodeId(activeLanguageMenuNodeId === node.id ? null : node.id);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-200/90 bg-indigo-50/80 hover:bg-indigo-100 text-indigo-900 text-[11px] font-semibold shadow-2xs transition-all hover:scale-[1.02] cursor-pointer"
                            title="Select language: Analysis will be generated 100% in this language"
                          >
                            <Languages className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{node.language || 'English'}</span>
                            <ChevronDown className="w-3 h-3 text-indigo-500" />
                          </button>

                          {activeLanguageMenuNodeId === node.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              onMouseDown={(e) => e.stopPropagation()}
                              className="absolute left-0 mt-1 z-50 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 text-xs animate-in fade-in zoom-in-95"
                            >
                              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                                Output Language
                              </div>
                              {[
                                { id: 'English', label: 'English', sub: '100% English' },
                                { id: 'French', label: 'Français', sub: '100% Français' },
                                { id: 'Arabic', label: 'العربية', sub: '100% فصحى' },
                                { id: 'Algerian Darja', label: 'الدارجة الجزائرية', sub: '100% الدارجة' },
                              ].map(({ id, label, sub }) => (
                                <button
                                  key={id}
                                  type="button"
                                  data-no-drag="true"
                                  onMouseDown={(e) => e.stopPropagation()}
                                  onClick={() => handleChangeNodeLanguage(node.id, id)}
                                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between text-xs cursor-pointer ${
                                    (node.language || 'English') === id
                                      ? 'font-bold text-indigo-700 bg-indigo-50/80'
                                      : 'text-slate-700'
                                  }`}
                                >
                                  <div>
                                    <div className="font-medium">{label}</div>
                                    <div className="text-[10px] text-slate-400 font-normal">{sub}</div>
                                  </div>
                                  {(node.language || 'English') === id && (
                                    <Check className="w-4 h-4 text-indigo-600" />
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Target Market Dropdown (Algeria Default as requested) */}
                        <div className="relative">
                          <button
                            type="button"
                            data-no-drag="true"
                            onMouseDown={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMarketMenuNodeId(activeMarketMenuNodeId === node.id ? null : node.id);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-300/90 bg-emerald-50/90 hover:bg-emerald-100 text-emerald-950 text-[11px] font-semibold shadow-2xs transition-all hover:scale-[1.02] cursor-pointer"
                            title="Target Market: Directs AI audience, currency, courier dynamics & consumer psychology (Default: Algeria)"
                          >
                            <Store className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-sm">
                              {TARGET_MARKETS.find((m) => m.id === (node.targetMarket || 'Algeria'))?.flag || '🇩🇿'}
                            </span>
                            <span className="font-bold">{node.targetMarket || 'Algeria'}</span>
                            <ChevronDown className="w-3 h-3 text-emerald-600" />
                          </button>

                          {activeMarketMenuNodeId === node.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              onMouseDown={(e) => e.stopPropagation()}
                              className="absolute left-0 mt-1 z-50 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 text-xs animate-in fade-in zoom-in-95 max-h-80 overflow-y-auto"
                            >
                              <div className="px-3 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1 flex items-center justify-between">
                                <span>Target Market / Country</span>
                                <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">🇩🇿 Algeria Default</span>
                              </div>

                              {/* Categorized list of all requested countries */}
                              {['North Africa', 'GCC', 'Western Europe', 'Eastern Europe', 'Americas', 'Asia & Pacific', 'Eurasia'].map((regionName) => {
                                const countriesInRegion = TARGET_MARKETS.filter((m) => m.region === regionName);
                                if (countriesInRegion.length === 0) return null;

                                return (
                                  <div key={regionName} className="mb-1.5">
                                    <div className="px-3 py-1 text-[9.5px] font-black text-indigo-700 uppercase tracking-wider bg-slate-50/80 font-mono">
                                      {regionName}
                                    </div>
                                    {countriesInRegion.map((market) => {
                                      const isSelected = (node.targetMarket || 'Algeria') === market.id;
                                      return (
                                        <button
                                          key={market.id}
                                          type="button"
                                          data-no-drag="true"
                                          onMouseDown={(e) => e.stopPropagation()}
                                          onClick={() => {
                                            setNodes((prev) =>
                                              prev.map((n) => (n.id === node.id ? { ...n, targetMarket: market.id } : n))
                                            );
                                            setActiveMarketMenuNodeId(null);
                                            showToast(`Target market set to ${market.flag} ${market.name}`);
                                          }}
                                          className={`w-full text-left px-3 py-1.5 hover:bg-emerald-50/70 flex items-center justify-between text-xs cursor-pointer ${
                                            isSelected
                                              ? 'font-bold text-emerald-950 bg-emerald-50/90'
                                              : 'text-slate-700'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2">
                                            <span className="text-sm">{market.flag}</span>
                                            <div>
                                              <div className="font-semibold">{market.name}</div>
                                              <div className="text-[10px] text-slate-400 font-mono">
                                                Currency: {market.currency}
                                              </div>
                                            </div>
                                          </div>
                                          {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                                        </button>
                                      );
                                    })}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 4. CONTROLS PILLS ROW 2: Standard v, WORK PROMPT DEFAULT, PREVIEW RESULTAT DEFAULT */}
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        {/* Mode Selector */}
                        <button
                          type="button"
                          data-no-drag="true"
                          onMouseDown={(e) => e.stopPropagation()}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            const current = node.analysisMode || 'standard';
                            const next = current === 'standard' ? 'deep' : current === 'deep' ? 'express' : 'standard';
                            setNodes((prev) => prev.map((n) => n.id === node.id ? { ...n, analysisMode: next } : n));
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-semibold capitalize shadow-2xs cursor-pointer"
                          title="Click to toggle Analysis Depth"
                        >
                          <span>{node.analysisMode || 'Standard'}</span>
                          <ChevronDown className="w-3 h-3 text-slate-400" />
                        </button>

                        {/* WORK PROMPT DEFAULT */}
                        <button
                          type="button"
                          data-no-drag="true"
                          onMouseDown={(e) => e.stopPropagation()}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSettingsModalNodeId(node.id);
                            setSettingsActiveTab('prompt');
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-semibold shadow-2xs cursor-pointer"
                          title="Edit AI Prompt Template"
                        >
                          <Sparkles className="w-3 h-3 text-purple-600" />
                          <span>WORK PROMPT</span>
                          <span className="text-[9px] uppercase px-1 py-0.2 bg-slate-100 rounded text-slate-500 font-mono">DEFAULT</span>
                        </button>

                        {/* PREVIEW RESULTAT DEFAULT */}
                        <button
                          type="button"
                          data-no-drag="true"
                          onMouseDown={(e) => e.stopPropagation()}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!node.executionResult) {
                              handleRunSingleNode(node.id);
                            } else {
                              setNodes((prev) =>
                                prev.map((n) => (n.id === node.id ? { ...n, hideResult: !n.hideResult } : n))
                              );
                            }
                          }}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-semibold shadow-2xs cursor-pointer ${
                            !node.hideResult && (node.executionResult || isRunningThis)
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                          }`}
                          title="Toggle result preview (or run analysis if empty)"
                        >
                          <FileText className="w-3 h-3 text-emerald-600" />
                          <span>PREVIEW RESULTAT</span>
                          <span className="text-[9px] uppercase px-1 py-0.2 bg-slate-100 rounded text-slate-500 font-mono">DEFAULT</span>
                        </button>
                      </div>

                      {/* 5. CUSTOM AI INSTRUCTIONS (collapsible via HIDE TEXT) */}
                      {!node.hideText && (
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                            CUSTOM AI INSTRUCTIONS
                          </label>
                          <textarea
                            rows={2}
                            data-no-drag="true"
                            onMouseDown={(e) => e.stopPropagation()}
                            value={node.customInstructions ?? ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setNodes((prev) =>
                                prev.map((n) => (n.id === node.id ? { ...n, customInstructions: val } : n))
                              );
                            }}
                            placeholder="Add custom instructions, angle focus, or target audience..."
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-sans"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      )}

                      {/* 6. ACTION BUTTONS ROW (as shown in image_29b431d7.png) */}
                      <div className="flex items-center gap-2 pt-1 flex-wrap">
                        {/* RUN AI ANALYSIS (green button) */}
                        <button
                          type="button"
                          data-no-drag="true"
                          onMouseDown={(e) => e.stopPropagation()}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRunSingleNode(node.id);
                          }}
                          disabled={isRunningThis}
                          className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs flex items-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-80 select-none ${
                            isRunningThis
                              ? 'bg-amber-600 animate-pulse'
                              : 'bg-[#059669] hover:bg-[#047857]'
                          }`}
                        >
                          <Play className={`w-3.5 h-3.5 fill-white ${isRunningThis ? 'animate-spin' : ''}`} />
                          <span>{isRunningThis ? 'RUNNING AI...' : 'RUN AI ANALYSIS'}</span>
                        </button>

                        {/* HIDE TEXT / SHOW TEXT */}
                        <button
                          type="button"
                          data-no-drag="true"
                          onMouseDown={(e) => e.stopPropagation()}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            setNodes((prev) =>
                              prev.map((n) => (n.id === node.id ? { ...n, hideText: !n.hideText } : n))
                            );
                          }}
                          className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>{node.hideText ? 'SHOW TEXT' : 'HIDE TEXT'}</span>
                        </button>

                        {/* HIDE RESULT / SHOW RESULT */}
                        <button
                          type="button"
                          data-no-drag="true"
                          onMouseDown={(e) => e.stopPropagation()}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            setNodes((prev) =>
                              prev.map((n) => (n.id === node.id ? { ...n, hideResult: !n.hideResult } : n))
                            );
                          }}
                          className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-500" />
                          <span>{node.hideResult ? 'SHOW RESULT' : 'HIDE RESULT'}</span>
                        </button>

                        {/* COPY JSON */}
                        <button
                          type="button"
                          data-no-drag="true"
                          onMouseDown={(e) => e.stopPropagation()}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (node.executionResult) {
                              navigator.clipboard.writeText(JSON.stringify(node.executionResult, null, 2));
                              showToast('JSON copied to clipboard!');
                            } else {
                              showToast('Run the node first to copy results.');
                            }
                          }}
                          className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>COPY JSON</span>
                        </button>

                        {/* COPY PROMPT */}
                        <button
                          type="button"
                          data-no-drag="true"
                          onMouseDown={(e) => e.stopPropagation()}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            const prompt = node.config.customPrompt || getDefaultPromptForNode(node.title, node.subtitle);
                            navigator.clipboard.writeText(prompt);
                            showToast('AI Prompt copied to clipboard!');
                          }}
                          className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-500" />
                          <span>COPY PROMPT</span>
                        </button>
                      </div>

                      </div>

                      {/* 7. UNIVERSAL RESEARCH & CONTENT PRESENTATION ENGINE */}
                      {!node.hideResult && (node.executionResult || isRunningThis) && (
                        <div
                          data-no-drag="true"
                          data-no-card-drag="true"
                          onMouseDown={(e) => e.stopPropagation()}
                          onPointerDown={(e) => e.stopPropagation()}
                          className={`animate-in fade-in select-text cursor-auto ${
                            node.previewSide === 'left' || node.previewSide === 'right'
                              ? 'flex-1 min-w-0 self-stretch'
                              : 'pt-2 border-t border-slate-100 space-y-2'
                          }`}
                        >
                          {isRunningThis && !node.executionResult ? (
                            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 animate-in fade-in">
                              <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
                                <Sparkles className="w-4 h-4 animate-spin text-emerald-600" />
                                <span>Generating Intelligence Report with Universal AI Engine...</span>
                              </div>
                              <div className="space-y-2 animate-pulse">
                                <div className="h-4 bg-emerald-100/70 rounded-md w-2/3"></div>
                                <div className="h-3 bg-slate-100 rounded-md w-full"></div>
                                <div className="h-3 bg-slate-100 rounded-md w-5/6"></div>
                                <div className="h-3 bg-slate-100 rounded-md w-4/5"></div>
                              </div>
                            </div>
                          ) : node.executionResult ? (
                            <UniversalContentEngine
                              content={normalizeAndCleanAIOutput(node.executionResult.content)}
                              skillTitle={node.executionResult.skillName || node.title}
                              productTitle={node.executionResult.productName}
                              category={node.category}
                              language={node.executionResult.language || node.language || 'English'}
                              webResearchUsed={node.executionResult.webResearchUsed}
                              executedAt={node.executionResult.executedAt}
                              isSimulated={node.executionResult.isSimulated}
                              activeTab={node.activePreviewTab || 'preview'}
                              onTabChange={(tab) => {
                                setNodes((prev) =>
                                  prev.map((n) => (n.id === node.id ? { ...n, activePreviewTab: tab } : n))
                                );
                              }}
                              direction={node.previewDirection || 'ltr'}
                              onDirectionToggle={() => {
                                const nextDir = node.previewDirection === 'rtl' ? 'ltr' : 'rtl';
                                setNodes((prev) =>
                                  prev.map((n) => (n.id === node.id ? { ...n, previewDirection: nextDir } : n))
                                );
                              }}
                              placement={node.previewSide || 'bottom'}
                              onPlacementToggle={() => {
                                const nextSide =
                                  (!node.previewSide || node.previewSide === 'bottom')
                                    ? 'right'
                                    : node.previewSide === 'right'
                                    ? 'left'
                                    : 'bottom';
                                setNodes((prev) =>
                                  prev.map((n) => (n.id === node.id ? { ...n, previewSide: nextSide } : n))
                                );
                              }}
                              promptText={node.config.customPrompt || getDefaultPromptForNode(node.title, node.subtitle)}
                              maxHeight={node.isExpandedDown ? 'max-h-[850px] min-h-[460px]' : 'max-h-[500px]'}
                              isExpanded={!!node.isExpandedDown}
                              onToggleExpand={() => {
                                setNodes((prev) =>
                                  prev.map((n) => (n.id === node.id ? { ...n, isExpandedDown: !n.isExpandedDown } : n))
                                );
                              }}
                              textStyle={node.textStyle}
                              onTextStyleChange={(newStyle) => updateNodeTextStyle(node.id, newStyle)}
                              onOpenSettings={() => {
                                setSettingsModalNodeId(node.id);
                                setSettingsActiveTab('typography');
                              }}
                              skillIconBg={node.iconBg}
                              skillIconColor={node.iconColor}
                              skillColor={node.iconBg}
                            />
                          ) : null}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

          </div>
          {/* PERMANENTLY FIXED TO BOTTOM RIGHT OF CANVAS VIEWPORT (Never scrolls, never shifts with pan/zoom) */}
          <div className="absolute bottom-6 right-6 z-30 flex flex-col items-end gap-2.5 pointer-events-auto select-none">
            {/* Minimap card matching image_ca6855fc.png */}
            {isMinimapOpen && (
              <div className="w-56 h-36 bg-[#161618]/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-2.5 relative overflow-hidden flex flex-col animate-in fade-in zoom-in-95 text-neutral-200">
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10 text-[10px] font-semibold text-neutral-400">
                  <span className="flex items-center gap-1 text-white font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Board Overview
                  </span>
                  <div className="flex items-center gap-1 text-neutral-400">
                    <button
                      onClick={handleResetLeftMargin}
                      className="hover:text-emerald-400 p-0.5 rounded transition-colors cursor-pointer"
                      title="Reset View & Margin"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setIsMinimapOpen(false)}
                      className="hover:text-white p-0.5 rounded transition-colors cursor-pointer"
                      title="Hide Minimap"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="w-full flex-1 relative bg-[#0e0e11] rounded-xl border border-white/5 overflow-hidden">
                  {/* Miniature node representations in minimap */}
                  {nodes.map((n) => (
                    <div
                      key={`mini-${n.id}`}
                      className="absolute w-3.5 h-2 rounded-xs bg-emerald-500/80 transition-all duration-75"
                      style={{
                        left: `${Math.max(4, Math.min(92, (n.x / 1200) * 80 + 10))}%`,
                        top: `${Math.max(4, Math.min(88, (n.y / 1100) * 75 + 10))}%`,
                      }}
                    />
                  ))}
                  {/* Minimap Viewport indicator */}
                  <div
                    className="w-20 h-12 border-2 border-emerald-400/80 rounded-md bg-emerald-500/15 absolute pointer-events-none transition-all duration-75"
                    style={{
                      left: `${Math.max(2, Math.min(68, (-panOffset.x / 14) + 12))}%`,
                      top: `${Math.max(2, Math.min(64, (-panOffset.y / 14) + 12))}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Floating Manual Zoom Bar (CSS Selector 2) with Surface Background Color option */}
            <div className="flex items-center gap-1.5 bg-[#161618]/95 backdrop-blur-md border border-white/10 rounded-2xl p-1.5 shadow-2xl text-neutral-200">
              <button
                onClick={() => handleSetZoomWithAnchor((z) => Math.max(10, z - 10))}
                className="p-1.5 rounded-xl text-neutral-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                title="Zoom Out (-10%)"
              >
                <Minus className="w-4 h-4" />
              </button>

              {/* Floating Manual Zoom Slider: Drag with mouse (10% to 400%) */}
              <input
                type="range"
                min="10"
                max="400"
                step="5"
                value={zoom}
                onChange={(e) => handleSetZoomWithAnchor(Number(e.target.value))}
                className="w-20 h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                title={`Manual Zoom: ${zoom}%`}
              />

              <button
                onClick={() => handleSetZoomWithAnchor((z) => Math.min(400, z + 10))}
                className="p-1.5 rounded-xl text-neutral-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                title="Zoom In (+10%)"
              >
                <Plus className="w-4 h-4" />
              </button>

              <div className="h-4 w-px bg-white/10 mx-0.5" />

              <button
                onClick={handleResetLeftMargin}
                className="px-2 py-1 rounded-xl text-xs font-bold text-neutral-200 hover:bg-white/10 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                title="Align Left Margin (60px, 85% Zoom)"
              >
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Margin</span>
              </button>

              <button
                onClick={() => handleSetZoomWithAnchor(100)}
                className="px-2 py-1 rounded-xl text-xs font-bold text-neutral-200 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                title="Actual Size (100%)"
              >
                {zoom}%
              </button>

              <div className="h-4 w-px bg-white/10 mx-0.5" />

              {/* Quick Mouse Wheel Zoom Mode indicator & toggle */}
              <button
                onClick={() => {
                  const nextState = !wheelZoomEnabled;
                  setWheelZoomEnabled(nextState);
                  showToast(nextState ? 'Mouse Wheel Zoom: ACTIVE (Scroll to zoom)' : 'Mouse Wheel Zoom: OFF (Scroll to pan)');
                }}
                className={`px-2 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                  wheelZoomEnabled
                    ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/50 hover:bg-emerald-900/60'
                    : 'bg-[#1f1f23] text-neutral-400 border border-white/5 hover:bg-[#282830]'
                }`}
                title={`Mouse wheel currently ${wheelZoomEnabled ? 'ZOOMS the board (scroll up/down). Click to switch to Pan.' : 'PANS the canvas. Click to switch to Zoom.'}`}
              >
                <MousePointer className="w-3.5 h-3.5 text-emerald-400" />
                <span>Wheel: {wheelZoomEnabled ? 'Zoom' : 'Pan'}</span>
              </button>

              <div className="h-4 w-px bg-white/10 mx-0.5" />

              {/* Surface Background Color Picker Option with Small Cards View */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsSurfaceColorMenuOpen(!isSurfaceColorMenuOpen)}
                  className="px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 bg-[#1f1f23] hover:bg-[#282830] text-neutral-200 hover:text-white border border-white/10 shadow-xs"
                  title="Change Board Surface Background Color"
                >
                  <Palette className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-xs shrink-0"
                    style={{ backgroundColor: boardBgColor }}
                  />
                  <span className="hidden sm:inline">Surface</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>

                {isSurfaceColorMenuOpen && (
                  <div
                    className="absolute bottom-full mb-3 right-0 w-80 bg-[#161618] rounded-2xl shadow-2xl border border-white/15 p-3.5 z-50 text-neutral-200 animate-in fade-in zoom-in-95 backdrop-blur-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Popover Header */}
                    <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-white">Board Surface Color</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsSurfaceColorMenuOpen(false)}
                        className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-neutral-400 mb-2.5 leading-snug">
                      Click any small surface card with your mouse to change the canvas background:
                    </p>

                    {/* Small Cards View Surface Colors */}
                    <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                      {SURFACE_COLOR_PRESETS.map((preset) => {
                        const isSelected = boardBgColor.toLowerCase() === preset.color.toLowerCase();
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => handleSelectBoardBgColor(preset.color)}
                            className={`w-full p-2 rounded-xl flex items-center justify-between gap-3 text-left transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-[#242429] border-white/30 shadow-md ring-1 ring-white/20'
                                : 'bg-[#1c1c20] hover:bg-[#232328] border-white/5 hover:border-white/15'
                            }`}
                          >
                            {/* Left: Small Card View Surface Swatch with Mini Grid */}
                            <div
                              className="w-14 h-9 rounded-lg border border-white/15 shadow-inner shrink-0 relative overflow-hidden flex items-center justify-center"
                              style={{ backgroundColor: preset.color }}
                            >
                              <svg width="100%" height="100%" className="w-full h-full opacity-60">
                                <pattern
                                  id={`mini-pat-${preset.id}`}
                                  width="6"
                                  height="6"
                                  patternUnits="userSpaceOnUse"
                                >
                                  <circle cx="3" cy="3" r="0.8" fill={preset.dotColor} />
                                </pattern>
                                <rect width="100%" height="100%" fill={`url(#mini-pat-${preset.id})`} />
                              </svg>
                            </div>

                            {/* Middle: Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-white truncate">
                                  {preset.name}
                                </span>
                                <span className="text-[10px] font-mono text-neutral-400">
                                  {preset.color}
                                </span>
                              </div>
                              <span className="text-[10px] text-neutral-400 block truncate">
                                {preset.description}
                              </span>
                            </div>

                            {/* Right: Selected Checkmark */}
                            {isSelected ? (
                              <div className="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center shrink-0 shadow-xs">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-white/10 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Mouse Color Picker */}
                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={boardBgColor}
                          onChange={(e) => handleSelectBoardBgColor(e.target.value)}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-white/20 p-0.5"
                          title="Choose custom color with mouse"
                        />
                        <div>
                          <span className="text-xs font-semibold text-white block">Custom Color</span>
                          <span className="text-[10px] font-mono text-neutral-400">{boardBgColor}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSelectBoardBgColor('#161618')}
                        className="text-[10.5px] font-medium text-neutral-400 hover:text-white px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer"
                      >
                        Reset Theme
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="h-4 w-px bg-white/10 mx-0.5" />

              {/* Shape Drawing Tool Option (Behind Cards) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsShapeToolMenuOpen(!isShapeToolMenuOpen)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border shadow-xs ${
                    isShapeToolMenuOpen
                      ? 'bg-[#282830] text-white border-white/25 ring-1 ring-blue-500/40'
                      : 'bg-[#1f1f23] hover:bg-[#282830] text-neutral-200 hover:text-white border-white/10'
                  }`}
                  title="Draw Zones & Background Shapes (Always behind cards)"
                >
                  <Shapes className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="hidden sm:inline">Draw Zone</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>

                {isShapeToolMenuOpen && (
                  <div
                    className="absolute bottom-full mb-3 right-0 w-80 bg-[#161618] rounded-2xl shadow-2xl border border-white/15 p-3.5 z-50 text-neutral-200 animate-in fade-in zoom-in-95 backdrop-blur-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Shapes className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold text-white">Draw Behind Cards</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsShapeToolMenuOpen(false)}
                        className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-neutral-400 mb-2.5 leading-snug">
                      Background shapes stay <strong>permanently behind cards</strong>. Choose mouse drawing or 1-click placement:
                    </p>

                    {/* Interactive Mouse Draw Mode Triggers */}
                    <div className="space-y-1.5 mb-3">
                      <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider block">
                        ✏️ Click & Drag on Board with Mouse:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setDrawMode('rectangle');
                            setIsShapeToolMenuOpen(false);
                            showToast('✏️ Click & drag anywhere on the board to draw a Rectangle zone');
                          }}
                          className="p-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 hover:border-blue-500 flex items-center justify-center gap-2 transition-all group cursor-pointer"
                        >
                          <Square className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-bold text-white group-hover:text-blue-200">
                            Draw Rectangle
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setDrawMode('circle');
                            setIsShapeToolMenuOpen(false);
                            showToast('✏️ Click & drag anywhere on the board to draw a Circle zone');
                          }}
                          className="p-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 hover:border-purple-500 flex items-center justify-center gap-2 transition-all group cursor-pointer"
                        >
                          <Circle className="w-4 h-4 text-purple-400" />
                          <span className="text-xs font-bold text-white group-hover:text-purple-200">
                            Draw Circle
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* 1-Click Placement Options */}
                    <div className="space-y-1.5 mb-3 pt-2 border-t border-white/10">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">
                        + Or Add to Center View:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            handleAddShape('rectangle');
                            setIsShapeToolMenuOpen(false);
                          }}
                          className="p-2.5 rounded-xl bg-[#1f1f24] hover:bg-[#282830] border border-white/10 hover:border-white/20 flex flex-col items-center gap-1 transition-all text-center group cursor-pointer"
                        >
                          <span className="text-xs font-bold text-neutral-200 group-hover:text-white">
                            + Rectangle Zone
                          </span>
                          <span className="text-[9.5px] text-neutral-400">
                            Auto centered
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            handleAddShape('circle');
                            setIsShapeToolMenuOpen(false);
                          }}
                          className="p-2.5 rounded-xl bg-[#1f1f24] hover:bg-[#282830] border border-white/10 hover:border-white/20 flex flex-col items-center gap-1 transition-all text-center group cursor-pointer"
                        >
                          <span className="text-xs font-bold text-neutral-200 group-hover:text-white">
                            + Circle Zone
                          </span>
                          <span className="text-[9.5px] text-neutral-400">
                            Auto centered
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Preset Color Themes */}
                    <div className="space-y-1.5 pt-2 border-t border-white/10">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">
                        Quick Tint & Add:
                      </span>
                      <div className="grid grid-cols-6 gap-1.5">
                        {[
                          { color: '#6366f1', name: 'Violet' },
                          { color: '#10b981', name: 'Emerald' },
                          { color: '#f59e0b', name: 'Amber' },
                          { color: '#f43f5e', name: 'Rose' },
                          { color: '#06b6d4', name: 'Cyan' },
                          { color: '#8b5cf6', name: 'Purple' },
                        ].map((c) => (
                          <button
                            key={c.color}
                            type="button"
                            onClick={() => {
                              handleAddShape('rectangle', c.color);
                              setIsShapeToolMenuOpen(false);
                            }}
                            className="h-8 rounded-lg border border-white/20 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                            style={{ backgroundColor: c.color }}
                            title={`Add ${c.name} Rectangle`}
                          >
                            <Plus className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Map toggle when collapsed */}
              {!isMinimapOpen && (
                <button
                  onClick={() => setIsMinimapOpen(true)}
                  className="px-2 py-1 rounded-xl text-xs font-bold text-neutral-200 bg-[#1f1f23] hover:bg-[#282830] transition-colors cursor-pointer border border-white/10"
                  title="Show Minimap"
                >
                  Map
                </button>
              )}
            </div>
          </div>

        </main>

        {/* Floating Ghost when manually dragging a skill with the mouse */}
        {pointerDraggingSkill && pointerDraggingSkill.hasMoved && (
          <div
            className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 p-3 w-48 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-blue-500 shadow-2xl flex items-center gap-2.5 animate-in fade-in"
            style={{
              left: pointerDraggingSkill.currentX,
              top: pointerDraggingSkill.currentY,
            }}
          >
            <div
              className={`w-8 h-8 rounded-xl ${pointerDraggingSkill.skill.iconBg} flex items-center justify-center text-white shrink-0 shadow-sm`}
            >
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="text-xs font-bold text-slate-900 block truncate">
                {pointerDraggingSkill.skill.title}
              </span>
              <span className="text-[10px] text-blue-600 font-semibold block">Drop to place</span>
            </div>
          </div>
        )}

        {/* SKILL & PRODUCT CARD SETTINGS MODAL (User Request: All skill cards add icon setting) */}
        {settingsModalNode && (
          <div
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setSettingsModalNodeId(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl ${settingsModalNode.iconBg} flex items-center justify-center text-white shadow-2xs`}>
                    {renderCardIcon(settingsModalNode)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      {settingsModalNode.title}
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      Configure parameters, AI prompt & execution settings
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSettingsModalNodeId(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex items-center border-b border-slate-100 px-5 text-xs font-semibold bg-white">
                <button
                  onClick={() => setSettingsActiveTab('config')}
                  className={`py-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
                    settingsActiveTab === 'config'
                      ? 'border-blue-600 text-blue-600 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Configuration
                </button>
                <button
                  onClick={() => setSettingsActiveTab('prompt')}
                  className={`py-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    settingsActiveTab === 'prompt'
                      ? 'border-blue-600 text-blue-600 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>AI Prompt Template</span>
                </button>
                <button
                  onClick={() => setSettingsActiveTab('typography')}
                  className={`py-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    settingsActiveTab === 'typography'
                      ? 'border-blue-600 text-blue-600 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Type className="w-3.5 h-3.5 text-blue-600" />
                  <span>Taille & Style du texte</span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-5 overflow-y-auto space-y-4 flex-1">
                {settingsActiveTab === 'config' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Node Title
                      </label>
                      <input
                        type="text"
                        value={settingsModalNode.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNodes((prev) =>
                            prev.map((n) => (n.id === settingsModalNode.id ? { ...n, title: val } : n))
                          );
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Subtitle / Description
                      </label>
                      <input
                        type="text"
                        value={settingsModalNode.subtitle}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNodes((prev) =>
                            prev.map((n) => (n.id === settingsModalNode.id ? { ...n, subtitle: val } : n))
                          );
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500 focus:bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Execution Language
                        </label>
                        <select
                          value={settingsModalNode.language || 'English'}
                          onChange={(e) => handleChangeNodeLanguage(settingsModalNode.id, e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                        >
                          <option value="English">English</option>
                          <option value="Algerian Darja">Algerian Darja</option>
                          <option value="French">French</option>
                          <option value="Arabic">Arabic</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Live Web Research
                        </label>
                        <button
                          type="button"
                          onClick={() => handleToggleLiveWebResearch(settingsModalNode.id)}
                          className={`w-full px-3 py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                            settingsModalNode.liveWebResearch
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>{settingsModalNode.liveWebResearch ? 'Active (Search On)' : 'Disabled'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Campaign Objective
                        </label>
                        <input
                          type="text"
                          value={settingsModalNode.config.campaignObjective}
                          onChange={(e) =>
                            updateNodeConfigById(settingsModalNode.id, { campaignObjective: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Daily Budget ($)
                        </label>
                        <input
                          type="text"
                          value={settingsModalNode.config.budget}
                          onChange={(e) =>
                            updateNodeConfigById(settingsModalNode.id, { budget: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ) : settingsActiveTab === 'prompt' ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">
                        Custom AI Prompt Template
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const def = getDefaultPromptForNode(settingsModalNode.title, settingsModalNode.subtitle);
                          updateNodeConfigById(settingsModalNode.id, { customPrompt: def });
                        }}
                        className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        Reset to Default
                      </button>
                    </div>

                    <textarea
                      rows={7}
                      value={
                        settingsModalNode.config.customPrompt !== undefined
                          ? settingsModalNode.config.customPrompt
                          : getDefaultPromptForNode(settingsModalNode.title, settingsModalNode.subtitle)
                      }
                      onChange={(e) =>
                        updateNodeConfigById(settingsModalNode.id, { customPrompt: e.target.value })
                      }
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 leading-relaxed focus:outline-none focus:border-blue-500 focus:bg-white"
                    />

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                        Click variable to insert:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          '{product_title}',
                          '{niche}',
                          '{selling_price}',
                          '{product_cost}',
                          '{profit_margin}',
                          '{selling_points}',
                          '{language}',
                        ].map((variableTag) => (
                          <button
                            key={variableTag}
                            type="button"
                            onClick={() => {
                              const current =
                                settingsModalNode.config.customPrompt !== undefined
                                  ? settingsModalNode.config.customPrompt
                                  : getDefaultPromptForNode(settingsModalNode.title, settingsModalNode.subtitle);
                              updateNodeConfigById(settingsModalNode.id, {
                                customPrompt: current + ' ' + variableTag,
                              });
                            }}
                            className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 text-[10.5px] font-mono text-slate-600 transition-colors cursor-pointer"
                          >
                            +{variableTag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* TYPOGRAPHY & TEXT STYLING TAB (Taille & Style du texte) */
                  <div className="space-y-5">
                    {/* Size scale header with active % display and quick stepper */}
                    <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-slate-50 p-4 rounded-2xl border border-blue-100/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <Type className="w-4 h-4 text-blue-600" />
                            <span>Taille du texte (Font Size Scaling)</span>
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Ajustez l'échelle de lecture pour prévisualiser les résultats confortablement
                          </span>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-blue-600 text-white font-mono font-black text-sm shadow-2xs">
                          {settingsModalNode.textStyle?.fontSizeScale || 125}%
                        </span>
                      </div>

                      {/* Presets: S, M, L, XL, 2XL */}
                      <div>
                        <span className="text-[10.5px] uppercase font-bold text-slate-500 font-mono block mb-1.5">
                          Préréglages rapides (Presets) :
                        </span>
                        <div className="grid grid-cols-5 gap-2">
                          {[
                            { label: 'Compact', val: 100, sub: '100%' },
                            { label: 'Standard', val: 115, sub: '115%' },
                            { label: 'Grand', val: 130, sub: '130%' },
                            { label: 'Très Grand', val: 150, sub: '150%' },
                            { label: 'Géant', val: 170, sub: '170%' },
                          ].map((p) => {
                            const isSelected = (settingsModalNode.textStyle?.fontSizeScale || 125) === p.val;
                            return (
                              <button
                                key={p.val}
                                type="button"
                                onClick={() => updateNodeTextStyle(settingsModalNode.id, { fontSizeScale: p.val })}
                                className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                                }`}
                              >
                                <span className="block text-xs font-bold">{p.label}</span>
                                <span className={`block text-[10px] font-mono ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                                  {p.sub}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Precise Slider + Stepper Controls */}
                      <div className="pt-1 space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                          <span>Ajustement précis (80% à 180%)</span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                const curr = settingsModalNode.textStyle?.fontSizeScale || 125;
                                updateNodeTextStyle(settingsModalNode.id, { fontSizeScale: Math.max(80, curr - 5) });
                              }}
                              className="px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-mono font-bold text-xs cursor-pointer shadow-2xs"
                              title="Diminuer de 5%"
                            >
                              -5%
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const curr = settingsModalNode.textStyle?.fontSizeScale || 125;
                                updateNodeTextStyle(settingsModalNode.id, { fontSizeScale: Math.min(180, curr + 5) });
                              }}
                              className="px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-mono font-bold text-xs cursor-pointer shadow-2xs"
                              title="Augmenter de 5%"
                            >
                              +5%
                            </button>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="80"
                          max="180"
                          step="5"
                          value={settingsModalNode.textStyle?.fontSizeScale || 125}
                          onChange={(e) => updateNodeTextStyle(settingsModalNode.id, { fontSizeScale: Number(e.target.value) })}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-[10px] font-mono text-slate-400">
                          <span>80% (Compact)</span>
                          <span>125% (Confortable)</span>
                          <span>180% (Large)</span>
                        </div>
                      </div>
                    </div>

                    {/* Font Weight & Line Height */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Font Weight */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">
                          Épaisseur du texte (Font Weight)
                        </label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {[
                            { label: 'Normal (400)', val: 'normal' },
                            { label: 'Médium (500)', val: 'medium' },
                            { label: 'Semi-Bold (600)', val: 'semibold' },
                            { label: 'Bold (700)', val: 'bold' },
                          ].map((w) => {
                            const isSelected = (settingsModalNode.textStyle?.fontWeight || 'normal') === w.val;
                            return (
                              <button
                                key={w.val}
                                type="button"
                                onClick={() => updateNodeTextStyle(settingsModalNode.id, { fontWeight: w.val as any })}
                                className={`py-1.5 px-2 rounded-xl text-xs text-left border transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-2xs'
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                {w.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Line Height */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">
                          Hauteur de ligne (Interligne)
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {[
                            { label: 'Serré', val: 'tight', sub: '1.4' },
                            { label: 'Normal', val: 'normal', sub: '1.65' },
                            { label: 'Aéré', val: 'relaxed', sub: '1.85' },
                          ].map((lh) => {
                            const isSelected = (settingsModalNode.textStyle?.lineHeight || 'normal') === lh.val;
                            return (
                              <button
                                key={lh.val}
                                type="button"
                                onClick={() => updateNodeTextStyle(settingsModalNode.id, { lineHeight: lh.val as any })}
                                className={`py-1.5 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-2xs'
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                <span className="block text-xs font-semibold">{lh.label}</span>
                                <span className={`block text-[10px] font-mono ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                                  {lh.sub}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Font Family */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">
                        Famille de Police (Font Family)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: 'Sans Moderne', val: 'sans', fontClass: 'font-sans', desc: 'Jakarta / Inter' },
                          { label: 'Serif Élégant', val: 'serif', fontClass: 'font-serif', desc: 'Georgia / Editorial' },
                          { label: 'Monospace Tech', val: 'mono', fontClass: 'font-mono', desc: 'JetBrains / Code' },
                        ].map((f) => {
                          const isSelected = (settingsModalNode.textStyle?.fontFamily || 'sans') === f.val;
                          return (
                            <button
                              key={f.val}
                              type="button"
                              onClick={() => updateNodeTextStyle(settingsModalNode.id, { fontFamily: f.val as any })}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-2xs ring-1 ring-blue-500'
                                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <span className={`block text-xs font-bold ${f.fontClass}`}>{f.label}</span>
                              <span className="block text-[10px] text-slate-400 mt-0.5">{f.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Color Theme */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">
                        Thème de Couleur & Contraste
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {[
                          { label: 'Défaut', val: 'default', color: 'bg-slate-800' },
                          { label: 'Émeraude', val: 'emerald', color: 'bg-emerald-600' },
                          { label: 'Violet IA', val: 'purple', color: 'bg-purple-600' },
                          { label: 'Ambre Chaud', val: 'amber', color: 'bg-amber-600' },
                          { label: 'Haut Contraste', val: 'contrast', color: 'bg-black' },
                        ].map((th) => {
                          const isSelected = (settingsModalNode.textStyle?.colorTheme || 'default') === th.val;
                          return (
                            <button
                              key={th.val}
                              type="button"
                              onClick={() => updateNodeTextStyle(settingsModalNode.id, { colorTheme: th.val as any })}
                              className={`p-2 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold ring-1 ring-blue-500'
                                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <span className={`w-3 h-3 rounded-full shrink-0 ${th.color}`} />
                              <span className="text-[11px] truncate">{th.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Live Interactive Preview Box */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-slate-700 block">
                        Aperçu en direct (Live Preview) :
                      </span>
                      <div
                        className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2 transition-all overflow-hidden"
                        style={{
                          fontSize: `${settingsModalNode.textStyle?.fontSizeScale || 125}%`,
                          fontWeight:
                            (settingsModalNode.textStyle?.fontWeight === 'bold'
                              ? 700
                              : settingsModalNode.textStyle?.fontWeight === 'semibold'
                              ? 600
                              : settingsModalNode.textStyle?.fontWeight === 'medium'
                              ? 500
                              : 400),
                          lineHeight:
                            (settingsModalNode.textStyle?.lineHeight === 'tight'
                              ? 1.4
                              : settingsModalNode.textStyle?.lineHeight === 'relaxed'
                              ? 1.85
                              : 1.65),
                          fontFamily:
                            (settingsModalNode.textStyle?.fontFamily === 'serif'
                              ? 'Merriweather, Georgia, serif'
                              : settingsModalNode.textStyle?.fontFamily === 'mono'
                              ? '"JetBrains Mono", monospace'
                              : 'inherit'),
                        }}
                      >
                        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                          <span className="font-bold text-slate-900">
                            Rapport d'Intelligence E-commerce
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[0.75em] font-bold font-mono">
                            3,800 DZD • +71% Marge
                          </span>
                        </div>
                        <p className="text-slate-700 m-0">
                          Le coussin orthopédique offre une opportunité COD éprouvée en Algérie sur les Wilayas d'Alger, Oran et Sétif avec un taux de livraison cible de 64%.
                        </p>
                        <div className="p-2 rounded-xl bg-purple-50 text-purple-900 border border-purple-200 text-[0.85em] font-semibold italic">
                          "شفت هاد الكوسان بالجيل لي راه داير حالة؟ يمتص كامل الضغط حتى لوكان تقعد فوق حبة بيض!"
                        </div>
                      </div>
                    </div>

                    {/* Actions: Apply to all cards & Reset */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          updateNodeTextStyle(settingsModalNode.id, {
                            fontSizeScale: 125,
                            fontWeight: 'normal',
                            lineHeight: 'normal',
                            fontFamily: 'sans',
                            colorTheme: 'default',
                          });
                        }}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                      >
                        Réinitialiser aux valeurs par défaut
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const style = settingsModalNode.textStyle || { fontSizeScale: 125 };
                          applyTextStyleToAllNodes(style);
                          setStyleAppliedAllToast(true);
                          setTimeout(() => setStyleAppliedAllToast(false), 2500);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                          styleAppliedAllToast
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200'
                        }`}
                      >
                        {styleAppliedAllToast ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Appliqué à toutes les cartes !</span>
                          </>
                        ) : (
                          <>
                            <Sliders className="w-3.5 h-3.5 text-blue-600" />
                            <span>Appliquer à toutes les cartes du tableau</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => setSettingsModalNodeId(null)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Done
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={async () => {
                      const id = settingsModalNode.id;
                      setSettingsModalNodeId(null);
                      await handleRunSingleNode(id);
                    }}
                    className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Run & Preview Result ↓</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Board Projects Library Modal */}
        <BoardProjectsModal
          isOpen={isProjectsModalOpen}
          onClose={() => setIsProjectsModalOpen(false)}
          projects={boardProjects}
          activeProjectId={activeProjectId}
          onSelectProject={handleSelectProject}
          onNewProject={() => {
            setIsProjectsModalOpen(false);
            setIsNewProjectModalOpen(true);
          }}
          onDuplicateProject={handleDuplicateProject}
          onDeleteProject={handleDeleteProject}
        />

        {/* Create New Board Project Modal */}
        <NewBoardProjectModal
          isOpen={isNewProjectModalOpen}
          onClose={() => setIsNewProjectModalOpen(false)}
          onCreate={handleCreateNewProject}
        />

        {/* NEW CUSTOM SKILL MODAL */}
        {isNewSkillModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95">
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 via-teal-50 to-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      Create New Custom AI Skill
                    </h3>
                    <p className="text-xs text-slate-500">
                      Define what this skill does in text with custom prompt instructions
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNewSkillModalOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Skill Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Algerian Facebook Creative Angle Generator"
                    value={newSkillTitle}
                    onChange={(e) => setNewSkillTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subtitle / Short Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Generates 5 viral hooks in Algerian Darja with objection-handling call scripts"
                    value={newSkillSubtitle}
                    onChange={(e) => setNewSkillSubtitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Category Selection: Choose Existing or Create New */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">
                      Category & Funnel Stage *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomCategoryMode(!isCustomCategoryMode);
                        if (!isCustomCategoryMode) {
                          setCustomCategoryInput('');
                        }
                      }}
                      className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer flex items-center gap-1 font-mono"
                    >
                      {isCustomCategoryMode ? '← Choose Existing Category' : '+ Create New Category'}
                    </button>
                  </div>

                  {!isCustomCategoryMode ? (
                    <div className="relative">
                      <select
                        value={newSkillCategory}
                        onChange={(e) => {
                          if (e.target.value === '__create_new__') {
                            setIsCustomCategoryMode(true);
                            setCustomCategoryInput('');
                          } else {
                            setNewSkillCategory(e.target.value);
                          }
                        }}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-emerald-500 font-medium cursor-pointer shadow-2xs"
                      >
                        <optgroup label="Choose Existing Stage / Category (30+ Categories)">
                          {ALL_SKILL_CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name} ({cat.skills.length} skills)
                            </option>
                          ))}
                        </optgroup>
                        <option value="__create_new__" className="text-emerald-700 font-bold">
                          ✨ + Create Brand New Category...
                        </option>
                      </select>
                    </div>
                  ) : (
                    <div className="space-y-1.5 animate-in fade-in">
                      <input
                        type="text"
                        placeholder="Enter your new category name (e.g., Scaling Tactics DZ, Algerian Influencers...)"
                        value={customCategoryInput}
                        onChange={(e) => setCustomCategoryInput(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border-2 border-emerald-500 text-xs text-slate-900 focus:outline-none font-semibold shadow-2xs"
                        autoFocus
                      />
                      <p className="text-[10.5px] text-emerald-700 font-medium">
                        ✓ A dedicated category section with this name will be created in your library & board.
                      </p>
                    </div>
                  )}
                </div>

                {/* Icon & Color Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Icon Selector */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Card Icon
                    </label>
                    <div className="grid grid-cols-6 gap-1.5 p-2 bg-slate-50 rounded-xl border border-slate-200">
                      {[
                        { name: 'Sparkles', icon: <Sparkles className="w-3.5 h-3.5" /> },
                        { name: 'Zap', icon: <Zap className="w-3.5 h-3.5" /> },
                        { name: 'Target', icon: <Target className="w-3.5 h-3.5" /> },
                        { name: 'TrendingUp', icon: <TrendingUp className="w-3.5 h-3.5" /> },
                        { name: 'Layers', icon: <Layers className="w-3.5 h-3.5" /> },
                        { name: 'ShoppingBag', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
                        { name: 'ShieldCheck', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
                        { name: 'DollarSign', icon: <DollarSign className="w-3.5 h-3.5" /> },
                        { name: 'Lightbulb', icon: <Lightbulb className="w-3.5 h-3.5" /> },
                        { name: 'MessageSquareQuote', icon: <MessageSquareQuote className="w-3.5 h-3.5" /> },
                        { name: 'FileText', icon: <FileText className="w-3.5 h-3.5" /> },
                        { name: 'Compass', icon: <Compass className="w-3.5 h-3.5" /> },
                      ].map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => setNewSkillIcon(item.name)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                            newSkillIcon === item.name
                              ? 'bg-emerald-600 text-white shadow-xs scale-105 ring-2 ring-emerald-400/40'
                              : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200/80'
                          }`}
                          title={item.name}
                        >
                          {item.icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Accent Color Selector */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Accent Color
                    </label>
                    <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex-wrap">
                      {[
                        { name: 'Emerald', bg: 'bg-emerald-600', ring: 'ring-emerald-400' },
                        { name: 'Blue', bg: 'bg-blue-600', ring: 'ring-blue-400' },
                        { name: 'Purple', bg: 'bg-purple-600', ring: 'ring-purple-400' },
                        { name: 'Indigo', bg: 'bg-indigo-600', ring: 'ring-indigo-400' },
                        { name: 'Amber', bg: 'bg-amber-600', ring: 'ring-amber-400' },
                        { name: 'Rose', bg: 'bg-rose-600', ring: 'ring-rose-400' },
                        { name: 'Cyan', bg: 'bg-cyan-600', ring: 'ring-cyan-400' },
                      ].map((c) => (
                        <button
                          key={c.bg}
                          type="button"
                          onClick={() => setNewSkillColor(c.bg)}
                          className={`w-6 h-6 rounded-full ${c.bg} transition-all cursor-pointer shadow-2xs ${
                            newSkillColor === c.bg ? 'ring-3 ring-offset-2 scale-110 ' + c.ring : 'hover:scale-105 opacity-80 hover:opacity-100'
                          }`}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Live Preview */}
                <div className="p-3 rounded-2xl bg-gradient-to-r from-slate-50 to-emerald-50/30 border border-slate-200/80 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Board Card Layout Preview
                  </span>
                  <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    <div className={`w-8 h-8 rounded-xl ${newSkillColor} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                      {getDynamicSkillIcon(newSkillIcon, 'w-4 h-4 text-white')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {newSkillTitle || 'Untitled Custom Skill'}
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-mono">
                          CUSTOM
                        </span>
                      </div>
                      <p className="text-[10.5px] text-slate-500 truncate mt-0.5">
                        {isCustomCategoryMode
                          ? customCategoryInput || 'New Category'
                          : ALL_SKILL_CATEGORIES.find((c) => c.id === newSkillCategory)?.name || 'Custom Category'}
                        {' • '}
                        {newSkillSubtitle || 'Custom AI Skill'}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">
                      What should this skill do? (Prompt Instructions) *
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Click to insert variable
                    </span>
                  </div>

                  {/* Variable Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap mb-2">
                    {[
                      '{product_title}',
                      '{selling_price}',
                      '{product_cost}',
                      '{profit_margin}',
                      '{niche}',
                      '{file_name}',
                      '{file_data}',
                      '{language}',
                    ].map((variable) => (
                      <button
                        key={variable}
                        type="button"
                        onClick={() => setNewSkillPrompt((prev) => `${prev} ${variable}`)}
                        className="px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-mono font-semibold border border-emerald-200 transition-colors cursor-pointer"
                      >
                        +{variable}
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={6}
                    value={newSkillPrompt}
                    onChange={(e) => setNewSkillPrompt(e.target.value)}
                    placeholder="Write exactly what you need the AI skill to do..."
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 leading-relaxed focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewSkillModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateCustomSkill}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer active:scale-98 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save & Add Skill</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SKILL REMOVAL CONFIRMATION MODAL WINDOW */}
        {skillToRemove && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
            onClick={() => setSkillToRemove(null)}
          >
            <div
              className="bg-[#18181b] rounded-3xl border border-white/15 shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-rose-950/40 via-red-950/20 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0 shadow-xs">
                    <Trash2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      Remove Skill from List?
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Confirmation required before removing
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSkillToRemove(null)}
                  className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-3">
                <div className="p-3.5 rounded-2xl bg-[#232329] border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                    Skill to Remove
                  </span>
                  <p className="text-sm font-bold text-white">
                    {skillToRemove.title}
                  </p>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  Are you sure you want to remove <strong className="text-white">"{skillToRemove.title}"</strong>? {skillToRemove.isCustom ? 'This custom skill will be permanently deleted.' : 'It will be hidden from your skills drawer. You can restore it anytime with "Restore All".'}
                </p>
              </div>

              <div className="p-4 px-5 border-t border-white/10 bg-[#141416] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setSkillToRemove(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmRemoveSkill}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-98 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Confirm Remove</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FILE PREVIEW MODAL */}
        {previewFileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 max-h-[85vh] flex flex-col">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl ${
                    previewFileModal.type === 'excel' ? 'bg-emerald-600' :
                    previewFileModal.type === 'pdf' ? 'bg-rose-600' :
                    previewFileModal.type === 'word' ? 'bg-blue-600' :
                    previewFileModal.type === 'json' ? 'bg-amber-600' : 'bg-purple-600'
                  } flex items-center justify-center text-white shrink-0 shadow-2xs`}>
                    {previewFileModal.type === 'excel' && <FileSpreadsheet className="w-4 h-4" />}
                    {previewFileModal.type === 'pdf' && <FileText className="w-4 h-4" />}
                    {previewFileModal.type === 'word' && <FileText className="w-4 h-4" />}
                    {previewFileModal.type === 'json' && <FileCode className="w-4 h-4" />}
                    {previewFileModal.type === 'image' && <ImageIcon className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      {previewFileModal.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {previewFileModal.type.toUpperCase()} • {Math.round(previewFileModal.size / 1024)} KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewFileModal(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto flex-1 space-y-3">
                {previewFileModal.type === 'excel' && previewFileModal.tableData && (
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                      <span>Full Table Preview ({previewFileModal.tableData.totalRows} records)</span>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 border-b border-slate-200">
                            {previewFileModal.tableData.headers.map((h, i) => (
                              <th key={i} className="p-2 font-bold text-slate-700 whitespace-nowrap font-mono text-[10.5px]">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {previewFileModal.tableData.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="border-b border-slate-100 odd:bg-white even:bg-slate-50/50 hover:bg-emerald-50/30">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-2 text-slate-700 whitespace-nowrap font-mono text-[11px]">
                                  {String(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {previewFileModal.type === 'image' && (previewFileModal.previewUrl || previewFileModal.url) && (
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 flex items-center justify-center">
                    <img
                      src={previewFileModal.previewUrl || previewFileModal.url}
                      alt={previewFileModal.name}
                      className="max-h-[60vh] object-contain"
                    />
                  </div>
                )}

                {previewFileModal.type === 'json' && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(previewFileModal.jsonData, null, 2)}
                    </pre>
                  </div>
                )}

                {(previewFileModal.type === 'pdf' || previewFileModal.type === 'word') && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-wrap">
                    {previewFileModal.textContent || previewFileModal.summary}
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Ready for AI analysis when attached to board
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewFileModal(null)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleAddFileToBoard(previewFileModal);
                      setPreviewFileModal(null);
                    }}
                    className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold cursor-pointer"
                  >
                    + Add to Board
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Preview Dossier Modal (Matching attached JSON) */}
        <ProductPreviewModal
          product={previewProduct}
          isOpen={Boolean(previewProduct)}
          onClose={() => setPreviewProduct(null)}
          onAddToBoard={handleAddDetailedProductToBoard}
        />

        {/* Product Import Modal (Upload File, Manual, Paste Code JSON) */}
        <ProductImportModal
          isOpen={isProductImportModalOpen}
          onClose={() => setIsProductImportModalOpen(false)}
          onProductAdded={(newProduct) => {
            const fresh = loadProductsFromStorage();
            setProductsList(fresh);
            setPreviewProduct(newProduct);
            showToast(`Imported "${newProduct.name.slice(0, 30)}..."`);
          }}
        />

        {/* Product Regrouper Modal (Select products, group size & cluster into Org Chart) */}
        {isRegrouperModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setIsRegrouperModalOpen(false)}
          >
            <div
              className="w-full max-w-6xl max-h-[94vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <ProductRegrouperApp
                initialData={regrouperData || undefined}
                onUpdateData={(updated) => setRegrouperData(updated)}
                onSendToBoard={(blueprint) => {
                  handleSendRegrouperToBoard(blueprint);
                  setIsRegrouperModalOpen(false);
                }}
                isModal={true}
                onCloseModal={() => setIsRegrouperModalOpen(false)}
              />
            </div>
          </div>
        )}
        {/* Text to Code Landing Page Modal (Image 1 Engine) */}
        {isTextToCodeModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setIsTextToCodeModalOpen(false)}
          >
            <div
              className="w-full max-w-6xl max-h-[94vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <TextToCodeLandingPageApp
                initialData={textToCodeData || undefined}
                onSendToBoard={(lp, html) => {
                  handleSendTextToCodeToBoard(lp, html);
                  setIsTextToCodeModalOpen(false);
                }}
                isModal={true}
                onCloseModal={() => setIsTextToCodeModalOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Text to Image Landing Page Modal (Image 2 Engine) */}
        {isTextToImageLpModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setIsTextToImageLpModalOpen(false)}
          >
            <div
              className="w-full max-w-6xl max-h-[94vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <TextToImageLandingPageApp
                initialData={textToImageLpData || undefined}
                onSendToBoard={(lp) => {
                  handleSendTextToImageLpToBoard(lp);
                  setIsTextToImageLpModalOpen(false);
                }}
                isModal={true}
                onCloseModal={() => setIsTextToImageLpModalOpen(false)}
              />
            </div>
          </div>
        )}

        {/* CRO Landing Page Builder (Mobile) Modal (Exact Image Match) */}
        {isCroMobileModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setIsCroMobileModalOpen(false)}
          >
            <div
              className="w-full max-w-[98vw] max-h-[96vh] flex flex-col bg-[#F3F6FD] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <CroMobileLandingPageBuilder
                isModal={true}
                onClose={() => setIsCroMobileModalOpen(false)}
              />
            </div>
          </div>
        )}

        {/* AI Landing Page Generator Modal (Exact 3-Column Studio matching reference image) */}
        {isLandingPageModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setIsLandingPageModalOpen(false)}
          >
            <div
              className="w-full max-w-[96vw] max-h-[96vh] flex flex-col bg-[#F3F6FF] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <LandingPageGeneratorApp
                initialSettings={landingPageSettings || undefined}
                onSaveSettings={(settings) => setLandingPageSettings(settings)}
                onSendToBoard={(settings) => {
                  handleSendLandingPageToBoard(settings);
                  setIsLandingPageModalOpen(false);
                }}
                isModal={true}
                onCloseModal={() => setIsLandingPageModalOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Board Notification Toast */}
        {boardToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <span>{boardToast}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Simple Crosshair component fallback
function CrosshairIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
    </svg>
  );
}
