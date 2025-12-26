import {Language} from "../../admin/admin.types";

type GeneralMatrixTranslations = {
    [key in Language]: Record<string, any>
}

export const generalMatrixTranslations: GeneralMatrixTranslations = {
    RU: {
        aside: {
            title1: "ПОИСК СЕБЯ:",
            description1: "Соединение мужского и женского. Выстраивание взаимоотношений. Способности, навыки, умения.",
            result1: 'ДУХОВНАЯ ГАРМОНИЯ',
            title2: "СОЦИАЛИЗАЦИЯ:",
            description2: "Социальная и родовая системы. Результаты и признание в социуме.",
            result2: 'ПЛАНЕТАРНОЕ',
        },
        calculator: {
            title: "ПЕРСОНАЛЬНЫЙ КАЛЬКУЛЯТОР",
            thead: {
                chakra: "Чакра",
                physical: "Физическая",
                energy: 'Энергия',
                mental: 'Ментальная'
            },
            rows: {
                muladhara: "Муладхара",
                svadhisthana: "Свадхистана",
                manipura: "Манипура",
                anahata: "Анахата",
                vishuddha: "Вишудха",
                ajna: "Аджна",
                sahasrara: "Сахасрара",
            },
            total: "Всего",
        },
        day: 'День',
        month: 'Месяц',
        year: 'Год',
    },
    FI: {
        aside: {
            title1: "ITSESI ETSINTÄ:",
            description1: "Maskuliinisen ja feminiinisen yhdistäminen. Ihmissuhteiden rakentaminen. Kyvyt, taidot, osaaminen.",
            result1: "HENGELLINEN HARMONIA",
            title2: "SOSIALISAATIO:",
            description2: "Sosiaalinen ja suvun järjestelmä. Tulokset ja tunnustus yhteiskunnassa.",
            result2: "PLANETAARINEN",
        },
        calculator: {
            title: "HENKILÖKOHTAINEN LASKIN",
            thead: {
                chakra: "Chakra",
                physical: "Fyysinen",
                energy: "Energia",
                mental: "Mentaalinen",
            },
            rows: {
                muladhara: "Muladhara",
                svadhisthana: "Svadhisthana",
                manipura: "Manipura",
                anahata: "Anahata",
                vishuddha: "Vishuddha",
                ajna: "Ajna",
                sahasrara: "Sahasrara",
            },
            total: "Yhteensä",
        },
        day: "Päivä",
        month: "Kuukausi",
        year: "Vuosi",
    },
    EN: {
        aside: {
            title1: "SELF-DISCOVERY:",
            description1: "Integrating the masculine and feminine. Building relationships. Abilities, skills, competencies.",
            result1: "SPIRITUAL HARMONY",
            title2: "SOCIALIZATION:",
            description2: "Social and ancestral systems. Results and recognition in society.",
            result2: "PLANETARY",
        },
        calculator: {
            title: "PERSONAL CALCULATOR",
            thead: {
                chakra: "Chakra",
                physical: "Physical",
                energy: "Energy",
                mental: "Mental",
            },
            rows: {
                muladhara: "Muladhara",
                svadhisthana: "Svadhisthana",
                manipura: "Manipura",
                anahata: "Anahata",
                vishuddha: "Vishuddha",
                ajna: "Ajna",
                sahasrara: "Sahasrara",
            },
            total: "Total",
        },
        day: "Day",
        month: "Month",
        year: "Year",
    },
    SV: {
        aside: {
            title1: "SÖKANDET EFTER SIG SJÄLV:",
            description1: "Förening av det maskulina och det feminina. Att bygga relationer. Förmågor, färdigheter, kompetenser.",
            result1: "ANDLIG HARMONI",
            title2: "SOCIALISERING:",
            description2: "Sociala och släktbaserade system. Resultat och erkännande i samhället.",
            result2: "PLANETÄRT",
        },
        calculator: {
            title: "PERSONLIG KALKYLATOR",
            thead: {
                chakra: "Chakra",
                physical: "Fysisk",
                energy: "Energi",
                mental: "Mental",
            },
            rows: {
                muladhara: "Muladhara",
                svadhisthana: "Svadhisthana",
                manipura: "Manipura",
                anahata: "Anahata",
                vishuddha: "Vishuddha",
                ajna: "Ajna",
                sahasrara: "Sahasrara",
            },
            total: "Totalt",
        },
        day: "Dag",
        month: "Månad",
        year: "År",
    },
}
