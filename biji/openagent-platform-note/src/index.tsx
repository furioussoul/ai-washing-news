import { registerRoot, Composition, AbsoluteFill, staticFile, Img, delayRender, continueRender } from 'remotion';
import React, { useState } from 'react';

// ============================================
// Styles & Shared Components
// ============================================
const gridPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23F0EAE2' stroke-width='1'/%3E%3C/svg%3E")`;

const PageLayout: React.FC<{ children: React.ReactNode; avatar?: string; username?: string }> = ({ 
  children, 
  avatar = "jojo.jpg", 
  username = "@杰哥_ai_team" 
}) => {
  const [handle] = useState(() => delayRender('Loading avatar'));
  return (
    <AbsoluteFill style={{
      backgroundColor: '#FEF9F2',
      backgroundImage: gridPattern,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", -apple-system, sans-serif',
      padding: '80px 60px',
    }}>
      {/* Top Profile */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', marginRight: 20, border: '2px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <Img src={staticFile(avatar)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onLoad={() => continueRender(handle)} onError={() => continueRender(handle)} />
        </div>
        <span style={{ fontSize: 36, fontWeight: 900, color: '#333' }}>{username}</span>
      </div>
      
      {children}
      
      {/* Bottom Footer */}
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.4, fontSize: 24, fontWeight: 700 }}>
        <div>#AI_Agent #架构设计 #OpenAgent #工程化</div>
        <div>💬 1.2k ⭐️ 3.5k</div>
      </div>
    </AbsoluteFill>
  );
};

const Highlighter: React.FC<{ children: React.ReactNode; color?: string; rotation?: number }> = ({ 
  children, 
  color = '#4ADE80', 
  rotation = -1 
}) => (
  <div style={{ position: 'relative', zIndex: 1, display: 'inline-block', transform: `rotate(${rotation}deg)` }}>
    <div style={{ 
      position: 'absolute', 
      top: '15%', 
      left: '-5%', 
      right: '-5%', 
      bottom: '10%', 
      backgroundColor: color, 
      zIndex: -1, 
      borderRadius: '60% 40% 50% 45% / 10% 15% 12% 10%',
      opacity: 0.8
    }}></div>
    <span style={{ color: '#000', padding: '0 10px' }}>{children}</span>
  </div>
);

const Sticker: React.FC<{ children: React.ReactNode; rotation?: number }> = ({ children, rotation = 1 }) => (
  <div style={{
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '20px',
    border: '10px solid #fff',
    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
    transform: `rotate(${rotation}deg)`,
    marginBottom: '30px'
  }}>
    {children}
  </div>
);

// ============================================
// Pages P1 - P11
// ============================================

// P1: Cover
const P1_Cover: React.FC = () => (
  <PageLayout>
    <div style={{ marginTop: 40 }}>
      <div style={{ fontWeight: 900, lineHeight: 1.1, color: '#000' }}>
        <div style={{ fontSize: 60, color: '#666', marginBottom: 20 }}>实战干货：从一张工单到</div>
        <div style={{ fontSize: 130, letterSpacing: -5 }}>
          <Highlighter color="#4ADE80" rotation={-2}>一套架构</Highlighter>
        </div>
        <div style={{ fontSize: 90, marginTop: 20, color: '#333' }}>OpenAgent 平台实践</div>
      </div>
      
      <div style={{ marginTop: 100, fontSize: 50, fontWeight: 800, color: '#444', lineHeight: 1.6 }}>
        不再死磕 <span style={{ textDecoration: 'line-through', opacity: 0.5 }}>if-else 脚本</span> ❌<br/>
        让 AI 像 <b style={{ fontWeight: 900, color: '#FF4D4D' }}>熟练员工</b> 思考 ✅
      </div>

      <div style={{ marginTop: 120, display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ backgroundColor: '#000', color: '#fff', fontSize: 48, fontWeight: 900, padding: '25px 60px', borderRadius: '60px 10px 50px 15px', transform: 'rotate(-2deg)', boxShadow: '15px 15px 0 rgba(74, 222, 128, 0.3)' }}>
          真相是。。。👇
        </div>
      </div>
    </div>
  </PageLayout>
);

// P2: Pain Points
const P2_Pain: React.FC = () => (
  <PageLayout>
    <div style={{ fontSize: 72, fontWeight: 900, marginBottom: 50 }}>
      为什么不是 <Highlighter color="#FFD700">写脚本</Highlighter>？
    </div>
    <div style={{ fontSize: 38, lineHeight: 1.8 }}>
      <Sticker rotation={1}>
        <div style={{ marginBottom: 25 }}>🧨 <b style={{ fontWeight: 900 }}>脚本的宿命</b>：第一周跑得好，第二周加条件，第三周变屎山。</div>
        <div style={{ marginBottom: 25 }}>🧠 <b style={{ fontWeight: 900 }}>痛点</b>：业务规则天天变，每次都要改代码、发版、测试，成本极高。</div>
        <div>⚡️ <b style={{ fontWeight: 900 }}>需求</b>：我们需要的是“改规则不改代码，加场景不加部署”。</div>
      </Sticker>
      <div style={{ marginTop: 40, textAlign: 'center', fontWeight: 900, fontSize: 54, color: '#FF4D4D' }}>
        “脚本解决一个问题，平台解决一类问题”
      </div>
    </div>
  </PageLayout>
);

// P3: Process
const P3_Process: React.FC = () => (
  <PageLayout>
    <div style={{ fontSize: 64, fontWeight: 900, marginBottom: 40 }}>
      60秒，一张工单跑完 <Highlighter>全流程</Highlighter>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {[
        "1. 查工单详情 (接口调用)",
        "2. 查返现信息 (业务系统)",
        "3. 逐个乘客审核 (AI 逻辑判断)",
        "4. 执行审批/驳回 (原子操作)",
        "5. 回写工单日志 (链路留痕)",
        "6. 完结工单 (闭环)"
      ].map((text, i) => (
        <div key={i} style={{ 
          fontSize: 36, 
          fontWeight: 800, 
          padding: '20px 30px', 
          backgroundColor: '#fff', 
          borderRadius: 15,
          borderLeft: '10px solid #4ADE80',
          transform: `rotate(${i % 2 ? 0.5 : -0.5}deg)`
        }}>
          {text}
        </div>
      ))}
    </div>
    <div style={{ marginTop: 40, fontSize: 32, color: '#666', textAlign: 'right' }}>
      ✨ 全程无人干预，Agent 自主决策
    </div>
  </PageLayout>
);

// P4: Architecture
const P4_Arch: React.FC = () => (
  <PageLayout>
    <div style={{ fontSize: 72, fontWeight: 900, marginBottom: 50 }}>
      四大角色，<Highlighter color="#4ADE80">各司其职</Highlighter>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
      {[
        { title: "大脑 (Service)", desc: "会话、推理、驱动循环", icon: "🧠" },
        { title: "双手 (Sandbox)", desc: "Docker 隔离，执行代码", icon: "🧤" },
        { title: "感官 (MCP)", desc: "标准协议，连接业务", icon: "👁️" },
        { title: "控制 (Admin)", desc: "可视化管理，实时生效", icon: "🎮" }
      ].map((item, i) => (
        <div key={i} style={{ 
          backgroundColor: '#fff', 
          padding: '30px', 
          borderRadius: 25, 
          transform: `rotate(${i % 2 ? 1 : -1}deg)`,
          boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
          border: '1px solid #eee'
        }}>
          <div style={{ fontSize: 48, marginBottom: 15 }}>{item.icon}</div>
          <div style={{ fontSize: 36, fontWeight: 900, marginBottom: 10 }}>{item.title}</div>
          <div style={{ fontSize: 26, color: '#666', lineHeight: 1.4 }}>{item.desc}</div>
        </div>
      ))}
    </div>
  </PageLayout>
);

// P5: Sandbox
const P5_Sandbox: React.FC = () => (
  <PageLayout>
    <div style={{ fontSize: 72, fontWeight: 900, marginBottom: 50 }}>
      为什么需要 <Highlighter color="#FFD700">沙箱 (Sandbox)</Highlighter>?
    </div>
    <Sticker>
      <div style={{ fontSize: 40, fontWeight: 900, marginBottom: 20, color: '#FF4D4D' }}>Agent 不止有嘴，还要有手！</div>
      <div style={{ fontSize: 32, lineHeight: 1.8, color: '#333' }}>
        - <b style={{ fontWeight: 900 }}>安全隔离</b>：防止 Agent 执行 rm -rf / 搞垮宿主机。<br/>
        - <b style={{ fontWeight: 900 }}>独立环境</b>：每个任务一个 Docker，用完即弃。<br/>
        - <b style={{ fontWeight: 900 }}>真实执行</b>：支持 Bash, Python, SQL, 文件读写。<br/>
      </div>
    </Sticker>
    <div style={{ marginTop: 30, fontSize: 34, fontWeight: 800, color: '#666' }}>
      “给实习生一台电脑，而不是在你的主机上操作”
    </div>
  </PageLayout>
);

// P6: MCP
const P6_MCP: React.FC = () => (
  <PageLayout>
    <div style={{ fontSize: 72, fontWeight: 900, marginBottom: 50 }}>
      <Highlighter>MCP 协议</Highlighter>：Agent 的触手
    </div>
    <div style={{ backgroundColor: '#000', color: '#fff', padding: '50px', borderRadius: 40, transform: 'rotate(-1deg)' }}>
      <div style={{ fontSize: 44, fontWeight: 900, marginBottom: 30, color: '#4ADE80' }}>像手机装 App 一样简单</div>
      <div style={{ fontSize: 32, lineHeight: 1.8 }}>
        业务系统不需要为 AI 改接口。只需写一个 <b style={{ fontWeight: 900 }}>MCP Server</b>，Agent 就能直接理解并调用。
        <div style={{ marginTop: 20, padding: 20, border: '2px dashed #444', borderRadius: 10 }}>
          新增能力 = 部署 MCP + 后台配个 URL ⚡️
        </div>
      </div>
    </div>
  </PageLayout>
);

// P7: Skills
const P7_Skills: React.FC = () => (
  <PageLayout>
    <div style={{ fontSize: 72, fontWeight: 900, marginBottom: 50 }}>
      <Highlighter color="#4ADE80">Skills</Highlighter>：解耦知识
    </div>
    <div style={{ display: 'flex', gap: 30 }}>
      <div style={{ flex: 1, backgroundColor: '#fff', padding: 30, borderRadius: 20, transform: 'rotate(-1deg)' }}>
        <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 15 }}>Prompt</div>
        <div style={{ fontSize: 24, color: '#666' }}>定义“怎么做”<br/>(流程 SOP)</div>
      </div>
      <div style={{ flex: 1, backgroundColor: '#fff', padding: 30, borderRadius: 20, transform: 'rotate(1deg)', border: '5px solid #4ADE80' }}>
        <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 15 }}>Skills</div>
        <div style={{ fontSize: 24, color: '#666' }}>定义“凭什么”<br/>(业务规则)</div>
      </div>
    </div>
    <div style={{ marginTop: 50, fontSize: 32, lineHeight: 1.6, backgroundColor: '#f0f0f0', padding: 30, borderRadius: 20 }}>
      <b>运营在后台改一下 Skill</b>，下一张工单立刻按新规处理。不需要排期，不需要等发版！
    </div>
  </PageLayout>
);

// P8: Loop
const P8_Loop: React.FC = () => (
  <PageLayout>
    <div style={{ fontSize: 72, fontWeight: 900, marginBottom: 50 }}>
      不是单次请求，是 <Highlighter>推理循环</Highlighter>
    </div>
    <div style={{ position: 'relative', height: 400 }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fff', padding: '20px 40px', borderRadius: 50, fontWeight: 900, fontSize: 32, border: '2px solid #333' }}>接收目标</div>
      <div style={{ position: 'absolute', top: 120, left: '10%', backgroundColor: '#4ADE80', padding: '20px 40px', borderRadius: 50, fontWeight: 900, fontSize: 32 }}>推理 (Think)</div>
      <div style={{ position: 'absolute', top: 120, right: '10%', backgroundColor: '#FFD700', padding: '20px 40px', borderRadius: 50, fontWeight: 900, fontSize: 32 }}>执行 (Act)</div>
      <div style={{ position: 'absolute', bottom: 50, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fff', padding: '20px 40px', borderRadius: 50, fontWeight: 900, fontSize: 32, border: '2px solid #333' }}>观察结果 (Obs)</div>
    </div>
    <div style={{ textAlign: 'center', fontSize: 34, fontWeight: 800, marginTop: 40, color: '#666' }}>
      “脚本处理预见，Agent 处理意外”
    </div>
  </PageLayout>
);

// P9: Admin
const P9_Admin: React.FC = () => (
  <PageLayout>
    <div style={{ fontSize: 72, fontWeight: 900, marginBottom: 50 }}>
      让运营人员 <Highlighter color="#4ADE80">“开飞机”</Highlighter>
    </div>
    <Sticker rotation={-1}>
      <div style={{ fontSize: 32, lineHeight: 2 }}>
        ✅ <b>项目管理</b>：一键开关自动化<br/>
        ✅ <b>Agent 配置</b>：随时微调 Prompt<br/>
        ✅ <b>Skill 管理</b>：实时更新审核规则<br/>
        ✅ <b>任务监控</b>：看 Agent 的思考全过程<br/>
      </div>
    </Sticker>
    <div style={{ fontSize: 36, fontWeight: 900, color: '#333', textAlign: 'center' }}>
      从“改代码两周”到“改配置两秒”
    </div>
  </PageLayout>
);

// P10: Langfuse
const P10_Langfuse: React.FC = () => (
  <PageLayout>
    <div style={{ fontSize: 72, fontWeight: 900, marginBottom: 50 }}>
      <Highlighter color="#FF4D4D">可观测性</Highlighter>：生命线
    </div>
    <div style={{ backgroundColor: '#fff', padding: 40, borderRadius: 30, border: '2px solid #eee' }}>
      <div style={{ fontSize: 32, color: '#666', marginBottom: 20 }}>接入 Langfuse 链路追踪：</div>
      <div style={{ fontSize: 28, fontFamily: 'monospace', color: '#333', lineHeight: 1.4 }}>
        - Trace: 处理返现工单<br/>
        - Span: 大模型推理 (1.2s)<br/>
        - Span: 调用 get_order (200ms)<br/>
        - Span: 执行审批 (150ms)<br/>
      </div>
    </div>
    <div style={{ marginTop: 40, fontSize: 38, fontWeight: 900, color: '#333' }}>
      出了问题不靠猜，10秒定位到哪一步挂了。
    </div>
  </PageLayout>
);

// P11: Conclusion
const P11_Conclusion: React.FC = () => (
  <PageLayout>
    <div style={{ fontSize: 80, fontWeight: 900, marginBottom: 60 }}>
      AI Agent 不是魔法<br/>
      <Highlighter>是工程</Highlighter>
    </div>
    <div style={{ fontSize: 44, fontWeight: 800, color: '#333', lineHeight: 1.6 }}>
      我们要做的，是把这个过程变得：<br/>
      <span style={{ color: '#4ADE80' }}>● 可靠</span> <span style={{ color: '#4ADE80' }}>● 可观测</span> <span style={{ color: '#4ADE80' }}>● 可配置</span>
    </div>
    <div style={{ marginTop: 100, textAlign: 'center' }}>
      <div style={{ backgroundColor: '#000', color: '#fff', fontSize: 48, fontWeight: 900, padding: '30px 60px', borderRadius: 100, display: 'inline-block' }}>
        评论区扣「1」，获取架构图 🚀
      </div>
    </div>
  </PageLayout>
);

// ============================================
// Root
// ============================================
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="p1-cover" component={P1_Cover} durationInFrames={1} fps={30} width={1080} height={1440} />
      <Composition id="p2-pain" component={P2_Pain} durationInFrames={1} fps={30} width={1080} height={1440} />
      <Composition id="p3-process" component={P3_Process} durationInFrames={1} fps={30} width={1080} height={1440} />
      <Composition id="p4-arch" component={P4_Arch} durationInFrames={1} fps={30} width={1080} height={1440} />
      <Composition id="p5-sandbox" component={P5_Sandbox} durationInFrames={1} fps={30} width={1080} height={1440} />
      <Composition id="p6-mcp" component={P6_MCP} durationInFrames={1} fps={30} width={1080} height={1440} />
      <Composition id="p7-skills" component={P7_Skills} durationInFrames={1} fps={30} width={1080} height={1440} />
      <Composition id="p8-loop" component={P8_Loop} durationInFrames={1} fps={30} width={1080} height={1440} />
      <Composition id="p9-admin" component={P9_Admin} durationInFrames={1} fps={30} width={1080} height={1440} />
      <Composition id="p10-trace" component={P10_Langfuse} durationInFrames={1} fps={30} width={1080} height={1440} />
      <Composition id="p11-conclusion" component={P11_Conclusion} durationInFrames={1} fps={30} width={1080} height={1440} />
    </>
  );
};

registerRoot(RemotionRoot);
