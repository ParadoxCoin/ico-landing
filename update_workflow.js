const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\my\\Desktop\\ZexAi\\ico-landing\\public';
const files = fs.readdirSync(dir).filter(f => f.startsWith('ZEX_WHITEPAPER_') && f.endsWith('.md'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    
    // The match contains the entire block from "### 12.1" up to but not including "---"
    content = content.replace(/(### 12\.1\..*?)(?=\n---)/s, (match) => {
        // Split the match into 12.1, 12.2, 12.3 parts based on "### 12."
        const parts = match.split(/### 12\.[123]\./).filter(p => p.trim() !== '');
        
        if (parts.length === 3) {
            return `<div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
  <!-- Adım 1 -->
  <div className="bg-white/5 border border-emerald-500/20 p-6 rounded-2xl hover:bg-emerald-500/5 hover:border-emerald-500/40 transition-all flex flex-col h-full group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all" />
    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">1</span>
        ${parts[0].trim().split('\n')[0]}
    </h3>
    <div className="text-gray-400 text-sm leading-relaxed prose-sm prose-p:my-2 prose-ul:my-2">
      ${parts[0].trim().split('\n').slice(1).join('\n')}
    </div>
  </div>

  <!-- Adım 2 -->
  <div className="bg-white/5 border border-teal-500/20 p-6 rounded-2xl hover:bg-teal-500/5 hover:border-teal-500/40 transition-all flex flex-col h-full group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all" />
    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-sm">2</span>
        ${parts[1].trim().split('\n')[0]}
    </h3>
    <div className="text-gray-400 text-sm leading-relaxed prose-sm prose-p:my-2 prose-ul:my-2">
      ${parts[1].trim().split('\n').slice(1).join('\n')}
    </div>
  </div>

  <!-- Adım 3 -->
  <div className="bg-white/5 border border-cyan-500/20 p-6 rounded-2xl hover:bg-cyan-500/5 hover:border-cyan-500/40 transition-all flex flex-col h-full group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all" />
    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm">3</span>
        ${parts[2].trim().split('\n')[0]}
    </h3>
    <div className="text-gray-400 text-sm leading-relaxed prose-sm prose-p:my-2 prose-ul:my-2">
      ${parts[2].trim().split('\n').slice(1).join('\n')}
    </div>
  </div>
</div>\n`;
        }
        return match;
    });

    fs.writeFileSync(path.join(dir, file), content, 'utf-8');
    console.log('Updated ' + file);
});
