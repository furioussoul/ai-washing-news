import puppeteer from 'puppeteer-core';

async function run() {
  console.log('\n🚀 [AI TEAM 侦察兵] 正在接管您本地已登录好的超级浏览器...');
  
  let browser;
  try {
    // 这次只尝试连接外部开启的调试浏览器，因为本地启动容易被识别为无痕/自动化模式
    browser = await puppeteer.connect({
      browserURL: 'http://127.0.0.1:9222',
      defaultViewport: null
    });
    console.log('✅ 完美！已成功接管您的浏览器（上帝模式开启）！');
  } catch (error) {
    console.log('\n❌ 连接失败！被系统拦截了！');
    console.log('💡 核心秘密就在这里：千万不要让脚本自己去启动浏览器（会被检测出机器人并弹出登录框）！');
    console.log('👉 您必须手动在终端运行这行代码来启动 Chrome（它会为您保存永久登录状态）：');
    console.log('\x1b[33m/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --remote-debugging-port=9222 --user-data-dir="/tmp/chrome-ai-team"\x1b[0m');
    console.log('然后在这个 Chrome 里登录小红书，再运行本脚本。');
    return;
  }

  try {
    const pages = await browser.pages();
    let xhsPage = null;
    
    for (const p of pages) {
      if (p.url().includes('xiaohongshu.com')) {
        xhsPage = p;
        break;
      }
    }

    if (!xhsPage) {
        console.log('⚠️ 没找到小红书页面，我帮您新建一个 Tab...');
        xhsPage = await browser.newPage();
        await xhsPage.goto('https://www.xiaohongshu.com/explore', { waitUntil: 'networkidle2' });
    } else {
        console.log('🎯 找到了！正在聚焦到您的小红书页面...');
        await xhsPage.bringToFront();
    }

    console.log('\n🔄 开始模拟人类手势，向下滚动提取数据（您看，这次绝对没有登录框！）...');
    for (let i = 0; i < 3; i++) {
        await xhsPage.evaluate(() => {
            window.scrollBy(0, document.body.scrollHeight);
        });
        console.log(`[滚动 ${i+1}/3] 正在加载瀑布流...`);
        await new Promise(r => setTimeout(r, 1500)); 
    }

    console.log('\n📊 正在提取爆款标题和点赞数...');
    const data = await xhsPage.evaluate(() => {
        const titleElements = document.querySelectorAll('.title.span');
        const authorElements = document.querySelectorAll('.author .name');
        const likesElements = document.querySelectorAll('.like-wrapper .count');
        
        let results = [];
        const max = Math.min(15, titleElements.length);
        for(let i=0; i<max; i++) {
            results.push({
                "爆款标题": titleElements[i]?.textContent?.trim() || '无标题',
                "博主昵称": authorElements[i]?.textContent?.trim() || '匿名',
                "点赞数据": likesElements[i]?.textContent?.trim() || '0'
            });
        }
        return results;
    });

    console.log('\n=========================================');
    console.log('🎉 [AI TEAM 分析师] 报告老板，真实数据抓取完毕！');
    console.log('=========================================');
    
    if (data.length > 0) {
        console.table(data);
        console.log(`\n🔥 太爽了！成功提取了 ${data.length} 条真实笔记！完全没有触发登录拦截！`);
        console.log('=========================================\n');
    } else {
        console.log('⚠️ 页面没加载出数据。请确认您已经在该 Chrome 窗口里成功登录了小红书。');
    }

    console.log('演示结束。正在安全断开连接...');
    await browser.disconnect();

  } catch (error) {
    console.log('\n❌ 抓取过程中出现错误:', error);
  }
}

run();
