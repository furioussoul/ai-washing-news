import puppeteer from 'puppeteer-core';
import { execSync } from 'child_process';

async function run() {
  console.log('🤖 [AI TEAM 侦察兵] 正在接管您本地已打开的 Chrome 浏览器...');
  
  // Try to find Chrome's debugging port by looking for a running Chrome instance
  try {
    // 这种方法尝试连接到可能已经开启了 debugging port 的 Chrome
    // 或者我们需要提示用户如何以 debugging 模式启动 Chrome
    console.log('请注意：由于 macOS 和 Chrome 的安全限制，为了让 AI 接管您的真实浏览器（无需重新登录小红书），');
    console.log('我们需要通过【调试模式】来控制 Chrome。');
    
    console.log('\n--- 👉 请按照以下步骤开启“上帝模式” 👈 ---');
    console.log('1. 请完全退出您当前的 Chrome（快捷键：Cmd + Q）');
    console.log('2. 打开您的终端（Terminal）');
    console.log('3. 粘贴并运行以下这行魔法命令（它会带调试接口重启Chrome）：');
    console.log('\x1b[33m/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t \'chrome-remote_data_dir\')\x1b[0m');
    console.log('4. 在弹出的新 Chrome 窗口里，登录一下小红书（只登录一次）。');
    console.log('5. 然后按回车键，我就会立刻施展“隔空取物”！');
    
    // 我们也提供一个“全自动（但需要重新登录）”的备选方案
    console.log('\n--- 或者，让我直接开一个新的隐身浏览器给您演示（可能会遇到小红书的登录弹窗） ---');
    
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: false,
      defaultViewport: null,
      args: ['--start-maximized']
    });

    const page = await browser.newPage();
    console.log('🕵️‍♂️ 正在潜入小红书首页...');
    await page.goto('https://www.xiaohongshu.com/explore', { waitUntil: 'networkidle2' });
    
    console.log('👀 正在分析页面结构...');
    // 等待笔记流加载
    await page.waitForSelector('.note-item', { timeout: 10000 }).catch(() => console.log('等待笔记流加载超时，可能是遇到了登录墙。'));
    
    console.log('🔄 模拟人类手势，向下滚动页面获取更多数据...');
    for (let i = 0; i < 3; i++) {
        await page.evaluate(() => {
            window.scrollBy(0, document.body.scrollHeight);
        });
        await new Promise(r => setTimeout(r, 1500)); // 假装是人在看
    }

    console.log('📊 正在提取爆款标题...');
    const titles = await page.evaluate(() => {
        const titleElements = document.querySelectorAll('.title.span');
        const authorElements = document.querySelectorAll('.author .name');
        const likesElements = document.querySelectorAll('.like-wrapper .count');
        
        let results = [];
        // 取前 10 条展示
        const max = Math.min(10, titleElements.length);
        for(let i=0; i<max; i++) {
            results.push({
                title: titleElements[i]?.textContent?.trim() || '无标题',
                author: authorElements[i]?.textContent?.trim() || '匿名',
                likes: likesElements[i]?.textContent?.trim() || '0'
            });
        }
        return results;
    });

    console.log('\n=========================================');
    console.log('🎉 [AI TEAM 分析师] 报告老板，数据抓取完毕！');
    console.log('=========================================');
    if (titles.length === 0) {
        console.log('⚠️ 未能抓取到标题，小红书可能弹出了强制登录框。这就是为什么“00后的3000万项目”核心难点在于【接管已登录的浏览器】！');
    } else {
        console.log(JSON.stringify(titles, null, 2));
        console.log(`\n🔥 成功提取了 ${titles.length} 条当前首页的热门笔记！`);
        console.log('这些数据现在就可以直接喂给大模型（如 DeepSeek 或 Claude），生成刚才我们文档里的《舆情分析报告看板》了！');
    }
    console.log('=========================================\n');

    console.log('演示完毕。浏览器将在 15 秒后自动关闭...');
    setTimeout(async () => {
        await browser.close();
    }, 15000);

  } catch (error) {
    console.error('执行失败:', error);
  }
}

run();
