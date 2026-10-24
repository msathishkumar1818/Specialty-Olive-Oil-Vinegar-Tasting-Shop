/**
 * SPECIALTY OLIVE OIL & VINEGAR TASTING SHOP
 * Global Core JavaScript Engine
 */

(function () {
  'use strict';

  // ========================================================================
  // 1. BRANDED PAGE LOADER
  // ========================================================================
  function initPageLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;

    const hideLoader = () => {
      loader.classList.add('loaded');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    };

    if (document.readyState === 'complete') {
      setTimeout(hideLoader, 350);
    } else {
      window.addEventListener('load', () => setTimeout(hideLoader, 350));
      // Fallback in case of slow assets
      setTimeout(hideLoader, 2500);
    }
  }

  // ========================================================================
  // 2. DARK MODE SYSTEM (#000000 Strict Rule)
  // ========================================================================
  function initDarkMode() {
    const themeStorageKey = 'olive_vinegar_theme';
    const darkToggles = document.querySelectorAll('.theme-toggle');
    const htmlEl = document.documentElement;

    const applyTheme = (theme) => {
      if (theme === 'dark') {
        htmlEl.classList.add('dark');
        darkToggles.forEach(btn => {
          btn.setAttribute('aria-pressed', 'true');
          btn.setAttribute('aria-label', 'Switch to light mode');
        });
      } else {
        htmlEl.classList.remove('dark');
        darkToggles.forEach(btn => {
          btn.setAttribute('aria-pressed', 'false');
          btn.setAttribute('aria-label', 'Switch to dark mode');
        });
      }
      localStorage.setItem(themeStorageKey, theme);
    };

    // Initialize from storage or system preference
    const savedTheme = localStorage.getItem(themeStorageKey);
    if (savedTheme) {
      applyTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }

    darkToggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isDark = htmlEl.classList.contains('dark');
        applyTheme(isDark ? 'light' : 'dark');
      });
    });
  }

  // ========================================================================
  // 3. RTL / LTR ENGINE
  // ========================================================================
  function initRtlSystem() {
    const rtlStorageKey = 'olive_vinegar_dir';
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    const htmlEl = document.documentElement;

    const applyDir = (dir) => {
      htmlEl.setAttribute('dir', dir);
      localStorage.setItem(rtlStorageKey, dir);
      rtlToggles.forEach(btn => {
        const isRtl = dir === 'rtl';
        btn.setAttribute('aria-pressed', isRtl ? 'true' : 'false');
        btn.setAttribute('aria-label', isRtl ? 'Switch to Left to Right' : 'Switch to Right to Left');
        const textSpan = btn.querySelector('.rtl-text-indicator');
        if (textSpan) {
          textSpan.textContent = isRtl ? 'LTR' : 'RTL';
        } else {
          btn.textContent = isRtl ? 'LTR' : 'RTL';
        }
      });
    };

    const savedDir = localStorage.getItem(rtlStorageKey) || 'ltr';
    applyDir(savedDir);

    rtlToggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentDir = htmlEl.getAttribute('dir') || 'ltr';
        applyDir(currentDir === 'rtl' ? 'ltr' : 'rtl');
      });
    });
  }

  // ========================================================================
  // 4. FIXED HEADER SCROLL STATE
  // ========================================================================
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ========================================================================
  // 5. HOME DROPDOWN (CLICK ONLY - Never Hover)
  // ========================================================================
  function initHomeDropdown() {
    const dropdownToggle = document.getElementById('home-dropdown-toggle');
    const dropdownMenu = document.getElementById('home-dropdown-menu');

    if (!dropdownToggle || !dropdownMenu) return;

    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = dropdownMenu.classList.contains('is-open');

      if (isOpen) {
        dropdownMenu.classList.remove('is-open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      } else {
        dropdownMenu.classList.add('is-open');
        dropdownToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!dropdownMenu.contains(e.target) && !dropdownToggle.contains(e.target)) {
        dropdownMenu.classList.remove('is-open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dropdownMenu.classList.contains('is-open')) {
        dropdownMenu.classList.remove('is-open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
        dropdownToggle.focus();
      }
    });
  }

  // ========================================================================
  // 6. MOBILE DRAWER & ACCORDION (Click to close after navigation)
  // ========================================================================
  function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const drawerClose = document.getElementById('drawer-close');
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-backdrop');
    const accordionBtn = document.getElementById('mobile-home-accordion');
    const accordionSub = document.getElementById('mobile-home-sub');

    if (!drawer || !backdrop) return;

    const openDrawer = () => {
      drawer.classList.add('is-active');
      backdrop.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    };

    const closeDrawer = () => {
      drawer.classList.remove('is-active');
      backdrop.classList.remove('is-active');
      document.body.style.overflow = '';
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');

      // Rule: Automatic close home dropdown when closing drawer
      if (accordionSub && accordionBtn) {
        accordionSub.classList.remove('is-open');
        accordionBtn.classList.remove('is-open');
        accordionBtn.setAttribute('aria-expanded', 'false');
      }
    };

    if (menuToggle) menuToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    // Mobile Home Submenu Accordion: Automatic close by default, open ONLY when clicked
    if (accordionBtn && accordionSub) {
      // Ensure it starts closed
      accordionSub.classList.remove('is-open');
      accordionBtn.classList.remove('is-open');
      accordionBtn.setAttribute('aria-expanded', 'false');

      accordionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = accordionSub.classList.contains('is-open');
        if (isOpen) {
          accordionSub.classList.remove('is-open');
          accordionBtn.classList.remove('is-open');
          accordionBtn.setAttribute('aria-expanded', 'false');
        } else {
          accordionSub.classList.add('is-open');
          accordionBtn.classList.add('is-open');
          accordionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }

    // Rule: Clicking any navigation item must close the mobile menu
    const navLinks = drawer.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-active')) {
        closeDrawer();
      }
    });

    // Automatically close mobile menu when transitioning/resizing from mobile to desktop (>= 1120px)
    const desktopMedia = window.matchMedia('(min-width: 1120px)');
    const handleDesktopTransition = (e) => {
      if (e.matches && drawer.classList.contains('is-active')) {
        closeDrawer();
      }
    };
    if (desktopMedia.addEventListener) {
      desktopMedia.addEventListener('change', handleDesktopTransition);
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1120 && drawer.classList.contains('is-active')) {
        closeDrawer();
      }
    }, { passive: true });
  }

  // ========================================================================
  // 7. ACTIVE NAVIGATION HIGHLIGHT (Header & Mobile Drawer)
  // ========================================================================
  function initActiveNav() {
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPath === '') currentPath = 'index.html';

    // Clear previous active states to avoid stale highlights
    document.querySelectorAll('.desktop-nav .nav-link, .desktop-nav .nav-item, .home-dropdown-item, .drawer-link, .drawer-accordion-btn, .drawer-sublink').forEach(el => {
      el.classList.remove('active');
    });

    const isHome = (currentPath === 'index.html' || currentPath === 'home-2.html');

    if (isHome) {
      // 1. Highlight Desktop Home Dropdown Toggle
      const homeToggle = document.getElementById('home-dropdown-toggle');
      if (homeToggle) {
        homeToggle.classList.add('active');
        const parentNavItem = homeToggle.closest('.nav-item');
        if (parentNavItem) parentNavItem.classList.add('active');
      }

      // Highlight active home item inside desktop dropdown
      const desktopHomeLink = document.querySelector(`.home-dropdown-item[href="${currentPath}"]`);
      if (desktopHomeLink) desktopHomeLink.classList.add('active');

      // 2. Highlight Mobile Home Accordion Button
      const mobileAccordionBtn = document.getElementById('mobile-home-accordion');
      if (mobileAccordionBtn) mobileAccordionBtn.classList.add('active');

      // Highlight active home sublink inside mobile drawer
      const mobileHomeSublink = document.querySelector(`.drawer-sublink[href="${currentPath}"]`);
      if (mobileHomeSublink) mobileHomeSublink.classList.add('active');
    } else {
      // Inner page active highlight (Products, Events, Tasting Bar, About Us, Contact)
      const desktopLink = document.querySelector(`.desktop-nav .nav-link[href="${currentPath}"]`);
      if (desktopLink) {
        desktopLink.classList.add('active');
        const parentNavItem = desktopLink.closest('.nav-item');
        if (parentNavItem) parentNavItem.classList.add('active');
      }

      const mobileLink = document.querySelector(`.drawer-nav .drawer-link[href="${currentPath}"]`);
      if (mobileLink) {
        mobileLink.classList.add('active');
      }
    }
  }

  // ========================================================================
  // 8. SCROLL TO TOP
  // ========================================================================
  function initScrollTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========================================================================
  // 9. LOGIN MODAL SYSTEM
  // ========================================================================
  function initLoginModal() {
    const openBtns = document.querySelectorAll('.trigger-login-modal');
    const modalOverlay = document.getElementById('login-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    if (!modalOverlay) return;

    const openModal = (e) => {
      if (e) e.preventDefault();
      modalOverlay.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      const firstInput = modalOverlay.querySelector('input');
      if (firstInput) setTimeout(() => firstInput.focus(), 150);
    };

    const closeModal = () => {
      modalOverlay.classList.remove('is-active');
      document.body.style.overflow = '';
    };

    openBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
        closeModal();
      }
    });

    const form = modalOverlay.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Welcome back to Olive & Cruet Artisans! (Demo Authentication)');
        closeModal();
      });
    }
  }

  // ========================================================================
  // 10. INTERACTIVE TASTING FLIGHT ACCORDION
  // ========================================================================
  function initFlightAccordion() {
    const panels = document.querySelectorAll('.flight-panel');
    if (!panels.length) return;

    panels.forEach(panel => {
      panel.addEventListener('mouseenter', () => {
        panels.forEach(p => p.classList.remove('active'));
        panel.classList.add('active');
      });

      panel.addEventListener('click', (e) => {
        if (e.target.closest('.flight-book-btn')) return;
        panels.forEach(p => p.classList.remove('active'));
        panel.classList.add('active');
      });
    });
  }

  // ========================================================================
  // INITIALIZE ALL MODULES
  // ========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initPageLoader();
    initDarkMode();
    initRtlSystem();
    initHeaderScroll();
    initHomeDropdown();
    initMobileMenu();
    initActiveNav();
    initScrollTop();
    initLoginModal();
    initFlightAccordion();
  });

})();
