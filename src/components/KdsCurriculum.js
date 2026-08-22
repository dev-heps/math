'use client'

import Link from 'next/link'
import { KDS_LECTURES, lecturePath } from '@/data/kds-curriculum'

/** YouTube 아이콘 SVG */
function YtIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
    </svg>
  )
}

/** 노트 아이콘 */
function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  )
}

function LectureRow({ lec, hasNote }) {
  const padded = String(lec.num).padStart(3, '0')

  return (
    <div className="kds-row group">
      {/* 번호 */}
      <span className="kds-num">{padded}</span>

      {/* 제목 */}
      <span className="kds-title">
        {hasNote ? (
          <Link href={lecturePath(lec.num)} className="kds-title-link">
            {lec.title}
          </Link>
        ) : (
          <span className="kds-title-plain">{lec.title}</span>
        )}
      </span>

      {/* 공개 여부 뱃지 */}
      <span className={`kds-badge ${lec.public ? 'kds-badge--public' : 'kds-badge--member'}`}>
        {lec.public ? '공개' : '멤버'}
      </span>

      {/* 재생 시간 */}
      <span className="kds-duration">{lec.duration}</span>

      {/* 액션 버튼들 */}
      <span className="kds-actions">
        <a
          href={`https://www.youtube.com/watch?v=${lec.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="kds-btn kds-btn--yt"
          title="유튜브에서 보기"
        >
          <YtIcon />
        </a>
        {hasNote ? (
          <Link href={lecturePath(lec.num)} className="kds-btn kds-btn--note" title="노트 보기">
            <NoteIcon />
          </Link>
        ) : (
          <span className="kds-btn kds-btn--empty" title="노트 미작성">
            <NoteIcon />
          </span>
        )}
      </span>
    </div>
  )
}

/**
 * KDS 전체 커리큘럼 목록 컴포넌트
 * @param {string[]} writtenNotes - 노트가 작성된 강의 번호 배열 (예: [4, 5, 6])
 */
export default function KdsCurriculum({ writtenNotes = [] }) {
  const written = new Set(writtenNotes.map(Number))
  const total = KDS_LECTURES.length
  const done = written.size
  const pct = Math.round((done / total) * 100)

  return (
    <div className="kds-curriculum not-prose font-sans">

      {/* 진행 상황 헤더 */}
      <div className="kds-header">
        <div className="kds-header-left">
          <span className="kds-stat-label">총 강의</span>
          <span className="kds-stat-value">{total}강</span>
          <span className="kds-stat-divider" />
          <span className="kds-stat-label">노트 작성</span>
          <span className="kds-stat-value kds-stat-value--done">{done}강</span>
        </div>
        <div className="kds-progress-wrap">
          <div className="kds-progress-bar">
            <div className="kds-progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="kds-progress-label">{pct}%</span>
        </div>
      </div>

      {/* 컬럼 헤더 */}
      <div className="kds-col-header">
        <span className="kds-num">No.</span>
        <span className="kds-title">제목</span>
        <span className="kds-badge" />
        <span className="kds-duration">길이</span>
        <span className="kds-actions" />
      </div>

      {/* 강의 목록 */}
      <div className="kds-list">
        {KDS_LECTURES.map(lec => (
          <LectureRow key={lec.num} lec={lec} hasNote={written.has(lec.num)} />
        ))}
      </div>
    </div>
  )
}
