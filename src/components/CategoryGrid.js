import Link from 'next/link';
import { AnalysisIcon, TopologyIcon, GeometryIcon, AlgebraIcon, FoundationsIcon } from './AnimatedIcons';

const categories = [
  {
    title: 'Foundations & Logic',
    href: '/foundations',
    icon: <FoundationsIcon color="#4338ca" />,
    color: 'bg-indigo-50/50 hover:bg-indigo-50/80 border-indigo-100/60',
    tagColor: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
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
    color: 'bg-blue-50/50 hover:bg-blue-50/80 border-blue-100/60',
    tagColor: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
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
    color: 'bg-emerald-50/50 hover:bg-emerald-50/80 border-emerald-100/60',
    tagColor: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
    topics: [
      { name: 'General Topology', href: '/topology/general' },
    ]
  },
  {
    title: 'Algebra',
    href: '/algebra',
    icon: <AlgebraIcon color="#7e22ce" />,
    color: 'bg-purple-50/50 hover:bg-purple-50/80 border-purple-100/60',
    tagColor: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    topics: [
      { name: 'Linear', href: '/algebra/linear' },
      { name: 'Abstract', href: '/algebra/abstract' },
    ]
  },
  {
    title: 'Geometry',
    href: '/geometry',
    icon: <GeometryIcon color="#e11d48" />,
    color: 'bg-rose-50/50 hover:bg-rose-50/80 border-rose-100/60',
    tagColor: 'bg-rose-100 text-rose-700 hover:bg-rose-200',
    topics: [
      { name: 'Differential', href: '/geometry/differential' },
      { name: 'Algebraic', href: '/geometry/algebraic' },
      { name: 'Complex', href: '/geometry/complex' },
    ]
  }
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-12 not-prose font-sans">
      {categories.map((cat) => (
        <div 
          key={cat.title} 
          className={`group relative flex flex-col justify-between p-6 rounded-3xl border backdrop-blur-md shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out ${cat.color}`}
        >
          {/* Invisible Link covering the entire card for the main category routing */}
          <Link href={cat.href} className="absolute inset-0 z-10 rounded-3xl" aria-label={`Go to ${cat.title}`}></Link>
          
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-zinc-800 group-hover:text-zinc-950 transition-colors flex items-center gap-3">
              <span className="bg-white p-2 rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-center w-12 h-12 overflow-hidden">{cat.icon}</span>
              {cat.title}
            </h3>
            <span className="text-zinc-400 group-hover:text-zinc-600 transition-colors transform group-hover:translate-x-1 duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-auto relative z-20">
            {cat.topics.map(topic => (
              <Link 
                key={topic.name} 
                href={topic.href}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors shadow-sm cursor-pointer ${cat.tagColor}`}
              >
                {topic.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
