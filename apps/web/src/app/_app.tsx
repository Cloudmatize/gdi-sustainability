
import type { AppProps } from 'next/app';
import RootLayout from './layout';

function MyApp({ Component, pageProps, router }: AppProps) {
    return (
        <RootLayout locale={router.locale}>
            <Component {...pageProps} />
        </RootLayout>
    );
}

export default MyApp
