import React from 'react';
import { AbsoluteFill } from 'remotion';
import { z } from 'zod';

export const xhsPosterSchema = z.object({
  text: z.string().optional(),
  title: z.string().optional(),
  tag: z.string().optional(),
});

export const XhsPoster: React.FC<z.infer<typeof xhsPosterSchema>> = (props) => {
  const {
    text = "默认文案",
    title = "今日金句",
    tag = "#AI时代 #思维升级",
  } = props;
  console.log("Rendering XhsPoster with props:", props);
  return (
    <AbsoluteFill style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 50 }}>
      <div style={{ border: '20px solid red', padding: 50, backgroundColor: '#f0f0f0', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: 80, color: 'black', marginBottom: 20 }}>{title}</h1>
        <p style={{ fontSize: 50, color: 'blue', flex: 1 }}>{text}</p>
        <footer style={{ fontSize: 40, color: 'green' }}>{tag}</footer>
      </div>
    </AbsoluteFill>
  );
};
