import { registerRoot, Composition, AbsoluteFill, staticFile, Img, delayRender, continueRender } from 'remotion';
import React, { useState } from 'react';

// ============================================
// P1: Cover - 毕玄爆料：全员 Agent 工程师
// ============================================
const AgentEngineerCover: React.FC<any> = ({ 
  avatar = "jojo.jpg",
  username = "@杰哥_ai_team"
}) => {
  const [avatarHandle] = useState(() => delayRender('Loading avatar'));
  const gridPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23F0EAE2' stroke-width='1'/%3E%3C/svg%3E")`;

  return (
    <AbsoluteFill style={{
      backgroundColor: '#FEF9F2',
      backgroundImage: gridPattern,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", -apple-system, sans-serif',
      padding: '80px 60px',
    }}>
      {/* 顶部个人信息 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 60,
      }}>
        <div style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          overflow: 'hidden',
          marginRight: 20,
          border: '3px solid #fff',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
        }}>
          <Img 
            src={staticFile(avatar)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onLoad={() => continueRender(avatarHandle)}
            onError={() => continueRender(avatarHandle)}
          />
        </div>
        <span style={{ fontSize: 42, fontWeight: 900, color: '#333' }}>{username}</span>
      </div>

      {/* 主标题 - 冲击力强 */}
      <div style={{
        textAlign: 'left',
        marginTop: 40,
        position: 'relative',
      }}>
        <div style={{
          fontWeight: 900,
          lineHeight: 1.2,
          color: '#000',
        }}>
          <div style={{ 
            position: 'relative',
            zIndex: 1,
            display: 'inline-block',
            transform: 'rotate(-2deg)',
            marginBottom: 20,
          }}>
            <div style={{
              position: 'absolute',
              top: '5%', left: '-5%', right: '-5%', bottom: '5%',
              backgroundColor: '#FF4D4D',
              zIndex: -1,
              borderRadius: '60% 40% 50% 45% / 10% 15% 12% 10%',
            }}></div>
            <span style={{ color: '#fff', fontSize: 100, padding: '0 20px' }}>不分技术栈</span>
          </div>
          <div style={{ fontSize: 130, letterSpacing: -2 }}>全员 Agent</div>
          <div style={{ fontSize: 130, letterSpacing: -2 }}>工程师？</div>
        </div>

        {/* 毕玄观点标注 */}
        <div style={{
          marginTop: 60,
          fontSize: 52,
          fontWeight: 800,
          color: '#333',
          lineHeight: 1.5,
        }}>
          阿里 P10 毕玄发话：<br/>
          <div style={{ 
            backgroundColor: '#4ADE80', 
            padding: '10px 25px',
            borderRadius: '15px 50px 10px 40px / 10% 10% 10% 10%',
            transform: 'rotate(1deg)',
            display: 'inline-block',
            marginTop: 10,
          }}>
            技术岗大洗牌来了！⚒️
          </div>
        </div>
      </div>

      {/* 底部悬念钩子 */}
      <div style={{
        marginTop: 40,
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <div style={{
          backgroundColor: '#000',
          color: '#fff',
          fontSize: 48,
          fontWeight: 900,
          padding: '15px 40px',
          borderRadius: '50px 10px 40px 15px',
          transform: 'rotate(-2deg)',
          boxShadow: '10px 10px 0 rgba(0,0,0,0.1)',
        }}>
          真相是。。。👇
        </div>
      </div>

      {/* 底部互动暗示 */}
      <div style={{
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: 0.6,
      }}>
        <div style={{ fontSize: 32, fontWeight: 700 }}>#AI时代 #程序员 #毕玄 #Agent工程师</div>
        <div style={{ fontSize: 40 }}>💬 1.2k ⭐️ 3.5k</div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// P2: Details - 毕玄内部观点拆解
// ============================================
const AgentEngineerDetails: React.FC<any> = ({ 
  avatar = "jojo.jpg",
  username = "@杰哥_ai_team"
}) => {
  const [handle] = useState(() => delayRender('Loading avatar'));
  const gridPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23F0EAE2' stroke-width='1'/%3E%3C/svg%3E")`;

  return (
    <AbsoluteFill style={{
      backgroundColor: '#FEF9F2',
      backgroundImage: gridPattern,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", -apple-system, sans-serif',
      padding: '80px 60px',
    }}>
      {/* 顶部个人信息 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 40,
      }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          overflow: 'hidden',
          marginRight: 20,
          border: '2px solid #fff',
        }}>
          <Img 
            src={staticFile(avatar)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onLoad={() => continueRender(handle)}
            onError={() => continueRender(handle)}
          />
        </div>
        <span style={{ fontSize: 36, fontWeight: 900, color: '#333' }}>{username}</span>
      </div>

      {/* 核心观点列表 */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          fontSize: 72,
          fontWeight: 900,
          color: '#000',
          marginBottom: 40,
          lineHeight: 1.2,
          transform: 'rotate(-0.5deg)',
        }}>
          💡 程序员的下半场<br/>
          不再按 <span style={{ textDecoration: 'underline wavy #FF4D4D' }}>技术栈</span> 划分！
        </div>

        {/* 毕玄原话截图模拟 - 贴纸化 */}
        <div style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '20px',
          border: '12px solid #fff',
          boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
          transform: 'rotate(1deg)',
          marginBottom: 40,
          position: 'relative',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 20,
          }}>
            <div style={{ 
              width: 50, height: 50, borderRadius: '50%', 
              backgroundColor: '#1E50A2', display: 'flex', 
              alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 24, fontWeight: 900,
              marginRight: 15
            }}>毕</div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#333' }}>林昊 (毕玄)</div>
              <div style={{ fontSize: 18, color: '#999' }}>基于 AI Agent 的新一代 IT 运维服务商</div>
            </div>
          </div>
          <div style={{
            fontSize: 24,
            lineHeight: 1.6,
            color: '#111',
            textAlign: 'justify',
            maxHeight: 400,
            overflow: 'hidden',
            position: 'relative',
          }}>
            “随着 AI Coding 的发展，公司决定以后不再按技术栈划分技术岗位，公司所有的技术岗统称为 <b style={{ fontWeight: 900 }}>Agent 工程师</b>... 对于不懂的技术栈，最重要的是有个基本的概念... 公司之后会报销大家 AI Coding 产品（例如 Cursor Pro）的月订阅费。”
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0, height: 60,
              background: 'linear-gradient(transparent, #fff)'
            }} />
          </div>
          <div style={{
            position: 'absolute',
            top: -20, right: -20,
            backgroundColor: '#FF4D4D',
            color: '#fff',
            padding: '8px 20px',
            borderRadius: 50,
            fontSize: 24,
            fontWeight: 900,
            transform: 'rotate(15deg)',
            boxShadow: '0 5px 15px rgba(255,77,77,0.3)'
          }}>内部流出 ⚡️</div>
        </div>

        <div style={{
          fontSize: 38,
          fontWeight: 700,
          lineHeight: 1.6,
          color: '#333',
        }}>
          <div style={{ marginBottom: 20, display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ marginRight: 15 }}>🚀</span>
            <span><b style={{ fontWeight: 900 }}>不分技术栈</b>：只看你能否带 Agent 搞定任务。</span>
          </div>
          <div style={{ marginBottom: 20, display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ marginRight: 15 }}>📈</span>
            <span><b style={{ fontWeight: 900 }}>核心指标</b>：日消耗 Token 数决定公司估值。</span>
          </div>
          
          {/* 高亮总结 */}
          <div style={{ 
            marginTop: 20,
            position: 'relative',
            display: 'inline-block',
          }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: '#4ADE80',
              transform: 'rotate(-1deg) scale(1.05)',
              borderRadius: '15px 40px 10px 30px',
              zIndex: 0,
            }} />
            <div style={{ 
              position: 'relative',
              zIndex: 1,
              color: '#000',
              fontWeight: 900,
              fontSize: 44,
              padding: '10px 30px',
            }}>
              程序员不再手写代码，而是控制 AI。
            </div>
          </div>
        </div>
      </div>

      {/* 底部引导 */}
      <div style={{
        marginTop: 40,
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          backgroundColor: '#000',
          color: 'white',
          fontSize: 48,
          fontWeight: 900,
          padding: '25px 0',
          width: '100%',
          borderRadius: 100,
        }}>
          👆 点击关注，带你转型 Agent
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// P3: Quote - 毕玄原话完整贴纸
// ============================================
const BixuanFullQuote: React.FC<any> = () => {
  const gridPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23F0EAE2' stroke-width='1'/%3E%3C/svg%3E")`;

  return (
    <AbsoluteFill style={{
      backgroundColor: '#FEF9F2',
      backgroundImage: gridPattern,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", -apple-system, sans-serif',
      padding: '60px',
      justifyContent: 'center',
    }}>
      <div style={{
        fontSize: 64,
        fontWeight: 900,
        marginBottom: 60,
        textAlign: 'center',
      }}>
        <span style={{ 
          backgroundColor: '#4ADE80', 
          padding: '0 20px', 
          borderRadius: 10,
          transform: 'rotate(-1deg)',
          display: 'inline-block'
        }}>毕大师</span> 到底说了啥？
      </div>

      <div style={{
        backgroundColor: '#fff',
        padding: '50px',
        borderRadius: '30px',
        border: '15px solid #fff',
        boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
        transform: 'rotate(-1deg)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 40,
          borderBottom: '1px solid #eee',
          paddingBottom: 30,
        }}>
          <div style={{ 
            width: 80, height: 80, borderRadius: '50%', 
            backgroundColor: '#1E50A2', display: 'flex', 
            alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 36, fontWeight: 900,
            marginRight: 25
          }}>毕</div>
          <div>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#333' }}>林昊 (毕玄)</div>
            <div style={{ fontSize: 24, color: '#999' }}>基于 AI Agent 的新一代 IT 运维服务商</div>
          </div>
        </div>

        <div style={{
          fontSize: 32,
          lineHeight: 1.8,
          color: '#111',
          textAlign: 'justify',
        }}>
          <p style={{ marginBottom: 30 }}>
            “随着 AI Coding 的发展，公司决定以后不再按技术栈划分技术岗位，公司所有的技术岗统称为 <b style={{ fontWeight: 900 }}>Agent 工程师</b>，任务分配不再基于你是前端、后端还是算法，而是基于产品目标和项目结果。”
          </p>
          <p style={{ marginBottom: 30 }}>
            “AI Agent 公司的核心指标是 <b style={{ fontWeight: 900 }}>日 Token 消耗</b>... Github Copilot 一天 3 万亿，Cursor 1.8 万亿... 我们做到日消耗万亿 Token 并不是遥不可及的。”
          </p>
          <p style={{ fontWeight: 800, fontSize: 36, color: '#FF4D4D' }}>
            “我们不能错过这样的难得的机会，大家加油！”
          </p>
        </div>
      </div>

      <div style={{
        marginTop: 80,
        fontSize: 40,
        fontWeight: 900,
        color: '#666',
        textAlign: 'center',
      }}>
        💡 懂了吗？Token 就是未来的“石油” ⛽️
      </div>
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Cover"
        component={AgentEngineerCover}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1440}
        defaultProps={{
          avatar: "jojo.jpg",
          username: "@杰哥_ai_team"
        }}
      />
      <Composition
        id="Details"
        component={AgentEngineerDetails}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1440}
        defaultProps={{
          avatar: "jojo.jpg",
          username: "@杰哥_ai_team"
        }}
      />
      <Composition
        id="FullQuote"
        component={BixuanFullQuote}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1440}
      />
    </>
  );
};

registerRoot(RemotionRoot);
