import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import initI18n from "../i18n";

import Header from "@/components/Header";
import RootContextProvider from "@/contexts/RootContextProvider";

import "@/styles/globals.css";

const roboto = Roboto({
	weight: ["300", "500"],
	subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
	initI18n();

	return (
		<div className={roboto.className}>
			<RootContextProvider>
				<div>
					<Header />
					<Component {...pageProps} />
				</div>
			</RootContextProvider>
		</div>
	);
}
