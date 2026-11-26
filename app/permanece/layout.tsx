import './style.css';
import type { ReactNode } from 'react';

export const metadata = {
	title: 'PERMANECE 2027 | Monte Sion',
	robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<html lang="es">
			<body>{children}</body>
		</html>
	);
}