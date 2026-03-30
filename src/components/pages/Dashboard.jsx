import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TetrisLoading } from '../ui/tetris-loader';
import { ArrowLeft, Activity, Server, Shield, Terminal, Globe, Cpu, MemoryStick, Network, Wifi, Maximize2 } from 'lucide-react';

// Simulated matrix terminal logs
const useTerminalLogs = () => {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const messages = [
      "Establishing secure connection to mainframe...",
      "Bypassing firewall protocols [OK]",
      "Decrypting user payload...",
      "Initializing core system nodes...",
      "Access granted. Welcome to WebBees OS.",
      "Warning: Unauthorized ping blocked from 192.168.1.55",
      "Syncing external database clusters...",
      "Memory allocation successful: 4096MB",
      "Running diagnostic tests: 100% Pass"
    ];
    let count = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev, `[SYS_${new Date().getTime().toString().slice(-6)}] ${messages[count % messages.length]}`].slice(-12));
      count++;
    }, 800);
    return () => clearInterval(interval);
  }, []);
  return logs;
};

// Binary Rain Component
const BinaryRain = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;

        const letters = '01';
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = Array.from({length: columns}).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#00ff9f';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = letters.charAt(Math.floor(Math.random() * letters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        const interval = setInterval(draw, 50);
        return () => clearInterval(interval);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none" />;
};

// Dynamic Hardware Metrics Hook - Real Data + Simulation
const useHardwareMetrics = () => {
    const [metrics, setMetrics] = useState({ 
        cpu: 0, 
        ram: 0, 
        net: 240, 
        ip: 'DETECTING...',
        totalRam: navigator.deviceMemory || 8, // Rough RAM in GB
        cpuCores: navigator.hardwareConcurrency || 4 // Logical cores
    });
    
    useEffect(() => {
        // Fetch Real IP
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => setMetrics(prev => ({ ...prev, ip: data.ip })))
            .catch(() => setMetrics(prev => ({ ...prev, ip: '127.0.0.1' })));

        const interval = setInterval(() => {
            setMetrics(prev => ({
                ...prev,
                cpu: Math.max(2, Math.min(100, prev.cpu + (Math.random() * 20 - 10))),
                ram: Math.max(1, Math.min(prev.totalRam, prev.ram + (Math.random() * 0.5 - 0.25))),
                net: Math.max(10, Math.min(1000, prev.net + (Math.random() * 300 - 150)))
            }));
        }, 1500);
        return () => clearInterval(interval);
    }, []);
    return metrics;
};

export function Dashboard({ onBack }) {
  const [loading, setLoading] = useState(true);
  const logs = useTerminalLogs();
  const metrics = useHardwareMetrics();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <TetrisLoading size="lg" speed="fast" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-primary font-mono overflow-hidden relative">
       {/* Background Grid Pattern */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,159,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,159,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
       
       <BinaryRain />

       {/* Scanline overlay */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-50 z-50" />

       {/* Top Navigation Bar */}
       <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-primary/20 bg-black/60 backdrop-blur-md">
         <button onClick={onBack} className="flex items-center gap-2 text-primary hover:text-white transition-colors cursor-pointer z-50 relative">
            <ArrowLeft className="w-5 h-5" />
            <span className="uppercase tracking-widest text-sm font-bold">Disconnect</span>
         </button>
         <div className="flex items-center gap-4 text-xs tracking-[0.2em] uppercase">
            <button 
               onClick={() => {
                  if (!document.fullscreenElement) {
                     document.documentElement.requestFullscreen().catch(err => {
                        console.log(`Error attempting to enable full-screen mode: ${err.message}`);
                     });
                  } else {
                     document.exitFullscreen();
                  }
               }}
               className="flex items-center gap-2 px-3 py-1 border border-primary/40 bg-primary/10 rounded text-[10px] sm:text-xs hover:bg-primary/20 transition-all text-primary font-mono mr-4"
            >
               <Maximize2 className="w-3 h-3" />
               [ GO_FULLSCREEN ]
            </button>
            <span className="flex items-center gap-2"><Activity className="w-4 h-4 text-secondary animate-pulse" /> Sys_Active</span>
            <span className="flex items-center gap-2 border-l border-primary/30 pl-4"><Shield className="w-4 h-4 text-primary" /> SEC_LEVEL_9</span>
         </div>
       </header>

       <main className="relative z-10 p-6 grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-70px)]">
          
          {/* Left Column: Terminal Logs */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="md:col-span-3 h-[400px] md:h-full flex flex-col min-h-0"
          >
             <div className="border border-primary/30 bg-black/70 p-4 h-full relative flex flex-col min-h-0 overflow-hidden backdrop-blur-md rounded-lg shadow-[inset_0_0_20px_rgba(0,255,159,0.1)]">
                <div className="flex items-center gap-2 mb-4 shrink-0 border-b border-primary/30 pb-2">
                   <Terminal className="w-4 h-4" />
                   <h2 className="text-xs uppercase tracking-widest">System Protocol Logs</h2>
                </div>
                <div className="text-[10px] sm:text-xs flex-1 min-h-0 overflow-y-auto pr-2 pb-12 leading-relaxed opacity-80 space-y-2 font-mono custom-scrollbar">
                   {logs.map((log, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={log.includes("Warning") ? "text-destructive" : log.includes("Access") ? "text-secondary" : "text-primary/70"}>
                        {log}
                      </motion.div>
                   ))}
                </div>
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent pointer-events-none" />
             </div>
          </motion.div>

          {/* Middle Column: Core Analytics & Marquee */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-6 h-full flex flex-col gap-6"
          >
             {/* Taglines Marquee Box */}
             <div className="border border-secondary/30 bg-black/70 p-1 flex items-center overflow-hidden rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                 <div className="bg-secondary/20 px-4 py-2 text-secondary text-xs font-bold uppercase whitespace-nowrap z-10">Broadcast</div>
                 <div className="flex-1 overflow-hidden relative flex">
                    <div className="animate-[scroll-left_15s_linear_infinite] whitespace-nowrap text-secondary text-sm tracking-widest px-4 font-mono">
                        // WARNING: INCREASED TRAFFIC DETECTED // NEW MODULES DEPLOYED SUCCESSFULLY // CYBER_DEFENSE PROTOCOLS ACTIVE // OVERRIDE ACCEPTED
                    </div>
                 </div>
             </div>

             {/* Central Neural Visualizer - OVERDRIVE */}
             <div className="flex-1 border border-primary/30 bg-black/60 rounded-lg relative flex flex-col items-center justify-center overflow-hidden backdrop-blur-sm shadow-[inset_0_0_50px_rgba(0,255,159,0.05)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,159,0.2)_0%,transparent:70%)] pointer-events-none" />
                
                {/* 3D Neural Orbit Effect */}
                <div className="relative flex items-center justify-center w-full h-full min-h-[250px] scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100">
                   
                   {/* Orbit 1 */}
                   <div className="absolute w-[300px] h-16 border-[1px] border-primary/40 rounded-[100%] animate-[spin_10s_linear_infinite] rotate-x-45 pointer-events-none" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateY(20deg)' }}>
                      <div className="absolute top-0 left-1/2 w-4 h-4 bg-primary rounded-full blur-[2px] shadow-[0_0_15px_#00ff9f] animate-pulse" />
                   </div>

                   {/* Orbit 2 */}
                   <div className="absolute w-[300px] h-16 border-[1px] border-secondary/40 rounded-[100%] animate-[spin_15s_linear_infinite_reverse] pointer-events-none" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateY(-20deg)' }}>
                      <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-secondary rounded-full blur-[2px] shadow-[0_0_15px_#00ffff]" />
                   </div>

                   {/* Orbit 3 */}
                   <div className="absolute w-[300px] h-16 border-[1px] border-accent/40 rounded-[100%] animate-[spin_12s_linear_infinite] pointer-events-none" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(0deg) rotateY(90deg)' }}>
                      <div className="absolute top-1/2 left-0 w-2 h-2 bg-accent rounded-full blur-[1px] shadow-[0_0_10px_#a855f7]" />
                   </div>

                   {/* Core Neural Pulse */}
                   <div className="relative w-32 h-32 flex items-center justify-center">
                      <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping opacity-20" />
                      <div className="absolute inset-2 border border-secondary/30 rounded-full animate-[ping_3s_linear_infinite] opacity-10" />
                      <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,255,159,0.6)] border border-white/20">
                         <Activity className="w-10 h-10 text-black animate-pulse" />
                      </div>
                   </div>

                   {/* Digital DNA Strands */}
                   <div className="absolute w-full h-full flex items-center justify-center pointer-events-none opacity-20">
                      <div className="w-[1px] h-64 bg-gradient-to-t from-transparent via-primary to-transparent animate-pulse rotate-45" />
                      <div className="w-[1px] h-64 bg-gradient-to-t from-transparent via-secondary to-transparent animate-pulse -rotate-45" />
                   </div>
                </div>

                <div className="absolute bottom-4 left-4 text-xs opacity-70 uppercase tracking-widest font-bold flex flex-col z-10">
                    <span className="text-secondary tracking-[0.3em]">NEURAL_CORE_v2.0</span>
                    <span className="opacity-50 text-[9px] mt-1 text-primary">REAL_DATA_STREAM: CONNECTED</span>
                </div>
                <div className="absolute top-4 right-4 text-[9px] opacity-70 uppercase text-right leading-relaxed z-10 font-mono">
                    CORES: {metrics.cpuCores}<br/>
                    MEM: {metrics.totalRam}GB<br/>
                    FLUX: {Math.round(metrics.net)}MB/s
                </div>
             </div>

             {/* Bottom Hardware Gauges */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {/* CPU */}
                 <div className="border border-primary/30 bg-black/70 rounded-lg p-3 flex flex-col justify-between backdrop-blur-md">
                    <div className="flex items-center justify-between text-[10px] uppercase opacity-70 mb-2">
                       <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> CPU</span>
                       <span><span className="text-white font-bold">{metrics.cpu.toFixed(1)}%</span> / 100%</span>
                    </div>
                    <div className="h-1.5 bg-black rounded-full overflow-hidden border border-white/5">
                        <motion.div animate={{ width: `${metrics.cpu}%` }} transition={{ type: 'spring' }} className="h-full bg-gradient-to-r from-primary to-destructive" />
                    </div>
                 </div>
                 {/* RAM */}
                 <div className="border border-secondary/30 bg-black/70 rounded-lg p-3 flex flex-col justify-between backdrop-blur-md">
                    <div className="flex items-center justify-between text-[10px] uppercase opacity-70 text-secondary mb-2">
                       <span className="flex items-center gap-1"><Server className="w-3 h-3" /> RAM</span>
                       <span><span className="text-white font-bold">{metrics.ram.toFixed(1)}GB</span> / {metrics.totalRam}GB</span>
                    </div>
                    <div className="h-1.5 bg-black rounded-full overflow-hidden border border-white/5">
                        <motion.div animate={{ width: `${(metrics.ram / metrics.totalRam) * 100}%` }} transition={{ type: 'spring' }} className="h-full bg-secondary" />
                    </div>
                 </div>
                 {/* NET */}
                 <div className="border border-accent/30 bg-black/70 rounded-lg p-3 flex flex-col justify-between backdrop-blur-md">
                    <div className="flex items-center justify-between text-[10px] uppercase opacity-70 text-accent mb-2">
                       <span className="flex items-center gap-1"><Network className="w-3 h-3" /> NET</span>
                       <span><span className="text-white font-bold">{Math.round(metrics.net)}Mb/s</span> / 1Gb/s</span>
                    </div>
                    <div className="h-1.5 bg-black rounded-full overflow-hidden border border-white/5">
                        <motion.div animate={{ width: `${(metrics.net / 1000) * 100}%` }} transition={{ type: 'spring' }} className="h-full bg-accent" />
                    </div>
                 </div>
                 {/* IP */}
                 <div className="border border-white/30 bg-black/70 rounded-lg p-3 flex flex-col justify-center items-center backdrop-blur-md">
                    <div className="flex items-center gap-2 text-[10px] uppercase opacity-70 mb-1">
                       <Wifi className="w-3 h-3 text-white" /> External IP
                    </div>
                    <div className="text-xs font-bold text-white tracking-widest">{metrics.ip}</div>
                 </div>
             </div>
          </motion.div>

          {/* Right Column: Server Nodes & Radar */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-3 h-full flex flex-col gap-6"
          >
             {/* Server Nodes List */}
             <div className="flex-1 border border-primary/30 bg-black/70 p-4 rounded-lg flex flex-col gap-3 backdrop-blur-md">
                 <h2 className="text-xs uppercase tracking-widest border-b border-primary/30 pb-2 mb-2">Active Nodes</h2>
                 {[1,2,3,4,5,6].map((node) => (
                    <div key={node} className="flex items-center justify-between text-xs">
                       <span className="opacity-70">Node_0{node}</span>
                       <span className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${node === 3 ? 'bg-destructive animate-pulse shadow-[0_0_8px_red]' : 'bg-primary shadow-[0_0_8px_#00ff9f]'}`} /> {node === 3 ? 'SYNC_ERR' : 'ONLINE'}</span>
                    </div>
                 ))}
             </div>

             {/* Radar Visual */}
             <div className="h-64 border border-primary/30 bg-black/70 rounded-lg flex items-center justify-center relative overflow-hidden backdrop-blur-md">
                <div className="w-48 h-48 border border-primary/30 rounded-full relative shadow-[0_0_30px_rgba(0,255,159,0.1)]">
                   <div className="absolute inset-0 border border-primary/20 rounded-full scale-50" />
                   <div className="absolute inset-0 border border-primary/10 rounded-full scale-25" />
                   {/* Radar Sweep */}
                   <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-[conic-gradient(from_0deg,rgba(0,255,159,0.4),transparent_60deg)] origin-top-left animate-[spin_4s_linear_infinite] -z-0" />
                   {/* Targets */}
                   <div className="absolute top-[30%] left-[60%] w-2 h-2 bg-destructive rounded-full shadow-[0_0_10px_red] animate-pulse" />
                   <div className="absolute top-[70%] left-[40%] w-2 h-2 bg-secondary rounded-full shadow-[0_0_10px_cyan]" />
                   <div className="absolute top-[40%] left-[20%] w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_#00ff9f]" />
                </div>
                <div className="absolute bottom-2 right-2 text-[10px] opacity-40 uppercase">Vector Scan</div>
             </div>
          </motion.div>

       </main>
    </div>
  );
}
