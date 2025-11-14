
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionaries";
import CompanyClientPage from "./company-client-page";

type CompanyPageProps = {
    params: { lang: Locale }
};

export default async function CompanyPage({ params: { lang } }: CompanyPageProps) {
    const dictionary = await getDictionary(lang);

    return <CompanyClientPage dictionary={dictionary} lang={lang} />;
}
