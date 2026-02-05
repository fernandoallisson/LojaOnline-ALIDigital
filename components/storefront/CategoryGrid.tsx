import Link from 'next/link';
import { mainCategories } from '@/lib/mockData';

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="grid gap-6 md:grid-cols-3">
        {mainCategories.map((category) => (
          <Link
            key={category.id}
            href={category.link}
            className="group relative overflow-hidden rounded-3xl"
          >
            <img
              src={category.image}
              alt={category.title}
              className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-semibold">{category.title}</h3>
              <p className="text-sm opacity-90">Confira</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
