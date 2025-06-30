// ============================================
// HEADER SCROLL EFFECTS
// ============================================

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// SMOOTH SCROLLING - 統一されたscrollIntoView使用
// ============================================

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ナビゲーションリンクのクリック処理
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        if (targetId) {
            scrollToSection(targetId);
        }
    });
});

// ============================================
// FORM HANDLING
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // バリデーション
            const membership = document.getElementById('membership');
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const company = document.getElementById('company');
            const occasion = document.getElementById('occasion');
            
            if (!membership.value || !name.value || !email.value || 
                !phone.value || !company.value || !occasion.value) {
                showNotification('必須項目をすべてご入力ください。', 'error');
                return;
            }
            
            // 成功処理
            const button = this.querySelector('.contact-cta');
            const originalText = button.textContent;
            
            // ボタンの状態変更
            button.textContent = '招待審査中...';
            button.disabled = true;
            button.style.opacity = '0.7';
            
            // 送信シミュレーション
            setTimeout(() => {
                showSuccessMessage();
                
                // ボタンの状態更新
                button.textContent = '申請完了 - お電話をお待ちください';
                button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                button.style.opacity = '1';
                
                // 5秒後に元に戻す
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = 'linear-gradient(135deg, #daa520 0%, #f4d03f 100%)';
                }, 5000);
            }, 2000);
        });
    }
});

function showNotification(message, type = 'info') {
    // 通知要素を作成
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 20px 30px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 350px;
        line-height: 1.5;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // アニメーション表示
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自動削除
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function showSuccessMessage() {
    const message = `豊洲仲卸 大芳VIP会員への招待申請を承りました。

【次のステップ】
• 48時間以内に専任スタッフよりお電話いたします
• 必要に応じて代表との面談をお願いする場合がございます
• 最短5営業日で会員証をお届けいたします

※ 年間限定200名様のため、ご希望に添えない場合もございます。
※ 日本の海産物文化を愛する方々との出会いを楽しみにしております。`;

    // カスタムモーダルを作成
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
        color: #f8f8f8;
        padding: 50px 40px;
        border-radius: 16px;
        max-width: 500px;
        margin: 20px;
        text-align: center;
        border: 2px solid #daa520;
        box-shadow: 0 25px 80px rgba(218, 165, 32, 0.3);
    `;
    
    const title = document.createElement('h3');
    title.textContent = '招待申請完了';
    title.style.cssText = `
        color: #daa520;
        font-size: 24px;
        margin-bottom: 30px;
        font-family: 'Cormorant Garamond', serif;
        letter-spacing: 2px;
        text-transform: uppercase;
    `;
    
    const messageText = document.createElement('p');
    messageText.textContent = message;
    messageText.style.cssText = `
        line-height: 1.8;
        font-size: 14px;
        margin-bottom: 30px;
        white-space: pre-line;
    `;
    
    const closeButton = document.createElement('button');
    closeButton.textContent = '閉じる';
    closeButton.style.cssText = `
        background: linear-gradient(135deg, #daa520 0%, #f4d03f 100%);
        color: #000;
        border: none;
        padding: 15px 30px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    closeButton.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
        }, 300);
    });
    
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.transform = 'translateY(-2px)';
        closeButton.style.boxShadow = '0 8px 25px rgba(218, 165, 32, 0.4)';
    });
    
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.transform = 'translateY(0)';
        closeButton.style.boxShadow = 'none';
    });
    
    modalContent.appendChild(title);
    modalContent.appendChild(messageText);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // フェードイン
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 100);
    
    // ESCキーで閉じる
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeButton.click();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// ============================================
// MEMBER COUNT ANIMATION
// ============================================

function updateMemberCount() {
    const memberCounters = document.querySelectorAll('.counter');
    memberCounters.forEach(element => {
        const text = element.textContent;
        if (text.includes('187')) {
            // わずかな変動効果を追加
            const variations = ['187', '186', '188', '187'];
            let currentIndex = 0;
            
            setInterval(() => {
                if (!element.textContent.includes('187')) return;
                element.textContent = variations[currentIndex % variations.length];
                currentIndex++;
            }, 30000); // 30秒ごとに更新
        }
    });
}

// ============================================
// INTERSECTION OBSERVER ANIMATIONS
// ============================================

function initScrollAnimations() {
    // 高級感のあるローディング効果
    const animatedElements = document.querySelectorAll('.carousel-item, .vip-card, .testimonial-card, .experience-item, .guarantee-item, .metric-card, .step-card, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 既存のtransformを保持しつつアニメーション
                const currentTransform = getComputedStyle(entry.target).transform;
                const newTransform = currentTransform === 'none' ? 'translateY(0)' : currentTransform.replace(/translateY\([^)]*\)/, 'translateY(0)');
                
                entry.target.style.transform = newTransform;
                entry.target.style.opacity = '1';
                
                // 少し遅らせてからホバー効果を有効にする
                setTimeout(() => {
                    entry.target.classList.add('animation-complete');
                }, 600);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        // 初期状態の設定（既存のtransformを保持）
        const currentTransform = getComputedStyle(el).transform;
        if (currentTransform === 'none') {
            el.style.transform = 'translateY(30px)';
        } else {
            el.style.transform = currentTransform + ' translateY(30px)';
        }
        el.style.opacity = '0';
        el.style.transition = 'all 0.8s ease-out';
        
        observer.observe(el);
    });

    // カウンターアニメーション
    const counters = document.querySelectorAll('.counter, .metric-value, .metric-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                entry.target.setAttribute('data-animated', 'true');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ステータスセクションの特別なアニメーション
    const statusSection = document.querySelector('.status-section');
    const statusObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statusCard = entry.target.querySelector('.hero-status-card');
                if (statusCard) {
                    statusCard.style.transform = 'translateY(0) scale(1)';
                    statusCard.style.opacity = '1';
                }
            }
        });
    }, { threshold: 0.3 });

    if (statusSection) {
        const statusCard = statusSection.querySelector('.hero-status-card');
        if (statusCard) {
            statusCard.style.transform = 'translateY(50px) scale(0.95)';
            statusCard.style.opacity = '0';
            statusCard.style.transition = 'all 1s ease-out';
        }
        statusObserver.observe(statusSection);
    }
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPercent = text.includes('%');
    const hasH = text.includes('h');
    const number = parseFloat(text);
    
    if (isNaN(number)) return;
    
    let current = 0;
    const increment = number / 60; // 60フレームで完了
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (hasPercent) {
            displayValue = (current % 1 !== 0) ? current.toFixed(1) : current.toFixed(0);
            element.textContent = displayValue + '%';
        } else if (hasH) {
            element.textContent = displayValue + 'h';
        } else if (text.includes('代')) {
            element.textContent = displayValue + '代';
        } else {
            element.textContent = displayValue;
        }
    }, 16); // 60fps
}

// ============================================
// HOVER EFFECTS
// ============================================

function initHoverEffects() {
    // カルーセルアイテムのホバー効果（3D感を追加）
    document.querySelectorAll('.carousel-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (this.classList.contains('animation-complete')) {
                const currentTransform = getComputedStyle(this).transform;
                this.style.transform = currentTransform + ' scale(1.02) translateZ(10px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (this.classList.contains('animation-complete')) {
                const currentTransform = getComputedStyle(this).transform;
                this.style.transform = currentTransform.replace(' scale(1.02) translateZ(10px)', '');
            }
        });
    });

    // VIPカードのホバー効果
    document.querySelectorAll('.vip-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('animation-complete')) {
                const currentTransform = getComputedStyle(this).transform;
                this.style.transform = currentTransform + ' translateZ(15px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('animation-complete')) {
                const currentTransform = getComputedStyle(this).transform;
                this.style.transform = currentTransform.replace(' translateZ(15px)', '');
            }
        });
    });

    // プレミアムボタンのライト効果
    document.querySelectorAll('.premium-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.style.background.includes('daa520')) {
                this.style.background = 'linear-gradient(135deg, #f4d03f 0%, #daa520 100%)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (this.style.background.includes('f4d03f')) {
                this.style.background = 'linear-gradient(135deg, #daa520 0%, #f4d03f 100%)';
            }
        });
    });

    // メトリックカードとステップカードのホバー効果
    document.querySelectorAll('.metric-card, .step-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('animation-complete')) {
                this.style.transform = this.style.transform + ' scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('animation-complete')) {
                this.style.transform = this.style.transform.replace(' scale(1.05)', '');
            }
        });
    });
}

// ============================================
// PARALLAX EFFECTS
// ============================================

function initParallaxEffects() {
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-uni');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });

        // ヒーローの背景パララックス効果
        const hero = document.querySelector('.hero');
        if (hero) {
            const yPos = scrolled * 0.5;
            hero.style.backgroundPosition = `center ${yPos}px`;
        }
    }, 10));
}

// ============================================
// TYPING ANIMATION
// ============================================

function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // タイピング完了後、カーソルの点滅を開始
                setTimeout(() => {
                    typingElement.classList.add('typing-complete');
                }, 500);
            }
        };
        
        // 少し遅らせてからタイピング開始
        setTimeout(typeWriter, 1000);
    }
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// スクロールイベントのスロットリング
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// リサイズイベントのデバウンス
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================

function initAccessibility() {
    // キーボードナビゲーション
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // フォーカス表示の改善
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #daa520';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// ============================================
// PRELOADER
// ============================================

function initPreloader() {
    // 画像のプリロード
    const imageUrls = [
        'hero-background.jpg',
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
        'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center&auto=format&q=80'
    ];

    let loadedImages = 0;
    const totalImages = imageUrls.length;

    imageUrls.forEach(url => {
        const img = new Image();
        img.onload = () => {
            loadedImages++;
            if (loadedImages === totalImages) {
                document.body.classList.add('images-loaded');
            }
        };
        img.onerror = () => {
            loadedImages++; // エラーでもカウントを進める
            if (loadedImages === totalImages) {
                document.body.classList.add('images-loaded');
            }
        };
        img.src = url;
    });
}

// ============================================
// SMOOTH SCROLL TO TOP
// ============================================

function initScrollToTop() {
    // スクロールトップボタンを作成
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.setAttribute('aria-label', 'ページトップへ戻る');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #daa520 0%, #f4d03f 100%);
        color: #000;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        box-shadow: 0 8px 25px rgba(218, 165, 32, 0.4);
    `;

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
        scrollTopBtn.style.boxShadow = '0 12px 35px rgba(218, 165, 32, 0.5)';
    });

    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'translateY(0) scale(1)';
        scrollTopBtn.style.boxShadow = '0 8px 25px rgba(218, 165, 32, 0.4)';
    });

    document.body.appendChild(scrollTopBtn);

    // スクロール位置によって表示/非表示
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'translateY(100px)';
        }
    }, 100));
}

// ============================================
// HERO SECTION SPECIAL EFFECTS
// ============================================

function initHeroEffects() {
    // グローエフェクトの初期化
    const glowElements = document.querySelectorAll('.glow-effect');
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animationDuration = '1s';
        });
        element.addEventListener('mouseleave', () => {
            element.style.animationDuration = '2s';
        });
    });

    // リップルエフェクトの強化
    const rippleElements = document.querySelectorAll('.ripple-effect');
    rippleElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 215, 0, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-click 0.6s linear;
                pointer-events: none;
            `;
            
            // アニメーションをCSSに追加（一度だけ）
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    @keyframes ripple-click {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ============================================
// MOBILE OPTIMIZATIONS
// ============================================

function initMobileOptimizations() {
    // タッチデバイスの検出
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // タッチ用のホバー効果を無効化
        const hoverElements = document.querySelectorAll('.carousel-item, .vip-card, .metric-card');
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-hover');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-hover');
                }, 300);
            });
        });
    }

    // ビューポートの高さ調整（モバイルブラウザのアドレスバー対応）
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setViewportHeight();
    window.addEventListener('resize', debounce(setViewportHeight, 250));
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // 初期化関数を実行
    updateMemberCount();
    initScrollAnimations();
    initHoverEffects();
    initParallaxEffects();
    initTypingAnimation();
    initAccessibility();
    initPreloader();
    initScrollToTop();
    initHeroEffects();
    initMobileOptimizations();
    
    // ページロード完了後の追加アニメーション
    window.addEventListener('load', () => {
        document.body.classList.add('page-loaded');
        
        // ヒーローアニメーションの微調整
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-subtitle, .hero-title, .hero-description, .hero-cta');
            heroElements.forEach((element, index) => {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            });
        }, 500);

        // ステータスセクションのスムーズ表示
        setTimeout(() => {
            const statusSection = document.querySelector('.status-section');
            if (statusSection) {
                statusSection.style.opacity = '1';
            }
        }, 1000);
    });
});

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // プロダクションでは適切なエラー報告サービスに送信
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }
        }, 0);
    });
}

// ============================================
// SERVICE WORKER REGISTRATION (オプション)
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // サービスワーカーがある場合のみ登録
        // navigator.serviceWorker.register('/sw.js');
    });
}
