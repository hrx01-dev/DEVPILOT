import { useEffect, useState, type ReactNode } from "react";

type Screen =
  | "landing"
  | "connect"
  | "dashboard"
  | "explorer"
  | "issues"
  | "tests"
  | "guide"
  | "settings";

type IconName =
  | "arrow"
  | "branch"
  | "check"
  | "chevron"
  | "code"
  | "command"
  | "dashboard"
  | "file"
  | "folder"
  | "github"
  | "guide"
  | "issue"
  | "layers"
  | "menu"
  | "play"
  | "plus"
  | "repo"
  | "search"
  | "settings"
  | "spark"
  | "test"
  | "x";

const paths: Record<IconName, ReactNode> = {
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  branch: <><circle cx="6" cy="5" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="6" cy="19" r="2" /><path d="M6 7v10M8 7c3 0 3 5 6 5h2" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  code: <><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" /></>,
  command: <><path d="M9 6V5a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v14a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3Z" /></>,
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  file: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h4" /></>,
  folder: <path d="M3 6h7l2 2h9v11H3z" />,
  github: <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.7-1.3-2.2-.3-4.6-1.1-4.6-5A3.9 3.9 0 0 1 6.8 8.7a3.6 3.6 0 0 1 .1-2.7s.8-.3 2.8 1A9.6 9.6 0 0 1 12 6.7a9.6 9.6 0 0 1 2.5.3c1.9-1.3 2.8-1 2.8-1a3.6 3.6 0 0 1 .1 2.7 3.9 3.9 0 0 1 1.1 2.8c0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />,
  guide: <><path d="M5 4h14v16H5z" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  issue: <><circle cx="12" cy="12" r="9" /><path d="M12 7v6M12 17h.01" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  play: <path d="m8 5 11 7-11 7z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  repo: <><path d="M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2z" /><path d="M8 3v18M12 7h4" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1A8 8 0 0 0 15 6l-.3-2.6h-4L10.3 6a8 8 0 0 0-1.7 1L6.2 6 4.3 9.4l2 1.6a7 7 0 0 0 0 2L4.3 14.6 6.2 18l2.4-1a8 8 0 0 0 1.7 1l.4 2.6h4L15 18a8 8 0 0 0 1.6-1l2.4 1 2-3.4-2.1-1.5a7 7 0 0 0 .1-1Z" /></>,
  spark: <><path d="m12 3 1.4 4.4L18 9l-4.6 1.6L12 15l-1.4-4.4L6 9l4.6-1.6z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7z" /></>,
  test: <><path d="M9 3h6M10 3v5l-5 9a2.7 2.7 0 0 0 2.4 4h9.2a2.7 2.7 0 0 0 2.4-4l-5-9V3" /><path d="M7 15h10" /></>,
  x: <path d="m6 6 12 12M18 6 6 18" />,
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Logo({ onClick }: { onClick?: () => void }) {
  return <button className="logo" onClick={onClick}><span className="logo-mark"><span /></span><b>DevPilot</b></button>;
}

function Button({ children, icon, kind = "primary", onClick, disabled }: { children: ReactNode; icon?: IconName; kind?: "primary" | "secondary" | "tertiary" | "danger"; onClick?: () => void; disabled?: boolean }) {
  return <button className={`button ${kind}`} onClick={onClick} disabled={disabled}>{icon && <Icon name={icon} size={16} />}{children}</button>;
}

function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "purple" | "green" | "amber" | "red" }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function Landing({ go }: { go: (s: Screen) => void }) {
  return <main className="landing">
    <nav className="marketing-nav">
      <Logo onClick={() => go("landing")} />
      <div className="nav-links"><button>Product</button><button>How it works</button><button>Features</button></div>
      <div className="nav-actions"><Button kind="tertiary">Sign in</Button><Button onClick={() => go("connect")}>Get Started</Button></div>
    </nav>
    <section className="hero">
      <Badge tone="purple">YOUR FIRST CONTRIBUTION STARTS HERE</Badge>
      <h1>From unfamiliar code to<br />your first contribution.</h1>
      <p>Understand codebases, investigate issues, and validate changes with an AI guide that helps you learn as you contribute.</p>
      <div className="hero-actions"><Button onClick={() => go("connect")} icon="arrow">Explore a Repository</Button><Button kind="secondary" icon="play">See How It Works</Button></div>
      <div className="repo-entry"><Icon name="github" /><span>Paste a public GitHub repository URL…</span><Button onClick={() => go("connect")}>Analyze repository</Button></div>
    </section>
    <section className="product-preview">
      <div className="preview-bar"><div className="window-dots"><i/><i/><i/></div><span><Icon name="repo" size={14}/> opensource-labs / compass</span><Badge tone="green">Analysis complete</Badge></div>
      <div className="preview-grid">
        <div className="mini-tree"><b>PROJECT</b>{["src", "components", "api", "router.ts", "index.ts"].map((x,i)=><div className={i===3?"active":""} key={x}><Icon name={i<3?"folder":"file"} size={14}/>{x}</div>)}</div>
        <div className="mini-code"><div className="tab">router.ts <span>×</span></div><CodeLines short /></div>
        <div className="mini-ai"><Badge tone="purple"><Icon name="spark" size={12}/> SOURCE-BACKED</Badge><h3>Route handler overview</h3><p>This module registers API routes and applies authentication middleware before each request.</p><div className="evidence">3 references found</div></div>
      </div>
    </section>
    <section className="features">
      <div className="section-intro"><Badge tone="purple">BUILT FOR LEARNING IN CONTEXT</Badge><h2>Everything you need to make a confident change</h2></div>
      <div className="feature-grid">
        {[
          ["layers","Understand the Codebase","See how modules connect before reading every file."],
          ["issue","Trace an Issue","Move from symptoms to relevant code with cited evidence."],
          ["test","Generate Tests","Turn expected behavior into a clear, reviewable test."],
          ["check","Verify Changes","Keep proposed work separate from verified results."],
        ].map(([icon,title,text],i)=><article key={title}><span className={`feature-icon f${i}`}><Icon name={icon as IconName}/></span><h3>{title}</h3><p>{text}</p><button>Learn more <Icon name="arrow" size={14}/></button></article>)}
      </div>
    </section>
    <section className="workflow"><p>YOUR CONTRIBUTION PATH</p><h2>A clear path through unfamiliar code</h2><div>{["Connect a repository","Understand the architecture","Investigate & verify","Prepare your contribution"].map((x,i)=><article key={x}><span>0{i+1}</span><h3>{x}</h3><p>{["Start with any public GitHub repository.","Map modules, dependencies, and flows.","Trace an issue and run focused tests.","Review evidence and draft your pull request."][i]}</p></article>)}</div></section>
    <section className="final-cta"><h2>Make your first contribution with confidence.</h2><p>Understand the code. Investigate the issue. Verify the change.</p><Button onClick={() => go("connect")} icon="arrow">Connect a Repository</Button></section>
    <footer><Logo onClick={() => go("landing")}/><span>Built for open-source learners.</span><span>© 2025 DevPilot</span></footer>
  </main>;
}

const navItems: [Screen, IconName, string][] = [
  ["dashboard","dashboard","Overview"], ["dashboard","repo","My Repositories"], ["explorer","code","Codebase Explorer"],
  ["issues","issue","Issues & Tasks"], ["tests","test","Test Lab"], ["guide","guide","Contribution Guide"],
];

function Shell({ screen, go, children }: { screen: Screen; go: (s: Screen) => void; children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return <div className="app-shell">
    <aside className={mobileOpen ? "sidebar open" : "sidebar"}>
      <div className="side-head"><Logo onClick={() => go("landing")}/><button className="mobile-close" onClick={()=>setMobileOpen(false)}><Icon name="x"/></button></div>
      <Button onClick={() => go("connect")} kind="secondary" icon="plus">Add repository</Button>
      <div className="nav-label">WORKSPACE</div>
      <nav className="side-nav">{navItems.map(([id,icon,label],i)=><button key={`${label}-${i}`} className={screen===id && (id!=="dashboard" || i===0) ? "active":""} onClick={()=>{go(id);setMobileOpen(false)}}><Icon name={icon}/>{label}{label==="Issues & Tasks"&&<span>3</span>}</button>)}</nav>
      <div className="side-bottom"><button><Icon name="guide"/>Documentation</button><button onClick={()=>go("settings")} className={screen==="settings"?"active":""}><Icon name="settings"/>Settings</button><div className="profile"><span>AM</span><div><b>Alex Morgan</b><small>alex@devpilot.dev</small></div><Icon name="chevron" size={14}/></div></div>
    </aside>
    <section className="workspace">
      <header className="topbar"><button className="mobile-menu" onClick={()=>setMobileOpen(true)}><Icon name="menu"/></button><div className="repo-switcher"><Icon name="repo"/><b>opensource-labs/compass</b><Icon name="chevron" size={13}/></div><div className="top-actions"><button className="global-search"><Icon name="search" size={15}/><span>Search anything</span><kbd>⌘ K</kbd></button><button className="icon-button"><Icon name="command"/></button><span className="avatar">AM</span></div></header>
      {children}
    </section>
  </div>;
}

function Connect({ go }: { go: (s: Screen) => void }) {
  const [stage,setStage] = useState<"form"|"analyzing"|"done">("form");
  useEffect(()=>{if(stage==="analyzing"){const t=setTimeout(()=>setStage("done"),1800);return()=>clearTimeout(t)}},[stage]);
  return <div className="connect-page"><header><Logo onClick={()=>go("landing")}/><Badge tone="neutral">Demo environment</Badge></header><main>
    <div className="stepper"><span className="on">1</span><i/><span className={stage!=="form"?"on":""}>2</span><i/><span className={stage==="done"?"on":""}>3</span></div>
    {stage==="form" ? <div className="connect-card"><Badge tone="purple"><Icon name="repo" size={12}/> CONNECT A REPOSITORY</Badge><h1>Start by adding a GitHub repository</h1><p>We’ll map its structure and prepare a guided workspace. DevPilot only requests read access.</p><label>Repository URL</label><div className="field"><Icon name="github"/><input defaultValue="https://github.com/opensource-labs/compass"/><button>Validate URL</button></div><div className="repo-preview"><span className="repo-avatar">C</span><div><b>opensource-labs / compass</b><p>Developer-first API toolkit for TypeScript</p><div><Badge tone="neutral">TypeScript</Badge><span>2.4k stars</span><span>Public</span></div></div><Icon name="check"/></div><label>Branch to analyze</label><div className="select"><Icon name="branch"/><span>main</span><Icon name="chevron" size={14}/></div><Button onClick={()=>setStage("analyzing")} icon="arrow">Connect Repository</Button><div className="permission"><Icon name="github"/><div><b>Prefer GitHub authorization?</b><p>Connect your account to access private repositories you choose.</p></div><Button kind="secondary">Authorize</Button></div></div>
    : <div className="connect-card analysis"><div className={stage==="done"?"analysis-ring done":"analysis-ring"}><Icon name={stage==="done"?"check":"spark"} size={28}/></div><h1>{stage==="done"?"Repository ready":"Preparing your workspace"}</h1><p>{stage==="done"?"Compass is indexed and ready to explore.":"This is a simulated demo analysis. No GitHub data is being fetched."}</p><Badge tone="amber">DEMO PROGRESS</Badge><div className="analysis-list">{["Metadata extracted","Source files indexed","Languages detected","Dependencies mapped","Explorer prepared"].map((x,i)=><div key={x} className={stage==="done"||i<3?"complete":""}><span>{stage==="done"||i<3?<Icon name="check" size={14}/>:i===3?<i className="spinner"/>:<i/>}</span><b>{x}</b><small>{i<3||stage==="done"?"Complete":i===3?"In progress":"Waiting"}</small></div>)}</div>{stage==="done"&&<Button onClick={()=>go("dashboard")} icon="arrow">Open workspace</Button>}</div>}
  </main></div>;
}

function Dashboard({ go }: { go: (s: Screen) => void }) {
  return <div className="page dashboard-page"><div className="page-title"><div><p>MONDAY, MAY 12</p><h1>Welcome back, Alex</h1><span>Pick up where you left off, or explore your next contribution.</span></div><Button onClick={()=>go("connect")} icon="plus">Add Repository</Button></div>
    <div className="dashboard-grid"><section className="panel recent"><div className="panel-head"><div><h2>Recently analyzed</h2><p>Your active repositories</p></div><button>View all</button></div><article className="repo-card" onClick={()=>go("explorer")}><div className="repo-card-top"><span className="repo-avatar">C</span><div><h3>opensource-labs/compass</h3><p>Developer-first API toolkit</p></div><Icon name="arrow"/></div><div className="repo-meta"><span><i className="lang-dot"/>TypeScript</span><Badge tone="green">Analysis complete</Badge><span>12 min ago</span></div><div className="progress-label"><span>Contribution progress</span><b>62%</b></div><div className="progress"><i style={{width:"62%"}}/></div><div className="repo-next"><Icon name="issue"/><span><b>Next: Investigate issue #184</b><small>Request timeout not respected</small></span><Icon name="chevron"/></div></article></section>
    <section className="panel contribution"><div className="panel-head"><div><h2>Contribution path</h2><p>Your progress on #184</p></div><span>5 of 10</span></div>{["Understand issue","Identify relevant files","Reproduce behavior","Generate focused test","Verify test result"].map((x,i)=><div className="progress-step" key={x}><span className={i<3?"complete":i===3?"current":""}>{i<3?<Icon name="check" size={13}/>:i+1}</span><div><b>{x}</b><small>{i<3?"Completed":i===3?"Up next":"Not started"}</small></div>{i===3&&<button onClick={()=>go("tests")}>Continue</button>}</div>)}</section></div>
    <div className="dashboard-grid lower"><section className="panel"><div className="panel-head"><div><h2>Recent activity</h2><p>Changes across your workspace</p></div></div>{[["code","Viewed request.ts","2 minutes ago"],["spark","Explained retryRequest()","18 minutes ago"],["issue","Added issue #184 to contribution path","Yesterday"]].map(([ic,a,b])=><div className="activity" key={a}><span><Icon name={ic as IconName}/></span><div><b>{a}</b><small>{b}</small></div></div>)}</section><section className="panel"><div className="panel-head"><div><h2>Suggested next steps</h2><p>Based on your recent work</p></div></div><div className="suggestion"><span><Icon name="test"/></span><div><Badge tone="purple">RECOMMENDED</Badge><h3>Write a focused regression test</h3><p>You’ve found the likely timeout path. Generate a test before proposing a change.</p><Button kind="secondary" onClick={()=>go("tests")}>Open Test Lab</Button></div></div></section></div>
  </div>;
}

const files = [
  ["folder","src"],["folder","  core"],["file","    client.ts"],["file","    request.ts"],["folder","  middleware"],["file","    timeout.ts"],["file","    retry.ts"],["folder","tests"],["file","  request.test.ts"],["file","package.json"],
];

function CodeLines({ short=false }: {short?:boolean}) {
  const lines = [
    ["1","import { TimeoutError } from './errors';"],
    ["2","import type { RequestConfig } from './types';"],
    ["3",""],
    ["4","export async function request("],
    ["5","  url: string, config: RequestConfig"],
    ["6",") {"],
    ["7","  const controller = new AbortController();"],
    ["8","  const timeout = config.timeout ?? 5000;"],
    ["9",""],
    ["10","  const timer = setTimeout(() => {"],
    ["11","    controller.abort();"],
    ["12","  }, timeout);"],
    ["13",""],
    ["14","  try {"],
    ["15","    return await fetch(url, {"],
    ["16","      ...config,"],
    ["17","      signal: controller.signal,"],
    ["18","    });"],
    ["19","  } catch (error) {"],
    ["20","    if (controller.signal.aborted) {"],
    ["21","      throw new TimeoutError(url, timeout);"],
    ["22","    }"],
    ["23","    throw error;"],
    ["24","  } finally {"],
    ["25","    clearTimeout(timer);"],
    ["26","  }"],
    ["27","}"],
  ];
  return <pre className="code-lines">{lines.slice(0,short?12:undefined).map(([n,c])=><div key={n} className={!short&&Number(n)>=10&&Number(n)<=12?"selected":""}><span>{n}</span><code>{highlight(c)}</code></div>)}</pre>;
}
function highlight(s:string) {
  const parts=s.split(/(\b(?:import|from|type|export|async|function|const|new|try|return|await|catch|if|throw|finally)\b|'[^']*'|\b\d+\b)/g);
  return <>{parts.map((x,i)=><span key={i} className={/^(import|from|type|export|async|function|const|new|try|return|await|catch|if|throw|finally)$/.test(x)?"kw":/^'/.test(x)?"str":/^\d+$/.test(x)?"num":""}>{x}</span>)}</>;
}

function Explorer({ go }: { go:(s:Screen)=>void }) {
  const [mode,setMode]=useState<"code"|"graph">("code");
  const [selected,setSelected]=useState("    request.ts");
  return <div className="explorer">
    <div className="explorer-toolbar"><div className="breadcrumbs"><span>opensource-labs</span><Icon name="chevron" size={12}/><b>compass</b><Badge tone="neutral"><Icon name="branch" size={12}/>main</Badge></div><div className="view-tabs"><button className={mode==="code"?"active":""} onClick={()=>setMode("code")}><Icon name="code" size={15}/>Code</button><button className={mode==="graph"?"active":""} onClick={()=>setMode("graph")}><Icon name="layers" size={15}/>Architecture</button></div><div className="tool-buttons"><button><Icon name="search"/>Search</button><button><Icon name="command"/>Commands</button></div></div>
    <div className="explorer-grid"><aside className="file-panel"><div className="panel-title"><b>EXPLORER</b><span>•••</span></div><div className="file-search"><Icon name="search" size={14}/><span>Search files</span></div><div className="tree-title"><Icon name="chevron" size={12}/><b>COMPASS</b></div>{files.map(([type,name],i)=><button key={`${name}-${i}`} className={selected===name?"selected":""} onClick={()=>setSelected(name)}><span className="indent" style={{width:`${(name.length-name.trimStart().length)*5}px`}}/><Icon name={type as IconName} size={14}/><span>{name.trim()}</span>{name.includes("request")&&<i title="Relevant to issue #184"/>}</button>)}<div className="recent-label">RECENTLY VIEWED</div><button><Icon name="file" size={14}/><span>types.ts</span></button><button><Icon name="file" size={14}/><span>errors.ts</span></button></aside>
    <section className="editor">{mode==="code"?<><div className="editor-tabs"><div><Icon name="file" size={14}/>{selected.trim()}<span>×</span></div></div><div className="editor-bar"><div><span>src</span><Icon name="chevron" size={11}/><span>core</span><Icon name="chevron" size={11}/><b>{selected.trim()}</b></div><div><button>Ln 10–12</button><button>Copy</button><button><Icon name="search" size={14}/></button></div></div><CodeLines/></>:<Architecture/>}</section>
    <aside className="ai-panel"><div className="ai-head"><span><Icon name="spark"/>Understand this file</span><button>•••</button></div><div className="ai-scroll"><div className="quick-actions">{["Explain File","Explain Function","Show Dependencies","Trace Execution Flow","Find Related Tests"].map(x=><button key={x}>{x}<Icon name="arrow" size={13}/></button>)}</div><div className="answer"><div className="answer-head"><span className="ai-avatar"><Icon name="spark" size={15}/></span><div><b>request.ts handles HTTP execution</b><small>Based on 4 source references</small></div></div><p>It wraps the native <code>fetch</code> API with timeout handling. The selected lines create a timer that aborts the request after the configured duration.</p><div className="evidence-card"><Badge tone="green">EVIDENCE FOUND</Badge><p><b>src/core/request.ts:10–12</b><br/>The abort timer uses <code>config.timeout</code>, falling back to 5000ms.</p><button>Open reference <Icon name="arrow" size={12}/></button></div><div className="hypothesis-card"><Badge tone="amber">HYPOTHESIS</Badge><p>Retry middleware may recreate the request without forwarding its original timeout.</p></div></div><div className="suggested"><b>Ask about this file</b>{["What does this function do?","Where is this function called?","What could break if I change this?","Which tests cover this behavior?"].map(x=><button key={x}>{x}</button>)}</div></div><div className="ask-box"><input placeholder="Ask about request.ts…"/><button><Icon name="arrow" size={15}/></button><small>AI can make mistakes. Verify source references.</small></div></aside></div>
    <div className="mobile-screen-nav"><button onClick={()=>go("issues")}><Icon name="issue"/>Investigate issue #184</button></div>
  </div>;
}

function Architecture(){
  return <div className="architecture"><div className="arch-head"><div><h2>Architecture map</h2><p>Explore how modules connect across the repository.</p></div><Badge tone="green">12 modules mapped</Badge></div><div className="graph"><svg viewBox="0 0 700 470"><g className="edges"><path d="M350 88 185 190M350 88l160 102M185 230l80 98M510 230l-80 98M350 120v200"/></g></svg><button className="node root"><Icon name="layers"/><b>API Client</b><small>src/core/client.ts</small></button><button className="node n1"><Icon name="code"/><b>Request</b><small>src/core/request.ts</small></button><button className="node n2"><Icon name="code"/><b>Middleware</b><small>src/middleware</small></button><button className="node n3"><Icon name="test"/><b>Request tests</b><small>tests/request.test.ts</small></button><button className="node n4"><Icon name="issue"/><b>Error types</b><small>src/core/errors.ts</small></button></div></div>
}

function Issues({go}:{go:(s:Screen)=>void}){
  return <div className="page issue-page"><div className="page-title compact"><div><p>ISSUES & TASKS</p><h1>Investigate an issue</h1><span>Trace reported behavior to source-backed evidence.</span></div><Button kind="secondary">Sync issues</Button></div><div className="issue-layout"><aside className="issues-list"><div className="file-search"><Icon name="search" size={14}/><span>Search issues</span></div><div className="filter-row"><button>Open <Icon name="chevron" size={12}/></button><button>All labels <Icon name="chevron" size={12}/></button></div>{[["184","Request timeout not respected","bug","2h"],["179","Headers lost after redirect","bug","1d"],["166","Add streaming response support","enhancement","4d"]].map((x,i)=><button className={i===0?"active":""} key={x[0]}><div><span>#{x[0]}</span><small>{x[3]}</small></div><b>{x[1]}</b><Badge tone={x[2]==="bug"?"red":"purple"}>{x[2]}</Badge></button>)}</aside><main className="issue-detail"><div className="issue-heading"><div><span>#184 · Open</span><h2>Request timeout is not respected after retry</h2><div><Badge tone="red">bug</Badge><Badge tone="amber">good first issue</Badge><span>opened by marina · 2 hours ago</span></div></div><Button onClick={()=>go("tests")} icon="test">Generate Test</Button></div><div className="issue-description"><h3>Problem description</h3><p>When a request is retried after a network error, the configured timeout appears to reset to the default 5 seconds instead of preserving the user value.</p><div className="compare"><div><b>Expected</b><p>Every attempt respects the configured <code>timeout: 1000</code>.</p></div><div><b>Actual</b><p>The second attempt waits for the default 5000ms timeout.</p></div></div><h3>Reproduction steps</h3><ol><li>Configure a client with a 1000ms timeout.</li><li>Trigger a retryable network failure.</li><li>Observe the duration of the second attempt.</li></ol></div><div className="related"><h3>Related source files</h3>{[["src/core/request.ts","Primary request handler","92%"],["src/middleware/retry.ts","Recreates request config","86%"],["tests/request.test.ts","Existing timeout tests","78%"]].map(x=><button key={x[0]} onClick={()=>go("explorer")}><Icon name="file"/><span><b>{x[0]}</b><small>{x[1]}</small></span><Badge tone="purple">{x[2]} relevant</Badge></button>)}</div></main><aside className="investigation"><div className="ai-head"><span><Icon name="spark"/>AI investigation</span><Badge tone="neutral">Draft</Badge></div><section><Badge tone="green">EVIDENCE FOUND</Badge><h3>Timeout config is read correctly</h3><p><code>request.ts:8</code> uses the provided timeout on the initial request.</p></section><section><Badge tone="amber">HYPOTHESIS</Badge><h3>Retry creates a partial config</h3><p><code>retry.ts:42</code> forwards headers and body, but timeout is not explicitly copied.</p></section><section><Badge tone="red">NEEDS VERIFICATION</Badge><h3>Reproduce with fake timers</h3><p>Add a focused test that advances time through the second attempt.</p></section><div className="confidence"><div><span>Investigation confidence</span><b>Medium · 74%</b></div><div><i/></div><p>Confidence is limited until a generated test is executed.</p></div><Button onClick={()=>go("tests")} icon="test">Generate focused test</Button><Button kind="secondary" onClick={()=>go("guide")}>Add to contribution path</Button></aside></div></div>
}

function Tests({go}:{go:(s:Screen)=>void}){
  const [status,setStatus]=useState<"proposed"|"running"|"passed">("proposed");
  useEffect(()=>{if(status==="running"){const t=setTimeout(()=>setStatus("passed"),1400);return()=>clearTimeout(t)}},[status]);
  return <div className="page tests-page"><div className="page-title compact"><div><p>TEST LAB</p><h1>Verify expected behavior</h1><span>Generate a focused test, then run it to gather evidence.</span></div><Badge tone={status==="passed"?"green":"amber"}>{status==="passed"?"EXECUTED · PASSED":"PROPOSED · NOT RUN"}</Badge></div><div className="stats">{[["3","Total tests","neutral"],[status==="passed"?"3":"2","Passed","green"],["0","Failed","red"],[status==="passed"?"0":"1","Not run","amber"]].map(x=><div key={x[1]}><Badge tone={x[2] as "neutral"|"green"|"red"|"amber"}>{x[0]}</Badge><span>{x[1]}</span></div>)}</div><div className="test-layout"><section className="test-config panel"><div className="panel-head"><div><h2>Test setup</h2><p>Issue #184 · Request timeout</p></div></div><label>Expected behavior</label><textarea defaultValue="The configured 1000ms timeout is preserved after a retry."/><label>Actual behavior</label><textarea defaultValue="The retried request falls back to the default 5000ms timeout."/><label>Framework</label><div className="select"><Icon name="test"/><span>Vitest</span><Icon name="chevron" size={14}/></div><div className="preconditions"><b>Preconditions & steps</b><ol><li>Use fake timers</li><li>Fail the first request</li><li>Advance by 1000ms</li><li>Assert second request aborts</li></ol></div><Button kind="secondary" icon="spark">Regenerate test</Button></section><section className="test-editor panel"><div className="test-editor-head"><div><Icon name="file"/>request.retry.test.ts</div><Badge tone={status==="passed"?"green":"amber"}>{status==="passed"?"VERIFIED":"PROPOSED TEST"}</Badge></div><pre><code><span className="kw">it</span>(<span className="str">'preserves timeout after retry'</span>, <span className="kw">async</span> () ={`>`} {"{"}<br/>{"  "}vi.useFakeTimers();<br/>{"  "}<span className="kw">const</span> client = createClient({"{"} timeout: <span className="num">1000</span> {"}"});<br/><br/>{"  "}<span className="kw">const</span> result = client.get(<span className="str">'/slow'</span>);<br/>{"  "}mockFetch.failOnce(<span className="str">'ECONNRESET'</span>);<br/>{"  "}vi.advanceTimersByTime(<span className="num">1000</span>);<br/><br/>{"  "}<span className="kw">await</span> expect(result).rejects<br/>{"    "}.toBeInstanceOf(TimeoutError);<br/>{"}"});</code></pre><div className="run-row"><div><b>{status==="passed"?"Execution complete":"Ready to execute"}</b><small>{status==="passed"?"Ran locally in demo environment":"Running this test is simulated in this prototype"}</small></div><Button onClick={()=>setStatus("running")} disabled={status==="running"} icon="play">{status==="running"?"Running…":status==="passed"?"Run again":"Run Test"}</Button></div></section><section className={`console panel ${status}`}><div className="console-head"><div><h2>Test results</h2><span>{status==="passed"?"Duration 1.14s":"Awaiting execution"}</span></div><Badge tone={status==="passed"?"green":"neutral"}>{status==="passed"?"PASSED":"NOT RUN"}</Badge></div>{status==="running"?<div className="running-state"><i className="spinner"/><b>Executing test…</b><span>Setting up isolated test environment</span></div>:status==="passed"?<><div className="result-banner"><span><Icon name="check"/></span><div><b>All assertions passed</b><p>The retry attempt was aborted after the configured 1000ms timeout.</p></div></div><div className="console-output"><b>CONSOLE OUTPUT</b><pre>✓ request.retry.test.ts (1)<br/>  ✓ preserves timeout after retry  12ms<br/><br/>Test Files  1 passed (1)<br/>Tests       1 passed (1)<br/>Duration    1.14s</pre></div><Button onClick={()=>go("guide")} icon="arrow">Continue to contribution guide</Button></>:<div className="empty-result"><span><Icon name="play"/></span><h3>This test hasn’t been run</h3><p>Generated code is a proposal, not evidence. Run the test to verify the behavior.</p></div>}</section></div></div>
}

function Guide(){
  const initial=[true,true,true,true,true,false,false,false,false,false];
  const [checks,setChecks]=useState(initial);
  const steps=["Understand the issue","Read contribution guidelines","Identify relevant files","Reproduce the issue","Review the proposed change","Run relevant tests","Review the diff","Check formatting and linting","Prepare a commit message","Draft the pull request"];
  const count=checks.filter(Boolean).length;
  return <div className="page guide-page"><div className="page-title compact"><div><p>CONTRIBUTION GUIDE</p><h1>Prepare your contribution</h1><span>A guided path from verified evidence to a review-ready pull request.</span></div><Badge tone="purple">ISSUE #184</Badge></div><div className="guide-progress"><div><span>Contribution readiness</span><b>{count} of 10 steps</b></div><div><i style={{width:`${count*10}%`}}/></div></div><div className="guide-layout"><section className="panel checklist"><div className="panel-head"><div><h2>Contribution checklist</h2><p>Complete each step before opening a pull request</p></div></div>{steps.map((x,i)=><button key={x} onClick={()=>setChecks(c=>c.map((v,j)=>j===i?!v:v))} className={checks[i]?"done":i===count?"current":""}><span>{checks[i]?<Icon name="check" size={14}/>:i+1}</span><div><b>{x}</b><small>{checks[i]?(i===4?"User reviewed":"Complete"):i===5?"Test evidence ready":"Not started"}</small></div>{i===5&&!checks[i]&&<Badge tone="green">VERIFIED RESULT</Badge>}</button>)}</section><section className="guide-main"><div className="panel evidence-summary"><div className="panel-head"><div><h2>Change evidence</h2><p>Keep suggestions, reviews, and results distinct</p></div></div><div className="state-columns"><div><Badge tone="purple">AI SUGGESTION</Badge><b>Forward timeout in retry config</b><small>src/middleware/retry.ts</small></div><div><Badge tone="amber">USER REVIEWED</Badge><b>Proposed change reviewed</b><small>Reviewed by Alex</small></div><div><Badge tone="green">VERIFIED RESULT</Badge><b>Regression test passed</b><small>1 test · 1.14s</small></div></div></div><div className="panel changed-files"><div className="panel-head"><div><h2>Changed files</h2><p>2 files · +18 −2</p></div><Button kind="tertiary">Review diff</Button></div><div><Icon name="file"/><span><b>src/middleware/retry.ts</b><small>Forwards timeout to retried request</small></span><i>+2 −2</i></div><div><Icon name="file"/><span><b>tests/request.retry.test.ts</b><small>Adds timeout regression test</small></span><i>+16</i></div></div><div className="panel pr-draft"><div className="panel-head"><div><h2>Pull request draft</h2><p>Editable · generated from your verified work</p></div><Badge tone="purple">AI ASSISTED</Badge></div><label>Title</label><input defaultValue="fix: preserve request timeout after retry"/><label>Summary</label><textarea defaultValue="Preserves the user-configured timeout when retrying a failed request. This prevents retry attempts from falling back to the default timeout."/><label>Testing performed</label><textarea defaultValue="Added a focused Vitest regression test using fake timers. Verified the second request aborts after the configured 1000ms timeout."/><div className="draft-actions"><Button kind="secondary">Copy markdown</Button><Button>Create pull request draft</Button></div></div></section></div></div>
}

function Settings(){
 return <div className="page settings-page"><div className="page-title compact"><div><p>SETTINGS</p><h1>Workspace preferences</h1><span>Manage your account, explanations, and repository access.</span></div></div><div className="settings-layout"><nav><button className="active">Profile</button><button>GitHub connection</button><button>AI preferences</button><button>Repositories</button><button>Privacy & access</button></nav><main><section className="panel"><h2>User profile</h2><p>Personal details shown in your workspace.</p><div className="profile-edit"><span>AM</span><div><label>Display name</label><input defaultValue="Alex Morgan"/></div></div><label>Email address</label><input defaultValue="alex@devpilot.dev" disabled/><Button>Save changes</Button></section><section className="panel"><div className="setting-row"><div><h2>GitHub connection</h2><p>Connected as <b>alexmorgan</b> · Read-only repository access</p></div><Badge tone="green">CONNECTED</Badge></div><Button kind="secondary"><Icon name="github"/>Manage connection</Button></section><section className="panel"><h2>AI explanations</h2><p>Choose how much context DevPilot includes in explanations.</p><div className="segmented"><button>Concise</button><button className="active">Balanced</button><button>Detailed</button></div><label>Preferred languages</label><div className="tag-field"><Badge tone="purple">TypeScript ×</Badge><Badge tone="neutral">Python ×</Badge><span>Add language…</span></div></section><section className="panel danger-zone"><h2>Repository access</h2><p>Disconnect Compass and remove its indexed workspace data.</p><Button kind="danger">Disconnect repository</Button></section></main></div></div>;
}

export default function App() {
  const [screen,setScreen]=useState<Screen>("landing");
  const go=(s:Screen)=>{setScreen(s);window.scrollTo({top:0,behavior:"smooth"})};
  if(screen==="landing") return <Landing go={go}/>;
  if(screen==="connect") return <Connect go={go}/>;
  return <Shell screen={screen} go={go}>{screen==="dashboard"?<Dashboard go={go}/>:screen==="explorer"?<Explorer go={go}/>:screen==="issues"?<Issues go={go}/>:screen==="tests"?<Tests go={go}/>:screen==="guide"?<Guide/>:<Settings/>}</Shell>;
}
