import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import LandingView from 'src/sections/landing/view/landing-view';

export default function LandingPage() {
    return (
        <>
            <Helmet>
                <title>{ `Homepage - ${CONFIG.appName}` }</title>
            </Helmet>
            <LandingView />
        </>
    );
}