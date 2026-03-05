import React from "react";
import { Link } from "react-router";
import { Shield, Users, User, ShieldAlert, Monitor, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030213] flex flex-col items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-blue-500/10 opacity-30 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full space-y-12 relative"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold text-white/60 tracking-widest uppercase">Güvenlik Sistemi Aktif</span>
          </div>
          <h1 className="text-5xl font-extrabold text-white tracking-tighter">
            Runway Akademi <span className="text-primary">Proctoring</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            MYK standartlarına uygun, yüksek güvenlikli sınav izleme ve yönetim paneli. 
            Lütfen devam etmek için rolünüzü seçin.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Link to="/supervisor" className="group">
            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4 group-hover:opacity-10 transition-opacity">
                <Shield className="w-48 h-48" />
              </div>
              <div className="relative space-y-6">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
                  <ShieldAlert className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Gözetmen Paneli</h3>
                  <p className="text-muted-foreground text-sm">Adayları izleyin, kaynakları yansıtın ve sınav güvenliğini yönetin.</p>
                </div>
                <div className="flex items-center gap-2 text-primary text-sm font-bold group-hover:translate-x-2 transition-transform">
                  Giriş Yap <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </Link>

          <Link to="/candidate" className="group">
            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4 group-hover:opacity-10 transition-opacity">
                <Monitor className="w-48 h-48" />
              </div>
              <div className="relative space-y-6">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Aday Ekranı</h3>
                  <p className="text-muted-foreground text-sm">Sınava başlayın. Güvenli modda içeriklere erişin ve soruları yanıtlayın.</p>
                </div>
                <div className="flex items-center gap-2 text-blue-500 text-sm font-bold group-hover:translate-x-2 transition-transform">
                  Sınava Başla <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </Link>
        </div>

        <div className="flex justify-center gap-8 pt-12 text-muted-foreground/40 text-[10px] font-bold tracking-[0.3em] uppercase">
          <span>Anti-Cheat AI</span>
          <span>Screen Lock</span>
          <span>Eye Tracking</span>
          <span>Mirror System</span>
        </div>
      </motion.div>
    </div>
  );
}
