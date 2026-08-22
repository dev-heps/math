import Link from 'next/link';
import { 
  AnalysisIcon, 
  TopologyIcon, 
  GeometryIcon, 
  AlgebraIcon, 
  FoundationsIcon,
  KdsIcon,
  JmsIcon,
  SingleCalculusIcon,
  QuantumIcon
} from './AnimatedIcons';

// 1. 학문 분야별 아카이브 (Core Academic Topics)
const academicCategories = [
  {
    title: 'Foundations & Logic',
    href: '/foundations',
    icon: <FoundationsIcon color="#4338ca" />,
    color: 'bg-indigo-50/60 hover:bg-indigo-50/90 border-indigo-100/80',
    tagColor: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
    glowColor: 'rgba(99,102,241,0.12)',
    iconBorder: 'border-indigo-100',
    topics: [
      { name: 'Set Theory', href: '/foundations/set-theory' },
      { name: 'Logic', href: '/foundations/logic' },
      { name: 'Calculus (Practice)', href: '/foundations/calculus' },
    ]
  },
  {
    title: 'Analysis',
    href: '/analysis',
    icon: <AnalysisIcon color="#2563eb" />,
    color: 'bg-blue-50/60 hover:bg-blue-50/90 border-blue-100/80',
    tagColor: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    glowColor: 'rgba(37,99,235,0.12)',
    iconBorder: 'border-blue-100',
    topics: [
      { name: 'Intro', href: '/analysis/intro' },
      { name: 'Multivariable', href: '/analysis/multi' },
      { name: 'Complex', href: '/analysis/complex' },
      { name: 'Measure Theory', href: '/analysis/measure' },
    ]
  },
  {
    title: 'Topology',
    href: '/topology',
    icon: <TopologyIcon color="#059669" />,
    color: 'bg-emerald-50/60 hover:bg-emerald-50/90 border-emerald-100/80',
    tagColor: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
    glowColor: 'rgba(5,150,105,0.12)',
    iconBorder: 'border-emerald-100',
    topics: [
      { name: 'General Topology', href: '/topology/general' },
    ]
  },
  {
    title: 'Algebra',
    href: '/algebra',
    icon: <AlgebraIcon color="#7e22ce" />,
    color: 'bg-purple-50/60 hover:bg-purple-50/90 border-purple-100/80',
    tagColor: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    glowColor: 'rgba(126,34,206,0.12)',
    iconBorder: 'border-purple-100',
    topics: [
      { name: 'Linear', href: '/algebra/linear' },
      { name: 'Abstract', href: '/algebra/abstract' },
    ]
  },
  {
    title: 'Geometry',
    href: '/geometry',
    icon: <GeometryIcon color="#e11d48" />,
    color: 'bg-rose-50/60 hover:bg-rose-50/90 border-rose-100/80',
    tagColor: 'bg-rose-100 text-rose-700 hover:bg-rose-200',
    glowColor: 'rgba(225,29,72,0.12)',
    iconBorder: 'border-rose-100',
    topics: [
      { name: 'Differential', href: '/geometry/differential' },
      { name: 'Algebraic', href: '/geometry/algebraic' },
      { name: 'Complex', href: '/geometry/complex' },
    ]
  }
];

// 2. 커뮤니티 & 활동 스터디 카드 (Community Study Groups)
const communityStudies = [
  {
    title: 'KDS 7th',
    subtitle: '기초부터 시작하는 대학원 수학',
    href: '/enjoy/kds',
    icon: <KdsIcon color="#d97706" />,
    color: 'bg-amber-50/60 hover:bg-amber-50/90 border-amber-100/80',
    tagColor: 'bg-amber-100 text-amber-900 hover:bg-amber-200',
    glowColor: 'rgba(217,119,6,0.12)',
    iconBorder: 'border-amber-100',
    topics: [
      { name: 'Graduate Math', href: '/enjoy/kds' },
      { name: '7th Archive', href: '/enjoy/kds' },
    ]
  },
  {
    title: 'JMS 발췌반 4.5th',
    subtitle: '직장인과 문과생들을 위한 수학',
    href: '/enjoy/jms',
    icon: <JmsIcon color="#ea580c" />,
    color: 'bg-orange-50/60 hover:bg-orange-50/90 border-orange-100/80',
    tagColor: 'bg-orange-100 text-orange-900 hover:bg-orange-200',
    glowColor: 'rgba(234,88,12,0.12)',
    iconBorder: 'border-orange-100',
    topics: [
      { name: 'General Math', href: '/enjoy/jms' },
      { name: '4.5th Archive', href: '/enjoy/jms' },
    ]
  },
  {
    title: '일변수미적분학(기본) 2nd',
    subtitle: '일변수미적분학 기본 스터디',
    href: '/enjoy/calculus',
    icon: <SingleCalculusIcon color="#0284c7" />,
    color: 'bg-sky-50/60 hover:bg-sky-50/90 border-sky-100/80',
    tagColor: 'bg-sky-100 text-sky-900 hover:bg-sky-200',
    glowColor: 'rgba(2,132,199,0.12)',
    iconBorder: 'border-sky-100',
    topics: [
      { name: 'Calculus', href: '/enjoy/calculus' },
      { name: '2nd Archive', href: '/enjoy/calculus' },
    ]
  },
  {
    title: '양자컴퓨팅',
    subtitle: 'Quantum Computing 세부 스터디',
    href: '/enjoy/quantum',
    icon: <QuantumIcon color="#7c3aed" />,
    color: 'bg-violet-50/60 hover:bg-violet-50/90 border-violet-100/80',
    tagColor: 'bg-violet-100 text-violet-900 hover:bg-violet-200',
    glowColor: 'rgba(124,58,237,0.12)',
    iconBorder: 'border-violet-100',
    topics: [
      { name: 'Quantum Information', href: '/enjoy/quantum' },
      { name: 'Special Study', href: '/enjoy/quantum' },
    ]
  }
];

function CategoryCard({ cat }) {
  return (
    <Link href={cat.href} className="math-card group">
      {/* Top: Title + Subtitle */}
      <div className="flex-1 mb-6">
        <h3 className="math-card-title group-hover:underline decoration-1 underline-offset-4">
          {cat.title}
        </h3>
        {cat.subtitle && (
          <p className="math-card-desc">{cat.subtitle}</p>
        )}
      </div>

      {/* Bottom: Topic Pills */}
      <div className="flex flex-wrap gap-2">
        {cat.topics.map(topic => (
          <span 
            key={topic.name} 
            className="px-2 py-0.5 border border-gray-300 text-[0.7rem] uppercase tracking-wider text-gray-500 bg-gray-50"
          >
            {topic.name}
          </span>
        ))}
      </div>
    </Link>
  );
}

// 학문 분야 그리드 (Topics Tab - Home)
export default function CategoryGrid() {
  return (
    <div className="my-10 not-prose font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {academicCategories.map((cat) => (
          <CategoryCard key={cat.title} cat={cat} />
        ))}
      </div>
    </div>
  );
}

// 수학의 즐거움 커뮤니티 그리드 (Enjoying Math Tab)
export function EnjoyingMathGrid() {
  return (
    <div className="my-10 not-prose font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 px-1">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Study Groups
          </h2>
          <p className="text-sm text-zinc-500 font-medium mt-0.5">
            수학의 즐거움 커뮤니티
          </p>
        </div>
        
        {/* YouTube Channel Link Button */}
        <a 
          href="https://www.youtube.com/@enjoyingmath9346" 
          target="_blank" 
          rel="noopener noreferrer"
          className="self-start sm:self-center inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:border-red-200 hover:bg-red-50/50 hover:shadow-md transition-all group/yt"
          title="수학의 즐거움 유튜브 채널"
        >
          <svg viewBox="0 0 288 202" className="w-5 h-auto transition-transform group-hover/yt:scale-110">
            <path fill="#FF0000" d="M282.8 31.7c-3.3-12.4-13.1-22.1-25.5-25.5C234.8 0 144 0 144 0S53.2 0 30.7 6.2C18.3 9.6 8.5 19.3 5.2 31.7 0 54.3 0 101 0 101s0 46.7 5.2 69.3c3.3 12.4 13.1 22.1 25.5 25.5 22.5 6.2 113.3 6.2 113.3 6.2s90.8 0 113.3-6.2c12.4-3.3 22.1-13.1 25.5-25.5 5.2-22.5 5.2-69.3 5.2-69.3s0-46.7-5.2-69.3z"/>
            <polygon fill="#FFFFFF" points="115.2,143.6 190.1,101 115.2,58.4"/>
          </svg>
          <span className="text-xs font-semibold text-zinc-700 group-hover/yt:text-red-700 transition-colors">
            YouTube Channel
          </span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {communityStudies.map((study) => (
          <CategoryCard key={study.title} cat={study} />
        ))}
      </div>
    </div>
  );
}

