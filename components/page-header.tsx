interface PageHeaderProps {
  title: string
  subtitle?: string
  backgroundImage: string
  breadcrumb?: { label: string; href: string }[]
}

export default function PageHeader({ title, subtitle, backgroundImage, breadcrumb }: PageHeaderProps) {
  return (
    <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        {breadcrumb && (
          <nav className="mb-4">
            <ol className="flex items-center justify-center space-x-2 text-sm">
              {breadcrumb.map((item, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2 text-white/60">/</span>}
                  <a href={item.href} className="text-white/80 hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">{title}</h1>

        {subtitle && <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto text-balance">{subtitle}</p>}
      </div>
    </section>
  )
}
