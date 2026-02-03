import { j as jsxRuntimeExports } from "../_chunks/_libs/react.mjs";
import { L as Link } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tiny-warning.mjs";
import "../_chunks/_libs/@tanstack/router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_chunks/_libs/@tanstack/history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_chunks/_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function LandingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/4 w-96 h-96 bg-navy-500/10 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { className: "relative z-10 text-center max-w-3xl mx-auto", initial: {
      opacity: 0,
      y: 30
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      duration: 0.8,
      ease: "easeOut"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "mb-8 inline-flex", initial: {
        scale: 0,
        rotate: -180
      }, animate: {
        scale: 1,
        rotate: 0
      }, transition: {
        duration: 0.6,
        delay: 0.2,
        type: "spring",
        stiffness: 200
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl glow-strong", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-black text-white", children: "P" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { className: "text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400 mb-4", initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, transition: {
        delay: 0.3
      }, children: "Point Scorer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { className: "text-5xl md:text-7xl font-black leading-tight mb-6", initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.4
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent", children: "How good are you at" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent", children: "credit card rewards?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { className: "text-lg md:text-xl text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed", initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.5
      }, children: "Upload your statements, and we'll show you exactly how much money you're leaving on the table — and which card to use for every purchase." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { className: "flex flex-col sm:flex-row gap-4 justify-center items-center", initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.6
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/score", className: "group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-lg text-white shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 active:scale-95", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10", children: "Get Your Score →" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: "Free • No signup • Runs locally" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { className: "relative z-10 mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full px-4", initial: {
      opacity: 0,
      y: 40
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: 0.8,
      duration: 0.6
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureCard, { icon: "🃏", title: "Select Your Cards", description: "Choose from 50+ popular US credit cards with real reward rates" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureCard, { icon: "📄", title: "Upload Statements", description: "Drag & drop CSV statements from any major bank" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureCard, { icon: "📊", title: "Get Your Grade", description: "See your efficiency score, missed rewards, and optimization tips" })
    ] })
  ] });
}
function FeatureCard({
  icon,
  title,
  description
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-default", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-4", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white mb-2", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 leading-relaxed", children: description })
  ] });
}
export {
  LandingPage as component
};
