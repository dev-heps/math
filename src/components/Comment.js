'use client'

import { useEffect, useRef } from 'react'

// ── Canvas 아이콘 ──────────────────────────────────────────────

/** 질문 — 파란 레이더 파동 */
function QuestionCanvas() {
  const ref = useRef(null)
  const raf = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let frame = 0
    const draw = () => {
      ctx.clearRect(0, 0, 28, 28)
      // 중심 점
      ctx.beginPath()
      ctx.arc(14, 14, 3.5, 0, Math.PI * 2)
      ctx.fillStyle = '#000'
      ctx.fill()
      // 파동 링 1
      const r1 = 3.5 + 9 * ((frame % 80) / 80)
      const a1 = 0.8 * (1 - (frame % 80) / 80)
      ctx.beginPath()
      ctx.arc(14, 14, r1, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(0,0,0,${a1})`
      ctx.lineWidth = 1.5
      ctx.stroke()
      // 파동 링 2 (오프셋)
      const r2 = 3.5 + 9 * (((frame + 40) % 80) / 80)
      const a2 = 0.8 * (1 - ((frame + 40) % 80) / 80)
      ctx.beginPath()
      ctx.arc(14, 14, r2, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(0,0,0,${a2})`
      ctx.lineWidth = 1.5
      ctx.stroke()
      frame++
      raf.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf.current)
  }, [])
  return <canvas ref={ref} width={28} height={28} />
}

/** 비판 — 붉은 돋보기 */
function CritiqueCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, 28, 28)
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    // 원
    ctx.beginPath()
    ctx.arc(11, 11, 7, 0, Math.PI * 2)
    ctx.stroke()
    // 손잡이
    ctx.lineWidth = 2.5
    ctx.beginPath()
    ctx.moveTo(16.5, 16.5)
    ctx.lineTo(23, 23)
    ctx.stroke()
    // 원 안에 X
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(8, 8); ctx.lineTo(14, 14)
    ctx.moveTo(14, 8); ctx.lineTo(8, 14)
    ctx.stroke()
  }, [])
  return <canvas ref={ref} width={28} height={28} />
}

/** 불동의 — 주황 X (그려지는 애니메이션) */
function DisagreeCanvas() {
  const ref = useRef(null)
  const raf = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let progress = 0
    const draw = () => {
      ctx.clearRect(0, 0, 28, 28)
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 2.5
      ctx.lineCap = 'round'
      // X의 두 획을 progress에 따라 그림 (0→1: 첫 획, 1→2: 두번째 획, 반복)
      const t = progress % 2
      if (t <= 1) {
        // 첫 획: ↘
        ctx.beginPath()
        ctx.moveTo(7, 7)
        ctx.lineTo(7 + t * 14, 7 + t * 14)
        ctx.stroke()
      } else {
        // 첫 획 완성
        ctx.beginPath()
        ctx.moveTo(7, 7); ctx.lineTo(21, 21); ctx.stroke()
        // 두번째 획: ↙
        const t2 = t - 1
        ctx.beginPath()
        ctx.moveTo(21, 7)
        ctx.lineTo(21 - t2 * 14, 7 + t2 * 14)
        ctx.stroke()
      }
      progress += 0.025
      // 완성 후 잠시 멈춤
      if (progress > 2.8) progress = 0
      raf.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf.current)
  }, [])
  return <canvas ref={ref} width={28} height={28} />
}

/** 궁금점 — 초록 나선 (회전) */
function CuriousCanvas() {
  const ref = useRef(null)
  const raf = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let rot = 0
    const draw = () => {
      ctx.clearRect(0, 0, 28, 28)
      ctx.save()
      ctx.translate(14, 14)
      ctx.rotate(rot)
      // 나선
      ctx.beginPath()
      let angle = 0
      for (let i = 0; i < 80; i++) {
        const r = i * 0.09
        const x = r * Math.cos(angle)
        const y = r * Math.sin(angle)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
        angle += 0.22
      }
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 1.5
      ctx.lineCap = 'round'
      ctx.stroke()
      ctx.restore()
      rot += 0.015
      raf.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf.current)
  }, [])
  return <canvas ref={ref} width={28} height={28} />
}

// ── Comment 컴포넌트 설정 ──────────────────────────────────────

const COMMENT_CONFIG = {
  question: { label: 'Question', Icon: QuestionCanvas },
  critique: { label: 'Critique', Icon: CritiqueCanvas },
  disagree: { label: 'Disagreement', Icon: DisagreeCanvas },
  curious: { label: 'Curiosity', Icon: CuriousCanvas },
}

/**
 * 자유형식 노트에 코멘트를 남기는 컴포넌트
 *
 * @param {'question' | 'critique' | 'disagree' | 'curious'} type
 *
 * 사용 예:
 *   <Comment type="question">왜 완비성이 없으면 안 되는가?</Comment>
 *   <Comment type="critique">증명의 2단계에서 공리를 암묵적으로 사용했다.</Comment>
 *   <Comment type="disagree">이 직관적 설명은 오히려 헷갈린다.</Comment>
 *   <Comment type="curious">다변수에서는 어떻게 일반화되는가?</Comment>
 */
export function Comment({ type = 'question', children }) {
  const config = COMMENT_CONFIG[type] ?? COMMENT_CONFIG.question
  const { label, Icon } = config

  return (
    <div className="comment-block not-prose">
      {/* 좌측 Canvas 아이콘 */}
      <div className="comment-icon">
        <Icon />
      </div>

      {/* 내용 영역 */}
      <div className="comment-body">
        <span className="comment-label">{label}</span>
        <div className="comment-text">{children}</div>
      </div>
    </div>
  )
}
