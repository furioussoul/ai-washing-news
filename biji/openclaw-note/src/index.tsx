import { registerRoot, Composition, AbsoluteFill, staticFile, Img, delayRender, continueRender } from 'remotion';
import React, { useState } from 'react';

// ============================================
// P1: OpenclawNote - 封面图 (1:1 复刻抖音截图)
// ============================================
const OpenclawNote: React.FC<any> = ({ 
  catImage = "cat.png",
  avatar = "jojo.jpg",
  username = "@杰哥_ai_team"
}) => {
  const [catHandle] = useState(() => delayRender('Loading cat image'));
  const [avatarHandle] = useState(() => delayRender('Loading avatar'));

  // 模拟活人使用的网格背景
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
      {/* 顶部个人信息 - 更有社交感 */}
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
        <span style={{ fontSize: 42, fontWeight: 900, color: '#333', letterSpacing: -1 }}>{username}</span>
      </div>

      {/* 主标题区域 - 荧光笔手绘感 */}
      <div style={{
        textAlign: 'left',
        marginBottom: 40,
        position: 'relative',
      }}>
        <div style={{
          fontSize: 140,
          fontWeight: 900,
          lineHeight: 1.15,
          color: '#000',
        }}>
          <span style={{ 
            position: 'relative',
            zIndex: 1,
            display: 'inline-block',
            transform: 'rotate(-1deg)',
          }}>
            <span style={{
              position: 'absolute',
              top: '15%',
              left: '-5%',
              right: '-5%',
              bottom: '5%',
              backgroundColor: '#4ADE80',
              zIndex: -1,
              borderRadius: '60% 40% 50% 45% / 10% 15% 12% 10%', // 不规则圆角模拟笔触
              transform: 'skewX(-5deg)',
            }}></span>
            Openclaw
          </span>
          <br />
          很难吗？
        </div>
        
        {/* 手写备注感文案 */}
        <div style={{
          fontSize: 60,
          fontWeight: 800,
          color: '#333',
          marginTop: 50,
          display: 'flex',
          alignItems: 'center',
          gap: 15,
        }}>
          <span>程序员带你零基础手搓</span>
          <span style={{ 
            backgroundColor: '#FFD700', 
            fontSize: 28, 
            padding: '4px 12px', 
            borderRadius: 8,
            transform: 'rotate(5deg)',
            fontWeight: 900,
          }}>
            真·保姆级
          </span>
        </div>
      </div>

      {/* 图片展示区 - 贴纸化 */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}>
        {/* 背景装饰性圆圈，增加层次感 */}
        <div style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          backgroundColor: '#4ADE80',
          opacity: 0.1,
          zIndex: 0,
        }} />
        
        <div style={{
          position: 'relative',
          zIndex: 1,
          transform: 'rotate(1deg)', // 微调角度，更有活人感
        }}>
          <Img
            src={staticFile(catImage)}
            style={{
              width: 700,
              height: 700,
              objectFit: 'contain',
              borderRadius: 30,
              border: '15px solid #fff', // 模拟宝丽来/贴纸描边
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
            onLoad={() => continueRender(catHandle)}
            onError={() => continueRender(catHandle)}
          />
        </div>
      </div>

      {/* 底部互动暗示 */}
      <div style={{
        marginTop: 40,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: 0.6,
      }}>
        <div style={{ fontSize: 32, fontWeight: 700 }}>#AI编程 #程序员 #零基础</div>
        <div style={{ fontSize: 40 }}>💬 128 ⭐️ 356</div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// P2: FollowNote - 引流加粉图
// ============================================
const FollowNote: React.FC<any> = ({
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
      {/* 个人信息栏 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 80,
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
            onLoad={() => continueRender(handle)}
            onError={() => continueRender(handle)}
          />
        </div>
        <span style={{ fontSize: 42, fontWeight: 900, color: '#333' }}>{username}</span>
      </div>

      {/* 核心内容 - 模拟博主随笔感 */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 20px',
      }}>
        <div style={{
          fontSize: 96,
          fontWeight: 900,
          color: '#000',
          marginBottom: 60,
          lineHeight: 1.1,
          transform: 'rotate(-1deg)',
        }}>
          🔥 想跟我一起<br/>
          玩转 <span style={{ color: '#4ADE80' }}>AI 编程</span>？
        </div>

        <div style={{
          fontSize: 54,
          fontWeight: 700,
          lineHeight: 2,
          color: '#333',
        }}>
          <div style={{ marginBottom: 15 }}>✅ AI 编程从 <span style={{ textDecoration: 'underline wavy #4ADE80' }}>0 到 1</span></div>
          <div style={{ marginBottom: 15 }}>✅ 爆款项目实战拆解</div>
          <div style={{ marginBottom: 60 }}>✅ 第一手前沿资讯</div>
          
          <div style={{ 
            position: 'relative',
            display: 'inline-block',
          }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: '#4ADE80',
              transform: 'rotate(-1.5deg) scale(1.1)',
              borderRadius: '10px 30px 15px 25px',
              zIndex: 0,
            }} />
            <div style={{ 
              position: 'relative',
              zIndex: 1,
              color: '#000',
              fontWeight: 900,
              fontSize: 72,
              padding: '10px 30px',
            }}>
              评论区扣「1」
            </div>
          </div>
          
          <div style={{ 
            color: '#000', 
            fontWeight: 900,
            fontSize: 52,
            marginTop: 40,
            fontStyle: 'italic',
          }}>
            私信发你完整教程！🚀
          </div>
        </div>
      </div>

      {/* 底部操作区 */}
      <div style={{
        marginTop: 60,
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          backgroundColor: '#000',
          color: 'white',
          fontSize: 52,
          fontWeight: 900,
          padding: '35px 0',
          width: '100%',
          borderRadius: 100,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        }}>
          👆 点击关注
        </div>
        {/* 增加一个手绘感的箭头或装饰 */}
        <div style={{
          position: 'absolute',
          top: -40,
          right: 20,
          fontSize: 60,
          transform: 'rotate(15deg)',
        }}>✨</div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Remotion Root
// ============================================
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="OpenclawNote"
        component={OpenclawNote}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1440}
        defaultProps={{
          catImage: "cat.png",
        }}
      />
      
      <Composition
        id="FollowNote"
        component={FollowNote}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1440}
        defaultProps={{
          avatar: "jojo.jpg",
          username: "@杰哥_ai_team"
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
