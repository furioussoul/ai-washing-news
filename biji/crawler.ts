import puppeteer from 'puppeteer-core';
import * as fs from 'fs';
import * as path from 'path';

const DATA_DIR = path.resolve(__dirname, 'data');

async function downloadImage(url: string, filepath: string) {
    try {
        if (url.startsWith('//')) {
            url = 'https:' + url;
        }
        console.log(`Fetching image: ${url}`);
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(filepath, Buffer.from(buffer));
    } catch (e) {
        console.error(`Failed to download ${url}:`, e);
    }
}

async function run() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

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
        let page = pages.find(p => p.url().includes('xiaohongshu.com'));
        
        if (!page) {
            console.log('⚠️ 未找到小红书页面，新建 Tab 中...');
            page = await browser.newPage();
        } else {
            console.log('🎯 找到已有小红书页面，正在切换...');
            await page.bringToFront();
        }

        console.log('🔗 访问小红书搜索 [openclaw] ...');
        await page.goto('https://www.xiaohongshu.com/search_result?keyword=openclaw&source=web_search_result_notes', { waitUntil: 'domcontentloaded', timeout: 60000 });
        
        console.log('⏳ 等待搜索结果...');
        await new Promise(r => setTimeout(r, 6000));
        
        // Scroll down a bit
        await page.evaluate(() => window.scrollBy(0, 500));
        await new Promise(r => setTimeout(r, 2000));

        // Find note cards
        const noteCards = await page.$$('section.note-item');
        console.log(`🎯 找到 ${noteCards.length} 篇笔记`);
        
        const limit = Math.min(4, noteCards.length);
        
        for (let i = 0; i < limit; i++) {
            console.log(`\n📌 准备抓取第 ${i+1} 篇`);
            
            // Re-fetch note cards to avoid detached DOM elements
            const cards = await page.$$('section.note-item');
            if (cards.length <= i) break;
            
            const card = cards[i];
            
            // Click the card
            await card.click();
            console.log('🖱️ 已点击卡片，等待弹窗加载...');
            
            // Wait for the modal
            await new Promise(r => setTimeout(r, 4000));
            
            const noteData = await page.evaluate(() => {
                const titleSelectors = ['#detail-title', '.title', '.note-title'];
                let title = '';
                for (let sel of titleSelectors) {
                    const el = document.querySelector(sel);
                    if (el && el.textContent) {
                        title = el.textContent.trim();
                        break;
                    }
                }

                const descSelectors = ['#detail-desc', '.desc', '.note-content'];
                let content = '';
                for (let sel of descSelectors) {
                    const el = document.querySelector(sel);
                    if (el && el.textContent) {
                        content = el.textContent.trim();
                        break;
                    }
                }

                const images = Array.from(document.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate) img.note-slider-img, .note-scroller img.note-slider-img, .media-container img')).map(img => (img as HTMLImageElement).src);
                
                if (images.length === 0) {
                    const altImages = Array.from(document.querySelectorAll('img')).filter(img => img.src.includes('sns-webpic'));
                    images.push(...altImages.map(img => img.src));
                }

                const uniqueImages = [...new Set(images)];

                return { title, content, images: uniqueImages };
            });

            console.log(`📝 标题: ${noteData.title}`);
            console.log(`📄 内容长度: ${noteData.content.length}`);
            console.log(`🖼️ 图片数量: ${noteData.images.length}`);

            const noteDir = path.join(DATA_DIR, `note_${i+1}`);
            if (!fs.existsSync(noteDir)) {
                fs.mkdirSync(noteDir, { recursive: true });
            }

            fs.writeFileSync(path.join(noteDir, 'content.txt'), `标题: ${noteData.title}\n\n内容:\n${noteData.content}\n`);

            for (let j = 0; j < noteData.images.length; j++) {
                let imgUrl = noteData.images[j];
                await downloadImage(imgUrl, path.join(noteDir, `image_${j+1}.jpg`));
            }

            // Close the modal
            console.log('❌ 关闭弹窗...');
            await page.keyboard.press('Escape');
            await new Promise(r => setTimeout(r, 1000));
            
            // Just in case ESC didn't work, try clicking the close button
            await page.evaluate(() => {
                const closeBtn = document.querySelector('.close-circle, .close-box') as HTMLElement;
                if (closeBtn) closeBtn.click();
            });
            await new Promise(r => setTimeout(r, 1500));
        }
        
    } catch (e) {
        console.error('❌ 执行发生错误:', e);
    } finally {
        console.log('🔌 断开浏览器连接...');
        await browser.disconnect();
    }
}

run();