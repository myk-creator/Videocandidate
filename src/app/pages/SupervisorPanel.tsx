import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Monitor, 
  FileText, 
  Shield, 
  Lock, 
  Unlock, 
  Eye, 
  Grid, 
  Layout, 
  MoreVertical, 
  AlertTriangle, 
  Send,
  Pin,
  Maximize2
} from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const CANDIDATES = [
  { id: 1, name: "Ahmet Yılmaz", status: "online", image: "https://images.unsplash.com/photo-1740153204804-200310378f2f?w=100&h=100&fit=crop" },
  { id: 2, name: "Ayşe Demir", status: "online", image: "https://images.unsplash.com/photo-1667035533110-7964092f44a6?w=100&h=100&fit=crop" },
  { id: 3, name: "Mehmet Kaya", status: "warning", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: 4, name: "Zeynep Aras", status: "online", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
];

const PDFS = [
  { id: "p1", title: "Sınav Yönergesi.pdf", pages: 4 },
  { id: "p2", title: "Ek Kaynak - Teknik Çizimler.pdf", pages: 12 },
  { id: "p3", title: "Formül Tablosu v2.pdf", pages: 1 },
];

export default function SupervisorPanel() {
  const [selectedCandidate, setSelectedCandidate] = useState(CANDIDATES[0]);
  const [activePDFs, setActivePDFs] = useState<string[]>([]);
  const [pinnedPDFs, setPinnedPDFs] = useState<string[]>([]);
  const [isLocked, setIsLocked] = useState(false);

  const toggleMirror = (pdfId: string) => {
    if (activePDFs.includes(pdfId)) {
      setActivePDFs(prev => prev.filter(id => id !== pdfId));
      setPinnedPDFs(prev => prev.filter(id => id !== pdfId));
      toast.info("PDF yansıtma durduruldu");
    } else {
      setActivePDFs(prev => [...prev, pdfId]);
      toast.success("PDF adaya yansıtıldı");
    }
  };

  const togglePin = (pdfId: string) => {
    if (pinnedPDFs.includes(pdfId)) {
      setPinnedPDFs(prev => prev.filter(id => id !== pdfId));
      toast.info("PDF sabitlemesi kaldırıldı");
    } else {
      setPinnedPDFs(prev => [...prev, pdfId]);
      toast.success("PDF adayın ekranında sabitlendi");
    }
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    toast(isLocked ? "Sınav kilidi açıldı" : "Sınav kilitlendi", {
      icon: isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4 text-destructive" />,
    });
  };

  return (
    <div className="flex h-screen bg-[#030213] overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-80 border-r border-white/5 bg-white/[0.02] flex flex-col backdrop-blur-xl">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center ring-1 ring-white/10">
              <Shield className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white/90">Runway Akademi</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Proctoring Control</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <button className="relative w-full py-3 px-4 bg-[#030213] rounded-xl flex items-center justify-between border border-white/10">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Aday Listesi</span>
              </div>
              <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold">{CANDIDATES.length}</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {CANDIDATES.map((candidate) => (
            <motion.button
              key={candidate.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCandidate(candidate)}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                selectedCandidate.id === candidate.id 
                  ? "bg-white/10 border border-white/20 shadow-lg" 
                  : "hover:bg-white/[0.05] border border-transparent"
              }`}
            >
              <div className="relative">
                <ImageWithFallback
                  src={candidate.image}
                  alt={candidate.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
                />
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#030213] ${
                  candidate.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-white/80">{candidate.name}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {candidate.status === 'online' ? 'Çevrimiçi' : 'Dikkat Gerekiyor'}
                </p>
              </div>
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          ))}
        </div>

        <div className="p-4 border-t border-white/5 bg-white/[0.01]">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
            <span>Sınav Durumu</span>
            <span className="flex items-center gap-1.5 text-emerald-500">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Aktif
            </span>
          </div>
          <button 
            onClick={toggleLock}
            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${
              isLocked 
                ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                : "bg-destructive/20 text-destructive border border-destructive/30 hover:bg-destructive/30"
            }`}
          >
            {isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            {isLocked ? "SINAVI AÇ" : "SINAVI KİLİTLE"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-6">
            <h2 className="text-lg font-semibold text-white/90">İzleme Paneli: {selectedCandidate.name}</h2>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-4">
              <button className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2 text-sm">
                <Grid className="w-4 h-4" />
                Grid Görünümü
              </button>
              <button className="text-primary hover:text-white transition-colors flex items-center gap-2 text-sm font-semibold">
                <Layout className="w-4 h-4" />
                Odaklanmış
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/[0.05] px-3 py-1.5 rounded-lg border border-white/10">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-amber-500">3 Olası İhlal</span>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </header>

        {/* Workspace */}
        <main className="flex-1 p-8 grid grid-cols-12 gap-8 overflow-hidden">
          {/* Candidate Screen Preview */}
          <div className="col-span-8 flex flex-col gap-6">
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              {/* Mock Screen Content */}
              <div className="absolute inset-0 flex flex-col p-12">
                <div className="flex justify-between mb-8">
                  <div className="w-48 h-8 bg-white/5 rounded-lg animate-pulse" />
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-white/5 rounded-lg" />
                    <div className="w-8 h-8 bg-white/5 rounded-lg" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="w-full h-12 bg-white/5 rounded-lg animate-pulse" />
                  <div className="w-3/4 h-12 bg-white/5 rounded-lg animate-pulse" />
                  <div className="w-1/2 h-40 bg-white/5 rounded-2xl animate-pulse mt-8" />
                </div>
              </div>
              
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <Monitor className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-bold text-white/90">ADAY EKRANI - CANLI</span>
              </div>

              {/* PDF Overlays Visualized */}
              <div className="absolute top-4 right-4 flex gap-2">
                {activePDFs.map(pdfId => (
                  <div key={pdfId} className="px-3 py-1.5 bg-primary/80 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-bold flex items-center gap-2">
                    <FileText className="w-3 h-3" />
                    {PDFS.find(p => p.id === pdfId)?.title}
                    {pinnedPDFs.includes(pdfId) && <Pin className="w-2.5 h-2.5" />}
                  </div>
                ))}
              </div>

              {/* Interaction Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <button className="px-6 py-3 bg-white text-black font-bold rounded-2xl shadow-2xl hover:bg-white/90 transform hover:scale-105 transition-all">
                  Tam Ekran İzle
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4 text-white/90 font-semibold">
                  <Shield className="w-4 h-4 text-primary" />
                  Güvenlik Protokolleri
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl border border-white/5">
                    <span className="text-sm text-muted-foreground">Pano Erişimi (Copy/Paste)</span>
                    <span className="text-xs font-bold text-destructive">ENGELLENDİ</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl border border-white/5">
                    <span className="text-sm text-muted-foreground">Ekran Görüntüsü Koruması</span>
                    <span className="text-xs font-bold text-emerald-500">AKTİF</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4 text-white/90 font-semibold">
                  <Eye className="w-4 h-4 text-primary" />
                  Göz Takibi (Eye Tracking)
                </div>
                <div className="flex items-center justify-center h-20 bg-white/[0.02] rounded-xl border border-white/5 border-dashed">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold animate-pulse">Analiz Ediliyor...</span>
                </div>
              </div>
            </div>
          </div>

          {/* PDF & Controls Panel */}
          <div className="col-span-4 space-y-8 flex flex-col">
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3 text-white/90 font-semibold">
                  <FileText className="w-4 h-4 text-primary" />
                  PDF Kaynakları
                </div>
                <button className="text-[10px] font-bold text-primary hover:underline">TÜMÜNÜ GÖR</button>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar">
                {PDFS.map((pdf) => {
                  const isActive = activePDFs.includes(pdf.id);
                  const isPinned = pinnedPDFs.includes(pdf.id);
                  return (
                    <div key={pdf.id} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/20 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                            <FileText className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white/80 line-clamp-1">{pdf.title}</p>
                            <p className="text-[10px] text-muted-foreground">{pdf.pages} Sayfa</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => toggleMirror(pdf.id)}
                          className={`py-2 px-3 rounded-xl text-[10px] font-bold flex items-center justify-center gap-2 transition-all ${
                            isActive 
                              ? "bg-primary text-white" 
                              : "bg-white/5 text-muted-foreground hover:bg-white/10"
                          }`}
                        >
                          <Send className="w-3 h-3" />
                          {isActive ? "DURDUR" : "YANSIT"}
                        </button>
                        <button 
                          disabled={!isActive}
                          onClick={() => togglePin(pdf.id)}
                          className={`py-2 px-3 rounded-xl text-[10px] font-bold flex items-center justify-center gap-2 transition-all ${
                            isPinned 
                              ? "bg-amber-500/20 text-amber-500 border border-amber-500/30" 
                              : "bg-white/5 text-muted-foreground hover:bg-white/10 disabled:opacity-30"
                          }`}
                        >
                          <Pin className="w-3 h-3" />
                          {isPinned ? "SABİTLENDİ" : "SABİTLE"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-white/5">
                <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold transition-all">
                  YENİ KAYNAK YÜKLE
                </button>
              </div>
            </div>

            <div className="bg-destructive/10 border border-destructive/20 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4 text-destructive font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                ACİL EYLEMLER
              </div>
              <div className="grid grid-cols-1 gap-3">
                <button className="py-3 bg-destructive text-white rounded-xl text-xs font-bold hover:bg-destructive/90 transition-all">
                  ADAYI SINAVDAN ÇIKAR
                </button>
                <button className="py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all">
                  SÖZLÜ UYARI GÖNDER
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}
