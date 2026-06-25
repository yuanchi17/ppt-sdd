import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import spectraUiImg from './assets/spectra介面.png';
import workflowImg from './assets/工作流程.png';
import cRHNO9g3 from './assets/工具介面-CRHNO9g3拷貝.png';


// ─── Design Tokens (Panel-tweakable) ──────────────────────────────────────────
export const design: DesignSystem = {
  palette: {
    bg: '#080d1a',     // Deep dark navy
    text: '#ecf3fa',   // Bright cool white
    accent: '#10b981', // Neon teal/emerald
  },
  fonts: {
    display: '"JetBrains Mono", "SF Mono", ui-monospace, monospace',
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  typeScale: {
    hero: 130,
    body: 32,
  },
  radius: 12,
};

// ─── Local (non-tweakable) Constants ──────────────────────────────────────────
const palette = {
  bg: design.palette.bg,
  text: design.palette.text,
  accent: design.palette.accent,
  purple: '#8b5cf6',       // Secondary Accent: Neon purple
  muted: '#526685',        // Slate muted text
  border: '#1e293b',       // Dark slate border
  surface: '#0f182c',      // Dark slate card surface
  surfaceHi: '#16233d',    // Darker slate header
  red: '#ef4444',          // Alert / warning
  glowTeal: 'rgba(16, 185, 129, 0.15)',
  glowPurple: 'rgba(139, 92, 246, 0.15)',
  glowRed: 'rgba(239, 68, 68, 0.15)',
};

const font = {
  mono: design.fonts.display,
  sans: design.fonts.body,
};

const fill = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  letterSpacing: '-0.015em',
  overflow: 'hidden',
  position: 'relative' as const,
};

// ─── Shared Keyframes & Animations ────────────────────────────────────────────
const styles = `
  @keyframes sdd-fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes sdd-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes sdd-blink {
    0%, 49%   { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
  @keyframes sdd-pulse-teal {
    0%, 100% { box-shadow: 0 0 20px 0px rgba(16, 185, 129, 0.15); border-color: #10b981; }
    50%      { box-shadow: 0 0 30px 4px rgba(16, 185, 129, 0.25); border-color: #34d399; }
  }
  @keyframes sdd-glow-card {
    0%, 100% { box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02); }
    50%      { box-shadow: 0 10px 40px -5px rgba(139, 92, 246, 0.15), 0 0 0 1px rgba(255,255,255,0.05); }
  }
  .sdd-fadeUp { opacity: 0; animation: sdd-fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .sdd-fadeIn { opacity: 0; animation: sdd-fadeIn 1s ease forwards; }
  .sdd-caret::after {
    content: '';
    display: inline-block;
    width: 12px;
    height: 24px;
    background: currentColor;
    margin-left: 8px;
    vertical-align: middle;
    animation: sdd-blink 1.05s steps(1) infinite;
  }
  .sdd-pulse-teal { animation: sdd-pulse-teal 3s ease-in-out infinite; }
  .sdd-glow-card { animation: sdd-glow-card 4s ease-in-out infinite; }
`;

const Styles = () => <style>{styles}</style>;

// ─── Shared UI Components ─────────────────────────────────────────────────────
const GridBg = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage:
        'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
      backgroundSize: '80px 80px',
      maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 80%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 80%)',
      pointerEvents: 'none',
      zIndex: 0,
    }}
  />
);

const DecorativeGlows = () => (
  <>
    <div
      style={{
        position: 'absolute',
        width: 600,
        height: 600,
        background: `radial-gradient(circle, ${palette.glowTeal} 0%, rgba(0,0,0,0) 70%)`,
        top: '-10%',
        left: '-10%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
    <div
      style={{
        position: 'absolute',
        width: 600,
        height: 600,
        background: `radial-gradient(circle, ${palette.glowPurple} 0%, rgba(0,0,0,0) 70%)`,
        bottom: '-10%',
        right: '-10%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  </>
);

const TrafficLights = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    {['#ff5f56', '#ffbd2e', '#27c93f'].map((c) => (
      <span
        key={c}
        style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: c,
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)',
        }}
      />
    ))}
  </div>
);

const WindowShell = ({
  title,
  children,
  style,
  glowColor = palette.glowTeal,
}: {
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: string;
}) => (
  <div
    style={{
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      borderRadius: 'var(--osd-radius)',
      boxShadow: `0 30px 60px -15px rgba(0,0,0,0.6), 0 0 30px 0px ${glowColor}`,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      ...style,
    }}
  >
    <div
      style={{
        height: 48,
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        background: palette.surfaceHi,
        borderBottom: `1px solid ${palette.border}`,
        flexShrink: 0,
      }}
    >
      <TrafficLights />
      <div
        style={{
          flex: 1,
          textAlign: 'center',
          fontFamily: font.mono,
          fontSize: 16,
          color: palette.muted,
          letterSpacing: '0.05em',
        }}
      >
        {title}
      </div>
      <div style={{ width: 48 }} />
    </div>
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      {children}
    </div>
  </div>
);

const Eyebrow = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div
    style={{
      fontFamily: font.mono,
      fontSize: 20,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: palette.purple,
      marginBottom: 24,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      ...style,
    }}
  >
    <span style={{ color: palette.accent }}>▶</span> {children}
  </div>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 50,
        left: 120,
        right: 120,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: `1px solid ${palette.border}`,
        paddingTop: 20,
        fontFamily: font.mono,
        fontSize: 18,
        color: palette.muted,
        zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ color: palette.muted }}>Spec-Driven Development</span>
        <span>{''}</span>
      </div>
      <div>
        <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

const BulletItem = ({
  title,
  desc,
  icon = '⚠',
  iconColor = palette.red,
  delay = 0,
}: {
  title: string;
  desc: string;
  icon?: string;
  iconColor?: string;
  delay?: number;
}) => (
  <div
    className="sdd-fadeUp"
    style={{
      animationDelay: `${delay}s`,
      display: 'flex',
      gap: 20,
      alignItems: 'flex-start',
      marginBottom: 36,
    }}
  >
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 8,
        border: `1px solid ${iconColor}40`,
        background: `${iconColor}10`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: font.mono,
        fontSize: 24,
        color: iconColor,
        flexShrink: 0,
        boxShadow: `0 0 10px ${iconColor}15`,
      }}
    >
      {icon}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <h4 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: 'var(--osd-text)' }}>
        {title}
      </h4>
      <p style={{ fontSize: 22, color: palette.muted, margin: 0, lineHeight: 1.45 }}>
        {desc}
      </p>
    </div>
  </div>
);

const CardItem = ({
  num,
  title,
  desc,
  delay = 0,
  accentColor = palette.accent,
}: {
  num: string;
  title: string;
  desc: string;
  delay?: number;
  accentColor?: string;
}) => (
  <div
    className="sdd-fadeUp sdd-glow-card"
    style={{
      animationDelay: `${delay}s`,
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      borderRadius: 'var(--osd-radius)',
      padding: '40px 36px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: 4,
        width: '100%',
        background: `linear-gradient(90deg, ${accentColor}, transparent)`,
      }}
    />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: font.mono, fontSize: 18, color: accentColor }}>
        [{num}]
      </span>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
    </div>
    <h3 style={{ fontSize: 30, fontWeight: 800, margin: 0, color: 'var(--osd-text)', fontFamily: font.sans }}>
      {title}
    </h3>
    <p style={{ fontSize: 22, color: palette.muted, margin: 0, lineHeight: 1.6 }}>
      {desc}
    </p>
  </div>
);

const WorkflowStep = ({
  num,
  title,
  desc,
  isActive = false,
  delay = 0,
}: {
  num: string;
  title: string;
  desc: string;
  isActive?: boolean;
  delay?: number;
}) => {
  const borderCol = isActive ? palette.accent : palette.border;
  const numBg = isActive ? palette.accent : palette.surfaceHi;
  const numCol = isActive ? '#080d1a' : palette.muted;
  const glow = isActive ? `0 0 25px ${palette.glowTeal}` : 'none';

  return (
    <div
      className="sdd-fadeUp"
      style={{
        animationDelay: `${delay}s`,
        background: palette.surface,
        border: `1px solid ${borderCol}`,
        borderRadius: 'var(--osd-radius)',
        padding: '36px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        position: 'relative',
        boxShadow: glow,
        transition: 'all 0.5s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 8,
            background: numBg,
            color: numCol,
            fontFamily: font.mono,
            fontSize: 22,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.5s ease',
            flexShrink: 0,
          }}
        >
          {num}
        </div>
        <h3
          style={{
            fontFamily: font.mono,
            fontSize: 26,
            fontWeight: 700,
            margin: 0,
            color: isActive ? palette.accent : 'var(--osd-text)',
            transition: 'color 0.5s ease',
          }}
        >
          {title}
        </h3>
      </div>
      <p style={{ fontSize: 20, color: palette.muted, margin: 0, lineHeight: 1.5 }}>
        {desc}
      </p>
    </div>
  );
};


// ─── Slide 1: Cover ──────────────────────────────────────────────────────────
const Cover: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <DecorativeGlows />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '120px 120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      }}
    >
      <div
        className="sdd-fadeUp"
        style={{
          fontFamily: font.mono,
          fontSize: 24,
          color: palette.accent,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: 32,
        }}
      >
        Spec-Driven Development
      </div>

      <h1
        className="sdd-fadeUp"
        style={{
          fontFamily: font.mono,
          fontSize: 'var(--osd-size-hero)',
          fontWeight: 900,
          margin: '0 0 48px 0',
          lineHeight: 1.15,
          textAlign: 'center',
          letterSpacing: '-0.02em',
          animationDelay: '0.15s',
          background: `linear-gradient(135deg, ${palette.text} 30%, ${palette.purple} 100%)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        規格驅動開發流程
      </h1>

      <p
        className="sdd-fadeUp"
        style={{
          fontFamily: font.sans,
          fontSize: 32,
          color: palette.muted,
          maxWidth: 960,
          textAlign: 'center',
          lineHeight: 1.6,
          margin: '0 0 80px 0',
          animationDelay: '0.3s',
        }}
      >透過定義規格、規劃任務與執行，確保 AI 輔助開發的穩定與品質</p>

      <div
        className="sdd-fadeUp"
        style={{
          animationDelay: '0.45s',
          fontFamily: font.mono,
          fontSize: 20,
          color: palette.purple,
          letterSpacing: '0.15em',
        }}
      >{''}</div>
    </div>
  </div>
);

// ─── Slide 2: Pain Point: Vibe Coding ─────────────────────────────────────────
const PainPoint: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <DecorativeGlows />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '100px 120px 120px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
      }}
    >
      <h2
        style={{
          fontFamily: font.sans,
          fontSize: 68,
          fontWeight: 800,
          margin: '0 0 64px 0',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        Vibe Coding 的隱憂與維護困境
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 64,
          flex: 1,
          minHeight: 0,
        }}
      >
        <WindowShell title="vibe-coding-session.ts" glowColor={palette.glowRed} style={{ height: 480 }}>
          <div
            style={{
              padding: '28px 36px',
              fontFamily: font.mono,
              fontSize: 20,
              lineHeight: 1.5,
              color: '#94a3b8',
            }}
          >
            <div style={{ color: palette.red }}>// FIXME: AI generated helper - do not touch!</div>
            <div style={{ color: palette.red }}>// It somehow works for now, but broke user checkout logic.</div>
            <div style={{ color: '#60a5fa' }}>function <span style={{ color: '#facc15' }}>processCheckout</span>(cart: any) &#123;</div>
            <div style={{ paddingLeft: 24 }}>
              <div>const total = cart.items.reduce((a: any, b: any) =&gt; a + b.price, 0);</div>
              <div style={{ color: palette.red }}>// Added by AI agent on 3rd prompt revision</div>
              <div>if (cart.isPromoCodeApplied) &#123;</div>
              <div style={{ paddingLeft: 24, color: '#f43f5e' }}>return total * 0.85; // Hardcoded discount?</div>
              <div>&#125;</div>
              <div style={{ color: palette.muted }}>// TODO: database sync failed here occasionally</div>
              <div style={{ color: '#34d399' }}>return db.updateUserBalance(cart.userId, -total);</div>
            </div>
            <div>&#125;</div>
            
            <div style={{ marginTop: 32, borderTop: `1px solid ${palette.border}`, paddingTop: 20, color: palette.red }}>
              &gt; Error: Uncaught regression in production checkout flow.
            </div>
          </div>
        </WindowShell>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <BulletItem
            title="自然語言的模糊性"
            desc="直接與 AI 對話（Vibe Coding）常因語意模糊導致 AI 產生幻覺，難以長久維持精準的商務邏輯。"
            delay={0.15}
          />
          <BulletItem
            title="缺乏單一事實來源 (No SSOT)"
            desc="代碼庫與規格書嚴重脫節。AI 每次修改只專注局部 Prompt，很容易引入預料之外的 Regression。"
            delay={0.3}
          />
          <BulletItem
            title="規模化時的代碼腐爛 (Code Rot)"
            desc="在複雜系統中盲目追加 Prompt，會導致專案架構混亂、代碼結構臃腫，技術債迅速堆積。"
            delay={0.45}
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── Slide 3: What is SDD ────────────────────────────────────────────────────
const Concept: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <DecorativeGlows />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '100px 120px 120px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
      }}
    >
      <h2
        style={{
          fontFamily: font.sans,
          fontSize: 68,
          fontWeight: 800,
          margin: '0 0 24px 0',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        什麼是 Spec-Driven Development？
      </h2>
      
      <p style={{ fontSize: 26, color: palette.muted, maxWidth: 1200, margin: '0 0 64px 0', lineHeight: 1.6 }}>
        SDD (規格驅動開發) 是一種以<strong style={{ color: palette.accent }}>「規格 (Specification)」</strong>為核心的軟體工程實踐，將規格書轉為軟體架構的「唯一真理源」，約束並引導 AI 進行開發。
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 32,
          flex: 1,
        }}
      >
        <CardItem
          num="01"
          title="規格即代碼 (Spec as SSOT)"
          desc="規格書不只是參考文件，而是做為 AI Agent 的核心輸入。AI 必須嚴格遵照規格書進行代碼生成與測試。"
          delay={0.1}
        />
        <CardItem
          num="02"
          title="結構化收斂 (Structured)"
          desc="從 Constitution（規範）到 Task（待辦），將龐大需求拆解成 AI 可消化的上下文，防堵 Agent 任意脫軌。"
          delay={0.25}
          accentColor={palette.purple}
        />
        <CardItem
          num="03"
          title="可追溯變更 (Traceability)"
          desc="每一次功能異動皆有對應的規格修改提案 (Proposal)。規格與代碼雙向綁定，確保專案始終維持高透明度。"
          delay={0.4}
        />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── Slide 4: SDD Workflow ───────────────────────────────────────────────────
const Workflow: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <DecorativeGlows />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '100px 120px 120px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
      }}
    >
      <h2
        style={{
          fontFamily: font.sans,
          fontSize: 68,
          fontWeight: 800,
          margin: '0 0 32px 0',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >SDD 工作流程</h2>

      <p style={{ fontSize: 24, color: palette.muted, margin: '0 0 64px 0' }}>
        透過「定義、撰寫、規劃、實現」四個清晰收斂步驟，讓開發者從 Code Worker 轉身為 Spec Writer。
      </p>

      {/* Grid container. Displays directly on page enter with staggered fadeUp animation. */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, alignItems: 'start' }}>
        <WorkflowStep
          num="01"
          title="憲法制定"
          desc="制定專案憲法：鎖定技術選型、專案架構規範、禁止事項及編碼標準，劃定 AI 開發的安全紅線。"
          isActive
          delay={0.1}
        />
        <WorkflowStep
          num="02"
          title="規格撰寫"
          desc="撰寫 Markdown 規格書或 OpenSpec 檔案，用清晰無歧義的語言描述系統邏輯、API 介面與功能細節。"
          isActive
          delay={0.2}
        />
        <WorkflowStep
          num="03"
          title="任務規劃"
          desc="規劃變更提案：將規格書的異動轉化為具體的實作計畫與 Tasks，明確列上檔案異動路徑與開發步驟。"
          isActive
          delay={0.3}
        />
        <WorkflowStep
          num="04"
          title="程式碼實現"
          desc="程式碼實現：AI Agent 讀取 Task 列表，嚴格照表操課完成代碼編寫，並執行自動化測試進行驗證。"
          isActive
          delay={0.4}
        />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── Slide 4b: Spectra Workflow Comparison ──────────────────────────────────
const SpectraWorkflow: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <DecorativeGlows />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '100px 120px 120px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
      }}
    >
      <h2
        style={{
          fontFamily: font.sans,
          fontSize: 68,
          fontWeight: 800,
          margin: '0 0 32px 0',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        Spectra 與一般開發流程對比
      </h2>

      <div
        style={{
          display: 'flex',
          gap: 64,
          alignItems: 'center',
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Left Column: Explanations */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <BulletItem
            title="新增討論與提案機制"
            desc="引進 /spectra-discuss (討論) 與 /spectra-propose (提案)，在實作前對齊規格，防範 AI 脫軌。"
            icon="💬"
            iconColor={palette.accent}
            delay={0.1}
          />
          <BulletItem
            title="審閱後執行"
            desc="提案經審閱後，由 Agent 依照 /spectra-apply 精準執行 task 列表。"
            icon="🔒"
            iconColor={palette.purple}
            delay={0.25}
          />
          <BulletItem
            title="變更回滾與同步機制"
            desc="若實作中規格有變更，可用 /spectra-ingest 同步規格，最終透過 /spectra-archive 歸檔結案。"
            icon="🔄"
            iconColor={palette.accent}
            delay={0.4}
          />
        </div>

        {/* Right Column: Image with glow */}
        <div
          style={{
            flex: '0 0 1000px',
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: 'var(--osd-radius)',
            padding: 16,
            boxShadow: `0 30px 60px -15px rgba(0,0,0,0.6), 0 0 30px 0px ${palette.glowTeal}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            src={workflowImg}
            alt="Spectra 工作流程"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 8,
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── Slide 5: Spectra Tooling ────────────────────────────────────────────────
const Tooling: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <DecorativeGlows />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '100px 120px 120px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
      }}
    >
      <h2
        style={{
          fontFamily: font.sans,
          fontSize: 68,
          fontWeight: 800,
          margin: '0 0 64px 0',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >Spectra：專為 SDD 打造的輔助軟體</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: 64,
          flex: 1,
          minHeight: 0,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <BulletItem
            title="AI 時代的開發合夥人"
            desc="高見龍開發的 SDD 輔助工具，提供 GUI 與 CLI 整合，管理憲法、規格、提案與任務。"
            icon="🛠"
            iconColor={palette.accent}
            delay={0.1}
          />
          <BulletItem
            title="原生相容 OpenSpec 標準"
            desc="將文字型態的規格書轉換為結構化的 Schema 狀態，讓 AI Agent 能以一致的格式進行解析與雙向鏈結。"
            icon="⚛"
            iconColor={palette.purple}
            delay={0.25}
          />
          <BulletItem
            title="指令導引完整的 SDD 生命週期"
            desc="提供 /spectra-propose (提案)、/spectra-apply (應用)、/spectra-debug 等指令，以自然語言快速查找規格。"
            icon="⌨"
            iconColor={palette.accent}
            delay={0.4}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div
            style={{
              background: palette.surface,
              border: `1px solid ${palette.border}`,
              borderRadius: 'var(--osd-radius)',
              padding: 16,
              boxShadow: `0 30px 60px -15px rgba(0,0,0,0.6), 0 0 30px 0px ${palette.glowTeal}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              src={spectraUiImg}
              alt="Spectra 專案設定介面"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 8,
                display: 'block',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── Slide 5b: Spectra Tooling Application ───────────────────────────────────
const ToolingApp: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <DecorativeGlows />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '100px 120px 120px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
      }}
    >
      <h2
        style={{
          fontFamily: font.sans,
          fontSize: 68,
          fontWeight: 800,
          margin: '0 0 32px 0',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        Spectra 實際應用：變更管理介面
      </h2>

      <div
        style={{
          display: 'flex',
          gap: 64,
          alignItems: 'center',
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Left Column: Explanations */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <BulletItem
            title="結構化管理進行中變更"
            desc="以單一變更為單位管理。清晰展示任務進度、對應規格。"
            icon="📂"
            iconColor={palette.purple}
            delay={0.1}
          />
          <BulletItem
            title="明確 Why 與 What Changes"
            desc="直觀顯示 md 檔的內容。"
            icon="❓"
            iconColor={palette.accent}
            delay={0.25}
          />
          <BulletItem
            title="全方位的標籤與控制"
            desc="整合提案、設計、任務、規格多個維度。提供編輯、分析、封存、刪除等功能，掌握變更生命週期。"
            icon="🎛"
            iconColor={palette.purple}
            delay={0.4}
          />
        </div>

        {/* Right Column: Image with glow */}
        <div
          style={{
            flex: '0 0 1000px',
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: 'var(--osd-radius)',
            padding: 16,
            boxShadow: `0 30px 60px -15px rgba(0,0,0,0.6), 0 0 30px 0px ${palette.glowPurple}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            src={cRHNO9g3}
            alt="Spectra 實際應用介面"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 8,
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── Slide 6: Pros & Cons ────────────────────────────────────────────────────
const ProsCons: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <DecorativeGlows />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '100px 120px 120px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
      }}
    >
      <h2
        style={{
          fontFamily: font.sans,
          fontSize: 68,
          fontWeight: 800,
          margin: '0 0 64px 0',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >SDD 流程優缺點</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          flex: 1,
        }}
      >
        {/* PROS COLUMN */}
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.02)',
            border: '1px solid rgba(16, 185, 129, 0.15)',
            borderRadius: 'var(--osd-radius)',
            padding: '44px 40px',
            boxShadow: `0 20px 40px -10px rgba(0,0,0,0.4), inset 0 0 20px rgba(16, 185, 129, 0.05)`,
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 36, color: palette.accent }}>✓</span>
            <h3 style={{ fontSize: 32, fontWeight: 800, margin: 0, color: palette.accent, fontFamily: font.mono }}>優點</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ color: palette.accent, fontSize: 24, fontFamily: font.mono }}>[+]</span>
              <p style={{ fontSize: 22, margin: 0, color: 'var(--osd-text)', lineHeight: 1.5 }}>
                <strong>極高可控性</strong>：AI Agent 嚴格照表操課，幾乎杜絕 AI 自作聰明亂改程式碼的行為。
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ color: palette.accent, fontSize: 24, fontFamily: font.mono }}>[+]</span>
              <p style={{ fontSize: 22, margin: 0, color: 'var(--osd-text)', lineHeight: 1.5 }}>
                <strong>代碼即文件</strong>：規格文件隨著專案同步更新，解決長期維護後文件失效、人員交接痛點。
              </p>
            </div>

            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ color: palette.accent, fontSize: 24, fontFamily: font.mono }}>[+]</span>
              <p style={{ fontSize: 22, margin: 0, color: 'var(--osd-text)', lineHeight: 1.5 }}>
                <strong>降低風險</strong>：變更計畫透明可追溯，確保大型專案改動時，不會牽一髮動全身。
              </p>
            </div>
          </div>
        </div>

        {/* CONS COLUMN */}
        <div
          style={{
            background: 'rgba(139, 92, 246, 0.02)',
            border: '1px solid rgba(139, 92, 246, 0.15)',
            borderRadius: 'var(--osd-radius)',
            padding: '44px 40px',
            boxShadow: `0 20px 40px -10px rgba(0,0,0,0.4), inset 0 0 20px rgba(139, 92, 246, 0.05)`,
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 36, color: palette.purple }}>⚠</span>
            <h3 style={{ fontSize: 32, fontWeight: 800, margin: 0, color: palette.purple, fontFamily: font.mono }}>缺點</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ color: palette.purple, fontSize: 24, fontFamily: font.mono }}>[-]</span>
              <p style={{ fontSize: 22, margin: 0, color: 'var(--osd-text)', lineHeight: 1.5 }}>
                <strong>前期開發開銷大</strong>：需要工程師／PM 花費時間和精力撰寫 Markdown / OpenSpec 規格檔案。
              </p>
            </div>

            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ color: palette.purple, fontSize: 24, fontFamily: font.mono }}>[-]</span>
              <p style={{ fontSize: 22, margin: 0, color: 'var(--osd-text)', lineHeight: 1.5 }}>
                <strong>不適合拋棄式極簡專案</strong>：若專案規模非常小或生命週期短，引進 SDD 與 Spectra 會顯得過度設計。
              </p>
            </div>

            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ color: palette.purple, fontSize: 24, fontFamily: font.mono }}>[-]</span>
              <p style={{ fontSize: 22, margin: 0, color: 'var(--osd-text)', lineHeight: 1.5 }}>
                <strong>工具鏈與生態尚處早期</strong>：相較於成熟框架，Spectra 等 SDD 工具在開發者社群與整合度上仍有成長空間。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── Slide 7: Summary & Closing ──────────────────────────────────────────────
const Conclusion: Page = () => (
  <div style={fill}>
    <Styles />
    <GridBg />
    <DecorativeGlows />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '120px 120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      }}
    >
      <h2
        className="sdd-fadeUp"
        style={{
          fontFamily: font.sans,
          fontSize: 72,
          fontWeight: 900,
          margin: '0 0 32px 0',
          lineHeight: 1.2,
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}
      >
        告別盲目對話，擁抱規格驅動開發
      </h2>

      <p
        className="sdd-fadeUp"
        style={{
          animationDelay: '0.1s',
          fontSize: 30,
          color: palette.muted,
          maxWidth: 1100,
          textAlign: 'center',
          lineHeight: 1.6,
          marginBottom: 64,
        }}
      >
        當 AI 代碼生成的成本幾近於零，工程師的價值便不再是「寫出」程式碼，<br />
        而是能夠<strong>「精準定義系統邊界與邏輯」</strong>{''}
      </p>

      <div
        className="sdd-fadeUp"
        style={{
          animationDelay: '0.2s',
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 999,
          padding: '20px 48px',
          fontFamily: font.mono,
          fontSize: 26,
          color: palette.accent,
          boxShadow: `0 10px 30px -10px rgba(0,0,0,0.5), 0 0 15px ${palette.glowTeal}`,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span>$</span>
        <span style={{ color: 'var(--osd-text)' }}>let&apos;s spec first.</span>
        <span className="sdd-caret" style={{ color: palette.accent }} />
      </div>
    </div>
    <Footer />
  </div>
);

export const meta: SlideMeta = {
  title: 'Spec-Driven Development & Spectra',
  createdAt: '2026-06-08T02:02:17.536Z',
};

export default [
  Cover,
  Concept,
  Workflow,
  ProsCons,
  Tooling,
  SpectraWorkflow,
  ToolingApp,
  Conclusion,
] satisfies Page[];
