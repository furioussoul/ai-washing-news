import puppeteer from 'puppeteer-core';
import * as fs from 'fs';

async function run() {
  console.log('🚀 正在连接本地已开启的调试浏览器 (127.0.0.1:9222)...');
  
  let browser;
  try {
    browser = await puppeteer.connect({
      browserURL: 'http://127.0.0.1:9222',
      defaultViewport: null
    });
    console.log('✅ 成功接管浏览器！');
  } catch (error) {
    console.error('❌ 连接失败！请确保本地 Chrome 已经通过 --remote-debugging-port=9222 启动。');
    return;
  }

  try {
    const pages = await browser.pages();
    let xhsPage = null;
    
    // 尝试找一个当前的小红书搜索页，或者新建
    for (const p of pages) {
      if (p.url().includes('xiaohongshu.com')) {
        xhsPage = p;
        break;
      }
    }

    if (!xhsPage) {
        console.log('⚠️ 未找到小红书页面，新建 Tab 中...');
        xhsPage = await browser.newPage();
    } else {
        console.log('🎯 找到已有小红书页面，正在切换...');
        await xhsPage.bringToFront();
    }

    const targetUrl = 'https://www.xiaohongshu.com/search_result?keyword=openclaw&source=web_search_result_notes';
    console.log(`🔗 正在访问搜索页: ${targetUrl}`);
    await xhsPage.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // 简单的重试机制等待内容加载
    console.log('⏳ 正在等待搜索结果加载...');
    let retries = 5;
    while (retries > 0) {
      try {
        await xhsPage.waitForSelector('.title', { timeout: 5000 });
        console.log('✅ 搜索结果已初步加载。');
        break;
      } catch (e) {
        console.log(`⚠️ 等待超时，可能网络较慢或被拦截。剩余重试次数: ${retries - 1}`);
        retries--;
        await xhsPage.reload({ waitUntil: 'networkidle2' });
      }
    }

    if (retries === 0) {
      console.error('❌ 无法加载出搜索结果数据，请检查网络或是否需要登录/过验证码。');
      await browser.disconnect();
      return;
    }

    console.log('\\n🔄 开始模拟人类手势，向下滚动加载更多数据...');
    let previousHeight = 0;
    // 滚动 5 次，确保至少加载 15 条
    for (let i = 0; i < 5; i++) {
        previousHeight = await xhsPage.evaluate('document.body.scrollHeight');
        await xhsPage.evaluate(() => {
            window.scrollBy(0, 800); // 模拟每次滚动 800px
        });
        console.log(`[滚动 ${i+1}/5] 正在加载瀑布流...`);
        // 随机等待 1-2 秒，模拟真实浏览
        await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000)); 
    }

    console.log('\\n📊 正在提取【openclaw】爆款笔记数据...');
    
    // 获取小红书的笔记数据结构
    const data = await xhsPage.evaluate(() => {
        // 小红书常见的选择器
        const titleElements = document.querySelectorAll('.title');
        const authorElements = document.querySelectorAll('.author .name');
        const likesElements = document.querySelectorAll('.like-wrapper .count');
        
        let results = [];
        // 获取最多 15 条
        const max = Math.min(15, titleElements.length);
        for(let i = 0; i < max; i++) {
            results.push({
                title: titleElements[i]?.textContent?.trim() || '无标题',
                author: authorElements[i]?.textContent?.trim() || '匿名',
                likes: likesElements[i]?.textContent?.trim() || '0'
            });
        }
        return results;
    });

    console.log('\\n=========================================');
    console.log(`🎉 成功提取了 ${data.length} 条爆款笔记！`);
    console.log('=========================================');
    
    if (data.length > 0) {
        console.table(data);
        
        // 存入 openclaw_notes.json 文件
        fs.writeFileSync('openclaw_notes.json', JSON.stringify(data, null, 2), 'utf-8');
        console.log(`\\n💾 数据已成功保存到当前目录的 openclaw_notes.json 文件中。`);
        
    } else {
        console.log('⚠️ 页面没抓取到数据。请确认 DOM 结构是否变化，或者页面是否真的有数据。');
    }

    await browser.disconnect();
    console.log('🔌 浏览器连接已安全断开。');

  } catch (error) {
    console.error('\\n❌ 抓取过程中出现致命错误:', error);
  }
}

run();
