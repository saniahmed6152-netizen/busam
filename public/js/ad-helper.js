// public/js/ad-helper.js
const API_BASE = 'http://localhost/busahmed/api/';
let adIntervals = {};

function renderAd(containerId, location, intervalTime = 10000) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (adIntervals[containerId]) {
        clearInterval(adIntervals[containerId]);
        delete adIntervals[containerId];
    }
    
    container.innerHTML = "📢 Loading ad...";
    container.style.cssText = `
        background: #f1f5f9;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80px;
        border-radius: 20px;
        overflow: hidden;
        position: relative;
        cursor: default;
        color: #94a3b8;
        font-size: 14px;
    `;
    
    fetch(`${API_BASE}ads.php?location=${location}`)
        .then(response => response.json())
        .then(ads => {
            if (!ads || ads.length === 0) {
                container.innerHTML = "📢 Ad space - Promote your school";
                container.style.cssText = `
                    background: #f1f5f9;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 80px;
                    border-radius: 20px;
                    overflow: hidden;
                    position: relative;
                    cursor: default;
                    color: #94a3b8;
                    font-size: 14px;
                `;
                return;
            }
            
            let idx = 0;
            
            function showAd() {
                const ad = ads[idx % ads.length];
                container.innerHTML = `
                    <img src="${ad.image_url}" style="width:100%; height:80px; object-fit:cover; display:block;">
                    <div style="position:absolute; bottom:4px; right:8px; background:rgba(0,0,0,0.5); color:white; font-size:10px; padding:2px 6px; border-radius:20px;">
                        ${ad.caption || "Sponsored"} | 👁️ ${ad.views || 0}
                    </div>
                `;
                container.style.cssText = `
                    background: transparent;
                    display: block;
                    height: 80px;
                    border-radius: 20px;
                    overflow: hidden;
                    position: relative;
                    cursor: pointer;
                    padding: 0;
                `;
                container.onclick = () => window.open(ad.link || "#", "_blank");
                idx++;
            }
            
            showAd();
            
            if (ads.length > 1) {
                adIntervals[containerId] = setInterval(showAd, intervalTime);
            }
        })
        .catch(err => {
            console.error("Ad error:", err);
            container.innerHTML = "📢 Ad space unavailable";
            container.style.cssText = `
                background: #f1f5f9;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 80px;
                border-radius: 20px;
                overflow: hidden;
                position: relative;
                cursor: default;
                color: #94a3b8;
                font-size: 14px;
            `;
        });
}