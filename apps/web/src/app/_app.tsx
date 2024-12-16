
import type { AppProps } from 'next/app';
import RootLayout from './layout';

function MyApp({ Component, pageProps, router }: AppProps) {
    return (
        <RootLayout >
            <Component {...pageProps} />
        </RootLayout>
    );
}

export default MyApp
