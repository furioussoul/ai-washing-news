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

const ImageWrapper: React.FC<any> = ({ src }) => {
  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #7da2ff 0%, #a287ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        borderRadius: 40,
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
      }}>
        <Img 
          src={staticFile(src)} 
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%', 
            objectFit: 'contain' 
          }} 
        />
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
      />
      <Composition
        id="ImageWrapper"
        component={ImageWrapper}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1440}
      />
    </>
  );
};

registerRoot(RemotionRoot);
