import { registerRoot, Composition, AbsoluteFill, staticFile, Img, delayRender, continueRender } from 'remotion';
import React, { useState, useEffect } from 'react';

const DouyinNote: React.FC<any> = ({ title, content, highlights = [], avatar }) => {
  const [handle] = useState(() => delayRender('Loading avatar'));
  
  const renderTextWithHighlights = (text: string) => {
    let parts: (string | JSX.Element)[] = [text];
    
    highlights.forEach((highlight: string) => {
      const newParts: (string | JSX.Element)[] = [];
      parts.forEach((part) => {
        if (typeof part === 'string') {
          const split = part.split(highlight);
          for (let i = 0; i < split.length; i++) {
            newParts.push(split[i]);
            if (i < split.length - 1) {
              newParts.push(
                <span key={highlight + i} style={{ color: '#4da6ff', fontWeight: 'bold' }}>
                  {highlight}
                </span>
              );
            }
          }
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });
    
    return parts;
  };

  const lines = content.split('\n');

  // Use the local jojo.jpg file as the avatar
  const avatarUrl = avatar || staticFile("jojo.jpg");

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #7da2ff 0%, #a287ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 60,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    }}>
      <div style={{
        backgroundColor: '#000000',
        width: 900,
        height: 1200,
        borderRadius: 80,
        padding: '60px 50px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
        position: 'relative',
        color: 'white',
      }}>
        {/* Header: Avatar + User Info */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 50 }}>
          <div style={{
            width: 110,
            height: 110,
            borderRadius: '50%',
            backgroundColor: '#1a1a1a',
            marginRight: 25,
            border: '3px solid #333',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Img 
              src={avatarUrl} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              onLoad={() => continueRender(handle)}
              onError={() => continueRender(handle)}
            />
          </div>
          <div>
            <div style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 5, letterSpacing: 1 }}>@杰哥_ai_team</div>
            <div style={{ fontSize: 26, color: '#888', fontWeight: '500' }}>03-08</div>
          </div>
        </div>

        {/* Title */}
        <div style={{ 
          fontSize: 48, 
          fontWeight: '900', 
          marginBottom: 45,
          display: 'flex',
          alignItems: 'center',
          letterSpacing: 1
        }}>
          {title}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {lines.map((line: string, i: number) => (
            <div key={i} style={{ 
              fontSize: 36, 
              lineHeight: 1.7, 
              marginBottom: 38,
              fontWeight: i === 0 ? '800' : '500',
              color: i === 0 ? 'white' : '#e0e0e0',
              letterSpacing: 0.5
            }}>
              {renderTextWithHighlights(line)}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ fontSize: 30, fontWeight: 'bold', color: '#444' }}>22:10</div>
          <div style={{ fontSize: 26, fontWeight: 'bold', color: '#444' }}>Sunday</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DouyinNote"
        component={DouyinNote}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1440}
        defaultProps={{
          title: "🤯 00后拿3000万的背后",
          content: "很多人还没看明白：\n一个大四还没毕业的学生，凭什么让陈天桥在24小时内乖乖掏出3000万？\n不是他代码写得有多牛，而是他直接扒掉了所有传统程序员的底裤。\n10天登顶GitHub全球第一， 这不是简单的创业，这是科技圈的“阶级屠杀”。\n大厂程序员还在卷加班、卷技术栈， 00后已经开始指挥AI大规模收割战场了。",
          highlights: ["大四还没毕业的学生", "陈天桥", "10天登顶GitHub全球第一"]
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
