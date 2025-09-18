
import Barranav from '@/components/aula/barranav';
export default function DashboardPage() {
			return (
				<main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-10 min-h-screen bg-[#18192a]">
					<Barranav />
					{/* Banner superior */}
					<section className="bg-[#23243a] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 mb-8 border border-[#23243a]">
						<div>
							<h1 className="text-3xl md:text-4xl font-bold text-white mb-2">¡Gracias por participar en el Pase de Temporada!</h1>
							<p className="text-[#bdbdf7]">Este es tu resumen: nivel alcanzado, XP y recompensas.</p>
						</div>
						{/* Aquí podrías poner un icono SVG decorativo si lo deseas */}
					</section>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{/* Panel usuario y stats */}
						<section className="md:col-span-2 bg-[#23243a] rounded-2xl p-6 flex flex-col gap-6 border border-[#23243a]">
							<div className="flex items-center gap-4 mb-4">
								<div className="w-16 h-16 rounded-full bg-[#6c63ff] flex items-center justify-center text-3xl font-bold text-white">🐊</div>
								<div>
									<h2 className="text-2xl font-bold text-[#bdbdf7]">Abnerhernandez</h2>
								</div>
								<div className="ml-auto">
									<button className="bg-[#6c63ff] text-white px-4 py-2 rounded-full flex items-center gap-2 font-semibold"><span>🏅</span></button>
								</div>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
								<div className="bg-[#18192a] rounded-xl p-4 flex flex-col items-center">
									<span className="text-3xl font-bold text-[#bdbdf7] flex items-center gap-2">⚡ 10310</span>
									<span className="text-[#bdbdf7] mt-1">XP obtenida</span>
								</div>
								<div className="bg-[#18192a] rounded-xl p-4 flex flex-col items-center">
									<span className="text-3xl font-bold text-[#bdbdf7] flex items-center gap-2">✅ 10</span>
									<span className="text-[#bdbdf7] mt-1">Tareas completadas</span>
								</div>
								<div className="bg-[#18192a] rounded-xl p-4 flex flex-col items-center">
									<span className="text-3xl font-bold text-[#bdbdf7] flex items-center gap-2">🎁 21</span>
									<span className="text-[#bdbdf7] mt-1">Recompensas desbloqueadas</span>
								</div>
							</div>
							<div className="text-[#bdbdf7] mb-2">¡Llegaste al nivel máximo! 🚀</div>
							<div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
								<span className="text-[#bdbdf7]">¿Quieres compartir tu progreso?</span>
								<div className="flex gap-2 mt-2 sm:mt-0">
									<button className="bg-[#23243a] border border-[#6c63ff] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#2e2f4a] transition">Compartir en X</button>
									<button className="bg-[#23243a] border border-[#6c63ff] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#2e2f4a] transition">Compartir en LinkedIn</button>
								</div>
							</div>
						</section>

						{/* Premios */}
						<section className="bg-[#23243a] rounded-2xl p-6 flex flex-col border border-[#23243a]">
							<div className="flex items-center gap-2 mb-4">
								<span className="text-2xl">🏆</span>
								<h3 className="text-xl font-bold text-white">Premios que ganaste</h3>
							</div>
							<div className="flex flex-wrap gap-2 mb-4">
								<span className="bg-[#18192a] text-[#bdbdf7] px-4 py-2 rounded-full text-sm font-medium">2h contenido premium mensual</span>
								<span className="bg-[#18192a] text-[#bdbdf7] px-4 py-2 rounded-full text-sm font-medium">Laboratorios selectos gratuitos</span>
								<span className="bg-[#18192a] text-[#bdbdf7] px-4 py-2 rounded-full text-sm font-medium">Avisos antes de campañas</span>
								<span className="bg-[#18192a] text-[#bdbdf7] px-4 py-2 rounded-full text-sm font-medium">1 curso premium vitalicio – Junior</span>
								<span className="bg-[#23243a] text-[#bdbdf7] px-4 py-2 rounded-full text-sm font-medium opacity-60 line-through">Revisión de CVs (hoja de vida)</span>
								<span className="bg-[#23243a] text-[#bdbdf7] px-4 py-2 rounded-full text-sm font-medium opacity-60 line-through">Precio lanzamiento bootcamps</span>
							</div>
							<button className="border border-[#bdbdf7] text-[#bdbdf7] px-4 py-2 rounded-lg font-semibold hover:bg-[#18192a] transition self-start">Ver todos</button>
						</section>
					</div>
				</main>
			);
}
