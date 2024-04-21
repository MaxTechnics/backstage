import { GeistSans } from "geist/font/sans";
import "./globals.scss";
import { Theme, ThemePanel } from "@radix-ui/themes";
import PrelineScript from "@/components/PrelineScript";
import NavBar from "@/components/NavBar";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Next.js and Supabase Starter Kit",
	description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={GeistSans.className}>
			<body className="bg-background text-foreground h-screen">
				<Theme className="h-full flex flex-col">
					<NavBar />
					<main className="flex flex-col items-center h-full">
						{children}
					</main>
					{/* <ThemePanel /> */}
					<PrelineScript />
				</Theme>
			</body>
		</html>
	);
}
