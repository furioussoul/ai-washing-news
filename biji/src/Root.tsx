import { Composition } from "remotion";

const SimplePoster: React.FC<any> = ({ text, title, tag }) => {
  console.log("SimplePoster rendering", { text, title, tag });
  return (
    <div style={{
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 100,
      color: 'black'
    }}>
      <h1 style={{ fontSize: 100 }}>{title || "Default Title"}</h1>
      <p style={{ fontSize: 60 }}>{text || "Default Text"}</p>
      <div style={{ fontSize: 40, color: 'red' }}>{tag || "#DefaultTag"}</div>
    </div>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="XhsPoster"
        component={SimplePoster}
        durationInFrames={30}
        fps={30}
        width={1080}
        height={1440}
        defaultProps={{
          text: "默认文案",
          title: "默认标题",
          tag: "#默认标签",
        }}
      />
    </>
  );
};
