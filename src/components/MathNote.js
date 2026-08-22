'use client'

/**
 * KDS 강의 노트용 수학 컴포넌트 모음
 * 
 * 사용법 (MDX 내에서):
 *   <Def title="완비성 공리 (Completeness Axiom)">...</Def>
 *   <Thm title="볼차노-바이어슈트라스" number="2.3">...</Thm>
 *   <Proof>...</Proof>
 *   <Example number="1">...</Example>
 *   <Exercise number="1.2">...</Exercise>
 *   <Intuition>...</Intuition>
 *   <YoutubeEmbed videoId="xxxxxx" title="강의 제목" start={120} />
 */

// ── 정의 (Definition) ──────────────────────────────────────────
export function Def({ title, number, children }) {
  return (
    <div className="math-callout math-callout--def">
      <span className="math-callout-label">
        정의{number ? ` ${number}` : ''}
        {title && <span className="math-callout-title"> — {title}</span>}
      </span>
      <div className="math-callout-body">{children}</div>
    </div>
  )
}

// ── 정리 / 명제 (Theorem / Proposition) ───────────────────────
export function Thm({ title, number, type = 'Theorem', children }) {
  return (
    <div className="math-callout math-callout--thm">
      <span className="math-callout-label">
        {type}{number ? ` ${number}` : ''}
        {title && <span className="math-callout-title"> — {title}</span>}
      </span>
      <div className="math-callout-body">{children}</div>
    </div>
  )
}

// ── 보조정리 Lemma ─────────────────────────────────────────────
export function Lemma({ title, number, children }) {
  return <Thm title={title} number={number} type="Lemma">{children}</Thm>
}

// ── 따름정리 Corollary ─────────────────────────────────────────
export function Cor({ title, number, children }) {
  return <Thm title={title} number={number} type="Corollary">{children}</Thm>
}

// ── 증명 (Proof) ───────────────────────────────────────────────
export function Proof({ children }) {
  return (
    <div className="math-callout math-callout--proof">
      <span className="math-callout-label">증명 (Proof)</span>
      <div className="math-callout-body">
        {children}
        <p className="math-proof-qed">□</p>
      </div>
    </div>
  )
}

// ── 예제 (Example) ─────────────────────────────────────────────
export function Example({ number, title, children }) {
  return (
    <div className="math-callout math-callout--example">
      <span className="math-callout-label">
        예제{number ? ` ${number}` : ''}
        {title && <span className="math-callout-title"> — {title}</span>}
      </span>
      <div className="math-callout-body">{children}</div>
    </div>
  )
}

// ── 연습문제 (Exercise) ────────────────────────────────────────
export function Exercise({ number, children }) {
  return (
    <div className="math-callout math-callout--exercise">
      <span className="math-callout-label">
        연습문제{number ? ` ${number}` : ''}
      </span>
      <div className="math-callout-body">{children}</div>
    </div>
  )
}

// ── 직관 / 요약 노트 (Intuition) ──────────────────────────────
export function Intuition({ children }) {
  return (
    <div className="math-callout math-callout--intuition">
      <span className="math-callout-label">직관 & 요약</span>
      <div className="math-callout-body">{children}</div>
    </div>
  )
}

// ── 유튜브 임베드 (YouTube Embed) ─────────────────────────────
export function YoutubeEmbed({ videoId, title, start }) {
  const src = `https://www.youtube.com/embed/${videoId}${start ? `?start=${start}` : ''}`
  return (
    <div className="yt-embed-wrapper">
      {title && <p className="yt-embed-title">{title}</p>}
      <div className="yt-embed-frame">
        <iframe
          src={src}
          title={title || 'YouTube video'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
